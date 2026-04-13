/**
 * StepInfoPanel.jsx
 * Panel lateral editorial con información del paso narrativo actual.
 *
 * Solo presentación — consume useNarrative().
 * Usa isTransitioning del engine para fade sincronizado.
 *
 * Jerarquía tipográfica:
 *   Fase        → Badge de la secuencia narrativa
 *   Título      → Lora, 1.625rem, font-weight 600
 *   Pasaje      → Sans, 0.8125rem, opacity 75%
 *   Narrativa   → 0.9375rem, line-height 1.8, párrafos individuales
 *   Descripción → fallback si no hay narrativa
 */
import { useState, useRef, useEffect } from 'react';
import { BookOpen, MapPin, ScrollText, ChevronDown, Route } from 'lucide-react';
import useNarrative from '../../engine/useNarrative';
import EPOCH_CONFIG from '../../data/maps/epoch-config';

// Distancia en km por la fórmula haversine
const haversineKm = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2
        + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.asin(Math.sqrt(a));
};

const fmtKm = (km) => km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km)} km`;

const StepInfoPanel = ({ epochColor: epochColorProp }) => {
    const {
        currentFeature,
        currentStepIndex,
        totalSteps,
        activeRoute,
        status,
        isTransitioning,
    } = useNarrative();

    const [expanded, setExpanded] = useState(false);
    const scrollRef = useRef(null);

    // Scroll to top when step changes
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExpanded(false);
    }, [currentStepIndex]);

    if (status === 'idle' || !currentFeature) return null;

    const props = currentFeature.properties;
    const epochColor = epochColorProp || EPOCH_CONFIG[props.epoca]?.color || '#C5A059';
    const hasNarrative = !!props.narrativa;

    // Distancia parcial (hasta paso actual) y total de la etapa
    const routeFeatures = activeRoute?.features || [];
    let totalDist = 0;
    let partialDist = 0;
    for (let i = 1; i < routeFeatures.length; i++) {
        const [lng1, lat1] = routeFeatures[i - 1].geometry.coordinates;
        const [lng2, lat2] = routeFeatures[i].geometry.coordinates;
        const d = haversineKm(lat1, lng1, lat2, lng2);
        totalDist += d;
        if (i <= currentStepIndex) partialDist += d;
    }

    // Split narrative into paragraphs
    const narrativeParagraphs = hasNarrative
        ? props.narrativa.split('\n\n').filter(p => p.trim())
        : [];

    return (
        <div
            key={`step-${currentStepIndex}`}
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
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '100%',
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
                flexShrink: 0,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Fase badge */}
                    {props.fase && (
                        <span style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: `${epochColor}15`,
                            color: epochColor,
                        }}>
                            {props.fase}
                        </span>
                    )}
                    <MapPin size={14} style={{ color: epochColor, opacity: 0.6 }} />
                </div>
            </div>

            {/* ─── Distance bar ─── */}
            {routeFeatures.length > 1 && (
                <div style={{
                    padding: '6px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    color: '#8B8B8B',
                    letterSpacing: '0.02em',
                    flexShrink: 0,
                    borderBottom: '1px solid rgba(0,0,0,0.04)',
                }}>
                    <Route size={11} style={{ color: epochColor, opacity: 0.7, flexShrink: 0 }} />
                    {currentStepIndex > 0 && (
                        <>
                            <span style={{ color: epochColor, fontWeight: 600 }}>
                                {fmtKm(partialDist)} recorridos
                            </span>
                            <span style={{ opacity: 0.4 }}>·</span>
                        </>
                    )}
                    <span>{fmtKm(totalDist)} total en esta etapa</span>
                </div>
            )}

            {/* ─── Content (scrollable) ─── */}
            <div
                ref={scrollRef}
                style={{
                    padding: '24px',
                    overflowY: 'auto',
                    flex: 1,
                    minHeight: 0,
                }}
            >
                {/* Subtítulo del paso */}
                {props.titulo && (
                    <h4 style={{
                        fontFamily: "'Lora', serif",
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        color: epochColor,
                        margin: '0 0 4px',
                        opacity: 0.85,
                    }}>
                        {props.titulo}
                    </h4>
                )}

                {/* Nombre del lugar */}
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

                {/* Texto narrativo completo (si existe) */}
                {hasNarrative ? (
                    <div style={{ margin: '20px 0 0' }}>
                        {narrativeParagraphs.map((paragraph, i) => (
                            <p
                                key={`${currentStepIndex}-${i}`}
                                style={{
                                    fontSize: '0.9375rem',
                                    lineHeight: 1.8,
                                    color: '#4A4F5A',
                                    margin: i === 0 ? '0' : '14px 0 0',
                                    maxWidth: '65ch',
                                    textAlign: 'justify',
                                    hyphens: 'auto',
                                    animation: 'narrativeFadeIn 400ms ease forwards',
                                    animationDelay: `${i * 60}ms`,
                                    opacity: 0,
                                }}
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                ) : (
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
                )}

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

            {/* CSS Animations */}
            <style>{`
                @keyframes narrativeFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default StepInfoPanel;
