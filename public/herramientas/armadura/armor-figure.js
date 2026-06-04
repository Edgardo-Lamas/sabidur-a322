/* =====================================================================
   armor-figure.js — Figura del guerrero con arte FLUX.
   Hero base = PNG transparente. Piezas = overlays SVG animados.
   Para el retrato final (canvas) usa drawImage con los PNGs reales.
   ===================================================================== */
(function () {
  'use strict';

  const VB_W = 440, VB_H = 700;

  /* Ruta base de los assets del guerrero */
  const IMG = '/img/armadura/';

  /* ---- helpers de color ---- */
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    r = Math.max(0, Math.min(255, r + amt));
    g = Math.max(0, Math.min(255, g + amt));
    b = Math.max(0, Math.min(255, b + amt));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function P(id) { return window.ARMOR.find(a => a.id === id); }

  /* ---- defs: gradientes por pieza ---- */
  function defs() {
    let g = '<defs>';
    for (const a of window.ARMOR) {
      g += `<linearGradient id="grad-${a.id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${a.glow}"/>
        <stop offset="0.5" stop-color="${a.accent}"/>
        <stop offset="1" stop-color="${shade(a.accent, -70)}"/>
      </linearGradient>
      <radialGradient id="rg-${a.id}" cx="0.5" cy="0.4" r="0.7">
        <stop offset="0" stop-color="${a.glow}" stop-opacity="0.9"/>
        <stop offset="0.5" stop-color="${a.accent}" stop-opacity="0.5"/>
        <stop offset="1" stop-color="${a.accent}" stop-opacity="0"/>
      </radialGradient>`;
    }
    g += `<linearGradient id="grad-espada-glow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff8dc"/><stop offset="1" stop-color="#E9C98A"/>
    </linearGradient>`;
    g += '</defs>';
    return g;
  }

  /* ---- Hero base: PNG con fondo transparente ---- */
  function baseBody() {
    return `<image href="${IMG}heroe.png"
              x="20" y="0" width="400" height="700"
              preserveAspectRatio="xMidYMid meet"/>`;
  }

  /* ---- Overlay de foto (retrato final solamente) ---- */
  function faceMarkup(face) {
    if (!face || face.type !== 'photo' || !face.src) return '';
    const cx = 220, cy = 116, rx = 47, ry = 55;
    return `<image href="${face.src}"
               x="${cx - rx - 12}" y="${cy - ry - 14}"
               width="${(rx + 12) * 2}" height="${(ry + 18) * 2}"
               preserveAspectRatio="xMidYMid slice"
               clip-path="url(#faceClip)"/>`;
  }

  function faceGroup(face) {
    const markup = faceMarkup(face);
    if (!markup) return '';
    return `<g id="face">${markup}</g>`;
  }

  /* ===================== PIEZAS SVG (overlays animados) ===================== */

  function piece(id, inner) {
    return `<g class="piece" data-piece="${id}" data-on="0">${inner}</g>`;
  }

  function pieceCinturon() {
    const a = P('cinturon');
    return piece('cinturon', `
      <ellipse cx="220" cy="352" rx="86" ry="34" fill="url(#rg-cinturon)" opacity="0.28"/>
      <path d="M180,360 L260,360 L256,418 C256,424 250,428 244,428 L196,428 C190,428 184,424 184,418 Z"
            fill="url(#grad-cinturon)" stroke="${shade(a.accent, 30)}" stroke-width="1.3" opacity="0.92"/>
      <path d="M210,362 L210,426 M230,362 L230,426 M196,362 L196,420 M244,362 L244,420"
            stroke="${shade(a.accent, -50)}" stroke-width="1.4" opacity="0.5"/>
      <path d="M164,338 L276,338 C280,338 282,341 282,345 L282,361 C282,365 280,368 276,368 L164,368 C160,368 158,365 158,361 L158,345 C158,341 160,338 164,338 Z"
            fill="url(#grad-cinturon)" stroke="${shade(a.accent, 40)}" stroke-width="1.5"/>
      <rect x="206" y="338" width="28" height="30" rx="5" fill="${shade(a.accent, 50)}" stroke="${shade(a.accent, -40)}" stroke-width="1.5"/>
      <path d="M220,344 L220,362 M214,353 L226,353" stroke="${shade(a.accent, -60)}" stroke-width="2.4" stroke-linecap="round"/>
    `);
  }

  function pieceCoraza() {
    const a = P('coraza');
    return piece('coraza', `
      <ellipse cx="220" cy="262" rx="92" ry="86" fill="url(#rg-coraza)" opacity="0.28"/>
      <path d="M168,206 C168,196 184,188 196,187 L244,187 C256,188 272,196 272,206
               L266,318 C264,336 250,346 234,348 L206,348 C190,346 176,336 174,318 Z"
            fill="url(#grad-coraza)" stroke="${shade(a.accent, 50)}" stroke-width="2"/>
      <path d="M220,196 L220,344" stroke="${shade(a.accent, -40)}" stroke-width="2" opacity="0.6"/>
      <path d="M196,214 C206,232 206,250 200,268 M244,214 C234,232 234,250 240,268"
            fill="none" stroke="${a.glow}" stroke-width="2" opacity="0.7"/>
      <path d="M220,250 L220,286 M206,264 L234,264" stroke="${a.glow}" stroke-width="4.5" stroke-linecap="round" opacity="0.95"/>
      <path d="M150,206 C150,190 172,182 188,186 C176,196 170,206 168,220 C160,210 154,206 150,206 Z"
            fill="url(#grad-coraza)" stroke="${shade(a.accent, 40)}" stroke-width="1.5"/>
      <path d="M290,206 C290,190 268,182 252,186 C264,196 270,206 272,220 C280,210 286,206 290,206 Z"
            fill="url(#grad-coraza)" stroke="${shade(a.accent, 40)}" stroke-width="1.5"/>
    `);
  }

  function pieceCalzado() {
    const a = P('calzado');
    return piece('calzado', `
      <ellipse cx="220" cy="600" rx="100" ry="56" fill="url(#rg-calzado)" opacity="0.25"/>
      ${greave(180, 216)}
      ${greave(224, 260)}
    `);
    function greave(x0, x1) {
      const mid = (x0 + x1) / 2;
      return `<path d="M${x0},492 L${x1},492 L${x1 + 2},614 L${x0 - 2},614 Z"
                 fill="url(#grad-calzado)" stroke="${shade(a.accent, 40)}" stroke-width="1.5"/>
              <path d="M${x0 - 4},614 L${x1 + 4},614 L${x1 + 14},650 C${x1 + 14},656 ${x1 + 8},660 ${x1},660 L${x0 - 6},660 C${x0 - 12},660 ${x0 - 12},652 ${x0 - 8},644 Z"
                 fill="url(#grad-calzado)" stroke="${shade(a.accent, 40)}" stroke-width="1.5"/>
              <path d="M${mid},500 L${mid},606" stroke="${a.glow}" stroke-width="1.6" opacity="0.55"/>
              <path d="M${x0 + 3},520 L${x1 - 3},520" stroke="${shade(a.accent, -40)}" stroke-width="1.4" opacity="0.4"/>`;
    }
  }

  function pieceEscudo() {
    const a = P('escudo');
    const cx = 112, cy = 330, r = 88;
    return piece('escudo', `
      <ellipse cx="${cx}" cy="${cy}" rx="${r + 16}" ry="${r + 16}" fill="url(#rg-escudo)" opacity="0.3"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#grad-escudo)" stroke="${shade(a.accent, 50)}" stroke-width="3"/>
      <circle cx="${cx}" cy="${cy}" r="${r - 14}" fill="none" stroke="${shade(a.accent, -40)}" stroke-width="2" opacity="0.7"/>
      <circle cx="${cx}" cy="${cy}" r="${r - 30}" fill="none" stroke="${a.glow}" stroke-width="1.6" opacity="0.6"/>
      <path d="M${cx},${cy - 44} L${cx},${cy + 44} M${cx - 44},${cy} L${cx + 44},${cy}" stroke="${a.glow}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="9" fill="${a.glow}"/>
    `);
  }

  function pieceYelmo() {
    const a = P('yelmo');
    const cx = 220, cy = 116;
    return piece('yelmo', `
      <ellipse cx="${cx}" cy="${cy - 4}" rx="80" ry="86" fill="url(#rg-yelmo)" opacity="0.25"/>
      <path d="M${cx + 6},${cy - 70}
               C${cx + 30},${cy - 120} ${cx + 70},${cy - 132} ${cx + 92},${cy - 120}
               C${cx + 70},${cy - 110} ${cx + 58},${cy - 86} ${cx + 56},${cy - 58}
               C${cx + 48},${cy - 78} ${cx + 30},${cy - 86} ${cx + 6},${cy - 70} Z"
            fill="url(#grad-espada-glow)" stroke="${shade('#E9C98A', 30)}" stroke-width="1.2" opacity="0.9"/>
      <path d="M${cx - 56},${cy - 6} C${cx - 56},${cy - 78} ${cx + 56},${cy - 78} ${cx + 56},${cy - 6}
               C${cx + 40},${cy - 18} ${cx - 40},${cy - 18} ${cx - 56},${cy - 6} Z"
            fill="url(#grad-yelmo)" stroke="${shade(a.accent, -30)}" stroke-width="2"/>
      <path d="M${cx - 56},${cy - 8} C${cx - 60},${cy + 30} ${cx - 52},${cy + 52} ${cx - 44},${cy + 60}
               L${cx - 40},${cy + 30} C${cx - 44},${cy + 8} ${cx - 50},${cy - 4} ${cx - 56},${cy - 8} Z"
            fill="url(#grad-yelmo)" stroke="${shade(a.accent, -30)}" stroke-width="1.5"/>
      <path d="M${cx + 56},${cy - 8} C${cx + 60},${cy + 30} ${cx + 52},${cy + 52} ${cx + 44},${cy + 60}
               L${cx + 40},${cy + 30} C${cx + 44},${cy + 8} ${cx + 50},${cy - 4} ${cx + 56},${cy - 8} Z"
            fill="url(#grad-yelmo)" stroke="${shade(a.accent, -30)}" stroke-width="1.5"/>
      <path d="M${cx - 56},${cy - 6} C${cx - 40},${cy - 18} ${cx + 40},${cy - 18} ${cx + 56},${cy - 6}" fill="none" stroke="${a.glow}" stroke-width="2.5" opacity="0.8"/>
      <rect x="${cx - 4}" y="${cy - 80}" width="14" height="16" rx="4" fill="${shade(a.accent, -10)}" stroke="${shade(a.accent, -40)}" stroke-width="1"/>
    `);
  }

  function pieceEspada() {
    const a = P('espada');
    const hx = 322, hy = 372, tipY = 96;
    return piece('espada', `
      <ellipse cx="${hx + 8}" cy="${(hy + tipY) / 2}" rx="28" ry="${(hy - tipY) / 2 + 14}" fill="url(#rg-espada)" opacity="0.25"/>
      <path d="M${hx + 2},${hy - 34} L${hx + 14},${tipY} L${hx + 26},${hy - 34} Z"
            fill="url(#grad-espada)" stroke="${shade(a.accent, 30)}" stroke-width="1.5"/>
      <path d="M${hx + 14},${tipY + 6} L${hx + 14},${hy - 36}" stroke="#fffef5" stroke-width="2" opacity="0.85"/>
      <path d="M${hx - 16},${hy - 30} L${hx + 44},${hy - 30} L${hx + 40},${hy - 22} L${hx - 12},${hy - 22} Z"
            fill="${shade(a.accent, -20)}" stroke="${shade(a.accent, 30)}" stroke-width="1.2"/>
      <rect x="${hx + 8}" y="${hy - 22}" width="12" height="30" rx="4" fill="${shade(a.accent, -40)}"/>
      <circle cx="${hx + 14}" cy="${hy + 12}" r="8" fill="url(#grad-espada)" stroke="${shade(a.accent, -30)}" stroke-width="1.2"/>
    `);
  }

  /* ===================== ENSAMBLE SVG ===================== */

  function allPieces() {
    return pieceCalzado() + pieceCoraza() + pieceCinturon() + pieceYelmo() + pieceEscudo() + pieceEspada();
  }

  function styleBlock() {
    return `<style>
      .piece{opacity:0;transform:scale(.84);transform-box:fill-box;transform-origin:center;
             transition:opacity .55s ease, transform .65s cubic-bezier(.2,.85,.25,1);}
      .piece[data-on="1"]{opacity:1;transform:scale(1);}
    </style>`;
  }

  function buildSVGString(opts) {
    opts = opts || {};
    const equipped = opts.equipped;
    const face = opts.face;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}" width="${VB_W}" height="${VB_H}">`;
    svg += defs();
    svg += `<clipPath id="faceClip"><ellipse cx="220" cy="116" rx="47" ry="55"/></clipPath>`;
    svg += styleBlock();
    svg += baseBody();
    svg += faceGroup(face);
    svg += allPieces();
    svg = setEquippedInString(svg, equipped);
    svg += '</svg>';
    return svg;
  }

  function setEquippedInString(svg, equipped) {
    if (equipped === 'all') return svg.replace(/data-on="0"/g, 'data-on="1"');
    if (equipped instanceof Set) {
      for (const id of equipped) {
        svg = svg.replace(`data-piece="${id}" data-on="0"`, `data-piece="${id}" data-on="1"`);
      }
    }
    return svg;
  }

  /* ===================== RETRATO FINAL (canvas con PNGs reales) ===================== */

  /* Posiciones de cada pieza sobre el héroe:
     [cx como fracción de figW, cy como fracción de figH, ancho como fracción de figW, alto como fracción de figH]
     cx/cy son el CENTRO de la pieza relativo a la esquina superior-izquierda del héroe. */
  const PIECE_CANVAS_POS = {
    yelmo:    [0.50,  0.09,  0.90,  0.22],
    coraza:   [0.50,  0.34,  1.15,  0.38],
    cinturon: [0.50,  0.49,  1.00,  0.15],
    calzado:  [0.50,  0.84,  1.10,  0.32],
    escudo:   [-0.16, 0.44,  0.72,  0.72],
    espada:   [1.16,  0.40,  0.58,  0.68],
  };

  function loadImg(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  async function renderFinal(ctx, W, H, state) {
    // 1. Fondo cósmico
    if (state.bgPreset) {
      const cache = state.bgPreset.prepare(W, H);
      state.bgPreset.paint(ctx, W, H, state.t || 3, cache);
    } else { ctx.fillStyle = '#06070e'; ctx.fillRect(0, 0, W, H); }

    // 2. Velo de legibilidad
    const lg = ctx.createLinearGradient(0, 0, 0, H);
    lg.addColorStop(0, 'rgba(2,3,8,0.55)'); lg.addColorStop(0.32, 'rgba(2,3,8,0.12)');
    lg.addColorStop(0.72, 'rgba(2,3,8,0.25)'); lg.addColorStop(1, 'rgba(2,3,8,0.85)');
    ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H);
    const vg = ctx.createRadialGradient(W / 2, H * 0.46, H * 0.1, W / 2, H * 0.5, H * 0.7);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(2,3,8,0.5)');
    ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);

    // 3. Marco dorado
    const m = W * 0.05;
    ctx.strokeStyle = 'rgba(233,201,138,0.5)'; ctx.lineWidth = Math.max(1, W * 0.0022);
    ctx.strokeRect(m, m, W - 2 * m, H - 2 * m);

    // 4. Título
    ctx.textAlign = 'center';
    ctx.fillStyle = '#E9C98A';
    ctx.font = `500 ${W * 0.05}px 'Jost', sans-serif`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${W * 0.012}px`;
    ctx.fillText('LA ARMADURA DE DIOS', W / 2, H * 0.12);
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';

    // 5. Figura: héroe PNG + piezas PNG
    const figH = H * 0.65;
    const figW = figH * (1080 / 1920);  // proporción real del héroe (9:16)
    const figX = (W - figW) / 2;
    const figY = H * 0.14;

    // Héroe base
    const heroImg = await loadImg(IMG + 'heroe.png');
    if (heroImg) {
      ctx.save();
      ctx.shadowColor = 'rgba(233,201,138,0.35)'; ctx.shadowBlur = W * 0.05;
      ctx.drawImage(heroImg, figX, figY, figW, figH);
      ctx.restore();
    }

    // Overlay de foto si existe
    if (state.face && state.face.type === 'photo' && state.face.src) {
      const faceImg = await loadImg(state.face.src);
      if (faceImg) {
        // posición aproximada del rostro: centro-superior del héroe
        const fw = figW * 0.42, fh = fw;
        const fx = figX + (figW - fw) / 2;
        const fy = figY + figH * 0.01;
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(fx + fw / 2, fy + fh * 0.52, fw * 0.45, fh * 0.52, 0, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(faceImg, fx, fy, fw, fh);
        ctx.restore();
      }
    }

    // Piezas equipadas
    const equippedIds = state.equipped === 'all'
      ? ['cinturon','coraza','calzado','escudo','yelmo','espada']
      : [...(state.equipped || [])];

    for (const id of equippedIds) {
      const pos = PIECE_CANVAS_POS[id];
      if (!pos) continue;
      const [cx, cy, pw, ph] = pos;
      const pImg = await loadImg(IMG + id + '.png');
      if (!pImg) continue;
      const pW = figW * pw, pH = figH * ph;
      const pX = figX + figW * cx - pW / 2;
      const pY = figY + figH * cy - pH / 2;
      ctx.save();
      ctx.shadowColor = 'rgba(233,201,138,0.4)'; ctx.shadowBlur = W * 0.03;
      ctx.drawImage(pImg, pX, pY, pW, pH);
      ctx.restore();
    }

    // 6. Textos finales
    const by = H * 0.83;
    ctx.fillStyle = '#F6F3EA';
    ctx.font = `600 ${W * 0.058}px 'Cormorant Garamond', serif`;
    ctx.fillText('✦ ' + window.ARMOR_FINAL.badge + ' ✦', W / 2, by);
    ctx.fillStyle = 'rgba(246,243,234,0.92)';
    ctx.font = `italic 500 ${W * 0.038}px 'Cormorant Garamond', serif`;
    wrapText(ctx, '«' + window.ARMOR_FINAL.verse + '»', W / 2, by + H * 0.05, W * 0.78, W * 0.05);
    ctx.fillStyle = '#E9C98A';
    ctx.font = `500 ${W * 0.03}px 'Jost', sans-serif`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${W * 0.006}px`;
    ctx.fillText(window.ARMOR_FINAL.ref.toUpperCase(), W / 2, by + H * 0.115);
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    ctx.fillStyle = 'rgba(233,201,138,0.8)';
    ctx.font = `400 ${W * 0.026}px 'Jost', sans-serif`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${W * 0.005}px`;
    ctx.fillText('SABIDURÍA PARA EL CORAZÓN', W / 2, H - m - H * 0.018);
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
  }

  function wrapText(ctx, text, x, y, maxW, lh) {
    const words = text.split(' '); let line = ''; const lines = [];
    for (const w of words) {
      const t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
    }
    if (line) lines.push(line);
    const startY = y - (lines.length - 1) * lh / 2;
    lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lh));
  }

  window.ArmorFigure = { buildSVGString, faceMarkup, faceGroup, renderFinal, VB_W, VB_H };
})();
