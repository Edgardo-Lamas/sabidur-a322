import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Download, BookOpen, GraduationCap, Bookmark, Clock, ChevronRight } from 'lucide-react';
import content from '../data/content.json';

const SeccionBiblioteca = ({ id, icon: Icon, titulo, descripcion, children }) => (
    <section id={id} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
                <Icon size={28} className="text-sabiduria-gold" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-sabiduria-navy">
                    {titulo}
                </h2>
            </div>
            {descripcion && (
                <p className="text-sabiduria-gray leading-relaxed max-w-3xl mb-10">
                    {descripcion}
                </p>
            )}
            {children}
        </div>
    </section>
);

const PlaceholderVacio = ({ mensaje }) => (
    <div className="text-center py-12 text-sabiduria-gray border border-dashed border-sabiduria-gray/20 rounded-sm">
        <p className="text-sm italic">{mensaje || "Próximamente se añadirá contenido."}</p>
    </div>
);

/* ─── Card de serie — solo portada ─── */
const SerieCard = ({ serie, baseUrl }) => {
    const isColeccion = serie.esColeccion;
    const count = serie.disponible
        ? (isColeccion
            ? (content.biblioteca?.librosHebreos || []).filter(l => l.disponible).length
            : (serie.articulos || []).filter(a => a.disponible).length)
        : 0;

    return (
        <Link
            to={`/biblioteca/series/${serie.slug}`}
            className={`group block bg-white border rounded-sm overflow-hidden transition-shadow ${serie.disponible ? 'border-sabiduria-gray/15 hover:shadow-xl' : 'border-sabiduria-gray/10'}`}
        >
            {/* Imagen / portada */}
            <div className="relative aspect-video overflow-hidden bg-sabiduria-navy">
                {serie.imagen ? (
                    <img
                        src={`${baseUrl}${serie.imagen}`}
                        alt={serie.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sabiduria-navy to-sabiduria-navy/70">
                        <Clock size={44} className="text-sabiduria-gold/25" />
                    </div>
                )}
                {/* Badge */}
                <div className="absolute top-3 left-3">
                    {serie.disponible ? (
                        <span className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 bg-sabiduria-gold text-sabiduria-navy rounded-sm">
                            {count} {isColeccion ? 'disponibles' : count === 1 ? 'artículo' : 'artículos'}
                        </span>
                    ) : (
                        <span className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 bg-black/50 text-white/75 rounded-sm border border-white/10">
                            En preparación
                        </span>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="px-5 py-4">
                <p className="text-sabiduria-gold text-xs font-semibold uppercase tracking-widest">
                    {isColeccion ? 'Colección' : 'Serie'} · {serie.categoria}
                </p>
                <h3 className="text-sabiduria-navy text-lg font-serif font-bold leading-snug mt-1 mb-2">
                    {serie.titulo}
                </h3>
                <p className="text-sabiduria-gray text-sm leading-relaxed line-clamp-3">
                    {serie.descripcion}
                </p>
            </div>

            {/* CTA */}
            <div className="px-5 pb-4 pt-1 border-t border-sabiduria-gray/8">
                <span className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${serie.disponible ? 'text-sabiduria-navy group-hover:text-sabiduria-gold' : 'text-sabiduria-gray/40'}`}>
                    {serie.disponible ? (isColeccion ? 'Ver colección' : 'Ver serie') : 'Próximamente'}
                    {serie.disponible && <ChevronRight size={14} />}
                </span>
            </div>
        </Link>
    );
};

/* ─── Página ─── */
const Biblioteca = () => {
    const baseUrl = import.meta.env.BASE_URL;
    const seriesTeologicas = content.biblioteca?.series || [];
    const bibliotecaConsulta = content.biblioteca?.consulta || [];
    const cuadernoTeologico = content.biblioteca?.cuaderno || [];
    const ebooks = content.biblioteca?.ebooks || [];

    return (
        <div className="min-h-screen bg-sabiduria-bg">

            {/* Header */}
            <header className="relative py-16 md:py-24 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${baseUrl}img/biblioteca-hero.jpg)` }}
                />
                <div className="absolute inset-0 bg-sabiduria-bg/55" />
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-sabiduria-navy mb-6">
                        Biblioteca
                    </h1>
                    <p className="text-xl text-sabiduria-gold font-serif italic mb-8">
                        Lecturas para la fe cristiana
                    </p>
                    <p className="text-sabiduria-gray leading-relaxed max-w-2xl mx-auto">
                        Esta biblioteca reúne lecturas seleccionadas para acompañar la fe cristiana:
                        series de estudio, colecciones de libros sagrados y materiales para la reflexión bíblica.
                        Cada recurso ha sido elegido con cuidado, buscando claridad, profundidad y edificación.
                    </p>
                </div>
            </header>

            {/* ═══ Series y Colecciones ═══ */}
            <section id="series" className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <Clock size={28} className="text-sabiduria-gold" />
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-sabiduria-navy">
                            Series y Colecciones
                        </h2>
                    </div>
                    <div className="w-16 h-0.5 bg-sabiduria-gold mb-4 ml-10" />
                    <p className="text-sabiduria-gray leading-relaxed max-w-3xl mb-10 ml-10">
                        Colecciones y series de artículos que desarrollan un tema teológico o bíblico en profundidad. Cada serie tiene un marco hermenéutico definido y un recorrido estructurado para acompañar al lector de manera progresiva.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {seriesTeologicas.map(serie => (
                            <SerieCard key={serie.id} serie={serie} baseUrl={baseUrl} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Biblioteca de Consulta ═══ */}
            <div className="max-w-6xl mx-auto px-4"><hr className="border-sabiduria-gray/10" /></div>

            <section
                id="consulta"
                className="py-16 px-4 relative"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
                }}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen size={28} className="text-sabiduria-gold" />
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-sabiduria-navy">
                            Biblioteca de Consulta
                        </h2>
                    </div>
                    <p className="text-sabiduria-gray leading-relaxed max-w-3xl mb-10">
                        La Biblioteca de Consulta ofrece una selección curada de libros recomendados para el estudio serio de las Escrituras, la teología cristiana y la vida de fe.
                    </p>
                    {bibliotecaConsulta.length > 0 ? (
                        <div className="space-y-0">
                            {bibliotecaConsulta.map((seccion, idx) => (
                                <div key={seccion.id} className={`py-10 px-6 md:px-10 -mx-4 md:-mx-6 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F0E8]'}`}>
                                    <div className="flex items-center gap-4 mb-8 pl-4 border-l-[3px] border-sabiduria-gold">
                                        <h3 className="text-xl md:text-2xl font-serif text-sabiduria-navy">{seccion.categoria}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {seccion.libros.map((libro, i) => (
                                            <div key={i} className={`group border border-sabiduria-gray/10 rounded-sm p-5 hover:border-sabiduria-gold/30 transition-all duration-300 cursor-default ${idx % 2 === 0 ? 'bg-sabiduria-bg/30' : 'bg-white'}`}>
                                                <div className="flex items-start gap-3">
                                                    <Bookmark size={18} className="text-sabiduria-gold flex-shrink-0 mt-1" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sabiduria-navy leading-tight">{libro.titulo}</p>
                                                        <p className="text-sm text-sabiduria-gray/70 italic mt-1">{libro.autor}</p>
                                                    </div>
                                                </div>
                                                {libro.frase && (
                                                    <div className="mt-3 pt-3 border-t border-sabiduria-gray/10 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 ease-out">
                                                        <p className="text-sm text-sabiduria-gray leading-relaxed">{libro.frase}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="bg-white border-l-4 border-sabiduria-gold/50 p-6 mt-6">
                                <p className="text-sabiduria-gray text-sm leading-relaxed">
                                    <strong className="text-sabiduria-navy">Nota editorial:</strong> La Biblioteca de Consulta presenta una selección representativa de obras recomendadas.
                                </p>
                            </div>
                            <div className="text-center mt-16 mb-6">
                                <Link to="/biblioteca/consulta" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-sabiduria-gold/60 text-sabiduria-gold rounded-md hover:bg-[#F5F0E8] hover:border-sabiduria-gold transition-all duration-500 ease-out">
                                    <span className="text-lg">📚</span>
                                    <span className="font-serif text-lg tracking-wide">Ver la Biblioteca Completa</span>
                                </Link>
                            </div>
                        </div>
                    ) : <PlaceholderVacio />}
                </div>
            </section>

            {/* ═══ Cuaderno Teológico ═══ */}
            <div className="max-w-6xl mx-auto px-4"><hr className="border-sabiduria-gray/10" /></div>

            <SeccionBiblioteca
                id="cuaderno"
                icon={GraduationCap}
                titulo="Cuaderno Teológico de Estudio"
                descripcion="Algunos materiales de estudio se trabajan en un cuaderno teológico de consulta, preparado con fines educativos y formativos. Reúne notas, síntesis, comparaciones y estudios elaborados a partir de diversas fuentes."
            >
                {cuadernoTeologico.length > 0
                    ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" />
                    : <PlaceholderVacio />}
            </SeccionBiblioteca>

            {/* ═══ Ebooks ═══ */}
            <div className="max-w-6xl mx-auto px-4"><hr className="border-sabiduria-gray/10" /></div>

            <SeccionBiblioteca
                id="ebooks"
                icon={Book}
                titulo="Ebooks Disponibles para Descargar"
                descripcion="A continuación se ofrecen ebooks seleccionados para lectura y estudio personal. Todos los materiales están en dominio público, cuentan con autorización expresa o son producción propia de Sabiduría para el Corazón."
            >
                {ebooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ebooks.map(ebook => (
                            <article key={ebook.id} className="bg-white border border-sabiduria-gray/10 rounded-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                                <div className="aspect-[3/4] overflow-hidden bg-sabiduria-bg">
                                    <img src={`${baseUrl}${ebook.imagenUrl}`} alt={`Portada de ${ebook.titulo}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <span className="text-sabiduria-gold uppercase tracking-widest text-xs font-semibold">{ebook.categoria}</span>
                                    <h3 className="text-xl font-serif text-sabiduria-navy mt-2 mb-1 leading-tight">{ebook.titulo}</h3>
                                    {ebook.autor && <p className="text-sm text-sabiduria-gray/70 italic mb-4">{ebook.autor}</p>}
                                    <p className="text-sabiduria-gray text-sm leading-relaxed mb-6 line-clamp-4">{ebook.descripcion}</p>
                                    <a href={`${baseUrl}${ebook.pdfUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-sabiduria-navy text-white text-sm font-medium rounded-sm hover:bg-sabiduria-navy/90 transition-colors">
                                        <Download size={16} />
                                        Descargar PDF
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : <PlaceholderVacio />}
            </SeccionBiblioteca>

            {/* Nota final */}
            <section className="py-8 px-4 border-t border-sabiduria-gray/10">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sabiduria-gray text-sm italic">
                        Todos los materiales se ofrecen en formato PDF para lectura y descarga gratuita.
                        Esta biblioteca se irá ampliando de manera progresiva.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Biblioteca;
