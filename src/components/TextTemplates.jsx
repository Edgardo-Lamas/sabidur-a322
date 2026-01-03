import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp, Book } from 'lucide-react';

/**
 * ArticleTemplate - Formal, jerárquico, con citas destacadas
 * Mostrar: fecha, referencias bíblicas como sección clara
 */
export const ArticleTemplate = ({ text }) => {
    const { title, author, date, content, biblicalReferences, pdfUrl } = text;

    return (
        <article className="text-article max-w-3xl mx-auto px-4 py-12">
            {/* Header */}
            <header className="mb-10">
                <h1>{title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-sabiduria-gray">
                    {author && <span>Por {author}</span>}
                    {date && (
                        <span className="italic">
                            {new Date(date).toLocaleDateString('es-ES', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                    )}
                </div>
            </header>

            {/* Content */}
            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Biblical References Section */}
            {biblicalReferences && biblicalReferences.length > 0 && (
                <div className="biblical-references mt-12">
                    <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
                        <Book size={18} />
                        Referencias Bíblicas
                    </h3>
                    <ul className="space-y-2">
                        {biblicalReferences.map((ref, index) => (
                            <li key={index} className="text-sabiduria-gray">
                                {ref}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* PDF Download - Discrete */}
            {pdfUrl && (
                <div className="mt-12 pt-8 border-t border-border-light">
                    <a
                        href={`${import.meta.env.BASE_URL}${pdfUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pdf-discrete"
                    >
                        <Download size={16} />
                        Descargar PDF
                    </a>
                </div>
            )}
        </article>
    );
};

/**
 * EssayTemplate - Fluido, reflexivo, párrafos largos
 * Mostrar: fecha opcional, referencias integradas o colapsables
 */
export const EssayTemplate = ({ text }) => {
    const { title, author, date, content, biblicalReferences, pdfUrl } = text;
    const [refsExpanded, setRefsExpanded] = useState(false);

    return (
        <article className="text-essay max-w-3xl mx-auto px-4 py-16">
            {/* Header - Centrado */}
            <header className="mb-12 text-center">
                <h1>{title}</h1>
                <div className="text-sm text-sabiduria-gray opacity-80">
                    {author && <span>{author}</span>}
                    {author && date && <span className="mx-2">·</span>}
                    {date && (
                        <span className="italic">
                            {new Date(date).toLocaleDateString('es-ES', {
                                month: 'long',
                                year: 'numeric'
                            })}
                        </span>
                    )}
                </div>
            </header>

            {/* Content */}
            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Biblical References - Collapsible */}
            {biblicalReferences && biblicalReferences.length > 0 && (
                <div className="mt-12">
                    <button
                        onClick={() => setRefsExpanded(!refsExpanded)}
                        className="flex items-center gap-2 text-sm text-sabiduria-gray hover:text-sabiduria-navy transition-colors"
                    >
                        {refsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        Textos bíblicos citados
                    </button>
                    {refsExpanded && (
                        <div className="mt-4 pl-4 border-l-2 border-border-light text-sm text-sabiduria-gray">
                            {biblicalReferences.join(' • ')}
                        </div>
                    )}
                </div>
            )}

            {/* PDF Download - Discrete */}
            {pdfUrl && (
                <div className="mt-8 text-center">
                    <a
                        href={`${import.meta.env.BASE_URL}${pdfUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pdf-discrete"
                    >
                        <Download size={16} />
                        Descargar PDF
                    </a>
                </div>
            )}
        </article>
    );
};

/**
 * OutlineTemplate - Esquemático, funcional, imprimible
 * Sin fecha, estructura clara con puntos numerados
 */
export const OutlineTemplate = ({ text }) => {
    const { title, author, biblicalPassage, content, points, pdfUrl } = text;

    return (
        <article className="text-outline max-w-3xl mx-auto px-4 py-12">
            {/* Header */}
            <header className="mb-8">
                <h1>{title}</h1>
                {biblicalPassage && (
                    <span className="biblical-passage">{biblicalPassage}</span>
                )}
                {author && (
                    <p className="text-sm text-sabiduria-gray mt-2">Por {author}</p>
                )}
            </header>

            {/* Points Structure */}
            {points && points.length > 0 ? (
                <div className="space-y-6">
                    {points.map((point, index) => (
                        <div key={index}>
                            <p className="main-point">
                                {toRoman(index + 1)}. {point.title}
                            </p>
                            {point.subpoints && (
                                <ul className="list-none">
                                    {point.subpoints.map((sub, subIndex) => (
                                        <li key={subIndex} className="sub-point">
                                            {String.fromCharCode(65 + subIndex)}. {sub}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            )}

            {/* PDF Download - Discrete */}
            {pdfUrl && (
                <div className="mt-12 pt-8 border-t border-border-light">
                    <a
                        href={`${import.meta.env.BASE_URL}${pdfUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pdf-discrete"
                    >
                        <Download size={16} />
                        Descargar PDF
                    </a>
                </div>
            )}
        </article>
    );
};

/**
 * MeditationTemplate - Contemplativo, centrado, espaciado amplio
 * Sin fecha, pasaje bíblico destacado
 */
export const MeditationTemplate = ({ text }) => {
    const { title, author, mainPassage, passageReference, content, pdfUrl } = text;

    return (
        <article className="text-meditation max-w-3xl mx-auto px-4 py-20">
            {/* Header */}
            <header className="mb-12">
                <h1>{title}</h1>
                {author && (
                    <p className="text-sm text-sabiduria-gray opacity-70">{author}</p>
                )}
            </header>

            {/* Main Passage - Destacado */}
            {mainPassage && (
                <div className="main-passage">
                    <p>"{mainPassage}"</p>
                    {passageReference && (
                        <p className="passage-reference">— {passageReference}</p>
                    )}
                </div>
            )}

            {/* Content */}
            <div
                className="mt-12"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* PDF Download - Discrete */}
            {pdfUrl && (
                <div className="mt-16">
                    <a
                        href={`${import.meta.env.BASE_URL}${pdfUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pdf-discrete"
                    >
                        <Download size={16} />
                        Descargar PDF
                    </a>
                </div>
            )}
        </article>
    );
};

// Helper: Convert number to Roman numeral
function toRoman(num) {
    const romanNumerals = [
        ['X', 10],
        ['IX', 9],
        ['V', 5],
        ['IV', 4],
        ['I', 1]
    ];
    let result = '';
    for (const [roman, value] of romanNumerals) {
        while (num >= value) {
            result += roman;
            num -= value;
        }
    }
    return result;
}

export default {
    ArticleTemplate,
    EssayTemplate,
    OutlineTemplate,
    MeditationTemplate
};
