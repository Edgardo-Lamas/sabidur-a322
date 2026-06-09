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
 * - Marcador activo animado (grande, con pulso)
 * - Marcadores visitados dimmed (pequeños, sin interacción)
 * - Polilínea acumulada dashed (historial de pasos)
 * - Segmento activo animado via stroke-dashoffset (prev → actual)
 * - Llamar onTransitionComplete() después del moveend (event-driven)
 * - Limpiar historial visual al navegar hacia atrás o saltar
 * - Cleanup completo al desmontar
 *
 * No modifica el engine. No usa setInterval.
 */
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import useNarrative from './useNarrative';
import EPOCH_CONFIG from '../data/maps/epoch-config';

// ─── ICONOS ───────────────────────────────────────────────────────────────────

const createActiveIcon = (color, orden) => L.divIcon({
    className: 'map-epoch-marker narrative-marker-active',
    html: `<div style="position:relative;width:32px;height:32px">
      <div style="
        position:absolute;inset:-6px;
        border:2px solid ${color}50;border-radius:50%;
        animation:narrativeMarkerPulse 2s ease-in-out infinite;
      "></div>
      <div style="
        width:32px;height:32px;
        background:${color};border:4px solid white;border-radius:50%;
        box-shadow:0 0 0 3px ${color}40,0 4px 12px rgba(0,0,0,0.35);
        display:flex;align-items:center;justify-content:center;
        color:white;font-weight:700;font-size:13px;font-family:'Inter',sans-serif;
        animation:narrativeMarkerScale 400ms ease-out;
      ">${orden ?? ''}</div>
    </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -24],
});

/** Marcador dimmed para pasos ya visitados */
const createVisitedIcon = (color, orden) => L.divIcon({
    className: 'map-epoch-marker',
    html: `<div style="
        width:20px;height:20px;
        background:${color};border:2px solid white;border-radius:50%;
        opacity:0.45;
        display:flex;align-items:center;justify-content:center;
        color:white;font-weight:700;font-size:10px;font-family:'Inter',sans-serif;
        box-shadow:0 1px 4px rgba(0,0,0,0.2);
    ">${orden ?? ''}</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
});

// ─── POPUP ────────────────────────────────────────────────────────────────────

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

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const destroyMarker = (marker) => {
    if (!marker) return;
    marker.closePopup();
    marker.unbindPopup();
    marker.clearAllEventListeners();
    marker.remove();
};

/**
 * Anima el trazado de un segmento de polilínea usando stroke-dashoffset.
 * Técnica: dash igual al largo total, desplazado al inicio → anima a 0.
 * El elemento SVG debe estar ya en el DOM cuando se llama esta función.
 */
const animateSegmentDraw = (polyline, durationMs = 1200) => {
    requestAnimationFrame(() => {
        const pathEl = polyline.getElement();
        if (!pathEl || typeof pathEl.getTotalLength !== 'function') return;
        const len = pathEl.getTotalLength();
        if (!len) return;
        pathEl.style.strokeDasharray = `${len}`;
        pathEl.style.strokeDashoffset = `${len}`;
        // Forzar reflow para activar la transición CSS
        void pathEl.getBoundingClientRect();
        pathEl.style.transition = `stroke-dashoffset ${durationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        pathEl.style.strokeDashoffset = '0';
    });
};

// ─── HOOK ─────────────────────────────────────────────────────────────────────

/**
 * @param {L.Map|null}  map
 * @param {Object|null} clusterRef  — ref al MarkerClusterGroup
 * @param {Object}      options
 * @param {number}      options.flyZoom      — zoom del flyTo (default: 10)
 * @param {number}      options.flyDuration  — duración del flyTo en segundos
 */
const useNarrativeMap = (map, clusterRef, options = {}) => {
    const {
        flyZoom = 10,
        flyDuration = 2.2,
    } = options;

    const {
        currentFeature,
        currentStepIndex,
        status,
        activeRoute,
        onTransitionComplete,
    } = useNarrative();

    // Marcador del paso activo (grande, animado)
    const currentMarkerRef = useRef(null);
    // Array de marcadores de pasos ya visitados (dimmed)
    const visitedMarkersRef = useRef([]);
    // Polilínea de sombra blanca debajo de la ruta (para contraste con el mapa)
    const accPolylineShadowRef = useRef(null);
    // Polilínea acumulada de todos los segmentos visitados
    const accPolylineRef = useRef(null);
    // Segmento activo en animación (del paso anterior al actual)
    const activeSegmentRef = useRef(null);
    // Coordenadas de todos los puntos visitados
    const visitedCoordsRef = useRef([]);

    // Tracking para detectar dirección de navegación
    const prevStepIndexRef = useRef(-1);
    // Para detectar entrada/salida de la narrativa
    const previousStatusRef = useRef(status);
    // Vista guardada para restaurar al salir
    const savedViewRef = useRef(null);
    // Handler de moveend activo (para poder cancelarlo)
    const moveendHandlerRef = useRef(null);
    // Fallback timer: llama onTransitionComplete si moveend no dispara a tiempo
    const fallbackTimerRef = useRef(null);
    const styleInjectedRef = useRef(false);

    // ─── EFECTO: Recalcular tamaño del mapa al entrar/salir de narrativa ────
    // NarrativeLayout cambia gap y añade/quita ProgressTimeline cuando la
    // narrativa se activa o termina. Leaflet no detecta el cambio de tamaño
    // del contenedor automáticamente, lo que produce un parpadeo en el borde
    // inferior del mapa. invalidateSize() fuerza el recálculo.
    useEffect(() => {
        if (!map) return;
        // requestAnimationFrame: espera a que el browser haga reflow del DOM
        const raf = requestAnimationFrame(() => {
            map.invalidateSize({ animate: false });
        });
        return () => cancelAnimationFrame(raf);
    }, [map, status]); // eslint-disable-line react-hooks/exhaustive-deps

    // ─── CSS animations (inyección única) ────────────────────────────────────
    useEffect(() => {
        if (styleInjectedRef.current) return;
        const style = document.createElement('style');
        style.textContent = `
            @keyframes narrativeMarkerPulse {
                0%, 100% { transform: scale(1); opacity: 0.6; }
                50% { transform: scale(1.3); opacity: 0; }
            }
            @keyframes narrativeMarkerScale {
                from { transform: scale(0); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        styleInjectedRef.current = true;
    }, []);

    // ─── Helper: cancelar listener moveend + fallback pendientes ─────────────
    const cleanupMoveend = () => {
        if (moveendHandlerRef.current && map) {
            map.off('moveend', moveendHandlerRef.current);
            moveendHandlerRef.current = null;
        }
        if (fallbackTimerRef.current) {
            clearTimeout(fallbackTimerRef.current);
            fallbackTimerRef.current = null;
        }
    };

    // ─── Helper: eliminar todos los elementos visuales de la narrativa ────────
    const clearAllNarrativeElements = () => {
        destroyMarker(currentMarkerRef.current);
        currentMarkerRef.current = null;

        visitedMarkersRef.current.forEach((m) => destroyMarker(m));
        visitedMarkersRef.current = [];

        if (accPolylineShadowRef.current) {
            accPolylineShadowRef.current.remove();
            accPolylineShadowRef.current = null;
        }
        if (accPolylineRef.current) {
            accPolylineRef.current.remove();
            accPolylineRef.current = null;
        }
        if (activeSegmentRef.current) {
            activeSegmentRef.current.remove();
            activeSegmentRef.current = null;
        }

        visitedCoordsRef.current = [];
        prevStepIndexRef.current = -1;
    };

    // ─── EFECTO PRINCIPAL: Reaccionar a cambios de feature ───────────────────
    useEffect(() => {
        if (!map) return;

        cleanupMoveend();

        // ── IDLE / STOP ──────────────────────────────────────────────────────
        if (!currentFeature || status === 'idle') {
            clearAllNarrativeElements();

            // Restaurar vista guardada al salir de la narrativa
            if (previousStatusRef.current !== 'idle' && savedViewRef.current) {
                const { center, zoom } = savedViewRef.current;
                map.flyTo(center, zoom, { duration: 1.0, easeLinearity: 0.25 });
                savedViewRef.current = null;
            }

            previousStatusRef.current = status;
            return;
        }

        // Guardar vista al entrar a la narrativa (solo la primera vez)
        if (previousStatusRef.current === 'idle') {
            savedViewRef.current = { center: map.getCenter(), zoom: map.getZoom() };
        }
        previousStatusRef.current = status;

        const [lng, lat] = currentFeature.geometry.coordinates;
        const props = currentFeature.properties;
        const currentLatLng = [lat, lng];
        const epochColor = EPOCH_CONFIG[props.epoca]?.color || '#C5A059';

        // ── Detectar dirección y tipo de navegación ──────────────────────────
        // isForwardStep: avance lineal (el caso normal en autoplay/siguiente)
        // Cualquier otro caso (atrás, salto) limpia el historial visual
        const isForwardStep = currentStepIndex === prevStepIndexRef.current + 1;

        if (!isForwardStep) {
            // Navegar atrás o saltar: reiniciar historial visual desde cero
            clearAllNarrativeElements();
        }
        prevStepIndexRef.current = currentStepIndex;

        // ── Archivar marcador activo anterior → visitado ─────────────────────
        if (currentMarkerRef.current) {
            const prevMarker = currentMarkerRef.current;
            const prevPos = prevMarker.getLatLng();
            const prevOrden = prevMarker._narrativeOrden;
            const prevColor = prevMarker._epochColor || epochColor;

            const visitedMarker = L.marker(prevPos, {
                icon: createVisitedIcon(prevColor, prevOrden),
                zIndexOffset: 100,
                interactive: false,
            }).addTo(map);

            visitedMarkersRef.current.push(visitedMarker);
            destroyMarker(prevMarker);
            currentMarkerRef.current = null;
        }

        // ── Actualizar polilíneas ────────────────────────────────────────────
        // Eliminar segmento activo anterior (de la transición previa)
        if (activeSegmentRef.current) {
            activeSegmentRef.current.remove();
            activeSegmentRef.current = null;
        }

        const prevCoords = visitedCoordsRef.current;

        // Añadir el punto actual al historial ANTES de reconstruir la polilínea,
        // para que la ruta acumulada siempre incluya el paso actual (sin parpadeos).
        visitedCoordsRef.current = [...prevCoords, currentLatLng];

        // Reconstruir polilíneas acumuladas con la ruta completa hasta el paso actual
        // Dos capas: sombra blanca (contraste) + línea de color encima
        if (accPolylineShadowRef.current) {
            accPolylineShadowRef.current.remove();
            accPolylineShadowRef.current = null;
        }
        if (accPolylineRef.current) {
            accPolylineRef.current.remove();
            accPolylineRef.current = null;
        }
        if (visitedCoordsRef.current.length >= 2) {
            accPolylineShadowRef.current = L.polyline(visitedCoordsRef.current, {
                color: 'white',
                weight: 7,
                opacity: 0.7,
                dashArray: '8, 6',
                lineCap: 'round',
            }).addTo(map);
            accPolylineRef.current = L.polyline(visitedCoordsRef.current, {
                color: '#C0392B',
                weight: 3.5,
                opacity: 1,
                dashArray: '8, 6',
                lineCap: 'round',
            }).addTo(map);
        }

        // ── flyTo con animación suave ─────────────────────────────────────────
        map.flyTo([lat, lng], flyZoom, {
            duration: flyDuration,
            easeLinearity: 0.1,
        });

        // ── onMoveEnd: animar segmento, crear marcador, abrir popup ──────────
        // NOTA: El segmento animado se crea DESPUÉS del flyTo para evitar que
        // Leaflet destruya el elemento SVG durante el zoom (lo cual borra la
        // animación CSS stroke-dashoffset). Al crearlo en completeTransition,
        // el mapa ya está estático y la animación se ejecuta sin interferencia.
        const completeTransition = () => {
            // Cancelar fallback si aún está pendiente
            if (fallbackTimerRef.current) {
                clearTimeout(fallbackTimerRef.current);
                fallbackTimerRef.current = null;
            }

            // Segmento animado: del último visitado al actual (solo en avance lineal)
            if (prevCoords.length >= 1 && isForwardStep) {
                const lastCoord = prevCoords[prevCoords.length - 1];
                const segment = L.polyline([lastCoord, currentLatLng], {
                    color: '#C0392B',
                    weight: 3.5,
                    opacity: 1,
                    lineCap: 'round',
                }).addTo(map);
                animateSegmentDraw(segment, 900);
                activeSegmentRef.current = segment;
            }

            const marker = L.marker([lat, lng], {
                icon: createActiveIcon(epochColor, props.orden),
                zIndexOffset: 1000,
            });

            // Guardar metadata para poder archivar el marcador en el siguiente paso
            marker._narrativeOrden = props.orden;
            marker._epochColor = epochColor;

            marker.bindPopup(buildNarrativePopup(props), {
                maxWidth: 300,
                className: 'map-custom-popup',
                closeOnClick: false,
                autoClose: false,
            });

            marker.addTo(map);
            marker.openPopup();
            currentMarkerRef.current = marker;

            // Señalar al engine que la transición visual terminó
            onTransitionComplete();
        };

        const onMoveEnd = () => {
            moveendHandlerRef.current = null;
            completeTransition();
        };

        moveendHandlerRef.current = onMoveEnd;
        map.once('moveend', onMoveEnd);

        // Fallback: si moveend no dispara (mapa ya en posición, animación cancelada, etc.),
        // completar la transición manualmente después de flyDuration + 800ms
        fallbackTimerRef.current = setTimeout(() => {
            fallbackTimerRef.current = null;
            if (moveendHandlerRef.current) {
                // moveend no disparó — completar manualmente
                map.off('moveend', moveendHandlerRef.current);
                moveendHandlerRef.current = null;
                completeTransition();
            }
        }, flyDuration * 1000 + 800);

    }, [map, currentFeature, currentStepIndex, status, flyZoom, flyDuration, onTransitionComplete]);

    // ─── EFECTO: Ocultar/mostrar cluster según estado narrativo ──────────────
    useEffect(() => {
        if (!map || !clusterRef?.current) return;
        const cluster = clusterRef.current;

        if (status !== 'idle' && activeRoute) {
            if (map.hasLayer(cluster)) map.removeLayer(cluster);
        } else {
            if (!map.hasLayer(cluster)) map.addLayer(cluster);
        }
    }, [map, clusterRef, status, activeRoute]);

    // ─── CLEANUP AL DESMONTAR ─────────────────────────────────────────────────
    useEffect(() => {
        return () => {
            cleanupMoveend();
            clearAllNarrativeElements();
        };
    }, []);
};

export default useNarrativeMap;
