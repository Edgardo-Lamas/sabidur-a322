import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// Horizontal light sweep across text
export const WallpaperGracia = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const fadeIn = interpolate(frame, [0, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const titleScale = interpolate(frame, [15, 55], [0.85, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const titleOpacity = interpolate(frame, [15, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const textOpacity = interpolate(frame, [50, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const refOpacity = interpolate(frame, [80, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Sweeping light: moves left to right repeatedly
    const SWEEP_DURATION = fps * 3;
    const sweepFrame = frame % SWEEP_DURATION;
    const sweepX = interpolate(sweepFrame, [0, SWEEP_DURATION], [-200, 1300]);

    // Parallax background text (very faint, moves slower)
    const bgTextX = interpolate(frame, [0, 180], [0, -30], { extrapolateRight: 'clamp' });

    // Breathing scale on main title
    const breathe = Math.sin((frame / fps) * 0.7 * Math.PI) * 0.012 + 1;

    return (
        <div style={{
            width: '100%', height: '100%', overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(175deg, #0D0F14 0%, #1A1D23 45%, #0F1118 100%)',
            fontFamily: 'Georgia, "Times New Roman", serif',
        }}>
            {/* Parallax background word */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: `translate(calc(-50% + ${bgTextX}px), -50%)`,
                fontSize: 340, fontWeight: 'bold',
                color: 'rgba(197,160,89,0.04)',
                letterSpacing: '0.08em',
                userSelect: 'none', whiteSpace: 'nowrap',
            }}>
                GRACIA
            </div>

            {/* Vignette */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
            }} />

            {/* Light sweep overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(90deg, transparent ${sweepX - 200}px, rgba(197,160,89,0.06) ${sweepX}px, rgba(255,255,255,0.04) ${sweepX + 60}px, rgba(197,160,89,0.06) ${sweepX + 120}px, transparent ${sweepX + 320}px)`,
                opacity: fadeIn,
            }} />

            {/* Top ornament */}
            <div style={{
                position: 'absolute', top: 110, left: '50%',
                transform: 'translateX(-50%)',
                opacity: refOpacity * 0.6,
            }}>
                <svg width="160" height="24" viewBox="0 0 160 24">
                    <line x1="0" y1="12" x2="66" y2="12" stroke="#C5A059" strokeWidth="0.8" opacity="0.5" />
                    <polygon points="80,4 88,12 80,20 72,12" fill="none" stroke="#C5A059" strokeWidth="1.2" />
                    <line x1="94" y1="12" x2="160" y2="12" stroke="#C5A059" strokeWidth="0.8" opacity="0.5" />
                </svg>
            </div>

            {/* Main content */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 10,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '0 80px', textAlign: 'center',
            }}>
                {/* "GRACIA" */}
                <div style={{
                    opacity: titleOpacity,
                    transform: `scale(${titleScale * breathe})`,
                    marginBottom: 8,
                }}>
                    <div style={{
                        color: '#C5A059',
                        fontSize: 128, fontWeight: 'bold',
                        letterSpacing: '0.18em',
                        textShadow: '0 0 80px rgba(197,160,89,0.25), 0 0 20px rgba(197,160,89,0.1)',
                        lineHeight: 1,
                    }}>
                        GRACIA
                    </div>
                </div>

                {/* Separator */}
                <div style={{ opacity: titleOpacity, marginBottom: 50, marginTop: 20 }}>
                    <svg width="200" height="2" viewBox="0 0 200 2">
                        <line x1="0" y1="1" x2="200" y2="1" stroke="#C5A059" strokeWidth="0.8" opacity="0.4" />
                    </svg>
                </div>

                {/* Verse text */}
                <div style={{ opacity: textOpacity }}>
                    <div style={{
                        color: 'rgba(255,255,255,0.82)',
                        fontSize: 52, lineHeight: 1.45,
                        fontStyle: 'italic', marginBottom: 16,
                        letterSpacing: '0.01em',
                    }}>
                        Porque por gracia
                    </div>
                    <div style={{
                        color: '#C5A059',
                        fontSize: 52, lineHeight: 1.45,
                        fontStyle: 'italic', marginBottom: 16,
                        letterSpacing: '0.01em',
                    }}>
                        sois salvos
                    </div>
                    <div style={{
                        color: 'rgba(255,255,255,0.82)',
                        fontSize: 52, lineHeight: 1.45,
                        fontStyle: 'italic',
                        letterSpacing: '0.01em',
                    }}>
                        por medio de la fe
                    </div>
                </div>

                {/* Reference */}
                <div style={{
                    opacity: refOpacity,
                    marginTop: 60,
                    color: '#C5A059', fontSize: 32,
                    letterSpacing: '0.3em', fontStyle: 'italic',
                }}>
                    Efesios 2:8
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

            {/* Bottom ornament */}
            <div style={{
                position: 'absolute', bottom: 110, left: '50%',
                transform: 'translateX(-50%)',
                opacity: refOpacity * 0.5,
            }}>
                <svg width="160" height="24" viewBox="0 0 160 24">
                    <line x1="0" y1="12" x2="66" y2="12" stroke="#C5A059" strokeWidth="0.8" opacity="0.5" />
                    <polygon points="80,4 88,12 80,20 72,12" fill="none" stroke="#C5A059" strokeWidth="1.2" />
                    <line x1="94" y1="12" x2="160" y2="12" stroke="#C5A059" strokeWidth="0.8" opacity="0.5" />
                </svg>
            </div>
        </div>
    );
};
