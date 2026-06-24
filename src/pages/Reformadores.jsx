import { Link } from 'react-router-dom';
import { ChevronRight, Clock, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

/**
 * Para agregar una nueva biografía:
 * 1. Agrega un objeto a este array con disponible: true
 * 2. Crea el archivo correspondiente en src/pages/reformadores/NombrePage.jsx
 * 3. Agrega la ruta en App.jsx
 */
const BIOGRAPHIES = [
    {
        slug: 'lutero',
        name: 'Martín Lutero',
        epithet: 'El Monje que Sacudió al Mundo',
        dates: '1483 – 1546',
        disponible: true,
        excerpt:
            'El ex monje agustino que clavó sus 95 Tesis en Wittenberg, desafió al papa ante un emperador y tradujo la Biblia al alemán, dando inicio a la Reforma Protestante.',
    },
    {
        slug: 'calvino',
        name: 'Juan Calvino',
        epithet: 'El Teólogo de la Soberanía de Dios',
        dates: '1509 – 1564',
        disponible: true,
        excerpt:
            'Reformador francés radicado en Ginebra, cuya Institución de la Religión Cristiana se convirtió en la obra teológica más influyente de la Reforma.',
    },
    {
        slug: 'zuinglio',
        name: 'Ulrico Zuinglio',
        epithet: 'El Reformador de Zúrich',
        dates: '1484 – 1531',
        disponible: true,
        excerpt:
            'Primer reformador de la Suiza alemana, que llevó la Reforma a Zúrich y murió en el campo de batalla defendiendo la fe que había proclamado.',
    },
    {
        slug: 'knox',
        name: 'John Knox',
        epithet: 'El León de la Reforma Escocesa',
        dates: 'c. 1514 – 1572',
        disponible: true,
        excerpt:
            'Reformador escocés que pasó de ser galeote en las galeras francesas a transformar Escocia entera, fundando la Iglesia Presbiteriana.',
    },
    {
        slug: 'bullinger',
        name: 'Heinrich Bullinger',
        epithet: 'El Sucesor Fiel de Zuinglio',
        dates: '1504 – 1575',
        disponible: true,
        excerpt:
            'Sucesor de Zuinglio en Zúrich y uno de los teólogos reformados más prolíficos del siglo XVI, cuya influencia se extendió por toda Europa.',
    },
];

const Reformadores = () => {
    return (
        <main className="bg-sabiduria-bg min-h-screen py-8 md:py-16">
            <SEO
                title="Reformadores"
                description="Biografías de los hombres que en el siglo XVI dieron forma a la Reforma Protestante. Lutero, Calvino, Zuinglio, Knox y sus contemporáneos."
                url="/reformadores"
                image="img/reformadores-og.jpg"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />

                {/* Header */}
                <div className="mb-16 border-b border-sabiduria-gray/10 pb-12 mt-8">
                    <Link
                        to="/biografias"
                        className="inline-flex items-center gap-2 text-sabiduria-navy/60 hover:text-sabiduria-navy text-sm font-medium transition-colors mb-6"
                    >
                        <ArrowLeft size={14} />
                        Biografías
                    </Link>
                    <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                        Historia de la Iglesia
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-6">
                        Reformadores
                    </h1>
                    <p className="text-lg text-sabiduria-gray leading-relaxed max-w-2xl text-justify">
                        En el siglo XVI, un puñado de hombres se negó a callar. Frente a papas,
                        emperadores y concilios, sostuvieron que la autoridad final era la Escritura
                        y que la salvación era por gracia mediante la fe. Lo pagaron con el exilio,
                        la cárcel y, en algunos casos, con la vida. Su valentía cambió el mundo.
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
                                        <Link to={`/reformadores/${person.slug}`}>
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
                                        to={`/reformadores/${person.slug}`}
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

export default Reformadores;
