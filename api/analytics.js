// api/analytics.js — Google Analytics 4 Data API
// Reutiliza GSC_SERVICE_ACCOUNT_JSON (mismo service account, scope diferente)
// Requiere también: GA4_PROPERTY_ID (el ID numérico de la propiedad, ej: 123456789)
// La cuenta de servicio debe tener rol "Lector" en la propiedad GA4

import crypto from 'crypto';

const GA4_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const TTL_MS    = 30 * 60 * 1000;

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
    scope: GA4_SCOPE,
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
  if (!data.access_token) throw new Error('GA4 token error: ' + JSON.stringify(data));

  tokenCache = { token: data.access_token, exp: Date.now() + 3500 * 1000 };
  return data.access_token;
}

export default async function handler(_req, res) {
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

  if (cache && Date.now() - cache.fetchedAt < TTL_MS) {
    return res.status(200).json(cache.data);
  }

  const raw        = process.env.GSC_SERVICE_ACCOUNT_JSON;
  const propertyId = process.env.GA4_PROPERTY_ID;

  if (!raw) {
    return res.status(200).json({ live: false, error: 'GSC_SERVICE_ACCOUNT_JSON no configurada' });
  }
  if (!propertyId) {
    return res.status(200).json({ live: false, error: 'GA4_PROPERTY_ID no configurado' });
  }

  try {
    const creds = JSON.parse(raw);
    creds.private_key = creds.private_key.replace(/\\n/g, '\n');

    const token    = await getToken(creds);
    const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
    const headers  = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const report = (body) => fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(body) });

    const [totalsRes, pagesRes, countriesRes, dailyRes] = await Promise.all([
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
    ]);

    const [totals, pages, countries, daily] = await Promise.all([
      totalsRes.json(), pagesRes.json(), countriesRes.json(), dailyRes.json(),
    ]);

    const tv       = totals.rows?.[0]?.metricValues ?? [];
    const sessions  = parseInt(tv[0]?.value ?? 0);
    const users     = parseInt(tv[1]?.value ?? 0);
    const pageviews = parseInt(tv[2]?.value ?? 0);

    const result = {
      live: true,
      period: '28 días',
      totals: { sessions, users, pageviews },
      pages: (pages.rows ?? []).map(r => ({
        page:      r.dimensionValues?.[0]?.value ?? '/',
        pageviews: parseInt(r.metricValues?.[0]?.value ?? 0),
        users:     parseInt(r.metricValues?.[1]?.value ?? 0),
      })),
      countries: (countries.rows ?? []).map(r => ({
        country: r.dimensionValues?.[0]?.value ?? '?',
        users:   parseInt(r.metricValues?.[0]?.value ?? 0),
      })),
      daily: (daily.rows ?? []).map(r => {
        const d = r.dimensionValues?.[0]?.value ?? '';
        return {
          date:     d.length === 8 ? `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}` : d,
          users:    parseInt(r.metricValues?.[0]?.value ?? 0),
          sessions: parseInt(r.metricValues?.[1]?.value ?? 0),
        };
      }),
    };

    cache = { data: result, fetchedAt: Date.now() };
    return res.status(200).json(result);

  } catch (err) {
    return res.status(200).json({ live: false, error: err.message });
  }
}
