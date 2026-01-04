import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Meditaciones from './pages/Meditaciones';
import ParaElCorazon from './pages/ParaElCorazon';
import Preguntar from './pages/Preguntar';
import TextPage from './pages/TextPage';
import Biblioteca from './pages/Biblioteca';
import ScrollToTopButton from './components/ScrollToTopButton';

// ScrollToTop component to ensure page starts at top on route change
const ScrollToTop = () => {
  const { pathname } = window.location;
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
            <Route path="/meditaciones" element={<Meditaciones />} />
            <Route path="/meditacion/:slug" element={<TextPage textType="meditacion" />} />
            <Route path="/bosquejos" element={<Bosquejos />} />
            <Route path="/bosquejo/:slug" element={<TextPage textType="bosquejo" />} />
            <Route path="/para-el-corazon" element={<ParaElCorazon />} />
            <Route path="/para-el-corazon/:slug" element={<TextPage textType="paraElCorazon" />} />
            <Route path="/preguntar" element={<Preguntar />} />
            <Route path="/preguntar/:slug" element={<TextPage textType="preguntar" />} />
            <Route path="/tienda" element={<Store />} />
            <Route path="/tienda/:slug" element={<ProductPage />} />
            <Route path="/adolescentes" element={<Youth />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/donaciones" element={<Donations />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <ScrollToTopButton />
    </Router>
  );
}

export default App;

