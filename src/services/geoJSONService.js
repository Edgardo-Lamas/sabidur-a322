/**
 * geoJSONService.js
 * Servicio singleton para carga y caché de archivos GeoJSON.
 *
 * Responsabilidades:
 * - Fetch asincrónico de archivos GeoJSON
 * - Cache en memoria (Map) — evita re-fetches del mismo archivo
 * - Deduplicación de requests en vuelo (no lanza 2 fetches al mismo URL)
 * - Preload de archivos para cargas anticipadas
 * - Invalidación de cache por key
 *
 * Uso:
 *   import geo from './geoJSONService';
 *   const features = await geo.load('/geojson/01-abraham.geojson');
 *   geo.preload(['/geojson/02-exodo.geojson']);
 *   geo.invalidate('/geojson/01-abraham.geojson');
 */

const cache = new Map();       // key → features[]
const inflight = new Map();    // key → Promise (dedup requests en vuelo)

/**
 * Resuelve la URL completa considerando BASE_URL de Vite.
 */
const resolveURL = (path) => {
    const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/';
    return `${base}${path.replace(/^\//, '')}`;
};

/**
 * Carga un archivo GeoJSON y devuelve sus features.
 * Si ya está en cache, devuelve inmediatamente.
 * Si hay un request en vuelo al mismo path, reutiliza esa Promise.
 *
 * @param {string} path — ruta relativa (ej: 'geojson/01-abraham.geojson')
 * @returns {Promise<Array>} — array de GeoJSON features
 */
const load = async (path) => {
    // 1. Cache hit
    if (cache.has(path)) {
        return cache.get(path);
    }

    // 2. Request en vuelo (dedup)
    if (inflight.has(path)) {
        return inflight.get(path);
    }

    // 3. Nuevo fetch
    const promise = (async () => {
        try {
            const url = resolveURL(path);
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();
            const features = data.features || [];

            // Guardar en cache
            cache.set(path, features);
            return features;
        } finally {
            // Limpiar inflight siempre
            inflight.delete(path);
        }
    })();

    inflight.set(path, promise);
    return promise;
};

/**
 * Precarga uno o más archivos GeoJSON en background (fire & forget).
 * Útil para precargar el siguiente recorrido mientras el usuario lee el actual.
 *
 * @param {string[]} paths — rutas a precargar
 */
const preload = (paths) => {
    paths.forEach((path) => {
        if (!cache.has(path) && !inflight.has(path)) {
            load(path).catch(() => { }); // silenciar errores de preload
        }
    });
};

/**
 * Invalida una entrada del cache (fuerza un re-fetch en la próxima llamada).
 */
const invalidate = (path) => {
    cache.delete(path);
};

/**
 * Limpia todo el cache.
 */
const clear = () => {
    cache.clear();
    inflight.clear();
};

/**
 * Devuelve true si el path ya está en cache.
 */
const has = (path) => cache.has(path);

export default { load, preload, invalidate, clear, has };
