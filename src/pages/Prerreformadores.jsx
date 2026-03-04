import { Link } from 'react-router-dom';
import { ChevronRight, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

/**
 * Para agregar una nueva biografía:
 * 1. Agrega un objeto a este array con disponible: true
 * 2. Crea el archivo correspondiente en src/pages/prerreformadores/NombrePage.jsx
 * 3. Agrega la ruta en App.jsx
 */
const BIOGRAPHIES = [
    {
        slug: 'wycliffe',
        name: 'John Wycliffe',
        epithet: 'La Estrella Matutina de la Reforma',
        dates: 'c. 1328 – 1384',
        disponible: true,
        excerpt:
            'Teólogo inglés que desafió la autoridad papal, tradujo la Biblia al inglés y sentó las bases teológicas que encendieron la Reforma un siglo después.',
    },
    {
        slug: 'jan-hus',
        name: 'Jan Hus',
        epithet: 'El Mártir de Constanza',
        dates: '1369 – 1415',
        disponible: true,
        excerpt:
            'Reformador checo que murió en la hoguera por sus convicciones sobre la autoridad de las Escrituras por encima de la tradición eclesiástica.',
    },
    {
        slug: 'pedro-waldo',
        name: 'Pedro Waldo',
        epithet: 'El Mercader que Renunció a Todo',
        dates: 'c. 1140 – c. 1218',
        disponible: true,
        excerpt:
            'Fundador del movimiento valdense, predicó la pobreza apostólica y la centralidad de la Escritura, anticipando muchas ideas de la Reforma.',
    },
    {
        slug: 'savonarola',
        name: 'Girolamo Savonarola',
        epithet: 'El Profeta Incómodo de Florencia',
        dates: '1452 – 1498',
        disponible: true,
        excerpt:
            'Fraile dominico que predicó el arrepentimiento y la reforma de la Iglesia en la Florencia del Renacimiento, pagando con su vida su valentía profética.',
    },
    {
        slug: 'tyndale',
        name: 'William Tyndale',
        epithet: 'El Traductor que Pagó con su Vida',
        dates: 'c. 1494 – 1536',
        disponible: true,
        excerpt:
            'Traductor inglés de la Biblia que fue estrangulado y quemado por su determinación de poner la Palabra de Dios en el idioma del pueblo.',
    },
];

const Prerreformadores = () => {
    return (
        <main className="bg-sabiduria-bg min-h-screen py-8 md:py-16">
            <SEO
                title="Prerreformadores"
                description="Biografías de hombres que prepararon el camino antes de la Reforma Protestante. Sus vidas costaron un precio alto, pero su legado fue eterno."
                url="/prerreformadores"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />

                {/* Header */}
                <div className="mb-16 border-b border-sabiduria-gray/10 pb-12 mt-8">
                    <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                        Historia de la Iglesia
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-6">
                        Prerreformadores
                    </h1>
                    <p className="text-lg text-sabiduria-gray leading-relaxed max-w-2xl text-justify">
                        Antes de que Lutero clavara sus tesis en Wittenberg, hubo hombres que ya
                        cuestionaban las corrupciones de la Iglesia y anhelaban una reforma anclada
                        en las Escrituras. Sus voces fueron silenciadas, pero no olvidadas.
                        Su legado preparó el terreno para que la Reforma floreciera.
                    </p>
                </div>

                {/* Biographies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BIOGRAPHIES.map((person) => (
                        <article
                            key={person.slug}
                            className={`bg-white border shadow-sm flex flex-col transition-all ${
                                person.disponible
                                    ? 'border-sabiduria-gray/5 hover:border-sabiduria-gold/30 group'
                                    : 'border-sabiduria-gray/5 opacity-60'
                            }`}
                        >
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs uppercase tracking-widest text-sabiduria-gold font-bold">
                                        {person.dates}
                                    </span>
                                    {!person.disponible && (
                                        <span className="flex items-center gap-1 text-xs text-sabiduria-gray bg-sabiduria-bg px-2 py-1 flex-shrink-0">
                                            <Clock size={11} />
                                            Próximamente
                                        </span>
                                    )}
                                </div>

                                <h2
                                    className={`text-2xl font-serif font-bold text-sabiduria-navy mb-1 leading-tight ${
                                        person.disponible
                                            ? 'group-hover:text-sabiduria-gold transition-colors'
                                            : ''
                                    }`}
                                >
                                    {person.disponible ? (
                                        <Link to={`/prerreformadores/${person.slug}`}>
                                            {person.name}
                                        </Link>
                                    ) : (
                                        person.name
                                    )}
                                </h2>

                                <p className="text-sabiduria-gold text-sm italic font-serif mb-4">
                                    {person.epithet}
                                </p>

                                <p className="text-sabiduria-gray text-sm leading-relaxed flex-1 mb-6">
                                    {person.excerpt}
                                </p>

                                {person.disponible && (
                                    <Link
                                        to={`/prerreformadores/${person.slug}`}
                                        className="text-sabiduria-navy font-bold text-sm uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all mt-auto"
                                    >
                                        Leer Biografía <ChevronRight size={16} />
                                    </Link>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Prerreformadores;
