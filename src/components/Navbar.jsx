import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textosOpen, setTextosOpen] = useState(false);
  const [mobileTextosOpen, setMobileTextosOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Tienda', path: '/tienda' },
    { name: 'Adolescentes', path: '/adolescentes' },
    { name: 'Biblioteca', path: '/biblioteca' },
  ];

  const textosSubmenu = [
    { name: 'Artículos', path: '/articulos', description: 'Textos largos, doctrinales, desarrollados.' },
    { name: 'Ensayos', path: '/ensayos', description: 'Reflexión argumentada, más personal, menos exhaustiva.' },
    { name: 'Bosquejos & Guías', path: '/bosquejos', description: 'Estructuras, ayudas para estudio, enseñanza.' },
    { name: 'Meditaciones', path: '/meditaciones', description: 'Textos breves, pausados, contemplativos.' },
    { name: 'Para el corazón', path: '/para-el-corazon', description: 'Palabra pastoral, acompañamiento, consuelo.' },
    { name: 'Preguntar', path: '/preguntar', description: 'Preguntas abiertas, provocativas, existenciales.' },
  ];

  return (
    <nav className="bg-sabiduria-bg border-b border-sabiduria-gray/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-serif font-bold text-sabiduria-navy tracking-tight">
              Sabiduría para el <span className="text-sabiduria-gold">Corazón</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.slice(0, 1).map((link) => (
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
              >
                Textos
                <ChevronDown size={14} className={`transition-transform ${textosOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {textosOpen && (
                <div className="absolute top-full left-0 pt-2 w-72 z-50">
                  <div className="bg-white border border-sabiduria-gray/10 shadow-lg rounded-sm overflow-hidden">
                    {textosSubmenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
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

            {navLinks.slice(1).map((link) => (
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
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-sabiduria-gray/10 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-sabiduria-navy hover:bg-sabiduria-bg font-medium uppercase text-sm"
            >
              Inicio
            </Link>

            {/* Mobile TEXTOS Accordion */}
            <div>
              <button
                onClick={() => setMobileTextosOpen(!mobileTextosOpen)}
                className="w-full flex items-center justify-between px-3 py-4 text-sabiduria-navy hover:bg-sabiduria-bg font-medium uppercase text-sm"
              >
                Textos
                <ChevronDown size={16} className={`transition-transform ${mobileTextosOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileTextosOpen && (
                <div className="bg-sabiduria-bg/50 border-l-2 border-sabiduria-gold ml-3">
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

            {navLinks.slice(1).map((link) => (
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
