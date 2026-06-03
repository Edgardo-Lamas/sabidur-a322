import { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, BookHeart, ArrowRight, Waves, Download, Frame, Expand, X, ChevronDown, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BibliaFlow from '../components/BibliaFlow';
import SEO from '../components/SEO';

const WallpaperShowcase = lazy(() => import('../components/WallpaperShowcase'));

const SALMOS_POSTERS = [
    {
        id: '145',
        titulo: 'Salmo 145',
        subtitulo: 'Alabanza a la majestad de Dios',
        tema: 'Omnipotencia · Bondad',
        img: 'img/posters/salmo-145-bg.jpg',
        poster: 'posters/salmo-145.png',
    },
    {
        id: '139',
        titulo: 'Salmo 139',
        subtitulo: 'La omnisciencia y omnipresencia de Dios',
        tema: 'Omnipresencia · Omnisciencia',
        img: 'img/posters/salmo-139-bg.jpg',
        poster: 'posters/salmo-139.png',
    },
];

const MODULES = [
    { id: 'juego',      icon: Gamepad2,   num: '01', title: 'Biblia Flow',  desc: 'Juego interactivo',  accent: '#C5A059' },
    { id: 'flayer',     icon: Frame,      num: '02', title: 'Tu Flayer',    desc: 'Crea y descarga',    accent: '#8AADFF' },
    { id: 'wallpapers', icon: Smartphone, num: '03', title: 'Wallpapers',   desc: 'Para tu celular',    accent: '#B896E8' },
    { id: 'historias',  icon: BookHeart,  num: '04', title: 'Historias',    desc: 'Sumérgete',          accent: '#FF9055' },
];

const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = (i) => ({
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 } },
});

/* Etiqueta de sección — adapta colores según fondo */
const SectionLabel = ({ num, children, dark = false }) => (
    <div className="flex items-center justify-center gap-3 mb-5">
        <span className={`text-xs font-heading font-bold tracking-[0.28em] ${dark ? 'text-white/25' : 'text-sabiduria-navy/30'}`}>{num}</span>
        <div className={`h-px w-8 ${dark ? 'bg-white/10' : 'bg-sabiduria-navy/15'}`} />
        <span className="text-xs font-heading font-semibold tracking-[0.22em] uppercase text-sabiduria-gold">{children}</span>
        <div className={`h-px w-8 ${dark ? 'bg-white/10' : 'bg-sabiduria-navy/15'}`} />
        <span className={`text-xs font-heading font-bold tracking-[0.28em] ${dark ? 'text-white/25' : 'text-sabiduria-navy/30'}`}>{num}</span>
    </div>
);

const Youth = () => {
    const [posterPreview, setPosterPreview] = useState(null);

    return (
        <>
            <SEO
                title="Sabiduría para la Juventud"
                description="Textos y desafíos bíblicos para crecer en la fe. Recursos pensados para jóvenes."
                keywords="juventud cristiana, jóvenes, fe, biblia, recursos juveniles, sabiduría"
            />

            <div className="min-h-screen bg-sabiduria-bg">

                {/* ══════════════════════════════════════════
                    HERO — imagen original + módulos de nav
                ══════════════════════════════════════════ */}
                <section
                    className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/juventud-hero.jpg)` }}
                >
                    {/* Overlay con degradado — más claro arriba, legible abajo */}
                    <div className="absolute inset-0" style={{
                        background: 'linear-gradient(180deg, rgba(26,29,35,0.55) 0%, rgba(26,29,35,0.70) 50%, rgba(26,29,35,0.92) 100%)'
                    }} />

                    {/* Contenido */}
                    <div className="relative z-10 text-center max-w-3xl mx-auto px-4 flex flex-col items-center">

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="text-sabiduria-gold font-heading text-xs uppercase tracking-[0.32em] mb-5"
                        >
                            Sabiduría para el Corazón
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 leading-tight tracking-tight"
                        >
                            Sabiduría para la{' '}
                            <span className="text-sabiduria-gold">Juventud</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-white/75 font-serif text-lg leading-relaxed max-w-lg mb-14"
                        >
                            Desafíos bíblicos, recursos creativos e historias
                            para crecer en la fe.
                        </motion.p>

                        {/* 4 módulos de navegación */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.55 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl"
                        >
                            {MODULES.map((m) => (
                                <motion.button
                                    key={m.id}
                                    onClick={() => scrollTo(m.id)}
                                    whileHover={{ y: -5, scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    transition={{ duration: 0.18 }}
                                    className="flex flex-col items-center gap-2.5 p-4 rounded-2xl cursor-pointer text-center backdrop-blur-sm"
                                    style={{
                                        background: 'rgba(255,255,255,0.10)',
                                        border: '1px solid rgba(255,255,255,0.18)',
                                    }}
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ background: `${m.accent}22`, border: `1px solid ${m.accent}40` }}>
                                        <m.icon size={19} style={{ color: m.accent }} />
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-white text-sm leading-tight">{m.title}</p>
                                        <p className="text-white/45 text-[10px] font-heading uppercase tracking-wider mt-0.5">{m.desc}</p>
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>

                    {/* Scroll hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                        onClick={() => scrollTo('juego')}
                    >
                        <span className="text-white/30 font-heading text-[10px] uppercase tracking-[0.25em]">Explorar</span>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ChevronDown size={18} className="text-white/25" />
                        </motion.div>
                    </motion.div>
                </section>

                {/* ══════════════════════════════════════════
                    01 — BIBLIA FLOW  (fondo claro)
                ══════════════════════════════════════════ */}
                <section id="juego" className="py-20 md:py-28 bg-sabiduria-bg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="text-center mb-14"
                        >
                            <SectionLabel num="01">Juego Interactivo</SectionLabel>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-sabiduria-navy tracking-tight mb-4">
                                Biblia <span className="text-sabiduria-gold">Flow</span>
                            </h2>
                            <p className="text-sabiduria-gray max-w-xl mx-auto font-serif text-lg leading-relaxed">
                                Poné a prueba tu conocimiento bíblico y desbloqueá fondos épicos
                                para crear postales personalizadas.
                            </p>
                        </motion.div>

                        {/* Imagen de cercanía cristiana */}
                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.1 }}
                            className="mb-12"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}img/juventud-biblia-flow.jpg`}
                                alt="Jóvenes compartiendo la Biblia con alegría"
                                className="w-full max-w-4xl mx-auto block rounded-2xl shadow-lg object-cover"
                                style={{ maxHeight: 360 }}
                            />
                        </motion.div>

                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <BibliaFlow />
                        </motion.div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    02 — TU FLAYER ANIMADO  (fondo navy)
                ══════════════════════════════════════════ */}
                <section id="flayer" className="py-20 md:py-28 bg-sabiduria-navy">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="text-center mb-12"
                        >
                            <SectionLabel num="02" dark>Crea tu Contenido</SectionLabel>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
                                Tu{' '}
                                <span style={{ color: '#8AADFF' }}>Flayer Animado</span>
                            </h2>
                            <p className="text-white/60 max-w-lg mx-auto font-serif text-lg leading-relaxed">
                                Elegí un fondo, seleccioná un versículo y descargalo
                                para compartir verdades eternas con tus seres queridos.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.1 }}
                            className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
                            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            <iframe
                                src="/herramientas/flayers/index.html"
                                style={{ width: '100%', height: '900px', border: 0 }}
                                title="Creador de Flayers Animados"
                                allow="downloads"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    03 — WALLPAPERS  (fondo claro)
                ══════════════════════════════════════════ */}
                <section id="wallpapers" className="py-20 md:py-28 bg-sabiduria-bg">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="mb-14"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
                                {/* Texto */}
                                <div className="md:w-1/2 text-center md:text-left">
                                    <SectionLabel num="03">Fondos Animados</SectionLabel>
                                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-sabiduria-navy tracking-tight mb-4">
                                        Wallpapers con{' '}
                                        <span className="text-sabiduria-gold">Versículos</span>
                                    </h2>
                                    <p className="text-sabiduria-gray font-serif text-lg leading-relaxed">
                                        Fondos animados para tu celular. La Palabra presente
                                        en tu pantalla de inicio, cada vez que la desbloqueás.
                                    </p>
                                </div>
                                {/* Imagen */}
                                <div className="md:w-1/2">
                                    <img
                                        src={`${import.meta.env.BASE_URL}img/juventud-flayer.jpg`}
                                        alt="Joven disfrutando un versículo en su celular"
                                        className="w-full rounded-2xl shadow-xl object-cover"
                                        style={{ maxHeight: 360, objectPosition: 'center 20%' }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <Suspense fallback={
                                <div className="flex justify-center items-center h-80 text-sabiduria-gray font-serif italic">
                                    Cargando wallpapers…
                                </div>
                            }>
                                <WallpaperShowcase />
                            </Suspense>
                        </motion.div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    04 — HISTORIAS  (fondo navy — cinematic)
                ══════════════════════════════════════════ */}
                <section id="historias" className="py-20 md:py-28 bg-sabiduria-navy">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="text-center mb-14"
                        >
                            <SectionLabel num="04" dark>Historias para Jóvenes</SectionLabel>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-4">
                                Historias que te{' '}
                                <span style={{ color: '#FF9055' }}>sumergen</span>
                            </h2>
                            <p className="text-white/55 max-w-xl mx-auto font-serif text-lg leading-relaxed">
                                Entrás a la página y el ambiente te envuelve. Un texto breve,
                                una escena animada y una verdad que se queda.
                            </p>
                        </motion.div>

                        {/* Imagen de comunión */}
                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.1 }}
                            className="mb-10"
                        >
                            <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                                <img
                                    src={`${import.meta.env.BASE_URL}img/juventud-oracion.jpg`}
                                    alt="Jóvenes en oración y comunión"
                                    className="w-full object-cover"
                                    style={{ maxHeight: 320 }}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-sabiduria-navy/60 to-transparent" />
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                            {/* Ansiedad */}
                            <motion.div variants={stagger(0)} initial="hidden" whileInView="show"
                                viewport={{ once: true, amount: 0.15 }} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                                <Link to="/adolescentes/historias/ansiedad"
                                    className="block relative rounded-2xl overflow-hidden border border-white/10 hover:border-sabiduria-gold/40 transition-all shadow-2xl shadow-black/50 group"
                                    style={{ aspectRatio: '3/4' }}>
                                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" src="/stories/ansiedad-bg.mp4" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent" />
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/12 rounded-full px-3 py-1">
                                        <Waves size={10} className="text-sabiduria-gold" />
                                        <span className="font-heading text-[9px] uppercase tracking-widest text-white/65">Ansiedad · Paz</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="font-heading font-bold text-white text-lg leading-tight mb-1">El Ancla y<br /><span className="text-sabiduria-gold italic">la Tormenta</span></p>
                                        <p className="text-white/45 font-serif text-xs italic mb-4">Salmos 46:1-3</p>
                                        <div className="flex items-center gap-1.5 text-sabiduria-gold font-heading text-xs font-semibold group-hover:gap-3 transition-all">
                                            Leer historia <ArrowRight size={12} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Soledad */}
                            <motion.div variants={stagger(1)} initial="hidden" whileInView="show"
                                viewport={{ once: true, amount: 0.15 }} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                                <Link to="/adolescentes/historias/soledad"
                                    className="block relative rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/35 transition-all shadow-2xl shadow-black/50 group"
                                    style={{ aspectRatio: '3/4', background: '#05060F' }}>
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #05060F 0%, #0A0D25 30%, #0D1040 55%, #080C28 80%, #05060F 100%)' }} />
                                    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 300 120" preserveAspectRatio="xMidYMax slice">
                                        <rect x="0" y="40" width="30" height="80" fill="#06080F" /><rect x="32" y="60" width="22" height="60" fill="#060810" />
                                        <rect x="56" y="28" width="38" height="92" fill="#05070E" /><rect x="96" y="50" width="26" height="70" fill="#060810" />
                                        <rect x="124" y="35" width="42" height="85" fill="#05070E" /><rect x="168" y="55" width="24" height="65" fill="#06080F" />
                                        <rect x="194" y="22" width="34" height="98" fill="#05070E" /><rect x="230" y="48" width="28" height="72" fill="#060810" />
                                        <rect x="260" y="38" width="40" height="82" fill="#05070E" />
                                        {[[10,48],[14,57],[62,36],[70,50],[130,43],[138,55],[200,30],[205,45],[268,46]].map(([x,y],i)=>(
                                            <rect key={i} x={x} y={y} width="4" height="5" fill={i%3===0 ? 'rgba(255,220,130,0.7)' : 'rgba(180,210,255,0.55)'} />
                                        ))}
                                    </svg>
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/12 rounded-full px-3 py-1">
                                        <span style={{ fontSize: 9, color: 'rgba(130,170,255,0.85)' }}>✦</span>
                                        <span className="font-heading text-[9px] uppercase tracking-widest text-white/60">Soledad · El-Roi</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="font-heading font-bold text-white text-lg leading-tight mb-1">El Dios<br /><span style={{ color: '#8AADFF', fontStyle: 'italic' }}>que Me Ve</span></p>
                                        <p className="font-serif italic text-xs mb-4" style={{ color: 'rgba(140,170,240,0.45)' }}>Génesis 16:13 · El-Roi</p>
                                        <div className="flex items-center gap-1.5 font-heading text-xs font-semibold group-hover:gap-3 transition-all" style={{ color: '#8AADFF' }}>
                                            Leer historia <ArrowRight size={12} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Identidad */}
                            <motion.div variants={stagger(2)} initial="hidden" whileInView="show"
                                viewport={{ once: true, amount: 0.15 }} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                                <Link to="/adolescentes/historias/identidad"
                                    className="block relative rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/35 transition-all shadow-2xl shadow-black/50 group"
                                    style={{ aspectRatio: '3/4', background: '#0D0520' }}>
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0D0520 0%, #2A1008 50%, #8B3E0A 80%, #D4800F 100%)' }} />
                                    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 300 130" preserveAspectRatio="xMidYMax slice">
                                        <path d="M0 130 L0 85 Q40 70 80 78 Q120 86 160 60 Q190 40 210 48 Q230 56 250 42 Q270 28 290 38 L300 45 L300 130 Z" fill="#1C0830" opacity="0.7" />
                                        <path d="M0 130 L0 100 Q30 90 60 95 Q100 102 140 78 Q170 58 200 65 Q230 72 260 55 Q280 44 300 52 L300 130 Z" fill="#0A0318" opacity="0.92" />
                                        <ellipse cx="210" cy="42" rx="40" ry="20" fill="rgba(220,130,20,0.25)" style={{ filter: 'blur(8px)' }} />
                                        <path d="M190 60 Q210 42 230 55" fill="none" stroke="rgba(220,140,20,0.4)" strokeWidth="1.5" />
                                    </svg>
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/12 rounded-full px-3 py-1">
                                        <span style={{ fontSize: 9, color: 'rgba(230,160,40,0.9)' }}>✦</span>
                                        <span className="font-heading text-[9px] uppercase tracking-widest text-white/60">Identidad · Imago Dei</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="font-heading font-bold text-white text-lg leading-tight mb-1">¿Quién<br /><span style={{ color: '#E8A020', fontStyle: 'italic' }}>Soy Yo?</span></p>
                                        <p className="font-serif italic text-xs mb-4" style={{ color: 'rgba(220,160,60,0.45)' }}>Génesis 1:27 · Imago Dei</p>
                                        <div className="flex items-center gap-1.5 font-heading text-xs font-semibold group-hover:gap-3 transition-all" style={{ color: '#E8A020' }}>
                                            Leer historia <ArrowRight size={12} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Fracaso */}
                            <motion.div variants={stagger(3)} initial="hidden" whileInView="show"
                                viewport={{ once: true, amount: 0.15 }} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                                <Link to="/adolescentes/historias/fracaso"
                                    className="block relative rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/35 transition-all shadow-2xl shadow-black/50 group"
                                    style={{ aspectRatio: '3/4', background: '#0A0200' }}>
                                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" src="/stories/fracaso-bg.mp4" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/12 rounded-full px-3 py-1">
                                        <span style={{ fontSize: 9, color: 'rgba(255,140,40,0.9)' }}>✦</span>
                                        <span className="font-heading text-[9px] uppercase tracking-widest text-white/60">Fracaso · Restauración</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="font-heading font-bold text-white text-lg leading-tight mb-1">El Fracaso y<br /><span style={{ color: '#FF8C28', fontStyle: 'italic' }}>la Segunda Oportunidad</span></p>
                                        <p className="font-serif italic text-xs mb-4" style={{ color: 'rgba(255,160,60,0.45)' }}>Juan 21:15-17 · Pedro</p>
                                        <div className="flex items-center gap-1.5 font-heading text-xs font-semibold group-hover:gap-3 transition-all" style={{ color: '#FF8C28' }}>
                                            Leer historia <ArrowRight size={12} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    05 — LÁMINAS PARA IMPRIMIR  (fondo claro)
                ══════════════════════════════════════════ */}
                <section className="py-20 md:py-28 bg-sabiduria-bg">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="text-center mb-12"
                        >
                            <SectionLabel num="05">Láminas Bíblicas</SectionLabel>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-sabiduria-navy tracking-tight mb-4">
                                Para imprimir y{' '}
                                <span className="text-sabiduria-gold">enmarcar</span>
                            </h2>
                            <p className="text-sabiduria-gray max-w-md mx-auto font-serif text-lg leading-relaxed">
                                Salmos completos en Reina Valera 1960 con imagen épica de fondo.
                                Alta resolución — listos para A4 o A3.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {SALMOS_POSTERS.map((s, i) => (
                                <motion.div
                                    key={s.id}
                                    variants={stagger(i)} initial="hidden" whileInView="show"
                                    viewport={{ once: true, amount: 0.2 }}
                                    whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
                                    className="bg-white rounded-xl overflow-hidden border border-sabiduria-gray/10 shadow-md hover:shadow-xl transition-shadow"
                                >
                                    <div className="relative cursor-pointer group" style={{ aspectRatio: '3/4' }}
                                        onClick={() => setPosterPreview(s)}>
                                        <img src={`${import.meta.env.BASE_URL}${s.img}`} alt={s.titulo}
                                            className="absolute inset-0 w-full h-full object-cover object-top" />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/55 backdrop-blur-sm rounded-full p-4 border border-white/18">
                                                <Expand size={24} className="text-white" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                                            <p className="text-sabiduria-gold font-heading font-bold text-2xl tracking-widest">{s.titulo}</p>
                                            <p className="text-white/70 font-serif italic text-sm mt-1 leading-snug">{s.subtitulo}</p>
                                        </div>
                                        <div className="absolute top-4 left-0 right-0 flex justify-center">
                                            <span className="bg-black/50 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1 text-white/55 font-heading text-[10px] uppercase tracking-widest">
                                                {s.tema}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 flex gap-3">
                                        <button onClick={() => setPosterPreview(s)}
                                            className="flex-1 flex items-center justify-center gap-2 bg-sabiduria-gray/8 hover:bg-sabiduria-gray/15 border border-sabiduria-gray/20 text-sabiduria-navy rounded-lg py-3 text-sm font-heading font-semibold transition-colors">
                                            <Expand size={14} /> Vista previa
                                        </button>
                                        <a href={`${import.meta.env.BASE_URL}${s.poster}`} download={`salmo-${s.id}.png`}
                                            className="flex-1 flex items-center justify-center gap-2 bg-sabiduria-navy hover:bg-sabiduria-navy/85 text-sabiduria-gold rounded-lg py-3 text-sm font-heading font-bold transition-colors">
                                            <Download size={14} /> Descargar
                                        </a>
                                    </div>
                                    <p className="text-center text-sabiduria-gray/45 text-xs font-serif pb-3">2480 × 3508 px · 300 dpi · A4 y A3</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Modal poster */}
                    <AnimatePresence>
                        {posterPreview && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                                style={{ backdropFilter: 'blur(14px)', background: 'rgba(0,0,0,0.88)' }}
                                onClick={() => setPosterPreview(null)}
                            >
                                <motion.div
                                    initial={{ scale: 0.88, opacity: 0, y: 24 }}
                                    animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="flex flex-col items-center gap-5 max-h-screen"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img src={`${import.meta.env.BASE_URL}${posterPreview.poster}`} alt={posterPreview.titulo}
                                        className="rounded-xl shadow-2xl border border-white/10 block"
                                        style={{ maxHeight: '72vh', maxWidth: '90vw', width: 'auto', height: 'auto' }} />
                                    <div className="flex gap-3">
                                        <button onClick={() => setPosterPreview(null)}
                                            className="flex items-center gap-2 bg-white/8 border border-white/15 text-white/70 px-5 py-2.5 rounded-xl font-heading text-sm font-semibold hover:bg-white/15 transition-all">
                                            <X size={14} /> Cerrar
                                        </button>
                                        <a href={`${import.meta.env.BASE_URL}${posterPreview.poster}`} download={`salmo-${posterPreview.id}.png`}
                                            className="flex items-center gap-2 bg-sabiduria-gold text-sabiduria-navy px-5 py-2.5 rounded-xl font-heading text-sm font-bold hover:brightness-105 transition-all active:scale-95">
                                            <Download size={14} /> Descargar PNG
                                        </a>
                                    </div>
                                </motion.div>
                                <button onClick={() => setPosterPreview(null)}
                                    className="absolute top-5 right-5 p-2 text-white/40 hover:text-white transition-colors">
                                    <X size={22} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

            </div>
        </>
    );
};

export default Youth;
