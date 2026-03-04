import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from './SEO';
import Breadcrumbs from './Breadcrumbs';

/**
 * BiographyTemplate — Plantilla reutilizable para biografías históricas.
 *
 * Props:
 *   biography: {
 *     slug: string,
 *     name: string,
 *     epithet: string,          // ej. "La Estrella Matutina de la Reforma"
 *     dates: string,            // ej. "c. 1328 – 1384"
 *     portrait: string | null,  // ruta a imagen de retrato (opcional)
 *     sections: Array<{
 *       id: string,
 *       title: string,
 *       content: string,        // HTML string
 *       image: {                // opcional
 *         src: string,
 *         alt: string,
 *         caption: string,      // opcional
 *       } | null,
 *       imagePosition: 'right' | 'left' | 'full' | null,
 *     }>,
 *     quote: {                  // opcional
 *       text: string,
 *       source: string,
 *     } | null,
 *     timeline: Array<{
 *       year: string,
 *       event: string,
 *     }>,
 *   }
 *   seriesName: string   // ej. "Prerreformadores"
 *   seriesPath: string   // ej. "/prerreformadores"
 */
const BiographyTemplate = ({ biography, seriesName, seriesPath }) => {
    const {
        slug,
        name,
        epithet,
        dates,
        portrait,
        sections = [],
        quote,
        timeline = [],
    } = biography;

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title={`${name} | ${seriesName}`}
                description={epithet || name}
                url={`${seriesPath}/${slug}`}
                type="article"
            />

            {/* Hero */}
            <div className="bg-sabiduria-navy text-white">
                <div className="max-w-4xl mx-auto px-4 pt-8 pb-16 md:pb-20">
                    <Breadcrumbs title={name} />
                    <Link
                        to={seriesPath}
                        className="inline-flex items-center gap-2 text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mt-6 mb-10 hover:opacity-75 transition-opacity"
                    >
                        <ArrowLeft size={14} />
                        {seriesName}
                    </Link>

                    <div className="flex flex-col md:flex-row gap-10 items-start md:items-end">
                        <div className="flex-1">
                            <p className="text-sabiduria-gold/80 text-sm uppercase tracking-widest mb-4 font-medium">
                                {dates}
                            </p>
                            <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-4">
                                {name}
                            </h1>
                            {epithet && (
                                <p className="text-xl text-sabiduria-gold font-serif italic">
                                    "{epithet}"
                                </p>
                            )}
                        </div>

                        {portrait && (
                            <div className="w-36 h-36 md:w-44 md:h-44 flex-shrink-0">
                                <img
                                    src={portrait}
                                    alt={`Retrato de ${name}`}
                                    className="w-full h-full object-cover grayscale opacity-80 border border-sabiduria-gold/30"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">

                {/* Sections */}
                {sections.map((section) => (
                    <section key={section.id} className="mb-14">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-sabiduria-navy mb-6 pb-3 border-b-2 border-sabiduria-gold/30">
                            {section.title}
                        </h2>

                        {/* Image — float right */}
                        {section.image && section.imagePosition === 'right' && (
                            <div className="md:float-right md:ml-8 mb-6 md:w-72 clear-right">
                                <img
                                    src={section.image.src}
                                    alt={section.image.alt || section.title}
                                    className="w-full h-auto shadow-md"
                                />
                                {section.image.caption && (
                                    <p className="text-xs text-sabiduria-gray mt-2 text-center italic">
                                        {section.image.caption}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Image — float left */}
                        {section.image && section.imagePosition === 'left' && (
                            <div className="md:float-left md:mr-8 mb-6 md:w-72 clear-left">
                                <img
                                    src={section.image.src}
                                    alt={section.image.alt || section.title}
                                    className="w-full h-auto shadow-md"
                                />
                                {section.image.caption && (
                                    <p className="text-xs text-sabiduria-gray mt-2 text-center italic">
                                        {section.image.caption}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Text content */}
                        <div
                            className="teologia-content"
                            dangerouslySetInnerHTML={{ __html: section.content }}
                        />

                        {/* Image — full width below text */}
                        {section.image && section.imagePosition === 'full' && (
                            <div className="mt-8">
                                <img
                                    src={section.image.src}
                                    alt={section.image.alt || section.title}
                                    className="w-full h-auto shadow-md"
                                />
                                {section.image.caption && (
                                    <p className="text-sm text-sabiduria-gray mt-3 text-center italic">
                                        {section.image.caption}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="clear-both" />
                    </section>
                ))}

                {/* Quote callout */}
                {quote && (
                    <blockquote className="my-16 bg-sabiduria-navy text-white px-10 py-10 relative overflow-hidden">
                        <span className="absolute top-0 left-4 text-sabiduria-gold/15 font-serif text-[9rem] leading-none select-none pointer-events-none">
                            "
                        </span>
                        <p className="text-xl md:text-2xl font-serif italic leading-relaxed relative z-10 mb-5">
                            {quote.text}
                        </p>
                        <cite className="text-sabiduria-gold text-sm uppercase tracking-widest not-italic">
                            — {quote.source || name}
                        </cite>
                    </blockquote>
                )}

                {/* Timeline */}
                {timeline.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-sabiduria-navy mb-10 pb-3 border-b-2 border-sabiduria-gold/30">
                            Línea de Tiempo
                        </h2>

                        <div className="relative pl-8">
                            {/* Vertical line */}
                            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-sabiduria-gold/25" />

                            <ol className="space-y-8">
                                {timeline.map((item, index) => (
                                    <li key={index} className="relative">
                                        {/* Dot */}
                                        <div className="absolute -left-8 top-1.5 w-4 h-4 rounded-full bg-sabiduria-gold border-2 border-sabiduria-bg" />
                                        <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-widest block mb-1">
                                            {item.year}
                                        </span>
                                        <p className="text-sabiduria-gray leading-relaxed">
                                            {item.event}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>
                )}

                {/* Back link */}
                <div className="pt-8 border-t border-sabiduria-gray/10">
                    <Link
                        to={seriesPath}
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Volver a {seriesName}
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default BiographyTemplate;
