import { useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';

// Dust motes — visible against the photo
const MOTES = Array.from({ length: 18 }, (_, i) => ({
    x: (i * 137.508) % 520 + 28,
    size: 2.5 + (i % 4) * 2,
    opacity: 0.18 + (i % 4) * 0.10,
    speed: 0.18 + (i % 5) * 0.07,
    offset: i * 83,
    drift: Math.sin(i * 0.9) * 45,
}));

export const VersiculoCard = ({ imagePath, keyword, lines, reference }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Ken Burns: slow zoom-out
    const scale = interpolate(frame, [0, durationInFrames], [1.10, 1.0], { extrapolateRight: 'clamp' });
    const panY = interpolate(frame, [0, durationInFrames], [-30, 20], { extrapolateRight: 'clamp' });

    // Keyword ghost — parallax at 40% pan speed
    const bgWordX = interpolate(frame, [0, durationInFrames], [30, -30]);

    // Keyword entrance (frames 5–40)
    const kwOpacity = interpolate(frame, [5, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Gold separator line (frames 45–80)
    const lineW = interpolate(frame, [45, 85], [0, 440], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Each verse line cascades in: starts at frame 80, +35 frames per line
    const lineEntries = lines.map((_, i) => ({
        opacity: interpolate(frame, [80 + i * 35, 115 + i * 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        y: interpolate(frame, [80 + i * 35, 115 + i * 35], [22, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    }));

    const lastLineFrame = 80 + lines.length * 35;

    // Reference + separator 2 (after last line + 40 frames)
    const refOpacity = interpolate(frame, [lastLineFrame + 10, lastLineFrame + 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line2W = interpolate(frame, [lastLineFrame + 15, lastLineFrame + 55], [0, 440], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Watermark (60 frames after reference)
    const wmOpacity = interpolate(frame, [lastLineFrame + 70, lastLineFrame + 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Breathing on keyword
    const breathe = Math.sin((frame / 30) * 0.7 * Math.PI) * 0.007 + 1;

    // Sweeping light leak every 120 frames
    const sweepFrame = frame % 120;
    const sweepX = interpolate(sweepFrame, [0, 120], [-500, 650]);
    const sweepO = interpolate(sweepFrame, [0, 15, 90, 120], [0, 0.6, 0.6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', fontFamily: 'Georgia, "Times New Roman", serif' }}>

            {/* Background image — Ken Burns */}
            <div style={{
                position: 'absolute', inset: '-10%',
                transform: `scale(${scale}) translateY(${panY}px)`,
                transformOrigin: 'center center',
            }}>
                <Img
                    src={staticFile(imagePath)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            {/* Gradient overlay — strong at bottom for legibility */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(10,8,2,0.08) 0%, rgba(10,8,2,0.20) 30%, rgba(10,8,2,0.65) 58%, rgba(8,6,2,0.92) 78%, rgba(6,4,1,0.97) 100%)',
            }} />

            {/* Vignette sides */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 55%, transparent 30%, rgba(4,3,0,0.55) 100%)',
            }} />

            {/* Sweeping light leak */}
            <div style={{
                position: 'absolute', inset: 0, opacity: sweepO * 0.6,
                background: `linear-gradient(75deg, transparent ${sweepX - 200}px, rgba(255,210,100,0.10) ${sweepX - 60}px, rgba(255,240,180,0.18) ${sweepX}px, rgba(255,210,100,0.10) ${sweepX + 60}px, transparent ${sweepX + 200}px)`,
            }} />

            {/* Dust motes */}
            {MOTES.map((m, i) => {
                const rawY = (frame * m.speed + m.offset) % 1200;
                const driftX = m.drift * Math.sin((frame * m.speed + m.offset) / 110);
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: m.x + driftX,
                        bottom: rawY - 40,
                        width: m.size, height: m.size,
                        borderRadius: '50%',
                        background: 'rgba(255,215,100,1)',
                        opacity: m.opacity,
                        filter: 'blur(0.8px)',
                    }} />
                );
            })}

            {/* Ghost keyword — parallax background */}
            <div style={{
                position: 'absolute', top: '12%', left: '50%',
                transform: `translate(calc(-50% + ${bgWordX}px), -50%)`,
                color: 'rgba(197,160,89,0.06)', fontSize: 200,
                fontWeight: 'bold', letterSpacing: '0.08em',
                userSelect: 'none', whiteSpace: 'nowrap',
            }}>
                {keyword}
            </div>

            {/* Keyword foreground */}
            <div style={{
                position: 'absolute', top: '10%', left: 0, right: 0,
                textAlign: 'center',
                opacity: kwOpacity,
                transform: `scale(${breathe})`,
            }}>
                <div style={{
                    color: '#C5A059', fontSize: 52, fontWeight: 'bold',
                    letterSpacing: '0.26em', lineHeight: 1,
                    textShadow: '0 0 60px rgba(197,160,89,0.45), 0 0 24px rgba(197,160,89,0.25), 0 4px 20px rgba(0,0,0,0.9)',
                }}>
                    {keyword}
                </div>
            </div>

            {/* Text block — centered lower third */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '0 64px 120px',
                textAlign: 'center',
                zIndex: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
                {/* Separator line 1 */}
                <div style={{
                    width: lineW, height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.75), transparent)',
                    marginBottom: 20,
                }} />

                {/* Verse lines — compact block */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    {lines.map((line, i) => (
                        <div key={i} style={{
                            opacity: lineEntries[i].opacity,
                            transform: `translateY(${lineEntries[i].y}px)`,
                            color: i % 2 === 0 ? 'rgba(255,255,255,0.93)' : '#C5A059',
                            fontSize: 32,
                            lineHeight: 1.35,
                            fontStyle: 'italic',
                            textShadow: i % 2 === 0
                                ? '0 3px 14px rgba(0,0,0,0.95)'
                                : '0 0 28px rgba(197,160,89,0.45), 0 3px 14px rgba(0,0,0,0.85)',
                        }}>
                            {line}
                        </div>
                    ))}
                </div>

                {/* Separator line 2 */}
                <div style={{
                    width: line2W, height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.55), transparent)',
                    marginTop: 18, marginBottom: 16,
                }} />

                {/* Reference */}
                <div style={{
                    opacity: refOpacity,
                    color: '#C5A059',
                    fontSize: 22, letterSpacing: '0.28em', fontStyle: 'italic',
                    textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                }}>
                    {reference}
                </div>
            </div>

            {/* Watermark */}
            <div style={{
                position: 'absolute', bottom: 56, left: 0, right: 0,
                textAlign: 'center',
                opacity: wmOpacity * 0.32,
                color: '#ffffff',
                fontSize: 16, letterSpacing: '0.42em', textTransform: 'uppercase',
                fontFamily: 'Arial, sans-serif',
            }}>
                Sabiduría para el Corazón
            </div>
        </div>
    );
};
