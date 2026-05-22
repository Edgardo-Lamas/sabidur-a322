// Serverless Function — proxy para YouTube API con caché en memoria.
// Evita exponer la API key en el bundle del cliente y reduce el uso de quota:
// el endpoint search?order=viewCount cuesta 100 unidades/llamada; con caché
// solo se llama cuando el container está frío (aprox. cada 6 horas en Vercel free).

const API_KEY    = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY || '';
const CHANNEL_ID = 'UCQ4LzY6UyppxVddHx5f-ZnA';
const TTL_MS     = 6 * 60 * 60 * 1000; // 6 horas

const ALLOWED_ORIGINS = [
  'https://sabiduriadelcorazon.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

let cache = null; // { data, fetchedAt }

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  // Devolver caché si está vigente
  if (cache && Date.now() - cache.fetchedAt < TTL_MS) {
    return res.status(200).json(cache.data);
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'YouTube API key not configured' });
  }

  try {
    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?key=${API_KEY}&channelId=${CHANNEL_ID}` +
      `&part=snippet,id&order=viewCount&maxResults=1&type=video`;

    const response = await fetch(url);
    const data     = await response.json();

    if (data.error) {
      return res.status(502).json({ error: data.error.message });
    }

    if (!data.items?.length) {
      return res.status(404).json({ error: 'No videos found' });
    }

    const v = data.items[0];
    const result = {
      id:           v.id.videoId,
      title:        v.snippet.title,
      description:  v.snippet.description,
      thumbnail:    v.snippet.thumbnails.high?.url || v.snippet.thumbnails.medium?.url,
      channelTitle: v.snippet.channelTitle,
      publishedAt:  v.snippet.publishedAt,
    };

    cache = { data: result, fetchedAt: Date.now() };
    res.setHeader('Cache-Control', 'public, max-age=21600, stale-while-revalidate=3600');
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
