import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, FileText } from 'lucide-react';
import content from '../data/content.json';

const Articles = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('Todos');

    const filteredArticles = content.articles.filter((article) => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['Todos', ...new Set(content.articles.map(a => a.category))];

    return (
        <main className="bg-sabiduria-bg min-h-screen py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 border-b border-sabiduria-gray/10 pb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-6">
                        Biblioteca de Artículos
                    </h1>
                    <p className="text-xl text-sabiduria-gray max-w-3xl leading-relaxed">
                        Explora nuestra colección de ensayos teológicos, estudios exegéticos y reflexiones sobre la fe reformada.
                    </p>
                </div>

                {/* Filter/Search Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Buscar artículos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-sabiduria-gray/20 px-4 py-3 pl-12 focus:outline-none focus:border-sabiduria-gold rounded-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sabiduria-gray" size={20} />
                    </div>
                    <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`whitespace-nowrap px-4 py-2 text-sm font-medium border transition-colors ${selectedCategory === cat
                                    ? 'bg-sabiduria-gold text-white border-sabiduria-gold'
                                    : 'border-sabiduria-gray/10 hover:border-sabiduria-gold hover:text-sabiduria-gold'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Article Grid */}
                {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filteredArticles.map((article) => (
                            <article key={article.id} className="group flex flex-col h-full bg-white p-8 border border-sabiduria-gray/5 hover:border-sabiduria-gold/20 transition-all shadow-sm">
                                <span className="text-xs uppercase tracking-widest text-sabiduria-gold font-bold mb-4">
                                    {article.category}
                                </span>
                                <h2 className="text-2xl font-serif text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors leading-tight mb-4">
                                    <Link to={`/articulo/${article.slug}`}>{article.title}</Link>
                                </h2>
                                <p className="text-sabiduria-gray mb-8 flex-grow leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <div className="pt-6 border-t border-sabiduria-gray/10 flex justify-between items-center">
                                    <span className="text-sm font-medium text-sabiduria-gray italic">
                                        {new Date(article.date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                                    </span>
                                    <div className="flex items-center gap-4">
                                        {article.pdfUrl && (
                                            <a
                                                href={`${import.meta.env.BASE_URL}${article.pdfUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sabiduria-gray hover:text-sabiduria-gold transition-colors p-1"
                                                title="Descargar PDF"
                                            >
                                                <FileText size={20} />
                                            </a>
                                        )}
                                        <Link
                                            to={`/articulo/${article.slug}`}
                                            className="text-sabiduria-navy font-bold text-sm uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all"
                                        >
                                            Leer <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-sabiduria-gray italic text-serif">No se encontraron artículos que coincidan con tu búsqueda.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Articles;
