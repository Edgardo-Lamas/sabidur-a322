import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';

const FADE_IN = {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: 'easeOut' },
};

const HistoriaAnsiedad = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.0;
        }
    }, []);

    return (
        <>
            <SEO
                title="El Ancla y la Tormenta — Historias para Jóvenes"
                description="Una historia sobre la ansiedad y la fe. Cuando las olas de los pensamientos no te dejan dormir, hay una estrella que no se mueve."
            />

            {/* ─── VIDEO BACKGROUND fijo ─── */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'fixed',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
                src="/stories/ansiedad-bg.mp4"
            />

            {/* Overlay que oscurece un poco el video para legibilidad */}
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,5,15,0.45) 0%, rgba(0,8,20,0.38) 40%, rgba(0,5,15,0.52) 100%)',
                zIndex: 1,
                pointerEvents: 'none',
            }} />

            {/* ─── CONTENIDO sobre el video ─── */}
            <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

                {/* Barra de navegación flotante */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
                    style={{ background: 'rgba(0,5,15,0.6)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(197,160,89,0.12)' }}>
                    <Link
                        to="/adolescentes"
                        className="flex items-center gap-2 text-white/60 hover:text-sabiduria-gold transition-colors font-heading text-sm font-semibold"
                    >
                        <ArrowLeft size={16} />
                        Volver
                    </Link>
                    <div className="flex items-center gap-2 text-sabiduria-gold/70">
                        <BookOpen size={15} />
                        <span className="font-heading text-xs uppercase tracking-widest">Historias para Jóvenes</span>
                    </div>
                </div>

                {/* ─── HEADER ─── */}
                <header className="pt-20 pb-12 px-6 text-center max-w-2xl mx-auto">
                    <motion.div {...FADE_IN} className="mb-4">
                        <span className="font-heading text-xs uppercase tracking-[0.35em] text-sabiduria-gold/60">
                            Ansiedad · Paz · Fe
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}
                        className="font-heading font-bold text-white leading-tight tracking-tight"
                        style={{ fontSize: 'clamp(2.4rem, 6vw, 3.8rem)' }}
                    >
                        El Ancla y<br />
                        <span style={{ color: '#C5A059', fontStyle: 'italic' }}>la Tormenta</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mx-auto mt-8 mb-6"
                        style={{ width: 60, height: 1, background: 'rgba(197,160,89,0.5)' }}
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.65, duration: 0.7 }}
                        className="font-serif italic text-white/55 text-base"
                    >
                        Salmos 46:1-3
                    </motion.p>
                </header>

                {/* ─── NARRATIVE ─── */}
                <main className="max-w-xl mx-auto px-6 pb-32 space-y-16">

                    {/* Párrafo 1 — La escena */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.75 }}
                    >
                        <p className="font-serif text-white/85 leading-[1.9] text-lg">
                            Son las dos de la madrugada. La habitación está en silencio, pero tu
                            cabeza no. Los pensamientos se acumulan como olas, uno detrás del otro,
                            sin parar. El examen de mañana. Lo que dijo aquella persona. Lo que
                            todavía no resolviste. Lo que podría salir mal.
                        </p>
                        <p className="font-serif text-white/85 leading-[1.9] text-lg mt-5">
                            La ansiedad no avisa cuándo llega. Simplemente está ahí,
                            como una marea que sube despacio sin que te des cuenta, hasta que
                            el agua ya te llega al cuello.
                        </p>
                    </motion.section>

                    {/* Separador decorativo */}
                    <Ornament />

                    {/* Párrafo 2 — La metáfora del mar */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.75 }}
                    >
                        <p className="font-serif text-white/85 leading-[1.9] text-lg">
                            Imaginate un marinero en un bote pequeño, en mitad del mar, de noche.
                            No hay luna. El cielo está cerrado de nubes. Las olas sacuden el bote
                            de un lado al otro. No se ve la costa. No se ve nada.
                        </p>
                        <p className="font-serif text-white/85 leading-[1.9] text-lg mt-5">
                            Lo peor no es la tormenta. Lo peor es no saber hacia dónde ir.
                            Cuando todo se mueve, cuando no hay nada fijo, el miedo
                            no es solo al peligro — es a la desorientación total.
                        </p>
                    </motion.section>

                    {/* Versículo destacado */}
                    <motion.blockquote
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7 }}
                        style={{
                            borderLeft: '2px solid rgba(197,160,89,0.6)',
                            paddingLeft: '1.5rem',
                            margin: 0,
                        }}
                    >
                        <p className="font-serif italic text-white/90 text-xl leading-relaxed">
                            "Dios es nuestro amparo y fortaleza,
                            nuestro pronto auxilio en las tribulaciones.
                            Por tanto, no temeremos…"
                        </p>
                        <footer className="mt-4 font-heading text-sabiduria-gold text-sm tracking-widest">
                            Salmos 46:1-2
                        </footer>
                    </motion.blockquote>

                    {/* Párrafo 3 — La Estrella Polar */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.75 }}
                    >
                        <p className="font-serif text-white/85 leading-[1.9] text-lg">
                            Por miles de años, los marineros que se perdían de noche miraban
                            hacia arriba buscando una sola estrella: la Estrella Polar. No es la
                            más brillante del cielo. Pero es la única que no se mueve. Mientras
                            todas las demás giran alrededor de ella, esa se queda fija, apuntando
                            siempre exactamente al norte.
                        </p>
                        <p className="font-serif text-white/85 leading-[1.9] text-lg mt-5">
                            Con eso alcanzaba. No necesitaban que la tormenta parara.
                            No necesitaban ver la costa. Solo necesitaban encontrar ese
                            punto fijo en el cielo, y desde ahí sabían hacia dónde ir.
                        </p>
                    </motion.section>

                    {/* Separador decorativo */}
                    <Ornament />

                    {/* Párrafo 4 — La aplicación */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.75 }}
                    >
                        <p className="font-serif text-white/85 leading-[1.9] text-lg">
                            El Salmo 46 no dice que Dios va a callar tus pensamientos esta noche.
                            No dice que mañana todo va a estar resuelto. Lo que dice es algo más
                            profundo: que Él es el punto fijo cuando todo lo demás se mueve.
                        </p>
                        <p className="font-serif text-white/85 leading-[1.9] text-lg mt-5">
                            La ansiedad miente. Te dice que si no controlás todo, si no tenés
                            respuesta para todo, si no podés asegurar el futuro, entonces estás
                            perdido. Pero hay Alguien que ya tiene el norte. Y no se mueve.
                        </p>
                    </motion.section>

                    {/* Versículo final */}
                    <motion.blockquote
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7 }}
                        style={{
                            borderLeft: '2px solid rgba(197,160,89,0.6)',
                            paddingLeft: '1.5rem',
                            margin: 0,
                        }}
                    >
                        <p className="font-serif italic text-white/90 text-xl leading-relaxed">
                            "…aunque se traspasen los montes al corazón del mar;
                            aunque bramen y se turben sus aguas,
                            aunque tiemblen los montes a causa de su braveza."
                        </p>
                        <footer className="mt-4 font-heading text-sabiduria-gold text-sm tracking-widest">
                            Salmos 46:2-3
                        </footer>
                    </motion.blockquote>

                    {/* Párrafo 5 — Cierre */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.75 }}
                    >
                        <p className="font-serif text-white/85 leading-[1.9] text-lg">
                            Las olas no se van a callar necesariamente esta noche. Los
                            problemas van a seguir siendo problemas mañana. Pero lo que
                            cambia cuando encontrás ese punto fijo es que dejás de estar
                            a la deriva. Tenés norte.
                        </p>
                        <p className="font-serif text-white/85 leading-[1.9] text-lg mt-5">
                            Eso es suficiente para que el bote llegue a casa.
                        </p>
                    </motion.section>

                    {/* Separador final */}
                    <Ornament />

                    {/* Reflexión */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7 }}
                        className="text-center"
                    >
                        <p className="font-heading text-xs uppercase tracking-[0.3em] text-sabiduria-gold/70 mb-6">
                            Para pensar
                        </p>
                        <div className="space-y-4">
                            {[
                                '¿Qué tipo de pensamientos te generan más ansiedad?',
                                '¿Alguna vez sentiste que la oración te ayudó a encontrar el norte?',
                                '¿Qué significa para vos que Dios sea un "pronto auxilio"?',
                            ].map((q, i) => (
                                <p key={i} className="font-serif text-white/55 text-sm leading-relaxed italic">
                                    {i + 1}. {q}
                                </p>
                            ))}
                        </div>
                    </motion.section>

                    {/* Botón volver */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center pt-4"
                    >
                        <Link
                            to="/adolescentes"
                            className="inline-flex items-center gap-2 border border-sabiduria-gold/30 text-sabiduria-gold px-6 py-3 rounded-lg font-heading text-sm font-semibold hover:bg-sabiduria-gold/10 transition-all"
                        >
                            <ArrowLeft size={15} />
                            Ver más historias
                        </Link>
                    </motion.div>
                </main>
            </div>
        </>
    );
};

const Ornament = () => (
    <div className="flex items-center justify-center gap-4 opacity-40">
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.6))' }} />
        <svg width="14" height="14">
            <polygon points="7,0 14,7 7,14 0,7" fill="none" stroke="#C5A059" strokeWidth="1" />
        </svg>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(197,160,89,0.6), transparent)' }} />
    </div>
);

export default HistoriaAnsiedad;
