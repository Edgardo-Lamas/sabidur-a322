import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Download, ChevronRight, ArrowLeft, Clock } from 'lucide-react';
import content from '../data/content.json';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFound from './NotFound';

/* ─── Card de libro PDF ─── */
const LibroCard = ({ libro, baseUrl }) => (
    <article className={`bg-white border rounded-sm overflow-hidden flex flex-col transition-shadow ${libro.disponible ? 'border-sabiduria-gray/15 hover:shadow-md' : 'border-sabiduria-gray/10 opacity-60'}`}>
        <div className="bg-sabiduria-navy px-6 py-5">
            <p className="text-sabiduria-gold text-xs font-semibold uppercase tracking-widest mb-1">
                {libro.disponible ? 'Disponible' : 'En preparación'}
            </p>
            <h3 className="text-white text-lg font-serif font-bold leading-tight">
                {libro.titulo}
            </h3>
            {libro.subtitulo && (
                <p className="text-white/55 text-sm italic mt-1 leading-snug">{libro.subtitulo}</p>
            )}
        </div>
        <div className="px-6 py-5 flex-1 flex flex-col gap-4">
            <p className="text-sabiduria-gray text-sm leading-relaxed flex-1">
                {libro.descripcion}
            </p>
            {libro.disponible && libro.pdfUrl ? (
                <div className="flex gap-2 pt-2 border-t border-sabiduria-gray/10">
                    <Link
                        to={`/biblioteca/${libro.slug}`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-sabiduria-navy text-white text-sm font-medium rounded-sm hover:bg-sabiduria-navy/85 transition-colors"
                    >
                        <BookOpen size={14} />
                        Ver
                    </Link>
                    <a
                        href={`${baseUrl}${libro.pdfUrl}`}
                        download
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-sabiduria-navy text-sabiduria-navy text-sm font-medium rounded-sm hover:bg-sabiduria-navy/5 transition-colors"
                    >
                        <Download size={14} />
                        PDF
                    </a>
                </div>
            ) : (
                <div className="pt-2 border-t border-sabiduria-gray/10">
                    <span className="text-xs text-sabiduria-gray/40 italic">Próximamente</span>
                </div>
            )}
        </div>
    </article>
);

/* ─── Card de artículo de serie ─── */
const ArticuloCard = ({ articulo }) => {
    const inner = (
        <article className={`group bg-white border rounded-sm p-6 flex gap-5 transition-all ${articulo.disponible ? 'border-sabiduria-gray/15 hover:border-sabiduria-gold/40 hover:shadow-md cursor-pointer' : 'border-sabiduria-gray/10 opacity-55 cursor-default'}`}>
            <span className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold mt-0.5 ${articulo.disponible ? 'bg-sabiduria-navy text-white' : 'bg-sabiduria-gray/15 text-sabiduria-gray/50'}`}>
                {articulo.numero}
            </span>
            <div className="flex-1 min-w-0">
                <h3 className={`font-serif font-bold text-lg leading-snug ${articulo.disponible ? 'text-sabiduria-navy' : 'text-sabiduria-gray/50'}`}>
                    {articulo.titulo}
                </h3>
                {articulo.subtitulo && (
                    <p className="text-sabiduria-gray/70 text-sm mt-1 leading-snug italic">
                        {articulo.subtitulo}
                    </p>
                )}
                <p className={`text-xs font-semibold uppercase tracking-widest mt-3 ${articulo.disponible ? 'text-sabiduria-gold' : 'text-sabiduria-gray/35'}`}>
                    {articulo.disponible ? 'Leer artículo' : 'Próximamente'}
                </p>
            </div>
            {articulo.disponible && (
                <ChevronRight size={18} className="text-sabiduria-gray/30 group-hover:text-sabiduria-gold transition-colors shrink-0 mt-1" />
            )}
        </article>
    );

    if (articulo.disponible && articulo.href) {
        return <Link to={articulo.href}>{inner}</Link>;
    }
    return inner;
};

/* ─── Página de detalle de serie ─── */
const SeriesPage = () => {
    const { slug } = useParams();
    const baseUrl = import.meta.env.BASE_URL;

    const series = content.biblioteca?.series || [];
    const serie = series.find(s => s.slug === slug);

    if (!serie) return <NotFound />;

    const isColeccion = serie.esColeccion;
    const librosHebreos = content.biblioteca?.librosHebreos || [];
    const items = isColeccion ? librosHebreos : (serie.articulos || []);
    const disponibles = items.filter(i => i.disponible).length;

    return (
        <>
            <SEO
                title={`${serie.titulo} — Sabiduría para el Corazón`}
                description={serie.descripcion}
            />

            <div className="min-h-screen bg-sabiduria-bg">

                {/* Hero de la serie */}
                <header className="relative py-16 md:py-20 overflow-hidden">
                    {serie.imagen ? (
                        <>
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${baseUrl}${serie.imagen})` }}
                            />
                            <div className="absolute inset-0 bg-sabiduria-navy/75" />
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-sabiduria-navy" />
                    )}

                    <div className="relative max-w-4xl mx-auto px-4">
                        <Link
                            to="/biblioteca"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-sabiduria-gold text-sm mb-8 transition-colors"
                        >
                            <ArrowLeft size={14} />
                            Volver a Biblioteca
                        </Link>

                        <p className="text-sabiduria-gold text-xs font-semibold uppercase tracking-widest mb-3">
                            {isColeccion ? 'Colección' : 'Serie'} · {serie.categoria}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
                            {serie.titulo}
                        </h1>
                        <p className="text-white/70 leading-relaxed max-w-2xl">
                            {serie.descripcion}
                        </p>

                        {serie.disponible && (
                            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-sabiduria-gold/20 border border-sabiduria-gold/30 rounded-sm">
                                <Clock size={13} className="text-sabiduria-gold" />
                                <span className="text-sabiduria-gold text-xs font-semibold uppercase tracking-widest">
                                    {disponibles} {isColeccion ? 'documentos disponibles' : disponibles === 1 ? 'artículo disponible' : 'artículos disponibles'}
                                </span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Breadcrumbs */}
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <Breadcrumbs />
                </div>

                {/* Contenido */}
                <main className="max-w-6xl mx-auto px-4 py-12">
                    {!serie.disponible ? (
                        <div className="text-center py-20 border border-dashed border-sabiduria-gray/20 rounded-sm">
                            <Clock size={36} className="text-sabiduria-gold/40 mx-auto mb-4" />
                            <p className="text-sabiduria-gray font-serif text-lg mb-2">Esta serie está en preparación</p>
                            <p className="text-sabiduria-gray/60 text-sm max-w-md mx-auto">
                                Los artículos se irán publicando progresivamente. Volvé pronto para ver el contenido disponible.
                            </p>
                            <Link
                                to="/biblioteca"
                                className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 border border-sabiduria-gray/20 text-sabiduria-gray text-sm rounded-sm hover:border-sabiduria-gold/40 hover:text-sabiduria-navy transition-colors"
                            >
                                <ArrowLeft size={14} />
                                Ver todas las series
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-serif font-bold text-sabiduria-navy mb-6">
                                {isColeccion ? 'Documentos de la colección' : 'Artículos de la serie'}
                            </h2>

                            {isColeccion ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {items.map(libro => (
                                        <LibroCard key={libro.id} libro={libro} baseUrl={baseUrl} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 max-w-3xl">
                                    {items.map((articulo, i) => (
                                        <ArticuloCard key={i} articulo={articulo} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </>
    );
};

export default SeriesPage;
