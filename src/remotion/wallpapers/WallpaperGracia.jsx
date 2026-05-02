import { useCurrentFrame, useVideoConfig, interpolate, Img } from 'remotion';

// Mountain peaks at golden hour — warm light hits the text perfectly
const PHOTO = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1080&h=1920&q=85';

// Floating dust/pollen motes — visible against the bright mountain photo
const MOTES = Array.from({ length: 22 }, (_, i) => ({
    x: (i * 137.508) % 1000 + 40,
    size: 3 + (i % 4) * 2.5,
    opacity: 0.25 + (i % 4) * 0.12,
    speed: 0.22 + (i % 5) * 0.08,
    offset: i * 79,
    drift: Math.sin(i * 0.8) * 60,
}));

export const WallpaperGracia = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Ken Burns: slow pan right + slight zoom
    const scale = interpolate(frame, [0, durationInFrames], [1.06, 1.0], { extrapolateRight: 'clamp' });
    const panX = interpolate(frame, [0, durationInFrames], [40, -40], { extrapolateRight: 'clamp' });
    const panY = interpolate(frame, [0, durationInFrames], [0, 20], { extrapolateRight: 'clamp' });

    // Entrances
    const bigWordOpacity = interpolate(frame, [10, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const bigWordScale = interpolate(frame, [10, 50], [0.88, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const verseOpacity = interpolate(frame, [55, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const verseY = interpolate(frame, [55, 95], [25, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const refOpacity = interpolate(frame, [90, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const lineW = interpolate(frame, [60, 100], [0, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Sweeping light leak — repeating every 90 frames
    const SWEEP = 90;
    const sweepFrame = frame % SWEEP;
    const sweepX = interpolate(sweepFrame, [0, SWEEP], [-600, 1700]);
    const sweepO = interpolate(sweepFrame, [0, 10, 70, 90], [0, 0.9, 0.9, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Parallax background word drifts at half the pan speed
    const bgWordX = panX * 0.4;

    // Breathing scale on GRACIA
    const breathe = Math.sin((frame / 30) * 0.8 * Math.PI) * 0.008 + 1;

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', fontFamily: 'Georgia, "Times New Roman", serif' }}>

            {/* Photo — Ken Burns */}
            <div style={{ position: 'absolute', inset: '-8%', transform: `scale(${scale}) translate(${panX}px, ${panY}px)`, transformOrigin: 'center center' }}>
                <Img src={PHOTO} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Warm gradient overlay — lets mountains show through at top */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,15,5,0.15) 0%, rgba(15,10,3,0.35) 35%, rgba(10,8,2,0.78) 70%, rgba(8,6,2,0.92) 100%)' }} />

            {/* Warm vignette sides */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, transparent 35%, rgba(5,3,0,0.6) 100%)' }} />

            {/* Dust motes */}
            {MOTES.map((m, i) => {
                const totalH = 2100;
                const rawY = (frame * m.speed + m.offset) % totalH;
                const driftX = m.drift * Math.sin((frame * m.speed + m.offset) / 120);
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: m.x + driftX,
                        bottom: rawY - 50,
                        width: m.size, height: m.size,
                        borderRadius: '50%',
                        background: 'rgba(255, 220, 120, 1)',
                        opacity: m.opacity,
                        filter: 'blur(1px)',
                    }} />
                );
            })}

            {/* Sweeping light leak */}
            <div style={{
                position: 'absolute', inset: 0, opacity: sweepO * 0.7,
                background: `linear-gradient(80deg, transparent ${sweepX - 250}px, rgba(255,210,100,0.12) ${sweepX - 80}px, rgba(255,240,180,0.22) ${sweepX}px, rgba(255,210,100,0.12) ${sweepX + 80}px, transparent ${sweepX + 250}px)`,
            }} />

            {/* GHOST WORD — parallax background layer */}
            <div style={{
                position: 'absolute', top: '28%', left: '50%',
                transform: `translate(calc(-50% + ${bgWordX}px), -50%)`,
                color: 'rgba(197,160,89,0.07)', fontSize: 380,
                fontWeight: 'bold', letterSpacing: '0.06em',
                userSelect: 'none', whiteSpace: 'nowrap',
            }}>GRACIA</div>

            {/* Main GRACIA — foreground */}
            <div style={{
                position: 'absolute', top: '22%', left: 0, right: 0,
                textAlign: 'center',
                opacity: bigWordOpacity,
                transform: `scale(${bigWordScale * breathe})`,
            }}>
                <div style={{
                    color: '#C5A059', fontSize: 160, fontWeight: 'bold',
                    letterSpacing: '0.16em', lineHeight: 1,
                    textShadow: '0 0 120px rgba(197,160,89,0.5), 0 0 40px rgba(197,160,89,0.3), 0 6px 30px rgba(0,0,0,0.8)',
                }}>GRACIA</div>
            </div>

            {/* Verse text — lower section */}
            <div style={{
                position: 'absolute', bottom: 220, left: 0, right: 0,
                padding: '0 72px', textAlign: 'center', zIndex: 10,
                opacity: verseOpacity, transform: `translateY(${verseY}px)`,
            }}>
                <div style={{ width: lineW, height: 1, background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.7), transparent)', margin: '0 auto 36px' }} />

                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 50, lineHeight: 1.5, fontStyle: 'italic', marginBottom: 10, textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>
                    Porque por gracia
                </div>
                <div style={{ color: '#C5A059', fontSize: 50, lineHeight: 1.5, fontStyle: 'italic', marginBottom: 10, textShadow: '0 0 40px rgba(197,160,89,0.5), 0 4px 20px rgba(0,0,0,0.8)' }}>
                    sois salvos
                </div>
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 50, lineHeight: 1.5, fontStyle: 'italic', textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>
                    por medio de la fe
                </div>

                <div style={{ width: lineW, height: 1, background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.5), transparent)', margin: '30px auto 28px' }} />

                <div style={{ opacity: refOpacity, color: '#C5A059', fontSize: 30, letterSpacing: '0.32em', fontStyle: 'italic' }}>
                    Efesios 2:8
                </div>
            </div>

            {/* Watermark */}
            <div style={{ position: 'absolute', bottom: 72, left: 0, right: 0, textAlign: 'center', opacity: refOpacity * 0.3, color: '#ffffff', fontSize: 18, letterSpacing: '0.44em', textTransform: 'uppercase' }}>
                Sabiduría para el Corazón
            </div>
        </div>
    );
};
