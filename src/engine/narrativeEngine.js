/**
 * narrativeEngine.js
 * Motor narrativo bíblico — máquina de estados pura.
 *
 * Este módulo contiene SOLO lógica de estado (reducer + helpers).
 * No tiene dependencias de React, Leaflet ni DOM.
 * Es testeable de forma aislada.
 *
 * ESTADOS:
 *   idle     → sin ruta activa
 *   playing  → recorriendo pasos automáticamente o manualmente
 *   paused   → detenido en un paso específico
 *
 * TRANSICIONES:
 *   idle     → start()   → playing
 *   playing  → pause()   → paused
 *   playing  → stop()    → idle
 *   playing  → next()    → playing (o paused si es el último)
 *   playing  → prev()    → playing
 *   paused   → resume()  → playing
 *   paused   → stop()    → idle
 *   paused   → next()    → paused
 *   paused   → prev()    → paused
 *   *        → goTo(i)   → mantiene status actual
 */

// ─── INITIAL STATE ───
export const INITIAL_STATE = {
    activeRoute: null,      // { id: string, features: Feature[], meta?: object }
    currentStepIndex: 0,
    status: 'idle',         // 'idle' | 'playing' | 'paused'
    speed: 1,               // multiplicador de velocidad (0.5, 1, 1.5, 2)
    isTransitioning: false, // true durante el delay de transición entre pasos
};

// ─── ACTION TYPES ───
export const ACTIONS = {
    START: 'NARRATIVE_START',
    NEXT: 'NARRATIVE_NEXT',
    PREV: 'NARRATIVE_PREV',
    PAUSE: 'NARRATIVE_PAUSE',
    RESUME: 'NARRATIVE_RESUME',
    STOP: 'NARRATIVE_STOP',
    GO_TO: 'NARRATIVE_GO_TO',
    SET_SPEED: 'NARRATIVE_SET_SPEED',
    SET_TRANSITIONING: 'NARRATIVE_SET_TRANSITIONING',
};

// ─── REDUCER ───
export const narrativeReducer = (state, action) => {
    switch (action.type) {

        case ACTIONS.START: {
            const { routeId, features, meta } = action.payload;
            if (!features?.length) return state;
            return {
                ...state,
                activeRoute: { id: routeId, features, meta: meta || null },
                currentStepIndex: 0,
                status: 'playing',
            };
        }

        case ACTIONS.NEXT: {
            if (!state.activeRoute) return state;
            const maxIndex = state.activeRoute.features.length - 1;
            const nextIndex = Math.min(state.currentStepIndex + 1, maxIndex);
            return {
                ...state,
                currentStepIndex: nextIndex,
                // Si llegó al final, pausar automáticamente
                status: nextIndex === maxIndex ? 'paused' : state.status,
            };
        }

        case ACTIONS.PREV: {
            if (!state.activeRoute) return state;
            return {
                ...state,
                currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
            };
        }

        case ACTIONS.PAUSE: {
            if (state.status !== 'playing') return state;
            return { ...state, status: 'paused' };
        }

        case ACTIONS.RESUME: {
            if (state.status !== 'paused') return state;
            return { ...state, status: 'playing' };
        }

        case ACTIONS.STOP: {
            return {
                ...state,
                activeRoute: null,
                currentStepIndex: 0,
                status: 'idle',
                isTransitioning: false,
            };
        }

        case ACTIONS.GO_TO: {
            if (!state.activeRoute) return state;
            const { index } = action.payload;
            const clamped = Math.max(0, Math.min(index, state.activeRoute.features.length - 1));
            return { ...state, currentStepIndex: clamped };
        }

        case ACTIONS.SET_SPEED: {
            return { ...state, speed: action.payload.speed };
        }

        case ACTIONS.SET_TRANSITIONING: {
            return { ...state, isTransitioning: action.payload };
        }

        default:
            return state;
    }
};

// ─── SELECTORS ───
// Funciones puras que derivan datos del estado.

export const selectors = {
    /** Feature actual del paso activo */
    currentFeature: (state) =>
        state.activeRoute?.features[state.currentStepIndex] || null,

    /** Total de pasos en la ruta activa */
    totalSteps: (state) =>
        state.activeRoute?.features.length || 0,

    /** ¿Se puede avanzar al siguiente paso? */
    canGoNext: (state) =>
        state.activeRoute
            ? state.currentStepIndex < state.activeRoute.features.length - 1
            : false,

    /** ¿Se puede retroceder al paso anterior? */
    canGoPrev: (state) =>
        state.currentStepIndex > 0,

    /** ¿Hay una ruta activa (no idle)? */
    isActive: (state) =>
        state.status !== 'idle' && state.activeRoute !== null,

    /** Progreso como porcentaje (0–100) */
    progress: (state) => {
        const total = selectors.totalSteps(state);
        if (total <= 1) return 100;
        return Math.round((state.currentStepIndex / (total - 1)) * 100);
    },
};
