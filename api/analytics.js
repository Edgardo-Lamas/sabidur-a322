// api/analytics.js — Puente a Vercel Web Analytics REST API
// Requiere: VERCEL_TOKEN (Vercel → Settings → Tokens → crear token con scope "Analytics")
// VERCEL_PROJECT_ID y VERCEL_TEAM_ID son inyectados automáticamente por Vercel en producción.

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
  const PROJECT_ID   = process.env.VERCEL_PROJECT_ID;
  const TEAM_ID      = process.env.VERCEL_TEAM_ID;

  if (!VERCEL_TOKEN) {
    return res.status(200).json({ live: false, error: 'Falta VERCEL_TOKEN en variables de entorno' });
  }
  if (!PROJECT_ID) {
    return res.status(200).json({ live: false, error: 'VERCEL_PROJECT_ID no disponible' });
  }

  const to   = Date.now();
  const from = to - 30 * 24 * 60 * 60 * 1000;

  const params = new URLSearchParams({
    projectId: PROJECT_ID,
    from: String(from),
    to: String(to),
    environment: 'production',
    limit: '10',
  });
  if (TEAM_ID) params.set('teamId', TEAM_ID);

  const headers = { Authorization: `Bearer ${VERCEL_TOKEN}` };

  try {
    const r = await fetch(`https://api.vercel.com/v1/web/insights?${params}`, { headers });

    if (!r.ok) {
      const body = await r.text();
      return res.status(200).json({
        live: false,
        error: `Vercel API ${r.status}: ${body.slice(0, 300)}`,
      });
    }

    const json = await r.json();
    const rows = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);

    // Normalize regardless of minor API shape differences
    const pages = rows
      .map(p => ({
        page: shorten(p.url ?? p.path ?? p.key ?? '/'),
        visitas: Number(p.total ?? p.count ?? p.pageViews ?? p.visitors ?? 0),
      }))
      .filter(p => p.visitas > 0)
      .sort((a, b) => b.visitas - a.visitas)
      .slice(0, 8);

    const totalVisitas = pages.reduce((s, p) => s + p.visitas, 0);

    return res.status(200).json({
      live: true,
      pages,
      totals: { visitas: totalVisitas, periodo: '30 días' },
    });
  } catch (e) {
    return res.status(200).json({ live: false, error: e.message });
  }
}

function shorten(url) {
  const path = url.replace(/^https?:\/\/[^/]+/, '').replace(/^\//, '') || 'Inicio';
  if (!path || path === '/') return 'Inicio';
  // Map common paths to readable labels
  const MAP = {
    '': 'Inicio',
    'adolescentes': 'Jóvenes',
    'articulos': 'Artículos',
    'ensayos': 'Ensayos',
    'biblioteca': 'Biblioteca',
    'mapas-biblicos': 'Mapas',
    'biografias': 'Biografías',
    'perfecciones-de-dios': 'Perfecciones',
    'predicaciones': 'Predicaciones',
    'teologia-basica': 'Teología básica',
    'grandes-temas': 'Grandes temas',
    'esquemas': 'Esquemas',
  };
  const key = path.split('?')[0].split('#')[0].toLowerCase();
  return MAP[key] ?? (path.length > 22 ? '…' + path.slice(-20) : path);
}
