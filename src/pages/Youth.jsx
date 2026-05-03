import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, BookHeart, Zap, ImagePlay, ArrowRight, Waves } from 'lucide-react';
import { motion } from 'framer-motion';
import BibliaFlow from '../components/BibliaFlow';
import SEO from '../components/SEO';

const WallpaperShowcase = lazy(() => import('../components/WallpaperShowcase'));

const Youth = () => {
    return (
        <>
            <SEO
                title="Sabiduría para la Juventud"
                description="Textos y desafíos bíblicos para crecer en la fe. Recursos pensados para jóvenes."
                keywords="juventud cristiana, jóvenes, fe, biblia, recursos juveniles, sabiduría"
            />

            <div className="min-h-screen bg-sabiduria-bg">
                {/* Hero Section */}
                <section
                    className="relative py-20 md:py-28 bg-cover bg-center"
                    style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/juventud-hero.jpg)` }}
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-sabiduria-navy/70"></div>

                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight tracking-tight">
                            Sabiduría para la <span className="text-sabiduria-gold">Juventud</span>
                        </h1>
                        <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed font-serif">
                            Textos y desafíos bíblicos para crecer en la fe
                        </p>
                    </div>
                </section>

                {/* Introductory Text Section */}
                <section className="py-12 md:py-16 bg-sabiduria-bg">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-lg md:text-xl text-sabiduria-navy/90 font-serif leading-relaxed">
                            Este espacio está pensado para adolescentes que desean leer, preguntar y crecer en la fe cristiana.
                            Aquí encontrarás desafíos y recursos que buscan ayudarte a pensar la Biblia con honestidad, profundidad y esperanza.
                        </p>
                    </div>
                </section>

                {/* Biblia Flow Game Section */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 bg-sabiduria-gold/10 text-sabiduria-gold px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider mb-4 border border-sabiduria-gold/20">
                                <Gamepad2 size={20} />
                                Juego Interactivo
                            </div>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-sabiduria-navy mb-4 tracking-tight">
                                Biblia Flow
                            </h2>
                            <p className="text-lg text-sabiduria-gray max-w-2xl mx-auto font-serif leading-relaxed">
                                Pon a prueba tu conocimiento bíblico y desbloquea fondos épicos para crear postales personalizadas.
                            </p>
                        </div>

                        {/* Game Component */}
                        <BibliaFlow />
                    </div>
                </section>

                {/* Wallpapers animados */}
                <section className="py-16 md:py-20 bg-sabiduria-navy">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 bg-sabiduria-gold/10 text-sabiduria-gold px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider mb-4 border border-sabiduria-gold/20">
                                <ImagePlay size={18} />
                                Fondos Animados
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
                                Wallpapers con <span className="text-sabiduria-gold">Versículos</span>
                            </h2>
                            <p className="text-white/60 max-w-xl mx-auto font-serif leading-relaxed">
                                Fondos animados para tu celular. Cada uno está diseñado para que la Palabra
                                esté presente en tu pantalla de inicio.
                            </p>
                        </div>
                        <Suspense fallback={
                            <div className="flex justify-center items-center h-80 text-white/30 font-serif italic">
                                Cargando wallpapers…
                            </div>
                        }>
                            <WallpaperShowcase />
                        </Suspense>
                    </div>
                </section>

                {/* ─── Historias para Jóvenes ─── */}
                <section className="py-16 md:py-20 bg-sabiduria-bg border-t border-white/5">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 bg-sabiduria-gold/10 text-sabiduria-gold px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider mb-4 border border-sabiduria-gold/20">
                                <BookHeart size={18} />
                                Historias para Jóvenes
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 tracking-tight">
                                Historias que te <span className="text-sabiduria-gold">sumergen</span>
                            </h2>
                            <p className="text-white/55 max-w-xl mx-auto font-serif leading-relaxed">
                                Cada historia es un mundo diferente. Entrás a la página y el ambiente te envuelve.
                                Un texto breve, una escena animada y una verdad que se queda.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Card: Ansiedad */}
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    to="/adolescentes/historias/ansiedad"
                                    className="block relative rounded-2xl overflow-hidden border border-white/10 hover:border-sabiduria-gold/30 transition-all shadow-xl shadow-black/40 group"
                                    style={{ aspectRatio: '3/4' }}
                                >
                                    {/* Preview image — frame del video */}
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                        src="/stories/ansiedad-bg.mp4"
                                    />

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                                    {/* Tag */}
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1">
                                        <Waves size={11} className="text-sabiduria-gold" />
                                        <span className="font-heading text-[10px] uppercase tracking-widest text-white/70">Ansiedad · Paz</span>
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="font-heading font-bold text-white text-xl leading-tight mb-1">
                                            El Ancla y<br />
                                            <span className="text-sabiduria-gold italic">la Tormenta</span>
                                        </p>
                                        <p className="text-white/50 font-serif text-xs italic mb-4">Salmos 46:1-3</p>
                                        <div className="flex items-center gap-1.5 text-sabiduria-gold font-heading text-xs font-semibold group-hover:gap-3 transition-all">
                                            Leer historia <ArrowRight size={13} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Card: Soledad */}
                            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                                <Link
                                    to="/adolescentes/historias/soledad"
                                    className="block relative rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/30 transition-all shadow-xl shadow-black/40 group"
                                    style={{ aspectRatio: '3/4', background: '#05060F' }}
                                >
                                    {/* Fondo animado — aurora nocturna */}
                                    <div className="absolute inset-0" style={{
                                        background: 'linear-gradient(160deg, #05060F 0%, #0A0D25 30%, #0D1040 55%, #080C28 80%, #05060F 100%)',
                                    }} />
                                    {/* City silhouette mini */}
                                    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 300 120" preserveAspectRatio="xMidYMax slice">
                                        <rect x="0"   y="40"  width="30" height="80" fill="#06080F" />
                                        <rect x="32"  y="60"  width="22" height="60" fill="#060810" />
                                        <rect x="56"  y="28"  width="38" height="92" fill="#05070E" />
                                        <rect x="96"  y="50"  width="26" height="70" fill="#060810" />
                                        <rect x="124" y="35"  width="42" height="85" fill="#05070E" />
                                        <rect x="168" y="55"  width="24" height="65" fill="#06080F" />
                                        <rect x="194" y="22"  width="34" height="98" fill="#05070E" />
                                        <rect x="230" y="48"  width="28" height="72" fill="#060810" />
                                        <rect x="260" y="38"  width="40" height="82" fill="#05070E" />
                                        {/* ventanas */}
                                        {[[10,48],[14,57],[62,36],[70,50],[130,43],[138,55],[200,30],[205,45],[268,46]].map(([x,y],i)=>(
                                            <rect key={i} x={x} y={y} width="4" height="5"
                                                fill={i%3===0 ? 'rgba(255,220,130,0.7)' : 'rgba(180,210,255,0.55)'} />
                                        ))}
                                    </svg>
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                                    {/* Tag */}
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/12 rounded-full px-3 py-1">
                                        <span style={{ fontSize: 10, color: 'rgba(130,170,255,0.8)' }}>✦</span>
                                        <span className="font-heading text-[10px] uppercase tracking-widest text-white/65">Soledad · El-Roi</span>
                                    </div>
                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="font-heading font-bold text-white text-xl leading-tight mb-1">
                                            El Dios<br />
                                            <span style={{ color: '#8AADFF', fontStyle: 'italic' }}>que Me Ve</span>
                                        </p>
                                        <p className="font-serif italic text-xs mb-4" style={{ color: 'rgba(140,170,240,0.55)' }}>
                                            Génesis 16:13 · El-Roi
                                        </p>
                                        <div className="flex items-center gap-1.5 font-heading text-xs font-semibold group-hover:gap-3 transition-all" style={{ color: '#8AADFF' }}>
                                            Leer historia <ArrowRight size={13} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Card: Identidad */}
                            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                                <Link
                                    to="/adolescentes/historias/identidad"
                                    className="block relative rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/30 transition-all shadow-xl shadow-black/40 group"
                                    style={{ aspectRatio: '3/4', background: '#0D0520' }}
                                >
                                    {/* Fondo: amanecer sobre montaña */}
                                    <div className="absolute inset-0" style={{
                                        background: 'linear-gradient(180deg, #0D0520 0%, #2A1008 50%, #8B3E0A 80%, #D4800F 100%)',
                                    }} />
                                    {/* Mountain silhouette mini */}
                                    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 300 130" preserveAspectRatio="xMidYMax slice">
                                        <path d="M0 130 L0 85 Q40 70 80 78 Q120 86 160 60 Q190 40 210 48 Q230 56 250 42 Q270 28 290 38 L300 45 L300 130 Z" fill="#1C0830" opacity="0.7" />
                                        <path d="M0 130 L0 100 Q30 90 60 95 Q100 102 140 78 Q170 58 200 65 Q230 72 260 55 Q280 44 300 52 L300 130 Z" fill="#0A0318" opacity="0.92" />
                                        {/* Dawn glow behind peak */}
                                        <ellipse cx="210" cy="42" rx="40" ry="20" fill="rgba(220,130,20,0.25)" style={{ filter: 'blur(8px)' }} />
                                        {/* Peak edge lit */}
                                        <path d="M190 60 Q210 42 230 55" fill="none" stroke="rgba(220,140,20,0.4)" strokeWidth="1.5" />
                                    </svg>
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                                    {/* Tag */}
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/12 rounded-full px-3 py-1">
                                        <span style={{ fontSize: 10, color: 'rgba(230,160,40,0.85)' }}>✦</span>
                                        <span className="font-heading text-[10px] uppercase tracking-widest text-white/65">Identidad · Imago Dei</span>
                                    </div>
                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="font-heading font-bold text-white text-xl leading-tight mb-1">
                                            ¿Quién<br />
                                            <span style={{ color: '#E8A020', fontStyle: 'italic' }}>Soy Yo?</span>
                                        </p>
                                        <p className="font-serif italic text-xs mb-4" style={{ color: 'rgba(220,160,60,0.55)' }}>
                                            Génesis 1:27 · Imago Dei
                                        </p>
                                        <div className="flex items-center gap-1.5 font-heading text-xs font-semibold group-hover:gap-3 transition-all" style={{ color: '#E8A020' }}>
                                            Leer historia <ArrowRight size={13} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Coming Soon Sections */}
                <section className="py-16 bg-white border-t border-sabiduria-navy/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-sabiduria-navy text-center mb-12 tracking-tight">
                            Próximamente
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Devotionals */}
                            <div className="bg-white p-8 rounded-xl border border-sabiduria-gray/10 hover:border-sabiduria-gold/30 hover:shadow-lg transition-all">
                                <div className="inline-block p-3 bg-sabiduria-gold/10 rounded-lg mb-4 border border-sabiduria-gold/20">
                                    <BookHeart size={28} className="text-sabiduria-gold" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold text-sabiduria-navy mb-3">
                                    Devocionales Diarios
                                </h3>
                                <p className="text-sabiduria-gray leading-relaxed font-serif">
                                    Lecturas bíblicas y reflexiones diseñadas específicamente para adolescentes.
                                </p>
                            </div>

                            {/* Articles */}
                            <div className="bg-white p-8 rounded-xl border border-sabiduria-gray/10 hover:border-sabiduria-gold/30 hover:shadow-lg transition-all">
                                <div className="inline-block p-3 bg-sabiduria-gold/10 rounded-lg mb-4 border border-sabiduria-gold/20">
                                    <Zap size={28} className="text-sabiduria-gold" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold text-sabiduria-navy mb-3">
                                    Artículos para Jóvenes
                                </h3>
                                <p className="text-sabiduria-gray leading-relaxed font-serif">
                                    Contenido relevante sobre fe, vida cristiana y temas que te importan.
                                </p>
                            </div>

                            {/* Resources */}
                            <div className="bg-white p-8 rounded-xl border border-sabiduria-gold/30 hover:shadow-lg transition-all">
                                <div className="inline-block p-3 bg-sabiduria-gold/10 rounded-lg mb-4 border border-sabiduria-gold/20">
                                    <ImagePlay size={28} className="text-sabiduria-gold" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold text-sabiduria-navy mb-3">
                                    Recursos Descargables
                                </h3>
                                <p className="text-sabiduria-gray leading-relaxed font-serif">
                                    Wallpapers animados con versículos y plan de lectura bíblica de 30 días.
                                    <span className="block mt-2 text-sabiduria-gold font-semibold text-sm">¡Ya disponibles abajo! ↓</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-sabiduria-navy text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 tracking-tight">
                            ¿Tienes ideas para esta sección?
                        </h2>
                        <p className="text-lg text-white/80 mb-8 leading-relaxed font-serif">
                            Queremos crear contenido que realmente te ayude. Contáctanos y cuéntanos qué te gustaría ver aquí.
                        </p>
                        <a
                            href="mailto:contacto@sabiduria322.com"
                            className="inline-block bg-sabiduria-gold text-sabiduria-navy px-8 py-3 rounded-sm font-bold hover:bg-sabiduria-gold/90 transition-all"
                        >
                            Enviar Sugerencias
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Youth;
