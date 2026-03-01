/**
 * NarrativeControlPanel.jsx
 * Panel de controles para el Motor Narrativo Bíblico.
 *
 * Solo presentación — consume useNarrative().
 * Diseñado para estar debajo del StepInfoPanel en la columna derecha.
 */
import {
    SkipBack,
    Play,
    Pause,
    SkipForward,
    Square,
    CheckCircle,
    Map,
    BookOpen,
} from 'lucide-react';
import useNarrative from '../../engine/useNarrative';

const SPEED_OPTIONS = [0.5, 1, 1.5, 2];

// Orden y etiquetas legibles de los grupos de ruta — por recorrido
const ROUTE_ORDER = [
    // Abraham
    'llamado-de-abraham',
    'descenso-a-egipto',
    'vida-en-canaan',
    'ciclo-de-jacob',
    // Éxodo
    'salida-de-egipto',
    'desierto-sinai',
    'peregrinacion-desierto',
    // Conquista de Canaán
    'cruce-y-centro',
    'campanas-militares',
    'asentamiento-y-jueces',
    // Exilio y Retorno
    'caida-de-juda',
    'en-tierra-extrana',
    'el-retorno',
    // Viajes de Pablo I y II
    'primer-viaje',
    'segundo-viaje',
];

const ROUTE_LABELS = {
    // Abraham
    'llamado-de-abraham': 'El llamado de Abraham',
    'descenso-a-egipto': 'El descenso a Egipto',
    'vida-en-canaan': 'Vida en Canaán',
    'ciclo-de-jacob': 'El ciclo de Jacob',
    // Éxodo
    'salida-de-egipto': 'La salida de Egipto',
    'desierto-sinai': 'El desierto y el Sinaí',
    'peregrinacion-desierto': 'La peregrinación',
    // Conquista de Canaán
    'cruce-y-centro': 'Cruce y campaña central',
    'campanas-militares': 'Las campañas militares',
    'asentamiento-y-jueces': 'Asentamiento y jueces',
    // Exilio y Retorno
    'caida-de-juda': 'La caída de Judá',
    'en-tierra-extrana': 'En tierra extraña',
    'el-retorno': 'El retorno',
    // Viajes de Pablo I y II
    'primer-viaje': 'Primer viaje misionero',
    'segundo-viaje': 'Segundo viaje misionero',
};

const NarrativeControlPanel = ({ epochColor = '#C5A059', sintesisTeologica }) => {
    const {
        status,
        activeRoute,
        canGoNext,
        canGoPrev,
        speed,
        next,
        prev,
        pause,
        resume,
        stop,
        setSpeed,
        startRoute,
    } = useNarrative();

    if (status === 'idle') return null;

    const isPlaying = status === 'playing';
    // isComplete: sin más pasos (status !== 'idle' ya está filtrado arriba).
    // Cubre rutas de 1 solo paso (status='playing', canGoNext=false desde el inicio)
    // y rutas normales al final (status='paused' por el reducer de NEXT).
    const isComplete = !canGoNext;

    // Siguiente etapa en secuencia (si existe)
    // activeRoute es el objeto { id, features, meta } — usar .id para buscar en ROUTE_ORDER
    const currentRouteIndex = ROUTE_ORDER.indexOf(activeRoute?.id);
    const nextRouteId = ROUTE_ORDER[currentRouteIndex + 1] ?? null;
    const nextRouteLabel = nextRouteId ? ROUTE_LABELS[nextRouteId] : null;

    const btnBase = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 200ms ease',
    };

    return (
        <div style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1px solid ${isComplete ? epochColor + '30' : 'rgba(0,0,0,0.06)'}`,
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
            padding: '16px 24px',
        }}>

            {isComplete ? (
                /* ── Estado: etapa/recorrido completado ── */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    {/* Indicador */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        color: epochColor,
                        fontWeight: 600,
                        fontSize: '0.8125rem',
                    }}>
                        <CheckCircle size={15} />
                        {nextRouteId ? 'Etapa completada' : 'Recorrido completado'}
                    </div>

                    {/* Síntesis teológica: solo en el último grupo */}
                    {!nextRouteId && sintesisTeologica && (
                        <>
                            <div style={{
                                height: '1px',
                                background: `${epochColor}20`,
                            }} />
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px',
                                color: '#1A1D23',
                                fontWeight: 700,
                                fontSize: '0.875rem',
                            }}>
                                <BookOpen size={14} style={{ color: epochColor }} />
                                Síntesis Teológica
                            </div>
                            <div style={{
                                overflowY: 'auto',
                                maxHeight: '220px',
                                paddingRight: '4px',
                            }}>
                                {sintesisTeologica.split('\n\n').map((p, i) => (
                                    <p key={i} style={{
                                        fontSize: '0.8125rem',
                                        lineHeight: 1.7,
                                        color: '#4A4F5A',
                                        margin: i === 0 ? '0' : '10px 0 0',
                                        textAlign: 'justify',
                                        hyphens: 'auto',
                                    }}>
                                        {p}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Botón principal */}
                    <button
                        onClick={nextRouteId ? () => startRoute(nextRouteId) : stop}
                        style={{
                            ...btnBase,
                            width: '100%',
                            padding: '10px 16px',
                            borderRadius: '10px',
                            background: epochColor,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.8125rem',
                            gap: '7px',
                            boxShadow: `0 2px 8px ${epochColor}40`,
                        }}
                    >
                        <Map size={14} />
                        {nextRouteLabel
                            ? `Siguiente: ${nextRouteLabel}`
                            : 'Terminar el recorrido'}
                    </button>

                    {/* Botón secundario: volver al paso anterior */}
                    <button
                        onClick={prev}
                        disabled={!canGoPrev}
                        style={{
                            ...btnBase,
                            width: '100%',
                            padding: '7px 16px',
                            borderRadius: '8px',
                            background: 'transparent',
                            color: canGoPrev ? '#888' : '#D0D0D0',
                            fontSize: '0.75rem',
                            gap: '5px',
                            border: '1px solid rgba(0,0,0,0.08)',
                            opacity: canGoPrev ? 1 : 0.4,
                        }}
                    >
                        <SkipBack size={12} />
                        Paso anterior
                    </button>
                </div>
            ) : (
                /* ── Controles normales ── */
                <>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                    }}>
                        {/* Prev */}
                        <button
                            onClick={prev}
                            disabled={!canGoPrev}
                            title="Paso anterior"
                            style={{
                                ...btnBase,
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                background: 'transparent',
                                color: canGoPrev ? epochColor : '#D0D0D0',
                                opacity: canGoPrev ? 1 : 0.35,
                            }}
                        >
                            <SkipBack size={17} />
                        </button>

                        {/* Play / Pause */}
                        <button
                            onClick={isPlaying ? pause : resume}
                            title={isPlaying ? 'Pausar' : 'Reanudar'}
                            style={{
                                ...btnBase,
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                background: epochColor,
                                color: 'white',
                                boxShadow: `0 2px 8px ${epochColor}40`,
                            }}
                        >
                            {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                        </button>

                        {/* Next */}
                        <button
                            onClick={next}
                            disabled={!canGoNext}
                            title="Siguiente paso"
                            style={{
                                ...btnBase,
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                background: 'transparent',
                                color: canGoNext ? epochColor : '#D0D0D0',
                                opacity: canGoNext ? 1 : 0.35,
                            }}
                        >
                            <SkipForward size={17} />
                        </button>

                        {/* Divider */}
                        <div style={{
                            width: '1px',
                            height: '24px',
                            background: 'rgba(0,0,0,0.08)',
                            margin: '0 6px',
                        }} />

                        {/* Stop */}
                        <button
                            onClick={stop}
                            title="Detener recorrido"
                            style={{
                                ...btnBase,
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                background: 'transparent',
                                color: '#999',
                            }}
                        >
                            <Square size={14} />
                        </button>
                    </div>

                    {/* Speed selector */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        marginTop: '12px',
                        paddingTop: '12px',
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                    }}>
                        <span style={{
                            fontSize: '0.6875rem',
                            color: '#999',
                            fontWeight: 500,
                            marginRight: '8px',
                            letterSpacing: '0.03em',
                        }}>
                            Velocidad
                        </span>
                        {SPEED_OPTIONS.map((s) => (
                            <button
                                key={s}
                                onClick={() => setSpeed(s)}
                                style={{
                                    ...btnBase,
                                    padding: '3px 10px',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontFamily: "'Inter', monospace",
                                    fontWeight: speed === s ? 600 : 400,
                                    background: speed === s ? epochColor : 'transparent',
                                    color: speed === s ? 'white' : '#999',
                                }}
                            >
                                {s}x
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default NarrativeControlPanel;
