import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Video, Library } from 'lucide-react';
import content from '../data/content.json';

const HeroGrid = () => {
    const { main, side } = content.heroGrid;
    const { videos, rotationDays } = content.heroVideos;

    // Calcular qué video mostrar basado en el día del año y rotación cada X días
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const videoIndex = Math.floor((dayOfYear - 1) / rotationDays) % videos.length;
    const currentVideo = videos[videoIndex];

    // Crear la card de video dinámicamente
    const videoCard = {
        id: 'video',
        title: currentVideo.title,
        category: "Video",
        image: `https://img.youtube.com/vi/${currentVideo.youtubeId}/maxresdefault.jpg`,
        link: `https://www.youtube.com/watch?v=${currentVideo.youtubeId}`,
        isExternal: true
    };

    // Filtrar las cards originales (sin la de video) y agregar la card de video dinámica
    const otherCards = side.filter(card => card.id !== 2);
    const miniCards = [otherCards[0], videoCard, otherCards[1]].slice(0, 3);


    return (
        <section className="relative bg-sabiduria-navy overflow-hidden">
            {/* Background con gradiente y textura */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                        backgroundImage: `url(${import.meta.env.BASE_URL}img/portada-eBooks.png)`,
                        filter: 'blur(8px) grayscale(50%)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-sabiduria-navy via-sabiduria-navy/95 to-[#1a1d23]" />
                {/* Textura sutil */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Columna Izquierda - Identidad y Misión */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        {/* Etiqueta superior */}
                        <span className="inline-block text-sabiduria-gold text-xs font-bold uppercase tracking-[0.3em] mb-6">
                            Formación Bíblica
                        </span>

                        {/* H1 - Título Principal */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6">
                            Sabiduría bíblica para formar el corazón y la mente
                        </h1>

                        {/* H2 - Subtítulo */}
                        <h2 className="text-lg sm:text-xl font-heading font-medium text-sabiduria-gold/90 mb-6">
                            Formación cristiana arraigada en la Palabra de Dios
                        </h2>

                        {/* Párrafo de propuesta de valor */}
                        <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                            Estudios bíblicos, teología reformada y recursos doctrinales para creyentes que desean crecer en el conocimiento de Dios, afirmar su fe en la verdad de las Escrituras y formar su vida conforme a la Palabra.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                to="/articulos"
                                className="inline-flex items-center justify-center gap-2 bg-sabiduria-gold text-sabiduria-navy px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-sabiduria-gold/90 transition-all"
                            >
                                <BookOpen size={18} />
                                Explorar Estudios
                            </Link>
                            <Link
                                to="/ensenanzas"
                                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 font-medium text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/50 transition-all"
                            >
                                <Video size={18} />
                                Audios
                            </Link>
                            <Link
                                to="/biblioteca"
                                className="inline-flex items-center justify-center gap-2 border border-sabiduria-gold/30 text-sabiduria-gold px-6 py-3 font-medium text-sm uppercase tracking-wider hover:bg-sabiduria-gold/10 hover:border-sabiduria-gold/50 transition-all"
                            >
                                <Library size={18} />
                                Biblioteca
                            </Link>
                        </div>
                    </motion.div>

                    {/* Columna Derecha - Recursos Destacados */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        {/* Card Principal */}
                        <div className="relative overflow-hidden group rounded-sm shadow-2xl aspect-[16/10]">
                            <img
                                src={`${import.meta.env.BASE_URL}${main.image}`}
                                alt={main.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <span className="inline-block px-3 py-1 bg-sabiduria-gold text-sabiduria-navy text-[10px] font-bold uppercase tracking-widest mb-3">
                                    {main.category}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 leading-tight">
                                    {main.title}
                                </h3>
                                <Link
                                    to={main.link}
                                    className="inline-flex items-center text-white/90 text-sm font-medium hover:text-sabiduria-gold transition-colors"
                                >
                                    LEER AHORA <span className="ml-2">→</span>
                                </Link>
                            </div>
                        </div>

                        {/* Mini Grid - 3 Cards */}
                        <div className="grid grid-cols-3 gap-3">
                            {miniCards.map((item, index) => {
                                // Determinar si la imagen es una URL externa
                                const imageUrl = item.image.startsWith('http')
                                    ? item.image
                                    : `${import.meta.env.BASE_URL}${item.image}`;

                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + (index * 0.1) }}
                                        className="relative overflow-hidden group rounded-sm shadow-lg aspect-square"
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-sabiduria-navy/70 group-hover:bg-sabiduria-navy/50 transition-colors" />
                                        <div className="absolute inset-0 flex flex-col justify-end p-3">
                                            <span className="text-sabiduria-gold text-[9px] font-bold uppercase tracking-tight mb-1 block">
                                                {item.category}
                                            </span>
                                            <h4 className="text-xs sm:text-sm font-serif font-bold text-white leading-tight group-hover:text-sabiduria-gold transition-colors line-clamp-2">
                                                {item.title}
                                            </h4>
                                        </div>
                                        {item.isExternal ? (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute inset-0 z-10"
                                                aria-label={`Ver ${item.title}`}
                                            />
                                        ) : (
                                            <Link to={item.link} className="absolute inset-0 z-10" aria-label={`Ver ${item.title}`} />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Línea decorativa inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sabiduria-gold/50 to-transparent" />
        </section>
    );
};

export default HeroGrid;
