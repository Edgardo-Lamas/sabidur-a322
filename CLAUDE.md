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
- **Skill:** `bfl-api` + `flux-best-practices` (cargados en sesión con `/bfl-api`). **SIEMPRE cargar antes de generar imágenes.**
- **Modelo recomendado:** `FLUX.2 [pro]` — endpoint `/v1/flux-2-pro`, ~$0.03/imagen 1MP.
- **Flujo:** POST → polling → descargar URL (expira en 10 min) → guardar en `public/img/` o `/tmp/`.
- **Usos en el sitio:** heroes de páginas, portadas de artículos/biografías, OG images, materiales Juventud, **portadas e ilustraciones de PDFs**.
- **Dimensiones útiles:**
  - `1536×576` — hero wide
  - `1024×1024` — cuadrada
  - `1200×630` — OG / redes sociales
  - `595×842` — A4 vertical (portada PDF)
  - `1200×400` — ilustración horizontal en página de PDF
- **Estilos probados en PDFs:**
  - Portada El Tanaj: geométrico navy + estrella de David (programático, sin FLUX)
  - Portada El Talmud: pintura al óleo estilo Rembrandt, luz dramática, biblioteca babilónica
  - Textura pergamino: aged parchment manuscript texture, warm ochre and amber tones

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

#### 📄 PDF Pipeline — Python + ReportLab + PyMuPDF + Pillow
- **Estado:** ✅ Establecido. Dependencias instaladas globalmente en el sistema.
- **Librerías:**
  - `reportlab` — layout de texto, estilos tipográficos, canvas para dibujar (portadas, headers, footers)
  - `fitz` (PyMuPDF) — merge de PDFs multiparte (portada + metadata + contenido)
  - `Pillow` + `numpy` — procesamiento de imágenes (brillo, saturación, capas RGBA)
- **Patrón establecido:**
  ```python
  build_cover()    # Portada: imagen FLUX full-bleed + gradientes + texto
  build_content()  # Páginas: textura de fondo (onPage) + texto encima + header/footer (onPageEnd)
  merge_pdf()      # fitz: portada + metadata + contenido → PDF final
  ```
- **CRÍTICO:** La textura/fondo se dibuja en `onPage` (antes del texto). El header/footer en `onPageEnd` (después). Si se invierte, la textura tapa el texto.
- **Scripts en:** `/tmp/create_*.py` — guardar siempre copia antes de cerrar sesión si se quiere reutilizar.
- **Output:** `public/pdf/` — nombres: `El-Talmud.pdf`, `El-Tanaj.pdf`, etc.
- **Paletas por libro:**
  - La Torá: cuero marrón + dorado clásico
  - El Tanaj: navy profundo + dorado + estrella de David (geométrico, sin FLUX)
  - El Talmud: marrón ámbar profundo (#2C1206) + oro ámbar (#C5902A) + pergamino (#F2DCBE)

#### ☁️ Cloudflare R2 — Almacenamiento de audio
- **Estado:** ✅ Bucket `spc-audio` creado. Credenciales en `~/.zprofile`.
- **Variables:** `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_ACCOUNT_ID`, `R2_ENDPOINT`
- **Script de subida:** `/tmp/upload_to_r2.py` (boto3, omite archivos ya subidos por tamaño)
- **URL pública base:** `https://r2.sabiduriadelcorazon.com/audio/`
- **Uso:** hospedar los 635 audios de predicaciones de Matías (formato: `{slug}.mp3/.m4a`)
- **Subida pendiente:** ejecutar con buena conexión → `source ~/.zprofile && python3 /tmp/upload_to_r2.py`

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
│   └── og-default-v2.jpg        # Imagen OG para redes sociales (1200×630)
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

## Guía de publicación de contenido

> **LEER ANTES DE SUBIR CUALQUIER CONTENIDO NUEVO.** Cada tipo tiene su fuente de datos y su formato HTML propio. No mezclar.

---

### PÁGINA TEXTOS (`/articulos`, `/ensayos`, `/bosquejos`)

Esta página agrupa tres tipos de texto distintos con formatos diferentes.

#### 1. Artículos — `/articulo/:slug` (**SIN 's'**, así está registrado en `App.jsx`; `/articulos` a secas es el listado)
- **Fuente:** `src/data/textos.json` → clave `articulos[]` (tiene prioridad); `src/data/content.json` → clave `articles[]` (complemento sin duplicados)
- **Campos:** `id, category, title, excerpt, date, slug, content, image`
- **Formato del `content`:** el mismo HTML que los ensayos, y pasa por el **mismo sanitizador**. Ver "Formato HTML de ensayos".
- **⚠ NO existe la hoja de estilos propia por artículo.** Esta guía afirmaba que el `content` de un artículo lleva sus estilos en un `<style>` al inicio del string. Es falso: `style` no está en la lista blanca de `sanitize.js`, ni como etiqueta ni como atributo, así que DOMPurify borra el bloque `<style>` y **todos** los `style=` inline. **RESUELTO (2026-08-02):** los tres artículos que estaban escritos así (`la-hermeneutica-biblica`, `fundamentos-crecimiento-espiritual`, `la-mujer-la-palabra-y-el-orden-del-hogar`) quedaron limpios de código muerto. Lo único que realmente se veía roto eran **dos tablas sin bordes ni padding, con las celdas pegadas**, porque sus estilos iban inline y el sitio no definía reglas para tablas. Ahora esas reglas están en `src/index.css` (bloque `.teologia-content table/th/td`) y sirven para todo el contenido. **Hoy no queda ningún ensayo ni artículo del sitio con etiquetas o atributos que el sanitizador borre.**
- **Ruta de imagen:** `img/<archivo>.jpg` (servida desde `public/`)

#### 2. Ensayos — `/ensayos/:slug`
- **Fuente:** `src/data/textos.json` → clave `ensayos[]`
- **Campos:** `id, title, slug, author, date, excerpt, content, biblicalReferences[], pdfUrl`
- **Formato del `content`:** HTML estrictamente formateado — ver sección "Formato HTML de ensayos" más abajo.
- **Diferencia clave vs Artículos:** Sin `<style>` tag propio; usa las clases CSS del sistema de diseño del sitio.

#### 3. Bosquejos — `/bosquejos`
- **Fuente:** datos hardcodeados directamente en `src/pages/Bosquejos.jsx` (array interno, no JSON)
- **Contenido:** PDFs en `public/Bosquejos & Guias/`
- **Para agregar:** editar el array en `Bosquejos.jsx` directamente.

---

### PÁGINA BIBLIOTECA (`/biblioteca`)

La Biblioteca tiene cuatro secciones. Cada una tiene su propia fuente de datos en `content.json → biblioteca`.

#### 1. Series y Colecciones — `/biblioteca/series/:slug`
- **Metadatos de la serie:** `content.json → biblioteca.series[]`
  - Campos: `id, slug, titulo, categoria, descripcion, imagen, disponible, totalArticulos, articulos[]`
  - El array `articulos[]` contiene la **lista de capítulos** con campos: `numero, titulo, subtitulo, href, disponible`
  - El `href` de cada artículo apunta a la ruta donde vive su contenido (normalmente `/ensayo/:slug` — **SIN 's', así está registrado en App.jsx**)
- **Contenido del artículo:** vive en `textos.json → ensayos[]` (mismo formato que ensayos de la página Textos)
- **⚠ Algunas series tienen además `lineas[]`** (ej. `reloj-profetico`): un agrupamiento por eje temático, cada uno con `id, nombre, descripcion, color, articulos[]`. **Cuando la serie tiene `lineas[]`, ese es el array que la página realmente renderiza** — `articulos[]` es el listado plano. Dar de alta en uno solo hace que el artículo exista pero no se vea, o que se vea sin estar en el índice.
- **Para publicar un artículo nuevo en una serie:**
  1. Agregar el ensayo en `textos.json → ensayos[]` con su slug
  2. En `content.json → biblioteca.series[n].articulos[]`, marcar `disponible: true`, completar `href: "/ensayo/<slug>"` (**sin 's** — así está registrado en App.jsx) y actualizar `totalArticulos`
  3. **Si la serie tiene `lineas[]`, agregarlo TAMBIÉN en la línea que le corresponde.** `totalArticulos` se calcula sobre `articulos[]`.
  4. Verificar en el navegador que la tarjeta aparece en la página de la serie — es el único modo de detectar el alta a medias.
- **Formato HTML del contenido:** igual al de Ensayos (ver sección "Formato HTML de ensayos")
- **Rótulos de un artículo que pertenece a una serie** — se muestran al lector y deben ser uniformes dentro de la serie:
  - `serie`: el título de la serie tal cual figura en `content.json`, más el eje si la serie tiene líneas → `"El Reloj Profético — Línea de la Iglesia"`. El artículo introductorio va sin eje, porque presenta la serie entera.
  - `serieNumero`: `"<Eje> · <Unidad>"` → `"Israel · Artículo 2"`, `"Iglesia · Bloque II"`. Se agrega `· Artículo N` solo cuando esa unidad tiene más de un artículo.
  - `image`: todos los artículos de una serie comparten la imagen hero de la serie.
  - **El código resuelve la serie con `serie.startsWith(s.titulo)`** (`TextPage.jsx`, `PresentacionViewer.jsx`, `Esquemas.jsx`), nunca por igualdad. Por eso el sufijo del eje es seguro, pero **el `serie` debe empezar exactamente con el `titulo` de la serie** o se rompe el botón "Volver a la serie".

#### Serie activa: Los Arquitectos del Pensamiento Judío (`arquitectos-pensamiento-judio`)

- **Total planificado:** 8 artículos (publicados: 3 — Yojanán ben Zakkai, Akiva ben Yosef, Yehudá haNasí)
- **Imagen hero de serie:** `img/arquitectos-judio-hero.jpg` — se usa como OG image de cada artículo
- **Presentaciones visuales (NotebookLM → PDF):** cada artículo tiene su presentación en `/esquemas/presentacion/<slug>`
  - Slides en `public/img/presentaciones/<slug>/slide-01.jpg` ... `slide-N.jpg`
  - PDF en `public/pdf/presentaciones/<slug>.pdf`
  - Campos en el ensayo: `"presentacionSlug"` y `"presentacionTotalSlides"`
  - Para procesar un PDF nuevo: `python3 /tmp/extract_slides.py "public/Ezquemas/<archivo>.pdf" "<slug>"`
- **Cards en Esquemas Visuales → Presentaciones:** usan `PresentacionCover` (`src/components/PresentacionCover.jsx`) con `compact=true` — diseño navy con número de artículo watermark, nombre de serie en gold y título en serif blanco. **Este modelo de card es el estándar para todas las series que tengan presentaciones.**

#### 2. Libros Sagrados de Israel — colección especial
- **Fuente:** `content.json → biblioteca.librosHebreos[]`
- **Contenido descargable:** PDFs en `public/pdf/` — pipeline Python + ReportLab (ver sección PDF Pipeline)

#### 3. Biblioteca de Consulta — `/biblioteca/consulta`
- **Fuente:** `content.json → biblioteca.consulta[]`
- **Estructura:** categorías con listas de libros recomendados (título, autor, frase). Sin ruta propia por libro.

#### 4. Ebooks PDF — sección de descarga
- **Fuente:** `content.json → biblioteca.ebooks[]`
- **Campos:** `id, titulo, autor, categoria, descripcion, imagenUrl, pdfUrl`
- **Archivos:** PDFs en `public/pdf/`, imágenes en `public/img/`

---

### OTROS LUGARES CON CONTENIDO

| Sección | Fuente de datos | Cómo agregar |
|---|---|---|
| Devocionales (`/devocionales`) | `src/data/devocionales/<serie>.json` + array `ALL_SERIES` en `Devocionales.jsx` | Crear JSON de serie + registrar en `Devocionales.jsx` |
| Enseñanzas — audio (`/ensenanzas`) | `src/data/audio-library.js` | Agregar track al array `AUDIOS` |
| Predicaciones (`/predicaciones`) | `src/data/predicaciones.json` | Agregar entrada; audio debe estar en R2 |
| Estudios de libros (`/estudios-libros`) | `src/data/estudios-libros.json` | Agregar entrada al JSON |
| Teología Básica (`/teologia-basica`) | `src/data/teologia-basica.json` | Agregar tema al JSON |
| Teología Sistemática | `src/data/knowledge/*.json` (34 archivos) | Agregar/editar JSON — disponible automáticamente para ChatSpurgeon |
| Biografías | `.jsx` individual por figura (hardcoded) | Crear nueva página JSX + registrar ruta en `App.jsx` |
| Grandes Temas (`/grandes-temas`) | `content.json → grandesTemas` | Editar JSON |
| Meditaciones | `textos.json → meditaciones[]` | Agregar al array |

---

### Checklist universal al publicar contenido nuevo

1. Agregar el contenido en la fuente correcta (tabla arriba)
2. **Agregar campo `image`** con la ruta a la imagen OG (ej: `"image": "img/mi-imagen.jpg"`). Sin este campo el artículo usa la imagen genérica del sitio al compartirse en WhatsApp/redes. Ver nota abajo.
3. Si es ruta nueva: registrar en `src/App.jsx` con `lazy()`
4. Regenerar el sitemap: `node scripts/generate-sitemap.js`
5. Hacer push a `main` → deploy automático en Vercel

#### Imagen OG (Open Graph) — OBLIGATORIO para artículos y ensayos

- **Campo:** `"image"` en el JSON del artículo/ensayo (textos.json o content.json)
- **Ruta:** relativa desde `public/`, ej: `"img/mi-articulo-og.jpg"`
- **Dimensión ideal:** 1200×630 px — se muestra al compartir en WhatsApp, Facebook, Twitter
- **Para series:** todos los artículos de la misma serie pueden compartir la misma imagen hero de la serie
- **Ejemplo (ensayo de serie):** `"image": "img/arquitectos-judio-hero.jpg"`
- **Si no se define:** el sitio usa `img/og-default-v2.jpg` como fallback (genérico, sin identidad del artículo)
- **Cómo generar:** con FLUX API (`/bfl-api`), dimensión `1200×630`, guardar en `public/img/`

##### ⚠ Toda imagen OG tiene que ser JPEG **baseline**, nunca *progressive*

WhatsApp arma la miniatura de la vista previa con su propio decodificador, no con el
del navegador, y **con un JPEG progressive falla**: baja la imagen y muestra la
tarjeta sin foto. En el navegador se ve perfecta, así que el error no se nota nunca
en desarrollo. Le pasó a `og-default.jpg` (la de la home), que estuvo progressive
desde que se creó y solo se descubrió el 2026-08-06.

```bash
file public/img/mi-og.jpg        # tiene que decir "baseline", no "progressive"
ffmpeg -y -i entrada.jpg -q:v 2 public/img/mi-og.jpg   # regraba baseline
```

⚠ **Si se reemplaza una imagen OG ya publicada, cambiar el NOMBRE del archivo.**
WhatsApp cachea la vista previa por URL: sobrescribir con el mismo nombre deja a
todo el mundo viendo la versión vieja durante días, y en un `curl` no se nota.

---

### Bases de conocimiento teológica y todo el contenido está en español.
- **Base de conocimiento teológica:** `src/data/knowledge/*.json`

---

## Formato HTML de ensayos — ESTÁNDAR OBLIGATORIO

> **CRÍTICO:** Todo ensayo nuevo que se agregue a `src/data/textos.json` DEBE seguir exactamente este formato. No inventar variantes ni usar etiquetas alternativas.

### ⚠ El contenido pasa por un sanitizador — lo no permitido DESAPARECE EN SILENCIO

Todo `content` se renderiza con `dangerouslySetInnerHTML={{ __html: sanitizeHTML(content) }}`. `src/lib/sanitize.js` corre DOMPurify con lista blanca. **Una etiqueta fuera de la lista no da error: se borra, y en producción queda un hueco.**

- **Etiquetas permitidas:** `p br strong em b i u s h1-h6 ul ol li blockquote pre code a img table thead tbody tr th td div span section hr sup sub`
- **Atributos permitidos:** `href src alt title class id target rel width height`
- **NO están permitidos, entre otros:** `svg` y todos sus hijos (`g`, `rect`, `text`, `path`, `line`, `circle`, `defs`, `marker`…), `figure`, `figcaption`, `style`, `iframe`, `video`, y cualquier `data-*`.

**Antes de subir HTML nuevo, contrastar sus etiquetas y atributos contra la lista de `src/lib/sanitize.js`.** No ampliar el sanitizador para acomodar un contenido puntual: abre superficie de XSS en todo el sitio.

### Diagramas e ilustraciones dentro de un ensayo

Como `svg` inline se borra, **un diagrama se sube como archivo y se referencia con `<img>`**:

1. Guardar el SVG en `public/img/diagramas/<slug-del-ensayo>-<n>-<tema>.svg`
2. Insertarlo en el `content` con esta estructura exacta:

```html
<div class='diagrama'><div class='diagrama-marco'><img src='/img/diagramas/archivo.svg' alt='Descripción de lo que muestra el diagrama' /></div><span class='diagrama-epigrafe'>Título del diagrama</span></div>
```

- La ruta del `src` es **absoluta desde la raíz** (`/img/...`). Una ruta relativa rompe: las rutas de ensayo están anidadas.
- Las tres clases están definidas en `src/index.css` (bloque `.teologia-content`). `.diagrama-marco` da scroll horizontal y fija `min-width: 700px` a la imagen: **sin eso, un diagrama de 900px encogido a un móvil deja el texto ilegible.** No reemplazar por clases de Tailwind escritas en el JSON — Tailwind no escanea los `.json` y no las generaría.
- El SVG lleva `viewBox` y **no** `width`/`height` fijos, para que escale.

**Colores de un diagrama — usar la paleta del sitio** (`src/index.css` → `@theme`). **El sitio no tiene modo oscuro**, así que un fondo claro fijo es seguro.

| Uso | Token | Hex |
|---|---|---|
| Fondo del diagrama | `--color-sabiduria-bg` | `#F9F9F7` |
| Bloque/encabezado oscuro | `--color-sabiduria-navy` | `#1A1D23` |
| Bloque/encabezado destacado | `--color-sabiduria-gold` | `#C5A059` |
| Títulos | `--color-text-heading` | `#1A252F` |
| Texto de datos | `--color-text-body` | `#2C3E50` |
| Notas, itálicas, ejes | `--color-sabiduria-gray` | `#4A4A4A` |
| Líneas divisorias | `--color-border-light` | `#BDC3C7` |
| **Dorado como texto** | (el del `.biblical-inline`) | `#7A5C1E` |

> El dorado `#C5A059` **no contrasta como texto** sobre fondo claro: sirve de fondo (con texto navy encima) o de trazo, y para texto dorado va `#7A5C1E`.

Fuente del SVG: `Georgia, 'Times New Roman', 'DejaVu Serif', serif` — el último fallback es el que cubre el griego politónico (βῆμα, φανερόω). Antes de dar por bueno un diagrama, **verificar en el navegador que ningún texto se sale de su caja**: el SVG no reajusta, recorta.

### Estructura del campo `content`

El campo `content` es HTML embebido en JSON (sin saltos de línea reales — todo en una sola cadena).

#### Primer párrafo — letra capital
```html
<p class='first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left'>Texto del primer párrafo...</p>
```
Solo el **primer párrafo** lleva esta clase. El resto son `<p>` simples.

#### Párrafos normales
```html
<p>Texto del párrafo.</p>
```

#### Encabezados de sección
```html
<h2>IV. Título de la Sección</h2>
```
Se usan `<h2>` (no `<h3>`, no `<strong>`, no `<b>`).

**Los capítulos van numerados con romanos y punto** (`I.`, `II.`, `III.` …), correlativos dentro del ensayo. **No** se numeran los encabezados de función: `Prólogo`, `Conclusión pastoral`, `Fuentes consultadas`. No usar la forma `"Capítulo 4 — Título"`. Si el texto de origen trae otra numeración, se convierte a esta al maquetarlo, y se ajustan las referencias cruzadas internas para que coincidan (*"como se vio en el capítulo III"*, no *"en el capítulo 3"*).

#### Citas bíblicas en línea — OBLIGATORIO
```html
<span class='biblical-inline'>«Texto del versículo»</span>
```
- Siempre entre comillas angulares `«»`
- **NUNCA usar `<em>«...»</em>` para versículos** — ese fue el error a corregir
- Solo `<em>` para énfasis genuino de redacción, no para versículos

#### Citas bíblicas en bloque (pull quotes)
```html
<blockquote class='blockquote-gold'>«Texto completo del pasaje bíblico.»<span class='blockquote-ref'>— Referencia 0:0 (RVR1960)</span></blockquote>
```
- Para pasajes largos citados completos (más de una oración)
- Siempre incluir el `<span class='blockquote-ref'>` con la referencia
- **⚠ NUNCA `<footer>`.** No está en la lista blanca de `sanitize.js`: DOMPurify lo borra y **conserva el texto**, así que la referencia queda pegada a la cita y hereda su cursiva, como si fuera parte del versículo. Lo mismo vale para las utilidades de Tailwind escritas en el JSON (`mt-2 text-sabiduria-gray`): Tailwind no escanea los `.json` y no las genera. La clase `.blockquote-ref` está definida en `src/index.css`. Este error estuvo publicado en 122 citas de 34 textos hasta que se corrigió.
- **⚠ El `<footer>` afirma que la cita es literal de esa versión.** Si el texto de origen trae el pasaje parafraseado o resumido, **no** convertirlo en `blockquote`: dejarlo como `biblical-inline` y pedir el texto literal antes de atribuirle una versión. Nunca inventar ni "reconstruir de memoria" el versículo para completar el formato.

#### Qué va en `biblical-inline` y qué no

`biblical-inline` es **solo para palabras de la Escritura**. El resto de las comillas del ensayo van con angulares `«»` a secas:

| Caso | Marcado |
|---|---|
| Cita bíblica | `<span class='biblical-inline'>«sea bueno o sea malo»</span>` |
| Paráfrasis del autor, cita de un teólogo, término entrecomillado | `«las cinco coronas»` |
| Término griego/latín/hebreo transliterado | `<em>phaûlos</em>` |

Comillas angulares `«»` en todo el cuerpo del texto — nunca las rectas `"`.

#### Énfasis y términos teológicos
```html
<strong>término o frase importante</strong>
```
Para énfasis tipográfico o términos teológicos destacados.

### Editar `textos.json` y `content.json` por script

Los dos archivos hacen **round-trip exacto con `json.dump(data, f, ensure_ascii=False, indent=2)`**, así que se pueden editar con Python sin ensuciar el diff. Dos detalles que hay que respetar:

- **`textos.json` NO termina en salto de línea; `content.json` SÍ.** Escribir el que no corresponde reformatea el archivo entero y vuelve el diff ilegible.
- Antes de insertar, **abortar si el slug ya existe**. Después, `git diff --numstat` debe mostrar solo el bloque nuevo.

### Checklist al agregar un ensayo nuevo

Antes de hacer push, verificar:
- [ ] Primer párrafo tiene clase `first-letter:...`
- [ ] Versículos cortos en `<span class='biblical-inline'>«...»</span>`
- [ ] Pasajes largos en `<blockquote class='blockquote-gold'>` con `<span class='blockquote-ref'>` (**nunca `<footer>`**) — y la cita es **literal**, no una paráfrasis
- [ ] Secciones separadas por `<h2>`, capítulos con numeración romana (`I.`, `II.` …)
- [ ] **Ningún versículo** envuelto en `<em>«...»</em>`
- [ ] Ninguna comilla recta `"` en el cuerpo del texto
- [ ] El `content` es una sola cadena sin saltos de línea reales
- [ ] **Toda etiqueta y atributo usados están en la lista blanca de `src/lib/sanitize.js`** — nada de `svg`/`figure` inline
- [ ] Campo `image` presente (OG); si es de una serie, `serie` y `serieNumero` siguen la convención de la serie
- [ ] Si es de una serie: dado de alta en `articulos[]` **y** en `lineas[]` cuando la serie las tiene
- [ ] `node scripts/generate-sitemap.js` ejecutado
- [ ] **Abierto en el navegador** (`npm run dev`): el ensayo se ve entero, los diagramas cargan, "Volver a la serie" funciona y la consola no tira errores

### Referencia — ensayos modelo
- *La Autoridad de la Escritura y su Lugar en la Vida Cristiana* — usa todos los patrones correctamente
- *El Pecado: Su Realidad, Su Impacto y la Esperanza en Cristo* — buen uso de blockquotes y secciones
- *El Tribunal de Cristo: el Bema en el Reloj Profético* (`reloj-profetico-bloque-iii`) — modelo de **ensayo de serie con diagramas**: rótulos, numeración romana y las tres figuras `.diagrama`

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
| `/teologia-sistematica` | - | Redirige a `/esquemas` |
| `/esquemas` | Esquemas.jsx | ✅ Esquemas Visuales (Ordo Salutis interactivo) + tab Arqueología 3D |
| `/esquemas/templo-salomon` | TemploSalomon.jsx | ✅ Templo 3D integrado vía iframe |
| `/teologia-basica` | TeologiaBasica.jsx | ✅ |
| `/biografias` | Biografias.jsx | ✅ |
| `/padres-de-la-iglesia` | PadresDeLaIglesia.jsx | ✅ 5 biografías |
| `/prerreformadores` | Prerreformadores.jsx | ✅ 5 biografías |
| `/reformadores` | Reformadores.jsx | ✅ 5 biografías |
| `/biblioteca` | Biblioteca.jsx | ✅ |
| `/mapas-biblicos` | MapasBiblicos.jsx | ✅ Leaflet |
| `/estudios-libros` | EstudiosLibros.jsx | ✅ |
| `/estudio/perfecciones-de-dios` | PerfeccionesDeDios.jsx | ✅ 5 capítulos activos |
| `/estudio/hilo-del-tiempo` | HiloDelTiempo.jsx | ✅ |
| `/ensenanzas` | Ensenanzas.jsx | ✅ |
| `/predicaciones` | Predicaciones.jsx | ✅ 635 audios, 4 secciones |
| `/predicaciones/libros/:id` | PredicacionesSerie.jsx | ✅ reproductor persistente |
| `/predicaciones/temas/:id` | PredicacionesSerie.jsx | ✅ |
| `/predicaciones/escuela/:id` | PredicacionesSerie.jsx | ✅ |
| `/predicaciones/varios/:id` | PredicacionesSerie.jsx | ✅ |
| `/tienda` | Store.jsx | ✅ |
| `/panel` | Panel.jsx | ✅ dashboard métricas |
| `/donaciones` | Donations.jsx | ✅ |

---

## Notas importantes

- Al agregar **artículos:** editar `src/data/content.json` → clave `articulos`.
- Al agregar **ensayos:** editar `src/data/textos.json` → clave `ensayos`. **Si el ensayo pertenece a una serie, no alcanza con eso** — seguir "Formato HTML de ensayos" y "Series y Colecciones" completas: hay reglas obligatorias de sanitizador, rótulos de serie, numeración de capítulos y alta en `lineas[]`.
- Al agregar una nueva **ruta:** registrarla en `src/App.jsx` con `lazy()`.
- **Al agregar cualquier contenido nuevo (artículo, ensayo, bosquejo, meditación):** regenerar el sitemap con:
  ```bash
  node scripts/generate-sitemap.js
  ```
  El script lee los JSONs automáticamente y actualiza `public/sitemap.xml`. Ejecutar antes de cada push.
- Los mapas bíblicos usan GeoJSON en `src/data/maps/`.
- El Agente Spurgeon carga los 34 JSON de `knowledge/` en cada request — si se agregan archivos a esa carpeta, quedan automáticamente disponibles para el agente.
- **Wallpapers animados (Juventud):** ✅ Activos. 3 composiciones en `src/remotion/wallpapers/`. MP4s en `public/wallpapers/`. Workflow: editar composición → `node_modules/.bin/remotion render src/remotion/Root.jsx <ID> public/wallpapers/<id>.mp4 --overwrite` → push.
- **Heroes con FLUX:** imágenes generadas se guardan en `public/img/`. Usar `${import.meta.env.BASE_URL}img/<archivo>` en el `src` del `<img>`.
- **PDFs de Biblioteca:** en `public/pdf/`. Cada libro tiene identidad visual única. Scripts en `/tmp/create_*.py`. Activar con `source ~/.zprofile` antes de ejecutar si usan BFL_API_KEY.
- **Biblioteca — Libros Sagrados de Israel:** La Torá ✅, El Tanaj ✅, El Talmud ✅. Pendientes: El Midrash, el resto de la serie.
- **Predicaciones (audio):** reproductor global en `AudioPlayerContext` + `PersistentPlayer`. Datos en `src/data/predicaciones.json`. URLs de audio apuntan a R2 (`r2.sabiduriadelcorazon.com/audio/`) — subida pendiente con buena conexión.
- **Plan de lectura 30 días (Juventud):** pendiente crear contenido JSON + diseño Canva.
- **Newsletter + devocionales IA:** pendiente. Plan: `/api/devotional.js` (GPT-4o-mini) + Resend para email + lista de suscriptores. El conocimiento de Spurgeon puede alimentar la generación.

---

## Proyecto: Templo de Salomón 3D — Módulo Arqueología Bíblica

### Estado actual

- **Archivo:** `public/templo/templo.html` (carpeta en minúscula — Vercel distingue mayúsculas; con `Templo` la URL `/templo/templo.html` caía al 404 del SPA) — integrado en el sitio, en producción en Vercel
- **Ruta:** `/esquemas/templo-salomon` (wrapper React) + `/templo/templo.html` (pantalla completa)
- **Versión:** v3 (2026-07-06, commit `893e685`) — **rediseño fiel al templo de Salomón**
- **Tecnología:** Vanilla Three.js r160, ES modules con import map, single HTML file en `public/`
- **Texturas:** Poly Haven CDN (CC0, sin login) — carga async desde `dl.polyhaven.org`
- **Post-processing:** HDRI `golden_bay_1k.hdr` (solo reflexiones PBR) + Bloom. **SSAO desactivado por rendimiento.**
- **Rendimiento (Mac de Edgardo se ponía lenta):** `pixelRatio` cap 1.5 · sombras 2048 · almenas/decoración sin sombras · `if(document.hidden) return` en el loop. Referencias PNG movidas a `docs/templo-refs/` (gitignored) para no inflar el deploy.
- **Cielo:** skydome con gradiente de **amanecer** (editar el gradiente del canvas para cambiarlo; el HDRI NO es el fondo).
- **Vite fix:** `servePublicHtml()` plugin en `vite.config.js` — evita que el SPA fallback intercepte el HTML del templo en dev

### Layout actual (fiel a 1 Reyes / 2 Crónicas)
- **Muros de atrio** (NO columnata — esa es herodiana): piedra labrada + cornisa de cedro (1 R 6:36 / 7:12). Constructor `courtWall(x1,z1,x2,z2,h,info)`. Dos recintos: **atrio interior** (`IC_*`, ±46 / z -54..138) y **gran atrio** (`GC_*`, ±80 / z -95..200), cada uno con portón central abierto al este.
- **Edificio:** piedra caliza gris (`M.stone` usa textura `white_sandstone_bricks`) + corona de almenas escalonadas azul-oro (`battlements(...,'temple')`) + friso.
- **Mobiliario según Escritura:** Mar de Bronce al SE `(SX=30,SZ=66)` (2 Cr 4:10) · altar al centro `(AZ=98)` · 10 fuentes/mekonot 5+5 a los lados `x=±40` (2 Cr 4:6) · portón de bronce labrado en la entrada del Ulam.

### Cómo ejecutar en desarrollo

```bash
npm run dev
# Abrir: http://localhost:5173/esquemas/templo-salomon
# O directamente: http://localhost:5173/templo/templo.html
```

### Stack del visor 3D
```javascript
// Import map (OBLIGATORIO para que OrbitControls resuelva 'three' internamente)
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"}}
```
- **OrbitControls** — rotación, zoom, damping
- **TextureLoader** — carga PBR textures de Poly Haven (falla silenciosa si hay CORS)
- **MeshStandardMaterial** — PBR con map + normalMap + roughnessMap
- **Raycaster** — hover interactivo con tooltips teológicos

### Fuentes de datos arqueológicos (en NotebookLM)
- **Cuaderno 1:** 1 Reyes 6-7, 2 Crónicas 3-4, Josefo (Ant. Judías VIII.3.2), Diccionario Vine, arqueología comparada
- **Cuaderno 2:** Medidas en codos (45-46 cm regular), debate altura del Ulam (30 vs 120 codos), descripción del oro de Parvaim, Mishná Middot

### Escala y coordenadas
- **1 unidad Three.js = 1 codo hebreo ≈ 0.46 m**
- **Z+ = Este** (entrada), **X+ = Sur**, **Y = arriba**
- Ulam: Z 30-40 | Hekal: Z -10 a 30 | Debir: Z -30 a -10

### Elementos modelados con tooltips interactivos
| Elemento | Info teológica | Ref. bíblica |
|---|---|---|
| Monte Moríah (plataforma) | Abraham + David | 2 Cr 3:1 · Gn 22 |
| Debir — Lugar Santísimo | 20×20×20 codos, cubo perfecto | 1 R 6:16-20 |
| Querubines (esfinge fenicio-cananea) | 10 codos, alas 5c | 1 R 6:23-28 |
| Arca del Pacto | Propiciatorio = tipo de Cristo | Ro 3:25 |
| Hekal — Lugar Santo | Oro de Parvaim | 2 Cr 3:5-6 |
| Altar del incienso | Intercesión perpétua | Ap 8:3-4 |
| Mesa panes (redondos) | Pan de la Presencia | Jn 6:35 |
| 10 Menorahs (7 brazos) | Luz perpetua | Jn 8:12 |
| Ulam — Vestíbulo | Debate 30 vs 120 codos | Josefo VIII.3.2 |
| Cámaras Yatsía | 3 pisos, 5-6-7 codos | 1 R 6:5-8 |
| Jaquín y Boaz | "Él establecerá / En Él hay fortaleza" | 1 R 7:21 |
| Altar de bronce (escalonado + rejilla) | Sacrificio → Cristo | Jn 1:29 |
| Mar de bronce (12 toros) | Purificación sacerdotal | 1 R 7:23-26 |
| 10 Carros de bronce | Mekonot con ruedas | 1 R 7:27-39 |
| Atrio interior (muro piedra+cedro) | Sacerdotes únicamente | Ef 2:14 · 1 R 6:36 |
| Gran atrio (muro piedra+cedro) | Patio del pueblo | 2 Cr 4:9 · 1 R 7:12 |
| Portón de bronce (Ulam) | «Yo soy la puerta» | 1 R 6:34 · Jn 10:9 |

### Texturas PBR activas (Poly Haven, CC0)
```
white_sandstone_bricks → piedra gris (stone) + mármol (marble) + pavimento (paving)
large_sandstone_blocks → (ya NO se usa para muros: era demasiado cálido/tostado)
brown_planks_03        → cedro interior (cedar/cedarD)
old_wood_floor         → madera de olivo (olive)
metal_plate            → bronce (bronze/bronzeD)
rock_wall              → suelo del atrio (ground)
```
- Oro, vidrio, llamas y humo: **procedurales** (MeshStandardMaterial, sin textura externa)

### Hecho en v3 (2026-07-06)
- [x] Piedra caliza gris + corona de almenas escalonadas azul-oro + friso
- [x] Portón de bronce labrado en la entrada del Ulam
- [x] Capiteles de lirio + granadas en Jaquín y Boaz
- [x] Piso de losa de piedra gris; cielo de amanecer
- [x] **Muros bíblicos** (piedra + cedro): atrio interior + gran atrio. Columnata eliminada (anacrónica)
- [x] Mobiliario reubicado y espaciado según Escritura (Mar SE, altar centro, 5+5 fuentes)
- [x] Escalera de caracol externa eliminada (quedaba "colgada")
- [x] Optimización de rendimiento (ver Estado actual)

### Hecho (2026-07-07) — cuerpo del edificio + portones de atrio
- [x] **Muros del edificio engrosados de 1.4 → 5.0 codos** (hacia afuera; cara interior fija en x=±10). El interior sagrado sigue en 20 codos. Fiel a muros macizos (1 R 6:6; paralelo Ez 41:5 = 6 codos). Afecta Debir, Hekal y Ulam (muros laterales a ±12.5, cara externa ±15).
- [x] **Cámaras Yatsía re-leídas como basamento escalonado**: abren contra la cara externa (x=15, z=-35), pisos 5/6/7 codos flarando hacia arriba. Huella externa: bloque **30 c**, con cámaras **~44 c** (antes 22.8 / 35). Todo lo dependiente reubicado: almenas (`battlements` a ±12.5), techos (Hekal 31, Ulam 30), fachada Ulam (30, vano 11c), ventanas clerestory (±15.1), escalones (Ulam 32).
- [x] **Portones de bronce en ambos atrios** (`courtGate`) — 2 Cr 4:9. Ver Pendientes.
- Nota de verificación: el ancho "angosto" original (20 c interior, 1 R 6:2) NO era un bug — el templo era alto y estrecho. El engrosado da presencia sin violar esa medida.

### Pendientes
- [x] **Portones de bronce en las entradas de los atrios** (2 Cr 4:9) — hecho: función `courtGate(cz,openW,wallH,hover)`, dos hojas de bronce con tachones + tirador de anillo. Interior en z=138 (vano 18c), gran atrio en z=200 (vano 28c). Bronce, no oro (el oro se reserva para la Casa).
- [x] **10 mesas de los panes** (2026-07-09) — 2 Cr 4:8: función `breadTable(x,z,addInfo)`, 5 al norte (x=-7.8) + 5 al sur (x=+7.8), intercaladas entre las menorás (z = -5.5, -0.5, 4.5, 9.5, 14.5). 12 panes por mesa (2 pilas de 6). Tooltip actualizado en INFO.BREAD.
- [x] **Muros de atrio más altos/macizos** (2026-07-09) — atrio interior 9→12 codos, gran atrio 12→16, espesor 2.2→3.0, hilada de cedro 1.6→2.0. `courtGate` actualizado para acompañar (th y wallH).
- [x] **Preset "Interior Hekal" corregido** (2026-07-09) — desde que existe el portón del Ulam quedaba mirando la puerta cerrada; ahora la cámara entra al Lugar Santo: `hek: {p:[0,13,28], t:[0,9,-6]}`.
- [x] **Mar de Bronce destacado** (2026-07-07): bronce bruñido dedicado (`M.seaBronze`/`seaBronzeD`, más claro/pulido), agua más viva (clearcoat + emissive), 12 bueyes rehechos con anatomía completa agrupados de tres en tres a cada punto cardinal con traseros al centro (1 R 7:25 — `makeOx()`). Se mantuvo Ø10×5 codos (1 R 7:23), no se sobredimensionó. Tres bugs corregidos: (a) labio era un torus vertical (falso "asa") → acostado plano `.rotation.x=π/2`; (b) el recipiente se apoyaba al nivel de los bueyes (empotrados) → se eleva con `SEA_LIFT=2.0` para descansar SOBRE sus ancas (1 R 7:25); (c) el Lathe era single-side y se transparentaba el piso mostrando los bueyes → material clonado con `side=DoubleSide` (interior opaco).
- [ ] (Opcional) Escalones 7+8 del plano de estudio — provienen de Ezequiel 40, no de Salomón; decidir si adoptarlos
- [ ] (Opcional) Debir como cubo 20³ con cámara superior de 10c encima (1 R 6:20); hoy es de 30 de alto macizo
- [ ] Paneles de pared interiores con palmeras, querubines y rosetas más detallados
- [ ] (Opcional) Renders fotorrealistas Blender como overlay "modo fotorrealista"
- [ ] **Proyecto aparte siguiente: TEMPLO DE HERODES** (ahí SÍ van columnatas/pórticos). Luego: Tabernáculo, Templo de Ezequiel, Nueva Jerusalén.

### Lecciones técnicas aprendidas
- **Import map es OBLIGATORIO** — OrbitControls.js internamente importa `from 'three'`; sin import map falla
- **Servir via HTTP** — `file://` bloquea texturas externas por CORS
- **Piedra GRIS:** la textura `large_sandstone_blocks` es cálida/tostada; para gris usar `white_sandstone_bricks` con tinte frío. El tinte (color) multiplica la textura, no la puede desaturar.
- **`scene.environment` (HDRI) NO es el fondo** — el fondo es el skydome. Para cambiar el cielo, editar el gradiente del canvas del skydome.
- **Rendimiento:** el mayor costo era `pixelRatio` 2 en Retina + SSAO. Bajar pixelRatio y quitar SSAO fue el gran salto. Las almenas (cientos de cajas) deben ir SIN sombras.
- **Unicode minus (U+2212) rompe JS** — usar guión ASCII `-` en números
- **Hard refresh (Cmd+Shift+R)** — para limpiar caché al iterar

---

## Proyecto: Recorridos Bíblicos — Plan de Mejoras (acordado)

> Plan discutido y acordado. Implementar solo con aprobación explícita por fase.
> **REGLA:** Antes de tocar cualquier archivo de mapas, presentar propuesta y esperar OK.

### Fase inmediata — Navegación manual (solo código, sin contenido nuevo)
- **Opción C acordada:** el mapa vuela a cada parada, se detiene y espera. El usuario lee y presiona "Siguiente". Sin Play/Pause ni auto-avance.
- Cambios de código: `narrativeEngine.js` (START → `status: 'paused'`), `NarrativeControlPanel.jsx` (reemplazar controles por Anterior/Siguiente/Detener), `RouteSelector.jsx` (un solo clic para iniciar narrativa, sin paso intermedio).
- **Estado:** ✅ Implementado (commit `ba5df82`).

### Fase 2 — Audio narrativo (requiere producción de contenido primero)
- Cada parada tiene un audio que se reproduce al llegar al punto. El recorrido espera a que termine antes de ofrecer avanzar.
- **Diferencia editorial crítica:** el texto actual es descriptivo y autocontenido por parada. El guion de audio debe ser narrativo y continuo — cada parada retoma el hilo de la anterior, como una guía de turismo que camina con el visitante.
- Pipeline técnico: Voicebox MCP → MP3 → Cloudflare R2 (`/audio/mapas/`) → campo `audioUrl` en GeoJSON → mini reproductor en StepInfoPanel.
- **Piloto:** recorrido "El Viaje de Abraham" (redactar guion primero, luego generar audios).
- **Estado:** pendiente de guion editorial.

### Fase 3 — Recursos por parada (requiere producción de contenido primero)
- Cada punto puede vincular: imagen (arqueológica o FLUX), artículo interno del sitio, video del canal YouTube.
- Campos a agregar en GeoJSON: `imagenUrl`, `articuloSlug`, `videoId` (todos opcionales).
- Mostrar en StepInfoPanel como chips de acceso rápido. Los recursos se agregan progresivamente al GeoJSON a medida que existen.
- **Estado:** pendiente de producción de contenido.

### Fase A — Zoom cinematográfico (solo código, todos los recorridos)
- Aumentar `flyZoom` de 10 → 13 y `flyDuration` de 1.2 → 2.2 en `useNarrativeMap.js`.
- Leaflet `flyTo` hace una curva natural zoom-out → zoom-in. Con estos valores la animación es notablemente más dramática.
- Aplica a todos los recorridos sin excepción.
- **Estado:** ✅ Implementado (commit `ba5df82`).

### Fase B — Capa satelital (complementa Fase A, paradas con buena resolución)
- Agregar capa ESRI World Imagery (gratuita, sin API key) que se activa al superar zoom 12.
- El recorrido arranca en NatGeo (vista cartográfica, ruta amplia) y llega a imagen satelital real.
- Requiere revisar parada por parada qué lugares tienen buena resolución satelital.
- Sitios sin resolución útil (desierto, ruinas rasas) se quedan con Fase A + imagen de la Fase 3.
- **Estado:** pendiente. Implementar después de Fase A.

### Fase C — Vuelo 3D con MapLibre GL (paradas estrella, puntual)
- Migrar la capa de mapa de Leaflet a MapLibre GL (open-source) para habilitar terreno 3D, inclinación de cámara y rotación durante el vuelo.
- Solo para paradas específicas de alto valor visual: Jerusalén, Monte Sinaí, Mar Muerto, etc.
- Cambio estructural significativo — planificar por separado cuando llegue el momento.
- **Estado:** pendiente. Implementar de a una parada a la vez cuando haya contenido listo.

### Secuencia completa acordada
```
Fase A (zoom cinematográfico) → mejora todos los recorridos ya
Fase B (satélite)             → complementa donde hay buena imagen satelital
Fase 3 anterior (recursos)    → completa sitios donde el satélite no alcanza
Fase C (3D MapLibre)          → paradas estrella seleccionadas
```

### Nota sobre el GeoJSON de Abraham
- `descenso-a-egipto` tiene solo 1 feature (Egipto). Al iniciar esa sub-ruta, `isComplete` es true de inmediato. Pendiente: agregar más paradas o fusionar como parada especial dentro de otra sub-ruta.

---

## Tareas y Estado de Desarrollo (Sesión de Hoy y Próximos Pasos)

### Hecho en sesiones recientes

- **Integración Templo de Salomón 3D:** visor Three.js movido a `public/templo/templo.html`, ruta `/esquemas/templo-salomon`, tercer tab en Esquemas.jsx. Vite plugin `servePublicHtml()` para evitar conflicto con SPA fallback.
- **Templo v3 — rediseño fiel (2026-07-06, commit `893e685`, en producción):** piedra caliza gris, corona de almenas azul-oro, portón de bronce, capiteles de lirio, **muros bíblicos piedra+cedro** (atrio interior + gran atrio, se quitó la columnata herodiana), mobiliario reubicado según Escritura, escalera de caracol eliminada, cielo de amanecer y **optimizaciones de rendimiento**. Detalle completo en la sección "Proyecto: Templo de Salomón 3D".
- **Mapas Bíblicos — Fase inmediata + A:** navegación manual (Anterior/Siguiente/Detener) y zoom cinematográfico (`flyZoom` 13, `flyDuration` 2.2) implementados en `useNarrativeMap.js`.
- **Migración ChatSpurgeon a Claude:** `/api/spurgeon.js` usa `claude-sonnet-4-6` + RAG con Supabase pgvector (475 fragmentos indexados).

### Próximos Pasos

1. **Templo de Salomón — pulido final:** portones de bronce en los atrios (2 Cr 4:9), muros más altos, agrandar/aclarar el Mar de Bronce, relieves interiores. Ver "Pendientes" en la sección Templo. **Después: proyecto Templo de Herodes** (ahí sí van columnatas).
2. **Mapas — Fase B (capa satelital):** ESRI World Imagery activada al superar zoom 12. Implementar después de revisar resolución por parada.
3. **Mapas — Fase 2 (audio):** requiere guion narrativo del Viaje de Abraham primero. Pipeline: Voicebox → R2 → GeoJSON `audioUrl`.
4. **Dashboard `/panel`:** conectar Vercel Analytics o Google Search Console para métricas reales.
5. **Esquemas visuales:** siguiente mapa conceptual en `/esquemas` (ej: *Las 12 Tribus de Israel*).
