import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, Tablet } from 'lucide-react';
import { Link } from 'react-router-dom';

const EbooksSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="absolute -inset-4 bg-sabiduria-gold/10 rounded-full blur-3xl opacity-50" />
                        <img
                            src="/img/portada eBooks.png"
                            alt="Biblioteca de eBooks"
                            className="relative z-10 w-full h-auto drop-shadow-2xl rounded-sm transition-transform duration-500 hover:scale-[1.02]"
                        />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                            Biblioteca Digital
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-sabiduria-navy mb-8 leading-tight">
                            Lleva la sana doctrina a donde quiera que vayas
                        </h2>
                        <p className="text-sabiduria-gray text-lg mb-10 leading-relaxed">
                            Nuestra colección de E-books está diseñada para el estudio personal y profundo.
                            Contenido riguroso, gratuito y accesible en múltiples formatos digitales.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-sabiduria-bg rounded-sm text-sabiduria-gold">
                                    <Download size={20} />
                                </div>
                                <p className="text-sabiduria-navy font-medium">Descarga Directa Gratuita</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-sabiduria-bg rounded-sm text-sabiduria-gold">
                                    <Tablet size={20} />
                                </div>
                                <p className="text-sabiduria-navy font-medium">Formatos Kindle y PDF</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-sabiduria-bg rounded-sm text-sabiduria-gold">
                                    <BookOpen size={20} />
                                </div>
                                <p className="text-sabiduria-navy font-medium">Contenido Exegético</p>
                            </div>
                        </div>

                        <Link
                            to="/ebooks"
                            className="btn-navy flex items-center justify-center gap-2 py-4"
                        >
                            EXPLORAR BIBLIOTECA
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EbooksSection;
