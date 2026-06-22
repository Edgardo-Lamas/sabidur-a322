#!/usr/bin/env node
// Regenera public/sitemap.xml leyendo los slugs de los JSONs de contenido.
// Uso: node scripts/generate-sitemap.js

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const BASE = 'https://sabiduriadelcorazon.com'
const TODAY = new Date().toISOString().split('T')[0]

const textos = JSON.parse(readFileSync(`${root}/src/data/textos.json`, 'utf8'))
const content = JSON.parse(readFileSync(`${root}/src/data/content.json`, 'utf8'))

// Deduplicar artículos entre content.json y textos.json
const slugsArticulos = new Set([
  ...content.articles.map(a => a.slug),
  ...(textos.articulos || []).map(a => a.slug),
])

const slugsEnsayos = (textos.ensayos || []).map(e => e.slug)
const slugsBosquejos = (textos.bosquejos || []).map(b => b.slug)
const slugsMeditaciones = (textos.meditaciones || []).map(m => m.slug)

function urlBlock(path, priority = '0.85', changefreq = 'monthly') {
  return `  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

function section(label, urls) {
  if (!urls.length) return ''
  return `\n  <!-- ${label} -->\n` + urls.join('\n') + '\n'
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Inicio -->
${urlBlock('/', '1.0', 'weekly')}

  <!-- Artículos y Ensayos -->
${urlBlock('/articulos', '0.9', 'weekly')}
${urlBlock('/ensayos', '0.9', 'weekly')}
${urlBlock('/bosquejos', '0.8', 'weekly')}
${urlBlock('/ensenanzas', '0.8', 'weekly')}
${section('Artículos individuales', [...slugsArticulos].map(s => urlBlock(`/articulo/${s}`)))}
${section('Ensayos individuales', slugsEnsayos.map(s => urlBlock(`/ensayo/${s}`)))}
${section('Bosquejos individuales', slugsBosquejos.map(s => urlBlock(`/bosquejo/${s}`)))}
${section('Meditaciones individuales', slugsMeditaciones.map(s => urlBlock(`/meditacion/${s}`)))}
  <!-- Grandes Temas -->
${urlBlock('/grandes-temas', '0.8')}

  <!-- Predicaciones -->
${urlBlock('/predicaciones', '0.9', 'weekly')}

  <!-- Teología -->
${urlBlock('/esquemas', '0.8')}
${urlBlock('/teologia-basica', '0.8')}

  <!-- Estudios -->
${urlBlock('/estudios-libros', '0.7')}
${urlBlock('/estudio/hilo-del-tiempo', '0.8')}
${urlBlock('/estudio/perfecciones-de-dios', '0.8')}
${urlBlock('/estudio/perfecciones-de-dios/capitulo-1', '0.7')}
${urlBlock('/estudio/perfecciones-de-dios/capitulo-2', '0.7')}
${urlBlock('/estudio/perfecciones-de-dios/capitulo-3', '0.7')}
${urlBlock('/estudio/sedym-modulo-3', '0.7')}

  <!-- Mapas Bíblicos -->
${urlBlock('/mapas-biblicos', '0.7')}

  <!-- Biografías -->
${urlBlock('/biografias', '0.8')}

  <!-- Padres de la Iglesia -->
${urlBlock('/padres-de-la-iglesia', '0.7')}

  <!-- Prerreformadores -->
${urlBlock('/prerreformadores', '0.7')}
${urlBlock('/prerreformadores/wycliffe', '0.7')}
${urlBlock('/prerreformadores/jan-hus', '0.7')}
${urlBlock('/prerreformadores/pedro-waldo', '0.7')}
${urlBlock('/prerreformadores/savonarola', '0.7')}
${urlBlock('/prerreformadores/tyndale', '0.7')}

  <!-- Reformadores -->
${urlBlock('/reformadores', '0.7')}
${urlBlock('/reformadores/lutero', '0.7')}
${urlBlock('/reformadores/calvino', '0.7')}
${urlBlock('/reformadores/zuinglio', '0.7')}
${urlBlock('/reformadores/knox', '0.7')}
${urlBlock('/reformadores/bullinger', '0.7')}

  <!-- Biblioteca -->
${urlBlock('/biblioteca', '0.7')}

  <!-- Adolescentes e Historias -->
${urlBlock('/adolescentes', '0.6')}
${urlBlock('/adolescentes/historias/ansiedad', '0.6')}
${urlBlock('/adolescentes/historias/soledad', '0.6')}
${urlBlock('/adolescentes/historias/identidad', '0.6')}
${urlBlock('/adolescentes/historias/fracaso', '0.6')}

  <!-- Tienda y Donaciones -->
${urlBlock('/tienda', '0.6', 'weekly')}
${urlBlock('/donaciones', '0.5', 'yearly')}

  <!-- Declaración de Fe -->
${urlBlock('/declaracion-de-fe', '0.6', 'yearly')}

</urlset>
`

const outPath = `${root}/public/sitemap.xml`
writeFileSync(outPath, xml, 'utf8')
console.log(`✓ sitemap.xml generado — ${(xml.match(/<url>/g) || []).length} URLs`)
