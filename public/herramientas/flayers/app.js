/* =====================================================================
   app.js — Interfaz, estado, vista previa en bucle, subidas y persistencia.
   ===================================================================== */
(function () {
  'use strict';

  const LS = 'flayers_v2';
  const VERSE_FONT = "'Cormorant Garamond', Georgia, serif";

  const state = {
    verse: '', ref: '', verseId: null,
    bgId: 'nebula-violeta', bgPreset: null,
    animStyle: 'fundido', duration: 6,
    aspect: '9-16',
    inkId: 'marfil', ink: '#F6F3EA',
    verseFont: VERSE_FONT
  };

  let verses = [];
  let customMedia = [];        // [{id,name,type:'image'|'video',dataURL?}] (video no se persiste)
  let manifestVideos = [];     // [{id,name,file,poster?}] desde videos/manifest.json
  const presetCache = {};      // id -> preset
  const imgElCache = {};       // id -> HTMLImageElement
  const vidElCache = {};       // id -> HTMLVideoElement (sesión)
  const posterCache = {};      // id -> HTMLImageElement (póster del manifiesto)

  // ---------- persistencia ----------
  function save() {
    try {
      const persistMedia = customMedia.filter(m => m.type === 'image' && m.dataURL);
      localStorage.setItem(LS, JSON.stringify({
        verses, customMedia: persistMedia,
        sel: { bgId: state.bgId, verseId: state.verseId, animStyle: state.animStyle, duration: state.duration, aspect: state.aspect, inkId: state.inkId }
      }));
    } catch (e) {}
  }
  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(LS) || 'null');
      if (!d) return false;
      if (Array.isArray(d.verses) && d.verses.length) verses = d.verses;
      if (Array.isArray(d.customMedia)) customMedia = d.customMedia;
      if (d.sel) {
        state.bgId = d.sel.bgId || state.bgId;
        state.verseId = d.sel.verseId;
        state.animStyle = d.sel.animStyle || state.animStyle;
        state.duration = d.sel.duration || state.duration;
        state.aspect = d.sel.aspect || state.aspect;
        state.inkId = d.sel.inkId || state.inkId;
      }
      return true;
    } catch (e) { return false; }
  }

  // ---------- presets ----------
  function getPreset(id) {
    if (presetCache[id]) return presetCache[id];
    if (id.startsWith('img:')) {
      const rec = customMedia.find(c => c.id === id);
      if (!rec || !rec.dataURL) return null;
      let imgEl = imgElCache[id];
      if (!imgEl) { imgEl = new Image(); imgEl.src = rec.dataURL; imgElCache[id] = imgEl; }
      const p = window.Backgrounds.imagePreset(id, imgEl);
      presetCache[id] = p; return p;
    }
    if (id.startsWith('vid:')) {
      const videoEl = vidElCache[id];
      if (!videoEl) return null;             // no sobrevive a recarga
      const p = window.Backgrounds.videoPreset(id, videoEl);
      presetCache[id] = p; return p;
    }
    if (id.startsWith('mvid:')) {
      const rec = manifestVideos.find(c => c.id === id);
      if (!rec) return null;
      let videoEl = vidElCache[id];
      if (!videoEl) {
        videoEl = document.createElement('video');
        videoEl.src = rec.file; videoEl.muted = true; videoEl.loop = true;
        videoEl.playsInline = true; videoEl.setAttribute('playsinline', '');
        videoEl.setAttribute('crossorigin', 'anonymous');
        videoEl.preload = 'auto';
        videoEl.style.position = 'fixed'; videoEl.style.left = '-9999px';
        videoEl.style.width = '2px'; videoEl.style.height = '2px';
        document.body.appendChild(videoEl);
        videoEl.addEventListener('loadeddata', () => { renderBgGrid(); try { videoEl.play(); } catch (e) {} });
        videoEl.load();
        vidElCache[id] = videoEl;
      }
      const p = window.Backgrounds.videoPreset(id, videoEl);
      presetCache[id] = p; return p;
    }
    const p = window.Backgrounds.get(id);
    if (p) presetCache[id] = p;
    return p;
  }
  function resolveBg() {
    state.bgPreset = getPreset(state.bgId) || getPreset('nebula-violeta');
    if (state.bgId !== state.bgPreset.id) state.bgId = state.bgPreset.id;
    // reproducir si es video
    if (state.bgPreset.isVideo && state.bgPreset._video) {
      try { state.bgPreset._video.play(); } catch (e) {}
    }
    updateMuteBtn();
  }

  function currentVerse() { return verses.find(x => x.id === state.verseId) || verses[0]; }
  function syncVerseToState() {
    const v = currentVerse();
    if (v) { state.verse = v.text; state.ref = v.ref; state.verseId = v.id; }
  }
  function applyInk() {
    const c = window.TEXT_COLORS.find(x => x.id === state.inkId) || window.TEXT_COLORS[0];
    state.ink = c.ink;
  }

  // ---------- vista previa ----------
  let pCtx, pCanvas, startTime = performance.now(), loggedErr = false;
  function applyAspect() {
    const a = window.ASPECTS.find(x => x.id === state.aspect) || window.ASPECTS[0];
    const baseW = 540;
    pCanvas.width = baseW;
    pCanvas.height = Math.round(baseW * a.h / a.w);
    const dev = document.getElementById('device');
    if (dev) dev.style.aspectRatio = a.w + ' / ' + a.h;
  }
  function previewLoop(now) {
    const t = ((now - startTime) / 1000) % state.duration;
    try {
      if (state.bgPreset) window.Flyer.renderFlyer(pCtx, state, t, pCanvas.width, pCanvas.height);
    } catch (e) { if (!loggedErr) { console.error('renderFlyer:', e); loggedErr = true; } }
    requestAnimationFrame(previewLoop);
  }
  function replay() { startTime = performance.now(); }

  function updateMuteBtn() {
    const btn = document.getElementById('btnMute');
    if (!btn) return;
    const v = state.bgPreset && state.bgPreset.isVideo ? state.bgPreset._video : null;
    if (v) {
      btn.classList.remove('hidden');
      btn.textContent = v.muted ? '🔇 Sin audio' : '🔊 Con audio';
    } else {
      btn.classList.add('hidden');
    }
  }

  // ---------- render UI ----------
  function thumbCanvas(id) {
    const c = document.createElement('canvas'); c.width = 144; c.height = 256;
    const cx = c.getContext('2d');
    // video del manifiesto: usar póster si existe
    if (id.startsWith('mvid:')) {
      const rec = manifestVideos.find(m => m.id === id);
      cx.fillStyle = '#0a0b18'; cx.fillRect(0, 0, c.width, c.height);
      if (rec && rec.poster) {
        let pimg = posterCache[id];
        if (!pimg) { pimg = new Image(); pimg.onload = () => renderBgGrid(); pimg.src = rec.poster; posterCache[id] = pimg; }
        if (pimg.complete && pimg.naturalWidth) {
          const sc = Math.max(c.width / pimg.naturalWidth, c.height / pimg.naturalHeight);
          const dw = pimg.naturalWidth * sc, dh = pimg.naturalHeight * sc;
          cx.drawImage(pimg, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
        }
      }
      const g = cx.createLinearGradient(0, c.height * 0.5, 0, c.height);
      g.addColorStop(0, 'rgba(2,3,8,0)'); g.addColorStop(1, 'rgba(2,3,8,.6)');
      cx.fillStyle = g; cx.fillRect(0, 0, c.width, c.height);
      return c;
    }
    const p = getPreset(id);
    if (p) {
      const cache = p.prepare(c.width, c.height);
      p.paint(cx, c.width, c.height, 2.2, cache);
      const g = cx.createLinearGradient(0, c.height * 0.5, 0, c.height);
      g.addColorStop(0, 'rgba(2,3,8,0)'); g.addColorStop(1, 'rgba(2,3,8,.6)');
      cx.fillStyle = g; cx.fillRect(0, 0, c.width, c.height);
    } else { cx.fillStyle = '#0a0b18'; cx.fillRect(0, 0, c.width, c.height); }
    return c;
  }

  function renderBgGrid() {
    const grid = document.getElementById('bgGrid');
    grid.innerHTML = '';
    const scenes = window.SEED_BACKGROUNDS.map(b => ({ id: b.id, name: b.name, custom: false, type: 'scene' }));
    const videos = manifestVideos.map(c => ({ id: c.id, name: c.name, custom: false, type: 'video' }));
    const mixed = [];
    const maxLen = Math.max(scenes.length, videos.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < scenes.length) mixed.push(scenes[i]);
      if (i < videos.length) mixed.push(videos[i]);
    }
    const all = mixed.concat(customMedia.map(c => ({ id: c.id, name: c.name, custom: true, type: c.type })));
    for (const b of all) {
      const el = document.createElement('div');
      el.className = 'bg-thumb' + (b.id === state.bgId ? ' sel' : '') + (b.custom ? ' custom' : '');
      el.appendChild(thumbCanvas(b.id));
      const nm = document.createElement('div'); nm.className = 'nm';
      nm.textContent = (b.type === 'video' ? '▶ ' : '') + b.name; el.appendChild(nm);
      if (b.custom) {
        const del = document.createElement('button'); del.className = 'del'; del.textContent = '×';
        del.title = 'Eliminar'; del.onclick = (ev) => { ev.stopPropagation(); removeMedia(b.id); };
        el.appendChild(del);
      }
      el.onclick = () => { state.bgId = b.id; resolveBg(); renderBgGrid(); replay(); save(); };
      grid.appendChild(el);
    }
  }

  function renderVerseList() {
    const list = document.getElementById('verseList');
    list.innerHTML = '';
    for (const v of verses) {
      const card = document.createElement('button');
      card.className = 'verse-card' + (v.id === state.verseId ? ' sel' : '');
      const ref = document.createElement('div'); ref.className = 'ref'; ref.textContent = v.ref;
      const tx = document.createElement('div'); tx.className = 'tx'; tx.textContent = v.text;
      card.appendChild(ref); card.appendChild(tx);
      const del = document.createElement('button'); del.className = 'del'; del.textContent = '🗑';
      del.title = 'Eliminar'; del.onclick = (ev) => { ev.stopPropagation(); removeVerse(v.id); };
      card.appendChild(del);
      card.onclick = () => { state.verseId = v.id; syncVerseToState(); renderVerseList(); replay(); save(); };
      list.appendChild(card);
    }
  }

  function renderSeg(containerId, items, getId, isOn, onPick, labelFn) {
    const seg = document.getElementById(containerId);
    seg.innerHTML = '';
    for (const it of items) {
      const b = document.createElement('button');
      b.innerHTML = labelFn ? labelFn(it) : it.name;
      b.className = isOn(it) ? 'on' : '';
      b.onclick = () => { onPick(it); };
      seg.appendChild(b);
    }
  }
  function renderAnimSeg() {
    renderSeg('animSeg', window.ANIM_STYLES, x => x.id, x => x.id === state.animStyle,
      (x) => { state.animStyle = x.id; renderAnimSeg(); replay(); save(); });
  }
  function renderColorSeg() {
    renderSeg('colorSeg', window.TEXT_COLORS, x => x.id, x => x.id === state.inkId,
      (x) => { state.inkId = x.id; applyInk(); renderColorSeg(); replay(); save(); },
      (x) => `<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${x.ink};margin-right:6px;vertical-align:middle;border:1px solid rgba(255,255,255,.3)"></span>${x.name}`);
  }
  function renderAspectSeg() {
    renderSeg('aspectSeg', window.ASPECTS, x => x.id, x => x.id === state.aspect,
      (x) => { state.aspect = x.id; applyAspect(); renderAspectSeg(); replay(); save(); },
      (x) => `${x.name}<span style="display:block;font-size:9.5px;opacity:.6;letter-spacing:.4px;margin-top:2px;">${x.label}</span>`);
  }

  // ---------- acciones ----------
  function removeMedia(id) {
    const rec = customMedia.find(c => c.id === id);
    customMedia = customMedia.filter(c => c.id !== id);
    delete presetCache[id]; delete imgElCache[id];
    if (vidElCache[id]) { try { URL.revokeObjectURL(vidElCache[id].src); vidElCache[id].remove(); } catch (e) {} delete vidElCache[id]; }
    if (state.bgId === id) { state.bgId = 'nebula-violeta'; resolveBg(); }
    renderBgGrid(); save();
  }
  function removeVerse(id) {
    if (verses.length <= 1) return;
    verses = verses.filter(v => v.id !== id);
    if (state.verseId === id) { state.verseId = verses[0].id; syncVerseToState(); }
    renderVerseList(); save();
  }

  function addImage(dataURL, name) {
    const id = 'img:' + Date.now();
    customMedia.push({ id, name, type: 'image', dataURL });
    state.bgId = id; resolveBg(); renderBgGrid(); replay(); save();
  }
  function addVideo(file, name) {
    const id = 'vid:' + Date.now();
    const url = URL.createObjectURL(file);
    const v = document.createElement('video');
    v.src = url; v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', '');
    v.style.position = 'fixed'; v.style.left = '-9999px'; v.style.width = '2px'; v.style.height = '2px';
    document.body.appendChild(v);
    vidElCache[id] = v;
    customMedia.push({ id, name, type: 'video' });
    v.addEventListener('loadeddata', () => { renderBgGrid(); try { v.play(); } catch (e) {} });
    v.load();
    state.bgId = id; resolveBg(); renderBgGrid(); replay(); save();
  }

  // ---------- exportación ----------
  let exporting = false;
  async function doDownload() {
    if (exporting) return; exporting = true;
    const overlay = document.getElementById('overlay');
    const fill = document.getElementById('progFill');
    const pct = document.getElementById('progPct');
    const btn = document.getElementById('btnDownload');
    overlay.classList.add('on'); btn.disabled = true;
    fill.style.width = '0%'; pct.textContent = '0%';
    const fname = 'flayer-' + (state.ref || 'versiculo').replace(/[^\wáéíóúñ]+/gi, '-').toLowerCase();
    try {
      const res = await window.Exporter.exportMP4(state, (p) => {
        const v = Math.round(p * 100); fill.style.width = v + '%'; pct.textContent = v + '%';
      }, fname);
      if (res && res.type === 'webm') {
        document.getElementById('dlNote').textContent = 'Tu navegador exportó en WEBM (compatible con redes). Para MP4 usa Chrome/Edge.';
      }
    } catch (e) { console.error(e); pct.textContent = 'Error al exportar'; }
    setTimeout(() => { overlay.classList.remove('on'); btn.disabled = false; exporting = false; }, 600);
  }

  // ---------- manifiesto de videos (catálogo permanente) ----------
  async function loadManifest() {
    try {
      const res = await fetch('videos/manifest.json', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.videos || []);
      manifestVideos = list.filter(v => v && v.file).map((v, i) => ({
        id: 'mvid:' + (v.id || ('m' + i)),
        name: (v.name || ('Video ' + (i + 1))).slice(0, 14),
        file: v.file,
        poster: v.poster || null
      }));
    } catch (e) { /* sin manifiesto: el sistema funciona igual con las escenas */ }
  }

  // ---------- init ----------
  function wire() {
    document.getElementById('imgInput').addEventListener('change', (e) => {
      const f = e.target.files[0]; if (!f) return;
      const name = (f.name || 'Medio').replace(/\.[^.]+$/, '').slice(0, 12);
      if (f.type.startsWith('video')) {
        addVideo(f, name);
      } else {
        const r = new FileReader();
        r.onload = () => addImage(r.result, name);
        r.readAsDataURL(f);
      }
      e.target.value = '';
    });

    const dr = document.getElementById('durRange'), dv = document.getElementById('durVal');
    dr.value = state.duration; dv.textContent = state.duration.toFixed(1) + 's';
    dr.addEventListener('input', () => { state.duration = parseFloat(dr.value); dv.textContent = state.duration.toFixed(1) + 's'; replay(); save(); });

    const form = document.getElementById('verseForm');
    document.getElementById('btnAddVerse').addEventListener('click', () => {
      const cur = currentVerse();
      document.getElementById('vfText').value = cur ? cur.text : '';
      document.getElementById('vfRef').value = cur ? cur.ref : '';
      form.classList.toggle('hidden');
    });
    document.getElementById('vfCancel').addEventListener('click', () => form.classList.add('hidden'));
    document.getElementById('vfSave').addEventListener('click', () => {
      const text = document.getElementById('vfText').value.trim();
      const ref = document.getElementById('vfRef').value.trim() || 'Versículo';
      if (!text) return;
      const id = 'v:' + Date.now();
      verses.unshift({ id, text, ref, custom: true });
      state.verseId = id; syncVerseToState();
      form.classList.add('hidden'); renderVerseList(); replay(); save();
    });

    document.getElementById('btnReplay').addEventListener('click', replay);
    document.getElementById('btnMute').addEventListener('click', () => {
      const v = state.bgPreset && state.bgPreset.isVideo ? state.bgPreset._video : null;
      if (!v) return;
      v.muted = !v.muted;
      document.getElementById('btnMute').textContent = v.muted ? '🔇 Sin audio' : '🔊 Con audio';
    });
    document.getElementById('btnDownload').addEventListener('click', doDownload);
    document.getElementById('btnPoster').addEventListener('click', () => {
      const fname = 'flayer-' + (state.ref || 'versiculo').replace(/[^\wáéíóúñ]+/gi, '-').toLowerCase();
      window.Exporter.exportPoster(state, fname);
    });
  }

  async function init() {
    if (!load() || !verses.length) {
      verses = window.SEED_VERSES.map((v, i) => ({ id: 'seed:' + i, text: v.text, ref: v.ref, custom: false }));
    }
    if (state.verseId == null) state.verseId = verses[0].id;
    // medios de video no sobreviven a recarga: descartarlos del catálogo
    customMedia = customMedia.filter(m => m.type === 'image');

    syncVerseToState();
    applyInk();
    resolveBg();

    pCanvas = document.getElementById('preview');
    pCtx = pCanvas.getContext('2d', { alpha: false });
    applyAspect();

    wire();
    renderBgGrid();
    renderVerseList();
    renderAnimSeg();
    renderColorSeg();
    renderAspectSeg();

    requestAnimationFrame(previewLoop);

    // cargar catálogo de videos del manifiesto (si existe) y refrescar la grilla
    loadManifest().then(() => { if (manifestVideos.length) renderBgGrid(); });

    try {
      await document.fonts.load("500 40px 'Cormorant Garamond'");
      await document.fonts.load("500 20px 'Jost'");
      await document.fonts.ready;
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
