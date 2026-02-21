/**
 * useNarrativeMap.js
 * Adaptador entre el Motor Narrativo Bíblico y el mapa Leaflet.
 *
 * Este hook NO contiene lógica narrativa.
 * Solo OBSERVA el estado del engine y EJECUTA efectos en el mapa.
 *
 * Responsabilidades:
 * - Escuchar cambios en currentFeature → flyTo + openPopup
 * - Escuchar status === 'idle' → cerrar popups + resetear vista
 * - Gestionar su propio L.marker (independiente del cluster)
 * - Cleanup completo al desmontar
 *
 * No modifica el engine. No usa setInterval.
 * El autoplay pertenece al engine; este hook solo reacciona.
 *
 * @param {L.Map|null}  map            — instancia del mapa Leaflet
 * @param {Object|null} clusterRef     — ref al MarkerClusterGroup (para ocultarlo)
 * @param {Object}      options
 * @param {number}      options.flyZoom    — zoom para flyTo (default: 10)
 * @param {number}      options.flyDuration — duración de la animación en segundos
 * @param {number}      options.popupDelay  — ms antes de abrir el popup (esperar flyTo)
 */
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import useNarrative from './useNarrative';
import EPOCH_CONFIG from '../data/maps/epoch-config';

// ─── MARKER PARA STORY ───
const createNarrativeIcon = (epoca, orden) => {
    const { color = '#C5A059' } = EPOCH_CONFIG[epoca] || {};
    return L.divIcon({
        className: 'map-epoch-marker',
        html: `<div style="
      width: 32px; height: 32px;
      background: ${color};
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 3px ${color}40, 0 4px 12px rgba(0,0,0,0.35);
      display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 700; font-size: 13px;
      font-family: 'Inter', sans-serif;
    ">${orden || ''}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22],
    });
};

const buildNarrativePopup = (props) => {
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

// ─── CLEANUP DE MARKER ───
const destroyMarker = (markerRef) => {
    const marker = markerRef.current;
    if (!marker) return;
    marker.closePopup();
    marker.unbindPopup();
    marker.clearAllEventListeners();
    marker.remove();
    markerRef.current = null;
};

// ─── HOOK ───
const useNarrativeMap = (map, clusterRef, options = {}) => {
    const {
        flyZoom = 10,
        flyDuration = 1.2,
        popupDelay = 600,
    } = options;

    const { currentFeature, status, activeRoute } = useNarrative();

    const markerRef = useRef(null);
    const popupTimerRef = useRef(null);
    const previousStatusRef = useRef(status);
    const savedViewRef = useRef(null);  // { center, zoom } antes de entrar al narrative

    // ─── EFECTO: Reaccionar a cambios de feature ───
    useEffect(() => {
        if (!map) return;

        // Cancelar popup pendiente
        if (popupTimerRef.current) {
            clearTimeout(popupTimerRef.current);
            popupTimerRef.current = null;
        }

        // Si no hay feature activa (idle/stop), limpiar
        if (!currentFeature || status === 'idle') {
            destroyMarker(markerRef);

            // Restaurar vista guardada al salir del narrative
            if (previousStatusRef.current !== 'idle' && savedViewRef.current) {
                const { center, zoom } = savedViewRef.current;
                map.flyTo(center, zoom, { duration: 0.8 });
                savedViewRef.current = null;
            }

            previousStatusRef.current = status;
            return;
        }

        // Guardar vista actual al entrar al narrative (solo la primera vez)
        if (previousStatusRef.current === 'idle' && status !== 'idle') {
            savedViewRef.current = {
                center: map.getCenter(),
                zoom: map.getZoom(),
            };
        }

        previousStatusRef.current = status;

        // Limpiar marker anterior
        destroyMarker(markerRef);

        // Coordenadas del feature actual
        const [lng, lat] = currentFeature.geometry.coordinates;
        const props = currentFeature.properties;

        // FlyTo con animación suave
        map.flyTo([lat, lng], flyZoom, {
            duration: flyDuration,
            easeLinearity: 0.25,
        });

        // Crear marker y abrir popup después del flyTo
        popupTimerRef.current = setTimeout(() => {
            if (!map) return;

            const marker = L.marker([lat, lng], {
                icon: createNarrativeIcon(props.epoca, props.orden),
                zIndexOffset: 1000,
            });

            marker.bindPopup(buildNarrativePopup(props), {
                maxWidth: 300,
                className: 'map-custom-popup',
                closeOnClick: false,
                autoClose: false,
            });

            marker.addTo(map);
            marker.openPopup();
            markerRef.current = marker;
        }, popupDelay);

        // No cleanup aquí — el cleanup se hace al inicio del próximo ciclo
    }, [map, currentFeature, status, flyZoom, flyDuration, popupDelay]);

    // ─── EFECTO: Ocultar/mostrar cluster según estado narrativo ───
    useEffect(() => {
        if (!map || !clusterRef?.current) return;
        const cluster = clusterRef.current;

        if (status !== 'idle' && activeRoute) {
            // Ocultar cluster durante narrative
            if (map.hasLayer(cluster)) map.removeLayer(cluster);
        } else {
            // Restaurar cluster al salir
            if (!map.hasLayer(cluster)) map.addLayer(cluster);
        }
    }, [map, clusterRef, status, activeRoute]);

    // ─── CLEANUP AL DESMONTAR ───
    useEffect(() => {
        return () => {
            if (popupTimerRef.current) {
                clearTimeout(popupTimerRef.current);
                popupTimerRef.current = null;
            }
            destroyMarker(markerRef);
        };
    }, []);
};

export default useNarrativeMap;
