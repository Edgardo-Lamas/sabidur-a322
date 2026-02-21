/**
 * Motor Narrativo Bíblico — Barrel Export
 *
 * Uso:
 *   import { NarrativeProvider, useNarrative } from './engine';
 *   import { narrativeReducer, selectors, ACTIONS } from './engine';
 */
export { NarrativeProvider, NarrativeContext } from './NarrativeContext';
export { default as useNarrative } from './useNarrative';
export { default as useNarrativeMap } from './useNarrativeMap';
export { narrativeReducer, selectors, ACTIONS, INITIAL_STATE } from './narrativeEngine';
