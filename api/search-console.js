// Serverless Function — Google Search Console API
// Auth: OAuth2 con refresh token (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN)
// Caché 30 min.

const GSC_SITE = 'sc-domain:sabiduriaparaelcorazon.com';
const TTL_MS   = 30 * 60 * 1000;

let cache      = null;
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

async function query(token, body) {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`;
  const res  = await fetch(url, {
    method:  'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  return res.json();
}

export default async function handler(_req, res) {
  res.setHeader('Cache-Control', 'public, max-age=1800, stale-while-revalidate=3600');

  if (cache && Date.now() - cache.fetchedAt < TTL_MS) {
    return res.status(200).json(cache.data);
  }

  const missing = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN']
    .filter(k => !process.env[k]);
  if (missing.length) {
    return res.status(200).json({ live: false, error: `Faltan variables: ${missing.join(', ')}` });
  }

  try {
    const token = await getAccessToken();

    const end   = new Date().toISOString().split('T')[0];
    const start = new Date(Date.now() - 28 * 86400000).toISOString().split('T')[0];

    const [queryData, pageData, dailyData, countryData] = await Promise.all([
      query(token, { startDate: start, endDate: end, dimensions: ['query'],   rowLimit: 10 }),
      query(token, { startDate: start, endDate: end, dimensions: ['page'],    rowLimit: 10 }),
      query(token, { startDate: start, endDate: end, dimensions: ['date'],    rowLimit: 28 }),
      query(token, { startDate: start, endDate: end, dimensions: ['country'], rowLimit: 5  }),
    ]);

    const daily            = dailyData.rows  || [];
    const totalClicks      = daily.reduce((a, r) => a + r.clicks, 0);
    const totalImpressions = daily.reduce((a, r) => a + r.impressions, 0);
    const avgCTR           = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const avgPosition      = daily.length > 0
      ? daily.reduce((a, r) => a + r.position, 0) / daily.length : 0;

    const result = {
      live:    true,
      period:  `${start} → ${end}`,
      totals:  { clicks: totalClicks, impressions: totalImpressions, ctr: avgCTR, position: avgPosition },
      queries: (queryData.rows   || []).map(r => ({
        query: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: Math.round(r.position * 10) / 10,
      })),
      pages:   (pageData.rows    || []).map(r => ({
        page: r.keys[0].replace('https://sabiduriaparaelcorazon.com', '') || '/',
        clicks: r.clicks, impressions: r.impressions,
      })),
      countries: (countryData.rows || []).map(r => ({
        country: r.keys[0], clicks: r.clicks, impressions: r.impressions,
      })),
      daily: daily.map(r => ({ date: r.keys?.[0] || '', clicks: r.clicks, impressions: r.impressions })),
    };

    cache = { data: result, fetchedAt: Date.now() };
    return res.status(200).json(result);

  } catch (err) {
    return res.status(200).json({ live: false, error: err.message });
  }
}
