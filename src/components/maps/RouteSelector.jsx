/**
 * RouteSelector.jsx
 * Panel UI para activar sub-rutas y lanzar Story Mode.
 *
 * Props puras — sin lógica de mapa:
 *   availableGroups  — string[] de grupos disponibles
 *   activeGroup      — string|null del grupo activo
 *   activateRoute    — (groupId: string) => void
 *   clearRoute       — () => void
 *   onStartStory     — (groupId: string) => void  (undefined si story no disponible)
 *   epochColor       — string
 */
import React from 'react';
import { Route, X, Play } from 'lucide-react';

const RouteSelector = ({ availableGroups, activeGroup, activateRoute, clearRoute, onStartStory, epochColor = '#C5A059' }) => {
    if (!availableGroups.length) return null;

    return (
        <div className="bg-white/95 backdrop-blur-sm border border-sabiduria-gray/10 rounded-sm shadow-md p-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sabiduria-gray mb-2 flex items-center gap-1.5">
                <Route size={13} />
                Sub-rutas
            </h4>

            <div className="flex flex-wrap gap-1.5">
                {availableGroups.map((group) => {
                    const isActive = activeGroup === group;
                    return (
                        <div key={group} className="flex items-center gap-0.5">
                            <button
                                onClick={() => isActive ? clearRoute() : activateRoute(group)}
                                className="px-2.5 py-1 rounded-sm text-xs font-medium transition-all"
                                style={{
                                    background: isActive ? epochColor : 'transparent',
                                    color: isActive ? 'white' : '#4A4A4A',
                                    border: `1px solid ${isActive ? epochColor : '#BDC3C7'}`,
                                }}
                            >
                                {group.replace(/-/g, ' ')}
                            </button>
                            {/* Botón Story: solo visible cuando el grupo está activo */}
                            {isActive && onStartStory && (
                                <button
                                    onClick={() => onStartStory(group)}
                                    className="p-1 rounded-sm transition-all"
                                    style={{ background: epochColor, color: 'white' }}
                                    title="Recorrido paso a paso"
                                >
                                    <Play size={11} />
                                </button>
                            )}
                        </div>
                    );
                })}

                {activeGroup && (
                    <button
                        onClick={clearRoute}
                        className="px-2 py-1 rounded-sm text-xs font-medium text-sabiduria-gray
              border border-sabiduria-gray/20 hover:bg-sabiduria-bg transition-all
              flex items-center gap-1"
                    >
                        <X size={11} /> Todas
                    </button>
                )}
            </div>
        </div>
    );
};

export default RouteSelector;
