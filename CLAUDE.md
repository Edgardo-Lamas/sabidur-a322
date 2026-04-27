# CLAUDE.md — Sabiduría para el Corazón

Plataforma de educación teológica reformada en español.

## Stack

- **React 19** + **Vite 7** + **React Router 7**
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Framer Motion** — animaciones
- **Leaflet / React Leaflet** — mapas bíblicos interactivos
- **OpenAI API** — ChatSpurgeon (chat teológico)
- **N8N webhook** — automatización de formularios/chat
- **React Helmet Async** — SEO por página

## Comandos

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build de producción en /dist
npm run preview  # Vista previa del build
npm run lint     # ESLint
```

## Estructura

```
src/
├── components/     # Componentes reutilizables (maps/, audio/, ui/)
├── pages/          # Páginas/rutas (~40 rutas)
│   ├── prerreformadores/   # Wiclef, JanHus, etc.
│   └── reformadores/       # Lutero, Calvino, Zuinglio, Knox, Bullinger
├── data/
│   ├── content.json        # Artículos, lecturas diarias, hero, social, productos, estudios, biblioteca
│   ├── textos.json         # Ensayos (fuente para /ensayos/:slug y página Ensayos)
│   └── knowledge/          # 34 JSON de teología sistemática
├── engine/         # NarrativeContext + hooks para narrativas interactivas
├── hooks/          # Custom hooks
└── services/       # geoJSONService
```

## Convenciones de contenido

- **Artículos:** `src/data/content.json` → clave `articulos` — enrutados en `/articulos/:slug`.
- **Ensayos:** `src/data/textos.json` → clave `ensayos` — enrutados en `/ensayos/:slug`. Leídos por `Ensayos.jsx` y `EnsayoDetalle.jsx`.
- **Lecturas diarias, hero, social, productos, estudios, biblioteca:** `src/data/content.json`.
- **Base de conocimiento teológica:** `src/data/knowledge/*.json` — bibliología, cristología, soteriología, escatología, etc.
- **Todo el contenido está en español.**

## Patrones arquitectónicos

- **Data-driven rendering:** los componentes leen de JSON, no de base de datos en tiempo real (Supabase migrado a archivos JSON locales).
- **Plantillas reutilizables:** `TextTemplates.jsx`, `BiographyTemplate.jsx`, `ArticleFeed.jsx`.
- **SEO por página:** componente `SEO.jsx` con `react-helmet-async`.
- **React StrictMode está desactivado** intencionalmente — react-leaflet no es compatible con el doble efecto de StrictMode.

## Variables de entorno (`.env`)

```
VITE_SUPABASE_URL        # Legacy, ya no se usa activamente
VITE_SUPABASE_ANON_KEY   # Legacy
OPENAI_API_KEY           # ChatSpurgeon
VITE_N8N_WEBHOOK_URL     # Webhook N8N
```

## Despliegue

- GitHub Pages con base path `/sabidur-a322/` (configurado en `vite.config.js`).
- `index.html` incluye script para SPA routing en GitHub Pages.

## Notas importantes

- Al agregar **artículos:** editar `src/data/content.json` → clave `articulos`.
- Al agregar **ensayos:** editar `src/data/textos.json` → clave `ensayos`.
- Al agregar una nueva ruta, registrarla en `src/App.jsx`.
- Los mapas bíblicos usan GeoJSON en `src/data/maps/`.
- El ensayo/capítulo "Perfecciones de Dios" tiene rutas propias: `/estudio/perfecciones-de-dios` + capítulos 1–3.
