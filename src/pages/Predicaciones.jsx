import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import catalog from '../data/predicaciones.json';

const TABS = [
  { id: 'libros', label: 'Por Libro Bíblico' },
  { id: 'temas', label: 'Por Tema' },
  { id: 'escuela', label: 'Escuela Dominical' },
  { id: 'varios', label: 'Predicaciones' },
];

const BOOK_ICONS = {
  genesis: '①', exodo: '②', levitico: '③', numeros: '④', deuteronomio: '⑤',
  job: '✦', '1-juan': '①', '2-juan': '②', '3-juan': '③', judas: '✦',
  tito: '✦', '1-timoteo': '①', '2-timoteo': '②', apocalipsis: '✦',
};

function SerieCard({ serie, basePath }) {
  return (
    <Link to={`${basePath}/${serie.id}`}>
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-[#122644] border border-white/8 rounded-lg p-5 hover:border-[#C5A059]/40 transition-all group cursor-pointer"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-white font-semibold text-base group-hover:text-[#C5A059] transition-colors leading-tight">
              {serie.titulo}
            </h3>
            <p className="text-white/40 text-sm mt-1">{serie.total} predicaciones</p>
          </div>
          <span className="text-[#C5A059]/50 text-2xl font-bold leading-none flex-shrink-0 group-hover:text-[#C5A059] transition-colors">
            ▶
          </span>
        </div>
        {serie.documentos?.length > 0 && (
          <p className="text-[#C5A059]/60 text-xs mt-2">· {serie.documentos.length} guías de estudio</p>
        )}
      </motion.div>
    </Link>
  );
}

export default function Predicaciones() {
  const [activeTab, setActiveTab] = useState('libros');
  const [search, setSearch] = useState('');

  const totalAudios = useMemo(() =>
    ['libros','temas','varios','escuela'].reduce((sum, k) =>
      sum + (catalog[k]?.reduce((s, serie) => s + serie.total, 0) || 0), 0),
  []);

  const filteredSeries = useMemo(() => {
    const list = catalog[activeTab] || [];
    if (!search.trim()) return list;
    return list.filter(s => s.titulo.toLowerCase().includes(search.toLowerCase()));
  }, [activeTab, search]);

  const basePaths = {
    libros: '/predicaciones/libros',
    temas: '/predicaciones/temas',
    escuela: '/predicaciones/escuela',
    varios: '/predicaciones/varios',
  };

  return (
    <>
      <SEO
        title="Predicaciones y Enseñanzas — Sabiduría para el Corazón"
        description="Biblioteca de predicaciones expositivas, series por libro bíblico, Escuela Dominical y enseñanzas temáticas."
        url="/predicaciones"
      />

      {/* Hero */}
      <section className="bg-[#0A1628] pt-20 pb-12 px-4 border-b border-white/8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[#C5A059] text-xs font-heading tracking-widest uppercase mb-3"
          >
            Audio · Predicaciones
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="font-heading text-3xl md:text-4xl text-white font-bold mb-4"
          >
            Predicaciones y Enseñanzas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-serif text-white/60 max-w-xl mx-auto text-base"
          >
            {totalAudios} predicaciones — series expositivas por libro, enseñanzas temáticas y Escuela Dominical.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="mt-8 max-w-md mx-auto relative"
          >
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar serie o tema..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#C5A059]/50 transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-[#0A1628] sticky top-0 z-10 border-b border-white/8">
        <div className="max-w-5xl mx-auto px-4 flex overflow-x-auto scrollbar-none">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearch(''); }}
              className={`flex-shrink-0 px-5 py-4 text-sm font-heading font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#C5A059] text-[#C5A059]'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs opacity-50">
                ({catalog[tab.id]?.reduce((s, x) => s + x.total, 0) || 0})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-10 pb-28">
        {filteredSeries.length === 0 ? (
          <p className="text-white/30 text-center py-16">No se encontraron resultados.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSeries.map(serie => (
              <SerieCard key={serie.id} serie={serie} basePath={basePaths[activeTab]} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
