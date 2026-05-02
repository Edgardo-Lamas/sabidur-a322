# CLAUDE.md — Sabiduría para el Corazón

> **INSTRUCCIÓN PARA CLAUDE:** Leer este archivo al inicio de cada sesión antes de cualquier tarea.
> Verificar siempre que la información aquí esté vigente antes de tomar decisiones de arquitectura o diseño.

Plataforma de educación teológica reformada en español.
URL de producción: desplegada en **Vercel** (rama `main` → deploy automático).

---

## Stack técnico

### Frontend
- **React 19** + **Vite 7** + **React Router 7**
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Framer Motion** — animaciones y transiciones de pantalla
- **Leaflet / React Leaflet** — mapas bíblicos interactivos
- **React Helmet Async** — SEO por página

### Backend / APIs
- **Vercel Serverless Functions** (`/api/*.js`) — lógica de servidor, ES Modules
- **OpenAI API** (`gpt-4o-mini`) — ChatSpurgeon, agente teológico
- **N8N webhook** — solo formulario de newsletter en Footer (falla gracefully, no es crítico)

### Herramientas de diseño y contenido (NUEVAS — verificar siempre)
- **Canva MCP** — generación y edición de assets visuales: logos, wallpapers, banners, PDFs.
  - Disponible como herramienta MCP en sesiones de Claude Code.
  - Usar para: diseño de recursos descargables, wallpapers, materiales de Juventud.
  - Antes de crear assets visuales desde cero, verificar si Canva MCP está conectado.
- **Remotion** — renderizado de video MP4 desde componentes React.
  - Uso previsto: wallpapers animados para la página Juventud (1080×1920px, loop).
  - Estado: **pendiente de instalar** en este proyecto. Instalar con `npm install remotion @remotion/player`.
  - Composiciones irán en `src/remotion/` cuando se implemente.
- **UX/UI** — toda propuesta visual debe respetar el sistema de diseño del sitio (ver sección Identidad Visual).

---

## Comandos

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build de producción en /dist
npm run preview  # Vista previa del build
npm run lint     # ESLint
```

---

## Estructura

```
src/
├── components/         # Componentes reutilizables
│   ├── maps/           # Componentes de mapas bíblicos
│   ├── audio/          # Reproductor de audio
│   ├── ui/             # Elementos UI genéricos
│   ├── BibliaFlow.jsx  # Juego bíblico interactivo (página Juventud)
│   ├── ChatSpurgeon.jsx# Chat teológico — llama a /api/spurgeon
│   ├── Navbar.jsx      # Logo SVG en /img/logo/logo-navbar.svg
│   └── SEO.jsx         # Meta tags + Open Graph
├── pages/              # Páginas/rutas (~40 rutas)
│   ├── Youth.jsx       # Página Juventud (BibliaFlow + recursos)
│   ├── padres-de-la-iglesia/   # Agustín, Crisóstomo, Atanasio, Ireneo, Tertuliano
│   ├── prerreformadores/       # Wiclef, JanHus, Tyndale, etc.
│   └── reformadores/           # Lutero, Calvino, Zuinglio, Knox, Bullinger
├── data/
│   ├── content.json    # Artículos, lecturas diarias, hero, social, productos, estudios, biblioteca
│   ├── textos.json     # Ensayos (fuente para /ensayos/:slug)
│   ├── questions.json  # Preguntas del juego BibliaFlow
│   ├── challenges.json # Desafíos del juego BibliaFlow
│   └── knowledge/      # 34 JSON de teología sistemática
├── engine/             # NarrativeContext + hooks narrativas interactivas
├── hooks/              # Custom hooks
└── services/           # geoJSONService

api/
└── spurgeon.js         # Serverless Function — agente teológico ChatSpurgeon

public/
├── img/
│   ├── logo/
│   │   ├── logo-navbar.svg   # Logo principal (navbar)
│   │   └── favicon.svg       # Favicon "S" dorado
│   └── og-default.jpg        # Imagen OG para redes sociales (1200×630)
└── ...
```

---

## Identidad visual (sistema de diseño)

**Paleta de colores:**
- `sabiduria-navy` — azul marino oscuro, fondo principal
- `sabiduria-gold` / `#C5A059` — dorado, acentos y títulos destacados
- `sabiduria-gray` — texto secundario
- Blanco — texto sobre fondos oscuros

**Tipografía:**
- `font-heading` — títulos, botones, etiquetas (sans-serif bold)
- `font-serif` — cuerpo de texto, citas, párrafos pastorales

**Tono visual:**
- Contemplativo, académico, cálido — NO gamer, NO flashy, NO neón
- Decoración sutil: corchetes angulares, rombos, líneas finas doradas
- Animaciones: Framer Motion con `opacity` + `y` suaves (duración 0.25–0.35s)
- Bordes: `border-white/8` a `border-white/15` sobre fondos oscuros

**Antes de proponer cualquier cambio visual:** verificar que respete esta paleta y tono.

---

## Convenciones de contenido

- **Artículos:** `src/data/content.json` → clave `articulos` — rutas `/articulos/:slug`
- **Ensayos:** `src/data/textos.json` → clave `ensayos` — rutas `/ensayos/:slug`
- **Lecturas diarias, hero, social, productos, estudios, biblioteca:** `src/data/content.json`
- **Base de conocimiento teológica:** `src/data/knowledge/*.json`
- **Todo el contenido está en español.**

---

## Patrones arquitectónicos

- **Data-driven rendering:** componentes leen JSON locales, sin base de datos en tiempo real.
- **Plantillas reutilizables:** `TextTemplates.jsx`, `BiographyTemplate.jsx`, `ArticleFeed.jsx`.
- **SEO por página:** `SEO.jsx` con `react-helmet-async`.
- **React StrictMode desactivado** — react-leaflet no es compatible con el doble efecto.
- **Serverless Functions:** lógica sensible (API keys) va en `/api/*.js`, nunca en el cliente.

---

## Variables de entorno

### Vercel (producción) — configurar en el dashboard de Vercel
```
OPENAI_API_KEY           # ChatSpurgeon — solo servidor, sin prefijo VITE_
VITE_YOUTUBE_API_KEY     # Widget YouTube en Home
VITE_N8N_WEBHOOK_URL     # Newsletter Footer (opcional, falla gracefully)
```

### Legacy (ya no activas)
```
VITE_SUPABASE_URL        # Migrado a JSON locales
VITE_SUPABASE_ANON_KEY   # Migrado a JSON locales
```

---

## Despliegue

- **Plataforma:** Vercel — deploy automático al hacer push a `main`.
- **Sin base path** — `vite.config.js` no tiene `base`. Las rutas son `/`.
- **SPA routing:** `vercel.json` tiene rewrite `/((?!api/).*)` → `/index.html`.
- **Serverless Functions:** en `/api/*.js`. El `vercel.json` incluye `src/data/**` en el bundle de `api/spurgeon.js`.
- **Peer deps:** `.npmrc` tiene `legacy-peer-deps=true` para react-helmet-async con React 19.

---

## Páginas y rutas actuales

| Ruta | Componente | Estado |
|------|-----------|--------|
| `/` | Home.jsx | ✅ |
| `/juventud` | Youth.jsx | ✅ BibliaFlow activo |
| `/biografias` | Biografias.jsx | ✅ |
| `/padres-de-la-iglesia` | PadresDeLaIglesia.jsx | ✅ 5 biografías |
| `/prerreformadores` | Prerreformadores.jsx | ✅ |
| `/reformadores` | Reformadores.jsx | ✅ |
| `/ensayos` | Ensayos.jsx | ✅ 11 ensayos |
| `/teologia-sistematica` | TeologiaSistematica.jsx | ✅ |
| `/mapas-biblicos` | MapasBiblicos.jsx | ✅ Leaflet |
| `/estudios-libros` | EstudiosLibros.jsx | ✅ |
| `/estudio/perfecciones-de-dios` | PerfeccionesDeDios.jsx | ✅ 3 capítulos |
| `/hilo-del-tiempo` | HiloDelTiempo.jsx | ✅ |

---

## Notas importantes

- Al agregar **artículos:** editar `src/data/content.json` → clave `articulos`.
- Al agregar **ensayos:** editar `src/data/textos.json` → clave `ensayos`.
- Al agregar una nueva **ruta:** registrarla en `src/App.jsx` con `lazy()`.
- Los mapas bíblicos usan GeoJSON en `src/data/maps/`.
- El Agente Spurgeon carga los 34 JSON de `knowledge/` en cada request — si se agregan archivos a esa carpeta, quedan automáticamente disponibles para el agente.
- **Wallpapers animados (Juventud):** ✅ Activos. 3 composiciones en `src/remotion/wallpapers/`. MP4s en `public/wallpapers/`. Workflow: editar composición → `node_modules/.bin/remotion render src/remotion/Root.jsx <ID> public/wallpapers/<id>.mp4 --overwrite` → push.
- **Plan de lectura 30 días (Juventud):** pendiente crear contenido JSON + diseño Canva.
