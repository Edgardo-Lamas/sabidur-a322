import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, GraduationCap } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { supabase } from '../lib/supabase';

/**
 * TeologiaBasica - Página índice del curso de Teología Básica
 * Muestra los 12 capítulos como módulos de un curso estructurado
 */
const TeologiaBasica = () => {
    const [teologiaConfig, setTeologiaConfig] = React.useState(null);
    const [capitulos, setCapitulos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch context from site_config
                const { data: configData } = await supabase
                    .from('site_config')
                    .select('value')
                    .eq('key', 'teologiaBasica')
                    .single();

                if (configData) setTeologiaConfig(configData.value);

                // Fetch chapters
                const { data: chaptersData, error } = await supabase
                    .from('teologia_basica')
                    .select('id, slug, title, description, order_index')
                    .order('order_index', { ascending: true });

                if (error) throw error;
                setCapitulos(chaptersData || []);
            } catch (err) {
                console.error('Error fetching theology data:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title="Teología Básica"
                description={teologiaBasica?.descripcion}
                url="/teologia-basica"
            />

            {/* Breadcrumbs */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                <Breadcrumbs />
            </div>

            {/* Hero Section */}
            <header className="relative bg-sabiduria-navy overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                </div>

                <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-sabiduria-gold/10 border border-sabiduria-gold/30 px-4 py-2 rounded-full mb-6">
                            <GraduationCap size={18} className="text-sabiduria-gold" />
                            <span className="text-sabiduria-gold text-sm font-bold uppercase tracking-wider">
                                Formación Doctrinal
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
                            {teologiaConfig?.titulo || 'Teología Básica'}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl sm:text-2xl text-sabiduria-gold/90 font-heading mb-6">
                            {teologiaConfig?.subtitulo}
                        </p>

                        {/* Description */}
                        <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
                            {teologiaConfig?.descripcion}
                        </p>

                        {/* Author */}
                        <p className="text-sm text-white/50 italic">
                            {teologiaConfig?.autor}
                        </p>

                        {/* Progress indicator */}
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <BookOpen size={20} className="text-sabiduria-gold/70" />
                            <span className="text-white/70 text-sm">
                                {capitulos.length} capítulos de estudio
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-sabiduria-bg to-transparent" />
            </header>

            {/* Chapters Grid */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sabiduria-gold"></div>
                    </div>
                ) : (
                    <div className="grid gap-4 md:gap-6">
                        {capitulos.map((capitulo, index) => (
                            <motion.article
                                key={capitulo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/teologia-basica/${capitulo.slug}`}
                                    className="group block bg-white border border-sabiduria-gray/10 hover:border-sabiduria-gold/30 transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className="flex items-stretch">
                                        {/* Chapter Number */}
                                        <div className="flex-shrink-0 w-20 sm:w-24 bg-sabiduria-navy group-hover:bg-sabiduria-gold transition-colors duration-300 flex items-center justify-center">
                                            <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                                                {capitulo.numero}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow p-5 sm:p-6 flex items-center justify-between">
                                            <div className="flex-grow pr-4">
                                                <h2 className="text-lg sm:text-xl font-serif font-bold text-sabiduria-navy group-hover:text-sabiduria-gold transition-colors mb-1">
                                                    {capitulo.titulo}
                                                </h2>
                                                <p className="text-sm text-sabiduria-gray line-clamp-1">
                                                    {capitulo.descripcion}
                                                </p>
                                            </div>

                                            {/* Arrow */}
                                            <div className="flex-shrink-0">
                                                <ChevronRight
                                                    size={24}
                                                    className="text-sabiduria-gray/30 group-hover:text-sabiduria-gold group-hover:translate-x-1 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="max-w-6xl mx-auto px-4 pb-16">
                <div className="bg-sabiduria-navy/5 border border-sabiduria-navy/10 p-8 text-center">
                    <h3 className="text-xl font-serif font-bold text-sabiduria-navy mb-3">
                        ¿Listo para comenzar?
                    </h3>
                    <p className="text-sabiduria-gray mb-6 max-w-2xl mx-auto">
                        Te recomendamos seguir los capítulos en orden para una comprensión integral de las doctrinas fundamentales de la fe cristiana.
                    </p>
                    <Link
                        to={`/teologia-basica/${capitulos[0]?.slug || ''}`}
                        className="inline-flex items-center gap-2 bg-sabiduria-gold text-sabiduria-navy px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-sabiduria-gold/90 transition-all"
                    >
                        <BookOpen size={18} />
                        Comenzar con el Capítulo 1
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default TeologiaBasica;
