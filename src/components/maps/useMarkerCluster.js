/**
 * useMarkerCluster.js
 * Hook optimizado para 5000+ markers.
 *
 * Estrategias de performance:
 *
 * 1. VIEWPORT-BASED LAZY LOADING
 *    Solo se crean L.marker para features visibles (+30% buffer).
 *    Al hacer pan/zoom se cargan los nuevos visibles progresivamente.
 *    Los markers ya cargados NO se destruyen (MarkerClusterGroup los oculta
 *    internamente cuando salen del viewport vía removeOutsideVisibleBounds).
 *
 * 2. DEBOUNCE EN moveend
 *    La función de carga progresiva tiene debounce de 150ms para evitar
 *    recálculos en cada frame del pan.
 *
 * 3. MEMOIZACIÓN
 *    - Icons: cache por época (5 épocas = 5 icons max)
 *    - Popups: contenido lazy — se genera solo al abrir (bindPopup con función)
 *    - Batch: addLayers() en lote (mucho más rápido que addLayer() individual)
 *
 * 4. CHUNKED LOADING
 *    MarkerClusterGroup.chunkedLoading añade markers en bloques de 200
 *    para no bloquear el hilo principal.
 *
 * @param {L.Map|null} map      — instancia del mapa
 * @param {Array}      features — GeoJSON features
 */
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import EPOCH_CONFIG from '../../data/maps/epoch-config';

// ─── 1. ICON CACHE ───
// Solo se crean 5 iconos (uno por época). Se reutilizan para todos los markers.
const iconCache = new Map();

const getEpochIcon = (epoca) => {
    if (iconCache.has(epoca)) return iconCache.get(epoca);
    const { color = '#C5A059' } = EPOCH_CONFIG[epoca] || {};
    const icon = L.divIcon({
        className: 'map-epoch-marker',
        html: `<div style="
      width:14px;height:14px;background:${color};
      border:3px solid white;border-radius:50%;
      box-shadow:0 2px 6px rgba(0,0,0,0.35);
    "></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -12],
    });
    iconCache.set(epoca, icon);
    return icon;
};

// ─── 2. LAZY POPUP ───
// El HTML se genera solo cuando el usuario abre el popup, no al crear el marker.
const buildPopupHTML = (props) => {
    const epochColor = EPOCH_CONFIG[props.epoca]?.color || '#C5A059';
    return `
    <div style="font-family:'Inter','Lora',sans-serif;max-width:280px;padding:4px">
      <h3 style="font-family:'Lora',serif;font-size:15px;font-weight:700;
        color:#1A1D23;margin:0 0 6px;line-height:1.3">${props.nombre}</h3>
      <span style="display:inline-block;background:${epochColor};color:white;
        padding:2px 8px;border-radius:3px;font-size:11px;font-weight:600;
        margin-bottom:8px;letter-spacing:0.03em">${props.pasaje}</span>
      <p style="font-size:13px;line-height:1.6;color:#4A4A4A;
        margin:8px 0 0">${props.descripcion}</p>
    </div>`;
};

// ─── 3. CLUSTER OPTIONS ───
const CLUSTER_OPTIONS = {
    maxClusterRadius: 45,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    removeOutsideVisibleBounds: true,  // Leaflet removes DOM for off-screen markers
    animate: true,
    chunkedLoading: true,             // Adds markers in batches (non-blocking)
    chunkInterval: 200,               // ms between batches
    chunkDelay: 50,                   // ms delay to yield to main thread
    disableClusteringAtZoom: 16,      // Show individual markers at high zoom
    iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        return L.divIcon({
            html: `<div style="
        background:linear-gradient(135deg,#1A1D23,#2C3E50);color:#C5A059;
        width:36px;height:36px;border-radius:50%;display:flex;
        align-items:center;justify-content:center;font-weight:700;
        font-size:13px;font-family:'Inter',sans-serif;
        border:3px solid #C5A059;box-shadow:0 3px 10px rgba(0,0,0,0.3);
      ">${count}</div>`,
            className: 'map-cluster-icon',
            iconSize: [42, 42],
            iconAnchor: [21, 21],
        });
    },
};

// ─── 4. CLEANUP ───
const cleanupAll = (markersRef, clusterRef, loadedRef, timerRef, map) => {
    // Cancel pending debounce
    if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
    }

    // Cleanup markers
    markersRef.current.forEach((m) => {
        m.closePopup();
        m.unbindPopup();
        m.clearAllEventListeners();
        m.remove();
    });
    markersRef.current = [];

    // Cleanup cluster
    if (clusterRef.current) {
        clusterRef.current.clearLayers();
        if (map) map.removeLayer(clusterRef.current);
        clusterRef.current = null;
    }

    // Reset loaded tracker
    if (loadedRef.current) loadedRef.current.clear();
};

// ─── HOOK ───
const useMarkerCluster = (map, features) => {
    const clusterRef = useRef(null);
    const markersRef = useRef([]);
    const loadedIdsRef = useRef(new Set());
    const timerRef = useRef(null);
    const moveHandlerRef = useRef(null);

    useEffect(() => {
        if (!map) return;

        // Limpiar estado anterior
        if (moveHandlerRef.current) {
            map.off('moveend', moveHandlerRef.current);
            moveHandlerRef.current = null;
        }
        cleanupAll(markersRef, clusterRef, loadedIdsRef, timerRef, map);

        if (!features.length) return;

        // Crear cluster
        const cluster = L.markerClusterGroup(CLUSTER_OPTIONS);
        const allMarkers = [];
        const loadedIds = new Set();

        /**
         * Carga progresiva: solo crea markers para features en el viewport actual
         * más un buffer del 30%. Los markers ya creados se mantienen en el cluster
         * (MarkerClusterGroup los desactiva visualmente cuando salen del viewport
         * gracias a removeOutsideVisibleBounds).
         */
        const loadVisibleFeatures = () => {
            // Para datasets pequeños (sub-rutas, narrativa) carga todo inmediatamente.
            // El lazy-loading basado en viewport solo aplica para 50+ features.
            const isSmallDataset = features.length < 50;
            const bounds = isSmallDataset ? null : map.getBounds().pad(0.3);
            const batch = [];

            for (let i = 0; i < features.length; i++) {
                const f = features[i];
                const id = f.properties.id;
                if (loadedIds.has(id)) continue;

                const [lng, lat] = f.geometry.coordinates;
                if (!isSmallDataset && !bounds.contains([lat, lng])) continue;

                // Crear marker con icon cacheado
                const marker = L.marker([lat, lng], { icon: getEpochIcon(f.properties.epoca) });

                // Lazy popup: función que genera HTML solo al abrir
                const props = f.properties;
                marker.bindPopup(() => buildPopupHTML(props), {
                    maxWidth: 300,
                    className: 'map-custom-popup',
                });

                batch.push(marker);
                allMarkers.push(marker);
                loadedIds.add(id);
            }

            // addLayers (lote) es ~10x más rápido que addLayer individual
            if (batch.length) cluster.addLayers(batch);
        };

        // Debounced handler para moveend
        const debouncedLoad = () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(loadVisibleFeatures, 150);
        };

        // Montar
        map.addLayer(cluster);
        loadVisibleFeatures();         // Carga inicial (solo visible)
        map.on('moveend', debouncedLoad);

        // Guardar refs
        clusterRef.current = cluster;
        markersRef.current = allMarkers;
        loadedIdsRef.current = loadedIds;
        moveHandlerRef.current = debouncedLoad;

        // Cleanup al desmontar o cambiar features
        return () => {
            map.off('moveend', debouncedLoad);
            moveHandlerRef.current = null;
            cleanupAll(markersRef, clusterRef, loadedIdsRef, timerRef, map);
        };
    }, [map, features]);

    return clusterRef;
};

export default useMarkerCluster;
