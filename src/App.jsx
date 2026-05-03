import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTopButton from './components/ScrollToTopButton';

// Lazy-loaded pages
const NotFound            = lazy(() => import('./pages/NotFound'));
const Home                = lazy(() => import('./pages/Home'));
const ArticlePage         = lazy(() => import('./pages/ArticlePage'));
const Articles            = lazy(() => import('./pages/Articles'));
const Donations           = lazy(() => import('./pages/Donations'));
const Store               = lazy(() => import('./pages/Store'));
const ProductPage         = lazy(() => import('./pages/ProductPage'));
const Youth               = lazy(() => import('./pages/Youth'));
const HistoriaAnsiedad    = lazy(() => import('./pages/HistoriaAnsiedad'));
const HistoriaSoledad     = lazy(() => import('./pages/HistoriaSoledad'));
const Bosquejos           = lazy(() => import('./pages/Bosquejos'));
const Ensayos             = lazy(() => import('./pages/Ensayos'));
const TextPage            = lazy(() => import('./pages/TextPage'));
const Biblioteca          = lazy(() => import('./pages/Biblioteca'));
const BibliotecaConsulta  = lazy(() => import('./pages/BibliotecaConsulta'));
const HiloDelTiempo       = lazy(() => import('./pages/HiloDelTiempo'));
const PerfeccionesDeDios  = lazy(() => import('./pages/PerfeccionesDeDios'));
const PerfeccionesCapitulo1 = lazy(() => import('./pages/PerfeccionesCapitulo1'));
const PerfeccionesCapitulo2 = lazy(() => import('./pages/PerfeccionesCapitulo2'));
const PerfeccionesCapitulo3 = lazy(() => import('./pages/PerfeccionesCapitulo3'));
const SedymModulo3        = lazy(() => import('./pages/SedymModulo3'));
const DeclaracionDeFe     = lazy(() => import('./pages/DeclaracionDeFe'));
const EstudioPage         = lazy(() => import('./pages/EstudioPage'));
const TeologiaBasica      = lazy(() => import('./pages/TeologiaBasica'));
const TeologiaBasicaTema  = lazy(() => import('./pages/TeologiaBasicaTema'));
const TeologiaSistematica = lazy(() => import('./pages/TeologiaSistematica'));
const EstudiosLibros      = lazy(() => import('./pages/EstudiosLibros'));
const LibroEstudioIndex   = lazy(() => import('./pages/LibroEstudioIndex'));
const LibroEstudioCapitulo = lazy(() => import('./pages/LibroEstudioCapitulo'));
const MapasBiblicos       = lazy(() => import('./pages/MapasBiblicos'));
const MapaRecorrido       = lazy(() => import('./pages/MapaRecorrido'));
const Ensenanzas          = lazy(() => import('./pages/Ensenanzas'));
const Biografias          = lazy(() => import('./pages/Biografias'));
const Prerreformadores    = lazy(() => import('./pages/Prerreformadores'));
const Wycliffe            = lazy(() => import('./pages/prerreformadores/Wycliffe'));
const JanHus              = lazy(() => import('./pages/prerreformadores/JanHus'));
const PedroWaldo          = lazy(() => import('./pages/prerreformadores/PedroWaldo'));
const Savonarola          = lazy(() => import('./pages/prerreformadores/Savonarola'));
const Tyndale             = lazy(() => import('./pages/prerreformadores/Tyndale'));
const Reformadores        = lazy(() => import('./pages/Reformadores'));
const Lutero              = lazy(() => import('./pages/reformadores/Lutero'));
const Calvino             = lazy(() => import('./pages/reformadores/Calvino'));
const Zuinglio            = lazy(() => import('./pages/reformadores/Zuinglio'));
const Knox                = lazy(() => import('./pages/reformadores/Knox'));
const Bullinger           = lazy(() => import('./pages/reformadores/Bullinger'));
const PadresDeLaIglesia   = lazy(() => import('./pages/PadresDeLaIglesia'));
const Agustin             = lazy(() => import('./pages/padres-de-la-iglesia/Agustin'));
const Crisostomo          = lazy(() => import('./pages/padres-de-la-iglesia/Crisostomo'));
const Atanasio            = lazy(() => import('./pages/padres-de-la-iglesia/Atanasio'));
const Ireneo              = lazy(() => import('./pages/padres-de-la-iglesia/Ireneo'));
const Tertuliano          = lazy(() => import('./pages/padres-de-la-iglesia/Tertuliano'));

// Lazy-loaded heavy components
const ChatSpurgeon        = lazy(() => import('./components/ChatSpurgeon'));

// ScrollToTop component to ensure page starts at top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-sabiduria-bg">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sabiduria-gold"></div>
  </div>
);

const siteUrl = import.meta.env.VITE_SITE_URL || 'https://edgardo-lamas.github.io/sabidur-a322';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sabiduría para el Corazón",
  "url": siteUrl,
  "logo": `${siteUrl}/img/logo.png`,
  "description": "Recursos de teología reformada, exégesis bíblica y bosquejos homiléticos para la edificación de la Iglesia de Cristo.",
  "sameAs": []
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sabiduría para el Corazón",
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteUrl}/articulos?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <Router basename={basename}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-sabiduria-bg">
        <Navbar />
        <ErrorBoundary>
          <div className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articulos" element={<Articles />} />
                <Route path="/articulo/:slug" element={<ArticlePage />} />
                <Route path="/ensayos" element={<Ensayos />} />
                <Route path="/ensayo/:slug" element={<TextPage textType="ensayo" />} />
                <Route path="/estudio/hilo-del-tiempo" element={<HiloDelTiempo />} />
                <Route path="/estudio/perfecciones-de-dios" element={<PerfeccionesDeDios />} />
                <Route path="/estudio/perfecciones-de-dios/capitulo-1" element={<PerfeccionesCapitulo1 />} />
                <Route path="/estudio/perfecciones-de-dios/capitulo-2" element={<PerfeccionesCapitulo2 />} />
                <Route path="/estudio/perfecciones-de-dios/capitulo-3" element={<PerfeccionesCapitulo3 />} />
                <Route path="/estudio/sedym-modulo-3" element={<SedymModulo3 />} />
                <Route path="/estudio/:slug" element={<EstudioPage />} />
                <Route path="/bosquejos" element={<Bosquejos />} />
                <Route path="/bosquejo/:slug" element={<TextPage textType="bosquejo" />} />
                <Route path="/tienda" element={<Store />} />
                <Route path="/tienda/:slug" element={<ProductPage />} />
                <Route path="/adolescentes" element={<Youth />} />
                <Route path="/adolescentes/historias/ansiedad" element={<HistoriaAnsiedad />} />
                <Route path="/adolescentes/historias/soledad" element={<HistoriaSoledad />} />
                <Route path="/biblioteca" element={<Biblioteca />} />
                <Route path="/biblioteca/consulta" element={<BibliotecaConsulta />} />
                <Route path="/declaracion-de-fe" element={<DeclaracionDeFe />} />
                <Route path="/teologia-basica" element={<TeologiaBasica />} />
                <Route path="/teologia-basica/:slug" element={<TeologiaBasicaTema />} />
                <Route path="/teologia-sistematica" element={<TeologiaSistematica />} />
                <Route path="/estudios-libros" element={<EstudiosLibros />} />
                <Route path="/estudios-libros/:libroSlug" element={<LibroEstudioIndex />} />
                <Route path="/estudios-libros/:libroSlug/:capituloSlug" element={<LibroEstudioCapitulo />} />
                <Route path="/mapas-biblicos" element={<MapasBiblicos />} />
                <Route path="/mapas-biblicos/:slug" element={<MapaRecorrido />} />
                <Route path="/ensenanzas" element={<Ensenanzas />} />
                <Route path="/biografias" element={<Biografias />} />
                <Route path="/prerreformadores" element={<Prerreformadores />} />
                <Route path="/prerreformadores/wycliffe" element={<Wycliffe />} />
                <Route path="/prerreformadores/jan-hus" element={<JanHus />} />
                <Route path="/prerreformadores/pedro-waldo" element={<PedroWaldo />} />
                <Route path="/prerreformadores/savonarola" element={<Savonarola />} />
                <Route path="/prerreformadores/tyndale" element={<Tyndale />} />
                <Route path="/reformadores" element={<Reformadores />} />
                <Route path="/reformadores/lutero" element={<Lutero />} />
                <Route path="/reformadores/calvino" element={<Calvino />} />
                <Route path="/reformadores/zuinglio" element={<Zuinglio />} />
                <Route path="/reformadores/knox" element={<Knox />} />
                <Route path="/reformadores/bullinger" element={<Bullinger />} />
                <Route path="/padres-de-la-iglesia" element={<PadresDeLaIglesia />} />
                <Route path="/padres-de-la-iglesia/agustin" element={<Agustin />} />
                <Route path="/padres-de-la-iglesia/crisostomo" element={<Crisostomo />} />
                <Route path="/padres-de-la-iglesia/atanasio" element={<Atanasio />} />
                <Route path="/padres-de-la-iglesia/ireneo" element={<Ireneo />} />
                <Route path="/padres-de-la-iglesia/tertuliano" element={<Tertuliano />} />
                <Route path="/donaciones" element={<Donations />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </ErrorBoundary>
        <Footer />
      </div>
      <ScrollToTopButton />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2500,
          style: { fontFamily: 'var(--font-sans)', fontSize: '0.875rem' },
          success: { iconTheme: { primary: '#C5A059', secondary: '#fff' } },
        }}
      />
      <Suspense fallback={null}>
        <ChatSpurgeon />
      </Suspense>
    </Router>
  );
}

export default App;
