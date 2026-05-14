import React, { useRef } from 'react';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function PersistentPlayer() {
  const {
    currentTrack, isPlaying, currentTime, duration, volume, isMinimized,
    togglePlay, seek, playNext, playPrev, setVolume, setIsMinimized,
  } = useAudioPlayer();

  const progressRef = useRef(null);

  if (!currentTrack) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * duration);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0A1628] border-t border-[#C5A059]/20 transition-all duration-300 ${isMinimized ? 'h-1' : ''}`}>
      {/* Progress bar — always visible */}
      <div
        ref={progressRef}
        className="h-1 bg-white/10 cursor-pointer group"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-[#C5A059] transition-all relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C5A059] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {!isMinimized && (
        <div className="flex items-center gap-4 px-4 py-3 max-w-6xl mx-auto">
          {/* Track info */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate leading-tight">{currentTrack.titulo}</p>
            {currentTrack.serie && (
              <p className="text-[#C5A059]/70 text-xs truncate mt-0.5">{currentTrack.serie}</p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button onClick={playPrev} className="text-white/60 hover:text-white transition-colors p-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
              </svg>
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-[#C5A059] hover:bg-[#E6C378] flex items-center justify-center transition-colors flex-shrink-0"
            >
              {isPlaying ? (
                <svg className="w-5 h-5 text-[#0A1628]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[#0A1628] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <button onClick={playNext} className="text-white/60 hover:text-white transition-colors p-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
              </svg>
            </button>
          </div>

          {/* Time */}
          <div className="text-white/50 text-xs tabular-nums flex-shrink-0 hidden sm:block">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <svg className="w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
            <input
              type="range" min="0" max="1" step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 accent-[#C5A059] cursor-pointer"
            />
          </div>

          {/* Minimize */}
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white/30 hover:text-white/60 transition-colors p-1 flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
        </div>
      )}

      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full h-8 flex items-center justify-center gap-2 text-[#C5A059]/70 hover:text-[#C5A059] text-xs transition-colors"
        >
          <span>{currentTrack.titulo}</span>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
        </button>
      )}
    </div>
  );
}
