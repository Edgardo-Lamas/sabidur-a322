import { useCurrentFrame, useVideoConfig, interpolate, Img } from 'remotion';

const PHOTO = 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1080&h=1920&q=85';

// Bokeh circles — large blurry gold/white orbs visible against the photo
const BOKEH = Array.from({ length: 18 }, (_, i) => ({
    x: (i * 137.508) % 1000 + 40,
    size: 25 + (i % 6) * 22,
    opacity: 0.07 + (i % 5) * 0.05,
    blur: 10 + (i % 4) * 8,
    speed: 0.18 + (i % 5) * 0.09,
    offset: i * 97,
    color: i % 3 === 0 ? '#C5A059' : i % 3 === 1 ? '#E8D5A0' : '#ffffff',
}));

// Small sharp particles
const PARTICLES = Array.from({ length: 35 }, (_, i) => ({
    x: (i * 113.4) % 1080,
    size: 1.5 + (i % 3) * 1.2,
    opacity: 0.3 + (i % 4) * 0.15,
    speed: 0.4 + (i % 6) * 0.12,
    offset: i * 53,
}));

export const WallpaperLampara = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Ken Burns: slow zoom in + slight pan
    const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.09], { extrapolateRight: 'clamp' });
    const panX = interpolate(frame, [0, durationInFrames], [0, -25], { extrapolateRight: 'clamp' });

    // One-time light leak sweep (frames 0–70)
    const leakX = interpolate(frame, [0, 70], [-500, 1600], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const leakOpacity = interpolate(frame, [0, 15, 50, 70], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Word-by-word reveal
    const words1 = ['Lámpara', 'es', 'a', 'mis', 'pies'];
    const words2 = ['tu', 'palabra'];
    const WORD_DELAY = 7;
    const getWordAnim = (wordIndex) => {
        const start = 25 + wordIndex * WORD_DELAY;
        return {
            opacity: interpolate(frame, [start, start + 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            y: interpolate(frame, [start, start + 14], [18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        };
    };

    const refOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const lineW = interpolate(frame, [70, 105], [0, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', fontFamily: 'Georgia, "Times New Roman", serif' }}>

            {/* Photo layer — Ken Burns */}
            <div style={{ position: 'absolute', inset: '-6%', transform: `scale(${scale}) translateX(${panX}px)`, transformOrigin: 'center center' }}>
                <Img src={PHOTO} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Color grade: deep blue-indigo overlay — preserves stars */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(175deg, rgba(5,8,20,0.45) 0%, rgba(10,14,30,0.55) 40%, rgba(5,8,20,0.82) 100%)' }} />

            {/* Vignette */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.68) 100%)' }} />

            {/* Bokeh orbs */}
            {BOKEH.map((b, i) => {
                const totalH = 1920 + b.size * 2;
                const y = ((frame * b.speed + b.offset) % totalH) - b.size;
                return (
                    <div key={i} style={{
                        position: 'absolute', left: b.x, bottom: y,
                        width: b.size, height: b.size, borderRadius: '50%',
                        background: b.color, opacity: b.opacity,
                        filter: `blur(${b.blur}px)`,
                    }} />
                );
            })}

            {/* Sharp particles */}
            {PARTICLES.map((p, i) => {
                const y = ((frame * p.speed + p.offset) % 2000) - 10;
                return (
                    <div key={i} style={{
                        position: 'absolute', left: p.x, bottom: y,
                        width: p.size, height: p.size, borderRadius: '50%',
                        background: '#C5A059', opacity: p.opacity,
                    }} />
                );
            })}

            {/* Light leak */}
            <div style={{
                position: 'absolute', inset: 0, overflow: 'hidden', opacity: leakOpacity,
                background: `linear-gradient(105deg, transparent ${leakX - 300}px, rgba(197,160,89,0.08) ${leakX - 100}px, rgba(255,235,180,0.14) ${leakX}px, rgba(197,160,89,0.08) ${leakX + 100}px, transparent ${leakX + 300}px)`,
            }} />

            {/* Main text — lower third */}
            <div style={{
                position: 'absolute', bottom: 220, left: 0, right: 0,
                padding: '0 72px', textAlign: 'center', zIndex: 10,
            }}>
                {/* Decorative line */}
                <div style={{ width: lineW, height: 1, background: 'linear-gradient(90deg, transparent, #C5A059, transparent)', margin: '0 auto 40px', opacity: 0.8 }} />

                {/* Line 1 */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 14px', marginBottom: 12 }}>
                    {words1.map((w, i) => {
                        const a = getWordAnim(i);
                        return (
                            <span key={i} style={{
                                display: 'inline-block', opacity: a.opacity, transform: `translateY(${a.y}px)`,
                                color: '#ffffff', fontSize: 78, fontWeight: 'bold', lineHeight: 1.15,
                                textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)',
                                letterSpacing: '0.02em',
                            }}>{w}</span>
                        );
                    })}
                </div>

                {/* Line 2 — gold */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 14px', marginBottom: 38 }}>
                    {words2.map((w, i) => {
                        const a = getWordAnim(words1.length + i);
                        return (
                            <span key={i} style={{
                                display: 'inline-block', opacity: a.opacity, transform: `translateY(${a.y}px)`,
                                color: '#C5A059', fontSize: 78, fontWeight: 'bold', lineHeight: 1.15,
                                textShadow: '0 0 50px rgba(197,160,89,0.6), 0 4px 20px rgba(0,0,0,0.8)',
                                fontStyle: 'italic', letterSpacing: '0.02em',
                            }}>{w}</span>
                        );
                    })}
                </div>

                {/* Decorative line bottom */}
                <div style={{ width: lineW, height: 1, background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.6), transparent)', margin: '0 auto 32px' }} />

                {/* Reference */}
                <div style={{ opacity: refOpacity, color: '#C5A059', fontSize: 30, letterSpacing: '0.32em', fontStyle: 'italic' }}>
                    Salmos 119:105
                </div>
            </div>

            {/* Watermark */}
            <div style={{ position: 'absolute', bottom: 72, left: 0, right: 0, textAlign: 'center', opacity: refOpacity * 0.3, color: '#ffffff', fontSize: 18, letterSpacing: '0.44em', textTransform: 'uppercase' }}>
                Sabiduría para el Corazón
            </div>
        </div>
    );
};
