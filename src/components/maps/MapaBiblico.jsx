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
import React, { useMemo, useState, useCallback, useContext, useEffect, useRef } from 'react';
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

// Narrative engine adapter (always importable, conditionally used via narrativeEnabled prop)
import useNarrativeMap from '../../engine/useNarrativeMap';
import { NarrativeContext } from '../../engine/NarrativeContext';

// Safe wrapper: returns narrative context or null (no throw when outside provider)
const useNarrativeSafe = () => useContext(NarrativeContext);

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
 * Cuando storyActive=true o narrativeActive=true, no muestra la polyline estática
 * (el story/narrative las maneja con sus propias polilíneas animadas).
 */
const MapLayers = ({ features, map, storyActive, narrativeActive, onClusterRef }) => {
    // Si story mode está activo, pasar array vacío para limpiar el cluster
    const clusterFeatures = storyActive ? [] : features;
    const clusterRef = useMarkerCluster(map, clusterFeatures);

    // Expose clusterRef to parent via callback
    React.useEffect(() => {
        if (onClusterRef) onClusterRef(clusterRef);
    }, [clusterRef, onClusterRef]);

    const routePositions = useMemo(
        () => features.map((f) => [f.geometry.coordinates[1], f.geometry.coordinates[0]]),
        [features]
    );

    // No mostrar polyline estática durante story mode ni durante narrative mode
    if (storyActive || narrativeActive || routePositions.length < 2) return null;

    return (
        <>
            {/* Sombra blanca para contraste contra el fondo del mapa */}
            <Polyline
                positions={routePositions}
                pathOptions={{
                    color: 'white',
                    weight: 7,
                    opacity: 0.7,
                    lineCap: 'round',
                    lineJoin: 'round',
                }}
            />
            {/* Línea de ruta — rojo cartográfico, siempre visible sobre NatGeo */}
            <Polyline
                positions={routePositions}
                pathOptions={{
                    color: '#C0392B',
                    weight: 3.5,
                    opacity: 1,
                    lineCap: 'round',
                    lineJoin: 'round',
                }}
            />
        </>
    );
};

/**
 * NarrativeMapAdapter — connects the narrative engine to the map.
 * Only rendered when narrativeEnabled=true (i.e., wrapped in NarrativeProvider).
 */
const NarrativeMapAdapter = ({ map, clusterRef }) => {
    useNarrativeMap(map, clusterRef, { flyZoom: 10, flyDuration: 1.2 });
    return null;
};

/**
 * MapaBiblico — Componente principal
 */
const MapaBiblico = ({ features = [], center = [31.5, 35.5], zoom = 6, epochColor = '#C5A059', narrativeEnabled = false }) => {
    const [mapInstance, setMapInstance] = useState(null);
    const [clusterRef, setClusterRef] = useState(null);
    const handleSetMap = useCallback((m) => setMapInstance(m), []);
    const handleClusterRef = useCallback((ref) => setClusterRef(ref), []);

    const sortedFeatures = useMemo(
        () => [...features].sort((a, b) => (a.properties.orden || 0) - (b.properties.orden || 0)),
        [features]
    );

    // Route Engine
    const routeEngine = useRouteEngine(sortedFeatures, mapInstance);

    // Story Mode
    const storyMode = useStoryMode(mapInstance);

    // Narrative engine (safe — returns null when no NarrativeProvider)
    const narrative = useNarrativeSafe();

    // Cuando la narrativa termina, limpiar el grupo activo para que el usuario
    // vea todos los grupos disponibles sin el anterior resaltado.
    const prevNarrativeActiveRef = useRef(false);
    useEffect(() => {
        const isActive = !!(narrative && narrative.isActive);
        if (prevNarrativeActiveRef.current && !isActive) {
            // La narrativa acaba de terminar — limpiar el grupo sin mover el mapa
            // (useNarrativeMap ya restaura la vista al salir)
            routeEngine.clearRoute(true);
        }
        prevNarrativeActiveRef.current = isActive;
    }, [narrative?.isActive]); // eslint-disable-line react-hooks/exhaustive-deps

    // Start narrative for a route group
    const handleStartNarrative = useCallback(
        (groupId) => {
            if (!narrative) return;
            const groupFeatures = sortedFeatures.filter(
                (f) => f.properties.routeGroup === groupId
            );
            if (groupFeatures.length) {
                narrative.start(groupId, groupFeatures, { epochColor });
            }
        },
        [sortedFeatures, narrative, epochColor]
    );

    // Registrar handleStartNarrative como "route starter" en el contexto narrativo.
    // Permite que NarrativeControlPanel avance a la siguiente etapa directamente
    // sin necesidad de pasar props por NarrativeLayout.
    useEffect(() => {
        narrative?.setRouteStarter?.(handleStartNarrative);
    }, [narrative?.setRouteStarter, handleStartNarrative]); // eslint-disable-line react-hooks/exhaustive-deps

    // Iniciar Story Mode con los features del grupo activo
    const handleStartStory = useCallback(
        (groupId) => {
            const groupFeatures = sortedFeatures.filter(
                (f) => f.properties.routeGroup === groupId
            );
            storyMode.startStory(groupFeatures);
        },
        [sortedFeatures, storyMode]
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
    }, [storyMode, routeEngine.activeGroup, sortedFeatures, mapInstance]);

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
                    attribution='Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
                    maxZoom={16}
                />
                <MapRefSetter setMap={handleSetMap} />
                {mapInstance && (
                    <MapLayers
                        features={routeEngine.displayFeatures}
                        map={mapInstance}
                        storyActive={storyMode.isActive}
                        narrativeActive={!!(narrative && narrative.isActive)}
                        onClusterRef={handleClusterRef}
                    />
                )}
                {mapInstance && narrativeEnabled && (
                    <NarrativeMapAdapter map={mapInstance} clusterRef={clusterRef} />
                )}
            </MapContainer>

            {/* Panel de sub-rutas (oculto durante story mode y narrative mode) */}
            {!storyMode.isActive && !(narrative && narrative.isActive) && routeEngine.availableGroups.length > 0 && (
                <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 1000 }}>
                    <RouteSelector
                        availableGroups={routeEngine.availableGroups}
                        activeGroup={routeEngine.activeGroup}
                        activateRoute={routeEngine.activateRoute}
                        clearRoute={routeEngine.clearRoute}
                        onStartStory={handleStartStory}
                        onStartNarrative={narrativeEnabled ? handleStartNarrative : undefined}
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
