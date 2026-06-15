import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, ChevronLeft } from 'lucide-react';
import SEO from '../components/SEO';
import textos from '../data/textos.json';
import content from '../data/content.json';

/* ── Carátula de serie ── */
const CoverSlide = ({ essay, numero, totalEnSerie }) => (
    <div className="w-full" style={{ aspectRatio: '2867/1600' }}>
        <div className="w-full h-full bg-sabiduria-navy flex flex-col items-center justify-center relative overflow-hidden px-[8%]">

            {/* Fondo: patrón geométrico sutil */}
            <div className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23C5A059' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Línea dorada superior */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sabiduria-gold to-transparent" />

            {/* Ornamento superior — estrella de David esquematizada */}
            <div className="mb-[4%] opacity-60">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <polygon points="24,4 28,14 39,14 30,21 34,32 24,25 14,32 18,21 9,14 20,14" fill="none" stroke="#C5A059" strokeWidth="1.2" />
                    <circle cx="24" cy="24" r="4" fill="#C5A059" opacity="0.5" />
                </svg>
            </div>

            {/* Nombre de la serie */}
            {essay.serie && (
                <p className="text-sabiduria-gold text-[1.6%] sm:text-[1.4%] font-heading uppercase tracking-[0.25em] mb-[2%] text-center opacity-90"
                    style={{ fontSize: 'clamp(9px, 1.4vw, 18px)', letterSpacing: '0.22em' }}>
                    {essay.serie}
                </p>
            )}

            {/* Separador */}
            <div className="flex items-center gap-3 mb-[3%] w-full max-w-[55%] justify-center">
                <div className="h-px flex-1 bg-sabiduria-gold/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-sabiduria-gold/50" />
                <div className="h-px flex-1 bg-sabiduria-gold/30" />
            </div>

            {/* Título del artículo */}
            <h1 className="text-white font-serif text-center leading-snug mb-[3%] max-w-[65%]"
                style={{ fontSize: 'clamp(16px, 3.2vw, 52px)' }}>
                {essay.title}
            </h1>

            {/* Subtítulo / excerpt */}
            {essay.excerpt && (
                <p className="text-white/50 text-center max-w-[50%] leading-relaxed"
                    style={{ fontSize: 'clamp(9px, 1.1vw, 16px)' }}>
                    {essay.excerpt}
                </p>
            )}

            {/* Número en la serie */}
            {numero && (
                <div className="absolute bottom-[6%] flex items-center gap-2">
                    <span className="text-sabiduria-gold/50 font-heading uppercase"
                        style={{ fontSize: 'clamp(8px, 0.9vw, 13px)', letterSpacing: '0.15em' }}>
                        Artículo {numero}
                        {totalEnSerie ? ` de ${totalEnSerie}` : ''}
                    </span>
                </div>
            )}

            {/* Línea dorada inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sabiduria-gold to-transparent" />
        </div>
    </div>
);

/* ── Componente principal ── */
const PresentacionViewer = () => {
    const { slug } = useParams();
    const essay = (textos.ensayos || []).find(e => e.presentacionSlug === slug);
    const totalSlides = essay?.presentacionTotalSlides || 0;

    // Buscar número en la serie desde content.json
    const serieData = essay?.serie
        ? (content.biblioteca?.series || []).find(s => essay.serie.startsWith(s.titulo))
        : null;
    const articuloInfo = serieData?.articulos?.find(a => a.href === `/ensayo/${essay?.slug}`);
    const numero = articuloInfo?.numero || null;
    const totalEnSerie = serieData?.totalArticulos || null;

    // slide 0 = carátula, 1..N = imágenes
    const TOTAL = totalSlides + 1;
    const [current, setCurrent] = useState(0);

    const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
    const next = useCallback(() => setCurrent(c => Math.min(TOTAL - 1, c + 1)), [TOTAL]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [prev, next]);

    useEffect(() => { setCurrent(0); }, [slug]);

    const slideUrl = (n) =>
        `${import.meta.env.BASE_URL}img/presentaciones/${slug}/slide-${String(n).padStart(2, '0')}.jpg`;
    const pdfUrl = `${import.meta.env.BASE_URL}pdf/presentaciones/${slug}.pdf`;

    if (!essay || totalSlides === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sabiduria-bg">
                <div className="text-center">
                    <p className="text-sabiduria-gray mb-4">Presentación no encontrada.</p>
                    <Link to="/esquemas" className="text-sabiduria-gold hover:underline text-sm">
                        Volver a Esquemas Visuales
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-sabiduria-bg min-h-screen pb-16">
            <SEO
                title={`Presentación: ${essay.title}`}
                description={essay.excerpt || essay.title}
                url={`/esquemas/presentacion/${slug}`}
            />

            {/* Top bar */}
            <div className="max-w-5xl mx-auto px-4 pt-8 pb-4 flex flex-wrap items-center justify-between gap-3">
                <Link
                    to={`/ensayo/${essay.slug}`}
                    className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors text-sm"
                >
                    <ChevronLeft size={16} />
                    Volver al artículo
                </Link>
                <a
                    href={pdfUrl}
                    download
                    className="inline-flex items-center gap-2 text-sm text-sabiduria-gold border border-sabiduria-gold/40 hover:border-sabiduria-gold hover:bg-sabiduria-gold/5 px-4 py-2 rounded transition-colors"
                >
                    <Download size={14} />
                    Descargar presentación
                </a>
            </div>

            {/* Title */}
            <div className="max-w-5xl mx-auto px-4 mb-6 text-center">
                <p className="text-xs uppercase tracking-widest text-sabiduria-gold mb-2 font-heading">
                    Presentación Visual
                </p>
                <h1 className="text-xl sm:text-2xl font-serif text-sabiduria-navy leading-snug">
                    {essay.title}
                </h1>
            </div>

            {/* Slide viewer */}
            <div className="max-w-5xl mx-auto px-4">
                <div className="relative rounded-xl overflow-hidden shadow-lg">

                    {current === 0
                        ? <CoverSlide essay={essay} numero={numero} totalEnSerie={totalEnSerie} />
                        : (
                            <img
                                key={current}
                                src={slideUrl(current)}
                                alt={`Diapositiva ${current} de ${totalSlides}`}
                                className="w-full h-auto block"
                            />
                        )
                    }

                    {/* Prev */}
                    <button
                        onClick={prev}
                        disabled={current === 0}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2.5 disabled:opacity-20 transition-all"
                        aria-label="Anterior"
                    >
                        <ArrowLeft size={22} />
                    </button>

                    {/* Next */}
                    <button
                        onClick={next}
                        disabled={current === TOTAL - 1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2.5 disabled:opacity-20 transition-all"
                        aria-label="Siguiente"
                    >
                        <ArrowRight size={22} />
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-mono px-2.5 py-1 rounded-full">
                        {current === 0 ? 'Portada' : `${current} / ${totalSlides}`}
                    </div>
                </div>

                {/* Navigation dots */}
                <div className="flex items-center justify-center gap-6 mt-5">
                    <button
                        onClick={prev}
                        disabled={current === 0}
                        className="inline-flex items-center gap-1.5 text-sm text-sabiduria-navy hover:text-sabiduria-gold disabled:opacity-30 transition-colors font-medium"
                    >
                        <ArrowLeft size={15} />
                        Anterior
                    </button>

                    <div className="flex gap-1.5">
                        {Array.from({ length: TOTAL }, (_, i) => i).map(n => (
                            <button
                                key={n}
                                onClick={() => setCurrent(n)}
                                className={`h-2 rounded-full transition-all ${
                                    n === current
                                        ? 'bg-sabiduria-gold w-5'
                                        : 'bg-sabiduria-gray/30 hover:bg-sabiduria-gray/60 w-2'
                                }`}
                                aria-label={n === 0 ? 'Portada' : `Ir a diapositiva ${n}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        disabled={current === TOTAL - 1}
                        className="inline-flex items-center gap-1.5 text-sm text-sabiduria-navy hover:text-sabiduria-gold disabled:opacity-30 transition-colors font-medium"
                    >
                        Siguiente
                        <ArrowRight size={15} />
                    </button>
                </div>

                {/* Thumbnail strip */}
                <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
                    {/* Thumbnail carátula */}
                    <button
                        onClick={() => setCurrent(0)}
                        className={`shrink-0 w-24 rounded-lg overflow-hidden border-2 transition-all ${
                            current === 0
                                ? 'border-sabiduria-gold shadow-md'
                                : 'border-transparent hover:border-sabiduria-gray/30 opacity-70 hover:opacity-100'
                        }`}
                        aria-label="Portada"
                    >
                        <div className="w-full bg-sabiduria-navy flex items-center justify-center py-3 px-2" style={{ aspectRatio: '16/9' }}>
                            <span className="text-sabiduria-gold text-[8px] font-heading uppercase tracking-wider text-center leading-tight">
                                {essay.serie?.split(' ').slice(0, 3).join(' ')}
                            </span>
                        </div>
                    </button>

                    {/* Thumbnails slides */}
                    {Array.from({ length: totalSlides }, (_, i) => i + 1).map(n => (
                        <button
                            key={n}
                            onClick={() => setCurrent(n)}
                            className={`shrink-0 w-24 rounded-lg overflow-hidden border-2 transition-all ${
                                n === current
                                    ? 'border-sabiduria-gold shadow-md'
                                    : 'border-transparent hover:border-sabiduria-gray/30 opacity-70 hover:opacity-100'
                            }`}
                            aria-label={`Diapositiva ${n}`}
                        >
                            <img
                                src={slideUrl(n)}
                                alt={`Miniatura ${n}`}
                                className="w-full h-auto block"
                                loading="lazy"
                            />
                        </button>
                    ))}
                </div>

                <p className="text-center text-xs text-sabiduria-gray/50 mt-4">
                    Usa las teclas ← → para navegar
                </p>
            </div>
        </main>
    );
};

export default PresentacionViewer;
