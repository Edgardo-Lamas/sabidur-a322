import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import Articles from './pages/Articles';

// ScrollToTop component to ensure page starts at top on route change
const ScrollToTop = () => {
  const { pathname } = window.location;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-sabiduria-bg">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articulos" element={<Articles />} />
            <Route path="/articulo/:slug" element={<ArticlePage />} />
            <Route path="/bosquejos" element={<div className="py-20 text-center font-serif text-3xl">Próximamente: Bosquejos Homiléticos</div>} />
            <Route path="/ebooks" element={<div className="py-20 text-center font-serif text-3xl">Próximamente: Biblioteca Digital</div>} />
            <Route path="/donaciones" element={<div className="py-20 text-center font-serif text-3xl">Página de Donaciones</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
