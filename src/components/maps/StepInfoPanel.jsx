/**
 * StepInfoPanel.jsx
 * Panel lateral con información detallada del paso narrativo actual.
 *
 * Solo presentación — consume useNarrative() para leer estado.
 * Implementa fade out/in cuando cambia currentStepIndex.
 *
 * Campos mostrados (todos del feature.properties):
 *   nombre       — título del paso
 *   pasaje       — referencia bíblica
 *   descripcion  — texto narrativo principal
 *   contexto     — contexto histórico (opcional)
 *   teologia     — nota teológica expandible (opcional)
 */
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, MapPin, ScrollText, ChevronDown } from 'lucide-react';
import useNarrative from '../../engine/useNarrative';
import EPOCH_CONFIG from '../../data/maps/epoch-config';

const StepInfoPanel = () => {
    const { currentFeature, currentStepIndex, totalSteps, status } = useNarrative();

    // ─── Fade transition ───
    const [visible, setVisible] = useState(true);
    const [displayedFeature, setDisplayedFeature] = useState(currentFeature);
    const [expanded, setExpanded] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Fade out
        setVisible(false);
        setExpanded(false);

        // Swap content after fade out, then fade in
        timeoutRef.current = setTimeout(() => {
            setDisplayedFeature(currentFeature);
            setVisible(true);
        }, 250);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentStepIndex, currentFeature]);

    if (status === 'idle' || !displayedFeature) return null;

    const props = displayedFeature.properties;
    const epochColor = EPOCH_CONFIG[props.epoca]?.color || '#C5A059';

    return (
        <div
            className="bg-white/95 backdrop-blur-sm border border-sabiduria-gray/10 rounded-sm shadow-lg overflow-hidden transition-all duration-300"
            style={{
                width: '320px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(6px)',
            }}
        >
            {/* Header con número de paso */}
            <div
                className="px-4 py-2.5 flex items-center justify-between"
                style={{ background: `${epochColor}12` }}
            >
                <div className="flex items-center gap-2">
                    <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: epochColor }}
                    >
                        {props.orden || currentStepIndex + 1}
                    </span>
                    <span className="text-xs font-semibold text-sabiduria-gray uppercase tracking-wider">
                        Paso {currentStepIndex + 1} de {totalSteps}
                    </span>
                </div>
                <MapPin size={14} style={{ color: epochColor }} />
            </div>

            <div className="px-4 py-3 space-y-3">
                {/* Título */}
                <div>
                    <h3 className="font-serif text-lg font-bold text-sabiduria-navy leading-tight">
                        {props.nombre}
                    </h3>
                    <span
                        className="inline-block mt-1 text-xs font-semibold"
                        style={{ color: epochColor }}
                    >
                        <BookOpen size={11} className="inline mr-1 -mt-0.5" />
                        {props.pasaje}
                    </span>
                </div>

                {/* Texto narrativo principal */}
                <p className="text-sm text-sabiduria-gray leading-relaxed text-justify">
                    {props.descripcion}
                </p>

                {/* Contexto histórico (opcional) */}
                {props.contexto && (
                    <div
                        className="text-xs leading-relaxed rounded px-3 py-2"
                        style={{ background: `${epochColor}08`, borderLeft: `3px solid ${epochColor}` }}
                    >
                        <span className="font-semibold text-sabiduria-navy block mb-0.5">
                            Contexto histórico
                        </span>
                        <span className="text-sabiduria-gray">{props.contexto}</span>
                    </div>
                )}

                {/* Nota teológica expandible (opcional) */}
                {props.teologia && (
                    <div className="border-t border-gray-100 pt-2">
                        <button
                            onClick={() => setExpanded((prev) => !prev)}
                            className="flex items-center gap-1.5 text-xs font-semibold w-full text-left transition-colors"
                            style={{ color: epochColor }}
                        >
                            <ScrollText size={12} />
                            Nota teológica
                            <ChevronDown
                                size={12}
                                className="ml-auto transition-transform duration-300"
                                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}
                            />
                        </button>
                        <div
                            className="overflow-hidden transition-all duration-300 ease-out"
                            style={{
                                maxHeight: expanded ? '200px' : '0',
                                opacity: expanded ? 1 : 0,
                                marginTop: expanded ? '8px' : '0',
                            }}
                        >
                            <p className="text-xs text-sabiduria-gray leading-relaxed text-justify">
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
