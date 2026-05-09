import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import jonasData from '../data/devocionales/jonas.json';

const ALL_SERIES = [
    {
        slug: 'jonas',
        nombre: 'El Libro de Jonás',
        descripcion: 'Un profeta, una ciudad enemiga y un Dios que no cabe en ningún molde. Ocho devocionales sobre la soberanía universal de Dios.',
        devocionales: jonasData,
        color: '#3B6EA5',
    },
];

const Devocionales = () => {
    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="Devocionales | Sabiduría para el Corazón"
                description="Devocionales diarios con fundamento bíblico, reflexión pastoral y aplicación práctica. Series temáticas basadas en libros de la Biblia."
                url="/devocionales"
            />

            {/* Hero */}
            <header className="bg-sabiduria-navy text-white">
                <div className="max-w-4xl mx-auto px-4 pt-8 pb-14 md:pb-16">
                    <Breadcrumbs title="Devocionales" />
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-sabiduria-gold/30 mb-5">
                            <BookOpen className="text-sabiduria-gold" size={20} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif text-white mb-3 leading-tight">
                            Devocionales
                        </h1>
                        <p className="text-white/55 max-w-lg mx-auto font-serif leading-relaxed">
                            Reflexiones breves con raíz bíblica sólida, una ilustración que abre la verdad y preguntas que interpelan el día a día.
                        </p>
                    </div>
                </div>
            </header>

            {/* Series */}
            <div className="max-w-2xl mx-auto px-4 py-10 space-y-10">
                {ALL_SERIES.map((serie) => (
                    <section key={serie.slug}>
                        {/* Cabecera de serie */}
                        <div className="flex items-center gap-3 mb-5">
                            <div
                                className="w-1 h-8 rounded-full"
                                style={{ background: serie.color }}
                            />
                            <div>
                                <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-sabiduria-navy">
                                    Serie
                                </h2>
                                <p className="font-serif text-xl text-sabiduria-navy font-bold leading-tight">
                                    {serie.nombre}
                                </p>
                            </div>
                        </div>
                        <p className="font-serif text-sabiduria-gray text-sm leading-relaxed mb-6 ml-4">
                            {serie.descripcion}
                        </p>

                        {/* Lista de devocionales */}
                        <div className="space-y-3">
                            {serie.devocionales.map((dev) => (
                                <Link
                                    key={dev.id}
                                    to={`/devocionales/${dev.id}`}
                                    className="group flex items-center gap-4 bg-white border border-sabiduria-gray/10 rounded-lg px-4 py-4 hover:border-sabiduria-gold/40 hover:shadow-sm transition-all"
                                >
                                    <span
                                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-heading font-bold text-sm shrink-0"
                                        style={{ background: serie.color }}
                                    >
                                        {dev.numero}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-heading text-sm font-bold text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors truncate">
                                            {dev.titulo}
                                        </p>
                                        <p className="font-serif text-xs text-sabiduria-gray mt-0.5">
                                            {dev.versiculo.referencia}
                                        </p>
                                    </div>
                                    <ArrowRight size={16} className="text-sabiduria-gray/40 group-hover:text-sabiduria-gold group-hover:translate-x-1 transition-all shrink-0" />
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
};

export default Devocionales;
