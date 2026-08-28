import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Clock } from 'lucide-react';
import content from '../data/content.json';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFound from './NotFound';

/**
 * SerieArticulos — carátula e índice de una serie que vive en la página Artículos.
 *
 * No confundir con SeriesPage.jsx: aquella sirve las series de la BIBLIOTECA
 * (`content.json → biblioteca.series[]`), cuyo contenido son ensayos. Esta sirve
 * `content.json → seriesArticulos[]`, cuyas entregas son artículos y viven en
 * `textos.json → articulos[]`. Son dos colecciones distintas a propósito.
 */

/* ─── Card de una entrega ─── */
const EntregaCard = ({ entrega }) => {
    const inner = (
        <article className={`group bg-white border rounded-sm p-6 flex gap-5 transition-all ${entrega.disponible ? 'border-sabiduria-gray/15 hover:border-sabiduria-gold/40 hover:shadow-md cursor-pointer' : 'border-sabiduria-gray/10 opacity-55 cursor-default'}`}>
            <span className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold mt-0.5 ${entrega.disponible ? 'bg-sabiduria-navy text-white' : 'bg-sabiduria-gray/15 text-sabiduria-gray/50'}`}>
                {entrega.numero}
            </span>
            <div className="flex-1 min-w-0">
                <h3 className={`font-serif font-bold text-lg leading-snug ${entrega.disponible ? 'text-sabiduria-navy' : 'text-sabiduria-gray/50'}`}>
                    {entrega.titulo}
                </h3>
                {entrega.subtitulo && (
                    <p className="text-sabiduria-gray/70 text-sm mt-1 leading-snug italic">
                        {entrega.subtitulo}
                    </p>
                )}
                <p className={`text-xs font-semibold uppercase tracking-widest mt-3 ${entrega.disponible ? 'text-sabiduria-gold' : 'text-sabiduria-gray/35'}`}>
                    {entrega.disponible ? 'Leer artículo' : 'Próximamente'}
                </p>
            </div>
            {entrega.disponible && (
                <ChevronRight size={18} className="text-sabiduria-gray/30 group-hover:text-sabiduria-gold transition-colors shrink-0 mt-1" />
            )}
        </article>
    );

    if (entrega.disponible && entrega.href) {
        return <Link to={entrega.href}>{inner}</Link>;
    }
    return inner;
};

const SerieArticulos = () => {
    const { slug } = useParams();
    const baseUrl = import.meta.env.BASE_URL;
    const serie = (content.seriesArticulos || []).find((s) => s.slug === slug);

    if (!serie) return <NotFound />;

    const disponibles = (serie.articulos || []).filter((a) => a.disponible).length;

    return (
        <main>
            <SEO
                title={`${serie.titulo} | Serie`}
                description={serie.descripcion}
                image={serie.imagen || undefined}
                url={`/articulos/serie/${serie.slug}`}
            />

            <div className="min-h-screen bg-sabiduria-bg">

                {/* Carátula de la serie */}
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
                            to="/articulos"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-sabiduria-gold text-sm mb-8 transition-colors"
                        >
                            <ArrowLeft size={14} />
                            Volver a Artículos
                        </Link>

                        <p className="text-sabiduria-gold text-xs font-semibold uppercase tracking-widest mb-3">
                            Serie · {serie.categoria}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
                            {serie.titulo}
                        </h1>
                        <p className="text-white/70 leading-relaxed max-w-2xl">
                            {serie.descripcion}
                        </p>

                        <div className="mt-8 inline-flex items-center gap-2 border border-sabiduria-gold/40 text-sabiduria-gold px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-widest">
                            <Clock size={14} />
                            {disponibles} de {serie.totalArticulos} publicados
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4">
                    <Breadcrumbs title={serie.titulo} />
                </div>

                {/* Índice de entregas */}
                <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
                    <h2 className="text-2xl font-serif font-bold text-sabiduria-navy mb-8">
                        Las entregas de la serie
                    </h2>
                    <div className="flex flex-col gap-4">
                        {(serie.articulos || []).map((entrega) => (
                            <EntregaCard key={entrega.numero} entrega={entrega} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default SerieArticulos;
