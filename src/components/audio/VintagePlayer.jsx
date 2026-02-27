/**
 * VintagePlayer.jsx
 * Reproductor de audio con estética vintage (panel de madera y latón).
 * Props:
 *   track       — objeto { title, speaker, pasaje, description, url, downloadUrl }
 *   onNext      — callback para siguiente pista (opcional)
 *   onPrev      — callback para pista anterior (opcional)
 *   canNext     — boolean
 *   canPrev     — boolean
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Download, Volume2, VolumeX } from 'lucide-react';

const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
};

const VintagePlayer = ({ track, onNext, onPrev, canNext = false, canPrev = false }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [vuLevels, setVuLevels] = useState([2, 3, 5, 4, 3, 5, 4, 2]);
    const vuIntervalRef = useRef(null);

    // Cambio de pista: reiniciar estado
    useEffect(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [track?.id]);

    // Animar VU meters cuando está reproduciendo
    useEffect(() => {
        if (isPlaying) {
            vuIntervalRef.current = setInterval(() => {
                setVuLevels(prev => prev.map(() => Math.floor(Math.random() * 7) + 1));
            }, 180);
        } else {
            clearInterval(vuIntervalRef.current);
            setVuLevels([1, 2, 1, 2, 1, 2, 1, 1]);
        }
        return () => clearInterval(vuIntervalRef.current);
    }, [isPlaying]);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio || !track?.url) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
        }
    }, [isPlaying, track?.url]);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current?.duration || 0);
    };
    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        if (canNext) onNext?.();
    };
    const handleSeek = (e) => {
        const val = Number(e.target.value);
        if (audioRef.current) audioRef.current.currentTime = val;
        setCurrentTime(val);
    };
    const handleVolume = (e) => {
        const val = Number(e.target.value);
        setVolume(val);
        if (audioRef.current) audioRef.current.volume = val;
        setMuted(val === 0);
    };
    const toggleMute = () => {
        if (!audioRef.current) return;
        const next = !muted;
        setMuted(next);
        audioRef.current.volume = next ? 0 : volume;
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;
    const hasAudio = !!track?.url;

    return (
        <div style={{
            background: 'linear-gradient(160deg, #2C1503 0%, #5C2E0A 25%, #8B5523 55%, #A06828 75%, #7A4518 100%)',
            borderRadius: '16px',
            border: '3px solid #8B6914',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,100,0.15), inset 0 -1px 0 rgba(0,0,0,0.4)',
            padding: '28px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Veta de madera decorativa */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'repeating-linear-gradient(92deg, transparent, transparent 18px, rgba(0,0,0,0.06) 18px, rgba(0,0,0,0.06) 19px)',
                borderRadius: '14px',
            }} />

            {/* Tornillos decorativos en esquinas */}
            {['top:10px;left:10px', 'top:10px;right:10px', 'bottom:10px;left:10px', 'bottom:10px;right:10px'].map((pos, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    ...Object.fromEntries(pos.split(';').map(p => p.split(':'))),
                    width: 10, height: 10,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #D4AF37, #8B6914)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
                }} />
            ))}

            {/* Audio element — src solo cuando hay URL para no hacer fetch de la página actual */}
            <audio
                ref={audioRef}
                src={track?.url || undefined}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

            {/* ─── Fila superior: Disco + Info ─── */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '20px' }}>

                {/* Disco de vinilo */}
                <div style={{ flexShrink: 0 }}>
                    <div style={{
                        width: 120, height: 120,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 50% 50%, #1a1a1a 16%, #2a2a2a 17%, #222 30%, #2a2a2a 31%, #1e1e1e 44%, #2a2a2a 45%, #1a1a1a 58%, #2a2a2a 59%, #1e1e1e 72%, #2a2a2a 73%, #1a1a1a 100%)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.7), inset 0 0 20px rgba(0,0,0,0.5)',
                        animation: isPlaying ? 'vinylSpin 2.8s linear infinite' : 'none',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {/* Etiqueta central del disco */}
                        <div style={{
                            width: 38, height: 38,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle at 40% 40%, #C5A059, #8B6914)',
                            boxShadow: '0 0 8px rgba(0,0,0,0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a1a1a' }} />
                        </div>
                        {/* Reflejo del disco */}
                        <div style={{
                            position: 'absolute', top: 8, left: 12, width: 28, height: 8,
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: '50%',
                            transform: 'rotate(-30deg)',
                            pointerEvents: 'none',
                        }} />
                    </div>
                    {/* Estado */}
                    <p style={{
                        textAlign: 'center',
                        marginTop: 8,
                        fontSize: '0.6rem',
                        fontFamily: "'Inter', sans-serif",
                        color: isPlaying ? '#C5A059' : '#8B8B6B',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                    }}>
                        {isPlaying ? '● EN VIVO' : '○ DETENIDO'}
                    </p>
                </div>

                {/* Info del track */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {!track ? (
                        <p style={{ color: '#8B7355', fontFamily: "'Lora', serif", fontSize: '0.95rem', fontStyle: 'italic' }}>
                            Selecciona una enseñanza de la lista →
                        </p>
                    ) : (
                        <>
                            <p style={{
                                fontSize: '0.65rem',
                                fontFamily: "'Inter', sans-serif",
                                color: '#C5A059',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                marginBottom: 4,
                            }}>
                                {track.pasaje || 'Enseñanza'}
                            </p>
                            <h3 style={{
                                fontFamily: "'Lora', serif",
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                color: '#F5E6C8',
                                lineHeight: 1.3,
                                margin: '0 0 6px',
                            }}>
                                {track.title}
                            </h3>
                            <p style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.8rem',
                                color: '#C4A882',
                                marginBottom: 8,
                            }}>
                                {track.speaker} · {track.duration || fmt(duration)}
                            </p>
                            <p style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.78rem',
                                color: '#A08060',
                                lineHeight: 1.55,
                            }}>
                                {track.description}
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* ─── VU Meters ─── */}
            <div style={{
                display: 'flex',
                gap: 4,
                alignItems: 'flex-end',
                height: 28,
                marginBottom: 16,
                padding: '0 4px',
            }}>
                {vuLevels.map((level, i) => (
                    <div key={i} style={{
                        flex: 1,
                        height: `${level * 14}%`,
                        minHeight: 4,
                        background: level > 5
                            ? 'linear-gradient(to top, #C0392B, #E74C3C)'
                            : level > 3
                                ? 'linear-gradient(to top, #C5A059, #F0C060)'
                                : 'linear-gradient(to top, #4A8C3F, #5DBB52)',
                        borderRadius: '2px 2px 0 0',
                        transition: 'height 0.15s ease, background 0.15s ease',
                    }} />
                ))}
            </div>

            {/* ─── Barra de progreso ─── */}
            <div style={{ marginBottom: 14 }}>
                <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    disabled={!hasAudio}
                    style={{ width: '100%', accentColor: '#C5A059', cursor: hasAudio ? 'pointer' : 'default' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <span style={{ fontSize: '0.7rem', color: '#A08060', fontFamily: 'monospace' }}>{fmt(currentTime)}</span>
                    <span style={{ fontSize: '0.7rem', color: '#7A6040', fontFamily: 'monospace' }}>{fmt(duration)}</span>
                </div>
            </div>

            {/* ─── Controles ─── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>

                {/* Botones de navegación + play */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button
                        onClick={onPrev}
                        disabled={!canPrev}
                        title="Anterior"
                        style={{
                            width: 36, height: 36,
                            borderRadius: '50%',
                            background: canPrev ? 'rgba(197,160,89,0.2)' : 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(197,160,89,0.3)',
                            color: canPrev ? '#C5A059' : '#5A4A30',
                            cursor: canPrev ? 'pointer' : 'default',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 200ms',
                        }}
                    >
                        <SkipBack size={15} />
                    </button>

                    {/* Play / Pause — botón principal */}
                    <button
                        onClick={togglePlay}
                        disabled={!hasAudio}
                        title={isPlaying ? 'Pausar' : 'Reproducir'}
                        style={{
                            width: 52, height: 52,
                            borderRadius: '50%',
                            background: hasAudio
                                ? 'radial-gradient(circle at 40% 40%, #D4AF37, #8B6914)'
                                : 'rgba(255,255,255,0.08)',
                            border: '2px solid rgba(212,175,55,0.5)',
                            color: hasAudio ? '#1A1D23' : '#5A4A30',
                            cursor: hasAudio ? 'pointer' : 'default',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: hasAudio ? '0 2px 12px rgba(197,160,89,0.4)' : 'none',
                            transition: 'all 200ms',
                        }}
                    >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 2 }} />}
                    </button>

                    <button
                        onClick={onNext}
                        disabled={!canNext}
                        title="Siguiente"
                        style={{
                            width: 36, height: 36,
                            borderRadius: '50%',
                            background: canNext ? 'rgba(197,160,89,0.2)' : 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(197,160,89,0.3)',
                            color: canNext ? '#C5A059' : '#5A4A30',
                            cursor: canNext ? 'pointer' : 'default',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 200ms',
                        }}
                    >
                        <SkipForward size={15} />
                    </button>
                </div>

                {/* Volumen */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center' }}>
                    <button onClick={toggleMute} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A08060', padding: 0 }}>
                        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                    <input
                        type="range"
                        min={0} max={1} step={0.01}
                        value={muted ? 0 : volume}
                        onChange={handleVolume}
                        style={{ width: 70, accentColor: '#C5A059', cursor: 'pointer' }}
                    />
                </div>

                {/* Descargar */}
                {track?.downloadUrl ? (
                    <a
                        href={track.downloadUrl}
                        download
                        title="Descargar audio"
                        style={{
                            display: 'flex', alignItems: 'center', gap: 5,
                            padding: '6px 12px',
                            borderRadius: 20,
                            border: '1px solid rgba(197,160,89,0.4)',
                            color: '#C5A059',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            fontFamily: "'Inter', sans-serif",
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            textDecoration: 'none',
                            background: 'rgba(197,160,89,0.1)',
                            transition: 'all 200ms',
                        }}
                    >
                        <Download size={12} />
                        Descargar
                    </a>
                ) : (
                    <span style={{
                        fontSize: '0.65rem',
                        color: '#5A4A30',
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: 'italic',
                    }}>
                        Próximamente
                    </span>
                )}
            </div>

            {/* Sin audio: aviso */}
            {!hasAudio && track && (
                <p style={{
                    textAlign: 'center',
                    marginTop: 12,
                    fontSize: '0.7rem',
                    color: '#8B6030',
                    fontFamily: "'Inter', sans-serif",
                    fontStyle: 'italic',
                }}>
                    Audio en preparación — disponible pronto
                </p>
            )}

            {/* CSS animations */}
            <style>{`
                @keyframes vinylSpin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default VintagePlayer;
