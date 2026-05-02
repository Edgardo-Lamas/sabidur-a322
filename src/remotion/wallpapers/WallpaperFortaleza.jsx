import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// Radial pulse rings + breathing text
export const WallpaperFortaleza = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const fadeIn = interpolate(frame, [0, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const titleOpacity = interpolate(frame, [20, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const titleY = interpolate(frame, [20, 60], [35, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const subOpacity = interpolate(frame, [55, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const refOpacity = interpolate(frame, [85, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Breathing pulse on main text
    const breathe = Math.sin((frame / fps) * 0.85 * Math.PI) * 0.018 + 1;

    // Two rings that pulse at different phases (expand from center, fade out)
    const RING_CYCLE = fps * 2.5;
    const ring1Frame = frame % RING_CYCLE;
    const ring2Frame = (frame + RING_CYCLE / 2) % RING_CYCLE;
    const ring1R = interpolate(ring1Frame, [0, RING_CYCLE], [80, 540]);
    const ring1O = interpolate(ring1Frame, [0, RING_CYCLE * 0.15, RING_CYCLE * 0.7, RING_CYCLE], [0, 0.18, 0.08, 0]);
    const ring2R = interpolate(ring2Frame, [0, RING_CYCLE], [80, 540]);
    const ring2O = interpolate(ring2Frame, [0, RING_CYCLE * 0.15, RING_CYCLE * 0.7, RING_CYCLE], [0, 0.14, 0.06, 0]);

    // Parallax: background subtle vertical drift
    const parallaxY = interpolate(frame, [0, 180], [0, -22], { extrapolateRight: 'clamp' });

    return (
        <div style={{
            width: '100%', height: '100%', overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(180deg, #0D0F14 0%, #1A1D23 40%, #0F1219 100%)',
            fontFamily: 'Georgia, "Times New Roman", serif',
        }}>
            {/* Subtle cross in background — parallax */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: `translate(-50%, calc(-50% + ${parallaxY}px))`,
                opacity: fadeIn * 0.06,
            }}>
                <svg width="700" height="900" viewBox="0 0 700 900">
                    <rect x="320" y="0" width="60" height="900" fill="#C5A059" />
                    <rect x="0" y="250" width="700" height="60" fill="#C5A059" />
                </svg>
            </div>

            {/* Pulse rings */}
            <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', overflow: 'visible' }}
                width="0" height="0">
                <circle cx="0" cy="0" r={ring1R} fill="none" stroke="#C5A059" strokeWidth="1.5" opacity={ring1O * fadeIn} />
                <circle cx="0" cy="0" r={ring2R} fill="none" stroke="#C5A059" strokeWidth="1" opacity={ring2O * fadeIn} />
            </svg>

            {/* Vignette */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.72) 100%)',
            }} />

            {/* Top label */}
            <div style={{
                position: 'absolute', top: 120, left: 0, right: 0,
                textAlign: 'center', opacity: refOpacity * 0.55,
                color: '#C5A059', fontSize: 24,
                letterSpacing: '0.45em', textTransform: 'uppercase',
            }}>
                Filipenses 4
            </div>

            {/* Main content */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 10,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '0 80px', textAlign: 'center',
            }}>
                {/* Verse — breathing */}
                <div style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px) scale(${breathe})`,
                }}>
                    <div style={{
                        color: '#C5A059',
                        fontSize: 70, fontWeight: 'bold',
                        lineHeight: 1.2, letterSpacing: '0.02em',
                        marginBottom: 20,
                        textShadow: '0 0 50px rgba(197,160,89,0.35)',
                    }}>
                        Todo lo puedo
                    </div>
                    <div style={{
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: 70, fontWeight: 'bold',
                        lineHeight: 1.2, letterSpacing: '0.02em',
                        fontStyle: 'italic', marginBottom: 20,
                    }}>
                        en Cristo
                    </div>
                    <div style={{
                        color: '#C5A059',
                        fontSize: 70, fontWeight: 'bold',
                        lineHeight: 1.2, letterSpacing: '0.02em',
                    }}>
                        que me fortalece
                    </div>
                </div>

                {/* Separator */}
                <div style={{ opacity: subOpacity, marginTop: 50, marginBottom: 36 }}>
                    <svg width="220" height="20" viewBox="0 0 220 20">
                        <line x1="0" y1="10" x2="90" y2="10" stroke="#C5A059" strokeWidth="0.8" opacity="0.4" />
                        <circle cx="110" cy="10" r="4" fill="none" stroke="#C5A059" strokeWidth="1.2" opacity="0.6" />
                        <line x1="130" y1="10" x2="220" y2="10" stroke="#C5A059" strokeWidth="0.8" opacity="0.4" />
                    </svg>
                </div>

                {/* Reference */}
                <div style={{
                    opacity: refOpacity,
                    color: '#C5A059', fontSize: 34,
                    letterSpacing: '0.28em', fontStyle: 'italic',
                }}>
                    Filipenses 4:13
                </div>

                {/* Watermark */}
                <div style={{
                    opacity: refOpacity * 0.25, marginTop: 100,
                    color: '#C5A059', fontSize: 18,
                    letterSpacing: '0.42em', textTransform: 'uppercase',
                }}>
                    Sabiduría para el Corazón
                </div>
            </div>
        </div>
    );
};
