// Serverless Function — YouTube Analytics API: de qué países se ve el canal.
//
// ⚠ NO es la misma API que `youtube-stats.js`. Aquélla es la YouTube Data API v3
// y se consulta con una clave; la geografía de la audiencia es privada del canal
// y sólo la sirve la YouTube Analytics API, con OAuth del dueño. Por eso acá se
// reusan las credenciales de Google del panel (las mismas de GA4 y Search Console),
// que desde el 14/9/2026 incluyen el permiso `yt-analytics.readonly`.
//
// Caché 6 horas: la geografía de un canal se mueve despacio.

const CHANNEL_ID = 'UCQ4LzY6UyppxVddHx5f-ZnA';
const TTL_MS     = 6 * 60 * 60 * 1000;
const DIAS       = 90;

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

// 'AR' → '🇦🇷'. Las banderas son dos letras en el bloque de indicadores regionales.
const bandera = (iso) =>
  /^[A-Z]{2}$/.test(iso)
    ? String.fromCodePoint(...[...iso].map(c => 0x1F1E6 + c.charCodeAt(0) - 65))
    : '🌎';

let nombres = null;
const nombrePais = (iso) => {
  try {
    nombres ??= new Intl.DisplayNames(['es'], { type: 'region' });
    return nombres.of(iso) ?? iso;
  } catch {
    return iso;
  }
};

const soloFecha = (d) => d.toISOString().slice(0, 10);

export default async function handler(_req, res) {
  res.setHeader('Cache-Control', 'public, max-age=21600, stale-while-revalidate=3600');

  if (cache && Date.now() - cache.fetchedAt < TTL_MS) {
    return res.status(200).json(cache.data);
  }

  const faltan = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN']
    .filter(k => !process.env[k]);
  if (faltan.length) {
    return res.status(200).json({ live: false, error: `Faltan variables: ${faltan.join(', ')}` });
  }

  try {
    const token = await getAccessToken();

    const hasta = new Date();
    const desde = new Date(hasta.getTime() - DIAS * 24 * 60 * 60 * 1000);

    const url = 'https://youtubeanalytics.googleapis.com/v2/reports?' + new URLSearchParams({
      ids:         `channel==${CHANNEL_ID}`,
      startDate:   soloFecha(desde),
      endDate:     soloFecha(hasta),
      metrics:     'views,estimatedMinutesWatched',
      dimensions:  'country',
      sort:        '-views',
      maxResults:  '15',
    }).toString();

    const r    = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = await r.json();

    if (data.error) {
      // El caso que más va a pasar: el permiso existe pero la cuenta no es dueña
      // del canal, o falta el scope. Se devuelve el motivo, no un 500 mudo.
      return res.status(200).json({
        live:   false,
        error:  data.error.message,
        codigo: data.error.code,
      });
    }

    const filas  = data.rows ?? [];
    const total  = filas.reduce((a, f) => a + (f[1] ?? 0), 0);

    const paises = filas.map(f => {
      const iso = String(f[0] ?? '').toUpperCase();
      return {
        iso,
        pais:    nombrePais(iso),
        bandera: bandera(iso),
        vistas:  f[1] ?? 0,
        minutos: f[2] ?? 0,
        pct:     total > 0 ? Math.round((f[1] / total) * 1000) / 10 : 0,
      };
    });

    const result = {
      live:      true,
      period:    `${DIAS} días`,
      totalVistas: total,
      paises,
    };

    cache = { data: result, fetchedAt: Date.now() };
    return res.status(200).json(result);

  } catch (err) {
    return res.status(200).json({ live: false, error: err.message });
  }
}
