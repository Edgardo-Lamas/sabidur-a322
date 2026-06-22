// Serverless Function — Google Search Console API
// Autenticación con Service Account (JWT RS256, sin dependencias externas)
// Caché 30 min. Requiere GSC_SERVICE_ACCOUNT_JSON en las variables de entorno de Vercel.

import crypto from 'crypto';

const GSC_SITE = 'sc-domain:sabiduriaparaelcorazon.com';
const SCOPE    = 'https://www.googleapis.com/auth/webmasters.readonly';
const TTL_MS   = 30 * 60 * 1000;

let cache      = null;
let tokenCache = null;

function b64url(data) {
  return Buffer.from(typeof data === 'string' ? data : JSON.stringify(data))
    .toString('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function getToken(creds) {
  if (tokenCache && tokenCache.exp > Date.now()) return tokenCache.token;

  const now    = Math.floor(Date.now() / 1000);
  const header = b64url({ alg: 'RS256', typ: 'JWT' });
  const claims = b64url({
    iss:   creds.client_email,
    scope: SCOPE,
    aud:   'https://oauth2.googleapis.com/token',
    exp:   now + 3600,
    iat:   now,
  });

  const toSign = `${header}.${claims}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(toSign);
  const sig = signer.sign(creds.private_key, 'base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const res  = await fetch('https://oauth2.googleapis.com/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${toSign}.${sig}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('GSC token error: ' + JSON.stringify(data));

  tokenCache = { token: data.access_token, exp: Date.now() + 3500 * 1000 };
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

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=1800, stale-while-revalidate=3600');

  if (cache && Date.now() - cache.fetchedAt < TTL_MS) {
    return res.status(200).json(cache.data);
  }

  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    return res.status(200).json({ live: false, error: 'GSC_SERVICE_ACCOUNT_JSON no configurada' });
  }

  try {
    const creds = JSON.parse(raw);
    // Corregir saltos de línea escapados (común al pegar JSON en Vercel)
    creds.private_key = creds.private_key.replace(/\\n/g, '\n');

    const token = await getToken(creds);

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
