import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, List, Home } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ShareButtons from '../components/ShareButtons';
import NewsletterForm from '../components/NewsletterForm';
import { supabase } from '../lib/supabase';

/**
 * TeologiaBasicaTema - Página individual para cada capítulo del curso
 * Incluye navegación anterior/siguiente y tabla de contenidos
 */
const TeologiaBasicaTema = () => {
    const { slug } = useParams();
    const [capitulo, setCapitulo] = React.useState(null);
    const [allCapitulos, setAllCapitulos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCapitulo = async () => {
            setLoading(true);
            try {
                // Fetch current chapter
                const { data: capData, error: capError } = await supabase
                    .from('teologia_basica')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (capError) throw capError;
                setCapitulo(capData);

                // Fetch all chapters for navigation
                const { data: allData } = await supabase
                    .from('teologia_basica')
                    .select('slug, title, order_index')
                    .order('order_index', { ascending: true });

                setAllCapitulos(allData || []);
            } catch (err) {
                console.error('Error fetching chapter:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCapitulo();
    }, [slug]);

    // Navegación
    const capituloIndex = allCapitulos.findIndex((c) => c.slug === slug);
    const prevCap = capituloIndex > 0 ? allCapitulos[capituloIndex - 1] : null;
    const nextCap = capituloIndex < allCapitulos.length - 1 ? allCapitulos[capituloIndex + 1] : null;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sabiduria-bg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sabiduria-gold"></div>
            </div>
        );
    }

    if (!capitulo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sabiduria-bg">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-sabiduria-navy mb-4">
                        Capítulo no encontrado
                    </h1>
                    <p className="text-sabiduria-gray mb-8">
                        Lo sentimos, el capítulo que buscas no está disponible.
                    </p>
                    <Link
                        to="/teologia-basica"
                        className="inline-flex items-center gap-2 text-sabiduria-gold font-bold uppercase tracking-widest hover:underline"
                    >
                        <ArrowLeft size={16} />
                        Volver al índice
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title={`${capitulo.title} | Teología Básica`}
                description={capitulo.description}
                url={`/teologia-basica/${capitulo.slug}`}
            />

            {/* Breadcrumbs */}
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <Breadcrumbs
                    customItems={[
                        { label: 'Teología Básica', path: '/teologia-basica' },
                        { label: capitulo.title }
                    ]}
                />
            </div>

            {/* Header */}
            <header className="max-w-4xl mx-auto px-4 pt-8 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Chapter indicator */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center justify-center w-12 h-12 bg-sabiduria-navy text-white font-serif font-bold text-xl rounded-full">
                            Capítulo {capitulo.order_index} de {allCapitulos.length}
                        </span>
                        <div>
                            <span className="text-sabiduria-gold text-xs font-bold uppercase tracking-[0.2em]">
                                Capítulo {capitulo.order_index} de {allCapitulos.length}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                {/* Progress bar */}
                                <div className="w-32 h-1 bg-sabiduria-navy/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-sabiduria-gold transition-all duration-500"
                                        style={{ width: `${(capitulo.order_index / allCapitulos.length) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-sabiduria-gray">
                                    {Math.round((capitulo.order_index / allCapitulos.length) * 100)}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-sabiduria-navy leading-tight mb-4">
                        {capitulo.title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-sabiduria-gray leading-relaxed mb-6">
                        {capitulo.description}
                    </p>

                    <ShareButtons
                        title={capitulo.title}
                        url={`/teologia-basica/${capitulo.slug}`}
                    />
                </motion.div>
            </header>

            {/* Content Section */}
            <article className="max-w-4xl mx-auto px-4">
                {/* Content or Placeholder */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-16"
                >
                    {(() => {
                        if (!capitulo.content) {
                            return (
                                <div className="bg-sabiduria-gold/5 border border-sabiduria-gold/20 p-8 text-center">
                                    <BookOpen size={48} className="text-sabiduria-gold/50 mx-auto mb-4" />
                                    <h2 className="text-xl font-serif font-bold text-sabiduria-navy mb-2">
                                        Contenido en preparación
                                    </h2>
                                    <p className="text-sabiduria-gray">
                                        Este capítulo está siendo preparado. Pronto estará disponible.
                                    </p>
                                </div>
                            );
                        }

                        if (typeof capitulo.content === 'string') {
                            return (
                                <div
                                    className="teologia-content"
                                    dangerouslySetInnerHTML={{ __html: capitulo.content }}
                                />
                            );
                        }

                        // Handle JSON object
                        const data = capitulo.content.contenido || capitulo.content;

                        return (
                            <div className="teologia-content space-y-12">
                                {data.definicion && (
                                    <div className="bg-white border-l-4 border-sabiduria-gold p-8 shadow-sm">
                                        <p className="text-xl leading-relaxed text-sabiduria-navy font-serif italic">
                                            "{data.definicion}"
                                        </p>
                                    </div>
                                )}

                                {data.aspectos_clave && (
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {data.aspectos_clave.map((item, i) => (
                                            <div key={i} className="bg-white p-6 border border-sabiduria-gray/10 rounded-lg shadow-sm">
                                                <h4 className="text-sabiduria-gold font-bold uppercase tracking-wider text-xs mb-3">{item.titulo || item.title || item.etiqueta}</h4>
                                                <p className="text-sabiduria-gray text-sm">{item.descripcion || item.description || (typeof item === 'string' ? item : '')}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {data.fundamento_biblico && (
                                    <div className="bg-sabiduria-navy/5 p-8 rounded-xl border border-sabiduria-navy/10">
                                        <h3 className="text-2xl font-serif font-bold text-sabiduria-navy mb-6 flex items-center gap-2">
                                            <BookOpen className="text-sabiduria-gold" size={24} />
                                            Fundamento Bíblico
                                        </h3>
                                        <div className="space-y-6">
                                            {data.fundamento_biblico.map((item, i) => (
                                                <div key={i} className="border-b border-sabiduria-navy/10 last:border-0 pb-4 last:pb-0">
                                                    <span className="block text-sabiduria-gold font-bold text-sm mb-1">{item.cita || item.reference}</span>
                                                    <p className="text-sabiduria-navy/80 italic text-sm">"{item.texto || item.text}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {data.aplicacion_practica && (
                                    <div className="space-y-8">
                                        <h3 className="text-2xl font-serif font-bold text-sabiduria-navy mb-6">Aplicación Práctica</h3>
                                        <div className="grid gap-4">
                                            {data.aplicacion_practica.map((item, i) => (
                                                <div key={i} className="flex gap-4 items-start bg-white p-5 border border-sabiduria-gray/10">
                                                    <div className="w-8 h-8 rounded-full bg-sabiduria-gold/10 text-sabiduria-gold flex items-center justify-center flex-shrink-0 font-bold">
                                                        {i + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sabiduria-navy mb-1">{item.titulo || item.title}</h4>
                                                        <p className="text-sabiduria-gray text-sm">{item.descripcion || item.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {data.referencias_biblicas && (
                                    <div className="pt-8 border-t border-sabiduria-gray/10">
                                        <h4 className="text-sm font-bold text-sabiduria-navy uppercase tracking-widest mb-4">Referencias Adicionales</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {data.referencias_biblicas.map((ref, i) => (
                                                <span key={i} className="px-3 py-1 bg-sabiduria-navy/5 text-sabiduria-navy text-xs rounded-full">
                                                    {ref}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </motion.section>

                {/* Navigation between chapters */}
                <motion.nav
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Previous */}
                        {prevCap ? (
                            <Link
                                to={`/teologia-basica/${prevCap.slug}`}
                                className="group flex items-center gap-4 p-4 bg-white border border-sabiduria-gray/10 hover:border-sabiduria-gold/30 transition-all"
                            >
                                <ArrowLeft size={20} className="text-sabiduria-gray group-hover:text-sabiduria-gold transition-colors flex-shrink-0" />
                                <div className="text-left">
                                    <span className="block text-xs text-sabiduria-gray uppercase tracking-wide mb-1">
                                        Capítulo anterior
                                    </span>
                                    <span className="block text-sm font-serif font-bold text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors line-clamp-1">
                                        {prevCap.title}
                                    </span>
                                </div>
                            </Link>
                        ) : (
                            <div />
                        )}

                        {/* Next */}
                        {nextCap ? (
                            <Link
                                to={`/teologia-basica/${nextCap.slug}`}
                                className="group flex items-center gap-4 p-4 bg-white border border-sabiduria-gray/10 hover:border-sabiduria-gold/30 transition-all sm:text-right"
                            >
                                <div className="flex-grow">
                                    <span className="block text-xs text-sabiduria-gray uppercase tracking-wide mb-1">
                                        Siguiente capítulo
                                    </span>
                                    <span className="block text-sm font-serif font-bold text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors line-clamp-1">
                                        {nextCap.title}
                                    </span>
                                </div>
                                <ArrowRight size={20} className="text-sabiduria-gray group-hover:text-sabiduria-gold transition-colors flex-shrink-0" />
                            </Link>
                        ) : (
                            <Link
                                to="/teologia-basica"
                                className="group flex items-center gap-4 p-4 bg-sabiduria-gold/10 border border-sabiduria-gold/30 transition-all sm:text-right"
                            >
                                <div className="flex-grow">
                                    <span className="block text-xs text-sabiduria-gold uppercase tracking-wide mb-1">
                                        Has completado el curso
                                    </span>
                                    <span className="block text-sm font-serif font-bold text-sabiduria-navy">
                                        Volver al índice
                                    </span>
                                </div>
                                <Home size={20} className="text-sabiduria-gold flex-shrink-0" />
                            </Link>
                        )}
                    </div>
                </motion.nav>

                {/* All Chapters Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mb-16"
                >
                    <Link
                        to="/teologia-basica"
                        className="flex items-center justify-center gap-2 py-4 border-t border-b border-sabiduria-gray/10 text-sabiduria-navy hover:text-sabiduria-gold transition-colors"
                    >
                        <List size={18} />
                        <span className="font-medium">Ver todos los capítulos</span>
                    </Link>
                </motion.div>

                {/* Newsletter Form */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-16"
                >
                    <NewsletterForm
                        title="¿Te está edificando este estudio?"
                        description="Recibe nuevos contenidos de formación doctrinal directamente en tu correo."
                        buttonText="Suscribirse"
                    />
                </motion.section>

                {/* Back button */}
                <div className="pb-16">
                    <div className="pt-8 border-t border-sabiduria-gray/10">
                        <Link
                            to="/teologia-basica"
                            className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Volver a Teología Básica
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
};

export default TeologiaBasicaTema;
