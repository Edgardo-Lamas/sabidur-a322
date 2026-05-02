import { useCurrentFrame, useVideoConfig, interpolate, Img } from 'remotion';

// Dramatic misty mountain valley — epic, cinematic
const PHOTO = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&h=1920&q=85';

export const WallpaperFortaleza = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Ken Burns: slow zoom OUT — starts close, pulls back dramatically
    const scale = interpolate(frame, [0, durationInFrames], [1.12, 1.0], { extrapolateRight: 'clamp' });
    const panY = interpolate(frame, [0, durationInFrames], [-30, 0], { extrapolateRight: 'clamp' });

    // Entrances — slightly delayed for drama
    const titleOpacity = interpolate(frame, [20, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const titleY = interpolate(frame, [20, 65], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const subOpacity = interpolate(frame, [65, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const refOpacity = interpolate(frame, [95, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Pulse rings — 3 rings at different phases
    const RING_CYCLE = 75;
    const mkRing = (offset) => {
        const f = (frame + offset) % RING_CYCLE;
        return {
            r: interpolate(f, [0, RING_CYCLE], [60, 480]),
            o: interpolate(f, [0, 12, RING_CYCLE * 0.6, RING_CYCLE], [0, 0.55, 0.18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        };
    };
    const ring1 = mkRing(0);
    const ring2 = mkRing(25);
    const ring3 = mkRing(50);

    // Breathing on main text
    const breathe = Math.sin((frame / 30) * 0.7 * Math.PI) * 0.015 + 1;

    // Word-by-word
    const lines = [['Todo', 'lo', 'puedo'], ['en', 'Cristo'], ['que', 'me', 'fortalece']];
    const allWords = lines.flat();
    const WORD_DELAY = 8;
    const getWordAnim = (idx) => {
        const start = 22 + idx * WORD_DELAY;
        return {
            opacity: interpolate(frame, [start, start + 16], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            y: interpolate(frame, [start, start + 16], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        };
    };

    // One-time light leak at start
    const leakX = interpolate(frame, [5, 75], [-500, 1700], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const leakO = interpolate(frame, [5, 20, 60, 75], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    let wordIdx = 0;

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', fontFamily: 'Georgia, "Times New Roman", serif' }}>

            {/* Photo — Ken Burns zoom out */}
            <div style={{ position: 'absolute', inset: '-8%', transform: `scale(${scale}) translateY(${panY}px)`, transformOrigin: 'center center' }}>
                <Img src={PHOTO} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Color grade: cool blue-teal tint — mountains feel majestic */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(175deg, rgba(5,15,25,0.2) 0%, rgba(8,18,30,0.4) 35%, rgba(5,10,20,0.82) 75%, rgba(3,8,15,0.92) 100%)' }} />

            {/* Vignette */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, transparent 28%, rgba(0,5,15,0.65) 100%)' }} />

            {/* Light leak */}
            <div style={{
                position: 'absolute', inset: 0, opacity: leakO * 0.6,
                background: `linear-gradient(115deg, transparent ${leakX - 280}px, rgba(100,180,255,0.1) ${leakX - 80}px, rgba(180,220,255,0.18) ${leakX}px, rgba(100,180,255,0.1) ${leakX + 80}px, transparent ${leakX + 280}px)`,
            }} />

            {/* Pulse rings centered on composition */}
            <svg style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%,-50%)', overflow: 'visible', opacity: titleOpacity }}
                width="0" height="0">
                <circle cx="0" cy="0" r={ring1.r} fill="none" stroke="rgba(180,220,255,0.9)" strokeWidth="1.5" opacity={ring1.o} />
                <circle cx="0" cy="0" r={ring2.r} fill="none" stroke="rgba(197,160,89,0.8)" strokeWidth="1" opacity={ring2.o} />
                <circle cx="0" cy="0" r={ring3.r} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" opacity={ring3.o} />
            </svg>

            {/* Text block — center-lower */}
            <div style={{
                position: 'absolute', bottom: 210, left: 0, right: 0,
                padding: '0 68px', textAlign: 'center', zIndex: 10,
            }}>
                {/* Separator top */}
                <div style={{
                    opacity: subOpacity, marginBottom: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
                }}>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.6))' }} />
                    <svg width="16" height="16"><polygon points="8,1 15,8 8,15 1,8" fill="none" stroke="#C5A059" strokeWidth="1.2" opacity="0.8" /></svg>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(197,160,89,0.6), transparent)' }} />
                </div>

                {/* Word-by-word text — 3 lines */}
                <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px) scale(${breathe})` }}>
                    {lines.map((line, li) => (
                        <div key={li} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 16px', marginBottom: li < lines.length - 1 ? 8 : 0 }}>
                            {line.map((w) => {
                                const idx = wordIdx++;
                                const a = getWordAnim(idx);
                                const isHighlight = li === 1; // "en Cristo" — gold
                                return (
                                    <span key={idx} style={{
                                        display: 'inline-block',
                                        opacity: a.opacity, transform: `translateY(${a.y}px)`,
                                        color: isHighlight ? '#C5A059' : '#ffffff',
                                        fontSize: isHighlight ? 88 : 76,
                                        fontWeight: 'bold', lineHeight: 1.18,
                                        letterSpacing: '0.02em',
                                        fontStyle: isHighlight ? 'italic' : 'normal',
                                        textShadow: isHighlight
                                            ? '0 0 60px rgba(197,160,89,0.6), 0 4px 25px rgba(0,0,0,0.9)'
                                            : '0 4px 30px rgba(0,0,0,0.95), 0 0 50px rgba(0,0,0,0.7)',
                                    }}>{w}</span>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Separator bottom */}
                <div style={{
                    opacity: subOpacity, marginTop: 36, marginBottom: 30,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
                }}>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.5))' }} />
                    <svg width="16" height="16"><polygon points="8,1 15,8 8,15 1,8" fill="none" stroke="#C5A059" strokeWidth="1.2" opacity="0.7" /></svg>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(197,160,89,0.5), transparent)' }} />
                </div>

                {/* Reference */}
                <div style={{ opacity: refOpacity, color: '#C5A059', fontSize: 30, letterSpacing: '0.3em', fontStyle: 'italic' }}>
                    Filipenses 4:13
                </div>
            </div>

            {/* Watermark */}
            <div style={{ position: 'absolute', bottom: 68, left: 0, right: 0, textAlign: 'center', opacity: refOpacity * 0.3, color: '#ffffff', fontSize: 18, letterSpacing: '0.44em', textTransform: 'uppercase' }}>
                Sabiduría para el Corazón
            </div>
        </div>
    );
};
