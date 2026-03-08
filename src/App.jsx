import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import Articles from './pages/Articles';
import Donations from './pages/Donations';
import Store from './pages/Store';
import ProductPage from './pages/ProductPage';
import Youth from './pages/Youth';
import Bosquejos from './pages/Bosquejos';
import Ensayos from './pages/Ensayos';
import TextPage from './pages/TextPage';
import Biblioteca from './pages/Biblioteca';
import BibliotecaConsulta from './pages/BibliotecaConsulta';
import HiloDelTiempo from './pages/HiloDelTiempo';
import PerfeccionesDeDios from './pages/PerfeccionesDeDios';
import PerfeccionesCapitulo1 from './pages/PerfeccionesCapitulo1';
import PerfeccionesCapitulo2 from './pages/PerfeccionesCapitulo2';
import SedymModulo3 from './pages/SedymModulo3';
import DeclaracionDeFe from './pages/DeclaracionDeFe';
import EstudioPage from './pages/EstudioPage';
import TeologiaBasica from './pages/TeologiaBasica';
import TeologiaBasicaTema from './pages/TeologiaBasicaTema';
import EstudiosLibros from './pages/EstudiosLibros';
import LibroEstudioIndex from './pages/LibroEstudioIndex';
import LibroEstudioCapitulo from './pages/LibroEstudioCapitulo';
import ScrollToTopButton from './components/ScrollToTopButton';
import MapasBiblicos from './pages/MapasBiblicos';
import MapaRecorrido from './pages/MapaRecorrido';
import Ensenanzas from './pages/Ensenanzas';
import ChatSpurgeon from './components/ChatSpurgeon';
import Biografias from './pages/Biografias';
import Prerreformadores from './pages/Prerreformadores';
import Wycliffe from './pages/prerreformadores/Wycliffe';
import JanHus from './pages/prerreformadores/JanHus';
import PedroWaldo from './pages/prerreformadores/PedroWaldo';
import Savonarola from './pages/prerreformadores/Savonarola';
import Tyndale from './pages/prerreformadores/Tyndale';
import Reformadores from './pages/Reformadores';
import Lutero from './pages/reformadores/Lutero';
import Calvino from './pages/reformadores/Calvino';

// ScrollToTop component to ensure page starts at top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <Router basename={basename}>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-sabiduria-bg">
        <Navbar />
        <div className="flex-grow">
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
            <Route path="/estudio/sedym-modulo-3" element={<SedymModulo3 />} />
            <Route path="/estudio/:slug" element={<EstudioPage />} />
            <Route path="/bosquejos" element={<Bosquejos />} />
            <Route path="/bosquejo/:slug" element={<TextPage textType="bosquejo" />} />
            <Route path="/tienda" element={<Store />} />
            <Route path="/tienda/:slug" element={<ProductPage />} />
            <Route path="/adolescentes" element={<Youth />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/biblioteca/consulta" element={<BibliotecaConsulta />} />
            <Route path="/declaracion-de-fe" element={<DeclaracionDeFe />} />
            <Route path="/teologia-basica" element={<TeologiaBasica />} />
            <Route path="/teologia-basica/:slug" element={<TeologiaBasicaTema />} />
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
            <Route path="/donaciones" element={<Donations />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <ScrollToTopButton />
      <ChatSpurgeon />
    </Router>
  );
}

export default App;

