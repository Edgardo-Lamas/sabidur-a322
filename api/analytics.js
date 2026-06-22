// api/analytics.js — Métricas del sitio via Vercel REST API
// Requiere: VERCEL_TOKEN (Vercel → Settings → Tokens)
// VERCEL_PROJECT_ID y VERCEL_TEAM_ID son inyectados automáticamente por Vercel.

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const TOKEN      = process.env.VERCEL_TOKEN;
  const PROJECT_ID = process.env.VERCEL_PROJECT_ID;
  const TEAM_ID    = process.env.VERCEL_TEAM_ID;

  if (!TOKEN) {
    return res.status(200).json({ live: false, error: 'Falta VERCEL_TOKEN' });
  }
  if (!PROJECT_ID) {
    return res.status(200).json({ live: false, error: 'VERCEL_PROJECT_ID no disponible' });
  }

  const headers = { Authorization: `Bearer ${TOKEN}` };
  const teamQ   = TEAM_ID ? `&teamId=${TEAM_ID}` : '';

  try {
    // ── 1. Datos del proyecto y deployments recientes (API bien documentada) ──
    const [projRes, deploysRes] = await Promise.all([
      fetch(`https://api.vercel.com/v9/projects/${PROJECT_ID}?${TEAM_ID ? `teamId=${TEAM_ID}` : ''}`, { headers }),
      fetch(`https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&limit=5&target=production${teamQ}`, { headers }),
    ]);

    const proj    = projRes.ok    ? await projRes.json()    : null;
    const deploys = deploysRes.ok ? await deploysRes.json() : null;

    const projectName    = proj?.name ?? 'Sabiduría para el Corazón';
    const recentDeploys  = (deploys?.deployments ?? []).map(d => ({
      url:    d.url,
      state:  d.readyState ?? d.state,
      fecha:  d.createdAt ? new Date(d.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : '—',
      commit: d.meta?.githubCommitMessage?.split('\n')[0]?.slice(0, 60) ?? '',
    }));

    // ── 2. Intentar Web Analytics (endpoint puede variar según plan) ──
    const to   = Date.now();
    const from = to - 30 * 24 * 60 * 60 * 1000;
    const analyticsParams = new URLSearchParams({
      projectId: PROJECT_ID,
      from: String(from),
      to:   String(to),
      environment: 'production',
      limit: '10',
    });
    if (TEAM_ID) analyticsParams.set('teamId', TEAM_ID);

    // Probar endpoints conocidos en orden
    const analyticsEndpoints = [
      `https://api.vercel.com/v1/web/insights?${analyticsParams}`,
      `https://api.vercel.com/v1/web/insights/stats/pageviews?${analyticsParams}`,
      `https://api.vercel.com/v2/web/insights?${analyticsParams}`,
    ];

    let pages = [];
    let analyticsError = '';
    for (const url of analyticsEndpoints) {
      const r = await fetch(url, { headers });
      if (r.ok) {
        const json = await r.json();
        const rows = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
        pages = rows
          .map(p => ({
            page:    shorten(p.url ?? p.path ?? p.key ?? '/'),
            visitas: Number(p.total ?? p.count ?? p.pageViews ?? p.visitors ?? 0),
          }))
          .filter(p => p.visitas > 0)
          .sort((a, b) => b.visitas - a.visitas)
          .slice(0, 8);
        break;
      } else {
        const body = await r.text();
        analyticsError = `${r.status}: ${body.slice(0, 150)}`;
      }
    }

    const totalVisitas = pages.reduce((s, p) => s + p.visitas, 0);

    return res.status(200).json({
      live:          true,
      projectName,
      recentDeploys,
      pages,
      totals:        { visitas: totalVisitas, periodo: '30 días' },
      analyticsNote: pages.length === 0 ? analyticsError : null,
    });

  } catch (e) {
    return res.status(200).json({ live: false, error: e.message });
  }
}

function shorten(url) {
  const path = url.replace(/^https?:\/\/[^/]+/, '').replace(/^\//, '') || '';
  const MAP = {
    '':                    'Inicio',
    'adolescentes':        'Jóvenes',
    'articulos':           'Artículos',
    'ensayos':             'Ensayos',
    'biblioteca':          'Biblioteca',
    'mapas-biblicos':      'Mapas',
    'biografias':          'Biografías',
    'predicaciones':       'Predicaciones',
    'teologia-basica':     'Teología básica',
    'grandes-temas':       'Grandes temas',
    'esquemas':            'Esquemas',
  };
  const key = path.split('?')[0].split('#')[0].toLowerCase();
  return MAP[key] ?? (path.length > 24 ? '…' + path.slice(-22) : path || 'Inicio');
}
