/* =====================================================================
   flyer.js — Composición del flayer sobre canvas.
   renderFlyer(ctx, state, t, W, H) dibuja el cuadro completo en el
   tiempo t (segundos). La MISMA función alimenta la vista previa y la
   exportación, garantizando que el video sea idéntico a lo que se ve.
   ===================================================================== */
(function () {
  'use strict';

  const ACCENT = '#E9C98A';        // dorado reverente para cita/divisor/firma
  const BRAND = 'SABIDURÍA PARA EL CORAZÓN';

  function easeOutCubic(p) { return 1 - Math.pow(1 - p, 3); }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function splitWords(text) { return text.trim().split(/\s+/); }

  function wrapLines(ctx, words, maxWidth) {
    const lines = [];
    let cur = '';
    for (const w of words) {
      const test = cur ? cur + ' ' + w : w;
      if (ctx.measureText(test).width > maxWidth && cur) { lines.push(cur); cur = w; }
      else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  }

  function fitVerse(ctx, words, boxW, boxH, family, weight, maxSize, minSize) {
    let size = maxSize;
    while (size > minSize) {
      ctx.font = `${weight} ${size}px ${family}`;
      const lh = size * 1.3;
      const lines = wrapLines(ctx, words, boxW);
      if (lines.length * lh <= boxH && lines.every(l => ctx.measureText(l).width <= boxW)) {
        return { size, lh, lines };
      }
      size -= 2;
    }
    ctx.font = `${weight} ${minSize}px ${family}`;
    return { size: minSize, lh: minSize * 1.3, lines: wrapLines(ctx, words, boxW) };
  }

  function indexWords(lines) {
    const map = []; let wi = 0;
    for (const line of lines) {
      const ws = line.split(' ');
      map.push(ws.map(w => ({ w, i: wi++ })));
    }
    return { map, total: wi };
  }

  /* ---- Partículas flotantes (motas de luz) para que TODO se sienta vivo ---- */
  const moteCache = {};
  function getMotes(W, H) {
    const k = W + 'x' + H;
    if (moteCache[k]) return moteCache[k];
    let a = 1337 ^ (W * 31 + H);
    const rnd = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = (t + Math.imul(t ^ t >>> 7, 61 | t)) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const motes = [];
    for (let i = 0; i < 34; i++) {
      motes.push({ x: rnd(), r: (0.6 + rnd() * 2.6) * (W / 540), sp: 0.006 + rnd() * 0.02, ph: rnd(), drift: (rnd() - 0.5) * 0.04, a: 0.15 + rnd() * 0.4 });
    }
    moteCache[k] = motes; return motes;
  }
  function drawMotes(ctx, W, H, t) {
    const motes = getMotes(W, H);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const m of motes) {
      const prog = (m.ph + t * m.sp) % 1;
      const y = (1 - prog) * H;                  // suben lentamente
      const x = (m.x + Math.sin(t * 0.3 + m.ph * 6) * m.drift) * W;
      const tw = 0.5 + 0.5 * Math.sin(t * 1.5 + m.ph * 8);
      const a = m.a * tw * Math.sin(prog * Math.PI); // aparece y desaparece
      const g = ctx.createRadialGradient(x, y, 0, x, y, m.r * 4);
      g.addColorStop(0, `rgba(255,244,214,${a})`);
      g.addColorStop(1, 'rgba(255,244,214,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, m.r * 4, 0, 7); ctx.fill();
    }
    ctx.restore();
  }

  /* ---- Cálculo del estado de revelado por palabra según estilo ---- */
  function reveal(style, e, size, lineIdx) {
    let dx = 0, dy = 0, blur = 0, scale = 1, glow = 0, alpha = e;
    switch (style) {
      case 'ascenso':    dy = (1 - e) * size * 0.75; break;
      case 'desenfoque': blur = (1 - e) * 16; dy = (1 - e) * size * 0.15; break;
      case 'escala':     scale = 0.78 + 0.22 * e; dy = (1 - e) * size * 0.1; break;
      case 'deslizar':   dx = (1 - e) * size * 1.4 * (lineIdx % 2 ? -1 : 1); break;
      case 'resplandor': scale = 1 + (1 - e) * 0.05; glow = (1 - e); break;
      default:           dy = (1 - e) * size * 0.28; blur = (1 - e) * 6; // fundido
    }
    return { dx, dy, blur, scale, glow, alpha };
  }

  function renderFlyer(ctx, state, t, W, H) {
    const dur = state.duration || 5;
    const INK = state.ink || '#F6F3EA';

    // ---- Fondo ----
    if (state.bgPreset) {
      const cache = state.bgPreset.prepare(W, H);
      state.bgPreset.paint(ctx, W, H, t, cache);
    } else {
      ctx.fillStyle = '#06070e'; ctx.fillRect(0, 0, W, H);
    }

    // ---- Motas de luz flotantes (universal) ----
    drawMotes(ctx, W, H, t);

    // ---- Scrim para legibilidad ----
    const vg = ctx.createRadialGradient(W * 0.5, H * 0.44, H * 0.08, W * 0.5, H * 0.5, Math.max(W, H) * 0.7);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(2,3,8,0.5)');
    ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
    const lg = ctx.createLinearGradient(0, H * 0.42, 0, H);
    lg.addColorStop(0, 'rgba(2,3,8,0)'); lg.addColorStop(0.55, 'rgba(2,3,8,0.42)'); lg.addColorStop(1, 'rgba(2,3,8,0.8)');
    ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H);
    const tg = ctx.createLinearGradient(0, 0, 0, H * 0.3);
    tg.addColorStop(0, 'rgba(2,3,8,0.5)'); tg.addColorStop(1, 'rgba(2,3,8,0)');
    ctx.fillStyle = tg; ctx.fillRect(0, 0, W, H * 0.3);

    // ---- Marco hairline elegante ----
    const fadeFrame = clamp01((t - 0.2) / 0.8);
    if (fadeFrame > 0) {
      const m = W * 0.066;
      ctx.save();
      ctx.globalAlpha = fadeFrame * 0.5;
      ctx.strokeStyle = 'rgba(233,201,138,0.55)';
      ctx.lineWidth = Math.max(1, W * 0.0014);
      ctx.strokeRect(m, m, W - 2 * m, H - 2 * m);
      ctx.restore();
    }

    // ================= TIPOGRAFÍA =================
    const verseFamily = state.verseFont || "'Cormorant Garamond', Georgia, serif";
    const uiFamily = "'Jost', system-ui, sans-serif";
    const pad = W * 0.13;
    const boxW = W - pad * 2;
    const ratio = H / W;
    const verseMax = W * (ratio > 1.4 ? 0.084 : ratio > 1.1 ? 0.072 : 0.066);

    const words = splitWords(state.verse || '');
    const fit = fitVerse(ctx, words, boxW, H * 0.42, verseFamily, 500, verseMax, W * 0.044);
    const { map, total } = indexWords(fit.lines);

    const blockH = fit.lines.length * fit.lh;
    const startY = H * 0.45 - blockH / 2;

    const vIn = 0.45;
    const perWord = Math.min(0.16, (dur * 0.55) / Math.max(total, 1));
    const wordRevDur = 0.62;
    const style = state.animStyle || 'fundido';

    ctx.textBaseline = 'alphabetic';
    for (let li = 0; li < map.length; li++) {
      const lineWords = map[li];
      const lineStr = lineWords.map(o => o.w).join(' ');
      ctx.font = `500 ${fit.size}px ${verseFamily}`;
      const lineW = ctx.measureText(lineStr).width;
      let cursorX = W / 2 - lineW / 2;
      const baseY = startY + li * fit.lh + fit.size;
      const spaceW = ctx.measureText(' ').width;

      for (let k = 0; k < lineWords.length; k++) {
        const { w, i } = lineWords[k];
        const wordW = ctx.measureText(w).width;
        const appear = vIn + i * perWord;
        const p = clamp01((t - appear) / wordRevDur);
        if (p <= 0) { cursorX += wordW + spaceW; continue; }
        const e = easeOutCubic(p);
        const r = reveal(style, e, fit.size, li);

        ctx.save();
        ctx.globalAlpha = r.alpha;
        if (r.blur > 0.3 && 'filter' in ctx) ctx.filter = `blur(${r.blur}px)`;
        ctx.translate(cursorX + wordW / 2 + r.dx, baseY + r.dy);
        if (r.scale !== 1) ctx.scale(r.scale, r.scale);
        ctx.shadowColor = 'rgba(0,0,0,0.55)';
        ctx.shadowBlur = W * 0.012 + r.glow * W * 0.05;
        ctx.shadowOffsetY = W * 0.002;
        if (r.glow > 0.01) { ctx.shadowColor = 'rgba(255,238,200,0.9)'; }
        ctx.fillStyle = INK;
        ctx.textAlign = 'center';
        ctx.fillText(w, 0, 0);
        ctx.restore();
        cursorX += wordW + spaceW;
      }
    }

    // ---- Divisor + cita ----
    const refStart = vIn + total * perWord + 0.15;
    const refP = clamp01((t - refStart) / 0.7);
    const refE = easeOutCubic(refP);
    if (refP > 0) {
      const refY = startY + blockH + H * 0.05;
      ctx.save();
      ctx.globalAlpha = refE;
      ctx.strokeStyle = 'rgba(233,201,138,0.8)';
      ctx.lineWidth = Math.max(1, W * 0.0013);
      const half = W * 0.07 * refE;
      const ly = refY - H * 0.016;
      ctx.beginPath();
      ctx.moveTo(W / 2 - W * 0.085, ly); ctx.lineTo(W / 2 - W * 0.085 + half, ly);
      ctx.moveTo(W / 2 + W * 0.085, ly); ctx.lineTo(W / 2 + W * 0.085 - half, ly);
      ctx.stroke();
      ctx.fillStyle = ACCENT;
      ctx.save(); ctx.translate(W / 2, ly); ctx.rotate(Math.PI / 4);
      const d = W * 0.006; ctx.fillRect(-d, -d, 2 * d, 2 * d); ctx.restore();

      ctx.fillStyle = ACCENT;
      ctx.textAlign = 'center';
      const refSize = W * 0.036;
      ctx.font = `500 ${refSize}px ${uiFamily}`;
      if ('letterSpacing' in ctx) ctx.letterSpacing = `${W * 0.006}px`;
      ctx.fillText((state.ref || '').toUpperCase(), W / 2, refY + refSize * 0.9);
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      ctx.restore();
    }

    // ---- Firma fija del ministerio ----
    const brandP = clamp01((t - (refStart + 0.3)) / 0.7);
    if (brandP > 0) {
      ctx.save();
      ctx.globalAlpha = easeOutCubic(brandP) * 0.88;
      const by = H - W * 0.075;
      const bSize = W * 0.027;
      ctx.font = `400 ${bSize}px ${uiFamily}`;
      if ('letterSpacing' in ctx) ctx.letterSpacing = `${W * 0.006}px`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(233,201,138,0.85)';
      // estrellita decorativa
      ctx.fillText('✦  ' + BRAND + '  ✦', W / 2, by);
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
      ctx.restore();
    }
  }

  window.Flyer = { renderFlyer, ACCENT, BRAND };
})();
