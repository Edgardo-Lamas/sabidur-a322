import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import content from '../data/content.json';

const Ensayos = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

    // Obtener ensayos del contenido
    const ensayos = content.textos?.ensayos || [];

    const filteredEnsayos = ensayos.filter((ensayo) =>
        ensayo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ensayo.excerpt && ensayo.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <main className="bg-sabiduria-bg min-h-screen py-8 md:py-16">
            <SEO
                title="Ensayos"
                description="Reflexiones teológicas y meditaciones sobre la fe cristiana."
                url="/ensayos"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />

                {/* Header con imagen */}
                <div className="mb-16 border-b border-sabiduria-gray/10 pb-12 mt-8">
                    <h1 className="text-4xl md:text-5xl font-serif text-sabiduria-navy mb-8">
                        Ensayos
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Text - Left Side */}
                        <div className="text-lg text-sabiduria-gray leading-relaxed space-y-4 md:w-1/2 text-justify">
                            <p>
                                Reflexiones pausadas sobre la fe, la vida cristiana y las tensiones que enfrentamos
                                al vivir en un mundo caído.
                            </p>
                            <p>
                                Textos que invitan a pensar, no a agotar. Cada ensayo busca profundizar en las verdades eternas de la Palabra de Dios.
                            </p>
                        </div>
                        {/* Image - Right Side */}
                        <div className="md:w-1/2">
                            <img
                                src={`${import.meta.env.BASE_URL}img/img_ensayo.png`}
                                alt="Ensayos - Sabiduría para el Corazón"
                                className="w-full h-auto object-cover shadow-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Search */}
                {ensayos.length > 0 && (
                    <div className="mb-12">
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Buscar ensayos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border border-sabiduria-gray/20 px-4 py-3 pl-12 focus:outline-none focus:border-sabiduria-gold rounded-sm"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sabiduria-gray" size={20} />
                        </div>
                    </div>
                )}

                {/* Essays Grid */}
                {filteredEnsayos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {filteredEnsayos.map((ensayo) => (
                            <article
                                key={ensayo.id}
                                className="group bg-white p-8 border border-sabiduria-gray/5 hover:border-sabiduria-gold/20 transition-all shadow-sm"
                            >
                                <h2 className="text-2xl font-serif text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors leading-tight mb-4">
                                    <Link to={`/ensayo/${ensayo.slug}`}>{ensayo.title}</Link>
                                </h2>
                                {ensayo.excerpt && (
                                    <p className="text-sabiduria-gray mb-6 leading-relaxed">
                                        {ensayo.excerpt}
                                    </p>
                                )}
                                <div className="flex justify-between items-center">
                                    {ensayo.author && (
                                        <span className="text-sm text-sabiduria-gray italic">
                                            {ensayo.author}
                                        </span>
                                    )}
                                    <Link
                                        to={`/ensayo/${ensayo.slug}`}
                                        className="text-sabiduria-navy font-bold text-sm uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all"
                                    >
                                        Leer <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : ensayos.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-sabiduria-gray/10 rounded-sm">
                        <p className="text-xl text-sabiduria-gray italic font-serif mb-4">
                            Próximamente
                        </p>
                        <p className="text-sabiduria-gray">
                            Estamos preparando ensayos para esta sección.
                        </p>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-sabiduria-gray italic font-serif">
                            No se encontraron ensayos que coincidan con tu búsqueda.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Ensayos;
