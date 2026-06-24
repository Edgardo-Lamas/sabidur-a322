// Vercel Edge Middleware — sirve OG meta tags a bots sociales
// Los usuarios normales pasan directo al SPA sin ninguna diferencia.

const BOT_UA = /WhatsApp|facebookexternalhit|Facebot|Twitterbot|TelegramBot|LinkedInBot|Slackbot-LinkExpanding|Discordbot|Applebot|Googlebot|bingbot|DuckDuckBot/i;

const OG_PATHS = /^\/(articulo|ensayo|biblioteca|biografias|reformadores|padres-de-la-iglesia|prerreformadores)(\/|$)/;

export default async function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  if (!BOT_UA.test(ua)) return; // Usuarios normales: pasa al SPA

  const url = new URL(request.url);
  const path = url.pathname;

  if (!OG_PATHS.test(path)) return;

  // Proxy transparente a la función que genera el HTML con OG tags
  const previewUrl = new URL('/api/og-preview', url.origin);
  previewUrl.searchParams.set('path', path);

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
  ],
};
