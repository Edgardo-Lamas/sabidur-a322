/**
 * HymnsSection.jsx
 * Sección de Himnos Cristianos con historia expandible y reproductor.
 */
import { useState } from 'react';
import VintagePlayer from './VintagePlayer';
import { ChevronDown, Music } from 'lucide-react';
import { HYMNS } from '../../data/audio-library';

const HymnCard = ({ hymn }) => {
    const [expanded, setExpanded] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);

    const paragraphs = hymn.history.split('\n\n').filter(p => p.trim());
    const preview = paragraphs[0];
    const rest = paragraphs.slice(1);

    return (
        <div style={{
            background: 'white',
            border: '1px solid rgba(197,160,89,0.2)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
            {/* Header del himno */}
            <div style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, rgba(197,160,89,0.06) 0%, rgba(249,249,247,0) 100%)',
                borderBottom: '1px solid rgba(197,160,89,0.12)',
            }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <Music size={14} style={{ color: '#C5A059', flexShrink: 0 }} />
                            <span style={{
                                fontSize: '0.65rem',
                                fontFamily: "'Inter', sans-serif",
                                color: '#C5A059',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                            }}>
                                Himno Cristiano · {hymn.year}
                            </span>
                        </div>
                        <h3 style={{
                            fontFamily: "'Lora', serif",
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: '#1A1D23',
                            margin: '0 0 4px',
                        }}>
                            {hymn.title}
                        </h3>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.8rem',
                            color: '#8B8B8B',
                            margin: 0,
                            fontStyle: 'italic',
                        }}>
                            "{hymn.originalTitle}" — {hymn.author}
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 0 }}>

                {/* Historia */}
                <div style={{ padding: '20px 24px', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
                    <h4 style={{
                        fontFamily: "'Lora', serif",
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#1A1D23',
                        margin: '0 0 12px',
                        opacity: 0.8,
                    }}>
                        Historia del himno
                    </h4>

                    {/* Primer párrafo siempre visible */}
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.875rem',
                        lineHeight: 1.75,
                        color: '#4A4A4A',
                        margin: 0,
                    }}>
                        {preview}
                    </p>

                    {/* Resto expandible */}
                    {rest.length > 0 && (
                        <>
                            <div style={{
                                overflow: 'hidden',
                                maxHeight: expanded ? '800px' : '0',
                                transition: 'max-height 400ms ease',
                            }}>
                                {rest.map((p, i) => (
                                    <p key={i} style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '0.875rem',
                                        lineHeight: 1.75,
                                        color: '#4A4A4A',
                                        margin: '12px 0 0',
                                    }}>
                                        {p}
                                    </p>
                                ))}
                            </div>

                            <button
                                onClick={() => setExpanded(v => !v)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    marginTop: 12,
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#C5A059',
                                    fontSize: '0.78rem',
                                    fontWeight: 600,
                                    fontFamily: "'Inter', sans-serif",
                                    padding: 0,
                                }}
                            >
                                {expanded ? 'Mostrar menos' : 'Leer historia completa'}
                                <ChevronDown size={13} style={{
                                    transition: 'transform 300ms',
                                    transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                                }} />
                            </button>
                        </>
                    )}

                    {/* Letra expandible */}
                    {hymn.letra && (
                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                            <button
                                onClick={() => setShowLyrics(v => !v)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#8B8B8B',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    fontFamily: "'Inter', sans-serif",
                                    padding: 0,
                                    letterSpacing: '0.04em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                <Music size={12} />
                                {showLyrics ? 'Ocultar letra' : 'Ver letra'}
                                <ChevronDown size={12} style={{
                                    transition: 'transform 300ms',
                                    transform: showLyrics ? 'rotate(180deg)' : 'rotate(0)',
                                }} />
                            </button>
                            <div style={{
                                overflow: 'hidden',
                                maxHeight: showLyrics ? '600px' : '0',
                                transition: 'max-height 400ms ease',
                            }}>
                                <pre style={{
                                    fontFamily: "'Lora', serif",
                                    fontSize: '0.875rem',
                                    lineHeight: 1.9,
                                    color: '#1A1D23',
                                    whiteSpace: 'pre-wrap',
                                    marginTop: 12,
                                    padding: '16px',
                                    background: 'rgba(197,160,89,0.04)',
                                    borderLeft: '3px solid rgba(197,160,89,0.3)',
                                    borderRadius: '0 6px 6px 0',
                                    fontStyle: 'italic',
                                }}>
                                    {hymn.letra}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>

                {/* Reproductor del himno */}
                <div style={{ padding: '20px', background: 'rgba(249,249,247,0.6)' }}>
                    <VintagePlayer track={{
                        id: hymn.id,
                        title: hymn.title,
                        speaker: hymn.author,
                        pasaje: hymn.originalTitle,
                        description: `${hymn.author} · ${hymn.year}`,
                        url: hymn.url,
                        downloadUrl: hymn.downloadUrl,
                        duration: '',
                    }} />
                </div>
            </div>
        </div>
    );
};

const HymnsSection = () => {
    if (!HYMNS || HYMNS.length === 0) return null;

    return (
        <section style={{ marginTop: 64 }}>
            {/* Separador decorativo */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 32,
            }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(197,160,89,0.2)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Music size={18} style={{ color: '#C5A059' }} />
                    <h2 style={{
                        fontFamily: "'Lora', serif",
                        fontSize: '1.625rem',
                        fontWeight: 700,
                        color: '#1A1D23',
                        margin: 0,
                    }}>
                        Himnos Cristianos
                    </h2>
                </div>
                <div style={{ flex: 1, height: 1, background: 'rgba(197,160,89,0.2)' }} />
            </div>

            <p style={{
                fontFamily: "'Lora', serif",
                fontSize: '1rem',
                fontStyle: 'italic',
                color: '#4A4A4A',
                lineHeight: 1.7,
                maxWidth: '65ch',
                margin: '0 auto 40px',
                textAlign: 'center',
            }}>
                Detrás de cada himno hay una historia: una crisis, una conversión, un momento donde la gracia se volvió canción. Conocer esa historia es escuchar el himno con otros oídos.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {HYMNS.map(hymn => (
                    <HymnCard key={hymn.id} hymn={hymn} />
                ))}
            </div>
        </section>
    );
};

export default HymnsSection;
