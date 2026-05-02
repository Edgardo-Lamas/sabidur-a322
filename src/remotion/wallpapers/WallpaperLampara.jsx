import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
    x: (i * 137.508) % 1080,
    speed: 0.35 + (i % 6) * 0.12,
    size: 1.5 + (i % 4) * 0.8,
    opacity: 0.15 + (i % 5) * 0.08,
    offset: i * 43,
}));

export const WallpaperLampara = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = interpolate(frame, [10, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const titleY = interpolate(frame, [10, 50], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const subOpacity = interpolate(frame, [40, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const refOpacity = interpolate(frame, [70, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const lineW = interpolate(frame, [35, 80], [0, 320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Gentle text glow pulse
    const glowPulse = (Math.sin((frame / fps) * Math.PI) * 0.5 + 0.5) * 30 + 15;
    // Parallax: top bracket drifts slightly
    const parallaxY = interpolate(frame, [0, 180], [0, -18], { extrapolateRight: 'clamp' });

    return (
        <div style={{
            width: '100%', height: '100%', overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(160deg, #1A1D23 0%, #0B0D11 55%, #12151D 100%)',
            fontFamily: 'Georgia, "Times New Roman", serif',
        }}>
            {/* Particles */}
            {PARTICLES.map((p, i) => {
                const totalTravel = 1920 + 100;
                const yRaw = ((frame * p.speed + p.offset) % totalTravel);
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: p.x,
                        bottom: yRaw - 50,
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        background: '#C5A059',
                        opacity: p.opacity,
                    }} />
                );
            })}

            {/* Light halo center */}
            <div style={{
                position: 'absolute', top: '48%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 600, height: 600,
                borderRadius: '50%',
                background: `radial-gradient(ellipse, rgba(197,160,89,0.07) 0%, transparent 70%)`,
                opacity: titleOpacity,
            }} />

            {/* Vignette */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.65) 100%)',
            }} />

            {/* Corner bracket top-left — parallax layer */}
            <div style={{ position: 'absolute', top: 90, left: 80, opacity: refOpacity * 0.5, transform: `translateY(${parallaxY}px)` }}>
                <svg width="80" height="60" viewBox="0 0 80 60">
                    <line x1="0" y1="0" x2="0" y2="60" stroke="#C5A059" strokeWidth="2" />
                    <line x1="0" y1="0" x2="80" y2="0" stroke="#C5A059" strokeWidth="2" />
                </svg>
            </div>
            {/* Corner bracket bottom-right */}
            <div style={{ position: 'absolute', bottom: 90, right: 80, opacity: refOpacity * 0.5, transform: `translateY(${-parallaxY}px)` }}>
                <svg width="80" height="60" viewBox="0 0 80 60">
                    <line x1="80" y1="60" x2="80" y2="0" stroke="#C5A059" strokeWidth="2" />
                    <line x1="80" y1="60" x2="0" y2="60" stroke="#C5A059" strokeWidth="2" />
                </svg>
            </div>

            {/* Main content */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 10,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '0 90px', textAlign: 'center',
            }}>
                {/* Decorative line top */}
                <div style={{
                    width: lineW, height: 1,
                    background: 'linear-gradient(90deg, transparent, #C5A059, transparent)',
                    marginBottom: 52,
                    opacity: 0.7,
                }} />

                {/* Main verse */}
                <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
                    <div style={{
                        color: '#C5A059',
                        fontSize: 72, fontWeight: 'bold',
                        lineHeight: 1.2, letterSpacing: '0.02em',
                        marginBottom: 24,
                        textShadow: `0 0 ${glowPulse}px rgba(197,160,89,0.4), 0 0 60px rgba(197,160,89,0.15)`,
                    }}>
                        Lámpara es
                    </div>
                    <div style={{
                        color: 'rgba(255,255,255,0.88)',
                        fontSize: 72, fontWeight: 'bold',
                        lineHeight: 1.2, letterSpacing: '0.02em',
                        fontStyle: 'italic', marginBottom: 24,
                    }}>
                        a mis pies
                    </div>
                    <div style={{
                        color: '#C5A059',
                        fontSize: 72, fontWeight: 'bold',
                        lineHeight: 1.2, letterSpacing: '0.02em',
                    }}>
                        tu palabra
                    </div>
                </div>

                {/* Decorative line bottom */}
                <div style={{
                    width: lineW, height: 1,
                    background: 'linear-gradient(90deg, transparent, #C5A059, transparent)',
                    marginTop: 52, opacity: subOpacity * 0.7,
                }} />

                {/* Diamond */}
                <div style={{ opacity: subOpacity, marginTop: 28, marginBottom: 28 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <polygon points="9,1 17,9 9,17 1,9" fill="none" stroke="#C5A059" strokeWidth="1.5" opacity="0.8" />
                    </svg>
                </div>

                {/* Reference */}
                <div style={{
                    opacity: refOpacity,
                    color: '#C5A059', fontSize: 34,
                    letterSpacing: '0.28em', fontStyle: 'italic',
                }}>
                    Salmos 119:105
                </div>

                {/* Watermark */}
                <div style={{
                    opacity: refOpacity * 0.28, marginTop: 90,
                    color: '#C5A059', fontSize: 19,
                    letterSpacing: '0.42em', textTransform: 'uppercase',
                }}>
                    Sabiduría para el Corazón
                </div>
            </div>
        </div>
    );
};
