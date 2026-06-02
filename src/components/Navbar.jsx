import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textosOpen, setTextosOpen] = useState(false);
  const [mobileTextosOpen, setMobileTextosOpen] = useState(false);
  const [bibliotecaOpen, setBibliotecaOpen] = useState(false);
  const [mobileBibliotecaOpen, setMobileBibliotecaOpen] = useState(false);

  const navLinksPre = [
    { name: 'Inicio', path: '/' },
    { name: 'Tienda', path: '/tienda' },
    { name: 'Juventud', path: '/adolescentes' },
  ];

  const navLinksPost = [
    { name: 'Mapas', path: '/mapas-biblicos' },
    { name: 'Enseñanzas', path: '/ensenanzas' },
  ];

  const textosSubmenu = [
    { name: 'Artículos', path: '/articulos', description: 'Textos largos, doctrinales, desarrollados.' },
    { name: 'Ensayos', path: '/ensayos', description: 'Reflexión argumentada, más personal, menos exhaustiva.' },
    { name: 'Bosquejos & Guías', path: '/bosquejos', description: 'Estructuras, ayudas para estudio, enseñanza.' },
    { name: 'Grandes Temas Bíblicos', path: '/grandes-temas', description: 'Revelación, Justificación, Santificación y Glorificación desarrollados con fundamento bíblico.' },
    { name: 'Biografías', path: '/biografias', description: 'Prerreformadores, Reformadores, Padres de la Iglesia.' },
  ];

  const bibliotecaSubmenu = [
    { name: 'Biblioteca Digital', path: '/biblioteca', description: 'Series, libros sagrados e e-books PDF.' },
    { name: 'Esquemas Visuales', path: '/esquemas', description: 'Mapas conceptuales, líneas de tiempo y recursos de estudio.' },
    { name: 'Biblioteca de Consulta', path: '/biblioteca/consulta', description: 'Comentarios bíblicos y lecturas recomendadas.' },
  ];

  return (
    <nav className="bg-sabiduria-bg border-b border-sabiduria-gray/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto pr-4 sm:pr-6 lg:pr-8 pl-0">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="block">
              <img
                src={`${import.meta.env.BASE_URL}img/logo/logo-navbar.svg`}
                alt="Sabiduría para el Corazón"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinksPre.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sabiduria-navy/80 hover:text-sabiduria-navy font-medium text-sm tracking-wide uppercase transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* TEXTOS Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTextosOpen(true)}
              onMouseLeave={() => setTextosOpen(false)}
            >
              <button
                className="text-sabiduria-navy/80 hover:text-sabiduria-navy font-medium text-sm tracking-wide uppercase transition-colors flex items-center gap-1 py-2"
                aria-haspopup="true"
                aria-expanded={textosOpen}
                aria-controls="textos-dropdown"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setTextosOpen(false);
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTextosOpen(prev => !prev); }
                }}
              >
                Textos
                <ChevronDown size={14} className={`transition-transform ${textosOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {textosOpen && (
                <div id="textos-dropdown" role="menu" className="absolute top-full left-0 pt-2 w-72 z-50">
                  <div className="bg-white border border-sabiduria-gray/10 shadow-lg rounded-sm overflow-hidden">
                    {textosSubmenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        role="menuitem"
                        onKeyDown={(e) => { if (e.key === 'Escape') setTextosOpen(false); }}
                        className="block px-4 py-3 hover:bg-sabiduria-bg transition-colors border-b border-sabiduria-gray/5 last:border-b-0"
                      >
                        <span className="block text-sabiduria-navy font-medium text-sm uppercase tracking-wide">
                          {item.name}
                        </span>
                        <span className="block text-sabiduria-gray text-xs mt-1">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* BIBLIOTECA Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBibliotecaOpen(true)}
              onMouseLeave={() => setBibliotecaOpen(false)}
            >
              <button
                className="text-sabiduria-navy/80 hover:text-sabiduria-navy font-medium text-sm tracking-wide uppercase transition-colors flex items-center gap-1 py-2"
                aria-haspopup="true"
                aria-expanded={bibliotecaOpen}
                aria-controls="biblioteca-dropdown"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setBibliotecaOpen(false);
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setBibliotecaOpen(prev => !prev); }
                }}
              >
                Biblioteca
                <ChevronDown size={14} className={`transition-transform ${bibliotecaOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {bibliotecaOpen && (
                <div id="biblioteca-dropdown" role="menu" className="absolute top-full left-0 pt-2 w-72 z-50">
                  <div className="bg-white border border-sabiduria-gray/10 shadow-lg rounded-sm overflow-hidden">
                    {bibliotecaSubmenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        role="menuitem"
                        onKeyDown={(e) => { if (e.key === 'Escape') setBibliotecaOpen(false); }}
                        className="block px-4 py-3 hover:bg-sabiduria-bg transition-colors border-b border-sabiduria-gray/5 last:border-b-0"
                      >
                        <span className="block text-sabiduria-navy font-medium text-sm uppercase tracking-wide">
                          {item.name}
                        </span>
                        <span className="block text-sabiduria-gray text-xs mt-1">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinksPost.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sabiduria-navy/80 hover:text-sabiduria-navy font-medium text-sm tracking-wide uppercase transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <AnimatedButton
              as="link"
              to="/donaciones"
              variant="outline"
              pulse={true}
              className="text-sm"
            >
              <Heart size={16} className="fill-current" />
              Apoyar
            </AnimatedButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sabiduria-navy hover:text-sabiduria-gold focus:outline-none"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-b border-sabiduria-gray/10 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinksPre.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-sabiduria-navy hover:bg-sabiduria-bg font-medium uppercase text-sm"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile TEXTOS Accordion */}
            <div>
              <button
                onClick={() => setMobileTextosOpen(!mobileTextosOpen)}
                className="w-full flex items-center justify-between px-3 py-4 text-sabiduria-navy hover:bg-sabiduria-bg font-medium uppercase text-sm"
                aria-expanded={mobileTextosOpen}
                aria-controls="mobile-textos-submenu"
              >
                Textos
                <ChevronDown size={16} className={`transition-transform ${mobileTextosOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileTextosOpen && (
                <div id="mobile-textos-submenu" className="bg-sabiduria-bg/50 border-l-2 border-sabiduria-gold ml-3">
                  {textosSubmenu.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sabiduria-navy/80 hover:text-sabiduria-navy text-sm"
                    >
                      <span className="block font-medium">{item.name}</span>
                      <span className="block text-xs text-sabiduria-gray mt-0.5">{item.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile BIBLIOTECA Accordion */}
            <div>
              <button
                onClick={() => setMobileBibliotecaOpen(!mobileBibliotecaOpen)}
                className="w-full flex items-center justify-between px-3 py-4 text-sabiduria-navy hover:bg-sabiduria-bg font-medium uppercase text-sm"
                aria-expanded={mobileBibliotecaOpen}
                aria-controls="mobile-biblioteca-submenu"
              >
                Biblioteca
                <ChevronDown size={16} className={`transition-transform ${mobileBibliotecaOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileBibliotecaOpen && (
                <div id="mobile-biblioteca-submenu" className="bg-sabiduria-bg/50 border-l-2 border-sabiduria-gold ml-3">
                  {bibliotecaSubmenu.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-sabiduria-navy/80 hover:text-sabiduria-navy text-sm"
                    >
                      <span className="block font-medium">{item.name}</span>
                      <span className="block text-xs text-sabiduria-gray mt-0.5">{item.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinksPost.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-sabiduria-navy hover:bg-sabiduria-bg font-medium uppercase text-sm"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/donaciones"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-sabiduria-gold font-bold uppercase text-sm border-t border-sabiduria-gray/10"
            >
              Apoyar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
