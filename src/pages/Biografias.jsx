import { Link } from 'react-router-dom';
import { ChevronRight, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

/**
 * Para agregar una nueva serie:
 * 1. Agrega un objeto a SERIES con disponible: true
 * 2. Crea la landing correspondiente en src/pages/NombreSerie.jsx
 * 3. Crea las páginas individuales en src/pages/nombreSerie/
 * 4. Agrega las rutas en App.jsx
 */
const SERIES = [
    {
        slug: 'prerreformadores',
        name: 'Prerreformadores',
        subtitle: 'Antes de la Reforma',
        dates: 'Siglos XII – XVI',
        disponible: true,
        count: 5,
        excerpt:
            'Hombres que, antes de que Lutero clavara sus tesis en Wittenberg, ya cuestionaban las corrupciones de la Iglesia y anhelaban una reforma anclada en las Escrituras. Sus voces fueron silenciadas, pero no olvidadas.',
        names: 'Wycliffe · Jan Hus · Pedro Waldo · Savonarola · Tyndale',
    },
    {
        slug: 'reformadores',
        name: 'Reformadores',
        subtitle: 'El Siglo de la Reforma',
        dates: 'Siglo XVI',
        disponible: false,
        count: 0,
        excerpt:
            'Los hombres que en el siglo XVI rompieron con Roma y dieron forma a las tradiciones protestantes que conocemos hoy. Lutero, Calvino, Zuinglio, Knox y sus contemporáneos.',
        names: 'Lutero · Calvino · Zuinglio · Knox · Bullinger',
    },
    {
        slug: 'padres-de-la-iglesia',
        name: 'Padres de la Iglesia',
        subtitle: 'Los primeros siglos',
        dates: 'Siglos II – V',
        disponible: false,
        count: 0,
        excerpt:
            'Los teólogos del período patrístico que definieron la doctrina cristiana frente a las herejías y cuyas obras siguen siendo fuente de estudio para la Iglesia universal.',
        names: 'Agustín · Crisóstomo · Atanasio · Ireneo · Tertuliano',
    },
];

const Biografias = () => {
    return (
        <main className="bg-sabiduria-bg min-h-screen py-8 md:py-16">
            <SEO
                title="Biografías"
                description="Biografías de hombres y mujeres que moldearon la historia de la fe cristiana. Prerreformadores, Reformadores y Padres de la Iglesia."
                url="/biografias"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />

                {/* Header */}
                <div className="mb-16 border-b border-sabiduria-gray/10 pb-12 mt-8">
                    <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                        Historia de la Iglesia
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-6">
                        Biografías
                    </h1>
                    <p className="text-lg text-sabiduria-gray leading-relaxed max-w-2xl text-justify">
                        La historia de la Iglesia se escribe en vidas. Hombres que enfrentaron
                        herejías, traiciones, hogueras e imperios, y cuya fidelidad a la Palabra
                        de Dios moldeó siglos de fe cristiana. Estas son sus historias.
                    </p>
                </div>

                {/* Series */}
                <div className="space-y-6">
                    {SERIES.map((serie) => (
                        <article
                            key={serie.slug}
                            className={`bg-white border shadow-sm transition-all ${
                                serie.disponible
                                    ? 'border-sabiduria-gray/5 hover:border-sabiduria-gold/30 group'
                                    : 'border-sabiduria-gray/5 opacity-60'
                            }`}
                        >
                            <div className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row md:items-start gap-6">
                                    {/* Left: meta */}
                                    <div className="md:w-56 flex-shrink-0">
                                        <span className="text-xs uppercase tracking-widest text-sabiduria-gold font-bold block mb-1">
                                            {serie.dates}
                                        </span>
                                        {serie.disponible ? (
                                            <span className="text-xs text-sabiduria-gray bg-sabiduria-bg px-2 py-1 inline-block">
                                                {serie.count} {serie.count === 1 ? 'biografía' : 'biografías'} disponibles
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-xs text-sabiduria-gray bg-sabiduria-bg px-2 py-1 w-fit">
                                                <Clock size={11} />
                                                Próximamente
                                            </span>
                                        )}
                                    </div>

                                    {/* Right: content */}
                                    <div className="flex-1">
                                        <h2
                                            className={`text-2xl md:text-3xl font-serif font-bold text-sabiduria-navy mb-1 leading-tight ${
                                                serie.disponible
                                                    ? 'group-hover:text-sabiduria-gold transition-colors'
                                                    : ''
                                            }`}
                                        >
                                            {serie.disponible ? (
                                                <Link to={`/${serie.slug}`}>{serie.name}</Link>
                                            ) : (
                                                serie.name
                                            )}
                                        </h2>
                                        <p className="text-sabiduria-gold text-sm italic font-serif mb-4">
                                            {serie.subtitle}
                                        </p>
                                        <p className="text-sabiduria-gray leading-relaxed mb-4">
                                            {serie.excerpt}
                                        </p>
                                        <p className="text-sabiduria-navy/50 text-xs uppercase tracking-widest font-medium mb-6">
                                            {serie.names}
                                        </p>
                                        {serie.disponible && (
                                            <Link
                                                to={`/${serie.slug}`}
                                                className="text-sabiduria-navy font-bold text-sm uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all"
                                            >
                                                Ver serie <ChevronRight size={16} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Biografias;
