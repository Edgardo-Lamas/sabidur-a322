import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ArticleTemplate, EssayTemplate, OutlineTemplate } from '../components/TextTemplates';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import content from '../data/content.json';
import textos from '../data/textos.json';

/**
 * Configuración de cada tipo de texto
 */
const textTypeConfig = {
    articulo: {
        collection: () => [
            ...(textos.articulos || []),
            ...(content.articles || [])
        ],
        label: 'Artículo',
        backPath: '/articulos',
        backLabel: 'Volver a Artículos'
    },
    ensayo: {
        collection: () => textos.ensayos || [],
        label: 'Ensayo',
        backPath: '/ensayos',
        backLabel: 'Volver a Ensayos'
    },
    bosquejo: {
        collection: () => textos.bosquejos || [],
        label: 'Bosquejo',
        backPath: '/bosquejos',
        backLabel: 'Volver a Bosquejos'
    },

};

/**
 * TextPage - Página dinámica que detecta el tipo de texto
 * y carga la plantilla correcta automáticamente
 */
const TextPage = ({ textType }) => {
    const { slug } = useParams();

    // Obtener configuración del tipo
    const config = textTypeConfig[textType] || textTypeConfig.articulo;
    const collection = config.collection();
    const text = collection.find((t) => t.slug === slug);

    // Si el texto pertenece a una serie, el botón vuelve a la página de esa serie
    const serieMatch = text?.serie
        ? (content.biblioteca?.series || []).find(s => s.titulo === text.serie)
        : null;
    const backPath = serieMatch ? `/biblioteca/series/${serieMatch.slug}` : backPath;
    const backLabel = serieMatch ? `Volver a ${serieMatch.titulo}` : backLabel;

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
                    <Link
                        to={backPath}
                        className="inline-flex items-center gap-2 text-sabiduria-gold font-bold uppercase tracking-widest hover:underline"
                    >
                        <ArrowLeft size={16} />
                        {backLabel}
                    </Link>
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
            default:
                return <ArticleTemplate text={text} />;
        }
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title={`${text.title} | ${config.label}`}
                description={text.excerpt || text.title}
                url={`/${textType}/${text.slug}`}
                type="article"
            />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title={text.title} />
                <div className="mt-6 mb-2">
                    <Link
                        to={backPath}
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        <ArrowLeft size={18} />
                        {backLabel}
                    </Link>
                </div>
            </div>

            {renderTemplate()}

            {/* Botón de Volver */}
            <div className="max-w-3xl mx-auto px-4 pb-16">
                <div className="pt-8 border-t border-sabiduria-gray/10">
                    <Link
                        to={backPath}
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        <ArrowLeft size={18} />
                        {backLabel}
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default TextPage;
