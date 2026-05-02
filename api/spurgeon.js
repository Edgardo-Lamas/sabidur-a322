import OpenAI from 'openai';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function loadKnowledgeBase() {
    const dir = join(process.cwd(), 'src/data/knowledge');
    const files = readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'index.json');

    return files.map(file => {
        try {
            const data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
            const tema = data.tema || data.categoria || data.title || file.replace('.json', '');
            const definicion = data.contenido?.definicion || data.content || data.body || '';
            const refs = data.referencias_clave || data.biblicalReferences || '';
            return { tema, definicion: String(definicion).substring(0, 450), refs: String(refs).substring(0, 150) };
        } catch {
            return null;
        }
    }).filter(k => k && k.definicion.length > 50);
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

function buildSystemPrompt(knowledge, essays) {
    const knowledgeSummary = knowledge.map(k =>
        `### ${k.tema}\n${k.definicion}${k.refs ? `\nRefs: ${k.refs}` : ''}`
    ).join('\n\n');

    const essaysList = essays.map(e =>
        `- "${e.titulo}" → /ensayos/${e.slug}`
    ).join('\n');

    return `Eres el Agente Spurgeon, asistente teológico del sitio "Sabiduría para el Corazón" — plataforma de teología reformada en español. Tu nombre evoca a Charles Haddon Spurgeon, el Príncipe de los Predicadores.

CARÁCTER:
- Hablas con calidez pastoral, sabiduría y humildad genuina
- Tu teología es reformada: soberanía de Dios, gracia soberana, Sola Scriptura, Solus Christus, Sola Gratia, Sola Fide
- Citas la Escritura con precisión y reverencia, integrándola naturalmente en tu respuesta
- Eres accesible y nunca condescendiente; hablas a alguien que quiere crecer, no a un estudiante que debe aprobar
- Siempre recuerdas sutilmente que no reemplazas la guianza pastoral humana

BASE DE CONOCIMIENTO TEOLÓGICA:
${knowledgeSummary}

ENSAYOS DEL SITIO:
${essaysList}

RUTAS DEL SITIO (para sugerencias de lectura):
- /biografias — Reformadores y Padres de la Iglesia
- /ensayos — Todos los ensayos teológicos
- /teologia-sistematica — Teología sistemática completa
- /mapas-biblicos — Mapas bíblicos interactivos
- /estudios-libros — Estudios de libros bíblicos
- /estudio/perfecciones-de-dios — Serie "Las Perfecciones de Dios"
- /prerreformadores — Wycliffe, Hus, Tyndale y otros
- /reformadores — Lutero, Calvino, Zuinglio, Knox, Bullinger

INSTRUCCIONES DE RESPUESTA:
- Responde SIEMPRE en JSON válido con la estructura exacta indicada abajo
- La respuesta debe ser pastoral, cálida y teológicamente precisa
- Entre 150 y 280 palabras para el campo "reply"
- Integra referencias bíblicas naturalmente en el texto
- Las preguntas sugeridas deben profundizar el tema o abrir nuevos ángulos relacionados
- Solo sugiere links del sitio si son genuinamente relevantes (máximo 2)

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

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

    const { question } = req.body || {};
    if (!question?.trim()) return res.status(400).json({ error: 'La pregunta es requerida' });

    try {
        const knowledge = loadKnowledgeBase();
        const essays = loadEssays();
        const systemPrompt = buildSystemPrompt(knowledge, essays);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: question.trim() }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
            max_tokens: 950,
        });

        const data = JSON.parse(completion.choices[0].message.content);

        return res.status(200).json({
            reply: data.reply || 'No pude generar una respuesta. Por favor intente nuevamente.',
            verse: data.verse || null,
            suggestedQuestions: Array.isArray(data.suggestedQuestions) ? data.suggestedQuestions.slice(0, 3) : [],
            suggestedLinks: Array.isArray(data.suggestedLinks) ? data.suggestedLinks.slice(0, 2) : [],
            sources: [],
        });

    } catch (err) {
        console.error('[Spurgeon API]', err.message);
        return res.status(500).json({
            reply: 'Disculpe, hubo un inconveniente al procesar su consulta. Por favor intente nuevamente en unos momentos.',
            verse: null,
            suggestedQuestions: [
                '¿Qué es la justificación por fe?',
                '¿Qué enseña la Biblia sobre la gracia?',
                '¿Quiénes fueron los Reformadores?'
            ],
            suggestedLinks: [],
        });
    }
}
