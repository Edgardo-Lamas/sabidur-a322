/**
 * StepInfoPanel.jsx
 * Panel lateral editorial con información del paso narrativo actual.
 *
 * Solo presentación — consume useNarrative().
 * Usa isTransitioning del engine para fade sincronizado.
 *
 * Jerarquía tipográfica:
 *   Título      → Lora, 1.625rem, font-weight 600
 *   Pasaje      → Sans, 0.8125rem, opacity 75%
 *   Descripción → 1rem, line-height 1.7, max-width ~65ch
 *   Contexto    → 0.875rem, fondo sutil + border-left
 *   Teología    → 0.8125rem, expandible
 */
import React, { useState } from 'react';
import { BookOpen, MapPin, ScrollText, ChevronDown } from 'lucide-react';
import useNarrative from '../../engine/useNarrative';
import EPOCH_CONFIG from '../../data/maps/epoch-config';

const StepInfoPanel = ({ epochColor: epochColorProp }) => {
    const {
        currentFeature,
        currentStepIndex,
        totalSteps,
        status,
        isTransitioning,
    } = useNarrative();

    const [expanded, setExpanded] = useState(false);

    if (status === 'idle' || !currentFeature) return null;

    const props = currentFeature.properties;
    const epochColor = epochColorProp || EPOCH_CONFIG[props.epoca]?.color || '#C5A059';

    return (
        <div
            style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
                transition: 'opacity 280ms ease, transform 280ms ease',
            }}
        >
            {/* ─── Header ─── */}
            <div style={{
                padding: '14px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: `${epochColor}0A`,
                borderBottom: '1px solid rgba(0,0,0,0.04)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: epochColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                    }}>
                        {props.orden || currentStepIndex + 1}
                    </span>
                    <span style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#8B8B8B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                    }}>
                        Paso {currentStepIndex + 1} de {totalSteps}
                    </span>
                </div>
                <MapPin size={14} style={{ color: epochColor, opacity: 0.6 }} />
            </div>

            {/* ─── Content ─── */}
            <div style={{ padding: '24px' }}>
                {/* Título del lugar */}
                <h3 style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '1.625rem',
                    fontWeight: 600,
                    color: '#1A1D23',
                    lineHeight: 1.25,
                    margin: '0 0 6px',
                    letterSpacing: '-0.01em',
                }}>
                    {props.nombre}
                </h3>

                {/* Referencia bíblica */}
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: epochColor,
                    opacity: 0.8,
                    marginBottom: '20px',
                }}>
                    <BookOpen size={12} />
                    {props.pasaje}
                </span>

                {/* Texto narrativo */}
                <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: '#4A4F5A',
                    margin: '20px 0 0',
                    maxWidth: '65ch',
                    textAlign: 'justify',
                    hyphens: 'auto',
                }}>
                    {props.descripcion}
                </p>

                {/* Contexto histórico (opcional) */}
                {props.contexto && (
                    <div style={{
                        marginTop: '20px',
                        padding: '14px 16px',
                        borderRadius: '8px',
                        background: `${epochColor}05`,
                        borderLeft: `3px solid ${epochColor}30`,
                    }}>
                        <span style={{
                            display: 'block',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: '#1A1D23',
                            marginBottom: '6px',
                            opacity: 0.7,
                        }}>
                            Contexto histórico
                        </span>
                        <span style={{
                            fontSize: '0.875rem',
                            lineHeight: 1.65,
                            color: '#5A5F6A',
                        }}>
                            {props.contexto}
                        </span>
                    </div>
                )}

                {/* Nota teológica expandible (opcional) */}
                {props.teologia && (
                    <div style={{
                        marginTop: '18px',
                        paddingTop: '14px',
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                    }}>
                        <button
                            onClick={() => setExpanded((prev) => !prev)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                width: '100%',
                                padding: 0,
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: epochColor,
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                            }}
                        >
                            <ScrollText size={13} />
                            Nota teológica
                            <ChevronDown
                                size={12}
                                style={{
                                    marginLeft: 'auto',
                                    transition: 'transform 300ms ease',
                                    transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                                }}
                            />
                        </button>
                        <div style={{
                            overflow: 'hidden',
                            transition: 'max-height 300ms ease, opacity 300ms ease',
                            maxHeight: expanded ? '240px' : '0',
                            opacity: expanded ? 1 : 0,
                        }}>
                            <p style={{
                                fontSize: '0.8125rem',
                                lineHeight: 1.65,
                                color: '#5A5F6A',
                                margin: '10px 0 0',
                                textAlign: 'justify',
                            }}>
                                {props.teologia}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StepInfoPanel;
