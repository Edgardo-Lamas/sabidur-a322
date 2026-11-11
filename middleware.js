// Vercel Edge Middleware — sirve OG meta tags a bots sociales
// Los usuarios normales pasan directo al SPA sin ninguna diferencia.

// SOLO crawlers de previsualización social. Los buscadores (Googlebot, bingbot,
// DuckDuckBot…) NO van acá: deben ver el SPA real. Si se los incluye, reciben el
// HTML de og-preview con su meta refresh y Google lo reporta como "Error de
// redirección" (bucle a sí misma) — además de ser cloaking.
const BOT_UA = /WhatsApp|facebookexternalhit|Facebot|Twitterbot|TelegramBot|LinkedInBot|Slackbot-LinkExpanding|Discordbot|Applebot/i;

// La home entra explícita: es el enlace que más se comparte y quedaba afuera.
const OG_PATHS = /^\/(articulo|ensayo|ensayos|articulos|bosquejos|biblioteca|biografias|reformadores|padres-de-la-iglesia|prerreformadores|estudios-libros|estudio|teologia-basica|predicaciones|esquemas|devocionales|adolescentes|grandes-temas|mapas-biblicos|ensenanzas|declaracion-de-fe|tienda|donaciones)(\/|$)|^\/$/;

// El panel de métricas y las APIs que lo alimentan van detrás de una clave
// (Basic Auth). La clave vive en Vercel → env PANEL_PASSWORD. Si la env falta,
// se cierra: mejor un panel inaccesible que métricas públicas.
const PRIVATE_PATHS = /^\/(panel|api\/(analytics|youtube-stats|search-console|youtube-geo))(\/|$)/;

function panelAutorizado(request) {
  const clave = process.env.PANEL_PASSWORD;
  if (!clave) return false;
  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) return false;
  try {
    const [, pass] = atob(header.slice(6)).split(/:(.*)/s);
    return pass === clave;
  } catch {
    return false;
  }
}

export default async function middleware(request) {
  const url0 = new URL(request.url);
  if (PRIVATE_PATHS.test(url0.pathname)) {
    if (panelAutorizado(request)) return; // pasa al SPA / a la función
    return new Response('Acceso restringido', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Panel SPC", charset="UTF-8"',
        'Cache-Control': 'no-store',
      },
    });
  }

  const ua = request.headers.get('user-agent') || '';
  if (!BOT_UA.test(ua)) return; // Usuarios normales: pasa al SPA

  const url = new URL(request.url);
  const path = url.pathname;

  if (!OG_PATHS.test(path)) return;

  // Proxy transparente a la función que genera el HTML con OG tags
  const previewUrl = new URL('/api/og-preview', url.origin);
  previewUrl.searchParams.set('path', path);
  // embed=1 → el HTML se sirve EN la URL real, así que no lleva meta refresh
  // (redirigir a la misma URL sería un bucle infinito para cualquier crawler).
  previewUrl.searchParams.set('embed', '1');

  try {
    const res = await fetch(previewUrl.toString());
    return new Response(await res.text(), {
      status: res.status,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
    });
  } catch {
    return; // Si falla, deja pasar al SPA normalmente
  }
}

export const config = {
  matcher: [
    '/panel',
    '/api/analytics',
    '/api/youtube-stats',
    '/api/search-console',
    '/api/youtube-geo',
    '/',
    '/articulo/:slug*',
    '/ensayo/:slug*',
    '/ensayos',
    '/articulos',
    // '/articulos' es exacto y NO cubre las subrutas: sin esta línea, la carátula
    // de una serie de artículos se comparte con la vista previa genérica.
    '/articulos/:path*',
    '/bosquejos',
    '/biblioteca/:slug*',
    '/biografias',
    '/reformadores',
    '/reformadores/:slug*',
    '/padres-de-la-iglesia',
    '/padres-de-la-iglesia/:slug*',
    '/prerreformadores',
    '/prerreformadores/:slug*',
    '/estudios-libros/:slug*',
    '/estudio/:slug*',
    '/teologia-basica',
    '/teologia-basica/:slug*',
    '/predicaciones/:slug*',
    '/esquemas/:slug*',
    '/devocionales/:slug*',
    '/adolescentes/:slug*',
    '/grandes-temas',
    '/mapas-biblicos/:slug*',
    '/ensenanzas',
    '/declaracion-de-fe',
    '/tienda/:slug*',
    '/donaciones',
  ],
};
