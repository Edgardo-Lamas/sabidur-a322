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
        image: 'img/prerreformadores-og.jpg',
        excerpt:
            'Hombres que, antes de que Lutero clavara sus tesis en Wittenberg, ya cuestionaban las corrupciones de la Iglesia y anhelaban una reforma anclada en las Escrituras. Sus voces fueron silenciadas, pero no olvidadas.',
        names: 'Wycliffe · Jan Hus · Pedro Waldo · Savonarola · Tyndale',
    },
    {
        slug: 'reformadores',
        name: 'Reformadores',
        subtitle: 'El Siglo de la Reforma',
        dates: 'Siglo XVI',
        disponible: true,
        count: 5,
        image: 'img/reformadores-og.jpg',
        excerpt:
            'Los hombres que en el siglo XVI rompieron con Roma y dieron forma a las tradiciones protestantes que conocemos hoy. Lutero, Calvino, Zuinglio, Knox y sus contemporáneos.',
        names: 'Lutero · Calvino · Zuinglio · Knox · Bullinger',
    },
    {
        slug: 'padres-de-la-iglesia',
        name: 'Padres de la Iglesia',
        subtitle: 'Los primeros siglos',
        dates: 'Siglos II – V',
        disponible: true,
        count: 5,
        image: 'img/padres-iglesia-og.jpg',
        excerpt:
            'Los teólogos del período patrístico que definieron la doctrina cristiana frente a las herejías y cuyas obras siguen siendo fuente de estudio para la Iglesia universal.',
        names: 'Agustín · Crisóstomo · Atanasio · Ireneo · Tertuliano',
    },
];

const BASE = import.meta.env.BASE_URL;

const Biografias = () => {
    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="Biografías"
                description="Biografías de hombres y mujeres que moldearon la historia de la fe cristiana. Prerreformadores, Reformadores y Padres de la Iglesia."
                url="/biografias"
                image="img/biografias-og.jpg"
            />

            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <Breadcrumbs />
            </div>

            {/* Hero */}
            <header className="relative mt-4 py-20 md:py-28 overflow-hidden">
                <img
                    src={`${BASE}img/biografias-og.jpg`}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-b from-sabiduria-navy/70 via-sabiduria-navy/60 to-sabiduria-navy/85" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-5 block">
                        Historia de la Iglesia
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight drop-shadow-lg">
                        Biografías
                    </h1>
                    <p className="text-white/70 max-w-2xl mx-auto font-serif leading-relaxed drop-shadow">
                        La historia de la Iglesia se escribe en vidas. Hombres que enfrentaron
                        herejías, traiciones, hogueras e imperios, y cuya fidelidad a la Palabra
                        de Dios moldeó siglos de fe cristiana.
                    </p>
                </div>
            </header>

            {/* Series cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SERIES.map((serie) => (
                        <article
                            key={serie.slug}
                            className={`bg-white border shadow-sm flex flex-col transition-all overflow-hidden ${
                                serie.disponible
                                    ? 'border-sabiduria-gray/5 hover:border-sabiduria-gold/30 group'
                                    : 'border-sabiduria-gray/5 opacity-60'
                            }`}
                        >
                            {/* Imagen de la serie */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={`${BASE}${serie.image}`}
                                    alt={serie.name}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-sabiduria-navy/60 to-transparent" />
                                <span className="absolute bottom-3 left-4 text-sabiduria-gold text-xs font-bold uppercase tracking-widest">
                                    {serie.dates}
                                </span>
                            </div>

                            {/* Contenido */}
                            <div className="p-7 flex flex-col flex-1">
                                <h2
                                    className={`text-2xl font-serif font-bold text-sabiduria-navy mb-1 leading-tight ${
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
                                <p className="text-sabiduria-gray leading-relaxed mb-4 flex-1">
                                    {serie.excerpt}
                                </p>
                                <p className="text-sabiduria-navy/40 text-xs uppercase tracking-widest font-medium mb-5">
                                    {serie.names}
                                </p>

                                {serie.disponible ? (
                                    <Link
                                        to={`/${serie.slug}`}
                                        className="text-sabiduria-navy font-bold text-sm uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
                                    >
                                        Ver serie <ChevronRight size={16} />
                                    </Link>
                                ) : (
                                    <span className="flex items-center gap-1 text-xs text-sabiduria-gray bg-sabiduria-bg px-2 py-1 w-fit mt-auto">
                                        <Clock size={11} />
                                        Próximamente
                                    </span>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Biografias;
