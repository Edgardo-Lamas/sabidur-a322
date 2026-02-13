import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, GraduationCap, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import data from '../data/estudios-libros.json';

const LibroEstudioIndex = () => {
    const { libroSlug } = useParams();
    const libro = data.libros.find(l => l.slug === libroSlug);

    if (!libro) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sabiduria-bg">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-sabiduria-navy mb-4">Libro no encontrado</h1>
                    <Link to="/estudios-libros" className="text-sabiduria-gold font-bold hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft size={18} /> Volver a Estudios
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title={`${libro.titulo} | Estudios Bíblicos`}
                description={libro.descripcion}
                url={`/estudios-libros/${libro.slug}`}
            />

            {/* Breadcrumbs */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                <Breadcrumbs />
            </div>

            {/* Hero Section */}
            <header className="relative bg-sabiduria-navy overflow-hidden mt-8">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                </div>

                <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-sabiduria-gold/10 border border-sabiduria-gold/30 px-4 py-2 rounded-full mb-6">
                            <GraduationCap size={18} className="text-sabiduria-gold" />
                            <span className="text-sabiduria-gold text-sm font-bold uppercase tracking-wider">
                                {libro.titulo}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
                            {libro.subtitulo || libro.titulo}
                        </h1>

                        <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
                            {libro.descripcion}
                        </p>

                        <div className="mt-10 flex items-center justify-center gap-4">
                            <BookOpen size={20} className="text-sabiduria-gold/70" />
                            <span className="text-white/70 text-sm">
                                {libro.capitulos.length} capítulos de estudio
                            </span>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Chapters Grid */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid gap-4 md:gap-6">
                    {libro.capitulos.map((capitulo, index) => (
                        <motion.article
                            key={capitulo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <Link
                                to={`/estudios-libros/${libro.slug}/${capitulo.slug}`}
                                className="group block bg-white border border-sabiduria-gray/10 hover:border-sabiduria-gold/30 transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="flex items-stretch">
                                    <div className="flex-shrink-0 w-20 sm:w-24 bg-sabiduria-navy group-hover:bg-sabiduria-gold transition-colors duration-300 flex items-center justify-center">
                                        <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                                            {capitulo.numero}
                                        </span>
                                    </div>

                                    <div className="flex-grow p-5 sm:p-6 flex items-center justify-between">
                                        <div className="flex-grow pr-4 text-left">
                                            <h2 className="text-lg sm:text-xl font-serif font-bold text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors mb-1">
                                                {capitulo.titulo}
                                            </h2>
                                            <p className="text-sm text-sabiduria-gray line-clamp-1">
                                                {capitulo.descripcion}
                                            </p>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <ChevronRight
                                                size={24}
                                                className="text-sabiduria-gray/30 group-hover:text-sabiduria-gold group-hover:translate-x-1 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default LibroEstudioIndex;
