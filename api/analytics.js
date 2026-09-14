// Serverless Function — Google Analytics 4 Data API
// Auth: OAuth2 con refresh token (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN)
// Requiere también: GA4_PROPERTY_ID (el ID numérico de la propiedad GA4)
// Caché 30 min.
//
// GET /api/analytics              → resumen del sitio (28 días)
// GET /api/analytics?page=<ruta>  → de dónde llegaron a esa página
//                                   ej: /api/analytics?page=acordaos-de-los-presos

const TTL_MS = 30 * 60 * 1000;

const cache    = new Map();   // clave → { data, fetchedAt }
let tokenCache = null;

async function getAccessToken() {
  if (tokenCache && tokenCache.exp > Date.now()) return tokenCache.token;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    new URLSearchParams({
      client_id:     process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type:    'refresh_token',
    }).toString(),
  });

  const data = await res.json();
  if (!data.access_token) throw new Error('OAuth error: ' + JSON.stringify(data));

  tokenCache = { token: data.access_token, exp: Date.now() + (data.expires_in - 60) * 1000 };
  return data.access_token;
}

// Traduce lo que devuelve GA4 a castellano de persona.
const FUENTES = {
  '(direct)':       'Entrada directa o enlace compartido',
  'google':         'Google',
  'bing':           'Bing',
  'duckduckgo':     'DuckDuckGo',
  'youtube.com':    'YouTube',
  'm.youtube.com':  'YouTube (celular)',
  'l.facebook.com': 'Facebook',
  'facebook.com':   'Facebook',
  'm.facebook.com': 'Facebook (celular)',
  'l.instagram.com':'Instagram',
  'instagram.com':  'Instagram',
  'lm.facebook.com':'Facebook (celular)',
  'linkedin.com':   'LinkedIn',
  'com.whatsapp':   'WhatsApp',
  'whatsapp.com':   'WhatsApp',
  'web.whatsapp.com':'WhatsApp Web',
  't.co':           'X / Twitter',
  'telegram.org':   'Telegram',
  'org.telegram.messenger': 'Telegram',
};

const CANALES = {
  'Direct':          'Entrada directa',
  'Organic Search':  'Búsqueda en Google',
  'Organic Social':  'Redes sociales',
  'Referral':        'Enlace desde otro sitio',
  'Email':           'Correo',
  'Organic Video':   'YouTube y video',
  'Paid Search':     'Publicidad en buscador',
  'Unassigned':      'Sin identificar',
};

const nombreFuente = (source, medium) => {
  const s = (source || '').toLowerCase();
  if (FUENTES[s]) return FUENTES[s];
  if (medium === 'organic') return `${source} (búsqueda)`;
  if (s === '(not set)') return 'Sin identificar';
  return source || 'Sin identificar';
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

  const page      = (req.query?.page || '').trim();
  const claveCache = page ? `page:${page}` : 'sitio';

  const hit = cache.get(claveCache);
  if (hit && Date.now() - hit.fetchedAt < TTL_MS) {
    return res.status(200).json(hit.data);
  }

  // La instancia puede vivir mucho: se limpia lo vencido antes de que el Map crezca.
  if (cache.size > 40) {
    for (const [k, v] of cache) if (Date.now() - v.fetchedAt >= TTL_MS) cache.delete(k);
  }

  const missing = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN']
    .filter(k => !process.env[k]);
  if (missing.length) {
    return res.status(200).json({ live: false, error: `Faltan variables: ${missing.join(', ')}` });
  }

  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    return res.status(200).json({ live: false, error: 'GA4_PROPERTY_ID no configurado' });
  }

  try {
    const token    = await getAccessToken();
    const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
    const headers  = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const report = (body) => fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(body) })
      .then(r => r.json());

    const num = (r, i) => parseInt(r?.metricValues?.[i]?.value ?? 0);
    const dim = (r, i) => r?.dimensionValues?.[i]?.value ?? '';

    const fechaLegible = (d) =>
      d.length === 8 ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}` : d;

    // ─── MODO PÁGINA: de dónde llegaron a una página concreta ────────────────
    if (page) {
      const filtro = {
        filter: { fieldName: 'pagePath', stringFilter: { matchType: 'CONTAINS', value: page } },
      };
      const rango = [{ startDate: '28daysAgo', endDate: 'today' }];

      const [totals, fuentes, canales, referentes, diario, paises] = await Promise.all([
        report({
          dateRanges: rango, dimensionFilter: filtro,
          metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }, { name: 'sessions' }],
        }),
        report({
          dateRanges: rango, dimensionFilter: filtro,
          dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
          metrics:    [{ name: 'screenPageViews' }],
          orderBys:   [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: 10,
        }),
        report({
          dateRanges: rango, dimensionFilter: filtro,
          dimensions: [{ name: 'sessionDefaultChannelGroup' }],
          metrics:    [{ name: 'screenPageViews' }],
          orderBys:   [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: 10,
        }),
        report({
          dateRanges: rango, dimensionFilter: filtro,
          dimensions: [{ name: 'pageReferrer' }],
          metrics:    [{ name: 'screenPageViews' }],
          orderBys:   [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: 10,
        }),
        report({
          dateRanges: rango, dimensionFilter: filtro,
          dimensions: [{ name: 'date' }],
          metrics:    [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
          orderBys:   [{ dimension: { dimensionName: 'date' } }],
          limit: 28,
        }),
        report({
          dateRanges: rango, dimensionFilter: filtro,
          dimensions: [{ name: 'country' }],
          metrics:    [{ name: 'screenPageViews' }],
          orderBys:   [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: 5,
        }),
      ]);

      const t = totals.rows?.[0];
      const resultado = {
        live: true,
        page,
        period: '28 días',
        totals: {
          pageviews: num(t, 0),
          users:     num(t, 1),
          sessions:  num(t, 2),
        },
        sources: (fuentes.rows ?? []).map(r => ({
          source:    dim(r, 0),
          medium:    dim(r, 1),
          nombre:    nombreFuente(dim(r, 0), dim(r, 1)),
          pageviews: num(r, 0),
        })),
        channels: (canales.rows ?? []).map(r => ({
          channel:   dim(r, 0),
          nombre:    CANALES[dim(r, 0)] ?? dim(r, 0),
          pageviews: num(r, 0),
        })),
        referrers: (referentes.rows ?? [])
          .map(r => ({ referrer: dim(r, 0) || '(sin referente)', pageviews: num(r, 0) })),
        countries: (paises.rows ?? [])
          .map(r => ({ country: dim(r, 0) || '?', pageviews: num(r, 0) })),
        daily: (diario.rows ?? []).map(r => ({
          date:      fechaLegible(dim(r, 0)),
          pageviews: num(r, 0),
          users:     num(r, 1),
        })),
      };

      cache.set(claveCache, { data: resultado, fetchedAt: Date.now() });
      return res.status(200).json(resultado);
    }

    // ─── MODO SITIO: el resumen de siempre + de dónde llega la gente ─────────
    const [totals, pages, countries, daily, sources, channels] = await Promise.all([
      report({
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }],
      }),
      report({
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics:    [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
        orderBys:   [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      }),
      report({
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'country' }],
        metrics:    [{ name: 'activeUsers' }],
        orderBys:   [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 5,
      }),
      report({
        dateRanges: [{ startDate: '27daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics:    [{ name: 'activeUsers' }, { name: 'sessions' }],
        orderBys:   [{ dimension: { dimensionName: 'date' } }],
        limit: 28,
      }),
      report({
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
        metrics:    [{ name: 'sessions' }, { name: 'activeUsers' }],
        orderBys:   [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
      report({
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics:    [{ name: 'sessions' }],
        orderBys:   [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
    ]);

    const t = totals.rows?.[0];

    const result = {
      live: true,
      period: '28 días',
      totals: {
        sessions:  num(t, 0),
        users:     num(t, 1),
        pageviews: num(t, 2),
      },
      pages: (pages.rows ?? []).map(r => ({
        page:      dim(r, 0) || '/',
        pageviews: num(r, 0),
        users:     num(r, 1),
      })),
      countries: (countries.rows ?? []).map(r => ({
        country: dim(r, 0) || '?',
        users:   num(r, 0),
      })),
      sources: (sources.rows ?? []).map(r => ({
        source:   dim(r, 0),
        medium:   dim(r, 1),
        nombre:   nombreFuente(dim(r, 0), dim(r, 1)),
        sessions: num(r, 0),
        users:    num(r, 1),
      })),
      channels: (channels.rows ?? []).map(r => ({
        channel:  dim(r, 0),
        nombre:   CANALES[dim(r, 0)] ?? dim(r, 0),
        sessions: num(r, 0),
      })),
      daily: (daily.rows ?? []).map(r => ({
        date:     fechaLegible(dim(r, 0)),
        users:    num(r, 0),
        sessions: num(r, 1),
      })),
    };

    cache.set(claveCache, { data: result, fetchedAt: Date.now() });
    return res.status(200).json(result);

  } catch (err) {
    return res.status(200).json({ live: false, error: err.message });
  }
}
