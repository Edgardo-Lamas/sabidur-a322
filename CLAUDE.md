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

### Herramientas de creación de contenido — INVENTARIO COMPLETO

> Antes de crear cualquier asset (imagen, audio, video), revisar esta lista para usar la herramienta correcta.

#### 🖼️ FLUX API (BFL) — Generación de imágenes con IA
- **Estado:** ✅ Configurado. `BFL_API_KEY` guardada en `~/.zprofile` (disponible en cada sesión).
- **Skill:** `bfl-api` + `flux-best-practices` (cargados en sesión con `/bfl-api`).
- **Modelo recomendado:** `FLUX.2 [pro]` — endpoint `/v1/flux-2-pro`, ~$0.03/imagen 1MP.
- **Flujo:** POST → polling → descargar URL (expira en 10 min) → guardar en `public/img/`.
- **Usos en el sitio:** heroes de páginas, portadas de artículos/biografías, OG images, materiales Juventud.
- **Dimensiones útiles:** `1536×576` (hero wide), `1024×1024` (cuadrada), `1200×630` (OG).

#### 🎙️ Voicebox — Generación de voz con IA (MCP nativo)
- **Estado:** ✅ Configurado en `~/.claude.json` como MCP server. App instalada en `/Applications/Voicebox.app`.
- **Requisito:** La app Voicebox debe estar **abierta** en el Mac para que el MCP funcione (corre en `localhost:17493`).
- **Cómo activar:** Abrir Voicebox.app antes de iniciar Claude Code, o abrirla cuando se necesite generar audio.
- **Usos en el sitio:** narraciones para videos Remotion, devocionales en audio, voiceovers para historias Juventud.
- **Integración:** las herramientas MCP de Voicebox aparecen automáticamente en la sesión cuando la app está corriendo.

#### 🎬 Remotion — Video MP4 desde componentes React
- **Estado:** ✅ Instalado y activo.
- **Skill:** `remotion-best-practices` (cargado en sesión con `/remotion-best-practices`).
- **Composiciones activas en `src/remotion/`:**
  - `WallpaperAnsiedad`, `WallpaperSoledad`, `WallpaperIdentidad` — fondos animados Juventud (1080×1920, loop)
  - `FuegoPedro` — fondo Historia El Fracaso (1920×1080, loop, 300 frames)
- **MP4s renderizados en `public/`:** `public/wallpapers/*.mp4`, `public/stories/fracaso-bg.mp4`
- **Comando de render:**
  ```bash
  node_modules/.bin/remotion render src/remotion/Root.jsx <ID> public/<destino>.mp4 --overwrite
  ```
- **Usos previstos:** fondos de nuevas historias Juventud, intro animada, devocionales en video.

#### 🎨 Canva MCP — Diseño de assets visuales
- **Estado:** ✅ Disponible como herramienta MCP en sesiones de Claude Code.
- **Usos:** logos, banners, PDFs descargables, materiales Juventud, thumbnails.
- **Antes de crear assets visuales desde cero:** verificar si Canva MCP está conectado en la sesión.

#### 🌐 UX/UI — Regla general
- Toda propuesta visual debe respetar el sistema de diseño del sitio (ver sección Identidad Visual).
- NO gamer, NO flashy, NO neón — contemplativo, académico, cálido.

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

### Locales en `~/.zprofile` — uso en sesiones de Claude Code
```
BFL_API_KEY              # FLUX API (BFL) — generación de imágenes ✅ Configurada
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
| `/adolescentes` | Youth.jsx | ✅ BibliaFlow + 4 historias |
| `/adolescentes/historias/ansiedad` | HistoriaAnsiedad.jsx | ✅ video Remotion |
| `/adolescentes/historias/soledad` | HistoriaSoledad.jsx | ✅ foto Unsplash + Ken Burns |
| `/adolescentes/historias/identidad` | HistoriaIdentidad.jsx | ✅ foto Unsplash + Ken Burns |
| `/adolescentes/historias/fracaso` | HistoriaFracaso.jsx | ✅ video Remotion (FuegoPedro) |
| `/articulos` | Articles.jsx | ✅ |
| `/ensayos` | Ensayos.jsx | ✅ |
| `/bosquejos` | Bosquejos.jsx | ✅ |
| `/grandes-temas` | GrandesTemas.jsx | ✅ 4 temas, hero FLUX |
| `/teologia-sistematica` | TeologiaSistematica.jsx | ✅ (basada en Ryrie) |
| `/teologia-basica` | TeologiaBasica.jsx | ✅ |
| `/biografias` | Biografias.jsx | ✅ |
| `/padres-de-la-iglesia` | PadresDeLaIglesia.jsx | ✅ 5 biografías |
| `/prerreformadores` | Prerreformadores.jsx | ✅ 5 biografías |
| `/reformadores` | Reformadores.jsx | ✅ 5 biografías |
| `/biblioteca` | Biblioteca.jsx | ✅ |
| `/mapas-biblicos` | MapasBiblicos.jsx | ✅ Leaflet |
| `/estudios-libros` | EstudiosLibros.jsx | ✅ |
| `/estudio/perfecciones-de-dios` | PerfeccionesDeDios.jsx | ✅ 4 capítulos activos |
| `/estudio/hilo-del-tiempo` | HiloDelTiempo.jsx | ✅ |
| `/ensenanzas` | Ensenanzas.jsx | ✅ |
| `/tienda` | Store.jsx | ✅ |
| `/panel` | Panel.jsx | ✅ dashboard métricas |
| `/donaciones` | Donations.jsx | ✅ |

---

## Notas importantes

- Al agregar **artículos:** editar `src/data/content.json` → clave `articulos`.
- Al agregar **ensayos:** editar `src/data/textos.json` → clave `ensayos`.
- Al agregar una nueva **ruta:** registrarla en `src/App.jsx` con `lazy()`.
- Los mapas bíblicos usan GeoJSON en `src/data/maps/`.
- El Agente Spurgeon carga los 34 JSON de `knowledge/` en cada request — si se agregan archivos a esa carpeta, quedan automáticamente disponibles para el agente.
- **Wallpapers animados (Juventud):** ✅ Activos. 3 composiciones en `src/remotion/wallpapers/`. MP4s en `public/wallpapers/`. Workflow: editar composición → `node_modules/.bin/remotion render src/remotion/Root.jsx <ID> public/wallpapers/<id>.mp4 --overwrite` → push.
- **Heroes con FLUX:** imágenes generadas se guardan en `public/img/`. Usar `${import.meta.env.BASE_URL}img/<archivo>` en el `src` del `<img>`.
- **Plan de lectura 30 días (Juventud):** pendiente crear contenido JSON + diseño Canva.
- **Newsletter + devocionales IA:** pendiente. Plan: `/api/devotional.js` (GPT-4o-mini) + Resend para email + lista de suscriptores. El conocimiento de Spurgeon puede alimentar la generación.
