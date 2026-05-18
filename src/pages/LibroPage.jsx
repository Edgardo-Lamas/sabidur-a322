import { useParams, Link } from 'react-router-dom';
import { BookOpen, Download, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import content from '../data/content.json';

const libros = content.biblioteca.librosHebreos;

const LibroPage = () => {
    const { slug } = useParams();
    const libro = libros.find(l => l.slug === slug);

    if (!libro) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sabiduria-bg">
                <div className="text-center">
                    <h1 className="text-3xl font-serif text-sabiduria-navy mb-4">Libro no encontrado</h1>
                    <Link to="/biblioteca" className="text-sabiduria-gold hover:underline font-medium">
                        ← Volver a la Biblioteca
                    </Link>
                </div>
            </div>
        );
    }

    const pdfFullUrl = `/${libro.pdfUrl}`;

    return (
        <main className="min-h-screen bg-sabiduria-bg">
            <SEO
                title={`${libro.titulo} — ${libro.subtitulo}`}
                description={libro.descripcion}
                image={libro.coverImage}
                url={`/biblioteca/${libro.slug}`}
                type="article"
            />

            {/* Hero con portada */}
            <div className="bg-sabiduria-navy">
                <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
                    <Link
                        to="/biblioteca"
                        className="inline-flex items-center gap-2 text-sabiduria-gray/60 hover:text-sabiduria-gold text-sm mb-10 transition-colors"
                    >
                        <ArrowLeft size={15} />
                        Biblioteca
                    </Link>

                    <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
                        {/* Portada */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className="shrink-0 w-48 md:w-56"
                        >
                            <img
                                src={`/${libro.coverImage}`}
                                alt={`Portada de ${libro.titulo}`}
                                className="w-full rounded shadow-2xl"
                            />
                        </motion.div>

                        {/* Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.08 }}
                            className="flex-1"
                        >
                            <p className="text-sabiduria-gold/80 text-xs font-semibold uppercase tracking-widest mb-3">
                                Libros Sagrados de Israel
                            </p>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight">
                                {libro.titulo}
                            </h1>
                            <p className="text-sabiduria-gold text-lg font-serif mb-6">
                                {libro.subtitulo}
                            </p>
                            <p className="text-sabiduria-gray leading-relaxed text-base max-w-xl mb-10">
                                {libro.descripcion}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href={pdfFullUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sabiduria-gold text-sabiduria-navy font-semibold rounded-sm hover:bg-sabiduria-gold/90 transition-colors"
                                >
                                    <BookOpen size={18} />
                                    Leer en línea
                                    <ExternalLink size={14} className="opacity-60" />
                                </a>
                                <a
                                    href={pdfFullUrl}
                                    download={`${libro.titulo}.pdf`}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-sm hover:bg-white/5 transition-colors"
                                >
                                    <Download size={18} />
                                    Descargar PDF
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Contexto de la serie */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="border-t border-sabiduria-gray/10 pt-10">
                    <p className="text-sabiduria-gray/60 text-sm uppercase tracking-widest font-semibold mb-6">
                        Otros títulos de la serie
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {libros.filter(l => l.disponible).map(l => (
                            <Link
                                key={l.slug}
                                to={`/biblioteca/${l.slug}`}
                                className={`text-center group ${l.slug === slug ? 'opacity-40 pointer-events-none' : ''}`}
                            >
                                <img
                                    src={`/${l.coverImage}`}
                                    alt={l.titulo}
                                    className="w-full rounded shadow-md mb-2 group-hover:shadow-lg transition-shadow"
                                />
                                <p className="text-sabiduria-navy text-xs font-medium group-hover:text-sabiduria-gold transition-colors leading-tight">
                                    {l.titulo}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <Link
                        to="/biblioteca"
                        className="text-sabiduria-gold hover:underline text-sm font-medium inline-flex items-center gap-2"
                    >
                        <ArrowLeft size={14} />
                        Ver toda la Biblioteca
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default LibroPage;
