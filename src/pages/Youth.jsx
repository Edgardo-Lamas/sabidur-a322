import React from 'react';
import { Gamepad2, BookHeart, Sparkles, Zap } from 'lucide-react';
import BibliaFlow from '../components/BibliaFlow';
import SEO from '../components/SEO';

const Youth = () => {
    return (
        <>
            <SEO
                title="Sabiduría para la Juventud"
                description="Textos y desafíos bíblicos para crecer en la fe. Recursos pensados para jóvenes."
                keywords="juventud cristiana, jóvenes, fe, biblia, recursos juveniles, sabiduría"
            />

            <div className="min-h-screen bg-sabiduria-bg">
                {/* Hero Section */}
                <section
                    className="relative py-20 md:py-28 bg-cover bg-center"
                    style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/juventud-hero.jpg)` }}
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-sabiduria-navy/70"></div>

                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight tracking-tight">
                            Sabiduría para la <span className="text-sabiduria-gold">Juventud</span>
                        </h1>
                        <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed font-serif">
                            Textos y desafíos bíblicos para crecer en la fe
                        </p>
                    </div>
                </section>

                {/* Introductory Text Section */}
                <section className="py-12 md:py-16 bg-sabiduria-bg">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-lg md:text-xl text-sabiduria-navy/90 font-serif leading-relaxed">
                            Este espacio está pensado para adolescentes que desean leer, preguntar y crecer en la fe cristiana.
                            Aquí encontrarás desafíos y recursos que buscan ayudarte a pensar la Biblia con honestidad, profundidad y esperanza.
                        </p>
                    </div>
                </section>

                {/* Biblia Flow Game Section */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 bg-sabiduria-gold/10 text-sabiduria-gold px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider mb-4 border border-sabiduria-gold/20">
                                <Gamepad2 size={20} />
                                Juego Interactivo
                            </div>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-sabiduria-navy mb-4 tracking-tight">
                                Biblia Flow
                            </h2>
                            <p className="text-lg text-sabiduria-gray max-w-2xl mx-auto font-serif leading-relaxed">
                                Pon a prueba tu conocimiento bíblico y desbloquea fondos épicos para crear postales personalizadas.
                            </p>
                        </div>

                        {/* Game Component */}
                        <BibliaFlow />
                    </div>
                </section>

                {/* Coming Soon Sections */}
                <section className="py-16 bg-white border-t border-sabiduria-navy/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-sabiduria-navy text-center mb-12 tracking-tight">
                            Próximamente
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Devotionals */}
                            <div className="bg-white p-8 rounded-xl border border-sabiduria-gray/10 hover:border-sabiduria-gold/30 hover:shadow-lg transition-all">
                                <div className="inline-block p-3 bg-sabiduria-gold/10 rounded-lg mb-4 border border-sabiduria-gold/20">
                                    <BookHeart size={28} className="text-sabiduria-gold" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold text-sabiduria-navy mb-3">
                                    Devocionales Diarios
                                </h3>
                                <p className="text-sabiduria-gray leading-relaxed font-serif">
                                    Lecturas bíblicas y reflexiones diseñadas específicamente para adolescentes.
                                </p>
                            </div>

                            {/* Articles */}
                            <div className="bg-white p-8 rounded-xl border border-sabiduria-gray/10 hover:border-sabiduria-gold/30 hover:shadow-lg transition-all">
                                <div className="inline-block p-3 bg-sabiduria-gold/10 rounded-lg mb-4 border border-sabiduria-gold/20">
                                    <Zap size={28} className="text-sabiduria-gold" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold text-sabiduria-navy mb-3">
                                    Artículos para Jóvenes
                                </h3>
                                <p className="text-sabiduria-gray leading-relaxed font-serif">
                                    Contenido relevante sobre fe, vida cristiana y temas que te importan.
                                </p>
                            </div>

                            {/* Resources */}
                            <div className="bg-white p-8 rounded-xl border border-sabiduria-gray/10 hover:border-sabiduria-gold/30 hover:shadow-lg transition-all">
                                <div className="inline-block p-3 bg-sabiduria-gold/10 rounded-lg mb-4 border border-sabiduria-gold/20">
                                    <Sparkles size={28} className="text-sabiduria-gold" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold text-sabiduria-navy mb-3">
                                    Recursos Descargables
                                </h3>
                                <p className="text-sabiduria-gray leading-relaxed font-serif">
                                    Guías de estudio, wallpapers, y materiales para compartir con amigos.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-sabiduria-navy text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 tracking-tight">
                            ¿Tienes ideas para esta sección?
                        </h2>
                        <p className="text-lg text-white/80 mb-8 leading-relaxed font-serif">
                            Queremos crear contenido que realmente te ayude. Contáctanos y cuéntanos qué te gustaría ver aquí.
                        </p>
                        <a
                            href="mailto:contacto@sabiduria322.com"
                            className="inline-block bg-sabiduria-gold text-sabiduria-navy px-8 py-3 rounded-sm font-bold hover:bg-sabiduria-gold/90 transition-all"
                        >
                            Enviar Sugerencias
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Youth;
