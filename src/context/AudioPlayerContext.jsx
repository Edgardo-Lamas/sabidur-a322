import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => parseFloat(localStorage.getItem('player_volume') ?? '0.85'));
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onDuration = () => setDuration(audio.duration || 0);
    const onEnded = () => playNext();
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('durationchange', onDuration);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('durationchange', onDuration);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, [queue, queueIndex]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    localStorage.setItem('player_volume', String(volume));
  }, [volume]);

  const playTrack = useCallback((track, trackQueue = null, index = 0) => {
    if (trackQueue) {
      setQueue(trackQueue);
      setQueueIndex(index);
    }
    setCurrentTrack(track);
    setIsMinimized(false);
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = track.url;
    audio.load();
    audio.play().catch(() => {});
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (isPlaying) audio.pause();
    else audio.play().catch(() => {});
  }, [isPlaying, currentTrack]);

  const seek = useCallback((time) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  }, []);

  const playNext = useCallback(() => {
    if (!queue.length) return;
    const next = (queueIndex + 1) % queue.length;
    setQueueIndex(next);
    playTrack(queue[next], null, next);
  }, [queue, queueIndex, playTrack]);

  const playPrev = useCallback(() => {
    if (!queue.length) return;
    if (currentTime > 5) { seek(0); return; }
    const prev = (queueIndex - 1 + queue.length) % queue.length;
    setQueueIndex(prev);
    playTrack(queue[prev], null, prev);
  }, [queue, queueIndex, currentTime, playTrack, seek]);

  return (
    <AudioPlayerContext.Provider value={{
      currentTrack, isPlaying, currentTime, duration, volume, isMinimized,
      queue, queueIndex,
      playTrack, togglePlay, seek, playNext, playPrev,
      setVolume, setIsMinimized,
    }}>
      <audio ref={audioRef} preload="metadata" />
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error('useAudioPlayer must be used inside AudioPlayerProvider');
  return ctx;
}
