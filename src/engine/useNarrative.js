/**
 * useNarrative.js
 * Hook consumidor del Motor Narrativo Bíblico.
 *
 * Uso:
 *   const {
 *     // Estado
 *     activeRoute, currentStepIndex, status, speed,
 *     // Derivados
 *     currentFeature, totalSteps, canGoNext, canGoPrev, isActive, progress,
 *     // Métodos
 *     start, next, prev, pause, resume, stop, goTo, setSpeed,
 *   } = useNarrative();
 */
import { useContext } from 'react';
import { NarrativeContext } from './NarrativeContext';

const useNarrative = () => {
    const context = useContext(NarrativeContext);

    if (!context) {
        throw new Error(
            'useNarrative debe usarse dentro de un <NarrativeProvider>.\n' +
            'Asegurate de envolver tu componente con <NarrativeProvider>.'
        );
    }

    return context;
};

export default useNarrative;
