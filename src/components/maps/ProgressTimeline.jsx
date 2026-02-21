/**
 * ProgressTimeline.jsx
 * Línea de tiempo interactiva para el Motor Narrativo Bíblico.
 *
 * Solo presentación — consume useNarrative().
 * Segmentos clickeables (goTo), 3 estados visuales, tooltips nativos.
 *
 * Alineado al ancho total del layout (sin maxWidth propio).
 */
import React from 'react';
import useNarrative from '../../engine/useNarrative';

const ProgressTimeline = ({ epochColor = '#C5A059' }) => {
    const {
        activeRoute,
        currentStepIndex,
        totalSteps,
        goTo,
        status,
    } = useNarrative();

    if (status === 'idle' || !activeRoute) return null;

    const features = activeRoute.features;

    return (
        <div style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
            padding: '14px 24px',
            width: '100%',
        }}>
            {/* Segmentos */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
            }}>
                {features.map((feature, i) => {
                    const props = feature.properties;
                    const isCompleted = i < currentStepIndex;
                    const isActive = i === currentStepIndex;
                    const tooltip = `${props.orden || i + 1}. ${props.nombre}\n${props.pasaje}`;

                    return (
                        <button
                            key={props.id || i}
                            onClick={() => goTo(i)}
                            title={tooltip}
                            style={{
                                flex: 1,
                                minWidth: '6px',
                                position: 'relative',
                                padding: 0,
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                outline: 'none',
                            }}
                        >
                            {/* Bar segment */}
                            <div style={{
                                height: isActive ? '5px' : '3px',
                                borderRadius: '4px',
                                background: isActive
                                    ? epochColor
                                    : isCompleted
                                        ? `${epochColor}70`
                                        : 'rgba(0,0,0,0.07)',
                                transition: 'all 500ms ease-out',
                                boxShadow: isActive ? `0 0 10px ${epochColor}40` : 'none',
                            }} />

                            {/* Active indicator dot */}
                            {isActive && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '13px',
                                    height: '13px',
                                    borderRadius: '50%',
                                    background: epochColor,
                                    border: '2.5px solid white',
                                    boxShadow: `0 0 0 2px ${epochColor}35, 0 2px 8px rgba(0,0,0,0.15)`,
                                    transition: 'all 500ms ease-out',
                                }} />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Labels: first and last */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px',
            }}>
                <span style={{
                    fontSize: '0.6875rem',
                    color: '#8B8B8B',
                    fontWeight: 500,
                    maxWidth: '40%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {features[0]?.properties.nombre}
                </span>
                <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: epochColor,
                    opacity: 0.8,
                }}>
                    {currentStepIndex + 1} / {totalSteps}
                </span>
                <span style={{
                    fontSize: '0.6875rem',
                    color: '#8B8B8B',
                    fontWeight: 500,
                    maxWidth: '40%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'right',
                }}>
                    {features[features.length - 1]?.properties.nombre}
                </span>
            </div>
        </div>
    );
};

export default ProgressTimeline;
