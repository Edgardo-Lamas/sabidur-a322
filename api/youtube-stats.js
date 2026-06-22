// Serverless Function — estadísticas completas del canal para el dashboard
// Caché 6 horas para no agotar la quota de la YouTube Data API v3
// (search?order=viewCount cuesta 100 unidades; channels y videos cuestan 1 unidad c/u)
// Total: ~203 unidades por ciclo de 6h = ~812/día (límite diario: 10,000)

const API_KEY    = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY || '';
const CHANNEL_ID = 'UCQ4LzY6UyppxVddHx5f-ZnA';
const TTL_MS     = 6 * 60 * 60 * 1000;

let cache = null;

async function yt(path) {
  const res  = await fetch(`https://www.googleapis.com/youtube/v3${path}&key=${API_KEY}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=21600, stale-while-revalidate=3600');

  if (cache && Date.now() - cache.fetchedAt < TTL_MS) {
    return res.status(200).json(cache.data);
  }

  if (!API_KEY) {
    return res.status(200).json({ live: false, error: 'YOUTUBE_API_KEY no configurada' });
  }

  try {
    // 1. Estadísticas del canal (1 unidad)
    const channelData = await yt(`/channels?part=statistics,snippet&id=${CHANNEL_ID}`);
    const stats   = channelData.items?.[0]?.statistics ?? {};
    const snippet = channelData.items?.[0]?.snippet    ?? {};

    // 2. Top videos por vistas (100 unidades — search)
    const topSearch = await yt(`/search?part=snippet&channelId=${CHANNEL_ID}&order=viewCount&maxResults=8&type=video`);
    const topIds    = (topSearch.items || []).map(v => v.id.videoId).join(',');

    // 3. Estadísticas de top videos (1 unidad)
    let topVideos = [];
    if (topIds) {
      const topVids = await yt(`/videos?part=statistics,snippet&id=${topIds}`);
      topVideos = (topVids.items || []).map(v => ({
        id:          v.id,
        title:       v.snippet.title,
        thumbnail:   v.snippet.thumbnails.medium?.url,
        views:       parseInt(v.statistics.viewCount || 0),
        likes:       parseInt(v.statistics.likeCount || 0),
        publishedAt: v.snippet.publishedAt,
      }));
    }

    // 4. Videos recientes (100 unidades — search)
    const recentSearch = await yt(`/search?part=snippet&channelId=${CHANNEL_ID}&order=date&maxResults=6&type=video`);
    const recentIds    = (recentSearch.items || []).map(v => v.id.videoId).join(',');

    // 5. Estadísticas de videos recientes (1 unidad)
    let recentVideos = [];
    if (recentIds) {
      const recentVids = await yt(`/videos?part=statistics,snippet&id=${recentIds}`);
      recentVideos = (recentVids.items || []).map(v => ({
        id:          v.id,
        title:       v.snippet.title,
        thumbnail:   v.snippet.thumbnails.medium?.url,
        views:       parseInt(v.statistics.viewCount || 0),
        publishedAt: v.snippet.publishedAt,
      }));
    }

    const result = {
      live:        true,
      channelName: snippet.title || 'Sabiduría para el Corazón',
      subscribers: parseInt(stats.subscriberCount || 0),
      totalViews:  parseInt(stats.viewCount       || 0),
      videoCount:  parseInt(stats.videoCount      || 0),
      topVideos,
      recentVideos,
    };

    cache = { data: result, fetchedAt: Date.now() };
    return res.status(200).json(result);

  } catch (err) {
    return res.status(200).json({ live: false, error: err.message });
  }
}
