import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, ChevronRight, GraduationCap, Library } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import data from '../data/estudios-libros.json';

const EstudiosLibros = () => {
    return (
        <main className="bg-sabiduria-bg min-h-screen pb-20">
            <SEO
                title="Estudios Bíblicos por Libros"
                description="Explora estudios profundos y sistemáticos de los libros de la Biblia."
                url="/estudios-libros"
            />

            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <Breadcrumbs />
            </div>

            {/* Hero Section */}
            <header className="relative bg-sabiduria-navy overflow-hidden mt-8 max-w-7xl mx-auto border border-sabiduria-gray/10">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={`${import.meta.env.BASE_URL}img/estudios-hero.png`}
                        alt="Estudios Bíblicos"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-sabiduria-navy via-sabiduria-navy/80 to-transparent" />
                </div>

                <div className="relative z-10 px-8 py-16 md:py-24 text-left max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-sabiduria-gold/20 border border-sabiduria-gold/30 px-4 py-2 rounded-full mb-6">
                            <Book size={18} className="text-sabiduria-gold" />
                            <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-widest">
                                Estudios Profundos
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                            Estudios Bíblicos <br />
                            <span className="text-sabiduria-gold">por Libros</span>
                        </h1>

                        <p className="text-lg text-white/80 leading-relaxed mb-8 font-heading">
                            Un recorrido sistemático y riguroso a través de la Palabra de Dios, analizando cada capítulo para fortalecer el corazón y la mente.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Libros Grid */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex items-center gap-3 mb-12">
                    <Library size={28} className="text-sabiduria-gold" />
                    <h2 className="text-3xl font-serif font-bold text-sabiduria-navy">
                        Libros Disponibles
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.libros.map((libro, index) => (
                        <motion.article
                            key={libro.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                to={`/estudios-libros/${libro.slug}`}
                                className="group block bg-white border border-sabiduria-gray/10 hover:border-sabiduria-gold/30 transition-all duration-500 hover:shadow-2xl overflow-hidden"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={`${import.meta.env.BASE_URL}${libro.imagen}`}
                                        alt={libro.titulo}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-sabiduria-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Badge */}
                                    <div className="absolute top-4 left-4 bg-sabiduria-gold text-sabiduria-navy px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                        Nuevo Estudio
                                    </div>
                                </div>

                                <div className="p-8">
                                    <span className="text-sabiduria-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
                                        {libro.capitulos.length} Capítulos
                                    </span>
                                    <h3 className="text-2xl font-serif font-bold text-sabiduria-navy mb-4 group-hover:text-sabiduria-gold transition-colors">
                                        {libro.titulo}
                                    </h3>
                                    <p className="text-sabiduria-gray text-sm leading-relaxed mb-6 line-clamp-3">
                                        {libro.descripcion}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-sabiduria-gray/10">
                                        <span className="text-sabiduria-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                            Comenzar estudio
                                        </span>
                                        <ChevronRight size={18} className="text-sabiduria-gold transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}

                    {/* Placeholder for future books */}
                    <div className="border-2 border-dashed border-sabiduria-gray/20 flex flex-col items-center justify-center p-12 text-center opacity-50">
                        <div className="w-16 h-16 rounded-full bg-sabiduria-gray/5 flex items-center justify-center mb-6">
                            <GraduationCap size={32} className="text-sabiduria-gray/40" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-sabiduria-navy/60 mb-2">Próximos Estudios</h3>
                        <p className="text-sm text-sabiduria-gray/60">Efesios, Santiago, 1 Pedro y más por venir.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default EstudiosLibros;
