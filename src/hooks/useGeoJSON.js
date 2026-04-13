/**
 * useGeoJSON.js
 * Hook React para carga asincrónica de GeoJSON con cache.
 *
 * Envuelve geoJSONService con estados React (loading, error, data).
 * El servicio cachea en memoria: el segundo render con el mismo path
 * devuelve los datos inmediatamente sin fetch.
 *
 * @param {string|null} path — ruta al archivo GeoJSON (null = no cargar)
 * @returns {{ features: Array, status: string, error: string|null }}
 */
import { useState, useEffect, useRef } from 'react';
import geoJSON from '../services/geoJSONService';

const useGeoJSON = (path) => {
    const [features, setFeatures] = useState([]);
    const [status, setStatus] = useState('idle');  // idle | loading | success | error
    const [error, setError] = useState(null);
    const abortRef = useRef(false);

    useEffect(() => {
        if (!path) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFeatures([]);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStatus('idle');
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setError(null);
            return;
        }

        abortRef.current = false;

        // Si ya está en cache, no mostrar estado "loading"
        if (geoJSON.has(path)) {
            geoJSON.load(path).then((data) => {
                if (!abortRef.current) {
                    setFeatures(data);
                    setStatus('success');
                    setError(null);
                }
            });
            return;
        }

        // Fetch nuevo: mostrar loading
        setStatus('loading');
        setError(null);

        geoJSON
            .load(path)
            .then((data) => {
                if (!abortRef.current) {
                    setFeatures(data);
                    setStatus('success');
                }
            })
            .catch((err) => {
                if (!abortRef.current) {
                    setError(err.message);
                    setStatus('error');
                }
            });

        return () => {
            abortRef.current = true;
        };
    }, [path]);

    return { features, status, error };
};

export default useGeoJSON;
