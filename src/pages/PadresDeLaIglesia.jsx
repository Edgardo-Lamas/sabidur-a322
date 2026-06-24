import { Link } from 'react-router-dom';
import { ChevronRight, Clock, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const BIOGRAPHIES = [
    {
        slug: 'agustin',
        name: 'Agustín de Hipona',
        epithet: 'El Doctor de la Gracia',
        dates: '354 – 430',
        disponible: true,
        excerpt:
            'El teólogo más influyente de la Iglesia occidental. Su vida —desde la rebeldía juvenil hasta la conversión en el jardín de Milán— es inseparable de su teología de la gracia, el pecado y la predestinación.',
    },
    {
        slug: 'crisostomo',
        name: 'Juan Crisóstomo',
        epithet: 'La Boca de Oro',
        dates: 'c. 347 – 407',
        disponible: true,
        excerpt:
            'El más grande predicador de la Antigüedad cristiana. Sus homilías sobre Mateo, Juan y Pablo siguen siendo modelo de exégesis y elocuencia. Su fidelidad le costó el destierro y la vida.',
    },
    {
        slug: 'atanasio',
        name: 'Atanasio de Alejandría',
        epithet: 'El Campeón de la Trinidad',
        dates: 'c. 296 – 373',
        disponible: true,
        excerpt:
            'Defensor incansable de la plena divinidad de Cristo frente al arrianismo. Sufrió cinco destierros en cuarenta y cinco años de episcopado. Sin su tenacidad, el Credo de Nicea habría sido letra muerta.',
    },
    {
        slug: 'ireneo',
        name: 'Ireneo de Lyon',
        epithet: 'El Arquitecto de la Ortodoxia',
        dates: 'c. 130 – c. 202',
        disponible: true,
        excerpt:
            'Discípulo de Policarpo, que fue discípulo del apóstol Juan. Su obra Contra las Herejías es el primer gran tratado de teología sistemática cristiana y el primer muro levantado contra el gnosticismo.',
    },
    {
        slug: 'tertuliano',
        name: 'Tertuliano',
        epithet: 'El Padre del Latín Cristiano',
        dates: 'c. 155 – c. 220',
        disponible: true,
        excerpt:
            'Jurista convertido que forjó el vocabulario teológico latino que usamos hasta hoy: Trinitas, Persona, Substantia. Brillante, combativo, y finalmente tragado por el rigorismo que él mismo exacerbó.',
    },
];

const PadresDeLaIglesia = () => {
    return (
        <main className="bg-sabiduria-bg min-h-screen py-8 md:py-16">
            <SEO
                title="Padres de la Iglesia"
                description="Biografías de los grandes teólogos del período patrístico. Agustín, Crisóstomo, Atanasio, Ireneo y Tertuliano: los hombres que definieron la doctrina cristiana frente a las herejías."
                url="/padres-de-la-iglesia"
                image="img/padres-iglesia-og.jpg"
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
                        Padres de la Iglesia
                    </h1>
                    <p className="text-lg text-sabiduria-gray leading-relaxed max-w-2xl text-justify">
                        En los primeros siglos, cuando el cristianismo no tenía ejércitos ni palacios,
                        un grupo de hombres armados únicamente con las Escrituras y la inteligencia
                        que Dios les dio, definieron la fe frente a las herejías que amenazaban con
                        desfigurarla. Pagaron ese servicio con el destierro, la soledad y, en algunos
                        casos, la muerte. La doctrina que heredamos lleva sus huellas.
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
                                        <Link to={`/padres-de-la-iglesia/${person.slug}`}>
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
                                        to={`/padres-de-la-iglesia/${person.slug}`}
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

export default PadresDeLaIglesia;
