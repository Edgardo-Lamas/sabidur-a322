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

  /* ---- defs: filtro de brillo para piezas ---- */
  function defs() {
    return `<defs>
      <filter id="glow-piece" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>`;
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

  /* ===================== PIEZAS PNG (overlays animados) =====================
     Cada pieza es un <image> SVG posicionado sobre el héroe.
     Coordenadas para viewBox 440×700, héroe en x=20 y=0 w=400 h=700.
     ===================================================================== */

  function piece(id, inner) {
    return `<g class="piece" data-piece="${id}" data-on="0" filter="url(#glow-piece)">${inner}</g>`;
  }

  function pieceCinturon() {
    return piece('cinturon',
      `<image href="${IMG}cinturon.png" x="60" y="210" width="300" height="300"
              preserveAspectRatio="xMidYMid meet"/>`
    );
  }

  function pieceCoraza() {
    return piece('coraza',
      `<image href="${IMG}coraza.png" x="95" y="130" width="250" height="220"
              preserveAspectRatio="xMidYMid meet"/>`
    );
  }

  function pieceCalzado() {
    return piece('calzado',
      `<image href="${IMG}calzado.png" x="105" y="440" width="230" height="250"
              preserveAspectRatio="xMidYMid meet"/>`
    );
  }

  function pieceEscudo() {
    return piece('escudo',
      `<image href="${IMG}escudo.png" x="-10" y="195" width="185" height="185"
              preserveAspectRatio="xMidYMid meet"/>`
    );
  }

  function pieceYelmo() {
    return piece('yelmo',
      `<image href="${IMG}yelmo.png" x="115" y="-15" width="210" height="185"
              preserveAspectRatio="xMidYMid meet"/>`
    );
  }

  function pieceEspada() {
    return piece('espada',
      `<image href="${IMG}espada.png" x="295" y="100" width="110" height="310"
              preserveAspectRatio="xMidYMid meet"/>`
    );
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
    svg += styleBlock();
    svg += baseBody();
    // Solo superpone foto si el usuario subió una en el retrato final
    if (face && face.type === 'photo' && face.src) svg += faceGroup(face);
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
