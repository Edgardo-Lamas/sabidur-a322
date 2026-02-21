/**
 * NarrativeLayout.jsx
 * Layout desktop de dos columnas para el Motor Narrativo Bíblico.
 *
 * Estructura:
 *   ┌────────────────────────────────────────────┐
 *   │           ProgressTimeline (full width)     │
 *   ├────────────────────────────┬───────────────┤
 *   │                            │               │
 *   │       Mapa (flex-grow)     │  StepInfoPanel │
 *   │                            │  (400px fijo)  │
 *   │                            │               │
 *   ├────────────────────────────┴───────────────┤
 *   │       NarrativeControlPanel (centered)      │
 *   └────────────────────────────────────────────┘
 *
 * Solo layout — no contiene lógica narrativa.
 * Se activa cuando el engine está activo; de lo contrario, renderiza
 * solo los children (el mapa) a ancho completo.
 */
import React from 'react';
import useNarrative from '../../engine/useNarrative';
import EPOCH_CONFIG from '../../data/maps/epoch-config';
import ProgressTimeline from './ProgressTimeline';
import StepInfoPanel from './StepInfoPanel';
import NarrativeControlPanel from './NarrativeControlPanel';

const NarrativeLayout = ({ children, epoca }) => {
    const { status } = useNarrative();
    const epochColor = EPOCH_CONFIG[epoca]?.color || '#C5A059';
    const isActive = status !== 'idle';

    // Cuando no hay narrativa activa, renderizar solo el mapa
    if (!isActive) {
        return (
            <div style={{ height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
                {children}
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            height: '100%',
        }}>
            {/* ─── Timeline: ancho completo ─── */}
            <ProgressTimeline epochColor={epochColor} />

            {/* ─── Dos columnas: mapa + panel ─── */}
            <div style={{
                display: 'flex',
                gap: '20px',
                flex: 1,
                minHeight: 0,
            }}>
                {/* Mapa (columna izquierda – flex-grow) */}
                <div style={{
                    flex: 1,
                    minWidth: 0,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}>
                    {children}
                </div>

                {/* Panel lateral (columna derecha – ancho fijo) */}
                <div style={{
                    width: '400px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    <StepInfoPanel epochColor={epochColor} />
                    <NarrativeControlPanel epochColor={epochColor} />
                </div>
            </div>
        </div>
    );
};

export default NarrativeLayout;
