/**
 * AudioList.jsx
 * Lista filtrable de audios con tabs de categorías.
 */
import { BookOpen, Mic2, Sunrise, Music } from 'lucide-react';
import { CATEGORIES } from '../../data/audio-library';

const ICONS = { todos: Music, predicacion: Mic2, estudio: BookOpen, devocional: Sunrise };

const AudioList = ({ audios, activeId, onSelect, activeCategory, onCategoryChange }) => {
    const filtered = activeCategory === 'todos'
        ? audios
        : audios.filter(a => a.category === activeCategory);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* ─── Tabs de categorías ─── */}
            <div style={{
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
                marginBottom: 16,
            }}>
                {CATEGORIES.map(cat => {
                    const Icon = ICONS[cat.id] || Music;
                    const active = cat.id === activeCategory;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => onCategoryChange(cat.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 5,
                                padding: '5px 12px',
                                borderRadius: 20,
                                border: `1px solid ${active ? '#C5A059' : 'rgba(26,29,35,0.15)'}`,
                                background: active ? '#C5A059' : 'white',
                                color: active ? '#1A1D23' : '#4A4A4A',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                fontFamily: "'Inter', sans-serif",
                                letterSpacing: '0.03em',
                                cursor: 'pointer',
                                transition: 'all 200ms',
                            }}
                        >
                            <Icon size={12} />
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* ─── Lista de audios ─── */}
            <div style={{
                border: '1px solid rgba(26,29,35,0.08)',
                borderRadius: 12,
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
                {filtered.length === 0 ? (
                    <p style={{
                        padding: '32px 20px',
                        textAlign: 'center',
                        color: '#8B8B8B',
                        fontStyle: 'italic',
                        fontSize: '0.875rem',
                    }}>
                        No hay audios en esta categoría aún.
                    </p>
                ) : (
                    filtered.map((audio, idx) => {
                        const isActive = audio.id === activeId;
                        return (
                            <button
                                key={audio.id}
                                onClick={() => onSelect(audio)}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '14px 18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 14,
                                    background: isActive ? 'rgba(197,160,89,0.08)' : 'white',
                                    border: 'none',
                                    borderLeft: `3px solid ${isActive ? '#C5A059' : 'transparent'}`,
                                    borderBottom: idx < filtered.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                                    cursor: 'pointer',
                                    transition: 'background 150ms ease',
                                }}
                                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(197,160,89,0.04)'; }}
                                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'white'; }}
                            >
                                {/* Número / indicador de reproducción */}
                                <div style={{
                                    width: 32, height: 32,
                                    borderRadius: '50%',
                                    background: isActive ? '#C5A059' : 'rgba(197,160,89,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: isActive ? '#1A1D23' : '#C5A059',
                                    fontFamily: "'Inter', sans-serif",
                                }}>
                                    {isActive ? '♪' : idx + 1}
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{
                                        margin: 0,
                                        fontFamily: "'Lora', serif",
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: isActive ? '#1A1D23' : '#1A1D23',
                                        lineHeight: 1.3,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {audio.title}
                                    </p>
                                    <p style={{
                                        margin: '2px 0 0',
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '0.7rem',
                                        color: '#8B8B8B',
                                    }}>
                                        {audio.speaker} · {audio.pasaje}
                                    </p>
                                </div>

                                {/* Duración */}
                                <span style={{
                                    flexShrink: 0,
                                    fontSize: '0.7rem',
                                    fontFamily: 'monospace',
                                    color: isActive ? '#C5A059' : '#ADADAD',
                                    fontWeight: isActive ? 700 : 400,
                                }}>
                                    {audio.duration}
                                </span>
                            </button>
                        );
                    })
                )}
            </div>

            {/* Nota de contenido */}
            <p style={{
                marginTop: 10,
                fontSize: '0.68rem',
                color: '#ADADAD',
                fontFamily: "'Inter', sans-serif",
                fontStyle: 'italic',
                textAlign: 'center',
            }}>
                Nueva biblioteca en construcción — se agregan enseñanzas regularmente.
            </p>
        </div>
    );
};

export default AudioList;
