import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Artículos', path: '/articulos' },
    { name: 'Bosquejos', path: '/bosquejos' },
    { name: 'E-books', path: '/ebooks' },
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sabiduria-navy/80 hover:text-sabiduria-navy font-medium text-sm tracking-wide uppercase transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/donaciones"
              className="px-6 py-2 border-2 border-sabiduria-gold text-sabiduria-gold hover:bg-sabiduria-gold hover:text-white font-bold text-sm uppercase tracking-widest transition-all rounded-sm flex items-center gap-2"
            >
              <Heart size={16} className="fill-current" />
              Apoyar
            </Link>
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
            {navLinks.map((link) => (
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
