import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, FileText } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import content from '../data/content.json';
import textos from '../data/textos.json';
import { ArticlesArraySchema, validateInDev } from '../data/schemas';

const Articles = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('Todos');
    const [articles, setArticles] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchArticles = () => {
            setLoading(true);
            try {
                // Cargar desde JSON local
                // textos.articulos primero (tiene prioridad por tener contenido completo);
                // data.articles agrega los que no tienen equivalente, evitando duplicados.
                const combined = [
                    ...(textos.articulos || []),
                    ...(content.articles || [])
                ];
                const seen = new Set();
                const articlesData = combined.filter(a => {
                    if (seen.has(a.slug)) return false;
                    seen.add(a.slug);
                    return true;
                });
                validateInDev(ArticlesArraySchema, articlesData, 'Articles');
                setArticles(articlesData);
            } catch {
                // no-op
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Las entregas de una serie no se listan sueltas: las representa la carátula de la serie.
    // Sí se muestran cuando el lector está buscando, para que el buscador no las esconda.
    const buscando = searchTerm.trim().length > 0;
    const coincide = (texto) => (texto || '').toLowerCase().includes(searchTerm.toLowerCase());

    const filteredArticles = articles.filter((article) => {
        if (article.serie && !buscando) return false;
        const matchesSearch = coincide(article.title) || coincide(article.excerpt);
        const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const series = (content.seriesArticulos || []).filter((serie) => {
        const matchesSearch = coincide(serie.titulo) || coincide(serie.descripcion);
        const matchesCategory = selectedCategory === 'Todos' || serie.categoria === selectedCategory;
        return serie.disponible && matchesSearch && matchesCategory;
    });

    const categories = ['Todos', ...new Set([
        ...articles.filter(a => !a.serie).map(a => a.category),
        ...(content.seriesArticulos || []).filter(s => s.disponible).map(s => s.categoria),
    ])];

    return (
        <main className="bg-sabiduria-bg min-h-screen py-8 md:py-16">
            <SEO
                title="Biblioteca de Artículos"
                description="Explora nuestra colección de ensayos teológicos, estudios exegéticos y reflexiones."
                url="/articulos"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />

                {/* Header */}
                <div className="mb-16 border-b border-sabiduria-gray/10 pb-12 mt-8">
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-8">
                        Biblioteca de Artículos
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Text - Left Side */}
                        <div className="text-lg text-sabiduria-gray leading-relaxed space-y-4 md:w-1/2 text-justify">
                            <p>
                                Explora nuestra colección de ensayos teológicos, estudios exegéticos y reflexiones sobre las verdades bíblicas.
                            </p>
                            <p>
                                Cada artículo ha sido preparado con el propósito de edificar, instruir y fortalecer la fe del creyente a través de un estudio profundo de la Palabra de Dios.
                            </p>
                        </div>
                        {/* Image - Right Side */}
                        <div className="md:w-1/2">
                            <img
                                src={`${import.meta.env.BASE_URL}pdf/Articulos.png`}
                                alt="Biblioteca de Artículos"
                                className="w-full h-auto object-cover shadow-md"
                            />
                        </div>
                    </div>
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
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sabiduria-gold"></div>
                    </div>
                ) : filteredArticles.length + series.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {/* Carátulas de serie: van primero y llevan al índice de la serie */}
                        {series.map((serie) => {
                            const disponibles = (serie.articulos || []).filter(a => a.disponible).length;
                            return (
                                <article key={serie.slug} className="group flex flex-col h-full bg-sabiduria-navy border border-sabiduria-navy hover:border-sabiduria-gold transition-all shadow-sm overflow-hidden">
                                    <Link to={`/articulos/serie/${serie.slug}`} className="block">
                                        <div className="relative h-44 bg-sabiduria-navy overflow-hidden">
                                            {/* La card es mucho más apaisada que la portada: si la serie
                                                trae `imagenCard`, se usa esa; si no, se recorta la portada. */}
                                            {(serie.imagenCard || serie.imagen) && (
                                                <img
                                                    src={`${import.meta.env.BASE_URL}${serie.imagenCard || serie.imagen}`}
                                                    alt={serie.titulo}
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                                                />
                                            )}
                                            <span className="absolute top-4 left-4 text-xs uppercase tracking-widest text-sabiduria-gold font-bold">
                                                Serie
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="flex flex-col flex-grow p-8">
                                        <h2 className="text-2xl font-serif text-white group-hover:text-sabiduria-gold transition-colors leading-tight mb-4">
                                            <Link to={`/articulos/serie/${serie.slug}`}>{serie.titulo}</Link>
                                        </h2>
                                        <p className="text-white/60 mb-8 flex-grow leading-relaxed line-clamp-5">
                                            {serie.descripcion}
                                        </p>
                                        <div className="pt-6 border-t border-white/15 flex justify-between items-center">
                                            <span className="text-sm font-medium text-white/50 italic">
                                                {disponibles} de {serie.totalArticulos} publicados
                                            </span>
                                            <Link
                                                to={`/articulos/serie/${serie.slug}`}
                                                className="text-sabiduria-gold font-bold text-sm uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all"
                                            >
                                                Ver serie <ChevronRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
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
                                        {article.pdf_url && (
                                            <a
                                                href={`${import.meta.env.BASE_URL}${article.pdf_url}`}
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
