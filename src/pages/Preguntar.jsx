import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import content from '../data/content.json';

const Preguntar = () => {
    // Obtener contenidos de "Preguntar"
    const preguntas = content.textos?.preguntar || [];

    return (
        <main className="bg-sabiduria-bg min-h-screen py-8 md:py-16">
            <SEO
                title="Preguntar"
                description="Preguntas abiertas, provocativas y existenciales sobre la fe y la vida."
                url="/preguntar"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />

                {/* Header con imagen */}
                <div className="mb-16 border-b border-sabiduria-gray/10 pb-12 mt-8">
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-8">
                        Preguntar
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Text - Left Side */}
                        <div className="text-lg text-sabiduria-gray leading-relaxed space-y-4 md:w-1/2 text-justify">
                            <p>
                                Preguntas abiertas, provocativas y existenciales sobre la fe y la vida.
                            </p>
                            <p>
                                Un espacio para explorar las grandes interrogantes que nos desafían a pensar más profundamente sobre Dios, el hombre y el propósito de nuestra existencia.
                            </p>
                        </div>
                        {/* Image - Right Side */}
                        <div className="md:w-1/2">
                            <img
                                src={`${import.meta.env.BASE_URL}Preguntar/img_preguntar.png`}
                                alt="Preguntar - Sabiduría para el Corazón"
                                className="w-full h-auto object-cover shadow-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Content List */}
                {preguntas.length > 0 ? (
                    <div className="space-y-8">
                        {preguntas.map((item) => (
                            <article
                                key={item.id}
                                className="group bg-white p-10 border border-sabiduria-gray/5 hover:border-sabiduria-gold/20 transition-all shadow-sm"
                            >
                                <h2 className="text-2xl md:text-3xl font-serif text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors leading-tight mb-4">
                                    <Link to={`/preguntar/${item.slug}`}>{item.title}</Link>
                                </h2>

                                {item.excerpt && (
                                    <p className="text-sabiduria-gray mb-6 leading-relaxed max-w-3xl">
                                        {item.excerpt}
                                    </p>
                                )}

                                <Link
                                    to={`/preguntar/${item.slug}`}
                                    className="inline-flex items-center gap-2 text-sabiduria-navy font-bold text-sm uppercase tracking-widest group-hover:gap-3 transition-all"
                                >
                                    Leer <ChevronRight size={16} />
                                </Link>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white border border-sabiduria-gray/10 rounded-sm">
                        <p className="text-xl text-sabiduria-gray italic font-serif mb-4">
                            Próximamente
                        </p>
                        <p className="text-sabiduria-gray">
                            Estamos preparando contenido para esta sección.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Preguntar;
