import React from 'react';
import { useParams } from 'react-router-dom';
import ReadingSection from '../components/ReadingSection';
import content from '../data/content.json';

const ArticlePage = () => {
    const { slug } = useParams();
    const article = content.articles.find((a) => a.slug === slug);

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
        <main>
            <ReadingSection article={article} />
        </main>
    );
};

export default ArticlePage;
