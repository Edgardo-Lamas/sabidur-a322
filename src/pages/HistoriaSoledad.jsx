import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';

// ─── RAIN DROPS ─────────────────────────────────────────────────────────────
const RAIN = Array.from({ length: 55 }, (_, i) => ({
    left: `${(i * 113.4 + 20) % 100}%`,
    height: `${18 + (i % 5) * 9}px`,
    animDelay: `${(i * 0.19) % 3}s`,
    animDur: `${0.55 + (i % 6) * 0.12}s`,
    opacity: 0.10 + (i % 5) * 0.05,
}));

// ─── CSS ────────────────────────────────────────────────────────────────────
const STYLES = `
@keyframes ken-burns {
    0%   { transform: scale(1)    translateX(0%)   translateY(0%); }
    50%  { transform: scale(1.08) translateX(-2%)  translateY(-1%); }
    100% { transform: scale(1)    translateX(0%)   translateY(0%); }
}
@keyframes aurora-shift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
@keyframes rain-drop {
    0%   { transform: translateY(-30px) translateX(0px); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(100vh) translateX(20px); opacity: 0; }
}
@keyframes fog-drift {
    0%   { transform: translateX(-5%) scaleX(1); }
    50%  { transform: translateX(3%) scaleX(1.05); }
    100% { transform: translateX(-5%) scaleX(1); }
}
`;

// ─── COMPONENT ──────────────────────────────────────────────────────────────

const HistoriaSoledad = () => {
    const audioRef = useRef(null);
    const [soundOn, setSoundOn] = useState(false);

    const toggleSound = () => {
        if (!audioRef.current) return;
        if (soundOn) {
            audioRef.current.pause();
        } else {
            audioRef.current.volume = 0.35;
            audioRef.current.play().catch(() => {});
        }
        setSoundOn(!soundOn);
    };

    return (
        <>
            <SEO
                title="El Dios que Me Ve — Historias para Jóvenes"
                description="Una historia sobre la soledad y ser visto. Hay un Dios que conoce tu nombre aunque te sientas invisible."
                url="/adolescentes/historias/soledad"
            />

            <style>{STYLES}</style>

            {/* ─── AUDIO (lluvia suave) ─── */}
            <audio ref={audioRef} loop src="/stories/rain.mp3" />

            {/* ═══════════════════════════════════════════════
                FONDO FIJO: cielo aurora + ciudad + lluvia
            ════════════════════════════════════════════════ */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: '#05060F' }}>

                {/* Foto base — ciudad nocturna aérea (Unsplash) */}
                <img
                    src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&h=1080&q=85"
                    alt=""
                    style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'center',
                        filter: 'brightness(0.5) saturate(0.7) hue-rotate(20deg)',
                        animation: 'ken-burns 28s ease-in-out infinite',
                        transformOrigin: 'center center',
                    }}
                />

                {/* Tinte azul-índigo sobre la foto */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(5,8,30,0.55) 0%, rgba(8,12,40,0.3) 50%, rgba(3,5,18,0.65) 100%)',
                }} />

                {/* Aurora sutil en el cielo */}
                <div style={{
                    position: 'absolute', top: 0, left: '-10%', right: '-10%', height: '45%',
                    background: 'linear-gradient(100deg, transparent 0%, rgba(20,30,100,0.25) 30%, rgba(30,20,90,0.3) 55%, rgba(15,35,110,0.22) 75%, transparent 100%)',
                    animation: 'aurora-shift 18s ease-in-out infinite',
                    filter: 'blur(45px)',
                    opacity: 0.7,
                }} />

                {/* LLUVIA */}
                {RAIN.map((r, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        left: r.left,
                        top: 0,
                        width: 1,
                        height: r.height,
                        background: `rgba(160,185,230,${r.opacity})`,
                        transform: 'rotate(8deg)',
                        animation: `rain-drop ${r.animDur} linear ${r.animDelay} infinite`,
                        transformOrigin: 'top',
                    }} />
                ))}

                {/* Niebla baja */}
                <div style={{
                    position: 'absolute', bottom: '28%', left: '-5%', right: '-5%', height: 90,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(10,15,40,0.3) 50%, transparent 100%)',
                    animation: 'fog-drift 20s ease-in-out infinite',
                    filter: 'blur(20px)',
                }} />

                {/* Velo inferior */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '15%',
                    background: 'linear-gradient(180deg, transparent, rgba(3,4,10,0.92))',
                }} />
            </div>

            {/* ─── Overlay de lectura — muy sutil ─── */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
                background: 'linear-gradient(180deg, rgba(0,2,12,0.3) 0%, rgba(0,3,15,0.15) 40%, rgba(0,2,12,0.45) 100%)',
            }} />

            {/* ─── BOTÓN VOLVER ─── */}
            <Link
                to="/adolescentes"
                style={{
                    position: 'fixed', top: 90, left: 20, zIndex: 40,
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 14px', borderRadius: 40,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(0,3,15,0.72)', backdropFilter: 'blur(14px)',
                    color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600,
                    letterSpacing: '0.03em', textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
                }}
            >
                <ArrowLeft size={14} />
                Volver
            </Link>

            {/* ─── BOTÓN SONIDO ─── */}
            <button
                onClick={toggleSound}
                style={{
                    position: 'fixed', bottom: 90, right: 24, zIndex: 60,
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 16px', borderRadius: 40,
                    border: `1px solid ${soundOn ? 'rgba(100,140,220,0.6)' : 'rgba(255,255,255,0.22)'}`,
                    background: soundOn ? 'rgba(20,40,100,0.55)' : 'rgba(0,3,15,0.75)',
                    backdropFilter: 'blur(14px)',
                    color: soundOn ? 'rgba(160,200,255,0.95)' : 'rgba(255,255,255,0.8)',
                    fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                }}
            >
                {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                {soundOn ? 'Lluvia activa' : 'Activar lluvia'}
            </button>

            {/* ═══════════════════════════════════════════════
                CONTENIDO NARRATIVO
            ════════════════════════════════════════════════ */}
            <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

                {/* HEADER */}
                <header className="pt-24 pb-14 px-6 text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mb-4"
                    >
                        <span className="font-heading text-xs uppercase tracking-[0.35em]"
                            style={{ color: 'rgba(130,160,230,0.65)' }}>
                            Soledad · Invisibilidad · Ser visto
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
                        className="font-heading font-bold text-white leading-tight tracking-tight"
                        style={{ fontSize: 'clamp(2.4rem, 6vw, 3.8rem)' }}
                    >
                        El Dios<br />
                        <span style={{ color: '#8AADFF', fontStyle: 'italic' }}>que Me Ve</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="mx-auto mt-8 mb-6"
                        style={{ width: 50, height: 1, background: 'rgba(130,160,230,0.45)' }}
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.75, duration: 0.7 }}
                        className="font-serif italic text-sm"
                        style={{ color: 'rgba(180,200,255,0.45)' }}
                    >
                        Génesis 16:13 · El-Roi
                    </motion.p>
                </header>

                {/* NARRATIVE */}
                <main className="max-w-xl mx-auto px-6 pb-32 space-y-16">

                    {/* P1 */}
                    <NarrSection>
                        <p className="font-serif leading-[1.95] text-lg" style={{ color: 'rgba(220,230,255,0.82)' }}>
                            Son las once de la noche. El teléfono brilla en la oscuridad. Scrolleás
                            sin parar: fotos de salidas, grupos de amigos, momentos que vos no
                            estás. Todo el mundo parece estar en algún lado, con alguien.
                            Vos, en tu cuarto, solo.
                        </p>
                        <p className="font-serif leading-[1.95] text-lg mt-5" style={{ color: 'rgba(220,230,255,0.82)' }}>
                            La soledad no siempre es estar físicamente solo. A veces es estar
                            en un aula llena de gente y sentir que nadie realmente te ve.
                            Que si no vinieras mañana, habría que pensar un rato
                            para darse cuenta.
                        </p>
                    </NarrSection>

                    <Ornament color="rgba(100,130,220,0.4)" />

                    {/* P2 — ventanas */}
                    <NarrSection>
                        <p className="font-serif leading-[1.95] text-lg" style={{ color: 'rgba(220,230,255,0.82)' }}>
                            Mirás por la ventana y ves el edificio de enfrente. Cien ventanas
                            encendidas. Cien cuadraditos de luz. En cada uno hay alguien
                            — comiendo solo, mirando una pantalla, hablando en voz baja
                            por teléfono. Cada uno en su mundo.
                        </p>
                        <p className="font-serif leading-[1.95] text-lg mt-5" style={{ color: 'rgba(220,230,255,0.82)' }}>
                            Una ciudad de millones de personas, y cada una un universo cerrado.
                            La modernidad nos dio más formas de conectarnos que ninguna época
                            anterior en la historia, y aun así la soledad creció.
                        </p>
                    </NarrSection>

                    {/* Versículo */}
                    <Quote color="rgba(100,140,230,0.55)" textColor="rgba(180,210,255,0.9)" ref_="Génesis 16:13">
                        "Entonces ella llamó el nombre de Jehová que hablaba con ella:
                        Tú eres el Dios que me ve."
                    </Quote>

                    {/* P3 — Agar */}
                    <NarrSection>
                        <p className="font-serif leading-[1.95] text-lg" style={{ color: 'rgba(220,230,255,0.82)' }}>
                            Agar era una esclava egipcia en la casa de Abraham. No tenía nombre
                            en los titulares de la historia. Era el personaje secundario del
                            personaje secundario. Nadie pensaba en ella cuando pensaban en
                            los grandes temas de la Biblia.
                        </p>
                        <p className="font-serif leading-[1.95] text-lg mt-5" style={{ color: 'rgba(220,230,255,0.82)' }}>
                            Y un día la echaron. Sola, embarazada, en el desierto. Sin
                            agua, sin destino. La persona más invisible en la historia más
                            importante del Antiguo Testamento.
                        </p>
                    </NarrSection>

                    <Ornament color="rgba(100,130,220,0.4)" />

                    {/* P4 — El encuentro */}
                    <NarrSection>
                        <p className="font-serif leading-[1.95] text-lg" style={{ color: 'rgba(220,230,255,0.82)' }}>
                            Dios la encontró ahí. No en el templo, no en una montaña sagrada.
                            En el desierto, al borde de un manantial, cuando nadie más la
                            estaba buscando. Le habló. Le preguntó su nombre. Le dijo lo que
                            vendría.
                        </p>
                        <p className="font-serif leading-[1.95] text-lg mt-5" style={{ color: 'rgba(220,230,255,0.82)' }}>
                            Y Agar hizo algo que nadie más en la Biblia hace: le puso un nombre
                            a Dios. Ella, una esclava fugitiva en el desierto, le dio a Dios
                            el nombre que lo define mejor que cualquier título oficial:
                            <em style={{ color: '#8AADFF' }}> El-Roi</em>.
                        </p>
                    </NarrSection>

                    {/* Versículo destacado */}
                    <Quote color="rgba(100,140,230,0.55)" textColor="rgba(180,210,255,0.9)" ref_="El-Roi — El Dios que me ve">
                        "¿No he visto yo aquí al que me ve?"
                    </Quote>

                    {/* P5 — El cierre */}
                    <NarrSection>
                        <p className="font-serif leading-[1.95] text-lg" style={{ color: 'rgba(220,230,255,0.82)' }}>
                            La soledad miente. Te dice que eres invisible, que no importás lo
                            suficiente, que nadie te está buscando. Pero hay algo más verdadero
                            que eso: antes de que nadie supiera tu nombre, había Alguien que
                            ya te estaba viendo.
                        </p>
                        <p className="font-serif leading-[1.95] text-lg mt-5" style={{ color: 'rgba(220,230,255,0.82)' }}>
                            Ser visto por Dios no es una metáfora religiosa. Es la afirmación
                            más radical que existe: que tu vida importa no porque alguien
                            le dio "me gusta", sino porque el que hizo el universo te conoce
                            por nombre, y eso es inamovible.
                        </p>
                        <p className="font-serif leading-[1.95] text-lg mt-5" style={{ color: 'rgba(220,230,255,0.82)' }}>
                            Las ventanas de ese edificio van a apagarse una a una. Pero
                            <em style={{ color: '#8AADFF' }}> El-Roi</em> no parpadea.
                        </p>
                    </NarrSection>

                    <Ornament color="rgba(100,130,220,0.4)" />

                    {/* Reflexión */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <BookOpen size={14} style={{ color: 'rgba(130,160,230,0.6)' }} />
                            <span className="font-heading text-xs uppercase tracking-[0.3em]"
                                style={{ color: 'rgba(130,160,230,0.6)' }}>Para pensar</span>
                        </div>
                        <div className="space-y-4">
                            {[
                                '¿Hubo algún momento en que te sentiste completamente invisible para los demás?',
                                '¿Qué diferencia hay entre buscar ser visto por personas y ser visto por Dios?',
                                '¿Qué te cambia saber que Agar — una persona "sin importancia" — le dio un nombre a Dios?',
                            ].map((q, i) => (
                                <p key={i} className="font-serif text-sm leading-relaxed italic"
                                    style={{ color: 'rgba(160,185,240,0.5)' }}>
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
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-heading text-sm font-semibold transition-all"
                            style={{
                                border: '1px solid rgba(100,140,230,0.3)',
                                color: '#8AADFF',
                                background: 'rgba(10,20,60,0.4)',
                                backdropFilter: 'blur(8px)',
                            }}
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

// ─── SUB-COMPONENTES ─────────────────────────────────────────────────────────

const NarrSection = ({ children }) => (
    <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-55px' }}
        transition={{ duration: 0.75 }}
    >
        {children}
    </motion.section>
);

const Quote = ({ children, color, textColor, ref_ }) => (
    <motion.blockquote
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-55px' }}
        transition={{ duration: 0.7 }}
        style={{ borderLeft: `2px solid ${color}`, paddingLeft: '1.5rem', margin: 0 }}
    >
        <p className="font-serif italic text-xl leading-relaxed" style={{ color: textColor }}>
            {children}
        </p>
        <footer className="mt-4 font-heading text-xs tracking-widest" style={{ color: 'rgba(130,160,230,0.65)' }}>
            {ref_}
        </footer>
    </motion.blockquote>
);

const Ornament = ({ color }) => (
    <div className="flex items-center justify-center gap-4" style={{ opacity: 0.45 }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color})` }} />
        <svg width="12" height="12">
            <polygon points="6,0 12,6 6,12 0,6" fill="none" stroke={color} strokeWidth="1" />
        </svg>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
);

export default HistoriaSoledad;
