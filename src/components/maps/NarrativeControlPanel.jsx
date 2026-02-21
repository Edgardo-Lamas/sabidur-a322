/**
 * NarrativeControlPanel.jsx
 * Panel de controles flotante para el Motor Narrativo Bíblico.
 *
 * Solo presentación — no contiene lógica narrativa.
 * Lee estado y llama métodos via useNarrative().
 *
 * Diseñado como overlay flotante sobre el mapa.
 */
import React from 'react';
import {
    SkipBack,
    Play,
    Pause,
    SkipForward,
    Square,
    BookOpen,
} from 'lucide-react';
import useNarrative from '../../engine/useNarrative';

const SPEED_OPTIONS = [0.5, 1, 1.5, 2];

const NarrativeControlPanel = ({ epochColor = '#C5A059' }) => {
    const {
        status,
        currentStepIndex,
        totalSteps,
        currentFeature,
        canGoNext,
        canGoPrev,
        progress,
        speed,
        next,
        prev,
        pause,
        resume,
        stop,
        setSpeed,
    } = useNarrative();

    // Solo renderizar si hay narrativa activa
    if (status === 'idle') return null;

    const props = currentFeature?.properties;
    const isPlaying = status === 'playing';

    return (
        <div
            className="bg-white/95 backdrop-blur-sm border border-sabiduria-gray/10 rounded-sm shadow-lg"
            style={{ width: '360px' }}
        >
            {/* Barra de progreso */}
            <div className="h-1 bg-gray-100 rounded-t-sm overflow-hidden">
                <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{ width: `${progress}%`, background: epochColor }}
                />
            </div>

            <div className="p-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <span
                        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: epochColor }}
                    >
                        <BookOpen size={12} />
                        Recorrido narrativo
                    </span>
                    <span className="text-xs text-sabiduria-gray font-mono tabular-nums">
                        {currentStepIndex + 1} / {totalSteps}
                    </span>
                </div>

                {/* Nombre del punto actual */}
                {props && (
                    <div className="mb-3">
                        <h4 className="font-serif text-sm font-bold text-sabiduria-navy leading-tight">
                            {props.nombre}
                        </h4>
                        <span className="text-xs font-semibold" style={{ color: epochColor }}>
                            {props.pasaje}
                        </span>
                    </div>
                )}

                {/* Controles principales */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    {/* Prev */}
                    <button
                        onClick={prev}
                        disabled={!canGoPrev}
                        className="p-1.5 rounded transition-colors disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gray-100"
                        title="Paso anterior"
                    >
                        <SkipBack size={16} style={{ color: canGoPrev ? epochColor : undefined }} />
                    </button>

                    {/* Play / Pause */}
                    <button
                        onClick={isPlaying ? pause : resume}
                        className="p-2 rounded-full transition-all hover:scale-105"
                        style={{ background: epochColor, color: 'white' }}
                        title={isPlaying ? 'Pausar' : 'Reanudar'}
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    {/* Next */}
                    <button
                        onClick={next}
                        disabled={!canGoNext}
                        className="p-1.5 rounded transition-colors disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gray-100"
                        title="Siguiente paso"
                    >
                        <SkipForward size={16} style={{ color: canGoNext ? epochColor : undefined }} />
                    </button>

                    {/* Stop */}
                    <button
                        onClick={stop}
                        className="p-1.5 rounded transition-colors hover:bg-gray-100 text-sabiduria-gray hover:text-red-500"
                        title="Detener recorrido"
                    >
                        <Square size={14} />
                    </button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-gray-200 mx-1" />

                    {/* Speed selector */}
                    <div className="flex items-center gap-0.5">
                        {SPEED_OPTIONS.map((s) => (
                            <button
                                key={s}
                                onClick={() => setSpeed(s)}
                                className="px-1.5 py-0.5 rounded text-xs font-mono font-medium transition-all"
                                style={{
                                    background: speed === s ? epochColor : 'transparent',
                                    color: speed === s ? 'white' : '#999',
                                }}
                            >
                                {s}x
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NarrativeControlPanel;
