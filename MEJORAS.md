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

- [ ] **JSON-LD: Organization** — Schema global en `App.jsx` o `index.html`
- [ ] **JSON-LD: WebSite** — Con `SearchAction` para el buscador interno
- [ ] **JSON-LD: Article** — En `ArticlePage.jsx` y `EstudioPage.jsx` (ya parcialmente implementado)
- [ ] **JSON-LD: BreadcrumbList** — Agregar schema dinámico en `Breadcrumbs.jsx`
- [ ] **URL base dinámica** — Reemplazar URL hardcodeada de GitHub Pages por variable de entorno en `SEO.jsx:8` y `ShareButtons.jsx:14`
- [ ] **Imagen OG por artículo** — Asegurar que cada artículo en `content.json` tenga campo `image` con URL válida
- [ ] **Imagen OG default** — Verificar que `/img/og-default.jpg` existe y tiene dimensiones correctas (1200×630px)

---

## 🟡 PERFORMANCE (Semana 3)

- [ ] **Code splitting** — Convertir todos los imports de páginas en `App.jsx` a `React.lazy()` con `<Suspense>`
- [ ] **Lazy loading imágenes** — Agregar `loading="lazy"` a todos los `<img>` del proyecto
- [ ] **Eliminar Supabase** — Remover `@supabase/supabase-js` de `package.json` y eliminar `src/lib/supabase.js`
- [ ] **Eliminar console.log** — Limpiar los 7 `console.log/console.error` en producción (`ChatSpurgeon.jsx`, `ArticleFeed.jsx`, `ArticlePage.jsx`, `EstudioPage.jsx`)
- [ ] **Bundle analyzer** — Instalar `vite-plugin-visualizer` para monitorear tamaño del bundle
- [ ] **Lazy load Leaflet** — Cargar componentes de mapas solo en rutas que los usan
- [ ] **Lazy load ChatSpurgeon** — Cargar el SDK de OpenAI solo cuando se abre el chat

---

## 🟡 DISEÑO Y SISTEMA VISUAL (Semana 4)

- [ ] **Unificar estilos de texto** — Fusionar `.text-article`, `.text-essay`, `.text-outline`, `.text-meditation` en una clase base con variantes (elimina ~400 líneas duplicadas en `index.css`)
- [ ] **Componente Card unificado** — Crear `src/components/ui/Card.jsx` que reemplace `.recommended-card`, `ProductCard` y cards de artículos
- [ ] **Componente Button unificado** — Estandarizar uso de `.btn-gold` / `AnimatedButton` / clases Tailwind directas
- [ ] **Eliminar colores hardcodeados** — Reemplazar `#555`, `#f8f9fa`, `#22C55E` en `App.css` por tokens CSS del sistema
- [ ] **Escala de espaciado** — Definir tokens de espaciado en `index.css` para consistencia en márgenes y paddings
- [ ] **Loading skeletons** — Reemplazar spinners con skeleton screens en `ArticleFeed.jsx` y otras cargas de datos

---

## 🟡 ACCESIBILIDAD (Semana 4)

- [ ] **Navbar dropdown** — Agregar `aria-haspopup="true"`, `aria-expanded`, `aria-controls` en `Navbar.jsx:56-61`
- [ ] **Menú móvil** — Agregar `aria-controls` en el toggle y gestión de foco (focus trap) en `Navbar.jsx`
- [ ] **Soporte teclado dropdown** — Implementar handlers para `Escape`, `ArrowUp`, `ArrowDown` en `Navbar.jsx`
- [ ] **SearchBar label** — Agregar `<label>` o `aria-label` al input en `SearchBar.jsx`
- [ ] **Newsletter input** — Agregar `aria-label` y `autocomplete` al input en `Footer.jsx:44-46`
- [ ] **Botones de filtro** — Agregar `aria-selected` en los filtros de categoría de `ArticleFeed.jsx`
- [ ] **Contraste de colores** — Verificar que el gold `#C5A059` cumple WCAG AA en todos los contextos donde se usa como texto

---

## 🟡 ARQUITECTURA DE CONTENIDO (Semana 5)

- [ ] **Conectar `/src/data/knowledge/`** — Los 34 archivos de teología sistemática no están vinculados a ninguna ruta activa; crear sección o integrar en búsqueda
- [ ] **Separar content.json** — Dividir el archivo monolítico (1707 líneas) en archivos por tipo: `articles.json`, `readings.json`, `hero.json`, etc.
- [ ] **Validación de datos** — Instalar Zod y definir schemas para artículos, ensayos y lecturas
- [ ] **Unificar "articles" y "textos.articulos"** — Hay referencia a `content.textos?.articulos` en `ArticlePage.jsx:20` que no existe en el JSON actual

---

## 🟡 ROUTING Y NAVEGACIÓN (Semana 5)

- [ ] **Estados de error en contenido** — Agregar error boundary por página en rutas de contenido dinámico
- [ ] **Canonicales dinámicos** — Asegurar que cada página con ruta dinámica tenga `<link rel="canonical">` correcto
- [ ] **Validación de slugs** — Agregar manejo cuando un slug no existe en las rutas de biografías

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
| SEO | 7 | 0 | 0% |
| Performance | 7 | 0 | 0% |
| Diseño | 6 | 0 | 0% |
| Accesibilidad | 7 | 0 | 0% |
| Contenido | 4 | 0 | 0% |
| Routing | 3 | 0 | 0% |
| Nice-to-have | 7 | 0 | 0% |
| **Total** | **46** | **0** | **0%** |
