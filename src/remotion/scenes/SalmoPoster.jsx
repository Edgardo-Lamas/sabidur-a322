import { Img, staticFile } from 'remotion';

// Composición a 2480×3508px (A4 a 300dpi — apto para imprimir y enmarcar)

export const SalmoPoster = ({ imagePath, numero, titulo, subtitulo, versiculos }) => {
    const mid = Math.ceil(versiculos.length / 2);
    const col1 = versiculos.slice(0, mid);
    const col2 = versiculos.slice(mid);

    return (
        <div style={{
            width: '100%', height: '100%', overflow: 'hidden',
            position: 'relative',
            fontFamily: 'Georgia, "Times New Roman", serif',
        }}>
            {/* Imagen de fondo — cubre todo el póster */}
            <div style={{ position: 'absolute', inset: 0 }}>
                <Img
                    src={staticFile(imagePath)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
                />
            </div>

            {/* Overlay — imagen visible en todo el póster, más oscuro donde hay texto */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(4,3,1,0.48) 0%, rgba(4,3,1,0.52) 18%, rgba(4,3,1,0.65) 40%, rgba(4,3,1,0.75) 65%, rgba(4,3,1,0.82) 100%)',
            }} />

            {/* ── ENCABEZADO ── */}
            <div style={{
                position: 'absolute', top: 120, left: 0, right: 0,
                textAlign: 'center', zIndex: 10,
            }}>
                <div style={{
                    color: 'rgba(197,160,89,0.65)', fontSize: 26,
                    letterSpacing: '0.40em', textTransform: 'uppercase', marginBottom: 18,
                    textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                }}>
                    Reina Valera 1960
                </div>

                <div style={{
                    color: '#C5A059', fontSize: 180, fontWeight: 'bold',
                    letterSpacing: '0.10em', lineHeight: 1,
                    textShadow: '0 4px 50px rgba(0,0,0,0.95), 0 0 80px rgba(197,160,89,0.25)',
                }}>
                    Salmo {numero}
                </div>

                {subtitulo && (
                    <div style={{
                        color: 'rgba(255,255,255,0.72)', fontSize: 36,
                        fontStyle: 'italic', marginTop: 22, letterSpacing: '0.04em',
                        textShadow: '0 2px 20px rgba(0,0,0,0.9)',
                    }}>
                        {subtitulo}
                    </div>
                )}

                {/* Línea decorativa */}
                <div style={{
                    width: 560, height: 2,
                    background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.65), transparent)',
                    margin: '38px auto 0',
                }} />
            </div>

            {/* Título del salmo */}
            <div style={{
                position: 'absolute', top: 490, left: 140, right: 140,
                textAlign: 'center', zIndex: 10,
            }}>
                <div style={{
                    color: 'rgba(255,255,255,0.90)', fontSize: 46,
                    fontStyle: 'italic', letterSpacing: '0.03em', lineHeight: 1.4,
                    textShadow: '0 2px 24px rgba(0,0,0,0.95)',
                }}>
                    {titulo}
                </div>
            </div>

            {/* ── DOS COLUMNAS DE TEXTO ── */}
            <div style={{
                position: 'absolute', top: 620, left: 0, right: 0, bottom: 140,
                padding: '0 110px',
                display: 'flex', gap: 72,
                zIndex: 10,
            }}>
                {[col1, col2].map((col, colIdx) => (
                    <div key={colIdx} style={{
                        flex: 1, display: 'flex', flexDirection: 'column', gap: 14,
                    }}>
                        {col.map((v) => (
                            <div key={v.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <span style={{
                                    color: '#C5A059', fontSize: 22, fontWeight: 'bold',
                                    letterSpacing: '0.04em', marginTop: 3,
                                    minWidth: 34, textAlign: 'right', flexShrink: 0,
                                    textShadow: '0 1px 8px rgba(0,0,0,0.9)',
                                }}>
                                    {v.num}
                                </span>
                                <span style={{
                                    color: 'rgba(255,255,255,0.93)', fontSize: 28,
                                    lineHeight: 1.65, fontStyle: 'italic',
                                    textShadow: '0 1px 14px rgba(0,0,0,0.97), 0 3px 28px rgba(0,0,0,0.8)',
                                }}>
                                    {v.texto}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Marca de agua */}
            <div style={{
                position: 'absolute', bottom: 58, left: 0, right: 0,
                textAlign: 'center', zIndex: 10,
                color: 'rgba(197,160,89,0.42)', fontSize: 22,
                letterSpacing: '0.40em', textTransform: 'uppercase',
                fontFamily: 'Arial, sans-serif',
                textShadow: '0 1px 8px rgba(0,0,0,0.8)',
            }}>
                Sabiduría para el Corazón
            </div>
        </div>
    );
};
