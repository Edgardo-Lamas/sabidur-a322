import { Img, staticFile } from 'remotion';

// Two-column psalm text layout for print-quality A4 portrait posters (1240x1752)

export const SalmoPoster = ({ imagePath, numero, titulo, subtitulo, keyword, versiculos }) => {
    const mid = Math.ceil(versiculos.length / 2);
    const col1 = versiculos.slice(0, mid);
    const col2 = versiculos.slice(mid);

    return (
        <div style={{
            width: '100%', height: '100%', overflow: 'hidden',
            position: 'relative', background: '#0d0c0a',
            fontFamily: 'Georgia, "Times New Roman", serif',
        }}>

            {/* Background image — top half visible, fades to dark */}
            <div style={{ position: 'absolute', inset: 0 }}>
                <Img
                    src={staticFile(imagePath)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
            </div>

            {/* Strong overlay: transparent at top, nearly opaque from 35% down */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(8,7,4,0.10) 0%, rgba(8,7,4,0.25) 18%, rgba(8,7,4,0.72) 36%, rgba(8,7,4,0.93) 52%, rgba(6,5,2,0.98) 65%, rgba(6,5,2,1) 80%)',
            }} />

            {/* Top section: Psalm number + keyword */}
            <div style={{
                position: 'absolute', top: 56, left: 0, right: 0,
                textAlign: 'center', zIndex: 10,
            }}>
                <div style={{
                    color: 'rgba(197,160,89,0.55)', fontSize: 13,
                    letterSpacing: '0.38em', textTransform: 'uppercase',
                    marginBottom: 10,
                }}>
                    Reina Valera 1960
                </div>
                <div style={{
                    color: '#C5A059', fontSize: 88, fontWeight: 'bold',
                    letterSpacing: '0.14em', lineHeight: 1,
                    textShadow: '0 0 80px rgba(197,160,89,0.5), 0 4px 30px rgba(0,0,0,0.95)',
                }}>
                    Salmo {numero}
                </div>
                {subtitulo && (
                    <div style={{
                        color: 'rgba(255,255,255,0.55)', fontSize: 18,
                        fontStyle: 'italic', marginTop: 10, letterSpacing: '0.04em',
                    }}>
                        {subtitulo}
                    </div>
                )}
            </div>

            {/* Title banner — sits over the image/text transition */}
            <div style={{
                position: 'absolute', top: '30%', left: 0, right: 0,
                textAlign: 'center', zIndex: 10, padding: '0 80px',
            }}>
                {/* Decorative line */}
                <div style={{
                    width: 320, height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.7), transparent)',
                    margin: '0 auto 18px',
                }} />
                <div style={{
                    color: 'rgba(255,255,255,0.90)', fontSize: 26,
                    fontStyle: 'italic', letterSpacing: '0.04em', lineHeight: 1.4,
                    textShadow: '0 3px 18px rgba(0,0,0,0.95)',
                }}>
                    {titulo}
                </div>
                <div style={{
                    width: 320, height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.7), transparent)',
                    margin: '18px auto 0',
                }} />
            </div>

            {/* Two-column psalm text */}
            <div style={{
                position: 'absolute', top: '42%', left: 0, right: 0, bottom: 80,
                padding: '0 64px',
                display: 'flex', gap: 40,
                zIndex: 10,
            }}>
                {[col1, col2].map((col, colIdx) => (
                    <div key={colIdx} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {col.map((v) => (
                            <div key={v.num} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <span style={{
                                    color: '#C5A059', fontSize: 11, fontWeight: 'bold',
                                    letterSpacing: '0.05em', marginTop: 2,
                                    minWidth: 18, textAlign: 'right', flexShrink: 0,
                                }}>
                                    {v.num}
                                </span>
                                <span style={{
                                    color: 'rgba(255,255,255,0.87)', fontSize: 14,
                                    lineHeight: 1.55, fontStyle: 'italic',
                                    textShadow: '0 1px 8px rgba(0,0,0,0.9)',
                                }}>
                                    {v.texto}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Bottom watermark */}
            <div style={{
                position: 'absolute', bottom: 32, left: 0, right: 0,
                textAlign: 'center', zIndex: 10,
                color: 'rgba(197,160,89,0.35)', fontSize: 12,
                letterSpacing: '0.36em', textTransform: 'uppercase',
                fontFamily: 'Arial, sans-serif',
            }}>
                Sabiduría para el Corazón
            </div>
        </div>
    );
};
