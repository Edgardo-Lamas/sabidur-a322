// Serverless Function — genera HTML mínimo con OG tags para bots sociales.
// Solo es llamada por el middleware cuando detecta un bot; usuarios normales nunca la ven.
import fs from 'fs';
import path from 'path';

const SITE_TITLE = 'Sabiduría para el Corazón';
const SITE_DESC = 'Recursos de teología reformada, exégesis bíblica y bosquejos homiléticos para la edificación de la Iglesia de Cristo.';

function escHtml(str = '') {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function resolveImage(img, base) {
  if (!img) return `${base}/img/og-default.jpg`;
  if (img.startsWith('http')) return img;
  return `${base}/${img.replace(/^\//, '')}`;
}

export default function handler(req, res) {
  const urlPath = req.query.path || '/';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host  = req.headers['x-forwarded-host'] || req.headers.host || 'sabiduriadelcorazon.com';
  const BASE  = `${proto}://${host}`;

  // Leer datos
  let content = {}, textos = {};
  try {
    content = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/content.json'), 'utf-8'));
    textos  = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/textos.json'),  'utf-8'));
  } catch { /* datos no cargados — se usa fallback genérico */ }

  let title       = SITE_TITLE;
  let description = SITE_DESC;
  let image       = `${BASE}/img/og-default.jpg`;

  // /articulo/:slug
  const artMatch = urlPath.match(/^\/articulo\/(.+)$/);
  if (artMatch) {
    const slug = artMatch[1];
    const pool = [...(textos.articulos || []), ...(content.articles || [])];
    const found = pool.find(a => a.slug === slug);
    if (found) {
      title       = `${found.title} | ${SITE_TITLE}`;
      description = found.excerpt || SITE_DESC;
      image       = resolveImage(found.image, BASE);
    }
  }

  // /ensayo/:slug
  const ensayoMatch = urlPath.match(/^\/ensayo\/(.+)$/);
  if (ensayoMatch) {
    const slug  = ensayoMatch[1];
    const found = (textos.ensayos || []).find(e => e.slug === slug);
    if (found) {
      title       = `${found.title} | ${SITE_TITLE}`;
      description = found.excerpt || SITE_DESC;
    }
  }

  // /biblioteca/:slug — páginas individuales de libros
  const libroMatch = urlPath.match(/^\/biblioteca\/(.+)$/);
  if (libroMatch) {
    const slug  = libroMatch[1];
    const libros = (content.biblioteca?.librosHebreos || []);
    const found  = libros.find(l => l.slug === slug);
    if (found) {
      title       = `${found.titulo} — ${found.subtitulo} | ${SITE_TITLE}`;
      description = found.descripcion || SITE_DESC;
      image       = resolveImage(found.coverImage, BASE);
    }
  }

  const canonicalUrl = `${BASE}${urlPath}`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${escHtml(title)}</title>
  <meta name="description" content="${escHtml(description)}">

  <!-- Open Graph -->
  <meta property="og:type"        content="article">
  <meta property="og:site_name"   content="${escHtml(SITE_TITLE)}">
  <meta property="og:url"         content="${escHtml(canonicalUrl)}">
  <meta property="og:title"       content="${escHtml(title)}">
  <meta property="og:description" content="${escHtml(description)}">
  <meta property="og:image"       content="${escHtml(image)}">

  <!-- Twitter / X -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${escHtml(title)}">
  <meta name="twitter:description" content="${escHtml(description)}">
  <meta name="twitter:image"       content="${escHtml(image)}">

  <link rel="canonical" href="${escHtml(canonicalUrl)}">
  <!-- Redirige a los usuarios que lleguen directamente a esta URL -->
  <meta http-equiv="refresh" content="0;url=${escHtml(canonicalUrl)}">
</head>
<body>
  <p>Redirigiendo a <a href="${escHtml(canonicalUrl)}">${escHtml(title)}</a>…</p>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  res.status(200).send(html);
}
