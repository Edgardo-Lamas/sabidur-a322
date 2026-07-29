// Reúne TODO el contenido publicado del sitio para el índice del Agente Spurgeon.
//
// Regla de oro: la URL de cada documento se calcula desde el slug real de su
// archivo. Nunca de una tabla escrita a mano — eso fue exactamente lo que hizo
// que el agente mandara a `/teologia-basica/la-salvacion`, un capítulo que no
// existe. Si el contenido está acá, su enlace es correcto por construcción.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// fileURLToPath y no new URL().pathname: la ruta del repo tiene espacios y
// pathname los deja como %20, así que ningún readFileSync encuentra el archivo.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src/data');
const PAGES = path.join(ROOT, 'src/pages');

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

/** Texto plano a partir del HTML de un campo `content`. */
export function stripHtml(input) {
    if (input == null) return '';
    const s = typeof input === 'string' ? input : JSON.stringify(input);
    return s
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, ' ')
        .trim();
}

/** Recorre un objeto/array y junta todos los strings de texto que encuentre. */
function deepText(node, acc = []) {
    if (node == null) return acc;
    if (typeof node === 'string') { acc.push(node); return acc; }
    if (typeof node === 'number') return acc;
    if (Array.isArray(node)) { node.forEach(n => deepText(n, acc)); return acc; }
    if (typeof node === 'object') {
        for (const [k, v] of Object.entries(node)) {
            // Campos que son identificadores o rutas, no prosa.
            if (/^(id|slug|href|url|image|imagen|icon|color|youtubeId|pdfUrl|audioUrl|coverImage|banner)$/i.test(k)) continue;
            deepText(v, acc);
        }
        return acc;
    }
    return acc;
}

// ---------------------------------------------------------------------------
// Páginas .jsx — un tercio del sitio vive acá, no en los JSON.
// Las 15 biografías, la Declaración de Fe, Perfecciones de Dios, Hilo del Tiempo.
// ---------------------------------------------------------------------------

/**
 * Extrae la prosa de un archivo JSX. Es aproximado a propósito: sirve para que
 * la búsqueda encuentre la página. El enlace no depende de esto — sale de la
 * ruta registrada en App.jsx, que es exacta.
 */
export function extractJsxText(src) {
    const trozos = [];

    // Texto entre etiquetas: >  ...  <
    for (const m of src.matchAll(/>([^<>{}]+)</g)) trozos.push(m[1]);

    // Strings largos: títulos, párrafos y arrays de contenido declarados en JS.
    for (const m of src.matchAll(/'([^'\\]{40,})'|"([^"\\]{40,})"|`([^`\\$]{40,})`/g)) {
        trozos.push(m[1] || m[2] || m[3]);
    }

    const vistos = new Set();
    const limpio = [];
    for (const t of trozos) {
        const s = t.replace(/\s+/g, ' ').trim();
        if (s.length < 25) continue;

        const palabras = s.split(' ');
        if (palabras.length < 5) continue;

        // Descarta clases de Tailwind y listas de tokens: "flex items-center gap-2
        // md:text-lg" tiene muchas palabras, pero casi todas con - o :
        const tokens = palabras.filter(w => /[-:/]/.test(w)).length;
        if (tokens / palabras.length > 0.3) continue;

        // Descarta código suelto que se haya colado.
        if (/[{}=><]|=>|\bconst\b|\bimport\b|\bclassName\b/.test(s)) continue;

        // Tiene que parecer prosa: al menos una palabra con vocal acentuada o
        // varias palabras normales en minúscula.
        if (!/[a-záéíóúñ]{4,}/i.test(s)) continue;

        if (vistos.has(s)) continue;
        vistos.add(s);
        limpio.push(s);
    }
    return limpio.join(' ');
}

/**
 * Mapa ruta estática → archivo de página, derivado de App.jsx.
 * Se deriva en vez de escribirse a mano para que no se desactualice.
 */
export function staticRoutesFromApp() {
    const src = fs.readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');

    // const Lutero = lazy(() => import('./pages/reformadores/Lutero'));
    const compAArchivo = new Map();
    for (const m of src.matchAll(/const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\(['"]\.\/([^'"]+)['"]\)\)/g)) {
        compAArchivo.set(m[1], m[2]);
    }

    // <Route path="/reformadores/lutero" element={<Lutero />} />
    const rutas = [];
    for (const m of src.matchAll(/<Route\s+path=["']([^"']+)["']\s+element=\{<(\w+)/g)) {
        const [, ruta, comp] = m;
        rutas.push({ ruta, comp, archivo: compAArchivo.get(comp) || null });
    }
    return rutas;
}

function documentosDePaginasJsx() {
    const docs = [];
    const MIN = 2500; // por debajo de esto es una pantalla de listado, no contenido

    for (const { ruta, archivo } of staticRoutesFromApp()) {
        if (!archivo) continue;
        if (ruta.includes(':') || ruta.includes('*')) continue; // dinámicas: ya salen de los JSON

        const rel = `src/${archivo}.jsx`;
        if (!exists(rel)) continue;

        const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
        const texto = extractJsxText(src);
        if (texto.length < MIN) continue;

        // Título, por orden de confianza. `name:` es el de BiographyTemplate,
        // que es como se declaran las 15 biografías.
        const patrones = [
            /\bname:\s*["']([^"']{4,120})["']/,
            /\btitle=["']([^"']{6,120})["']/,
            /\btitle:\s*["']([^"']{6,120})["']/,
            /<h1[^>]*>\s*([^<{]{6,120})\s*</,
        ];
        let titulo = null;
        for (const p of patrones) {
            const m = src.match(p);
            if (m) { titulo = m[1]; break; }
        }
        titulo = (titulo || ruta.split('/').filter(Boolean).pop() || 'Página')
            .replace(/\s*[|—-]\s*Sabiduría para el Corazón\s*$/i, '')
            .replace(/\s+/g, ' ')
            .trim();

        docs.push({ titulo, url: ruta, fuente: 'pagina', texto });
    }
    return docs;
}

// ---------------------------------------------------------------------------
// Fuentes JSON
// ---------------------------------------------------------------------------

export function collectDocuments() {
    const docs = [];
    const push = (titulo, url, fuente, texto) => {
        const t = stripHtml(texto);
        if (t.length < 120) return; // fragmentos sin sustancia
        docs.push({ titulo: String(titulo || '').trim() || 'Recurso', url, fuente, texto: t });
    };

    // --- textos.json ---
    const textos = readJson('src/data/textos.json');
    for (const e of textos.ensayos || []) {
        push(e.title, `/ensayo/${e.slug}`, 'ensayo', [e.title, e.excerpt, e.content].join(' '));
    }
    for (const a of textos.articulos || []) {
        push(a.title, `/articulo/${a.slug}`, 'articulo', [a.title, a.excerpt, a.content].join(' '));
    }
    for (const b of textos.bosquejos || []) {
        push(b.title, `/bosquejo/${b.slug}`, 'bosquejo', [b.title, b.excerpt, b.content].join(' '));
    }
    // Las meditaciones NO tienen ruta registrada en App.jsx: se indexan para que
    // el agente sepa lo que dicen, pero sin enlace (url null → nunca se sugiere).
    for (const m of textos.meditaciones || []) {
        push(m.title, null, 'meditacion', [m.title, m.excerpt, m.content].join(' '));
    }

    // --- content.json ---
    const content = readJson('src/data/content.json');
    for (const a of content.articles || []) {
        push(a.title, `/articulo/${a.slug}`, 'articulo', [a.title, a.excerpt, a.content].join(' '));
    }
    for (const e of content.estudios || []) {
        push(e.title, `/estudio/${e.slug}`, 'estudio', deepText(e).join(' '));
    }
    const bib = content.biblioteca || {};
    for (const s of bib.series || []) {
        const caps = (s.articulos || []).map(a => `${a.titulo} ${a.subtitulo || ''}`).join('. ');
        push(s.titulo, `/biblioteca/series/${s.slug}`, 'serie', `${s.titulo}. ${s.descripcion || ''}. ${caps}`);
    }
    for (const l of bib.librosHebreos || []) {
        push(`${l.titulo}${l.subtitulo ? ' — ' + l.subtitulo : ''}`, `/biblioteca/${l.slug}`, 'libro', deepText(l).join(' '));
    }

    // --- teologia-basica.json ---
    const teo = readJson('src/data/teologia-basica.json');
    for (const c of teo.capitulos || []) {
        push(c.titulo, `/teologia-basica/${c.slug}`, 'teologia', `${c.titulo}. ${deepText(c.contenido || c).join(' ')}`);
    }

    // --- estudios-libros.json (Romanos y los que vengan) ---
    const el = readJson('src/data/estudios-libros.json');
    for (const libro of el.libros || []) {
        for (const cap of libro.capitulos || []) {
            push(
                `${cap.titulo} — ${libro.titulo}`,
                `/estudios-libros/${libro.slug}/${cap.slug}`,
                'estudio-libro',
                `${libro.titulo}. ${cap.titulo}. ${cap.subtitulo || ''}. ${deepText(cap.contenido || cap).join(' ')}`
            );
        }
    }

    // --- knowledge/ (teología sistemática de referencia: sin página propia) ---
    const kdir = path.join(DATA, 'knowledge');
    if (fs.existsSync(kdir)) {
        for (const f of fs.readdirSync(kdir).filter(x => x.endsWith('.json') && x !== 'index.json')) {
            try {
                const k = JSON.parse(fs.readFileSync(path.join(kdir, f), 'utf8'));
                push(k.tema || k.title || f.replace('.json', ''), null, 'referencia',
                    `${k.tema || ''}. ${deepText(k.contenido || k).join(' ')}`);
            } catch { /* archivo ilegible: se omite */ }
        }
    }

    // --- devocionales/ ---
    const ddir = path.join(DATA, 'devocionales');
    if (fs.existsSync(ddir)) {
        for (const f of fs.readdirSync(ddir).filter(x => x.endsWith('.json'))) {
            try {
                const serie = JSON.parse(fs.readFileSync(path.join(ddir, f), 'utf8'));
                for (const d of Array.isArray(serie) ? serie : []) {
                    if (!d.id) continue;
                    push(`${d.titulo} — ${d.serie || ''}`.trim(), `/devocionales/${d.id}`, 'devocional', deepText(d).join(' '));
                }
            } catch { /* archivo ilegible: se omite */ }
        }
    }

    // --- predicaciones.json: SOLO títulos. Los 635 audios no tienen transcripción. ---
    if (exists('src/data/predicaciones.json')) {
        const pred = readJson('src/data/predicaciones.json');
        for (const seccion of ['libros', 'temas', 'escuela', 'varios']) {
            for (const serie of pred[seccion] || []) {
                const eps = (serie.episodios || []).map(e => e.titulo || e.title || '').filter(Boolean).join('. ');
                push(`${serie.titulo} — Predicaciones`, `/predicaciones/${seccion}/${serie.id}`, 'predicacion',
                    `Serie de predicaciones: ${serie.titulo}. ${eps}`);
            }
        }
    }

    // --- páginas .jsx ---
    docs.push(...documentosDePaginasJsx());

    return docs;
}

/**
 * Todas las URLs internas que EXISTEN. El agente no puede sugerir ninguna otra.
 * Se arma de las mismas fuentes que los documentos, más las rutas estáticas.
 */
export function collectValidUrls() {
    const urls = new Set();

    for (const { ruta } of staticRoutesFromApp()) {
        if (!ruta.includes(':') && !ruta.includes('*')) urls.add(ruta);
    }
    for (const d of collectDocuments()) {
        if (d.url) urls.add(d.url);
    }
    return [...urls].sort();
}

/** La Declaración de Fe va también al prompt del sistema: es la norma doctrinal. */
export function declaracionDeFe() {
    const rel = 'src/pages/DeclaracionDeFe.jsx';
    if (!exists(rel)) return '';
    return extractJsxText(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}
