import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';
import { buscar, dimensionesIndice, filtrarEnlaces } from './rag-search.js';

const ALLOWED_ORIGINS = [
    'https://sabiduriaparaelcorazon.com',
    'https://www.sabiduriaparaelcorazon.com',
    'https://sabiduriadelcorazon.vercel.app',
    'http://localhost:5173',
    'http://localhost:4173',
];

// Rate limiter en memoria: máx 10 requests por IP cada 60 segundos
const rateLimits = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip) {
    const now = Date.now();
    const entry = rateLimits.get(ip);
    if (!entry || now > entry.resetAt) {
        rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
        return true;
    }
    if (entry.count >= RATE_LIMIT) return false;
    entry.count++;
    return true;
}

const questionSchema = z.object({
    question: z.string().trim().min(3).max(500),
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// La Declaración de Fe es la norma doctrinal del sitio: va SIEMPRE en el prompt,
// no solo cuando la búsqueda la trae por casualidad. Se lee una vez por instancia.
let declaracionCache = null;
function declaracionDeFe() {
    if (declaracionCache !== null) return declaracionCache;
    try {
        const idx = JSON.parse(readFileSync(join(process.cwd(), 'src/data/rag-index.json'), 'utf8'));
        declaracionCache = idx.fragmentos
            .filter(f => f.u === '/declaracion-de-fe')
            .map(f => f.c)
            .join(' ')
            .slice(0, 4000);
    } catch {
        declaracionCache = '';
    }
    return declaracionCache;
}

function buildSystemPrompt(context, suggestedLinks) {
    const linksList = suggestedLinks.map(l => `- "${l.title}" → ${l.url}`).join('\n');
    const declaracion = declaracionDeFe();

    return `Eres el Agente Spurgeon, asistente teológico del sitio "Sabiduría para el Corazón" — plataforma de teología reformada en español. Tu nombre evoca a Charles Haddon Spurgeon, el Príncipe de los Predicadores.

CARÁCTER:
- Hablas con calidez pastoral, sabiduría y humildad genuina.
- Tu teología es reformada: soberanía de Dios, gracia soberana, Sola Scriptura, Solus Christus, Sola Gratia, Sola Fide.
- Citas la Escritura con precisión y reverencia, integrándola naturalmente en tu respuesta.
- Eres accesible y nunca condescendiente; hablas a alguien que quiere crecer, no a un estudiante que debe aprobar.
- Siempre recuerdas sutilmente que no reemplazas la guianza pastoral humana.
${declaracion ? `
DECLARACIÓN DE FE DEL SITIO (es la norma doctrinal de esta casa: tus respuestas no pueden contradecirla):
${declaracion}
` : ''}
CONTEXTO DE NUESTRO SITIO WEB (Utiliza esta información para responder con exactitud):
${context || '(La búsqueda no encontró material propio para esta pregunta. Responde desde la doctrina reformada, sin citar recursos del sitio.)'}

ENLACES RECOMENDADOS DEL SITIO (Si son relevantes para la pregunta, sugiérelos exactamente como están aquí):
${linksList || '- /teologia-basica (Curso de Teología Básica)'}

OTRAS RUTAS GENERALES DEL SITIO:
- /biografias — Biografías de Reformadores y Padres de la Iglesia
- /ensayos — Todos los ensayos teológicos
- /teologia-basica — Curso de Teología Básica completo (12 capítulos)
- /esquemas — Esquemas, mapas conceptuales y líneas de tiempo interactivas
- /mapas-biblicos — Mapas bíblicos interactivos
- /estudios-libros — Estudios de libros bíblicos
- /estudio/perfecciones-de-dios — Serie "Las Perfecciones de Dios"
- /prerreformadores — Wycliffe, Hus, Tyndale y otros
- /reformadores — Lutero, Calvino, Zuinglio, Knox, Bullinger

INSTRUCCIONES DE RESPUESTA:
- Responde SIEMPRE en formato JSON válido con la estructura exacta indicada abajo.
- Tu respuesta ("reply") debe ser pastoral, cálida, teológicamente precisa y basarse primariamente en el CONTEXTO provisto.
- La respuesta ("reply") debe tener una extensión de entre 150 y 280 palabras.
- Integra referencias bíblicas naturalmente en el texto.
- Las preguntas sugeridas ("suggestedQuestions") deben profundizar el tema o abrir nuevos ángulos relacionados.
- Solo sugiere links de "suggestedLinks" si están en la sección de ENLACES RECOMENDADOS o RUTAS GENERALES (máximo 2).
- NUNCA inventes una ruta ni deduzcas una a partir del tema. Copia la URL EXACTA, carácter por carácter, de las listas de arriba. Si ninguna corresponde, devuelve "suggestedLinks": [] — es preferible no ofrecer lectura a mandar al lector a una página que no existe.
- NO agregues texto antes ni después del JSON. Devuelve únicamente el objeto JSON.

ESTRUCTURA JSON DE RESPUESTA:
{
  "reply": "Tu respuesta completa aquí.",
  "verse": { "text": "Texto del versículo más relevante", "reference": "Libro Cap:Ver" },
  "suggestedQuestions": ["Pregunta 1", "Pregunta 2", "Pregunta 3"],
  "suggestedLinks": [
    { "title": "Título del recurso", "url": "/ruta", "type": "ensayo", "external": false }
  ]
}`;
}

/**
 * Rescata el objeto JSON de la respuesta del modelo.
 *
 * Hace falta ser tolerante porque el modelo, de vez en cuando, devuelve un JSON
 * que `JSON.parse` rechaza — normalmente por un salto de línea real dentro de una
 * cadena. No es frecuente, pero cuando pasa el lector recibía el mensaje genérico
 * de error en vez de una respuesta. Se intenta, en orden:
 *   1. tal cual, sin las comillas de bloque
 *   2. recortando desde la primera llave hasta la que la cierra
 *   3. escapando los saltos de línea y tabulaciones que quedaron sueltos
 *
 * `claude-sonnet-4-6` no admite salida estructurada (la función de la API que
 * garantizaría el JSON), así que esto es lo que hay sin migrar de modelo.
 */
function extractJSON(text) {
    let s = String(text || '').trim();

    // Quitar el ```json … ``` que a veces envuelve la respuesta.
    s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

    const intentos = [s];

    // Desde la primera llave hasta la que la cierra, ignorando las que están
    // dentro de una cadena.
    const inicio = s.indexOf('{');
    if (inicio !== -1) {
        let nivel = 0, enCadena = false, escapado = false;
        for (let i = inicio; i < s.length; i++) {
            const c = s[i];
            if (escapado) { escapado = false; continue; }
            if (c === '\\') { escapado = true; continue; }
            if (c === '"') { enCadena = !enCadena; continue; }
            if (enCadena) continue;
            if (c === '{') nivel++;
            else if (c === '}' && --nivel === 0) { intentos.push(s.slice(inicio, i + 1)); break; }
        }
    }

    for (const candidato of intentos) {
        try { return JSON.parse(candidato); } catch { /* se prueba el siguiente */ }
        // Último recurso: escapar los saltos de línea crudos que quedaron dentro
        // de una cadena, que es la causa habitual del fallo.
        try {
            let enCadena = false, escapado = false, out = '';
            for (const c of candidato) {
                if (escapado) { out += c; escapado = false; continue; }
                if (c === '\\') { out += c; escapado = true; continue; }
                if (c === '"') { enCadena = !enCadena; out += c; continue; }
                if (enCadena && c === '\n') { out += '\\n'; continue; }
                if (enCadena && c === '\r') { continue; }
                if (enCadena && c === '\t') { out += '\\t'; continue; }
                out += c;
            }
            return JSON.parse(out);
        } catch { /* se prueba el siguiente */ }
    }

    throw new Error('El modelo no devolvió un JSON interpretable');
}

export default async function handler(req, res) {
    const origin = req.headers.origin;
    if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
    if (!checkRateLimit(ip)) {
        return res.status(429).json({ error: 'Demasiadas consultas. Espera un momento antes de continuar.' });
    }

    const parsed = questionSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: 'La pregunta debe tener entre 3 y 500 caracteres.' });
    }
    const { question } = parsed.data;

    // Búsqueda semántica sobre el índice local. Antes esto consultaba Supabase;
    // ese proyecto se descartó y la búsqueda quedó muerta sin dar error: el agente
    // respondía teología genérica y recomendaba páginas inventadas.
    let documents = [];
    try {
        const embeddingRes = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: question,
            dimensions: dimensionesIndice(),
        });
        documents = buscar(embeddingRes.data[0].embedding, { limite: 5 });
    } catch (err) {
        console.error('[Spurgeon RAG] Falló la búsqueda:', err.message);
    }

    // El contexto y los enlaces salen de los mismos fragmentos encontrados. La URL
    // de cada uno la calculó el indexador desde el slug real del archivo, así que
    // apunta a algo que existe por construcción. Se arman ACÁ, fuera del try, para
    // que si la llamada al modelo falla el lector reciba al menos estas lecturas
    // en lugar de una respuesta vacía.
    const enlacesDelContexto = filtrarEnlaces(
        documents.filter(d => d.url).map(d => ({ title: d.title, url: d.url, type: d.source }))
    );

    try {
        const context = documents.map((doc, i) => [
            `[Fragmento ${i + 1}]`,
            `Título: ${doc.title}`,
            `Tipo: ${doc.source}`,
            doc.url ? `Enlace al recurso: ${doc.url}` : 'Sin página propia: NO lo enlaces.',
            `Contenido: ${doc.content}`,
        ].join('\n')).join('\n\n');

        const systemPrompt = buildSystemPrompt(context, enlacesDelContexto);

        // 3. Consultar a Claude (Anthropic)
        const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 1200,
            system: systemPrompt,
            messages: [
                { role: 'user', content: question }
            ],
            temperature: 0.7,
        });

        const rawText = response.content[0].text;
        const data = extractJSON(rawText);

        const sources = documents.map(doc => ({ title: doc.title, source: doc.source }));

        // Los enlaces del modelo pasan por el validador SIEMPRE. Aunque el prompt
        // le pida que use solo los recomendados, un enlace inventado no da 404 en
        // esta SPA: da HTTP 200 y una pantalla de "no encontrado" al lector.
        // Si no sobrevive ninguno, se usan los del propio contexto.
        const enlacesValidados = filtrarEnlaces(data.suggestedLinks);
        const descartados = (Array.isArray(data.suggestedLinks) ? data.suggestedLinks.length : 0) - enlacesValidados.length;
        if (descartados > 0) {
            console.warn(`[Spurgeon] ${descartados} enlace(s) inexistente(s) descartado(s):`,
                data.suggestedLinks.filter(l => !enlacesValidados.some(v => v.url === l?.url)).map(l => l?.url).join(', '));
        }

        return res.status(200).json({
            reply: data.reply || 'No pude generar una respuesta. Por favor intente nuevamente.',
            verse: data.verse || null,
            suggestedQuestions: Array.isArray(data.suggestedQuestions) ? data.suggestedQuestions.slice(0, 3) : [],
            suggestedLinks: enlacesValidados.length ? enlacesValidados : enlacesDelContexto,
            sources: sources,
        });

    } catch (err) {
        console.error('[Spurgeon API Error]', err.message);
        // Aunque falle la redacción, la búsqueda pudo haber encontrado material.
        // Se ofrecen esas lecturas — ya validadas — en lugar de dejar al lector
        // con un mensaje de error y nada para leer.
        return res.status(500).json({
            reply: enlacesDelContexto.length
                ? 'Disculpe, no pude redactar la respuesta en este momento. Mientras tanto, en el sitio hay material sobre su consulta; le dejo los enlaces abajo.'
                : 'Disculpe, hubo un inconveniente al procesar su consulta. Por favor intente nuevamente en unos momentos.',
            verse: null,
            suggestedQuestions: [
                '¿Qué es la justificación por fe?',
                '¿Qué enseña la Biblia sobre la gracia?',
                '¿Quiénes fueron los Reformadores?'
            ],
            suggestedLinks: enlacesDelContexto,
            sources: documents.map(doc => ({ title: doc.title, source: doc.source })),
        });
    }
}
