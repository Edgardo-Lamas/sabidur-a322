/* =====================================================================
   export.js — Exporta el flayer a video vertical/cuadrado según formato.
   Estrategia:
     1) WebCodecs (VideoEncoder) + mp4-muxer  -> MP4 H.264 real.
     2) Fallback: MediaRecorder sobre captureStream -> .webm.
   Renderiza fotograma a fotograma con la MISMA renderFlyer de la
   vista previa. Si el fondo es un clip de video, lo posiciona (seek)
   en cada cuadro para una composición determinista.
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

  async function exportMP4(state, onProgress, filename) {
    const { W, H } = dims(state);
    const dur = state.duration || 5;
    const totalFrames = Math.round(dur * FPS);
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d', { alpha: false });

    if (state.bgPreset) state.bgPreset.prepare(W, H);

    // pausar video durante el render determinista
    const vid = state.bgPreset && state.bgPreset.isVideo ? state.bgPreset._video : null;
    if (vid) { try { vid.pause(); } catch (e) {} }

    let result;
    try {
      if (supportsWebCodecs()) {
        const muxerMod = await loadMuxer();
        if (muxerMod) {
          try {
            result = await encodeWithWebCodecs(muxerMod, state, ctx, canvas, W, H, totalFrames, onProgress, filename);
          } catch (e) { console.warn('WebCodecs falló, fallback webm:', e); }
        }
      }
      if (!result) result = await encodeWithMediaRecorder(state, ctx, canvas, W, H, dur, onProgress, filename);
    } finally {
      if (vid) { try { vid.play(); } catch (e) {} }
    }
    return result;
  }

  async function encodeWithWebCodecs(muxerMod, state, ctx, canvas, W, H, totalFrames, onProgress, filename) {
    const { Muxer, ArrayBufferTarget } = muxerMod;
    const muxer = new Muxer({
      target: new ArrayBufferTarget(),
      video: { codec: 'avc', width: W, height: H, frameRate: FPS },
      fastStart: 'in-memory'
    });
    const encoder = new VideoEncoder({
      output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
      error: (e) => console.error('VideoEncoder error', e)
    });

    const candidates = ['avc1.640028', 'avc1.4d0028', 'avc1.42e028', 'avc1.42001f'];
    let configured = false;
    for (const codec of candidates) {
      try {
        const s = await VideoEncoder.isConfigSupported({ codec, width: W, height: H, bitrate: 9_000_000, framerate: FPS });
        if (s && s.supported) { encoder.configure({ codec, width: W, height: H, bitrate: 9_000_000, framerate: FPS, latencyMode: 'quality' }); configured = true; break; }
      } catch (e) {}
    }
    if (!configured) encoder.configure({ codec: 'avc1.42001f', width: W, height: H, bitrate: 9_000_000, framerate: FPS });

    for (let i = 0; i < totalFrames; i++) {
      const t = i / FPS;
      await prepFrame(state, t);
      window.Flyer.renderFlyer(ctx, state, t, W, H);
      const frame = new VideoFrame(canvas, { timestamp: Math.round(i * 1e6 / FPS), duration: Math.round(1e6 / FPS) });
      encoder.encode(frame, { keyFrame: i % FPS === 0 });
      frame.close();
      if (onProgress) onProgress(i / totalFrames * 0.92);
      if (i % 5 === 0) await new Promise(r => setTimeout(r, 0));
    }
    await encoder.flush();
    muxer.finalize();
    if (onProgress) onProgress(0.98);
    downloadBlob(new Blob([muxer.target.buffer], { type: 'video/mp4' }), (filename || 'flayer') + '.mp4');
    if (onProgress) onProgress(1);
    return { ok: true, type: 'mp4' };
  }

  async function encodeWithMediaRecorder(state, ctx, canvas, W, H, dur, onProgress, filename) {
    const vid = state.bgPreset && state.bgPreset.isVideo ? state.bgPreset._video : null;
    if (vid) { try { vid.currentTime = 0; await vid.play(); } catch (e) {} }
    const stream = canvas.captureStream(FPS);
    let mime = 'video/webm;codecs=vp9';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm;codecs=vp8';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm';
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 9_000_000 });
    const chunks = [];
    rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    return await new Promise((resolve) => {
      rec.onstop = () => {
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
