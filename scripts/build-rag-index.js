// Genera el índice de búsqueda del Agente Spurgeon: src/data/rag-index.json
//
// El índice se versiona en el repo y se despliega junto con el contenido. Esa es
// toda la gracia: como salen del mismo push, es imposible que el agente conozca
// un contenido distinto del que muestra el sitio. Sin base de datos que se pause.
//
//   node scripts/build-rag-index.js          → reindexa solo si cambió el contenido
//   node scripts/build-rag-index.js --force  → reindexa todo igual
//
// Requiere OPENAI_API_KEY. Si falta y ya hay un índice, no rompe el build:
// avisa y deja el índice existente.

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { collectDocuments, collectValidUrls } from './rag-sources.js';

dotenv.config({ quiet: true });

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = path.join(ROOT, 'src/data/rag-index.json');

const MODELO = 'text-embedding-3-small';
const DIMENSIONES = 512;   // el modelo admite acortar; 512 mantiene calidad y pesa un tercio
const TAMANO = 800;        // caracteres por fragmento
const SOLAPE = 150;        // para no cortar una idea al medio
const LOTE = 100;          // embeddings por request

const forzar = process.argv.includes('--force');

/** Parte un texto en fragmentos, cortando en punto cuando se puede. */
function fragmentar(texto) {
    const t = texto.replace(/\s+/g, ' ').trim();
    if (t.length <= TAMANO) return t.length >= 80 ? [t] : [];

    const out = [];
    let ini = 0;
    while (ini < t.length) {
        let fin = ini + TAMANO;
        if (fin < t.length) {
            const punto = t.lastIndexOf('. ', fin);
            if (punto > ini + TAMANO * 0.5) fin = punto + 1;
        }
        const trozo = t.slice(ini, fin).trim();
        if (trozo.length >= 80) out.push(trozo);
        if (fin >= t.length) break;
        ini = fin - SOLAPE;
    }
    return out;
}

function armarFragmentos(docs) {
    const frags = [];
    for (const d of docs) {
        for (const texto of fragmentar(d.texto)) {
            frags.push({ t: d.titulo, u: d.url, s: d.fuente, c: texto });
        }
    }
    return frags;
}

async function embeber(openai, textos) {
    const vectores = [];
    for (let i = 0; i < textos.length; i += LOTE) {
        const lote = textos.slice(i, i + LOTE);
        process.stdout.write(`\r  embeddings ${Math.min(i + lote.length, textos.length)}/${textos.length}…`);
        const r = await openai.embeddings.create({ model: MODELO, input: lote, dimensions: DIMENSIONES });
        // La API puede devolver desordenado: se reordena por index.
        for (const item of r.data.sort((a, b) => a.index - b.index)) vectores.push(item.embedding);
        if (i + LOTE < textos.length) await new Promise(r => setTimeout(r, 200));
    }
    process.stdout.write('\n');
    return vectores;
}

/** Vector normalizado → base64 de Float32. Normalizar acá deja la búsqueda en un simple producto punto. */
function empaquetar(vec) {
    let suma = 0;
    for (const v of vec) suma += v * v;
    const norma = Math.sqrt(suma) || 1;
    const f = new Float32Array(vec.length);
    for (let i = 0; i < vec.length; i++) f[i] = vec[i] / norma;
    return Buffer.from(f.buffer).toString('base64');
}

async function main() {
    console.log('=== Índice RAG — Agente Spurgeon ===\n');

    const docs = collectDocuments();
    const urls = collectValidUrls();
    const fragmentos = armarFragmentos(docs);

    console.log(`Documentos: ${docs.length}`);
    console.log(`Fragmentos: ${fragmentos.length}`);
    console.log(`URLs válidas: ${urls.length}`);

    // Huella del contenido: si no cambió, no se gasta ni un embedding.
    const huella = crypto.createHash('sha256')
        .update(JSON.stringify({ m: MODELO, d: DIMENSIONES, t: TAMANO, o: SOLAPE, f: fragmentos.map(f => f.c) }))
        .digest('hex');

    if (!forzar && fs.existsSync(SALIDA)) {
        try {
            const previo = JSON.parse(fs.readFileSync(SALIDA, 'utf8'));
            if (previo.huella === huella) {
                console.log('\n✓ El contenido no cambió. Índice al día, no se reindexa.');
                return;
            }
        } catch { /* índice ilegible: se regenera */ }
    }

    if (!process.env.OPENAI_API_KEY) {
        if (fs.existsSync(SALIDA)) {
            console.warn('\n⚠ Falta OPENAI_API_KEY: se conserva el índice existente (puede estar desactualizado).');
            return;
        }
        console.error('\n✗ Falta OPENAI_API_KEY y no hay índice previo. El agente va a quedar sin búsqueda.');
        process.exit(1);
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    console.log('\nGenerando embeddings…');
    const vectores = await embeber(openai, fragmentos.map(f => f.c));

    if (vectores.length !== fragmentos.length) {
        console.error(`\n✗ Se esperaban ${fragmentos.length} vectores y llegaron ${vectores.length}. Se aborta para no escribir un índice corrupto.`);
        process.exit(1);
    }

    const indice = {
        generado: new Date().toISOString(),
        modelo: MODELO,
        dimensiones: DIMENSIONES,
        huella,
        urls,
        fragmentos: fragmentos.map((f, i) => ({ ...f, e: empaquetar(vectores[i]) })),
    };

    fs.writeFileSync(SALIDA, JSON.stringify(indice));
    const mb = (fs.statSync(SALIDA).size / 1048576).toFixed(1);
    console.log(`\n✓ Escrito src/data/rag-index.json — ${fragmentos.length} fragmentos, ${mb} MB`);
}

main().catch(e => { console.error('\nError:', e.message); process.exit(1); });
