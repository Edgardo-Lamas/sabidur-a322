import React from 'react';
import { Book, Download, FileText, ExternalLink } from 'lucide-react';
import content from '../data/content.json';

const Biblioteca = () => {
    const baseUrl = import.meta.env.BASE_URL;

    // Documentos propios de Sabiduría para el Corazón
    const documentosPropios = content.biblioteca?.documentos || [];

    // Libros recomendados
    const librosRecomendados = content.biblioteca?.libros || [];

    return (
        <div className="min-h-screen bg-sabiduria-bg">
            {/* Header */}
            <header className="py-16 md:py-24 bg-gradient-to-b from-sabiduria-navy/5 to-transparent">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-sabiduria-navy mb-6">
                        Biblioteca
                    </h1>
                    <p className="text-xl text-sabiduria-gold font-serif italic mb-8">
                        Lecturas para la fe cristiana
                    </p>
                    <p className="text-sabiduria-gray leading-relaxed max-w-2xl mx-auto">
                        Esta biblioteca reúne lecturas seleccionadas para acompañar la fe cristiana:
                        documentos formativos, libros de estudio y materiales para la reflexión bíblica.
                        Cada recurso ha sido elegido con cuidado, buscando claridad, profundidad y edificación.
                    </p>
                </div>
            </header>

            {/* Sección: Documentos propios */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-10">
                        <FileText size={28} className="text-sabiduria-gold" />
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-sabiduria-navy">
                            Documentos de Sabiduría para el Corazón
                        </h2>
                    </div>

                    {documentosPropios.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {documentosPropios.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow border border-sabiduria-gray/10 overflow-hidden"
                                >
                                    {/* Portada */}
                                    <div className="aspect-[3/4] bg-sabiduria-navy/5 flex items-center justify-center">
                                        {doc.portada ? (
                                            <img
                                                src={`${baseUrl}${doc.portada}`}
                                                alt={doc.titulo}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <FileText size={64} className="text-sabiduria-navy/20" />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="p-6">
                                        <h3 className="font-serif font-bold text-sabiduria-navy text-lg mb-2">
                                            {doc.titulo}
                                        </h3>
                                        {doc.subtitulo && (
                                            <p className="text-sabiduria-gray text-sm mb-4">
                                                {doc.subtitulo}
                                            </p>
                                        )}
                                        <a
                                            href={`${baseUrl}${doc.pdfUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-sabiduria-navy text-white text-sm font-medium rounded-sm hover:bg-sabiduria-navy/90 transition-colors"
                                        >
                                            <Download size={16} />
                                            Leer / Descargar
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-sabiduria-gray">
                            <FileText size={48} className="mx-auto mb-4 opacity-30" />
                            <p>Próximamente se añadirán documentos.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Separador */}
            <div className="max-w-6xl mx-auto px-4">
                <hr className="border-sabiduria-gray/10" />
            </div>

            {/* Sección: Libros recomendados */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-10">
                        <Book size={28} className="text-sabiduria-gold" />
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-sabiduria-navy">
                            Libros Recomendados
                        </h2>
                    </div>
                    <p className="text-sabiduria-gray mb-10 max-w-2xl">
                        Recursos de dominio público o con permiso de distribución gratuita.
                        Lecturas clásicas y contemporáneas para el crecimiento espiritual.
                    </p>

                    {librosRecomendados.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {librosRecomendados.map((libro) => (
                                <div
                                    key={libro.id}
                                    className="group"
                                >
                                    {/* Portada del libro */}
                                    <div className="aspect-[2/3] bg-sabiduria-navy/5 rounded-sm overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow mb-4">
                                        {libro.portada ? (
                                            <img
                                                src={`${baseUrl}${libro.portada}`}
                                                alt={libro.titulo}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Book size={48} className="text-sabiduria-navy/20" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Título y descripción */}
                                    <h3 className="font-serif font-bold text-sabiduria-navy text-sm md:text-base mb-1 line-clamp-2">
                                        {libro.titulo}
                                    </h3>
                                    {libro.autor && (
                                        <p className="text-sabiduria-gold text-xs mb-2">
                                            {libro.autor}
                                        </p>
                                    )}
                                    {libro.descripcion && (
                                        <p className="text-sabiduria-gray text-xs leading-relaxed mb-3 line-clamp-2">
                                            {libro.descripcion}
                                        </p>
                                    )}

                                    {/* Botón descargar */}
                                    <a
                                        href={`${baseUrl}${libro.pdfUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sabiduria-navy text-xs font-medium hover:text-sabiduria-gold transition-colors"
                                    >
                                        <Download size={14} />
                                        Descargar PDF
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-sabiduria-gray">
                            <Book size={48} className="mx-auto mb-4 opacity-30" />
                            <p>Próximamente se añadirán libros recomendados.</p>
                        </div>
                    )}
                </div>
            </section>

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
