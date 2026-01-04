import React from 'react';
import { FileText, Download, Heart } from 'lucide-react';

const ReadingSection = ({ article }) => {
    if (!article) return null;

    return (
        <article className="bg-sabiduria-bg min-h-screen py-16 md:py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <header className="mb-12 text-center">
                    <span className="text-sabiduria-gold uppercase tracking-widest text-sm font-bold mb-4 block">
                        {article.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-sabiduria-navy leading-tight mb-6">
                        {article.title}
                    </h1>
                    <div className="text-sabiduria-gray text-lg italic">
                        Publicado el {new Date(article.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg max-w-[65ch] mx-auto text-sabiduria-navy leading-[1.8] font-sans">
                    {article.content ? (
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    ) : (
                        <>
                            <p className="mb-8 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-sabiduria-navy">
                                {article.excerpt}
                            </p>

                            {article.pdfUrl && (
                                <div className="mt-12 p-8 bg-white border border-sabiduria-gray/10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-sabiduria-bg flex items-center justify-center rounded-full text-sabiduria-gold">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-sabiduria-navy">Versión para Impresión</h3>
                                            <p className="text-sabiduria-gray text-sm">Descarga este artículo en formato PDF para lectura offline.</p>
                                        </div>
                                    </div>
                                    <a
                                        href={`${import.meta.env.BASE_URL}${article.pdfUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-gold flex items-center gap-2 whitespace-nowrap"
                                    >
                                        <Download size={18} /> Descargar PDF
                                    </a>
                                </div>
                            )}
                        </>
                    )}

                    <div className="mt-16 pt-8 border-t border-sabiduria-gray/10 flex flex-col items-center">
                        <h3 className="text-xl font-serif text-sabiduria-navy mb-4 text-center">
                            ¿Ha sido de edificación este recurso?
                        </h3>
                        <p className="text-sabiduria-gray text-center mb-8 max-w-md">
                            Su generosidad nos ayuda a seguir compartiendo la sana doctrina de forma gratuita con miles de personas.
                        </p>
                        <button className="btn-gold px-12 py-4 text-xl flex items-center gap-3">
                            <Heart size={20} /> Donar al Ministerio
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ReadingSection;
