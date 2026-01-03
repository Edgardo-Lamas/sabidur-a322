import React from 'react';
import { useParams } from 'react-router-dom';
import { ArticleTemplate, EssayTemplate, OutlineTemplate, MeditationTemplate } from '../components/TextTemplates';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import content from '../data/content.json';

/**
 * TextPage - Página dinámica que detecta el tipo de texto
 * y carga la plantilla correcta automáticamente
 */
const TextPage = ({ textType }) => {
    const { slug } = useParams();

    // Determinar qué colección usar según el tipo
    const getCollection = () => {
        switch (textType) {
            case 'articulo':
                return content.textos?.articulos || content.articles || [];
            case 'ensayo':
                return content.textos?.ensayos || [];
            case 'bosquejo':
                return content.textos?.bosquejos || [];
            case 'meditacion':
                return content.textos?.meditaciones || [];
            default:
                return [];
        }
    };

    const collection = getCollection();
    const text = collection.find((t) => t.slug === slug);

    if (!text) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sabiduria-bg">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-sabiduria-navy mb-4">
                        Texto no encontrado
                    </h1>
                    <p className="text-sabiduria-gray mb-8">
                        Lo sentimos, el recurso que buscas no está disponible.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="text-sabiduria-gold font-bold uppercase tracking-widest hover:underline"
                    >
                        Volver atrás
                    </button>
                </div>
            </div>
        );
    }

    // Seleccionar la plantilla correcta
    const renderTemplate = () => {
        switch (textType) {
            case 'articulo':
                return <ArticleTemplate text={text} />;
            case 'ensayo':
                return <EssayTemplate text={text} />;
            case 'bosquejo':
                return <OutlineTemplate text={text} />;
            case 'meditacion':
                return <MeditationTemplate text={text} />;
            default:
                return <ArticleTemplate text={text} />;
        }
    };

    // Generar título SEO según tipo
    const seoTitle = () => {
        const typeLabels = {
            articulo: 'Artículo',
            ensayo: 'Ensayo',
            bosquejo: 'Bosquejo',
            meditacion: 'Meditación'
        };
        return `${text.title} | ${typeLabels[textType] || 'Texto'}`;
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title={seoTitle()}
                description={text.excerpt || text.title}
                url={`/${textType}/${text.slug}`}
                type="article"
            />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title={text.title} />
            </div>
            {renderTemplate()}
        </main>
    );
};

export default TextPage;
