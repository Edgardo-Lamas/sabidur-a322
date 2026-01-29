import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, BookOpen, Play, List, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ShareButtons from '../components/ShareButtons';
import NewsletterForm from '../components/NewsletterForm';
import content from '../data/content.json';

/**
 * EstudioPage - Página dinámica para estudios con video de YouTube
 * Optimizada para SEO con contenido escrito como eje principal
 * Incluye: Schema Markup, TOC, Timestamps, Estudios Relacionados
 */
const EstudioPage = () => {
    const { slug } = useParams();
    const estudios = content.estudios || [];
    const estudio = estudios.find((e) => e.slug === slug);

    if (!estudio) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sabiduria-bg">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-sabiduria-navy mb-4">
                        Estudio no encontrado
                    </h1>
                    <p className="text-sabiduria-gray mb-8">
                        Lo sentimos, el estudio que buscas no está disponible.
                    </p>
                    <Link
                        to="/biblioteca"
                        className="inline-flex items-center gap-2 text-sabiduria-gold font-bold uppercase tracking-widest hover:underline"
                    >
                        <ArrowLeft size={16} />
                        Ir a la Biblioteca
                    </Link>
                </div>
            </div>
        );
    }

    // Generar URLs y datos para SEO
    const siteUrl = 'https://edgardo-lamas.github.io/sabidur-a322';
    const pageUrl = `${siteUrl}/estudio/${estudio.slug}`;
    const ogImage = `https://img.youtube.com/vi/${estudio.youtubeId}/maxresdefault.jpg`;
    const videoUrl = `https://www.youtube.com/watch?v=${estudio.youtubeId}`;

    // Obtener estudios relacionados
    const estudiosRelacionados = (estudio.estudiosRelacionados || [])
        .map(slug => estudios.find(e => e.slug === slug))
        .filter(Boolean);

    // Schema.org JSON-LD
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": estudio.title,
        "description": estudio.metaDescription,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": estudio.author || "Sabiduría para el Corazón"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Sabiduría para el Corazón",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/img/logo.png`
            }
        },
        "datePublished": estudio.date || new Date().toISOString().split('T')[0],
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
        }
    };

    const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": estudio.title,
        "description": estudio.metaDescription,
        "thumbnailUrl": ogImage,
        "uploadDate": estudio.date || new Date().toISOString().split('T')[0],
        "duration": estudio.videoDuration || "PT10M",
        "contentUrl": videoUrl,
        "embedUrl": `https://www.youtube.com/embed/${estudio.youtubeId}`,
        "publisher": {
            "@type": "Organization",
            "name": "Sabiduría para el Corazón"
        }
    };

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title={estudio.title}
                description={estudio.metaDescription}
                image={ogImage}
                url={`/estudio/${estudio.slug}`}
                type="article"
            />

            {/* Schema.org JSON-LD */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(videoSchema)}
                </script>
            </Helmet>

            {/* Breadcrumbs */}
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs title={estudio.title} />
            </div>

            {/* Header */}
            <header className="max-w-4xl mx-auto px-4 pt-8 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block text-sabiduria-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                        Estudio Bíblico
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-sabiduria-navy leading-tight mb-6">
                        {estudio.title}
                    </h1>
                    {(estudio.author || estudio.date) && (
                        <p className="text-sabiduria-gray text-sm mb-6">
                            {estudio.author && <span>{estudio.author}</span>}
                            {estudio.author && estudio.date && <span className="mx-2">•</span>}
                            {estudio.date && <span>{new Date(estudio.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                        </p>
                    )}
                    <ShareButtons
                        title={estudio.title}
                        url={`/estudio/${estudio.slug}`}
                    />
                </motion.div>
            </header>

            {/* Contenido Principal */}
            <article className="max-w-4xl mx-auto px-4">

                {/* Tabla de Contenidos (TOC) */}
                {estudio.sections && estudio.sections.length > 0 && (
                    <motion.nav
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="bg-sabiduria-navy/5 border border-sabiduria-navy/10 rounded-sm p-6 mb-12"
                        aria-label="Tabla de contenidos"
                    >
                        <h2 className="text-lg font-serif font-bold text-sabiduria-navy mb-4 flex items-center gap-2">
                            <List size={18} className="text-sabiduria-gold" />
                            En este estudio
                        </h2>
                        <ul className="space-y-2">
                            {estudio.sections.map((section, index) => (
                                <li key={section.id || index}>
                                    <a
                                        href={`#${section.id || `seccion-${index}`}`}
                                        className="text-sabiduria-navy/70 hover:text-sabiduria-gold transition-colors text-sm flex items-center gap-2"
                                    >
                                        <span className="w-5 h-5 flex items-center justify-center bg-sabiduria-gold/10 text-sabiduria-gold text-xs font-bold rounded-full">
                                            {index + 1}
                                        </span>
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>
                )}

                {/* Introducción */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="prose prose-lg max-w-none mb-12"
                >
                    <div
                        className="text-sabiduria-navy/80 leading-relaxed text-lg text-justify"
                        dangerouslySetInnerHTML={{ __html: estudio.introText }}
                    />
                </motion.section>

                {/* Video de YouTube */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="relative bg-sabiduria-navy/5 rounded-sm overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-sabiduria-navy/10">
                            <Play size={16} className="text-sabiduria-gold" />
                            <span className="text-sm font-medium text-sabiduria-navy/70">
                                Video del Estudio
                            </span>
                        </div>
                        <div className="relative w-full aspect-video">
                            <iframe
                                src={`https://www.youtube.com/embed/${estudio.youtubeId}`}
                                title={estudio.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                    </div>
                </motion.section>

                {/* Timestamps (opcional) */}
                {estudio.timestamps && estudio.timestamps.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="mb-16"
                    >
                        <div className="bg-sabiduria-gold/5 border border-sabiduria-gold/20 rounded-sm p-4">
                            <h3 className="text-sm font-bold text-sabiduria-navy mb-3 flex items-center gap-2">
                                <Clock size={16} className="text-sabiduria-gold" />
                                Contenido del video
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {estudio.timestamps.map((ts, index) => (
                                    <a
                                        key={index}
                                        href={`https://www.youtube.com/watch?v=${estudio.youtubeId}&t=${ts.time.replace(':', 'm')}s`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-sabiduria-navy/70 hover:text-sabiduria-gold transition-colors"
                                    >
                                        <span className="font-mono text-xs bg-sabiduria-navy/10 px-2 py-1 rounded">
                                            {ts.time}
                                        </span>
                                        {ts.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Secciones de Desarrollo Doctrinal */}
                {estudio.sections && estudio.sections.map((section, index) => (
                    <motion.section
                        key={section.id || index}
                        id={section.id || `seccion-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                        className="mb-12 scroll-mt-24"
                    >
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-sabiduria-navy mb-6">
                            {section.title}
                        </h2>
                        <div
                            className="prose prose-lg max-w-none text-sabiduria-navy/80 leading-relaxed text-justify"
                            dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                    </motion.section>
                ))}

                {/* Reflexión */}
                {estudio.reflection && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mb-16"
                    >
                        <div className="bg-sabiduria-navy/5 border-l-4 border-sabiduria-gold p-6 sm:p-8 rounded-r-sm">
                            <h3 className="text-lg font-serif font-bold text-sabiduria-navy mb-4 flex items-center gap-2">
                                <BookOpen size={20} className="text-sabiduria-gold" />
                                Reflexión
                            </h3>
                            <p className="text-sabiduria-navy/80 leading-relaxed italic">
                                {estudio.reflection}
                            </p>
                        </div>
                    </motion.section>
                )}

                {/* Estudios Relacionados */}
                {estudiosRelacionados.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.55 }}
                        className="mb-16"
                    >
                        <h3 className="text-xl font-serif font-bold text-sabiduria-navy mb-6">
                            Estudios Relacionados
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {estudiosRelacionados.map((relacionado) => (
                                <Link
                                    key={relacionado.slug}
                                    to={`/estudio/${relacionado.slug}`}
                                    className="group block bg-white border border-sabiduria-navy/10 rounded-sm overflow-hidden hover:border-sabiduria-gold/50 transition-all"
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={`https://img.youtube.com/vi/${relacionado.youtubeId}/mqdefault.jpg`}
                                            alt={relacionado.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-sabiduria-navy/60 to-transparent" />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-sm font-serif font-bold text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors line-clamp-2">
                                            {relacionado.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Formulario de Suscripción */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mb-16"
                >
                    <NewsletterForm
                        title="¿Te bendijo este estudio?"
                        description="Recibe nuevos estudios bíblicos y reflexiones doctrinales directamente en tu correo. Sin spam, solo contenido que edifica tu fe."
                        buttonText="Suscribirse al boletín"
                    />
                </motion.section>

                {/* PDF y CTA */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="border-t border-sabiduria-gray/10 pt-12 pb-16"
                >
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* Botón PDF */}
                        {estudio.pdfUrl && (
                            <a
                                href={`${import.meta.env.BASE_URL}${estudio.pdfUrl}`}
                                download
                                className="inline-flex items-center gap-2 bg-sabiduria-navy text-white px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-sabiduria-navy/90 transition-all"
                            >
                                <Download size={18} />
                                Descargar PDF
                            </a>
                        )}

                        {/* CTA Configurable */}
                        {estudio.ctaLink && (
                            <Link
                                to={estudio.ctaLink}
                                className="inline-flex items-center gap-2 bg-sabiduria-gold text-sabiduria-navy px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-sabiduria-gold/90 transition-all"
                            >
                                <BookOpen size={18} />
                                {estudio.ctaText || 'Explorar más contenido'}
                            </Link>
                        )}
                    </div>
                </motion.section>

                {/* Botón Volver */}
                <div className="pb-16">
                    <div className="pt-8 border-t border-sabiduria-gray/10">
                        <Link
                            to="/biblioteca"
                            className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Volver a la Biblioteca
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
};

export default EstudioPage;
