/**
 * ProgressTimeline.jsx
 * Línea de tiempo interactiva para el Motor Narrativo Bíblico.
 *
 * Solo presentación — no contiene lógica narrativa.
 * Lee estado via useNarrative() y llama goTo(index) en clicks.
 *
 * Cada segmento tiene 3 estados visuales:
 *   completed  — antes del paso actual (relleno sólido)
 *   active     — paso actual (relleno + escala + pulso)
 *   pending    — después del paso actual (borde sutil)
 *
 * Tooltip nativo vía title (sin dependencias externas).
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
        <div
            className="bg-white/95 backdrop-blur-sm border border-sabiduria-gray/10 rounded-sm shadow-md px-3 py-2"
            style={{ width: '100%', maxWidth: '600px' }}
        >
            {/* Segmentos */}
            <div className="flex items-center gap-1">
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
                            className="relative group flex-1 focus:outline-none"
                            style={{ minWidth: '8px' }}
                        >
                            {/* Bar */}
                            <div
                                className="h-2 rounded-full transition-all duration-500 ease-out"
                                style={{
                                    background: isActive
                                        ? epochColor
                                        : isCompleted
                                            ? `${epochColor}90`
                                            : '#E5E7EB',
                                    transform: isActive ? 'scaleY(1.5)' : 'scaleY(1)',
                                    boxShadow: isActive ? `0 0 8px ${epochColor}50` : 'none',
                                }}
                            />

                            {/* Dot on active */}
                            {isActive && (
                                <div
                                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white transition-transform duration-500"
                                    style={{
                                        background: epochColor,
                                        boxShadow: `0 0 0 2px ${epochColor}40, 0 2px 6px rgba(0,0,0,0.2)`,
                                    }}
                                />
                            )}

                            {/* Hover indicator */}
                            <div
                                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ background: epochColor }}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Labels: first and last */}
            <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-sabiduria-gray truncate max-w-[40%]">
                    {features[0]?.properties.nombre}
                </span>
                <span className="text-[10px] text-sabiduria-gray truncate max-w-[40%] text-right">
                    {features[features.length - 1]?.properties.nombre}
                </span>
            </div>
        </div>
    );
};

export default ProgressTimeline;
