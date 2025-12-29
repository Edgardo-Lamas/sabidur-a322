import React from 'react';
import { Gamepad2, BookHeart, Sparkles, Zap } from 'lucide-react';
import BibliaFlow from '../components/BibliaFlow';
import SEO from '../components/SEO';

const Youth = () => {
    return (
        <>
            <SEO
                title="Adolescentes - Biblia Flow"
                description="Espacio interactivo para adolescentes: juega trivia bíblica, crea postales personalizadas y descubre recursos diseñados para jóvenes."
                keywords="adolescentes cristianos, trivia bíblica, juegos bíblicos, jóvenes, recursos juveniles"
            />

            <div className="min-h-screen bg-sabiduria-bg">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 md:py-28 overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-block p-4 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
                            <Sparkles size={48} className="text-yellow-300" />
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
                            Espacio <span className="text-yellow-300">Adolescentes</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
                            Descubre la Palabra de Dios de forma interactiva. Juega, aprende y crea contenido épico.
                        </p>
                    </div>
                </section>

                {/* Biblia Flow Game Section */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-700 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider mb-4">
                                <Gamepad2 size={20} />
                                Juego Interactivo
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-sabiduria-navy mb-4">
                                Biblia Flow
                            </h2>
                            <p className="text-lg text-sabiduria-gray max-w-2xl mx-auto">
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
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-sabiduria-navy text-center mb-12">
                            Próximamente
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Devotionals */}
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-indigo-100 hover:shadow-xl transition-all">
                                <div className="inline-block p-3 bg-indigo-600 rounded-xl mb-4">
                                    <BookHeart size={32} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-sabiduria-navy mb-3">
                                    Devocionales Diarios
                                </h3>
                                <p className="text-sabiduria-gray leading-relaxed">
                                    Lecturas bíblicas y reflexiones diseñadas específicamente para adolescentes.
                                </p>
                            </div>

                            {/* Articles */}
                            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl border border-rose-100 hover:shadow-xl transition-all">
                                <div className="inline-block p-3 bg-rose-600 rounded-xl mb-4">
                                    <Zap size={32} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-sabiduria-navy mb-3">
                                    Artículos para Jóvenes
                                </h3>
                                <p className="text-sabiduria-gray leading-relaxed">
                                    Contenido relevante sobre fe, vida cristiana y temas que te importan.
                                </p>
                            </div>

                            {/* Resources */}
                            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border border-cyan-100 hover:shadow-xl transition-all">
                                <div className="inline-block p-3 bg-cyan-600 rounded-xl mb-4">
                                    <Sparkles size={32} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-sabiduria-navy mb-3">
                                    Recursos Descargables
                                </h3>
                                <p className="text-sabiduria-gray leading-relaxed">
                                    Guías de estudio, wallpapers, y materiales para compartir con amigos.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            ¿Tienes ideas para esta sección?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Queremos crear contenido que realmente te ayude. Contáctanos y cuéntanos qué te gustaría ver aquí.
                        </p>
                        <a
                            href="mailto:contacto@sabiduria322.com"
                            className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all shadow-2xl"
                        >
                            ENVIAR SUGERENCIAS
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Youth;
