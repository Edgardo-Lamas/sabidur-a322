import { useCurrentFrame, useVideoConfig, interpolate, Audio, staticFile } from 'remotion';

const W = 1920;
const H = 1080;

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

const WAVES = [
    { y: 645, freq: 0.0055, amp: 22, speed: 0.038, opacity: 0.55, color: '#0A2240' },
    { y: 662, freq: 0.0072, amp: 16, speed: 0.052, opacity: 0.65, color: '#0D2848' },
    { y: 676, freq: 0.0088, amp: 11, speed: 0.068, opacity: 0.78, color: '#112E52' },
    { y: 688, freq: 0.0110, amp: 7,  speed: 0.085, opacity: 0.92, color: '#152F55' },
    { y: 698, freq: 0.0130, amp: 4,  speed: 0.100, opacity: 1.0,  color: '#172E50' },
];

function wavePath(frame, wave) {
    const { y, freq, amp, speed } = wave;
    const step = 12;
    let d = `M -10 ${H} L -10 ${y + Math.sin(-10 * freq + frame * speed) * amp}`;
    for (let x = 0; x <= W + 10; x += step) {
        d += ` L ${x} ${y + Math.sin(x * freq + frame * speed) * amp}`;
    }
    d += ` L ${W + 10} ${H} Z`;
    return d;
}

// Realistic sailboat silhouette — right side of frame, facing left (into scene)
const BoatSilhouette = ({ frame, fps }) => {
    const rock = Math.sin((frame / fps) * 0.8 * Math.PI) * 2.8;
    const rise = Math.sin((frame / fps) * 0.8 * Math.PI) * 5;

    // Boat is 280×210px. Origin (pivot) at waterline center: (140, 160)
    return (
        <g transform={`translate(1340, ${595 + rise}) rotate(${rock}, 140, 160)`}>
            {/* ── Hull ── */}
            <path
                d="M 18 155 Q 80 136 140 134 Q 200 134 258 148 Q 265 148 268 154 Q 265 162 258 163 Q 200 172 140 175 Q 80 173 20 163 Z"
                fill="#030C1A"
                opacity="0.97"
            />
            {/* Keel */}
            <path
                d="M 120 172 Q 140 185 160 172"
                fill="#020810"
                opacity="0.8"
            />
            {/* Hull top edge highlight */}
            <path
                d="M 18 155 Q 80 136 140 134 Q 200 134 258 148"
                fill="none"
                stroke="rgba(80,120,170,0.35)"
                strokeWidth="1.2"
            />

            {/* ── Mast ── */}
            {/* Base widens slightly */}
            <rect x="100" y="134" width="5" height="12" fill="#020C1C" />
            {/* Main mast shaft */}
            <line x1="102" y1="134" x2="99" y2="8" stroke="#040E1E" strokeWidth="3.5" strokeLinecap="round" />
            {/* Masthead flag */}
            <path d="M 99 8 L 116 14 L 99 22" fill="#040E1E" opacity="0.75" />

            {/* ── Boom ── */}
            <line x1="102" y1="138" x2="240" y2="158" stroke="#030D1C" strokeWidth="2.2" strokeLinecap="round" />

            {/* ── Forestay (wire from masthead to bow) ── */}
            <line x1="99" y1="10" x2="20" y2="153" stroke="rgba(15,35,65,0.7)" strokeWidth="0.9" />
            {/* ── Backstay ── */}
            <line x1="99" y1="10" x2="258" y2="147" stroke="rgba(15,35,65,0.55)" strokeWidth="0.9" />
            {/* ── Shrouds (side stays) ── */}
            <line x1="99" y1="14" x2="58" y2="147" stroke="rgba(15,35,65,0.5)" strokeWidth="0.7" />
            <line x1="99" y1="14" x2="175" y2="143" stroke="rgba(15,35,65,0.5)" strokeWidth="0.7" />

            {/* ── Mainsail (main triangle) ── */}
            <path
                d="M 99 10 L 103 138 L 240 157 Z"
                fill="#050F22"
                opacity="0.82"
            />
            {/* Subtle sail batten curves */}
            <path d="M 99 35 Q 155 55 195 130" fill="none" stroke="rgba(8,20,40,0.5)" strokeWidth="0.8" />
            <path d="M 99 65 Q 148 82 185 138" fill="none" stroke="rgba(8,20,40,0.4)" strokeWidth="0.7" />
            <path d="M 99 95 Q 140 108 170 142" fill="none" stroke="rgba(8,20,40,0.35)" strokeWidth="0.7" />

            {/* ── Jib/Genoa (forward sail) ── */}
            <path
                d="M 99 18 L 101 136 L 22 152 Z"
                fill="#040D1F"
                opacity="0.75"
            />

            {/* ── Water wake (foamy white streak behind stern) ── */}
            <path
                d="M 258 160 Q 280 158 300 161 Q 310 163 295 167 Q 278 168 258 164 Z"
                fill="rgba(130,170,210,0.12)"
            />
            {/* ── Reflection glimmer on hull ── */}
            <ellipse cx="140" cy="178" rx="55" ry="4" fill="rgba(80,120,170,0.08)" />
        </g>
    );
};

export const NocturnoMar = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const moonHaloR = 68 + Math.sin((frame / fps) * 1.1 * Math.PI) * 5;
    const moonHaloOpacity = 0.18 + Math.sin((frame / fps) * 0.9 * Math.PI) * 0.06;

    const polarisPulse = Math.sin((frame / fps) * 1.4 * Math.PI) * 0.4 + 1;
    const polarisGlow = 12 + Math.sin((frame / fps) * 1.4 * Math.PI) * 6;
    const crossArmLen = 18 + Math.sin((frame / fps) * 1.4 * Math.PI) * 6;

    const reflShimmer = Math.sin((frame / fps) * 1.2 * Math.PI) * 0.08 + 0.22;

    const rainTotalH = H * 1.4;
    const horizonY = WAVES[0].y - 20;

    const fadeIn = interpolate(frame, [0, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <div style={{ width: W, height: H, overflow: 'hidden', position: 'relative', background: '#010408', opacity: fadeIn }}>

            {/* ─── AUDIO ─── */}
            <Audio src={staticFile('stories/ocean.mp3')} volume={0.55} startFrom={0} />

            {/* ─── SKY ─── */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(180deg, #010408 0%, #03091A 25%, #060E26 50%, #0A1830 ${horizonY / H * 100}%, #0D2040 100%)`,
            }} />

            {/* Cloud wisps */}
            <div style={{ position: 'absolute', top: 160, left: 0, right: 0, height: 180, background: 'radial-gradient(ellipse 900px 80px at 35% 50%, rgba(10,20,50,0.35) 0%, transparent 80%)', opacity: 0.6 }} />
            <div style={{ position: 'absolute', top: 280, left: 0, right: 0, height: 120, background: 'radial-gradient(ellipse 700px 60px at 68% 50%, rgba(8,15,40,0.3) 0%, transparent 80%)', opacity: 0.5 }} />

            {/* ─── STARS ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                <defs>
                    {STARS.map((_, i) => (
                        <radialGradient key={i} id={`sg${i}`} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </radialGradient>
                    ))}
                </defs>
                {STARS.map((s, i) => {
                    const twinkle = Math.sin((frame * s.twinkleSpeed + s.twinkleOffset) / 30 * Math.PI) * 0.35;
                    return (
                        <circle key={i} cx={s.x} cy={s.y} r={s.r}
                            fill={`url(#sg${i})`} opacity={Math.max(0.05, s.baseOpacity + twinkle)} />
                    );
                })}
            </svg>

            {/* ─── POLARIS ─── */}
            <svg style={{ position: 'absolute', left: W / 2 - 40, top: 55, overflow: 'visible' }} width="80" height="80">
                <circle cx="40" cy="40" r={polarisGlow * polarisPulse} fill="none" stroke="rgba(197,160,89,0.18)" strokeWidth={polarisGlow * polarisPulse * 0.6} />
                <circle cx="40" cy="40" r={2.8 * polarisPulse} fill="#E8D5A0" opacity="0.95" />
                <line x1="40" y1={40 - crossArmLen} x2="40" y2={40 + crossArmLen} stroke="rgba(232,213,160,0.55)" strokeWidth="1" />
                <line x1={40 - crossArmLen * 0.6} y1="40" x2={40 + crossArmLen * 0.6} y2="40" stroke="rgba(232,213,160,0.45)" strokeWidth="0.8" />
                <line x1={40 - crossArmLen * 0.4} y1={40 - crossArmLen * 0.4} x2={40 + crossArmLen * 0.4} y2={40 + crossArmLen * 0.4} stroke="rgba(232,213,160,0.25)" strokeWidth="0.6" />
                <line x1={40 + crossArmLen * 0.4} y1={40 - crossArmLen * 0.4} x2={40 - crossArmLen * 0.4} y2={40 + crossArmLen * 0.4} stroke="rgba(232,213,160,0.25)" strokeWidth="0.6" />
            </svg>

            {/* ─── MOON ─── */}
            <svg style={{ position: 'absolute', left: 195, top: 62, overflow: 'visible' }} width="130" height="130">
                <defs>
                    <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(220,210,180,0.22)" />
                        <stop offset="55%" stopColor="rgba(180,165,120,0.08)" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    <radialGradient id="moonGrad" cx="40%" cy="38%" r="55%">
                        <stop offset="0%" stopColor="#F5ECC8" />
                        <stop offset="55%" stopColor="#D9C87A" />
                        <stop offset="100%" stopColor="#B8A050" />
                    </radialGradient>
                    <clipPath id="moonClip">
                        <circle cx="65" cy="65" r="32" />
                    </clipPath>
                </defs>
                <circle cx="65" cy="65" r={moonHaloR} fill="url(#moonHalo)" opacity={moonHaloOpacity} />
                <circle cx="65" cy="65" r="32" fill="url(#moonGrad)" opacity="0.92" />
                <circle cx="78" cy="60" r="28" fill="#03091A" clipPath="url(#moonClip)" opacity="0.96" />
            </svg>

            {/* ─── RAIN ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                {RAIN.map((r, i) => {
                    const dy = r.length * 0.28;
                    const rawY = (frame * r.speed + r.offset) % rainTotalH - r.length;
                    if (rawY > horizonY + 20) return null;
                    return (
                        <line key={i}
                            x1={r.x + rawY * 0.12} y1={rawY}
                            x2={r.x + rawY * 0.12 + dy} y2={rawY + r.length}
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
                    <path key={i} d={wavePath(frame, wave)} fill={wave.color} opacity={wave.opacity} />
                ))}
            </svg>

            {/* ─── BOAT — right side, clear of center text ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                <BoatSilhouette frame={frame} fps={fps} />
            </svg>

            {/* ─── MOON REFLECTION ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                <defs>
                    <radialGradient id="reflGrad" cx="50%" cy="0%" r="100%">
                        <stop offset="0%" stopColor="rgba(220,200,120,0.45)" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
                <ellipse cx={W / 2 - 310} cy={horizonY + 85} rx={28} ry={90} fill="url(#reflGrad)" opacity={reflShimmer} />
                {[0, 1, 2, 3].map((j) => {
                    const shimOp = Math.sin((frame / 30 + j * 0.7) * Math.PI) * 0.06 + 0.08;
                    return (
                        <ellipse key={j}
                            cx={W / 2 - 310} cy={horizonY + 30 + j * 22}
                            rx={80 - j * 12} ry={2.5}
                            fill="rgba(220,200,130,0.8)" opacity={shimOp}
                        />
                    );
                })}
            </svg>

            {/* ─── HORIZON GLOSS ─── */}
            <div style={{
                position: 'absolute', top: horizonY - 2, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent 0%, rgba(100,150,200,0.25) 25%, rgba(180,200,230,0.35) 50%, rgba(100,150,200,0.2) 75%, transparent 100%)',
            }} />

            {/* ─── RAIN SPLASHES ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                {Array.from({ length: 28 }, (_, i) => {
                    const sx = (i * 67.3 + 120) % W;
                    const splashFrame = (frame * (0.8 + i % 4 * 0.15) + i * 29) % 25;
                    const splashR = interpolate(splashFrame, [0, 25], [0, 6]);
                    const splashOp = interpolate(splashFrame, [0, 8, 25], [0.5, 0.25, 0]);
                    return (
                        <ellipse key={i} cx={sx} cy={horizonY + 2}
                            rx={splashR} ry={splashR * 0.3}
                            fill="none" stroke="rgba(160,190,220,0.7)" strokeWidth="0.8" opacity={splashOp}
                        />
                    );
                })}
            </svg>

            {/* ─── FOG AT HORIZON ─── */}
            <div style={{
                position: 'absolute', top: horizonY - 60, left: 0, right: 0, height: 80,
                background: 'linear-gradient(180deg, transparent 0%, rgba(8,20,40,0.3) 50%, transparent 100%)',
            }} />
        </div>
    );
};
