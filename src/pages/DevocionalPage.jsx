import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import jonasData from '../data/devocionales/jonas.json';

const ALL_DEVOCIONALES = [...jonasData];

const DevocionalPage = () => {
    const { slug } = useParams();
    const devocional = ALL_DEVOCIONALES.find(d => d.id === slug);

    if (!devocional) return <Navigate to="/devocionales" replace />;

    const currentIndex = ALL_DEVOCIONALES.findIndex(d => d.id === slug);
    const prev = ALL_DEVOCIONALES[currentIndex - 1] || null;
    const next = ALL_DEVOCIONALES[currentIndex + 1] || null;

    const handleShare = () => {
        const url = window.location.href;
        const text = `${devocional.titulo} — ${devocional.versiculo.referencia}\n\n${url}`;
        if (navigator.share) {
            navigator.share({ title: devocional.titulo, text, url });
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        }
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title={`${devocional.titulo} | Devocional — Sabiduría para el Corazón`}
                description={devocional.reflexion[0]}
                url={`/devocionales/${devocional.id}`}
            />

            {/* Nav superior */}
            <div className="max-w-2xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between">
                <Link
                    to="/devocionales"
                    className="inline-flex items-center gap-2 text-sabiduria-gold text-xs font-bold uppercase tracking-widest hover:opacity-75 transition-opacity"
                >
                    <ArrowLeft size={14} />
                    {devocional.serie}
                </Link>
                <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 text-sabiduria-gray text-xs font-medium hover:text-sabiduria-gold transition-colors"
                >
                    <Share2 size={14} />
                    Compartir
                </button>
            </div>

            {/* Versículo hero */}
            <header className="bg-sabiduria-navy text-white">
                <div className="max-w-2xl mx-auto px-6 py-12 md:py-16 text-center">
                    <p className="text-sabiduria-gold/70 text-xs uppercase tracking-[0.25em] font-semibold mb-6">
                        Devocional {devocional.numero} · Serie {devocional.serie}
                    </p>
                    <div className="mb-8">
                        <span className="text-sabiduria-gold/30 font-serif text-5xl leading-none select-none">"</span>
                        <p className="font-serif text-xl md:text-2xl leading-relaxed text-white/90 -mt-4 px-2">
                            {devocional.versiculo.texto}
                        </p>
                        <span className="text-sabiduria-gold/30 font-serif text-5xl leading-none select-none">"</span>
                    </div>
                    <p className="text-sabiduria-gold font-heading text-sm font-semibold uppercase tracking-widest">
                        {devocional.versiculo.referencia}
                    </p>
                </div>
            </header>

            {/* Imagen ilustrativa */}
            {devocional.imagen && (
                <div className="max-w-2xl mx-auto px-4 mt-8">
                    <img
                        src={`${import.meta.env.BASE_URL}img/${devocional.imagen}`}
                        alt={devocional.titulo}
                        className="w-full rounded-lg object-cover shadow-md"
                        style={{ maxHeight: '340px', objectPosition: 'center 30%' }}
                    />
                </div>
            )}

            {/* Título + Reflexión */}
            <article className="max-w-2xl mx-auto px-5 pt-8 pb-4">
                <h1 className="font-serif text-2xl md:text-3xl text-sabiduria-navy font-bold mb-8 leading-tight">
                    {devocional.titulo}
                </h1>

                <div className="space-y-5">
                    {devocional.reflexion.map((parrafo, i) => (
                        <p
                            key={i}
                            className="font-serif text-sabiduria-navy/85 leading-[1.85] text-[1.05rem] text-justify hyphens-auto"
                        >
                            {parrafo}
                        </p>
                    ))}
                </div>
            </article>

            {/* Aplicación */}
            <section className="max-w-2xl mx-auto px-5 py-8">
                <div className="border-l-4 border-sabiduria-gold bg-white rounded-r-lg px-5 py-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen size={15} className="text-sabiduria-gold" />
                        <span className="text-sabiduria-gold font-heading text-xs font-bold uppercase tracking-widest">
                            Para reflexionar
                        </span>
                    </div>
                    <ol className="space-y-3">
                        {devocional.aplicacion.map((pregunta, i) => (
                            <li key={i} className="font-serif text-sabiduria-navy text-sm leading-relaxed">
                                <span className="font-bold text-sabiduria-gold mr-1">{i + 1}.</span>
                                {pregunta}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Navegación entre devocionales */}
            <nav className="max-w-2xl mx-auto px-5 pb-12">
                <div className="flex gap-3 pt-4 border-t border-sabiduria-gray/15">
                    {prev ? (
                        <Link
                            to={`/devocionales/${prev.id}`}
                            className="flex-1 flex items-center gap-2 bg-white border border-sabiduria-gray/15 rounded-lg px-4 py-3 hover:border-sabiduria-gold/40 transition-colors group"
                        >
                            <ArrowLeft size={16} className="text-sabiduria-gray group-hover:text-sabiduria-gold shrink-0 transition-colors" />
                            <div className="min-w-0">
                                <p className="text-xs text-sabiduria-gray uppercase tracking-wide">Anterior</p>
                                <p className="text-sm font-medium text-sabiduria-navy truncate">{prev.titulo}</p>
                            </div>
                        </Link>
                    ) : <div className="flex-1" />}

                    {next ? (
                        <Link
                            to={`/devocionales/${next.id}`}
                            className="flex-1 flex items-center justify-end gap-2 bg-white border border-sabiduria-gray/15 rounded-lg px-4 py-3 hover:border-sabiduria-gold/40 transition-colors group text-right"
                        >
                            <div className="min-w-0">
                                <p className="text-xs text-sabiduria-gray uppercase tracking-wide">Siguiente</p>
                                <p className="text-sm font-medium text-sabiduria-navy truncate">{next.titulo}</p>
                            </div>
                            <ArrowRight size={16} className="text-sabiduria-gray group-hover:text-sabiduria-gold shrink-0 transition-colors" />
                        </Link>
                    ) : <div className="flex-1" />}
                </div>
            </nav>
        </main>
    );
};

export default DevocionalPage;
