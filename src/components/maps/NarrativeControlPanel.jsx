/**
 * NarrativeControlPanel.jsx
 * Panel de controles para el Motor Narrativo Bíblico.
 *
 * Solo presentación — consume useNarrative().
 * Diseñado para estar debajo del StepInfoPanel en la columna derecha.
 */
import React from 'react';
import {
    SkipBack,
    Play,
    Pause,
    SkipForward,
    Square,
} from 'lucide-react';
import useNarrative from '../../engine/useNarrative';

const SPEED_OPTIONS = [0.5, 1, 1.5, 2];

const NarrativeControlPanel = ({ epochColor = '#C5A059' }) => {
    const {
        status,
        canGoNext,
        canGoPrev,
        speed,
        next,
        prev,
        pause,
        resume,
        stop,
        setSpeed,
    } = useNarrative();

    if (status === 'idle') return null;

    const isPlaying = status === 'playing';

    const btnBase = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 200ms ease',
    };

    return (
        <div style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
            padding: '16px 24px',
        }}>
            {/* Controles principales */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
            }}>
                {/* Prev */}
                <button
                    onClick={prev}
                    disabled={!canGoPrev}
                    title="Paso anterior"
                    style={{
                        ...btnBase,
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'transparent',
                        color: canGoPrev ? epochColor : '#D0D0D0',
                        opacity: canGoPrev ? 1 : 0.35,
                    }}
                >
                    <SkipBack size={17} />
                </button>

                {/* Play / Pause */}
                <button
                    onClick={isPlaying ? pause : resume}
                    title={isPlaying ? 'Pausar' : 'Reanudar'}
                    style={{
                        ...btnBase,
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: epochColor,
                        color: 'white',
                        boxShadow: `0 2px 8px ${epochColor}40`,
                    }}
                >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                </button>

                {/* Next */}
                <button
                    onClick={next}
                    disabled={!canGoNext}
                    title="Siguiente paso"
                    style={{
                        ...btnBase,
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'transparent',
                        color: canGoNext ? epochColor : '#D0D0D0',
                        opacity: canGoNext ? 1 : 0.35,
                    }}
                >
                    <SkipForward size={17} />
                </button>

                {/* Divider */}
                <div style={{
                    width: '1px',
                    height: '24px',
                    background: 'rgba(0,0,0,0.08)',
                    margin: '0 6px',
                }} />

                {/* Stop */}
                <button
                    onClick={stop}
                    title="Detener recorrido"
                    style={{
                        ...btnBase,
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'transparent',
                        color: '#999',
                    }}
                >
                    <Square size={14} />
                </button>
            </div>

            {/* Speed selector */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(0,0,0,0.05)',
            }}>
                <span style={{
                    fontSize: '0.6875rem',
                    color: '#999',
                    fontWeight: 500,
                    marginRight: '8px',
                    letterSpacing: '0.03em',
                }}>
                    Velocidad
                </span>
                {SPEED_OPTIONS.map((s) => (
                    <button
                        key={s}
                        onClick={() => setSpeed(s)}
                        style={{
                            ...btnBase,
                            padding: '3px 10px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontFamily: "'Inter', monospace",
                            fontWeight: speed === s ? 600 : 400,
                            background: speed === s ? epochColor : 'transparent',
                            color: speed === s ? 'white' : '#999',
                        }}
                    >
                        {s}x
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NarrativeControlPanel;
