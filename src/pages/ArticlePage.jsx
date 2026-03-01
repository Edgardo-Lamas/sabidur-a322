import React from 'react';
import { useParams } from 'react-router-dom';
import ReadingSection from '../components/ReadingSection';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import data from '../data/content.json';

const ArticlePage = () => {
    const { slug } = useParams();
    const [article, setArticle] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchArticle = () => {
            setLoading(true);
            try {
                // Buscar en JSON local
                // textos.articulos tiene prioridad; data.articles agrega los únicos.
                const articles = [
                    ...(data.textos?.articulos || []),
                    ...(data.articles || [])
                ];
                const foundArticle = articles.find(a => a.slug === slug);
                setArticle(foundArticle || null);
            } catch (err) {
                console.error('Error fetching article:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sabiduria-bg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sabiduria-gold"></div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sabiduria-bg">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-sabiduria-navy mb-4">Artículo no encontrado</h1>
                    <p className="text-sabiduria-gray mb-8">Lo sentimos, el recurso que buscas no está disponible.</p>
                    <button onClick={() => window.history.back()} className="text-sabiduria-gold font-bold uppercase tracking-widest hover:underline">
                        Volver atrás
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-white min-h-screen">
            <SEO
                title={article.title}
                description={article.excerpt}
                image={article.image}
                url={`/articulo/${article.slug}`}
                type="article"
            />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title={article.title} />
            </div>
            <ReadingSection article={article} />
        </main>
    );
};

export default ArticlePage;
