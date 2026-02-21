/**
 * NarrativeContext.jsx
 * Context + Provider para el Motor Narrativo Bíblico.
 *
 * Envuelve narrativeEngine.js (reducer puro) con React:
 * - useReducer para el estado
 * - Métodos dispatch wrappers (start, next, prev, etc.)
 * - Valores derivados (selectors) inyectados en el contexto
 * - AUTOPLAY: setTimeout encadenado cuando status === 'playing'
 *
 * Este provider SOLO gestiona estado narrativo.
 * No tiene conocimiento del mapa, Leaflet, ni DOM.
 * La conexión con el mapa se hará en un adaptador separado.
 */
import React, { createContext, useReducer, useCallback, useMemo, useEffect, useRef } from 'react';
import {
    INITIAL_STATE,
    ACTIONS,
    narrativeReducer,
    selectors,
} from './narrativeEngine';

// ─── CONTEXT ───
export const NarrativeContext = createContext(null);

// Intervalo base en ms entre pasos (speed = 1 → 4 segundos por paso)
const BASE_INTERVAL = 4000;

// ─── PROVIDER ───
export const NarrativeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(narrativeReducer, INITIAL_STATE);
    const timerRef = useRef(null);

    // ─── Action Creators ───
    const start = useCallback(
        (routeId, features, meta) =>
            dispatch({ type: ACTIONS.START, payload: { routeId, features, meta } }),
        []
    );

    const next = useCallback(
        () => dispatch({ type: ACTIONS.NEXT }),
        []
    );

    const prev = useCallback(
        () => dispatch({ type: ACTIONS.PREV }),
        []
    );

    const pause = useCallback(
        () => dispatch({ type: ACTIONS.PAUSE }),
        []
    );

    const resume = useCallback(
        () => dispatch({ type: ACTIONS.RESUME }),
        []
    );

    const stop = useCallback(
        () => dispatch({ type: ACTIONS.STOP }),
        []
    );

    const goTo = useCallback(
        (index) => dispatch({ type: ACTIONS.GO_TO, payload: { index } }),
        []
    );

    const setSpeed = useCallback(
        (speed) => dispatch({ type: ACTIONS.SET_SPEED, payload: { speed } }),
        []
    );

    // ─── Derived Values (selectors) ───
    const derived = useMemo(() => ({
        currentFeature: selectors.currentFeature(state),
        totalSteps: selectors.totalSteps(state),
        canGoNext: selectors.canGoNext(state),
        canGoPrev: selectors.canGoPrev(state),
        isActive: selectors.isActive(state),
        progress: selectors.progress(state),
    }), [state]);

    // ─── AUTOPLAY ───
    // Un solo useEffect con setTimeout encadenado.
    // Se re-ejecuta cuando cambian: status, speed, canGoNext, currentStepIndex.
    // Cada re-ejecución limpia el timer anterior y programa el siguiente paso.
    useEffect(() => {
        // Solo avanzar si: playing + hay siguiente paso
        if (state.status !== 'playing' || !derived.canGoNext) {
            // Limpiar cualquier timer residual
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            return;
        }

        // Programar el siguiente paso
        const delay = BASE_INTERVAL / state.speed;
        timerRef.current = setTimeout(() => {
            dispatch({ type: ACTIONS.NEXT });
        }, delay);

        // Cleanup: se ejecuta al re-render o desmontar
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [state.status, state.speed, state.currentStepIndex, derived.canGoNext]);

    // ─── Context value (estable) ───
    const value = useMemo(() => ({
        // Estado raw
        ...state,
        // Valores derivados
        ...derived,
        // Métodos
        start,
        next,
        prev,
        pause,
        resume,
        stop,
        goTo,
        setSpeed,
    }), [state, derived, start, next, prev, pause, resume, stop, goTo, setSpeed]);

    return (
        <NarrativeContext.Provider value={value}>
            {children}
        </NarrativeContext.Provider>
    );
};
