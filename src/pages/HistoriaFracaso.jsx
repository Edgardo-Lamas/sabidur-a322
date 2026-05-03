import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import SEO from '../components/SEO';

const FADE_IN = {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: 'easeOut' },
};

const HistoriaFracaso = () => {
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const [soundOn, setSoundOn] = useState(false);

    useEffect(() => {
        if (videoRef.current) videoRef.current.playbackRate = 1.0;
    }, []);

    const toggleSound = () => {
        if (!audioRef.current) return;
        if (soundOn) {
            audioRef.current.pause();
        } else {
            audioRef.current.volume = 0.38;
            audioRef.current.play().catch(() => {});
        }
        setSoundOn(!soundOn);
    };

    return (
        <>
            <SEO
                title="El Fracaso y la Segunda Oportunidad — Historias para Jóvenes"
                description="Una historia sobre el fracaso y la restauración. Pedro negó a Jesús tres veces. Pero la historia no terminó ahí."
            />

            {/* ─── VIDEO BACKGROUND fijo ─── */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'fixed', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', zIndex: 0,
                    pointerEvents: 'none',
                }}
                src="/stories/fracaso-bg.mp4"
            />

            {/* ─── AUDIO (fuego suave) ─── */}
            <audio ref={audioRef} loop src="/stories/dawn.mp3" />

            {/* Overlay lectura */}
            <div style={{
                position: 'fixed', inset: 0,
                background: 'linear-gradient(180deg, rgba(5,1,0,0.42) 0%, rgba(8,2,0,0.28) 40%, rgba(5,1,0,0.55) 100%)',
                zIndex: 1, pointerEvents: 'none',
            }} />

            {/* ─── Botón Volver ─── */}
            <Link
                to="/adolescentes"
                style={{
                    position: 'fixed', top: 90, left: 20, zIndex: 40,
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 14px', borderRadius: 40,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(8,2,0,0.72)', backdropFilter: 'blur(14px)',
                    color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600,
                    letterSpacing: '0.03em', textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
                }}
            >
                <ArrowLeft size={14} />
                Volver
            </Link>

            {/* ─── Botón sonido ─── */}
            <button
                onClick={toggleSound}
                title={soundOn ? 'Silenciar' : 'Activar sonido'}
                style={{
                    position: 'fixed', bottom: 90, right: 24, zIndex: 60,
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 16px', borderRadius: 40,
                    border: `1px solid ${soundOn ? 'rgba(200,100,20,0.6)' : 'rgba(255,255,255,0.25)'}`,
                    background: soundOn ? 'rgba(80,20,5,0.55)' : 'rgba(8,2,0,0.75)',
                    backdropFilter: 'blur(14px)',
                    color: soundOn ? 'rgba(240,160,60,0.95)' : 'rgba(255,255,255,0.85)',
                    fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                    letterSpacing: '0.04em', cursor: 'pointer',
                    boxShadow: soundOn
                        ? '0 0 20px rgba(200,80,10,0.25), 0 4px 20px rgba(0,0,0,0.5)'
                        : '0 4px 20px rgba(0,0,0,0.5)',
                }}
            >
                {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                {soundOn ? 'Sonido activo' : 'Activar sonido'}
            </button>

            {/* ─── CONTENIDO ─── */}
            <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

                {/* HEADER */}
                <header className="pt-8 pb-12 px-6 text-center max-w-2xl mx-auto">
                    <motion.div {...FADE_IN} className="mb-4">
                        <span className="font-heading text-xs uppercase tracking-[0.35em] text-sabiduria-gold/60">
                            Fracaso · Restauración · Gracia
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}
                        className="font-heading font-bold text-white leading-tight tracking-tight"
                        style={{ fontSize: 'clamp(2.4rem, 6vw, 3.8rem)' }}
                    >
                        El Fracaso y<br />
                        <span style={{ color: '#C5A059', fontStyle: 'italic' }}>la Segunda Oportunidad</span>
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
                        Juan 21:15-17
                    </motion.p>
                </header>

                {/* NARRATIVA */}
                <main className="max-w-xl mx-auto px-6 pb-32 space-y-16">

                    {/* Párrafo 1 */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.75 }}
                    >
                        <p className="font-serif text-white/85 leading-[1.9] text-lg">
                            Pedro era el más decidido de todos. El que primero bajó del bote para
                            caminar sobre el agua. El que dijo en voz alta lo que los demás
                            pensaban en silencio: "Tú eres el Cristo, el Hijo del Dios viviente."
                            El que sacó la espada cuando vinieron a arrestar a Jesús.
                        </p>
                        <p className="font-serif text-white/85 leading-[1.9] text-lg mt-5">
                            Y también el que, unas horas después, junto a un fuego de carbón
                            en el patio de un sumo sacerdote, dijo tres veces que no lo conocía.
                        </p>
                    </motion.section>

                    <Ornament />

                    {/* Párrafo 2 — el peso del fracaso */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.75 }}
                    >
                        <p className="font-serif text-white/85 leading-[1.9] text-lg">
                            ¿Alguna vez fallaste en algo que prometiste que nunca ibas a hacer?
                            ¿Dijiste algo que no podías retirar? ¿Decepcionaste a alguien que
                            confiaba en vos?
                        </p>
                        <p className="font-serif text-white/85 leading-[1.9] text-lg mt-5">
                            Eso tiene un peso particular. Porque no es solo haber cometido un
                            error — es haber sido quien cometió ese error. El fracaso te dice
                            algo sobre vos: que no sos la persona que creías ser.
                        </p>
                    </motion.section>

                    {/* Versículo */}
                    <motion.blockquote
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7 }}
                        style={{
                            borderLeft: '2px solid rgba(197,160,89,0.6)',
                            paddingLeft: '1.5rem', margin: 0,
                        }}
                    >
                        <p className="font-serif italic text-white/90 text-xl leading-relaxed">
                            "Cuando hubieron comido, Jesús dijo a Simón Pedro:
                            Simón, hijo de Jonás, ¿me amas más que éstos?
                            Le respondió: Sí, Señor; tú sabes que te amo."
                        </p>
                        <footer className="mt-4 font-heading text-sabiduria-gold text-sm tracking-widest">
                            Juan 21:15
                        </footer>
                    </motion.blockquote>

                    {/* Párrafo 3 — el fuego de carbón */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.75 }}
                    >
                        <p className="font-serif text-white/85 leading-[1.9] text-lg">
                            Hay un detalle que Juan menciona y que en español casi no se nota:
                            la conversación después de la resurrección ocurre junto a un
                            <em> fuego de carbón</em>. La misma palabra griega — <em>anthrakia</em> —
                            que aparece solo dos veces en todo el Nuevo Testamento.
                        </p>
                        <p className="font-serif text-white/85 leading-[1.9] text-lg mt-5">
                            La primera vez: el patio donde Pedro niega a Jesús. La segunda vez:
                            la orilla del lago donde Jesús lo restaura. Mismo fuego. Mismo olor.
                            Misma situación. Como si Jesús hubiera elegido el escenario
                            deliberadamente para cubrir cada negación con una afirmación.
                        </p>
                    </motion.section>

                    <Ornament />

                    {/* Párrafo 4 — tres preguntas */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.75 }}
                    >
                        <p className="font-serif text-white/85 leading-[1.9] text-lg">
                            Tres negaciones. Tres preguntas. No es casualidad.
                            Jesús no vino a ignorar lo que pasó — vino a redimirlo.
                            No borró el pasado de Pedro; lo transfiguró. Lo usó
                            como el suelo donde plantar algo nuevo.
                        </p>
                        <p className="font-serif text-white/85 leading-[1.9] text-lg mt-5">
                            "Apacienta mis ovejas." Tres veces el encargo. El mismo
                            hombre que se hundió en la negación es el que recibe la
                            responsabilidad de cuidar lo que Jesús más amaba.
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
                            paddingLeft: '1.5rem', margin: 0,
                        }}
                    >
                        <p className="font-serif italic text-white/90 text-xl leading-relaxed">
                            "Le dijo la tercera vez: Simón, hijo de Jonás,
                            ¿me amas? Pedro se entristeció de que le dijese
                            la tercera vez: ¿Me amas? y le respondió:
                            Señor, tú lo sabes todo; tú sabes que te amo."
                        </p>
                        <footer className="mt-4 font-heading text-sabiduria-gold text-sm tracking-widest">
                            Juan 21:17
                        </footer>
                    </motion.blockquote>

                    {/* Párrafo 5 — cierre */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.75 }}
                    >
                        <p className="font-serif text-white/85 leading-[1.9] text-lg">
                            Tu peor momento no es tu última palabra. El fracaso
                            puede ser el lugar exacto donde Jesús decide buscarte,
                            sentarse con vos, y preguntarte lo único que importa.
                        </p>
                        <p className="font-serif text-white/85 leading-[1.9] text-lg mt-5">
                            No "¿por qué lo hiciste?" No "¿cómo pudiste?"
                            Solo: <em>"¿Me amás?"</em>
                        </p>
                    </motion.section>

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
                                '¿Hay algo en tu pasado que te hace sentir que ya no podés ser usado por Dios?',
                                '¿Qué significa para vos que Jesús restauró a Pedro antes de darle una misión?',
                                '¿En qué momento de tu vida sentiste que Dios te preguntó "¿me amás?"?',
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

export default HistoriaFracaso;
