import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

const ALLOWED_ORIGINS = [
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

function loadKnowledgeBase() {
    const dir = join(process.cwd(), 'src/data/knowledge');
    try {
        const files = readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'index.json');

        return files.map(file => {
            try {
                const data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
                const tema = data.tema || data.categoria || data.title || file.replace('.json', '');
                const definicion = data.contenido?.definicion || data.content || data.body || '';
                const refs = data.referencias_clave || data.biblicalReferences || '';
                const slug = data.id || file.replace('.json', '');
                return { tema, slug, definicion: String(definicion).substring(0, 450), refs: String(refs).substring(0, 150) };
            } catch {
                return null;
            }
        }).filter(k => k && k.definicion.length > 50);
    } catch {
        return [];
    }
}

function loadEssays() {
    try {
        const data = JSON.parse(readFileSync(join(process.cwd(), 'src/data/textos.json'), 'utf8'));
        return (data.ensayos || []).slice(-15).map(e => ({
            titulo: e.title || e.titulo || '',
            slug: e.slug || '',
            excerpt: String(e.excerpt || '').substring(0, 180),
        }));
    } catch {
        return [];
    }
}

function getKnowledgeUrl(slug) {
    const KNOWLEDGE_TO_BASICA_MAP = {
        'intro-teologia': '/teologia-basica/introduccion-teologia',
        'revelacion': '/teologia-basica/la-biblia',
        'bibliologia': '/teologia-basica/la-biblia',
        'teologia-propia-atributos': '/teologia-basica/atributos-de-dios',
        'trinidad': '/teologia-basica/atributos-de-dios',
        'cristologia': '/teologia-basica/jesucristo',
        'pneumatologia': '/teologia-basica/el-espiritu-santo',
        'angelologia': '/teologia-basica/los-angeles',
        'demonologia': '/teologia-basica/satanas-y-demonios',
        'antropologia': '/teologia-basica/el-hombre',
        'hamartiologia-pecado': '/teologia-basica/el-pecado',
        'soteriologia-justificacion': '/teologia-basica/la-salvacion',
        'soteriologia-santificacion': '/teologia-basica/la-salvacion',
        'soteriologia-glorificacion': '/teologia-basica/la-salvacion',
        'eclesiologia': '/teologia-basica/la-iglesia',
        'escatologia': '/teologia-basica/las-ultimas-cosas'
    };

    if (KNOWLEDGE_TO_BASICA_MAP[slug]) {
        return KNOWLEDGE_TO_BASICA_MAP[slug];
    }
    if (slug.startsWith('sitio-articulo-')) {
        return `/articulo/${slug.replace('sitio-articulo-', '')}`;
    }
    if (slug.startsWith('sitio-ensayo-')) {
        return `/ensayo/${slug.replace('sitio-ensayo-', '')}`;
    }
    if (slug.startsWith('sitio-meditacion-')) {
        return `/meditacion/${slug.replace('sitio-meditacion-', '')}`;
    }
    return `/teologia-basica`;
}

function buildSystemPrompt(context, suggestedLinks) {
    const linksList = suggestedLinks.map(l => `- "${l.title}" → ${l.url}`).join('\n');

    return `Eres el Agente Spurgeon, asistente teológico del sitio "Sabiduría para el Corazón" — plataforma de teología reformada en español. Tu nombre evoca a Charles Haddon Spurgeon, el Príncipe de los Predicadores.

CARÁCTER:
- Hablas con calidez pastoral, sabiduría y humildad genuina.
- Tu teología es reformada: soberanía de Dios, gracia soberana, Sola Scriptura, Solus Christus, Sola Gratia, Sola Fide.
- Citas la Escritura con precisión y reverencia, integrándola naturalmente en tu respuesta.
- Eres accesible y nunca condescendiente; hablas a alguien que quiere crecer, no a un estudiante que debe aprobar.
- Siempre recuerdas sutilmente que no reemplazas la guianza pastoral humana.

CONTEXTO DE NUESTRO SITIO WEB (Utiliza esta información para responder con exactitud):
${context}

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

function extractJSON(text) {
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
        cleanText = cleanText.substring(7);
    } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.substring(3);
    }
    if (cleanText.endsWith('```')) {
        cleanText = cleanText.substring(0, cleanText.length - 3);
    }
    return JSON.parse(cleanText.trim());
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

    let documents = [];
    try {
        // 1. Generar el embedding de la pregunta con OpenAI
        const embeddingRes = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: question,
        });
        const queryEmbedding = embeddingRes.data[0].embedding;

        // 2. Realizar la búsqueda semántica en Supabase vía REST RPC
        const supabaseUrl = process.env.VITE_SUPABASE_URL;
        const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseKey) {
            const dbResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/match_document_sections`, {
                method: 'POST',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query_embedding: queryEmbedding,
                    match_threshold: 0.35,
                    match_count: 5
                })
            });

            if (dbResponse.ok) {
                documents = await dbResponse.json();
            } else {
                console.warn('[Spurgeon API RAG] Error consultando Supabase RPC:', dbResponse.status, await dbResponse.text());
            }
        }
    } catch (err) {
        console.error('[Spurgeon API RAG] Error en el flujo RAG:', err.message);
    }

    try {
        let context = '';
        const suggestedLinks = [];

        if (Array.isArray(documents) && documents.length > 0) {
            context = documents.map((doc, index) => {
                const meta = doc.metadata || {};
                let url = '/teologia-basica';
                let type = 'general';

                if (meta.source === 'articulo') {
                    url = `/articulo/${meta.slug}`;
                    type = 'articulo';
                } else if (meta.source === 'ensayo') {
                    url = `/ensayo/${meta.slug}`;
                    type = 'ensayo';
                } else if (meta.source === 'teologia_basica') {
                    url = `/teologia-basica/${meta.slug}`;
                    type = 'teologia';
                } else if (meta.source === 'estudio_biblico') {
                    url = `/estudio/${meta.slug}`;
                    type = 'estudio';
                }

                // Añadir a links sugeridos si tiene título y slug
                if (meta.title && meta.slug && suggestedLinks.length < 2) {
                    if (!suggestedLinks.some(l => l.url === url)) {
                        suggestedLinks.push({
                            title: meta.title,
                            url: url,
                            type: type,
                            external: false
                        });
                    }
                }

                return `[Fragmento ${index + 1}]
Título: ${meta.title || 'Recurso'}
Fuente: ${meta.source || 'web'}
Enlace al recurso: ${url}
Contenido: ${doc.content}`;
            }).join('\n\n');
        } else {
            // Fallback a archivos locales si no se encontraron documentos
            const localKnowledge = loadKnowledgeBase();
            const localEssays = loadEssays();

            context = localKnowledge.map(k => {
                const url = getKnowledgeUrl(k.slug);
                return `### ${k.tema} (Enlace de lectura: ${url})\n${k.definicion}`;
            }).join('\n\n');

            localEssays.slice(0, 2).forEach(e => {
                suggestedLinks.push({
                    title: e.titulo,
                    url: `/ensayo/${e.slug}`,
                    type: 'ensayo',
                    external: false
                });
            });
        }

        const systemPrompt = buildSystemPrompt(context, suggestedLinks);

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

        const sources = (documents || []).map(doc => ({
            title: doc.metadata?.title || 'Recurso del sitio',
            source: doc.metadata?.source || 'web'
        }));

        return res.status(200).json({
            reply: data.reply || 'No pude generar una respuesta. Por favor intente nuevamente.',
            verse: data.verse || null,
            suggestedQuestions: Array.isArray(data.suggestedQuestions) ? data.suggestedQuestions.slice(0, 3) : [],
            suggestedLinks: Array.isArray(data.suggestedLinks) ? data.suggestedLinks.slice(0, 2) : (data.suggestedLinks || []),
            sources: sources,
        });

    } catch (err) {
        console.error('[Spurgeon API Error]', err.message);
        return res.status(500).json({
            reply: 'Disculpe, hubo un inconveniente al procesar su consulta. Por favor intente nuevamente en unos momentos.',
            verse: null,
            suggestedQuestions: [
                '¿Qué es la justificación por fe?',
                '¿Qué enseña la Biblia sobre la gracia?',
                '¿Quiénes fueron los Reformadores?'
            ],
            suggestedLinks: [],
            sources: [],
        });
    }
}
