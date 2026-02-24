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
 * IMPORTANTE: {children} (MapaBiblico) siempre ocupa la misma posición
 * en el árbol React, independientemente de si la narrativa está activa o no.
 * Esto evita que MapaBiblico se desmonte/remonte al cambiar de estado.
 */
import useNarrative from '../../engine/useNarrative';
import EPOCH_CONFIG from '../../data/maps/epoch-config';
import ProgressTimeline from './ProgressTimeline';
import StepInfoPanel from './StepInfoPanel';
import NarrativeControlPanel from './NarrativeControlPanel';

const NarrativeLayout = ({ children, epoca, sintesisTeologica }) => {
    const { status } = useNarrative();
    const epochColor = EPOCH_CONFIG[epoca]?.color || '#C5A059';
    const isActive = status !== 'idle';

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isActive ? '16px' : '0',
            height: '100%',
        }}>
            {/* ─── Timeline: solo visible cuando la narrativa está activa ─── */}
            {isActive && <ProgressTimeline epochColor={epochColor} />}

            {/* ─── Área de contenido principal ─── */}
            <div style={{
                display: 'flex',
                gap: isActive ? '20px' : '0',
                flex: 1,
                minHeight: 0,
            }}>
                {/* Mapa (columna izquierda – siempre montado, siempre en la misma posición) */}
                <div style={{
                    flex: 1,
                    minWidth: 0,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                }}>
                    {children}
                </div>

                {/* Panel lateral (columna derecha – solo visible cuando la narrativa está activa) */}
                {isActive && (
                    <div style={{
                        width: '400px',
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}>
                        <StepInfoPanel epochColor={epochColor} />
                        <NarrativeControlPanel epochColor={epochColor} sintesisTeologica={sintesisTeologica} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NarrativeLayout;
