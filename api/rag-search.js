// Búsqueda semántica en memoria para el Agente Spurgeon.
//
// No hay base de datos: el índice (src/data/rag-index.json) se genera en el build
// y viaja con el deploy. Como los vectores se guardan ya normalizados, buscar es
// un producto punto sobre ~2.600 fragmentos — milisegundos, sin red de por medio.
//
// El índice se carga una sola vez por instancia y queda en memoria; con Fluid
// Compute las instancias se reutilizan, así que el costo se paga muy de vez en cuando.

import fs from 'fs';
import path from 'path';

let cache = null;

function cargarIndice() {
    if (cache !== null) return cache;
    try {
        const raw = fs.readFileSync(path.join(process.cwd(), 'src/data/rag-index.json'), 'utf8');
        const idx = JSON.parse(raw);

        // base64 → Float32Array, una vez.
        for (const f of idx.fragmentos) {
            const buf = Buffer.from(f.e, 'base64');
            f.v = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        }
        idx.urlsValidas = new Set(idx.urls || []);
        cache = idx;
    } catch (err) {
        console.error('[RAG] No se pudo cargar el índice:', err.message);
        cache = { fragmentos: [], urls: [], urlsValidas: new Set(), dimensiones: 0 };
    }
    return cache;
}

/** Dimensiones que espera el índice (para pedir el embedding de la consulta igual). */
export function dimensionesIndice() {
    return cargarIndice().dimensiones || 512;
}

export function indiceDisponible() {
    return cargarIndice().fragmentos.length > 0;
}

/**
 * Los `limite` fragmentos más parecidos a la consulta.
 * `minimo` descarta lo que no se parece a nada — mejor no traer contexto que traer ruido.
 */
export function buscar(embeddingConsulta, { limite = 5, minimo = 0.25 } = {}) {
    const idx = cargarIndice();
    if (!idx.fragmentos.length) return [];

    // La consulta también se normaliza: así el producto punto ES el coseno.
    let suma = 0;
    for (const v of embeddingConsulta) suma += v * v;
    const norma = Math.sqrt(suma) || 1;
    const q = Float32Array.from(embeddingConsulta, v => v / norma);

    const candidatos = [];
    for (const f of idx.fragmentos) {
        if (f.v.length !== q.length) continue;
        let punto = 0;
        for (let i = 0; i < q.length; i++) punto += q[i] * f.v[i];
        if (punto >= minimo) candidatos.push({ score: punto, f });
    }
    candidatos.sort((a, b) => b.score - a.score);

    // Un solo fragmento por documento. Sin esto, un ensayo largo se lleva los
    // cinco lugares con cinco pedazos de sí mismo y el agente queda con una sola
    // fuente y un solo enlace para ofrecer.
    const porDocumento = [];
    const vistos = new Set();
    for (const c of candidatos) {
        const clave = c.f.u || `sin-url:${c.f.t}`;
        if (vistos.has(clave)) continue;
        vistos.add(clave);
        porDocumento.push(c);
    }

    // El material de `knowledge/` no tiene página propia: sirve para responder,
    // pero no se puede recomendar. Si copara los primeros puestos, el lector se
    // queda sin nada que leer. Se reserva al menos la mitad de los lugares para
    // documentos con enlace.
    const conEnlace = porDocumento.filter(c => c.f.u);
    const sinEnlace = porDocumento.filter(c => !c.f.u);
    const cupoSinEnlace = Math.floor(limite / 2);

    const elegidos = [
        ...conEnlace.slice(0, limite - Math.min(cupoSinEnlace, sinEnlace.length)),
        ...sinEnlace.slice(0, cupoSinEnlace),
    ].sort((a, b) => b.score - a.score).slice(0, limite);

    return elegidos.map(({ score, f }) => ({
        score,
        content: f.c,
        title: f.t,
        url: f.u || null,
        source: f.s,
    }));
}

/**
 * ¿Esta URL interna existe de verdad?
 *
 * Existe porque el sitio es una SPA: CUALQUIER ruta responde HTTP 200 y recién
 * dentro de React aparece "Capítulo no encontrado". Así que un enlace inventado
 * no falla como error — falla como una página vacía delante del lector. Se valida
 * contra la lista de URLs que el indexador sacó del contenido real.
 */
export function esUrlValida(url) {
    if (typeof url !== 'string' || !url) return false;
    if (/^https?:\/\//i.test(url)) return false;  // externas: no las sugerimos
    if (!url.startsWith('/')) return false;

    const limpia = url.split('#')[0].split('?')[0].replace(/\/+$/, '') || '/';
    return cargarIndice().urlsValidas.has(limpia);
}

/** Deja solo los enlaces que existen, sin repetir, respetando el orden. */
export function filtrarEnlaces(enlaces, maximo = 2) {
    if (!Array.isArray(enlaces)) return [];
    const out = [];
    const vistos = new Set();

    for (const l of enlaces) {
        if (!l || typeof l !== 'object') continue;
        const url = (l.url || '').split('#')[0].split('?')[0].replace(/\/+$/, '') || '/';
        if (!esUrlValida(url) || vistos.has(url)) continue;
        vistos.add(url);
        out.push({
            title: String(l.title || 'Recurso del sitio').slice(0, 120),
            url,
            type: String(l.type || 'recurso').slice(0, 32),
            external: false,
        });
        if (out.length >= maximo) break;
    }
    return out;
}
