import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Heart, ArrowLeft } from 'lucide-react';
import content from '../data/content.json';

/**
 * AuthorshipFooter - Sección de autoría estilo Ligonier
 */
const AuthorshipFooter = () => (
    <div className="authorship-footer">
        <p className="author-name">Preparado por Sabiduría para el Corazón</p>
        <p className="website-link">www.sabiduriaparaelcorazon.com</p>
    </div>
);

/**
 * RecommendedReadings - Sección de lecturas recomendadas estilo Ligonier
 */
const RecommendedReadings = ({ articles, baseRoute = '/articulo' }) => {
    if (!articles || articles.length === 0) return null;

    return (
        <div className="recommended-readings">
            <h3>Lecturas Recomendadas</h3>
            <div className="recommended-readings-grid">
                {articles.slice(0, 3).map((article, index) => (
                    <Link
                        key={index}
                        to={`${baseRoute}/${article.slug}`}
                        className="recommended-card"
                    >
                        <div className="recommended-card-content">
                            {article.category && (
                                <span className="recommended-card-category">
                                    {article.category}
                                </span>
                            )}
                            <h4 className="recommended-card-title">
                                {article.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

/**
 * Gets related articles based on same category or random from all articles
 */
const getRelatedArticles = (currentArticle) => {
    const allArticles = content.textos?.articulos || [];

    // Filter out current article and find same category
    const sameCategory = allArticles.filter(
        a => a.slug !== currentArticle.slug && a.category === currentArticle.category
    );

    // If we have enough from same category, use those
    if (sameCategory.length >= 3) {
        return sameCategory.slice(0, 3);
    }

    // Otherwise, add other articles to fill
    const otherArticles = allArticles.filter(
        a => a.slug !== currentArticle.slug && a.category !== currentArticle.category
    );

    return [...sameCategory, ...otherArticles].slice(0, 3);
};

const ReadingSection = ({ article }) => {
    if (!article) return null;

    // Get related articles automatically
    const relatedArticles = article.relatedArticles || getRelatedArticles(article);


    return (
        <article className="bg-sabiduria-bg min-h-screen">
            {/* Cover Image */}
            <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
                <img
                    src={`${import.meta.env.BASE_URL}img/portada-articulo.jpg`}
                    alt="Portada del artículo"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 65%' }}
                />
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        to="/articulos"
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Volver a Artículos
                    </Link>
                </div>

                {/* Header */}
                <header className="mb-12 text-center">
                    <span className="text-sabiduria-gold uppercase tracking-widest text-sm font-bold mb-4 block">
                        {article.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-sabiduria-navy leading-tight mb-6">
                        {article.title}
                    </h1>
                    <div className="text-sabiduria-gray text-lg italic">
                        Publicado el {new Date(article.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg max-w-[65ch] mx-auto text-sabiduria-navy leading-[1.8] font-sans text-justify">
                    {article.content ? (
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    ) : (
                        <>
                            <p className="mb-8 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-sabiduria-navy">
                                {article.excerpt}
                            </p>

                            {article.pdfUrl && (
                                <div className="mt-12 p-8 bg-white border border-sabiduria-gray/10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-sabiduria-bg flex items-center justify-center rounded-full text-sabiduria-gold">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-sabiduria-navy">Versión para Impresión</h3>
                                            <p className="text-sabiduria-gray text-sm">Descarga este artículo en formato PDF para lectura offline.</p>
                                        </div>
                                    </div>
                                    <a
                                        href={`${import.meta.env.BASE_URL}${article.pdfUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-gold flex items-center gap-2 whitespace-nowrap"
                                    >
                                        <Download size={18} /> Descargar PDF
                                    </a>
                                </div>
                            )}
                        </>
                    )}

                    <div className="mt-16 pt-8 border-t border-sabiduria-gray/10 flex flex-col items-center">
                        <h3 className="text-xl font-serif text-sabiduria-navy mb-4 text-center">
                            ¿Ha sido de edificación este recurso?
                        </h3>
                        <p className="text-sabiduria-gray text-center mb-8 max-w-md">
                            Su generosidad nos ayuda a seguir compartiendo la sana doctrina de forma gratuita con miles de personas.
                        </p>
                        <button className="btn-gold px-12 py-4 text-xl flex items-center gap-3">
                            <Heart size={20} /> Donar al Ministerio
                        </button>
                    </div>

                    {/* Recommended Readings - Ligonier Style */}
                    <RecommendedReadings articles={relatedArticles} />

                    {/* Authorship Footer - Ligonier Style */}
                    <AuthorshipFooter />

                    {/* Bottom Back Button */}
                    <div className="mt-12 pt-8 border-t border-sabiduria-gray/10">
                        <Link
                            to="/articulos"
                            className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Volver a Artículos
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ReadingSection;
