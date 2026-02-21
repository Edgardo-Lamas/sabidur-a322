/**
 * useStoryMode.js
 * Hook que gestiona la navegación paso-a-paso (Story Mode) dentro de un routeGroup.
 *
 * Cuando está activo:
 * - Muestra un solo marker (el punto actual) con su popup abierto
 * - Usa map.flyTo() para animación suave entre pasos
 * - Gestiona su propio marker de Leaflet (no usa el cluster)
 *
 * API pública:
 *   isActive       — boolean
 *   currentIndex   — número del paso actual (0-based)
 *   totalSteps     — total de pasos en la ruta
 *   currentFeature — feature actual
 *   canGoNext      — boolean
 *   canGoPrev      — boolean
 *   startStory(features)  — inicia el modo historia
 *   nextStep()     — avanza al siguiente punto
 *   prevStep()     — retrocede al punto anterior
 *   exitStory()    — sale del modo historia
 *
 * @param {L.Map|null} map — instancia del mapa Leaflet
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import L from 'leaflet';
import EPOCH_CONFIG from '../../data/maps/epoch-config';

// Marker más grande y llamativo para Story Mode
const createStoryIcon = (epoca, orden) => {
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
    ">${orden}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22],
    });
};

// Popup HTML para Story Mode (reutiliza el estilo de useMarkerCluster)
const buildStoryPopup = (props) => {
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

const useStoryMode = (map) => {
    const [isActive, setIsActive] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [storyFeatures, setStoryFeatures] = useState([]);
    const markerRef = useRef(null);

    const totalSteps = storyFeatures.length;
    const currentFeature = storyFeatures[currentIndex] || null;
    const canGoNext = currentIndex < totalSteps - 1;
    const canGoPrev = currentIndex > 0;

    // ─── Mostrar/actualizar el marker del paso actual ───
    const showStep = useCallback(
        (index, features) => {
            if (!map || !features[index]) return;

            const feature = features[index];
            const [lng, lat] = feature.geometry.coordinates;
            const props = feature.properties;

            // Limpiar marker anterior
            if (markerRef.current) {
                markerRef.current.closePopup();
                markerRef.current.unbindPopup();
                markerRef.current.clearAllEventListeners();
                markerRef.current.remove();
                markerRef.current = null;
            }

            // Volar al punto con animación suave
            map.flyTo([lat, lng], 10, {
                duration: 1.2,
                easeLinearity: 0.25,
            });

            // Crear marker después de que la animación empiece
            setTimeout(() => {
                if (!map) return;

                const marker = L.marker([lat, lng], {
                    icon: createStoryIcon(props.epoca, props.orden),
                    zIndexOffset: 1000,
                });

                marker.bindPopup(buildStoryPopup(props), {
                    maxWidth: 300,
                    className: 'map-custom-popup',
                    closeOnClick: false,
                    autoClose: false,
                });

                marker.addTo(map);
                marker.openPopup();
                markerRef.current = marker;
            }, 600);
        },
        [map]
    );

    // ─── Iniciar Story Mode ───
    const startStory = useCallback(
        (features) => {
            if (!features.length || !map) return;
            const sorted = [...features].sort(
                (a, b) => (a.properties.orden || 0) - (b.properties.orden || 0)
            );
            setStoryFeatures(sorted);
            setCurrentIndex(0);
            setIsActive(true);
            showStep(0, sorted);
        },
        [map, showStep]
    );

    // ─── Navegación ───
    const nextStep = useCallback(() => {
        if (!canGoNext) return;
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        showStep(newIndex, storyFeatures);
    }, [canGoNext, currentIndex, storyFeatures, showStep]);

    const prevStep = useCallback(() => {
        if (!canGoPrev) return;
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        showStep(newIndex, storyFeatures);
    }, [canGoPrev, currentIndex, storyFeatures, showStep]);

    // ─── Salir de Story Mode ───
    const exitStory = useCallback(() => {
        if (markerRef.current) {
            markerRef.current.closePopup();
            markerRef.current.unbindPopup();
            markerRef.current.clearAllEventListeners();
            markerRef.current.remove();
            markerRef.current = null;
        }
        setIsActive(false);
        setCurrentIndex(0);
        setStoryFeatures([]);
    }, []);

    // ─── Cleanup al desmontar ───
    useEffect(() => {
        return () => {
            if (markerRef.current) {
                markerRef.current.closePopup();
                markerRef.current.unbindPopup();
                markerRef.current.clearAllEventListeners();
                markerRef.current.remove();
                markerRef.current = null;
            }
        };
    }, []);

    return {
        isActive,
        currentIndex,
        totalSteps,
        currentFeature,
        canGoNext,
        canGoPrev,
        startStory,
        nextStep,
        prevStep,
        exitStory,
    };
};

export default useStoryMode;
