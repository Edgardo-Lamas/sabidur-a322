/**
 * MapasBiblicos.jsx
 * Página índice que lista los 5 recorridos bíblicos interactivos.
 * Muestra tarjetas ordenadas cronológicamente con enlace a cada mapa.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BookOpen, ArrowRight, Clock } from 'lucide-react';
import JOURNEYS from '../data/maps/journeys-registry';
import EPOCH_CONFIG from '../data/maps/epoch-config';
import SEO from '../components/SEO';

const MapasBiblicos = () => {
    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="Mapas Bíblicos Interactivos — Recorridos Geolocalizados"
                description="Explora 5 recorridos bíblicos interactivos en mapas geolocalizados. Desde Abraham hasta los viajes de Pablo, recorre la historia de la redención."
                url="/mapas-biblicos"
            />

            {/* Hero */}
            <section className="relative overflow-hidden bg-sabiduria-navy text-white">
                <img
                    src={`${import.meta.env.BASE_URL}img/mapas-biblicos-hero.jpg`}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-b from-sabiduria-navy/55 via-sabiduria-navy/45 to-sabiduria-navy/80" />
                <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <MapPin size={28} className="text-sabiduria-gold" />
                        <span className="text-sabiduria-gold uppercase text-sm font-semibold tracking-[0.2em]">
                            Planos Interactivos
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-5 leading-tight">
                        Recorridos Bíblicos
                        <br />
                        <span className="text-sabiduria-gold">Geolocalizados</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-serif">
                        Explora la geografía de la historia de la redención. Cinco recorridos que trazan
                        el camino del pueblo de Dios desde los patriarcas hasta la expansión del Evangelio.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-8 text-sm text-white/50">
                        <span className="flex items-center gap-1.5">
                            <MapPin size={14} /> 5 Recorridos
                        </span>
                        <span className="flex items-center gap-1.5">
                            <BookOpen size={14} /> +80 Puntos Bíblicos
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} /> ~2000 a.C. — 67 d.C.
                        </span>
                    </div>
                </div>
            </section>

            {/* Grid de recorridos */}
            <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                <div className="grid gap-6 md:gap-8">
                    {JOURNEYS.map((journey, index) => {
                        const epoch = EPOCH_CONFIG[journey.epoca] || {};
                        return (
                            <Link
                                key={journey.slug}
                                to={`/mapas-biblicos/${journey.slug}`}
                                className="group block bg-white rounded-lg border border-sabiduria-gray/10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Barra lateral de color */}
                                    <div
                                        className="md:w-2 w-full h-2 md:h-auto shrink-0"
                                        style={{ background: epoch.color }}
                                    />

                                    {/* Contenido */}
                                    <div className="grow p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            {/* Número + emoji */}
                                            <div className="flex flex-col items-center gap-1 shrink-0">
                                                <span
                                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                                    style={{ background: epoch.color }}
                                                >
                                                    {index + 1}
                                                </span>
                                                <span className="text-2xl">{journey.imagen}</span>
                                            </div>

                                            {/* Textos */}
                                            <div>
                                                <h2 className="text-xl md:text-2xl font-serif text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors leading-tight">
                                                    {journey.titulo}
                                                </h2>
                                                <p className="text-sabiduria-gold font-serif italic text-sm mt-1">
                                                    {journey.subtitulo}
                                                </p>
                                                <p className="text-sabiduria-gray text-sm mt-2 leading-relaxed max-w-xl">
                                                    {journey.descripcion}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Info + CTA */}
                                        <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-2 shrink-0">
                                            <span
                                                className="text-xs font-semibold px-2.5 py-1 rounded-sm text-white"
                                                style={{ background: epoch.color }}
                                            >
                                                {epoch.rango}
                                            </span>
                                            <span className="text-xs text-sabiduria-gray flex items-center gap-1">
                                                <MapPin size={12} /> {journey.puntos} puntos
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-sm font-medium text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors mt-1">
                                                Explorar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Nota al pie */}
            <section className="max-w-4xl mx-auto px-4 pb-16 text-center">
                <div className="border-t border-sabiduria-gray/10 pt-8">
                    <p className="text-sabiduria-gray text-sm font-serif italic leading-relaxed">
                        «Dios, habiendo hablado muchas veces y de muchas maneras en otro tiempo a los padres por los profetas, en estos postreros días nos ha hablado por el Hijo.»
                    </p>
                    <p className="text-sabiduria-gold text-xs mt-2 font-semibold">— Hebreos 1:1-2</p>
                </div>
            </section>
        </main>
    );
};

export default MapasBiblicos;
