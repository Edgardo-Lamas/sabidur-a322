/**
 * MapaRecorrido.jsx
 * Página de detalle de un recorrido bíblico interactivo.
 *
 * RESPONSABILIDAD:
 * - Obtiene el slug desde useParams()
 * - Busca la configuración en journeys-registry.js
 * - Carga GeoJSON via useGeoJSON (cache + dedup + fallback UI)
 * - Precarga el recorrido siguiente para navegación fluida
 * - Pasa los features ya procesados como props a MapaBiblico
 */
import React, { Suspense, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, BookOpen, Loader2, AlertTriangle } from 'lucide-react';
import JOURNEYS from '../data/maps/journeys-registry';
import EPOCH_CONFIG from '../data/maps/epoch-config';
import useGeoJSON from '../hooks/useGeoJSON';
import geoJSON from '../services/geoJSONService';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { NarrativeProvider } from '../engine';
import NarrativeLayout from '../components/maps/NarrativeLayout';

// Lazy load del componente de mapa (code splitting)
const MapaBiblico = React.lazy(() => import('../components/maps/MapaBiblico'));

const MapaRecorrido = () => {
    const { slug } = useParams();

    // Buscar la configuración del recorrido en el registro
    const journey = JOURNEYS.find((j) => j.slug === slug);

    // Cargar GeoJSON (cache + dedup + estados automáticos)
    const { features, status, error } = useGeoJSON(journey?.geojsonPath || null);

    // Precargar recorridos adyacentes (el siguiente y anterior en la lista)
    useEffect(() => {
        if (!journey) return;
        const idx = JOURNEYS.findIndex((j) => j.slug === slug);
        const toPreload = [];
        if (idx < JOURNEYS.length - 1) toPreload.push(JOURNEYS[idx + 1].geojsonPath);
        if (idx > 0) toPreload.push(JOURNEYS[idx - 1].geojsonPath);
        if (toPreload.length) geoJSON.preload(toPreload);
    }, [slug, journey]);

    // Error: recorrido no encontrado
    if (!journey) {
        return (
            <main className="bg-sabiduria-bg min-h-screen flex items-center justify-center">
                <div className="text-center p-8">
                    <AlertTriangle size={48} className="text-sabiduria-gold mx-auto mb-4" />
                    <h1 className="text-2xl font-serif text-sabiduria-navy mb-2">Recorrido no encontrado</h1>
                    <p className="text-sabiduria-gray mb-6">El recorrido que buscas no existe.</p>
                    <Link to="/mapas-biblicos" className="btn-gold inline-flex items-center gap-2">
                        <ArrowLeft size={16} /> Ver todos los recorridos
                    </Link>
                </div>
            </main>
        );
    }

    const epoch = EPOCH_CONFIG[journey.epoca] || {};

    // Determine if this journey has narrative support
    const hasNarrative = journey.slug === 'viaje-de-abraham';

    // Wrap map content with NarrativeProvider when narrative is available
    const MapContent = (
        <Suspense
            fallback={
                <div className="h-full flex items-center justify-center">
                    <Loader2 size={36} className="animate-spin text-sabiduria-gold" />
                </div>
            }
        >
            <MapaBiblico
                features={features}
                center={journey.center}
                zoom={journey.zoom}
                epochColor={epoch.color}
                narrativeEnabled={hasNarrative}
            />
        </Suspense>
    );

    return (
        <main className="bg-sabiduria-bg min-h-screen">
            <SEO
                title={`${journey.titulo} — Mapa Bíblico Interactivo`}
                description={journey.descripcion}
                url={`/mapas-biblicos/${slug}`}
            />

            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 pt-6">
                <Breadcrumbs title={journey.titulo} />
            </div>

            {/* Header del recorrido */}
            <header className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">{journey.imagen}</span>
                            <h1 className="text-3xl md:text-4xl font-serif text-sabiduria-navy">
                                {journey.titulo}
                            </h1>
                        </div>
                        <p className="text-lg text-sabiduria-gray font-serif italic">{journey.subtitulo}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm font-semibold text-white"
                            style={{ background: epoch.color }}
                        >
                            <BookOpen size={14} />
                            {epoch.rango}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm text-sabiduria-gray">
                            <MapPin size={14} />
                            {features.length || journey.puntos} puntos
                        </span>
                    </div>
                </div>
                <p className="mt-4 text-sabiduria-gray max-w-3xl text-justify leading-relaxed">
                    {journey.descripcion}
                </p>
            </header>

            {/* Mapa principal */}
            <section className="max-w-7xl mx-auto px-4 pb-8">
                <div
                    className="bg-white rounded-lg shadow-lg overflow-hidden border border-sabiduria-gray/10"
                    style={{ height: hasNarrative ? 'clamp(500px, 75vh, 850px)' : 'clamp(400px, 60vh, 700px)' }}
                >
                    {status === 'loading' && (
                        <div className="h-full flex flex-col items-center justify-center gap-3 text-sabiduria-gray">
                            <Loader2 size={36} className="animate-spin text-sabiduria-gold" />
                            <p className="font-medium">Cargando mapa interactivo...</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="h-full flex flex-col items-center justify-center gap-3 text-center p-8">
                            <AlertTriangle size={40} className="text-red-500" />
                            <p className="text-sabiduria-navy font-medium text-lg">Error al cargar el mapa</p>
                            <p className="text-sabiduria-gray">{error}</p>
                            <button
                                onClick={() => {
                                    geoJSON.invalidate(journey.geojsonPath);
                                    window.location.reload();
                                }}
                                className="btn-gold mt-4"
                            >
                                Reintentar
                            </button>
                        </div>
                    )}

                    {status === 'success' && hasNarrative && (
                        <NarrativeProvider>
                            <NarrativeLayout epoca={journey.epoca} sintesisTeologica={journey.sintesisTeologica}>
                                {MapContent}
                            </NarrativeLayout>
                        </NarrativeProvider>
                    )}

                    {status === 'success' && !hasNarrative && MapContent}
                </div>
            </section>

            {/* Leyenda de puntos */}
            {status === 'success' && features.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 pb-12">
                    <h2 className="text-2xl font-serif text-sabiduria-navy mb-6 flex items-center gap-2">
                        <BookOpen size={22} className="text-sabiduria-gold" />
                        Puntos del Recorrido
                    </h2>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {[...features]
                            .sort((a, b) => (a.properties.orden || 0) - (b.properties.orden || 0))
                            .map((feature) => {
                                const p = feature.properties;
                                return (
                                    <div
                                        key={p.id}
                                        className="bg-white p-4 rounded-sm border border-sabiduria-gray/10 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span
                                                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                                style={{ background: epoch.color }}
                                            >
                                                {p.orden}
                                            </span>
                                            <div>
                                                <h3 className="font-serif font-bold text-sabiduria-navy text-sm leading-tight">
                                                    {p.nombre}
                                                </h3>
                                                <span className="text-xs text-sabiduria-gold font-semibold">{p.pasaje}</span>
                                                <p className="text-xs text-sabiduria-gray mt-1 leading-relaxed line-clamp-2">
                                                    {p.descripcion}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </section>
            )}

            {/* Footer: volver */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="pt-6 border-t border-sabiduria-gray/10">
                    <Link
                        to="/mapas-biblicos"
                        className="inline-flex items-center gap-2 text-sabiduria-navy hover:text-sabiduria-gold font-medium transition-colors"
                    >
                        <ArrowLeft size={18} /> Volver a todos los recorridos
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default MapaRecorrido;
