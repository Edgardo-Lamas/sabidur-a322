// Serverless Function — Heraldo, agente estratégico de crecimiento
// Usa Anthropic Claude con tool_use para llamar a datos reales del ecosistema
// La conversación (messages[]) la mantiene el cliente; este endpoint es stateless

import Anthropic from '@anthropic-ai/sdk';
import { HERALDO_SYSTEM_PROMPT } from './heraldo-system-prompt.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const TOOLS = [
  {
    name: 'get_seo_data',
    description:
      'Obtiene datos reales de Google Search Console: clics, impresiones, posición media, top 10 keywords y top 10 páginas de los últimos 28 días. Úsalo cuando el usuario pregunte sobre SEO, posicionamiento, tráfico orgánico o keywords.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_youtube_stats',
    description:
      'Obtiene estadísticas reales del canal de YouTube: suscriptores, visualizaciones totales, cantidad de videos, top 8 videos por vistas con thumbnails, y últimos 6 videos publicados. Úsalo para análisis del canal, estrategia de video o diagnóstico de performance.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_site_analytics',
    description:
      'Obtiene métricas de tráfico del sitio web. Úsalo cuando el usuario pregunte sobre visitas, usuarios únicos o rendimiento general del sitio.',
    input_schema: { type: 'object', properties: {}, required: [] },
  },
];

async function callTool(toolName, baseUrl) {
  const map = {
    get_seo_data:       `${baseUrl}/api/search-console`,
    get_youtube_stats:  `${baseUrl}/api/youtube-stats`,
    get_site_analytics: `${baseUrl}/api/analytics`,
  };
  const url = map[toolName];
  if (!url) return { error: `Herramienta desconocida: ${toolName}` };

  try {
    const res = await fetch(url, { headers: { 'x-heraldo-internal': '1' } });
    return await res.json();
  } catch (err) {
    return { error: `No se pudo obtener datos de ${toolName}: ${err.message}` };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Se requiere el array messages[]' });
  }

  const proto   = req.headers['x-forwarded-proto'] || 'https';
  const host    = req.headers.host || 'sabiduriaparaelcorazon.com';
  const baseUrl = `${proto}://${host}`;

  // Formatear mensajes para la API (solo role + content string)
  let currentMessages = messages.map(m => ({
    role:    m.role,
    content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content),
  }));

  // Bucle agéntico — hasta 5 rondas de tool_use
  for (let i = 0; i < 5; i++) {
    let response;
    try {
      response = await client.messages.create({
        model:      'claude-sonnet-4-6',
        max_tokens: 4096,
        system:     HERALDO_SYSTEM_PROMPT,
        tools:      TOOLS,
        messages:   currentMessages,
      });
    } catch (err) {
      return res.status(500).json({ error: `Error de API: ${err.message}` });
    }

    if (response.stop_reason === 'end_turn' || response.stop_reason === 'max_tokens') {
      const text = response.content
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('');
      return res.status(200).json({ reply: text });
    }

    if (response.stop_reason === 'tool_use') {
      const toolBlocks = response.content.filter(b => b.type === 'tool_use');

      // Agregar la respuesta del asistente con los tool_use
      currentMessages.push({ role: 'assistant', content: response.content });

      // Ejecutar todas las herramientas en paralelo
      const results = await Promise.all(
        toolBlocks.map(async tb => {
          const data = await callTool(tb.name, baseUrl);
          return {
            type:        'tool_result',
            tool_use_id: tb.id,
            content:     JSON.stringify(data, null, 2),
          };
        })
      );

      currentMessages.push({ role: 'user', content: results });
      continue;
    }

    // stop_reason inesperado
    break;
  }

  return res.status(200).json({ reply: 'No pude completar el análisis. Intentá de nuevo.' });
}
