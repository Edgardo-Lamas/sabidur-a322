/**
 * useRouteEngine.js
 * Hook que gestiona la activación/desactivación de sub-rutas dentro de un recorrido.
 *
 * Cada feature puede tener opcionalmente:
 *   properties.routeGroup  — string que identifica la sub-ruta
 *   properties.orden       — número para ordenar los puntos dentro del grupo
 *
 * API pública:
 *   activeGroup        — string|null del grupo activo
 *   availableGroups    — array de strings con los grupos disponibles
 *   displayFeatures    — features filtradas (si hay grupo activo) o todas
 *   routePositions     — coordenadas [lat, lng] ordenadas para la polyline
 *   activateRoute(id)  — activa un routeGroup y hace fitBounds
 *   clearRoute()       — vuelve al estado general
 */
import { useState, useMemo, useCallback } from 'react';

const useRouteEngine = (features, map) => {
    const [activeGroup, setActiveGroup] = useState(null);

    // Grupos disponibles, ordenados por el orden mínimo de sus features
    const availableGroups = useMemo(() => {
        const groupMinOrden = new Map();
        features.forEach((f) => {
            const g = f.properties.routeGroup;
            const orden = f.properties.orden ?? 999;
            if (g && (!groupMinOrden.has(g) || orden < groupMinOrden.get(g))) {
                groupMinOrden.set(g, orden);
            }
        });
        return [...groupMinOrden.entries()]
            .sort((a, b) => a[1] - b[1])
            .map(([g]) => g);
    }, [features]);

    // Features filtradas y ordenadas
    const displayFeatures = useMemo(() => {
        const filtered = activeGroup
            ? features.filter((f) => f.properties.routeGroup === activeGroup)
            : features;

        return [...filtered].sort(
            (a, b) => (a.properties.orden || 0) - (b.properties.orden || 0)
        );
    }, [features, activeGroup]);

    // Coordenadas de la polyline
    const routePositions = useMemo(
        () => displayFeatures.map((f) => [
            f.geometry.coordinates[1],
            f.geometry.coordinates[0],
        ]),
        [displayFeatures]
    );

    // Ajustar viewport a los puntos visibles
    const fitToFeatures = useCallback(
        (feats) => {
            if (!map || feats.length === 0) return;
            const bounds = feats.map((f) => [
                f.geometry.coordinates[1],
                f.geometry.coordinates[0],
            ]);
            map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
        },
        [map]
    );

    // Activar un grupo
    const activateRoute = useCallback(
        (groupId) => {
            setActiveGroup(groupId);
            const groupFeatures = features
                .filter((f) => f.properties.routeGroup === groupId)
                .sort((a, b) => (a.properties.orden || 0) - (b.properties.orden || 0));
            fitToFeatures(groupFeatures);
        },
        [features, fitToFeatures]
    );

    // Volver al estado general
    // skipFit=true: solo limpia el grupo sin mover el mapa (útil cuando otro sistema maneja la vista)
    const clearRoute = useCallback((skipFit = false) => {
        setActiveGroup(null);
        if (!skipFit) fitToFeatures(features);
    }, [features, fitToFeatures]);

    return {
        activeGroup,
        availableGroups,
        displayFeatures,
        routePositions,
        activateRoute,
        clearRoute,
    };
};

export default useRouteEngine;
