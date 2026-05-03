import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';

// ─── CITY DATA (deterministic, no random) ───────────────────────────────────

const BASE_Y = 400;
const BUILDINGS = [
    { x: 0,    w: 88,  h: 258 },
    { x: 93,   w: 62,  h: 172 },
    { x: 160,  w: 112, h: 325 },
    { x: 277,  w: 72,  h: 198 },
    { x: 354,  w: 48,  h: 135 },
    { x: 407,  w: 96,  h: 148 },
    { x: 508,  w: 58,  h: 265 },
    { x: 571,  w: 82,  h: 112 },
    { x: 658,  w: 128, h: 290 },
    { x: 791,  w: 62,  h: 205 },
    { x: 858,  w: 98,  h: 350 },
    { x: 961,  w: 72,  h: 185 },
    { x: 1038, w: 108, h: 152 },
    { x: 1151, w: 62,  h: 255 },
    { x: 1218, w: 88,  h: 178 },
    { x: 1311, w: 102, h: 228 },
    { x: 1418, w: 82,  h: 298 },
];

const WIN_W = 8, WIN_H = 10, WIN_GX = 6, WIN_GY = 6, PAD = 10;

function buildWindows(buildings) {
    const wins = [];
    buildings.forEach((b, bi) => {
        const cols = Math.max(1, Math.floor((b.w - PAD * 2 + WIN_GX) / (WIN_W + WIN_GX)));
        const rows = Math.max(1, Math.floor((b.h - PAD - 45 + WIN_GY) / (WIN_H + WIN_GY)));
        const startX = b.x + Math.floor((b.w - (cols * (WIN_W + WIN_GX) - WIN_GX)) / 2);
        const startY = BASE_Y - b.h + PAD;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const seed = (bi * 17 + r * 7 + c * 3) % 10;
                wins.push({
                    id: `${bi}-${r}-${c}`,
                    x: startX + c * (WIN_W + WIN_GX),
                    y: startY + r * (WIN_H + WIN_GY),
                    lit: seed < 4,  // ~40% lit
                });
            }
        }
    });
    return wins;
}

// 3 specific windows will "flicker" — people awake at 3am
const FLICKER_IDS = ['2-3-2', '8-6-1', '10-2-3'];

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
@keyframes win-flicker {
    0%,100% { opacity: 1; }
    30%     { opacity: 0.2; }
    50%     { opacity: 0.85; }
    70%     { opacity: 0.15; }
    85%     { opacity: 0.9; }
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
    const [flickerOn, setFlickerOn] = useState({});
    const windows = useMemo(() => buildWindows(BUILDINGS), []);

    // Randomly toggle flickering windows
    useEffect(() => {
        const tick = () => {
            const next = {};
            FLICKER_IDS.forEach(id => {
                next[id] = Math.random() > 0.35;
            });
            setFlickerOn(next);
        };
        tick();
        const interval = setInterval(tick, 2800);
        return () => clearInterval(interval);
    }, []);

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
            />

            <style>{STYLES}</style>

            {/* ─── AUDIO (lluvia suave) ─── */}
            <audio ref={audioRef} loop src="/stories/rain.mp3" />

            {/* ═══════════════════════════════════════════════
                FONDO FIJO: cielo aurora + ciudad + lluvia
            ════════════════════════════════════════════════ */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: '#05060F' }}>

                {/* Cielo aurora — gradiente animado */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, #05060F 0%, #0A0D25 18%, #0D1040 32%, #0A1535 48%, #080C28 65%, #050815 80%, #03050D 100%)',
                }} />
                <div style={{
                    position: 'absolute', top: 0, left: '-10%', right: '-10%', height: '55%',
                    background: 'linear-gradient(100deg, transparent 0%, rgba(30,20,80,0.35) 20%, rgba(20,50,120,0.45) 38%, rgba(40,20,90,0.3) 55%, rgba(15,35,100,0.38) 72%, transparent 100%)',
                    backgroundSize: '300% 300%',
                    animation: 'aurora-shift 18s ease-in-out infinite',
                    filter: 'blur(40px)',
                    opacity: 0.85,
                }} />
                {/* Segunda capa aurora, fase diferente */}
                <div style={{
                    position: 'absolute', top: '5%', left: '-15%', right: '-15%', height: '40%',
                    background: 'linear-gradient(110deg, transparent 10%, rgba(20,15,70,0.28) 30%, rgba(60,30,110,0.22) 50%, rgba(20,60,130,0.28) 70%, transparent 90%)',
                    backgroundSize: '200% 200%',
                    animation: 'aurora-shift 24s ease-in-out infinite reverse',
                    filter: 'blur(50px)',
                    opacity: 0.6,
                }} />

                {/* Estrellas (escasas — ciudad opaca el cielo) */}
                {[
                    [120,45],[280,30],[440,65],[600,22],[750,50],[920,38],[1100,55],[1300,28],[200,80],[850,70],[1050,42],
                ].map(([x,y], i) => (
                    <div key={i} style={{
                        position: 'absolute', left: x, top: y,
                        width: 1.5 + (i%3)*0.5, height: 1.5 + (i%3)*0.5,
                        borderRadius: '50%', background: '#ffffff',
                        opacity: 0.25 + (i%4)*0.1,
                    }} />
                ))}

                {/* Niebla baja sobre los edificios */}
                <div style={{
                    position: 'absolute', bottom: '32%', left: '-5%', right: '-5%', height: 80,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(10,15,40,0.35) 50%, transparent 100%)',
                    animation: 'fog-drift 20s ease-in-out infinite',
                    filter: 'blur(18px)',
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

                {/* SKYLINE — SVG ciudad */}
                <svg
                    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '52%' }}
                    viewBox="0 0 1500 400"
                    preserveAspectRatio="xMidYMax slice"
                >
                    <defs>
                        <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#080A18" />
                            <stop offset="100%" stopColor="#060810" />
                        </linearGradient>
                        {/* Glow para ventanas encendidas */}
                        <filter id="winGlow">
                            <feGaussianBlur stdDeviation="2.5" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>

                    {/* Edificios */}
                    {BUILDINGS.map((b, i) => (
                        <rect key={i}
                            x={b.x} y={BASE_Y - b.h}
                            width={b.w} height={b.h}
                            fill="url(#buildingGrad)"
                        />
                    ))}

                    {/* Reflejos de ciudad en el suelo (calle mojada) */}
                    <rect x="0" y={BASE_Y} width="1500" height="30" fill="rgba(8,10,22,0.95)" />
                    {BUILDINGS.filter((_, i) => i % 3 === 0).map((b, i) => (
                        <rect key={i}
                            x={b.x + b.w * 0.2}
                            y={BASE_Y + 2}
                            width={b.w * 0.6}
                            height={8 + (b.h % 10)}
                            fill={`rgba(20,40,80,${0.08 + (i % 3) * 0.04})`}
                            style={{ filter: 'blur(3px)' }}
                        />
                    ))}

                    {/* Ventanas */}
                    <g filter="url(#winGlow)">
                        {windows.map(w => {
                            const isFlicker = FLICKER_IDS.includes(w.id);
                            const isLit = isFlicker ? flickerOn[w.id] : w.lit;
                            if (!isLit) return (
                                <rect key={w.id} x={w.x} y={w.y} width={WIN_W} height={WIN_H}
                                    fill="rgba(15,20,40,0.8)" />
                            );
                            // Ventana encendida: color varía entre cálido (alguien despierto) y frío (pantalla)
                            const seed = parseInt(w.id.replace(/-/g, '')) % 10;
                            const color = seed < 3
                                ? 'rgba(255,220,130,0.85)'   // luz cálida — alguien leyendo
                                : seed < 7
                                    ? 'rgba(200,215,255,0.7)' // luz fría — pantalla de computadora/TV
                                    : 'rgba(255,200,100,0.6)'; // luz tenue
                            return (
                                <rect key={w.id} x={w.x} y={w.y} width={WIN_W} height={WIN_H}
                                    fill={color}
                                    style={isFlicker ? { animation: 'win-flicker 2.8s ease-in-out infinite' } : {}}
                                />
                            );
                        })}
                    </g>

                    {/* Antenas y tanques de agua en algunos edificios */}
                    <line x1="220" y1={BASE_Y - 325} x2="220" y2={BASE_Y - 355} stroke="#060810" strokeWidth="2" />
                    <line x1="219" y1={BASE_Y - 355} x2="228" y2={BASE_Y - 345} stroke="#060810" strokeWidth="1" />
                    <line x1="902" y1={BASE_Y - 350} x2="902" y2={BASE_Y - 378} stroke="#060810" strokeWidth="2.5" />
                    {/* Tanque de agua */}
                    <ellipse cx="902" cy={BASE_Y - 378} rx="9" ry="6" fill="#060810" />
                    <rect x="894" y={BASE_Y - 385} width="16" height="14" rx="3" fill="#060810" />
                </svg>

                {/* Velo oscuro inferior (calle) */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '8%',
                    background: 'linear-gradient(180deg, transparent, rgba(3,4,10,0.95))',
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
