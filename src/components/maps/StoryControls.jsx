/**
 * StoryControls.jsx
 * Panel de controles para el modo Story (paso-a-paso).
 *
 * Props puras — sin lógica de mapa:
 *   currentIndex   — número del paso actual (0-based)
 *   totalSteps     — total de pasos
 *   currentFeature — feature actual (para mostrar nombre)
 *   canGoNext      — boolean
 *   canGoPrev      — boolean
 *   onNext         — () => void
 *   onPrev         — () => void
 *   onExit         — () => void
 *   epochColor     — string
 */
import React from 'react';
import { ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';

const StoryControls = ({
    currentIndex,
    totalSteps,
    currentFeature,
    canGoNext,
    canGoPrev,
    onNext,
    onPrev,
    onExit,
    epochColor = '#C5A059',
}) => {
    const props = currentFeature?.properties;
    if (!props) return null;

    const progress = ((currentIndex + 1) / totalSteps) * 100;

    return (
        <div className="bg-white/95 backdrop-blur-sm border border-sabiduria-gray/10 rounded-sm shadow-lg"
            style={{ width: '320px' }}
        >
            {/* Barra de progreso */}
            <div className="h-1 bg-gray-100 rounded-t-sm overflow-hidden">
                <div
                    className="h-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%`, background: epochColor }}
                />
            </div>

            <div className="p-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: epochColor }}
                    >
                        <BookOpen size={12} />
                        Recorrido paso a paso
                    </span>
                    <button
                        onClick={onExit}
                        className="p-1 rounded hover:bg-gray-100 transition-colors text-sabiduria-gray"
                        title="Salir del recorrido"
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* Nombre del punto */}
                <h4 className="font-serif text-sm font-bold text-sabiduria-navy leading-tight mb-0.5">
                    {props.nombre}
                </h4>
                <span className="text-xs font-semibold" style={{ color: epochColor }}>
                    {props.pasaje}
                </span>

                {/* Controles de navegación */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                    <button
                        onClick={onPrev}
                        disabled={!canGoPrev}
                        className="flex items-center gap-1 text-xs font-medium px-2 py-1.5 rounded transition-all
              disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                        style={{ color: canGoPrev ? epochColor : undefined }}
                    >
                        <ChevronLeft size={14} /> Anterior
                    </button>

                    <span className="text-xs text-sabiduria-gray font-mono tabular-nums">
                        {currentIndex + 1} / {totalSteps}
                    </span>

                    <button
                        onClick={onNext}
                        disabled={!canGoNext}
                        className="flex items-center gap-1 text-xs font-medium px-2 py-1.5 rounded transition-all
              disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                        style={{ color: canGoNext ? epochColor : undefined }}
                    >
                        Siguiente <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoryControls;
