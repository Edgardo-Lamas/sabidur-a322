/* eslint-disable react-refresh/only-export-components */
/**
 * NarrativeContext.jsx
 * Context + Provider para el Motor Narrativo Bíblico.
 *
 * Envuelve narrativeEngine.js (reducer puro) con React:
 * - useReducer para el estado
 * - Métodos dispatch wrappers (start, next, prev, etc.)
 * - Valores derivados (selectors) inyectados en el contexto
 * - AUTOPLAY: setTimeout encadenado cuando status === 'playing'
 * - TRANSICIÓN EVENT-DRIVEN:
 *     transitionTo() → isTransitioning=true → dispatch step
 *     El adaptador de mapa ejecuta flyTo → map.once('moveend') →
 *     llama onTransitionComplete() → isTransitioning=false
 *
 * Este provider SOLO gestiona estado narrativo.
 * No tiene conocimiento del mapa, Leaflet, ni DOM.
 * La conexión con el mapa se hará en un adaptador separado.
 */
import { createContext, useReducer, useCallback, useMemo, useEffect, useRef } from 'react';
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
    const autoplayTimerRef = useRef(null);

    // ───────────────────────────────
    //  TRANSICIÓN EVENT-DRIVEN
    //
    //  Flujo completo:
    //    1. transitionTo(action):
    //       - isTransitioning = true  (UI hace fade out)
    //       - dispatch(action)        (currentStepIndex cambia)
    //
    //    2. useNarrativeMap detecta currentFeature cambió:
    //       - flyTo(nuevo punto)
    //       - map.once('moveend', onTransitionComplete)
    //
    //    3. onTransitionComplete():
    //       - isTransitioning = false (UI hace fade in)
    //       - Autoplay programa siguiente paso
    //
    //  Si no hay mapa conectado, isTransitioning queda en true.
    //  Por eso el adaptador DEBE llamar onTransitionComplete.
    // ───────────────────────────────
    const transitionTo = useCallback((action) => {
        dispatch({ type: ACTIONS.SET_TRANSITIONING, payload: true });
        dispatch(action);
    }, []);

    /**
     * Debe ser llamado por el adaptador de mapa (useNarrativeMap)
     * después de que flyTo termine (via map.once('moveend')).
     */
    const onTransitionComplete = useCallback(() => {
        dispatch({ type: ACTIONS.SET_TRANSITIONING, payload: false });
    }, []);

    // ─── Action Creators ───
    const start = useCallback(
        (routeId, features, meta) =>
            dispatch({ type: ACTIONS.START, payload: { routeId, features, meta } }),
        []
    );

    const next = useCallback(() => {
        if (!selectors.canGoNext(state)) return;
        transitionTo({ type: ACTIONS.NEXT });
    }, [state, transitionTo]);

    const prev = useCallback(() => {
        if (!selectors.canGoPrev(state)) return;
        transitionTo({ type: ACTIONS.PREV });
    }, [state, transitionTo]);

    const goTo = useCallback((index) => {
        if (index === state.currentStepIndex) return;
        transitionTo({ type: ACTIONS.GO_TO, payload: { index } });
    }, [state.currentStepIndex, transitionTo]);

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

    // ─── Route Starter (puente con MapaBiblico) ───
    // MapaBiblico registra handleStartNarrative vía setRouteStarter.
    // NarrativeControlPanel lo invoca vía startRoute(routeId) para
    // avanzar a la siguiente etapa sin pasar props por NarrativeLayout.
    const routeStarterRef = useRef(null);

    const setRouteStarter = useCallback((fn) => {
        routeStarterRef.current = fn;
    }, []);

    const startRoute = useCallback((routeId) => {
        routeStarterRef.current?.(routeId);
    }, []);

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
    // setTimeout encadenado. Usa transitionTo para que cada avance
    // automático pase por el mismo flujo de transición que next/prev/goTo.
    // Espera a que isTransitioning=false (flyTo completó) antes de programar el siguiente.
    useEffect(() => {
        if (state.status !== 'playing' || !derived.canGoNext || state.isTransitioning) {
            if (autoplayTimerRef.current) {
                clearTimeout(autoplayTimerRef.current);
                autoplayTimerRef.current = null;
            }
            return;
        }

        const delay = BASE_INTERVAL / state.speed;
        autoplayTimerRef.current = setTimeout(() => {
            transitionTo({ type: ACTIONS.NEXT });
        }, delay);

        return () => {
            if (autoplayTimerRef.current) {
                clearTimeout(autoplayTimerRef.current);
                autoplayTimerRef.current = null;
            }
        };
    }, [state.status, state.speed, state.currentStepIndex, state.isTransitioning, derived.canGoNext, transitionTo]);

    // ─── Cleanup al desmontar ───
    useEffect(() => {
        return () => {
            if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
        };
    }, []);

    // ─── Context value ───
    // Computed on every render to ensure consumers always get fresh state.
    // Individual callbacks are already memoized with useCallback.
    const value = {
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
        onTransitionComplete,
        // Puente para auto-avance entre etapas
        setRouteStarter,
        startRoute,
    };

    return (
        <NarrativeContext.Provider value={value}>
            {children}
        </NarrativeContext.Provider>
    );
};

