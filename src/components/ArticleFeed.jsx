import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../data/content.json';

const ArticleFeed = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('Todos');

    // Define exact categories requested
    const categories = ['Todos', 'Exégesis', 'Bosquejos', 'Teología Sistemática', 'E-books / Recursos'];

    const filteredArticles = selectedCategory === 'Todos'
        ? content.articles
        : content.articles.filter(article => article.category === selectedCategory);

    return (
        <section className="py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-sabiduria-navy/10 pb-6">
                    <div className="max-w-2xl">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-sabiduria-gold mb-4 block">
                            Biblioteca de Recursos
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-sabiduria-navy leading-tight mb-6">
                            Reflexiones Teológicas
                        </h2>

                        {/* Dynamic Filters */}
                        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`text-sm md:text-base font-serif italic transition-colors relative ${selectedCategory === cat
                                            ? 'text-sabiduria-gold font-medium'
                                            : 'text-sabiduria-navy/60 hover:text-sabiduria-navy'
                                        }`}
                                >
                                    {cat}
                                    {selectedCategory === cat && (
                                        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-sabiduria-gold"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Link to="/articulos" className="hidden md:flex items-center gap-2 text-sabiduria-navy font-medium italic hover:text-sabiduria-gold transition-colors font-serif text-lg mb-2">
                        Ver todo el archivo <ChevronRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 min-h-[500px]">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.slice(0, 3).map((article, index) => (
                            <article key={article.id} className="group flex flex-col items-start animate-fade-in-up">
                                {/* Decorative line for first item or specific style could go here, but keeping it clean */}
                                <div className="w-full mb-6 overflow-hidden">
                                    {article.image ? (
                                        <img src={article.image} alt={article.title} className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                                    ) : (
                                        <div className="w-full h-px bg-sabiduria-navy/10 mb-8 md:hidden"></div>
                                    )}
                                </div>

                                <div className="flex flex-col h-full">
                                    <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-sabiduria-gray/80 mb-4 font-sans">
                                        <span className="font-bold text-sabiduria-gold">{article.category}</span>
                                        <span className="w-1 h-1 bg-sabiduria-gray/30 rounded-full"></span>
                                        <span>{new Date(article.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-serif text-sabiduria-navy leading-[1.15] mb-4 group-hover:text-sabiduria-gold transition-colors">
                                        <Link to={`/articulo/${article.slug}`}>
                                            {article.title}
                                        </Link>
                                    </h3>

                                    <p className="text-sabiduria-gray text-lg leading-relaxed font-serif mb-6 line-clamp-3 md:line-clamp-4 flex-grow">
                                        {article.excerpt}
                                    </p>

                                    <Link
                                        to={`/articulo/${article.slug}`}
                                        className="text-sabiduria-navy font-bold text-xs uppercase tracking-[0.2em] border-b border-sabiduria-gold/30 pb-1 hover:border-sabiduria-gold transition-all self-start"
                                    >
                                        Leer Artículo
                                    </Link>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-20 text-sabiduria-gray italic text-lg">
                            No hay artículos disponibles en esta categoría por el momento.
                        </div>
                    )}
                </div>

                <div className="mt-12 md:hidden flex justify-center">
                    <Link to="/articulos" className="btn-gold">
                        Ver todos los artículos
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ArticleFeed;
