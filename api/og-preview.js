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

// Datos estáticos de las series de biografías
const SERIES_INDEX = {
  '/biografias': {
    title: 'Biografías',
    desc: 'Biografías de hombres que moldearon la historia de la fe cristiana. Prerreformadores, Reformadores y Padres de la Iglesia.',
    image: 'img/biografias-og.jpg',
  },
  '/reformadores': {
    title: 'Reformadores',
    desc: 'Biografías de los hombres que en el siglo XVI dieron forma a la Reforma Protestante. Lutero, Calvino, Zuinglio, Knox y sus contemporáneos.',
    image: 'img/reformadores-og.jpg',
  },
  '/padres-de-la-iglesia': {
    title: 'Padres de la Iglesia',
    desc: 'Biografías de los grandes teólogos del período patrístico: Agustín, Crisóstomo, Atanasio, Ireneo y Tertuliano.',
    image: 'img/padres-iglesia-og.jpg',
  },
  '/prerreformadores': {
    title: 'Prerreformadores',
    desc: 'Biografías de hombres que prepararon el camino antes de la Reforma Protestante. Wycliffe, Jan Hus, Tyndale y otros.',
    image: 'img/prerreformadores-og.jpg',
  },
};

// Datos de biografías individuales
const BIOGRAPHIES = {
  '/reformadores/lutero':   { title: 'Martín Lutero', desc: 'El Monje que Sacudió al Mundo', image: 'img/reformadores/lutero-hero.jpg' },
  '/reformadores/calvino':  { title: 'Juan Calvino', desc: 'El Teólogo de la Soberanía de Dios', image: 'img/reformadores/calvino-hero.jpg' },
  '/reformadores/zuinglio': { title: 'Ulrico Zuinglio', desc: 'El Reformador de Zúrich', image: 'img/reformadores/zuinglio-hero.jpg' },
  '/reformadores/knox':     { title: 'John Knox', desc: 'El Reformador de Escocia', image: 'img/reformadores/knox-hero.jpg' },
  '/reformadores/bullinger':{ title: 'Heinrich Bullinger', desc: 'El Pastor de Zúrich', image: 'img/reformadores/bullinger-hero.jpg' },

  '/padres-de-la-iglesia/agustin':    { title: 'Agustín de Hipona', desc: 'El Doctor de la Gracia', image: 'img/padres-de-la-iglesia/agustin-hero.jpg' },
  '/padres-de-la-iglesia/crisostomo': { title: 'Juan Crisóstomo', desc: 'La Boca de Oro', image: 'img/padres-de-la-iglesia/crisostomo-hero.jpg' },
  '/padres-de-la-iglesia/atanasio':   { title: 'Atanasio de Alejandría', desc: 'El Campeón de la Trinidad', image: 'img/padres-de-la-iglesia/atanasio-hero.jpg' },
  '/padres-de-la-iglesia/ireneo':     { title: 'Ireneo de Lyon', desc: 'El Arquitecto de la Ortodoxia', image: 'img/padres-de-la-iglesia/ireneo-hero.jpg' },
  '/padres-de-la-iglesia/tertuliano': { title: 'Tertuliano', desc: 'El Padre de la Teología Latina', image: 'img/padres-de-la-iglesia/tertuliano-hero.jpg' },

  '/prerreformadores/wycliffe':    { title: 'John Wycliffe', desc: 'La Estrella Matutina de la Reforma', image: 'img/prerreformadores/wycliffe-hero.jpg' },
  '/prerreformadores/jan-hus':     { title: 'Jan Hus', desc: 'El Mártir de Constanza', image: 'img/prerreformadores/jan-hus-hero.jpg' },
  '/prerreformadores/pedro-waldo': { title: 'Pedro Waldo', desc: 'El Mercader que Renunció a Todo', image: 'img/prerreformadores/pedro-waldo-hero.jpg' },
  '/prerreformadores/savonarola':  { title: 'Girolamo Savonarola', desc: 'El Profeta de Florencia', image: 'img/prerreformadores/savonarola-hero.jpg' },
  '/prerreformadores/tyndale':     { title: 'William Tyndale', desc: 'El Mártir de la Palabra', image: 'img/prerreformadores/tyndale-hero.jpg' },
};

export default function handler(req, res) {
  const urlPath = req.query.path || '/';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host  = req.headers['x-forwarded-host'] || req.headers.host || 'sabiduriadelcorazon.com';
  const BASE  = `${proto}://${host}`;

  // Leer datos JSON
  let content = {}, textos = {};
  try {
    content = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/content.json'), 'utf-8'));
    textos  = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/textos.json'),  'utf-8'));
  } catch { /* usa fallback genérico */ }

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
      image       = resolveImage(found.image, BASE);
    }
  }

  // /biblioteca/series/:slug — series de la biblioteca
  const seriesMatch = urlPath.match(/^\/biblioteca\/series\/(.+)$/);
  if (seriesMatch) {
    const slug  = seriesMatch[1];
    const found = (content.biblioteca?.series || []).find(s => s.slug === slug);
    if (found) {
      title       = `${found.titulo} | ${SITE_TITLE}`;
      description = found.descripcion || SITE_DESC;
      image       = resolveImage(found.imagen, BASE);
    }
  }

  // /biblioteca/:slug — páginas individuales de libros (no series)
  const libroMatch = urlPath.match(/^\/biblioteca\/(?!series\/)(.+)$/);
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

  // Páginas de series de biografías (índice de serie)
  if (SERIES_INDEX[urlPath]) {
    const s = SERIES_INDEX[urlPath];
    title       = `${s.title} | ${SITE_TITLE}`;
    description = s.desc;
    image       = resolveImage(s.image, BASE);
  }

  // Páginas de biografías individuales
  if (BIOGRAPHIES[urlPath]) {
    const b = BIOGRAPHIES[urlPath];
    title       = `${b.title} | ${SITE_TITLE}`;
    description = b.desc;
    image       = resolveImage(b.image, BASE);
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
