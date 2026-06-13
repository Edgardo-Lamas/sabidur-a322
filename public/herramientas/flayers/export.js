/* =====================================================================
   export.js — Exporta el flayer a MP4 (H.264 + AAC) compartible.
   Estrategia:
     1) WebCodecs (VideoEncoder + AudioEncoder) + mp4-muxer → MP4 real.
        Decodifica el audio del clip via fetch + AudioContext para luego
        codificarlo en AAC junto con los frames de video en H.264.
     2) Fallback: MediaRecorder → .webm (Firefox u otros sin WebCodecs).
   ===================================================================== */
(function () {
  'use strict';

  const FPS = 30;

  const ASPECT_DIMS = { '9-16': [1080, 1920], '4-5': [1080, 1350], '1-1': [1080, 1080] };
  function dims(state) {
    const d = ASPECT_DIMS[state.aspect || '9-16'] || ASPECT_DIMS['9-16'];
    return { W: d[0], H: d[1] };
  }

  async function loadMuxer() {
    try { return await import('https://esm.sh/mp4-muxer@5.2.1'); }
    catch (e) {
      try { return await import('https://cdn.jsdelivr.net/npm/mp4-muxer@5.2.1/+esm'); }
      catch (e2) { return null; }
    }
  }

  function supportsWebCodecs() {
    return typeof window.VideoEncoder === 'function' && typeof window.VideoFrame === 'function';
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
  }

  async function prepFrame(state, t) {
    if (state.bgPreset && typeof state.bgPreset.seekTo === 'function') {
      await state.bgPreset.seekTo(t);
    }
  }

  /* Decodifica el audio del clip en un AudioBuffer reutilizable */
  async function decodeClipAudio(vid) {
    if (!vid || !vid.src) return null;
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return null;
      const resp = await fetch(vid.src);
      const ab = await resp.arrayBuffer();
      const tmpCtx = new AudioCtxClass();
      const audioBuf = await tmpCtx.decodeAudioData(ab);
      tmpCtx.close();
      return audioBuf;
    } catch (e) { return null; }
  }

  async function exportMP4(state, onProgress, filename) {
    const { W, H } = dims(state);
    const dur = state.duration || 5;
    const totalFrames = Math.round(dur * FPS);
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d', { alpha: false });

    if (state.bgPreset) state.bgPreset.prepare(W, H);

    const vid = state.bgPreset && state.bgPreset.isVideo ? state.bgPreset._video : null;
    if (vid) { try { vid.pause(); } catch (e) {} }

    // Decodificar audio del clip una sola vez; se pasa a ambos encoders
    const audioBuf = await decodeClipAudio(vid);

    let result;
    try {
      if (supportsWebCodecs()) {
        const muxerMod = await loadMuxer();
        if (muxerMod) {
          try {
            result = await encodeWithWebCodecs(muxerMod, state, ctx, canvas, W, H, totalFrames, dur, onProgress, filename, audioBuf);
          } catch (e) { console.warn('WebCodecs falló, fallback webm:', e); }
        }
      }
      if (!result) result = await encodeWithMediaRecorder(state, ctx, canvas, W, H, dur, onProgress, filename, audioBuf);
    } finally {
      if (vid) { try { vid.play(); } catch (e) {} }
    }
    return result;
  }

  async function encodeWithWebCodecs(muxerMod, state, ctx, canvas, W, H, totalFrames, dur, onProgress, filename, audioBuf) {
    const { Muxer, ArrayBufferTarget } = muxerMod;

    const hasAudio = !!(audioBuf && typeof AudioEncoder !== 'undefined');
    const sampleRate = audioBuf ? audioBuf.sampleRate : 44100;
    const numCh = audioBuf ? audioBuf.numberOfChannels : 2;

    const muxerOpts = {
      target: new ArrayBufferTarget(),
      video: { codec: 'avc', width: W, height: H, frameRate: FPS },
      fastStart: 'in-memory'
    };
    if (hasAudio) muxerOpts.audio = { codec: 'aac', sampleRate, numberOfChannels: numCh };

    const muxer = new Muxer(muxerOpts);

    /* ---- Video encoder ---- */
    const videoEncoder = new VideoEncoder({
      output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
      error: (e) => { throw e; }
    });
    const vcandidates = ['avc1.640028', 'avc1.4d0028', 'avc1.42e028', 'avc1.42001f'];
    let vconfigured = false;
    for (const codec of vcandidates) {
      try {
        const s = await VideoEncoder.isConfigSupported({ codec, width: W, height: H, bitrate: 9_000_000, framerate: FPS });
        if (s && s.supported) {
          videoEncoder.configure({ codec, width: W, height: H, bitrate: 9_000_000, framerate: FPS, latencyMode: 'quality' });
          vconfigured = true; break;
        }
      } catch (e) {}
    }
    if (!vconfigured) videoEncoder.configure({ codec: 'avc1.42001f', width: W, height: H, bitrate: 9_000_000, framerate: FPS });

    /* ---- Audio encoder (AAC) ---- */
    let audioEncoder = null;
    if (hasAudio) {
      audioEncoder = new AudioEncoder({
        output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
        error: (e) => console.warn('AudioEncoder:', e)
      });
      try {
        const aacCfg = { codec: 'mp4a.40.2', sampleRate, numberOfChannels: numCh, bitrate: 128_000 };
        const check = await AudioEncoder.isConfigSupported(aacCfg);
        if (check.supported) {
          audioEncoder.configure(aacCfg);
        } else {
          audioEncoder.close(); audioEncoder = null;
        }
      } catch (e) { audioEncoder = null; }
    }

    /* ---- Codificar audio en chunks de 4096 frames ---- */
    if (audioEncoder && audioBuf) {
      const totalSamples = Math.ceil(dur * sampleRate);
      const chunkSz = 4096;
      for (let off = 0; off < totalSamples; off += chunkSz) {
        const frames = Math.min(chunkSz, totalSamples - off);
        const interleaved = new Float32Array(frames * numCh);
        for (let i = 0; i < frames; i++) {
          for (let c = 0; c < numCh; c++) {
            const ch = audioBuf.getChannelData(c);
            interleaved[i * numCh + c] = (off + i < ch.length) ? ch[off + i] : 0;
          }
        }
        const ad = new AudioData({
          format: 'f32-interleaved',
          sampleRate,
          numberOfChannels: numCh,
          numberOfFrames: frames,
          timestamp: Math.round(off / sampleRate * 1e6),
          data: interleaved
        });
        audioEncoder.encode(ad);
        ad.close();
      }
      await audioEncoder.flush();
    }

    /* ---- Codificar frames de video ---- */
    for (let i = 0; i < totalFrames; i++) {
      const t = i / FPS;
      await prepFrame(state, t);
      window.Flyer.renderFlyer(ctx, state, t, W, H);
      const frame = new VideoFrame(canvas, { timestamp: Math.round(i * 1e6 / FPS), duration: Math.round(1e6 / FPS) });
      videoEncoder.encode(frame, { keyFrame: i % FPS === 0 });
      frame.close();
      if (onProgress) onProgress(i / totalFrames * 0.92);
      if (i % 5 === 0) await new Promise(r => setTimeout(r, 0));
    }
    await videoEncoder.flush();

    muxer.finalize();
    if (onProgress) onProgress(0.98);
    downloadBlob(new Blob([muxer.target.buffer], { type: 'video/mp4' }), (filename || 'flayer') + '.mp4');
    if (onProgress) onProgress(1);
    return { ok: true, type: 'mp4' };
  }

  /* Fallback: MediaRecorder (.webm con opus) para navegadores sin WebCodecs */
  async function encodeWithMediaRecorder(state, ctx, canvas, W, H, dur, onProgress, filename, audioBuf) {
    const vid = state.bgPreset && state.bgPreset.isVideo ? state.bgPreset._video : null;
    if (vid) { try { vid.currentTime = 0; await vid.play(); } catch (e) {} }
    const stream = canvas.captureStream(FPS);

    let audioSource = null;
    let audioCtx = null;
    if (audioBuf) {
      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
          audioCtx = new AudioCtxClass();
          const destNode = audioCtx.createMediaStreamDestination();
          audioSource = audioCtx.createBufferSource();
          audioSource.buffer = audioBuf;
          audioSource.loop = true;
          audioSource.connect(destNode);
          audioSource.start(0);
          destNode.stream.getAudioTracks().forEach(t => stream.addTrack(t));
        }
      } catch (e) { console.warn('Audio MediaRecorder:', e); }
    }

    let mime = 'video/webm;codecs=vp9,opus';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm;codecs=vp8,opus';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm;codecs=vp9';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm;codecs=vp8';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm';
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 9_000_000 });
    const chunks = [];
    rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    return await new Promise((resolve) => {
      rec.onstop = () => {
        if (audioSource) { try { audioSource.stop(); } catch (e) {} }
        if (audioCtx) { try { audioCtx.close(); } catch (e) {} }
        downloadBlob(new Blob(chunks, { type: 'video/webm' }), (filename || 'flayer') + '.webm');
        if (onProgress) onProgress(1);
        resolve({ ok: true, type: 'webm' });
      };
      rec.start();
      const start = performance.now();
      function loop(now) {
        const t = (now - start) / 1000;
        if (t >= dur) { window.Flyer.renderFlyer(ctx, state, dur, W, H); rec.stop(); return; }
        window.Flyer.renderFlyer(ctx, state, t, W, H);
        if (onProgress) onProgress(t / dur * 0.95);
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    });
  }

  async function exportPoster(state, filename) {
    const { W, H } = dims(state);
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (state.bgPreset) state.bgPreset.prepare(W, H);
    await prepFrame(state, state.duration || 5);
    window.Flyer.renderFlyer(ctx, state, state.duration || 5, W, H);
    canvas.toBlob(b => downloadBlob(b, (filename || 'flayer') + '.png'), 'image/png');
  }

  window.Exporter = { exportMP4, exportPoster, supportsWebCodecs, dims, FPS };
})();
