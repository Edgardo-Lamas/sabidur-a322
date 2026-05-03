import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';

// ─── CSS ANIMATIONS ──────────────────────────────────────────────────────────
const STYLES = `
@keyframes ken-burns-id {
    0%   { transform: scale(1.06) translateX(1%)  translateY(0%); }
    50%  { transform: scale(1)    translateX(-1%) translateY(-1%); }
    100% { transform: scale(1.06) translateX(1%)  translateY(0%); }
}
@keyframes dawn-glow {
    0%   { opacity: 0.55; transform: scaleX(1) scaleY(1); }
    50%  { opacity: 0.78; transform: scaleX(1.08) scaleY(1.12); }
    100% { opacity: 0.55; transform: scaleX(1) scaleY(1); }
}
@keyframes mist-drift {
    0%   { transform: translateX(-4%) scaleX(1); opacity: 0.6; }
    50%  { transform: translateX(3%) scaleX(1.06); opacity: 0.85; }
    100% { transform: translateX(-4%) scaleX(1); opacity: 0.6; }
}
@keyframes mist-drift-slow {
    0%   { transform: translateX(3%) scaleX(1); opacity: 0.45; }
    50%  { transform: translateX(-5%) scaleX(1.04); opacity: 0.65; }
    100% { transform: translateX(3%) scaleX(1); opacity: 0.45; }
}
@keyframes ray-pulse {
    0%,100% { opacity: 0.07; }
    50%     { opacity: 0.16; }
}
@keyframes dust-float {
    0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 0.8; }
    100% { transform: translateY(-120px) translateX(30px); opacity: 0; }
}
@keyframes horizon-breathe {
    0%,100% { opacity: 0.82; }
    50%      { opacity: 1; }
}
`;

// ─── DUST PARTICLES (light caught in dawn rays) ───────────────────────────
const DUST = Array.from({ length: 28 }, (_, i) => ({
    left: `${30 + (i * 67.3 + 20) % 40}%`,
    bottom: `${20 + (i * 37.1) % 35}%`,
    size: 1.5 + (i % 4) * 0.8,
    delay: `${(i * 0.4) % 8}s`,
    dur: `${5 + (i % 5) * 1.8}s`,
    opacity: 0.3 + (i % 4) * 0.15,
}));

// ─── COMPONENT ───────────────────────────────────────────────────────────────
const HistoriaIdentidad = () => {
    const audioRef = useRef(null);
    const [soundOn, setSoundOn] = useState(false);

    const toggleSound = () => {
        if (!audioRef.current) return;
        if (soundOn) {
            audioRef.current.pause();
        } else {
            audioRef.current.volume = 0.4;
            audioRef.current.play().catch(() => {});
        }
        setSoundOn(!soundOn);
    };

    return (
        <>
            <SEO
                title="¿Quién Soy? — Historias para Jóvenes"
                description="Una historia sobre identidad. Antes de que alguien te dijera quién tenías que ser, fuiste hecho a imagen de Dios."
            />

            <style>{STYLES}</style>
            <audio ref={audioRef} loop src="/stories/dawn.mp3" />

            {/* ═══════════════════════════════════════
                FONDO: amanecer sobre montañas
            ══════════════════════════════════════ */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: '#0D0520' }}>

                {/* Foto base — montañas al amanecer (Unsplash) */}
                <img
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&h=1080&q=85"
                    alt=""
                    style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'center 40%',
                        filter: 'brightness(0.6) saturate(1.1)',
                        animation: 'ken-burns-id 32s ease-in-out infinite',
                        transformOrigin: 'center 40%',
                    }}
                />

                {/* Tinte cálido — refuerza los tonos dorados del amanecer */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(10,3,20,0.5) 0%, rgba(20,8,5,0.2) 45%, rgba(5,2,12,0.55) 100%)',
                }} />

                {/* Resplandor en el horizonte — sobre la foto */}
                <div style={{
                    position: 'absolute', bottom: '30%', left: '50%',
                    transform: 'translate(-50%, 50%)',
                    width: '65%', height: 220,
                    background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(240,160,30,0.4) 0%, rgba(180,80,10,0.2) 45%, transparent 75%)',
                    animation: 'dawn-glow 6s ease-in-out infinite',
                    filter: 'blur(12px)',
                }} />

                {/* Rayos de luz desde el horizonte */}
                {[
                    { left: '46%', rotate: '-8deg', w: 3 },
                    { left: '49%', rotate: '-2deg', w: 5 },
                    { left: '50%', rotate: '0deg',  w: 7 },
                    { left: '51%', rotate: '3deg',  w: 5 },
                    { left: '54%', rotate: '9deg',  w: 3 },
                    { left: '42%', rotate: '-18deg',w: 2 },
                    { left: '58%', rotate: '18deg', w: 2 },
                ].map((r, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        bottom: '30%', left: r.left,
                        width: `${r.w}px`, height: '60%',
                        background: 'linear-gradient(0deg, rgba(240,180,40,0.18) 0%, transparent 100%)',
                        transformOrigin: 'bottom center',
                        transform: `rotate(${r.rotate})`,
                        animation: `ray-pulse ${4 + i * 0.7}s ease-in-out ${i * 0.4}s infinite`,
                        filter: 'blur(5px)',
                    }} />
                ))}

                {/* NIEBLA capa 1 */}
                <div style={{
                    position: 'absolute', bottom: '28%', left: '-5%', right: '-5%', height: 100,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(200,120,20,0.1) 40%, rgba(220,140,30,0.14) 60%, transparent 100%)',
                    animation: 'mist-drift 22s ease-in-out infinite',
                    filter: 'blur(25px)',
                }} />
                {/* NIEBLA capa 2 */}
                <div style={{
                    position: 'absolute', bottom: '32%', left: '-8%', right: '-8%', height: 80,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(180,90,15,0.07) 50%, transparent 100%)',
                    animation: 'mist-drift-slow 30s ease-in-out infinite',
                    filter: 'blur(35px)',
                }} />

                {/* PARTÍCULAS DE POLVO dorado */}
                {DUST.map((d, i) => (
                    <div key={i} style={{
                        position: 'absolute', left: d.left, bottom: d.bottom,
                        width: d.size, height: d.size, borderRadius: '50%',
                        background: 'rgba(255,210,80,0.9)',
                        animation: `dust-float ${d.dur} ease-in-out ${d.delay} infinite`,
                        opacity: d.opacity,
                        filter: 'blur(0.5px)',
                    }} />
                ))}

                {/* Velo inferior */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '12%',
                    background: 'linear-gradient(180deg, transparent, rgba(5,1,12,0.9))',
                }} />
            </div>

            {/* Overlay lectura */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
                background: 'linear-gradient(180deg, rgba(5,1,15,0.4) 0%, rgba(8,2,20,0.15) 45%, rgba(5,1,15,0.5) 100%)',
            }} />

            {/* ─── BOTÓN VOLVER ─── */}
            <Link
                to="/adolescentes"
                style={{
                    position: 'fixed', top: 90, left: 20, zIndex: 40,
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 14px', borderRadius: 40,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(5,1,15,0.72)', backdropFilter: 'blur(14px)',
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
                    border: `1px solid ${soundOn ? 'rgba(230,160,30,0.6)' : 'rgba(255,255,255,0.22)'}`,
                    background: soundOn ? 'rgba(80,40,5,0.6)' : 'rgba(5,1,15,0.75)',
                    backdropFilter: 'blur(14px)',
                    color: soundOn ? 'rgba(240,185,60,0.95)' : 'rgba(255,255,255,0.8)',
                    fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                }}
            >
                {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                {soundOn ? 'Amanecer activo' : 'Activar amanecer'}
            </button>

            {/* ═══════════════════════════════════════
                CONTENIDO NARRATIVO
            ══════════════════════════════════════ */}
            <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

                <header className="pt-24 pb-14 px-6 text-center max-w-2xl mx-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
                        <span className="font-heading text-xs uppercase tracking-[0.35em]"
                            style={{ color: 'rgba(220,150,40,0.65)' }}>
                            Identidad · Imagen · Propósito
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
                        className="font-heading font-bold text-white leading-tight tracking-tight mt-4"
                        style={{ fontSize: 'clamp(2.4rem, 6vw, 3.8rem)' }}
                    >
                        ¿Quién<br />
                        <span style={{ color: '#E8A020', fontStyle: 'italic' }}>Soy Yo?</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="mx-auto mt-8 mb-6"
                        style={{ width: 50, height: 1, background: 'rgba(230,160,30,0.45)' }}
                    />

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.7 }}
                        className="font-serif italic text-sm" style={{ color: 'rgba(220,160,50,0.45)' }}>
                        Génesis 1:27 · Imago Dei
                    </motion.p>
                </header>

                <main className="max-w-xl mx-auto px-6 pb-32 space-y-16">

                    <NarrSection>
                        <p className="font-serif leading-[1.95] text-lg" style={{ color: 'rgba(240,220,190,0.82)' }}>
                            Tenés diecisiete años y en tu teléfono hay dos fotos de perfil distintas.
                            Una para Instagram, otra actitud para el grupo de WhatsApp, otra versión
                            para tus padres. Cada versión es tuya, pero ninguna es completa.
                            En algún momento del día te preguntás, sin decírselo a nadie: ¿cuál es la real?
                        </p>
                        <p className="font-serif leading-[1.95] text-lg mt-5" style={{ color: 'rgba(240,220,190,0.82)' }}>
                            Todo el mundo parece tener la respuesta antes que vos.
                            Tus padres saben quién querés que seas. Tus amigos saben qué estilo
                            te queda. Las redes saben qué tipo de contenido "sos". Todos saben.
                            Menos vos.
                        </p>
                    </NarrSection>

                    <Ornament color="rgba(220,150,30,0.4)" />

                    <NarrSection>
                        <p className="font-serif leading-[1.95] text-lg" style={{ color: 'rgba(240,220,190,0.82)' }}>
                            El problema es que todas esas definiciones se construyen sobre arena.
                            Si tu identidad depende de los likes, se derrumba cuando nadie te ve.
                            Si depende de las notas, se cae cuando reprobás. Si depende de lo que
                            dicen tus amigos, desaparece cuando ellos se van.
                        </p>
                        <p className="font-serif leading-[1.95] text-lg mt-5" style={{ color: 'rgba(240,220,190,0.82)' }}>
                            La pregunta "¿quién soy?" no se puede responder desde afuera.
                            Y la cultura moderna lo intenta todo el tiempo, y falla todo el tiempo.
                        </p>
                    </NarrSection>

                    <Quote color="rgba(220,150,30,0.5)" textColor="rgba(245,215,150,0.92)" ref_="Génesis 1:27">
                        "Y creó Dios al hombre a su imagen, a imagen de Dios lo creó."
                    </Quote>

                    <NarrSection>
                        <p className="font-serif leading-[1.95] text-lg" style={{ color: 'rgba(240,220,190,0.82)' }}>
                            <em style={{ color: '#E8A020' }}>Imago Dei.</em> Imagen de Dios.
                            Estas dos palabras en latín son la declaración de identidad más radical
                            que existe. No dicen que sos valioso porque sos inteligente, talentoso
                            o exitoso. Dicen que llevás impresa la imagen del que hizo todo.
                        </p>
                        <p className="font-serif leading-[1.95] text-lg mt-5" style={{ color: 'rgba(240,220,190,0.82)' }}>
                            Antes de que nadie supiera tu nombre. Antes de tu primer logro o tu
                            primer fracaso. Antes de que tuvieras opiniones, gustos o seguidores.
                            Ya eras portador de algo que ningún ser humano puede darte ni quitarte.
                        </p>
                    </NarrSection>

                    <Ornament color="rgba(220,150,30,0.4)" />

                    <NarrSection>
                        <p className="font-serif leading-[1.95] text-lg" style={{ color: 'rgba(240,220,190,0.82)' }}>
                            Una montaña no necesita demostrar que es una montaña.
                            No cambia de forma según quien la mire. No necesita que el valle
                            la valide. Es lo que es, desde antes de que alguien llegara a nombrarla.
                        </p>
                        <p className="font-serif leading-[1.95] text-lg mt-5" style={{ color: 'rgba(240,220,190,0.82)' }}>
                            Vos sos así. Hay algo en vos que fue establecido antes del ruido,
                            antes de las expectativas, antes de las redes. No tenés que encontrarte
                            a vos mismo como si fueras algo perdido. Solo tenés que recordar
                            quién sos cuando el ruido para.
                        </p>
                    </NarrSection>

                    <Quote color="rgba(220,150,30,0.5)" textColor="rgba(245,215,150,0.92)" ref_="Salmos 139:14">
                        "Te alabo, porque formidables y maravillosas son tus obras;
                        estoy maravillado, y mi alma lo sabe muy bien."
                    </Quote>

                    <NarrSection>
                        <p className="font-serif leading-[1.95] text-lg" style={{ color: 'rgba(240,220,190,0.82)' }}>
                            El amanecer no pide permiso para salir. Cada mañana la luz rompe
                            la oscuridad porque eso es lo que hace la luz. No porque el mundo
                            la espere. No porque todos estén de acuerdo. Simplemente porque
                            esa es su naturaleza.
                        </p>
                        <p className="font-serif leading-[1.95] text-lg mt-5" style={{ color: 'rgba(240,220,190,0.82)' }}>
                            Cuando dejás de preguntarte qué versión de vos le gusta más a los demás,
                            y empezás a vivir desde lo que ya sos — portador de la imagen de Dios —
                            algo cambia. No la vida afuera. Algo más profundo.
                            El suelo bajo tus pies se vuelve firme.
                        </p>
                    </NarrSection>

                    <Ornament color="rgba(220,150,30,0.4)" />

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <BookOpen size={14} style={{ color: 'rgba(220,155,40,0.6)' }} />
                            <span className="font-heading text-xs uppercase tracking-[0.3em]"
                                style={{ color: 'rgba(220,155,40,0.6)' }}>Para pensar</span>
                        </div>
                        <div className="space-y-4">
                            {[
                                '¿De qué depende más tu identidad hoy: de lo que Dios dice de vos o de lo que otros dicen?',
                                '¿Qué versión de vos mostrás en público que no coincide con quién sos en privado?',
                                '¿Qué cambiaría en tu vida si creyeras de verdad que sos imagen de Dios?',
                            ].map((q, i) => (
                                <p key={i} className="font-serif text-sm leading-relaxed italic"
                                    style={{ color: 'rgba(220,185,110,0.5)' }}>
                                    {i + 1}. {q}
                                </p>
                            ))}
                        </div>
                    </motion.section>

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
                                border: '1px solid rgba(220,150,30,0.3)',
                                color: '#E8A020',
                                background: 'rgba(40,15,0,0.4)',
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
        <footer className="mt-4 font-heading text-xs tracking-widest" style={{ color: 'rgba(220,160,50,0.6)' }}>
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

export default HistoriaIdentidad;
