// Vercel Edge Middleware — sirve OG meta tags a bots sociales
// Los usuarios normales pasan directo al SPA sin ninguna diferencia.

// SOLO crawlers de previsualización social. Los buscadores (Googlebot, bingbot,
// DuckDuckBot…) NO van acá: deben ver el SPA real. Si se los incluye, reciben el
// HTML de og-preview con su meta refresh y Google lo reporta como "Error de
// redirección" (bucle a sí misma) — además de ser cloaking.
const BOT_UA = /WhatsApp|facebookexternalhit|Facebot|Twitterbot|TelegramBot|LinkedInBot|Slackbot-LinkExpanding|Discordbot|Applebot/i;

const OG_PATHS = /^\/(articulo|ensayo|biblioteca|biografias|reformadores|padres-de-la-iglesia|prerreformadores|estudios-libros|estudio)(\/|$)/;

export default async function middleware(request) {
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
    '/articulo/:slug*',
    '/ensayo/:slug*',
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
  ],
};
