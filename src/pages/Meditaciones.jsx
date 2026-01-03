import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import content from '../data/content.json';

const Meditaciones = () => {
    // Obtener meditaciones del contenido
    const meditaciones = content.textos?.meditaciones || [];

    return (
        <main className="bg-sabiduria-bg min-h-screen py-8 md:py-16">
            <SEO
                title="Meditaciones"
                description="Pausas para el alma. Breves reflexiones que invitan al silencio y la oración."
                url="/meditaciones"
            />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />

                {/* Header - Centered, contemplative */}
                <div className="mb-16 text-center mt-8">
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-6">
                        Meditaciones
                    </h1>
                    <p className="text-xl text-sabiduria-gray max-w-2xl mx-auto leading-relaxed">
                        Pausas para el alma. Breves reflexiones que invitan al silencio,
                        la contemplación y la oración.
                    </p>
                </div>

                {/* Meditations List - Clean, spacious */}
                {meditaciones.length > 0 ? (
                    <div className="space-y-8">
                        {meditaciones.map((meditacion) => (
                            <article
                                key={meditacion.id}
                                className="group bg-white p-10 border border-sabiduria-gray/5 hover:border-sabiduria-gold/20 transition-all shadow-sm text-center"
                            >
                                <h2 className="text-2xl md:text-3xl font-serif text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors leading-tight mb-4">
                                    <Link to={`/meditacion/${meditacion.slug}`}>{meditacion.title}</Link>
                                </h2>

                                {meditacion.mainPassage && (
                                    <p className="text-sabiduria-gray italic mb-4 max-w-xl mx-auto">
                                        "{meditacion.mainPassage.substring(0, 100)}..."
                                    </p>
                                )}

                                {meditacion.passageReference && (
                                    <p className="text-sabiduria-gold text-sm font-semibold mb-6">
                                        {meditacion.passageReference}
                                    </p>
                                )}

                                <Link
                                    to={`/meditacion/${meditacion.slug}`}
                                    className="inline-flex items-center gap-2 text-sabiduria-navy font-bold text-sm uppercase tracking-widest group-hover:gap-3 transition-all"
                                >
                                    Meditar <ChevronRight size={16} />
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
                            Estamos preparando meditaciones para esta sección.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Meditaciones;
