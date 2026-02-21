/**
 * MapaBiblico.jsx
 * Componente declarativo del mapa interactivo.
 *
 * Capas de responsabilidad:
 *   MapaBiblico      → layout + estado (route engine + story mode)
 *   MapRefSetter     → expone instancia del mapa al padre
 *   MapLayers        → conecta hooks con el mapa (cluster, polyline)
 *   RouteSelector    → UI sub-rutas (props puras)
 *   StoryControls    → UI story mode (props puras)
 *   useRouteEngine   → lógica de sub-rutas
 *   useStoryMode     → lógica de Story Mode
 *   useMarkerCluster → lógica imperativa de Leaflet
 */
import React, { useMemo, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import useMarkerCluster from './useMarkerCluster';
import useRouteEngine from './useRouteEngine';
import useStoryMode from './useStoryMode';
import RouteSelector from './RouteSelector';
import StoryControls from './StoryControls';

// Fix para iconos de Leaflet en Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

/**
 * Expone la instancia del mapa al padre (una sola vez).
 */
const MapRefSetter = ({ setMap }) => {
    const map = useMap();
    React.useEffect(() => { setMap(map); }, [map, setMap]);
    return null;
};

/**
 * Conecta useMarkerCluster + polyline con la instancia del mapa.
 * Cuando storyActive=true, no muestra markers ni polyline (el story los maneja).
 */
const MapLayers = ({ features, epochColor, map, storyActive }) => {
    // Si story mode está activo, pasar array vacío para limpiar el cluster
    const clusterFeatures = storyActive ? [] : features;
    useMarkerCluster(map, clusterFeatures);

    const routePositions = useMemo(
        () => features.map((f) => [f.geometry.coordinates[1], f.geometry.coordinates[0]]),
        [features]
    );

    // No mostrar polyline durante story mode
    if (storyActive || routePositions.length < 2) return null;

    return (
        <Polyline
            positions={routePositions}
            pathOptions={{
                color: epochColor,
                weight: 3,
                opacity: 0.7,
                dashArray: '8, 6',
                lineCap: 'round',
            }}
        />
    );
};

/**
 * MapaBiblico — Componente principal
 */
const MapaBiblico = ({ features = [], center = [31.5, 35.5], zoom = 6, epochColor = '#C5A059' }) => {
    const [mapInstance, setMapInstance] = useState(null);
    const handleSetMap = useCallback((m) => setMapInstance(m), []);

    const sortedFeatures = useMemo(
        () => [...features].sort((a, b) => (a.properties.orden || 0) - (b.properties.orden || 0)),
        [features]
    );

    // Route Engine
    const routeEngine = useRouteEngine(sortedFeatures, mapInstance);

    // Story Mode
    const storyMode = useStoryMode(mapInstance);

    // Iniciar Story Mode con los features del grupo activo
    const handleStartStory = useCallback(
        (groupId) => {
            const groupFeatures = sortedFeatures.filter(
                (f) => f.properties.routeGroup === groupId
            );
            storyMode.startStory(groupFeatures);
        },
        [sortedFeatures, storyMode.startStory]
    );

    // Salir de Story Mode (vuelve al grupo activo normal)
    const handleExitStory = useCallback(() => {
        storyMode.exitStory();
        // Restaurar fitBounds del grupo (si aún hay uno activo)
        if (routeEngine.activeGroup && mapInstance) {
            const groupFeatures = sortedFeatures.filter(
                (f) => f.properties.routeGroup === routeEngine.activeGroup
            );
            const bounds = groupFeatures.map((f) => [
                f.geometry.coordinates[1],
                f.geometry.coordinates[0],
            ]);
            if (bounds.length) mapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
        }
    }, [storyMode.exitStory, routeEngine.activeGroup, sortedFeatures, mapInstance]);

    return (
        <div className="map-container-wrapper" style={{ position: 'relative' }}>
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapRefSetter setMap={handleSetMap} />
                {mapInstance && (
                    <MapLayers
                        features={routeEngine.displayFeatures}
                        epochColor={epochColor}
                        map={mapInstance}
                        storyActive={storyMode.isActive}
                    />
                )}
            </MapContainer>

            {/* Panel de sub-rutas (oculto durante story mode) */}
            {!storyMode.isActive && routeEngine.availableGroups.length > 0 && (
                <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 1000 }}>
                    <RouteSelector
                        availableGroups={routeEngine.availableGroups}
                        activeGroup={routeEngine.activeGroup}
                        activateRoute={routeEngine.activateRoute}
                        clearRoute={routeEngine.clearRoute}
                        onStartStory={handleStartStory}
                        epochColor={epochColor}
                    />
                </div>
            )}

            {/* Controles de Story Mode */}
            {storyMode.isActive && (
                <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
                    <StoryControls
                        currentIndex={storyMode.currentIndex}
                        totalSteps={storyMode.totalSteps}
                        currentFeature={storyMode.currentFeature}
                        canGoNext={storyMode.canGoNext}
                        canGoPrev={storyMode.canGoPrev}
                        onNext={storyMode.nextStep}
                        onPrev={storyMode.prevStep}
                        onExit={handleExitStory}
                        epochColor={epochColor}
                    />
                </div>
            )}
        </div>
    );
};

export default MapaBiblico;
