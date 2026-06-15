import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, ChevronLeft } from 'lucide-react';
import SEO from '../components/SEO';
import textos from '../data/textos.json';

const PresentacionViewer = () => {
    const { slug } = useParams();
    const essay = (textos.ensayos || []).find(e => e.presentacionSlug === slug);
    const totalSlides = essay?.presentacionTotalSlides || 0;

    const [current, setCurrent] = useState(1);

    const prev = useCallback(() => setCurrent(c => Math.max(1, c - 1)), []);
    const next = useCallback(() => setCurrent(c => Math.min(totalSlides, c + 1)), [totalSlides]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [prev, next]);

    useEffect(() => {
        setCurrent(1);
    }, [slug]);

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

            {/* Main slide */}
            <div className="max-w-5xl mx-auto px-4">
                <div className="relative bg-black/5 rounded-xl overflow-hidden shadow-lg">
                    <img
                        key={current}
                        src={slideUrl(current)}
                        alt={`Diapositiva ${current} de ${totalSlides}`}
                        className="w-full h-auto block"
                    />

                    {/* Prev overlay */}
                    <button
                        onClick={prev}
                        disabled={current === 1}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2.5 disabled:opacity-20 transition-all"
                        aria-label="Diapositiva anterior"
                    >
                        <ArrowLeft size={22} />
                    </button>

                    {/* Next overlay */}
                    <button
                        onClick={next}
                        disabled={current === totalSlides}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2.5 disabled:opacity-20 transition-all"
                        aria-label="Siguiente diapositiva"
                    >
                        <ArrowRight size={22} />
                    </button>

                    {/* Slide counter badge */}
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-mono px-2.5 py-1 rounded-full">
                        {current} / {totalSlides}
                    </div>
                </div>

                {/* Navigation row */}
                <div className="flex items-center justify-center gap-6 mt-5">
                    <button
                        onClick={prev}
                        disabled={current === 1}
                        className="inline-flex items-center gap-1.5 text-sm text-sabiduria-navy hover:text-sabiduria-gold disabled:opacity-30 transition-colors font-medium"
                    >
                        <ArrowLeft size={15} />
                        Anterior
                    </button>

                    <div className="flex gap-1.5">
                        {Array.from({ length: totalSlides }, (_, i) => i + 1).map(n => (
                            <button
                                key={n}
                                onClick={() => setCurrent(n)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    n === current
                                        ? 'bg-sabiduria-gold w-5'
                                        : 'bg-sabiduria-gray/30 hover:bg-sabiduria-gray/60'
                                }`}
                                aria-label={`Ir a diapositiva ${n}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        disabled={current === totalSlides}
                        className="inline-flex items-center gap-1.5 text-sm text-sabiduria-navy hover:text-sabiduria-gold disabled:opacity-30 transition-colors font-medium"
                    >
                        Siguiente
                        <ArrowRight size={15} />
                    </button>
                </div>

                {/* Thumbnail strip */}
                <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
                    {Array.from({ length: totalSlides }, (_, i) => i + 1).map(n => (
                        <button
                            key={n}
                            onClick={() => setCurrent(n)}
                            className={`flex-shrink-0 w-24 rounded-lg overflow-hidden border-2 transition-all ${
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

                {/* Keyboard hint */}
                <p className="text-center text-xs text-sabiduria-gray/50 mt-4">
                    Usa las teclas ← → para navegar
                </p>
            </div>
        </main>
    );
};

export default PresentacionViewer;
