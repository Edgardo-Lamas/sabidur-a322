import { Link } from 'react-router-dom';
import { ChevronRight, Lock } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const chapters = [
    {
        num: 1,
        title: 'El Amor',
        subtitle: 'La Primera Perfección de Dios',
        description: '¿Qué significa que Dios sea amor? El amor eterno en la Trinidad, su manifestación en la cruz y su obra transformadora en el creyente.',
        slug: 'capitulo-1',
        disponible: true,
    },
    {
        num: 2,
        title: 'La Eternidad',
        subtitle: 'La Segunda Perfección de Dios',
        description: '¿Qué significa que Dios sea eterno? La eternidad como existencia sin origen ni fin, su revelación en la Escritura, su expresión en Cristo y su poder para transformar la ansiedad en confianza.',
        slug: 'capitulo-2',
        disponible: true,
    },
    {
        num: 3,
        title: 'La Santidad',
        subtitle: 'La Tercera Perfección de Dios',
        description: '¿Qué significa que Dios sea santo? La santidad como el atributo que tiñe a todos los demás, su revelación en la Escritura, su expresión perfecta en Cristo y su obra transformadora en el creyente.',
        slug: 'capitulo-3',
        disponible: true,
    },
    {
        num: 4,
        title: 'La Inmutabilidad',
        subtitle: 'La Cuarta Perfección de Dios',
        description: '¿Qué significa que Dios no cambie? La inmutabilidad como fundamento de la confianza, su revelación en la Escritura, su expresión en Cristo y su poder para anclar el alma en medio de la inestabilidad.',
        slug: 'capitulo-4',
        disponible: true,
    },
    { num: 5, disponible: false },
    { num: 6, disponible: false },
    { num: 7, disponible: false },
    { num: 8, disponible: false },
    { num: 9, disponible: false },
    { num: 10, disponible: false },
    { num: 11, disponible: false },
    { num: 12, disponible: false },
    { num: 13, disponible: false },
    { num: 14, disponible: false },
];

const PerfeccionesDeDios = () => {
    const disponibles = chapters.filter(c => c.disponible).length;

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="Las Perfecciones de Dios — Serie de Formación Teológica"
                description="Serie de 14 capítulos sobre los atributos divinos: el amor, la santidad, la justicia y las perfecciones de Dios reveladas en la Escritura."
                url="/estudio/perfecciones-de-dios"
            />
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title="Las Perfecciones de Dios" />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">

                {/* Header */}
                <header className="text-center mb-14 pb-10 border-b border-sabiduria-gray/20">
                    <span className="text-xs uppercase tracking-widest text-sabiduria-gold font-bold mb-4 block">
                        Serie de Formación Teológica
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-4">
                        Las Perfecciones de Dios
                    </h1>
                    <p className="text-sabiduria-gray text-lg max-w-2xl mx-auto leading-relaxed text-justify">
                        Conocer a Dios no es acumular información sobre Él. Es ser transformados por la revelación de Su carácter. Esta serie recorre las perfecciones divinas reveladas en la Escritura con el propósito de que ese conocimiento produzca semejanza a Cristo.
                    </p>
                    {/* Progreso */}
                    <div className="mt-8 inline-flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-48 h-1.5 bg-sabiduria-gray/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-sabiduria-gold rounded-full transition-all"
                                    style={{ width: `${(disponibles / 14) * 100}%` }}
                                />
                            </div>
                            <span className="text-sm text-sabiduria-gray">
                                {disponibles} de 14 capítulos disponibles
                            </span>
                        </div>
                    </div>
                </header>

                {/* Grid de capítulos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {chapters.map((chapter) =>
                        chapter.disponible ? (
                            <Link
                                key={chapter.num}
                                to={`/estudio/perfecciones-de-dios/${chapter.slug}`}
                                className="group bg-white border border-sabiduria-gray/10 hover:border-sabiduria-gold/40 shadow-sm hover:shadow-md transition-all p-7 flex flex-col"
                            >
                                <span className="text-xs uppercase tracking-widest text-sabiduria-gold font-bold mb-3">
                                    Capítulo {chapter.num}
                                </span>
                                <h2 className="text-xl font-serif text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors mb-1 leading-snug">
                                    {chapter.title}
                                </h2>
                                <p className="text-sm text-sabiduria-gray italic mb-4">
                                    {chapter.subtitle}
                                </p>
                                <p className="text-sabiduria-gray text-sm leading-relaxed flex-1 mb-5">
                                    {chapter.description}
                                </p>
                                <div className="flex items-center gap-1 text-sabiduria-navy font-bold text-sm uppercase tracking-widest group-hover:gap-2 transition-all">
                                    Leer capítulo <ChevronRight size={16} />
                                </div>
                            </Link>
                        ) : (
                            <div
                                key={chapter.num}
                                className="bg-white border border-sabiduria-gray/5 shadow-sm p-7 flex flex-col opacity-50"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs uppercase tracking-widest text-sabiduria-gray font-bold">
                                        Capítulo {chapter.num}
                                    </span>
                                    <Lock size={14} className="text-sabiduria-gray/50" />
                                </div>
                                <div className="flex-1 flex items-center justify-center py-4">
                                    <span className="text-sm text-sabiduria-gray italic">Próximamente</span>
                                </div>
                            </div>
                        )
                    )}
                </div>

                {/* Footer */}
                <div className="mt-14 pt-8 border-t border-sabiduria-gray/10">
                    <Link
                        to="/ensayos"
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        ← Volver a Ensayos
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default PerfeccionesDeDios;
