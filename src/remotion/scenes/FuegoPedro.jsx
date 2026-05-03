import { useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';

const W = 1920;
const H = 1080;

// Deterministic ember particles
const EMBERS = Array.from({ length: 32 }, (_, i) => ({
    baseX:    760 + (i % 9 - 4) * 95 + (i * 37.3) % 80,
    cycleLen: 55 + (i % 7) * 14,
    offset:   i * 28,
    size:     1.2 + (i % 4) * 0.7,
    drift:    ((i % 5) - 2) * 18,
    startY:   H * 0.62 + (i % 4) * 22,
    riseH:    260 + (i % 6) * 60,
}));

// Subtle heat shimmer lines
const SHIMMER = Array.from({ length: 8 }, (_, i) => ({
    y: H * 0.58 + i * 18,
    speed: 0.018 + i * 0.003,
    amp: 3 + (i % 3) * 2,
    phase: i * 0.9,
}));

export const FuegoPedro = () => {
    const frame = useCurrentFrame();
    const { durationInFrames, fps } = useVideoConfig();

    const t = frame / durationInFrames;

    // Ken Burns — sine-based so start = end (loop seamlessly)
    const scale     = 1 + Math.sin(t * Math.PI) * 0.072;
    const tx        = Math.sin(t * Math.PI * 2) * 14;
    const ty        = -Math.sin(t * Math.PI) * 9;

    const fadeIn = interpolate(frame, [0, 35], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });

    return (
        <div style={{ width: W, height: H, overflow: 'hidden', position: 'relative', background: '#0A0200', opacity: fadeIn }}>

            {/* ─── FOTO BASE con Ken Burns ─── */}
            <div style={{
                position: 'absolute', inset: 0,
                transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
                transformOrigin: 'center center',
            }}>
                <Img
                    src={staticFile('stories/fracaso-photo.jpg')}
                    style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover', objectPosition: 'center 55%',
                        filter: 'brightness(0.55) saturate(1.25) sepia(0.15)',
                        display: 'block',
                    }}
                />
            </div>

            {/* ─── VIGNETTE oscuro ─── */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 85% 80% at 50% 55%, transparent 30%, rgba(5,1,0,0.65) 75%, rgba(3,0,0,0.88) 100%)',
            }} />

            {/* ─── Tinte cálido central — simula brillo del fuego ─── */}
            <div style={{
                position: 'absolute',
                bottom: '22%', left: '50%',
                transform: 'translate(-50%, 50%)',
                width: '55%', height: 200,
                background: `radial-gradient(ellipse 100% 100% at 50% 100%, rgba(200,80,10,${0.18 + Math.sin(frame / fps * 1.6 * Math.PI) * 0.05}) 0%, rgba(140,40,5,0.08) 55%, transparent 80%)`,
                filter: 'blur(18px)',
            }} />

            {/* ─── Pulso cálido secundario ─── */}
            <div style={{
                position: 'absolute',
                bottom: '18%', left: '50%',
                transform: 'translate(-50%, 50%)',
                width: '35%', height: 140,
                background: `radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,120,20,${0.12 + Math.sin(frame / fps * 2.1 * Math.PI + 0.8) * 0.04}) 0%, transparent 70%)`,
                filter: 'blur(10px)',
            }} />

            {/* ─── BRASAS (embers) ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                {EMBERS.map((e, i) => {
                    const progress = ((frame + e.offset) % e.cycleLen) / e.cycleLen;
                    const x = e.baseX + Math.sin(progress * Math.PI * 3 + i) * e.drift;
                    const y = e.startY - progress * e.riseH;
                    const opacity = progress < 0.12
                        ? progress / 0.12
                        : progress > 0.72
                            ? (1 - progress) / 0.28
                            : 0.85 - progress * 0.4;
                    const r = e.size * (1 - progress * 0.35);
                    const glow = `rgba(${255 - Math.floor(progress * 80)},${100 - Math.floor(progress * 60)},10,${opacity * 0.5})`;
                    return (
                        <g key={i}>
                            {/* Halo suave */}
                            <circle cx={x} cy={y} r={r * 3.5} fill={glow} />
                            {/* Núcleo */}
                            <circle cx={x} cy={y} r={r}
                                fill={progress < 0.4 ? 'rgba(255,200,80,0.95)' : 'rgba(255,110,20,0.85)'}
                                opacity={opacity}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* ─── SHIMMER de calor (líneas ondulantes en el horizonte del fuego) ─── */}
            <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
                {SHIMMER.map((s, i) => {
                    const shift = Math.sin(frame * s.speed + s.phase) * s.amp;
                    return (
                        <line key={i}
                            x1={600 + shift} y1={s.y}
                            x2={1320 + shift * 0.5} y2={s.y}
                            stroke={`rgba(200,100,20,0.04)`}
                            strokeWidth="1.5"
                        />
                    );
                })}
            </svg>

            {/* ─── Velo negro inferior ─── */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%',
                background: 'linear-gradient(180deg, transparent, rgba(3,0,0,0.95))',
            }} />

            {/* ─── Velo negro superior ─── */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '14%',
                background: 'linear-gradient(0deg, transparent, rgba(5,1,0,0.75))',
            }} />
        </div>
    );
};
