import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../data/content.json';

const ArticleFeed = () => {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-sm uppercase tracking-widest text-sabiduria-gold font-semibold mb-2">
                            Últimas Publicaciones
                        </h2>
                        <p className="text-3xl md:text-4xl font-serif text-sabiduria-navy">
                            Artículos y Recursos Recientes
                        </p>
                    </div>
                    <Link to="/articulos" className="hidden sm:flex items-center gap-2 text-sabiduria-navy font-semibold hover:text-sabiduria-gold transition-all">
                        Ver Todo <ChevronRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {content.articles.map((article) => (
                        <article key={article.id} className="group cursor-pointer">
                            <div className="border-b border-sabiduria-gray/10 pb-6 h-full flex flex-col">
                                <span className="text-xs uppercase tracking-tighter text-sabiduria-gray font-medium mb-3">
                                    {article.category} • {new Date(article.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                                <h3 className="text-xl md:text-2xl font-serif text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors leading-snug mb-4">
                                    <Link to={`/articulo/${article.slug}`}>{article.title}</Link>
                                </h3>
                                <p className="text-sabiduria-gray line-clamp-3 leading-relaxed mb-6 flex-grow">
                                    {article.excerpt}
                                </p>
                                <Link
                                    to={`/articulo/${article.slug}`}
                                    className="text-sabiduria-navy font-bold text-sm uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all"
                                >
                                    Leer Mas <ChevronRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ArticleFeed;
