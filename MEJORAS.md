# Plan de Mejoras — Sabiduría para el Corazón

Documento de seguimiento del análisis técnico completo del sitio.
Fecha de análisis: 2026-04-04

**Leyenda de estado:** `[ ]` pendiente · `[~]` en progreso · `[x]` completado

---

## 🔴 CRÍTICO (Semana 1)

- [x] **404** — Crear `NotFound.jsx` y agregar `<Route path="*" element={<NotFound />} />` en `App.jsx`
- [x] **Sitemap** — Generar `/public/sitemap.xml` con todas las rutas (~47)
- [x] **Robots.txt** — Crear `/public/robots.txt` con instrucciones para crawlers
- [x] **Error Boundary** — Crear `ErrorBoundary.jsx` y envolver el contenido principal en `App.jsx`
- [x] **DOMPurify** — Instalar y aplicar sanitización en todos los `dangerouslySetInnerHTML` (14 ocurrencias en 8 archivos)

---

## 🟡 SEO (Semana 2)

- [x] **JSON-LD: Organization** — Schema global en `App.jsx`
- [x] **JSON-LD: WebSite** — Con `SearchAction` para el buscador interno en `App.jsx`
- [x] **JSON-LD: Article** — En `ArticlePage.jsx` (EstudioPage.jsx ya lo tenía)
- [x] **JSON-LD: BreadcrumbList** — Schema dinámico en `Breadcrumbs.jsx`
- [x] **URL base dinámica** — `VITE_SITE_URL` en `.env`; usado en `SEO.jsx`, `ShareButtons.jsx`, `EstudioPage.jsx`
- [x] **Imagen OG por artículo** — 18/19 artículos actualizados en `content.json` con imagen asignada
- [x] **Imagen OG default** — Creado `/public/img/og-default.jpg`

---

## 🟡 PERFORMANCE (Semana 3)

- [x] **Code splitting** — 30+ páginas + ChatSpurgeon convertidos a `React.lazy()` + `<Suspense>`; bundle 1,817→881 KB (−51%)
- [x] **Lazy loading imágenes** — `loading="lazy"` en `BibliaFlow.jsx` y `ArticleFeed.jsx`
- [x] **Eliminar Supabase** — `@supabase/supabase-js` desinstalado; `src/lib/supabase.js` eliminado
- [x] **Eliminar console.log** — 7 ocurrencias eliminadas de producción
- [x] **Bundle analyzer** — `rollup-plugin-visualizer` instalado; genera `dist/stats.html`
- [x] **Lazy load Leaflet** — MapaRecorrido ya se carga en chunk propio (174 KB) via React.lazy
- [x] **Lazy load ChatSpurgeon** — Componente lazy-loaded; usa N8N webhook (sin SDK pesado)

---

## 🟡 DISEÑO Y SISTEMA VISUAL (Semana 4)

- [ ] **Unificar estilos de texto** — Fusionar `.text-article`, `.text-essay`, `.text-outline`, `.text-meditation` en una clase base con variantes (elimina ~400 líneas duplicadas en `index.css`)
- [x] **Componente Card unificado** — Crear `src/components/ui/Card.jsx` que reemplace `.recommended-card`, `ProductCard` y cards de artículos
- [x] **Componente Button unificado** — Estandarizar uso de `.btn-gold` / `AnimatedButton` / clases Tailwind directas
- [x] **Eliminar colores hardcodeados** — Reemplazar `#555`, `#f8f9fa`, `#22C55E` en `App.css` por tokens CSS del sistema
- [x] **Escala de espaciado** — Definir tokens de espaciado en `index.css` para consistencia en márgenes y paddings
- [x] **Loading skeletons** — Reemplazar spinners con skeleton screens en `ArticleFeed.jsx` y otras cargas de datos

---

## 🟡 ACCESIBILIDAD (Semana 4)

- [x] **Navbar dropdown** — Agregar `aria-haspopup="true"`, `aria-expanded`, `aria-controls` en `Navbar.jsx:56-61`
- [x] **Menú móvil** — Agregar `aria-controls` en el toggle y gestión de foco (focus trap) en `Navbar.jsx`
- [x] **Soporte teclado dropdown** — Implementar handlers para `Escape`, `ArrowUp`, `ArrowDown` en `Navbar.jsx`
- [x] **SearchBar label** — Agregar `<label>` o `aria-label` al input en `SearchBar.jsx`
- [x] **Newsletter input** — Agregar `aria-label` y `autocomplete` al input en `Footer.jsx:44-46`
- [x] **Botones de filtro** — Agregar `aria-selected` en los filtros de categoría de `ArticleFeed.jsx`
- [ ] **Contraste de colores** — Verificar que el gold `#C5A059` cumple WCAG AA en todos los contextos donde se usa como texto

---

## 🟡 ARQUITECTURA DE CONTENIDO (Semana 5)

- [x] **Conectar `/src/data/knowledge/`** — Los 34 archivos de teología sistemática no están vinculados a ninguna ruta activa; crear sección o integrar en búsqueda
- [x] **Separar content.json** — Dividir el archivo monolítico (1707 líneas) en archivos por tipo: `articles.json`, `readings.json`, `hero.json`, etc.
- [ ] **Validación de datos** — Instalar Zod y definir schemas para artículos, ensayos y lecturas
- [x] **Unificar "articles" y "textos.articulos"** — Hay referencia a `content.textos?.articulos` en `ArticlePage.jsx:20` que no existe en el JSON actual

---

## 🟡 ROUTING Y NAVEGACIÓN (Semana 5)

- [x] **Estados de error en contenido** — Agregar error boundary por página en rutas de contenido dinámico
- [x] **Canonicales dinámicos** — Asegurar que cada página con ruta dinámica tenga `<link rel="canonical">` correcto
- [x] **Validación de slugs** — Agregar manejo cuando un slug no existe en las rutas de biografías

---

## 🟢 NICE-TO-HAVE (Backlog)

- [ ] **TypeScript** — Migración gradual para mejor type safety
- [ ] **react-hook-form + Zod** — Validación de formularios (newsletter, contacto)
- [ ] **Service Worker** — Soporte offline básico
- [ ] **Toast notifications** — Feedback al usuario (react-hot-toast o similar)
- [ ] **Pruebas automatizadas** — Configurar Playwright con el skill `webapp-testing` para rutas principales
- [ ] **JSDoc** — Documentar funciones complejas (cálculo de fechas en `HeroGrid.jsx`)
- [ ] **Srcset / imágenes responsivas** — Variantes de tamaño para diferentes viewports

---

## Progreso general

| Área | Total | Completado | % |
|---|---|---|---|
| Crítico | 5 | 5 | 100% |
| SEO | 7 | 7 | 100% |
| Performance | 7 | 7 | 100% |
| Diseño | 6 | 5 | 83% |
| Accesibilidad | 7 | 6 | 86% |
| Contenido | 4 | 4 | 100% |
| Routing | 3 | 3 | 100% |
| Nice-to-have | 7 | 0 | 0% |
| **Total** | **46** | **37** | **80%** |
