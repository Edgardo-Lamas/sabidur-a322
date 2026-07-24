import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import catalog from '../data/predicaciones.json';

function formatSize(bytes) {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(0)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

function EpisodeRow({ ep, index, serie, isActive, isPlaying, onPlay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`flex items-center gap-4 p-4 rounded-lg border transition-all group ${
        isActive
          ? 'bg-[#C5A059]/10 border-[#C5A059]/30'
          : 'bg-[#122644]/50 border-white/6 hover:border-white/15 hover:bg-[#122644]'
      }`}
    >
      {/* Play button / number */}
      <button
        onClick={() => onPlay(ep, index)}
        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
          isActive
            ? 'bg-[#C5A059] text-[#0A1628]'
            : 'bg-white/6 text-white/50 group-hover:bg-[#C5A059]/20 group-hover:text-[#C5A059]'
        }`}
      >
        {isActive && isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-snug truncate ${isActive ? 'text-[#C5A059]' : 'text-white/80'}`}>
          {ep.titulo}
        </p>
        {ep.subtema && ep.subtema !== '.' && (
          <p className="text-white/30 text-xs mt-0.5 truncate">{ep.subtema}</p>
        )}
      </div>

      {/* Format badge */}
      <span className="text-xs text-white/25 uppercase font-mono flex-shrink-0 hidden sm:block">
        {ep.formato}
      </span>
    </motion.div>
  );
}

export default function PredicacionesSerie({ seccion }) {
  const { id } = useParams();
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const serie = useMemo(() => {
    const list = catalog[seccion] || [];
    return list.find(s => s.id === id);
  }, [seccion, id]);

  const backPath = {
    libros: '/predicaciones',
    temas: '/predicaciones',
    escuela: '/predicaciones',
    varios: '/predicaciones',
  }[seccion] || '/predicaciones';

  if (!serie) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <p className="text-white/40">Serie no encontrada.</p>
      </div>
    );
  }

  const handlePlay = (ep, index) => {
    const track = {
      ...ep,
      serie: serie.titulo,
    };
    playTrack(track, serie.episodios.map(e => ({ ...e, serie: serie.titulo })), index);
  };

  const handlePlayAll = () => {
    if (serie.episodios.length) handlePlay(serie.episodios[0], 0);
  };

  return (
    <>
      <SEO
        title={`${serie.titulo} — Predicaciones — Sabiduría para el Corazón`}
        description={`${serie.total} predicaciones de la serie ${serie.titulo}.`}
        url={`/predicaciones/${seccion}/${id}`}
      />

      {/* Header */}
      <section className="bg-[#0A1628] pt-16 pb-10 px-4 border-b border-white/8">
        <div className="max-w-3xl mx-auto">
          <Link to={backPath} className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            Volver
          </Link>
          <p className="text-[#C5A059] text-xs font-heading tracking-widest uppercase mb-2">
            {seccion === 'escuela' ? 'Escuela Dominical' : seccion === 'libros' ? 'Serie Expositiva' : 'Predicaciones'}
          </p>
          <h1 className="font-heading text-3xl text-white font-bold mb-3">{serie.titulo}</h1>
          <p className="text-white/40 text-sm">{serie.total} predicaciones</p>

          {serie.documentos?.length > 0 && (
            <p className="text-[#C5A059]/60 text-sm mt-1">· {serie.documentos.length} guías de estudio disponibles</p>
          )}

          <button
            onClick={handlePlayAll}
            className="mt-6 inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#E6C378] text-[#0A1628] font-heading font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Reproducir todo
          </button>
        </div>
      </section>

      {/* Episodes */}
      <section className="max-w-3xl mx-auto px-4 py-8 pb-28">
        <div className="flex flex-col gap-2">
          {serie.episodios.map((ep, i) => (
            <EpisodeRow
              key={ep.id}
              ep={ep}
              index={i}
              serie={serie}
              isActive={currentTrack?.id === ep.id}
              isPlaying={isPlaying}
              onPlay={handlePlay}
            />
          ))}
        </div>
      </section>
    </>
  );
}
