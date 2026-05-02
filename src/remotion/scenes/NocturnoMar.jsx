import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

const W = 1920;
const H = 1080;

// --- Static data arrays (defined once, deterministic) ---

const STARS = Array.from({ length: 45 }, (_, i) => ({
    x: (i * 137.508 * 3.7 + 80) % (W * 0.88) + W * 0.06,
    y: (i * 97.3 * 2.1 + 40) % (H * 0.52) + 20,
    r: 0.6 + (i % 5) * 0.35,
    baseOpacity: 0.35 + (i % 6) * 0.1,
    twinkleSpeed: 0.9 + (i % 7) * 0.22,
    twinkleOffset: i * 23,
}));

const RAIN = Array.from({ length: 160 }, (_, i) => ({
    x: (i * 113.4 + 20) % W,
    length: 18 + (i % 5) * 9,
    opacity: 0.12 + (i % 5) * 0.06,
    speed: 14 + (i % 8) * 3.5,
    offset: i * 41,
    thickness: i % 4 === 0 ? 1.4 : 0.8,
}));

// Wave layers: [yBase, frequency, amplitude, speed, opacity, color]
const WAVES = [
    { y: 645, freq: 0.0055, amp: 22, speed: 0.038, opacity: 0.55, color: '#0A2240', depth: 0 },
    { y: 662, freq: 0.0072, amp: 16, speed: 0.052, opacity: 0.65, color: '#0D2848', depth: 1 },
    { y: 676, freq: 0.0088, amp: 11, speed: 0.068, opacity: 0.78, color: '#112E52', depth: 2 },
    { y: 688, freq: 0.0110, amp: 7,  speed: 0.085, opacity: 0.92, color: '#152F55', depth: 3 },
    { y: 698, freq: 0.0130, amp: 4,  speed: 0.100, opacity: 1.0,  color: '#172E50', depth: 4 },
];

// Build a closed SVG wave path
function wavePath(frame, wave) {
    const { y, freq, amp, speed } = wave;
    const step = 12;
    let d = `M -10 ${H}`;
    d += ` L -10 ${y + Math.sin((-10) * freq + frame * speed) * amp}`;
    for (let x = 0; x <= W + 10; x += step) {
        const wy = y + Math.sin(x * freq + frame * speed) * amp;
        d += ` L ${x} ${wy}`;
    }
    d += ` L ${W + 10} ${H} Z`;
    return d;
}

export const NocturnoMar = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- Moon halo pulse ---
    const moonHaloR = 68 + Math.sin((frame / fps) * 1.1 * Math.PI) * 5;
    const moonHaloOpacity = 0.18 + Math.sin((frame / fps) * 0.9 * Math.PI) * 0.06;

    // --- Polaris: gold pulse + cross sparkle ---
    const polarisPulse = Math.sin((frame / fps) * 1.4 * Math.PI) * 0.4 + 1;
    const polarisGlow = 12 + Math.sin((frame / fps) * 1.4 * Math.PI) * 6;
    const crossArmLen = 18 + Math.sin((frame / fps) * 1.4 * Math.PI) * 6;

    // --- Boat rock ---
    const boatRock = Math.sin((frame / fps) * 0.8 * Math.PI) * 2.5;
    const boatY = Math.sin((frame / fps) * 0.8 * Math.PI) * 4;

    // --- Moon reflection shimmer on water ---
    const reflShimmer = Math.sin((frame / fps) * 1.2 * Math.PI) * 0.08 + 0.22;

    // --- Rain scroll ---
    const rainTotalH = H * 1.4;

    // --- Fade in at start ---
    const fadeIn = interpolate(frame, [0, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // --- Horizon atmospheric glow ---
    const horizonY = WAVES[0].y - 20;

    return (
        <div style={{
            width: W, height: H, overflow: 'hidden', position: 'relative',
            background: '#010408',
            opacity: fadeIn,
        }}>

            {/* ─── SKY gradient ─── */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(180deg,
                    #010408 0%,
                    #03091A 25%,
                    #060E26 50%,
                    #0A1830 ${horizonY / H * 100}%,
                    #0D2040 100%
                )`,
            }} />

            {/* Subtle cloud wisps */}
            <div style={{
                position: 'absolute', top: 160, left: 0, right: 0, height: 180,
                background: 'radial-gradient(ellipse 900px 80px at 35% 50%, rgba(10,20,50,0.35) 0%, transparent 80%)',
                opacity: 0.6,
            }} />
            <div style={{
                position: 'absolute', top: 280, left: 0, right: 0, height: 120,
                background: 'radial-gradient(ellipse 700px 60px at 68% 50%, rgba(8,15,40,0.3) 0%, transparent 80%)',
                opacity: 0.5,
            }} />

            {/* ─── STARS ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                <defs>
                    {STARS.map((s, i) => (
                        <radialGradient key={i} id={`sg${i}`} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </radialGradient>
                    ))}
                </defs>
                {STARS.map((s, i) => {
                    const twinkle = Math.sin((frame * s.twinkleSpeed + s.twinkleOffset) / 30 * Math.PI) * 0.35;
                    const op = Math.max(0.05, s.baseOpacity + twinkle);
                    return (
                        <circle key={i} cx={s.x} cy={s.y} r={s.r}
                            fill={`url(#sg${i})`} opacity={op} />
                    );
                })}
            </svg>

            {/* ─── POLARIS (prominent fixed star) ─── */}
            <svg style={{ position: 'absolute', left: W / 2 - 40, top: 55, overflow: 'visible' }} width="80" height="80">
                {/* Outer glow */}
                <circle cx="40" cy="40" r={polarisGlow * polarisPulse}
                    fill="none" stroke="rgba(197,160,89,0.18)" strokeWidth={polarisGlow * polarisPulse * 0.6} />
                {/* Inner star */}
                <circle cx="40" cy="40" r={2.8 * polarisPulse}
                    fill="#E8D5A0" opacity={0.95} />
                {/* Cross sparkle arms */}
                <line x1="40" y1={40 - crossArmLen} x2="40" y2={40 + crossArmLen}
                    stroke="rgba(232,213,160,0.55)" strokeWidth="1" />
                <line x1={40 - crossArmLen * 0.6} y1="40" x2={40 + crossArmLen * 0.6} y2="40"
                    stroke="rgba(232,213,160,0.45)" strokeWidth="0.8" />
                {/* Diagonal arms (shorter) */}
                <line x1={40 - crossArmLen * 0.4} y1={40 - crossArmLen * 0.4}
                    x2={40 + crossArmLen * 0.4} y2={40 + crossArmLen * 0.4}
                    stroke="rgba(232,213,160,0.25)" strokeWidth="0.6" />
                <line x1={40 + crossArmLen * 0.4} y1={40 - crossArmLen * 0.4}
                    x2={40 - crossArmLen * 0.4} y2={40 + crossArmLen * 0.4}
                    stroke="rgba(232,213,160,0.25)" strokeWidth="0.6" />
            </svg>

            {/* ─── MOON ─── */}
            <svg style={{ position: 'absolute', left: 195, top: 62, overflow: 'visible' }} width="130" height="130">
                <defs>
                    {/* Halo gradient */}
                    <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(220,210,180,0.22)" />
                        <stop offset="55%" stopColor="rgba(180,165,120,0.08)" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    {/* Moon surface gradient */}
                    <radialGradient id="moonGrad" cx="40%" cy="38%" r="55%">
                        <stop offset="0%" stopColor="#F5ECC8" />
                        <stop offset="55%" stopColor="#D9C87A" />
                        <stop offset="100%" stopColor="#B8A050" />
                    </radialGradient>
                    <clipPath id="moonClip">
                        <circle cx="65" cy="65" r="32" />
                    </clipPath>
                </defs>
                {/* Animated halo */}
                <circle cx="65" cy="65" r={moonHaloR}
                    fill="url(#moonHalo)" opacity={moonHaloOpacity} />
                {/* Moon base */}
                <circle cx="65" cy="65" r="32" fill="url(#moonGrad)" opacity="0.92" />
                {/* Crescent shadow — slightly offset circle cuts into moon */}
                <circle cx="78" cy="60" r="28" fill="#03091A" clipPath="url(#moonClip)" opacity="0.96" />
            </svg>

            {/* ─── RAIN ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                {RAIN.map((r, i) => {
                    const dy = r.length * 0.28; // diagonal ratio
                    const rawY = (frame * r.speed + r.offset) % rainTotalH - r.length;
                    if (rawY > horizonY + 20) return null; // rain stops at water surface
                    return (
                        <line key={i}
                            x1={r.x + rawY * 0.12}
                            y1={rawY}
                            x2={r.x + rawY * 0.12 + dy}
                            y2={rawY + r.length}
                            stroke={`rgba(180,200,230,${r.opacity})`}
                            strokeWidth={r.thickness}
                            strokeLinecap="round"
                        />
                    );
                })}
            </svg>

            {/* ─── OCEAN WAVES ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                {WAVES.map((wave, i) => (
                    <path key={i}
                        d={wavePath(frame, wave)}
                        fill={wave.color}
                        opacity={wave.opacity}
                    />
                ))}
            </svg>

            {/* ─── MOON REFLECTION on water ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                <defs>
                    <radialGradient id="reflGrad" cx="50%" cy="0%" r="100%">
                        <stop offset="0%" stopColor="rgba(220,200,120,0.45)" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
                {/* Shimmering column of moonlight on water */}
                <ellipse
                    cx={W / 2 - 310}
                    cy={horizonY + 85}
                    rx={28}
                    ry={90}
                    fill="url(#reflGrad)"
                    opacity={reflShimmer}
                />
                {/* Horizontal shimmer streaks */}
                {[0, 1, 2, 3].map((j) => {
                    const shimOp = (Math.sin((frame / 30 + j * 0.7) * Math.PI) * 0.06 + 0.08);
                    const shimY = horizonY + 30 + j * 22;
                    const shimW = 80 - j * 12;
                    return (
                        <ellipse key={j}
                            cx={W / 2 - 310}
                            cy={shimY}
                            rx={shimW}
                            ry={2.5}
                            fill="rgba(220,200,130,0.8)"
                            opacity={shimOp}
                        />
                    );
                })}
            </svg>

            {/* ─── WATER surface gloss (thin bright line at horizon) ─── */}
            <div style={{
                position: 'absolute',
                top: horizonY - 2,
                left: 0, right: 0,
                height: 2,
                background: 'linear-gradient(90deg, transparent 0%, rgba(100,150,200,0.25) 25%, rgba(180,200,230,0.35) 50%, rgba(100,150,200,0.2) 75%, transparent 100%)',
            }} />

            {/* ─── BOAT SILHOUETTE ─── */}
            <svg
                style={{
                    position: 'absolute',
                    left: 700,
                    top: 580 + boatY,
                    overflow: 'visible',
                    transformOrigin: '80px 65px',
                    transform: `rotate(${boatRock}deg)`,
                }}
                width="160"
                height="130"
            >
                {/* Hull */}
                <path d="M 10 68 Q 80 90 150 68 L 140 78 Q 80 100 20 78 Z"
                    fill="#01060E" opacity="0.95" />
                {/* Mast */}
                <line x1="80" y1="68" x2="80" y2="8"
                    stroke="#01060E" strokeWidth="3" opacity="0.9" />
                {/* Main sail */}
                <path d="M 82 12 L 82 62 L 130 52 Z"
                    fill="#020A18" opacity="0.7" />
                {/* Front sail */}
                <path d="M 78 18 L 78 58 L 38 48 Z"
                    fill="#020A18" opacity="0.6" />
                {/* Mast top flag */}
                <path d="M 80 8 L 94 14 L 80 20" fill="#01060E" opacity="0.7" />
            </svg>

            {/* ─── RAIN SPLASH at water surface ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                {Array.from({ length: 28 }, (_, i) => {
                    const sx = (i * 67.3 + 120) % W;
                    const splashFrame = (frame * (0.8 + i % 4 * 0.15) + i * 29) % 25;
                    const splashR = interpolate(splashFrame, [0, 25], [0, 6]);
                    const splashOp = interpolate(splashFrame, [0, 8, 25], [0.5, 0.25, 0]);
                    return (
                        <ellipse key={i}
                            cx={sx}
                            cy={horizonY + 2}
                            rx={splashR}
                            ry={splashR * 0.3}
                            fill="none"
                            stroke="rgba(160,190,220,0.7)"
                            strokeWidth="0.8"
                            opacity={splashOp}
                        />
                    );
                })}
            </svg>

            {/* ─── ATMOSPHERIC FOG at horizon ─── */}
            <div style={{
                position: 'absolute',
                top: horizonY - 60,
                left: 0, right: 0,
                height: 80,
                background: 'linear-gradient(180deg, transparent 0%, rgba(8,20,40,0.3) 50%, transparent 100%)',
            }} />

        </div>
    );
};
