/* =====================================================================
   armor-figure.js — Figura del guerrero con arte FLUX.
   Hero base = PNG transparente. Piezas = overlays SVG animados.
   Para el retrato final (canvas) usa drawImage con los PNGs reales.
   ===================================================================== */
(function () {
  'use strict';

  const VB_W = 440, VB_H = 780;

  /* Ruta base de los assets del guerrero */
  const IMG = '/img/armadura/';

  /* ===================== GEOMETRÍA — ÚNICA FUENTE DE VERDAD =====================
     Caja de cada pieza en coordenadas del viewBox (440×780). De acá salen TANTO
     los <image> del SVG COMO las posiciones del retrato en canvas: si se tocan
     acá, las dos vistas se mueven juntas. Antes eran dos tablas separadas y se
     desincronizaron (el retrato dibujaba el yelmo aplastado y el escudo afuera).

     El héroe es un PNG 1080×1920 con la figura de la coronilla (py 56) a los pies
     (py 1907); las cajas están calibradas contra ESA anatomía. Si se reemplaza el
     arte del héroe hay que reencuadrarlo a ese mismo lienzo, no recalibrar las 7. */
  const AR_HEROE = 1080 / 1920;
  const AR_BOTA  = 408 / 589;   // calzado-l.png / calzado-r.png
  const AR_CUAD  = 1;           // el resto de los assets son 1024×1024

  const CAJA_HEROE = { x: 20, y: 0, w: 400, h: 780 };

  const CAJA = {
    coraza:   { x: 65,    y: 100,   w: 310,   h: 280   },
    cinturon: { x: 75,    y: 282,   w: 290,   h: 132   },
    // Escudo redondo embrazado: el disco ocupa el 70% del PNG, así que la caja va
    // más grande que el escudo visible. Centrado sobre el antebrazo izquierdo.
    escudo:   { x: 8.4,   y: 242,   w: 227.6, h: 227.6 },
    // El arte del yelmo está en tres cuartos y el penacho vuela a la izquierda: la
    // cúpula NO está centrada en su PNG (va de x=390 a x=700 de 1024). La caja se
    // calcula para que esa cúpula tape la cabeza y el halo entre entero arriba.
    yelmo:    { x: 72.4,  y: -38.3, w: 281,   h: 281   },
    // La caja DEBE ser cuadrada: el PNG es 1:1 y con meet una caja rectangular
    // (antes 110×310) encogía la espada al lado corto y la dejaba diminuta.
    // La empuñadura cae al 78% del alto del arte → queda en la mano derecha.
    espada:   { x: 130.4, y: 96.1,  w: 400,   h: 400   },
    // Una bota por pie, la izquierda es el espejo de la derecha. La caja se ancla
    // por la SUELA, no por el centro: la base del arte (97,7% de su alto) tiene que
    // caer en el piso del héroe (vy 744, sus pies llegan a vy 741,5). Antes la caja
    // era de 119×172 y la bota salía ~2,4 veces más grande que el pie: sobresalía
    // por todos lados y el pie descalzo asomaba por detrás del talón derecho, así que
    // se leía como una calcomanía encima del guerrero y no como calzado puesto.
    // El ancho 102 es el máximo que deja la pantorrilla cubierta sin que la suela se
    // desborde del pie; la x de cada una está corrida hacia adentro respecto del eje
    // de la caña porque el arte abre la punta más de lo que la abre el héroe.
    calzadoL: { x: 100,   y: 597.8, w: 102,   h: 147.25 },
    calzadoR: { x: 249,   y: 597.8, w: 102,   h: 147.25 },
  };

  /* El cinturón se dibuja con "slice" (llena la caja y desborda) y después se
     recorta a esta ventana: así se ve la parte central del arte en grande, del
     ancho de la cintura. Con "meet" saldría un cinturón chico y flotando. */
  const RECORTE_CINTURON = { x: 148, y: 318, w: 144, h: 74 };

  /* Dónde aterriza de verdad un <image> dentro de su caja según preserveAspectRatio:
     "meet"  → se achica al lado que ajusta y queda centrada (sobra aire);
     "slice" → se agranda hasta cubrir la caja y desborda (hay que recortar). */
  function encajar(caja, ar, ajuste) {
    const arCaja = caja.w / caja.h;
    const porAncho = ajuste === 'slice' ? ar < arCaja : ar > arCaja;
    const w = porAncho ? caja.w : caja.h * ar;
    const h = porAncho ? caja.w / ar : caja.h;
    return { x: caja.x + (caja.w - w) / 2, y: caja.y + (caja.h - h) / 2, w, h };
  }

  /* Rectángulo real que ocupa el héroe en el viewBox: x 20→420, y 34.4→745.6 */
  const HEROE = encajar(CAJA_HEROE, AR_HEROE, 'meet');

  /* Traduce una caja del viewBox a las fracciones que usa el retrato en canvas:
     [cx, cy, ancho, alto] relativos al rectángulo del héroe. */
  function aCanvas(caja, ar, ajuste) {
    const r = encajar(caja, ar, ajuste || 'meet');
    return [(r.x + r.w / 2 - HEROE.x) / HEROE.w,
            (r.y + r.h / 2 - HEROE.y) / HEROE.h,
            r.w / HEROE.w,
            r.h / HEROE.h];
  }

  /* Igual que aCanvas pero devuelve la esquina, no el centro: para ventanas de recorte. */
  function recorteACanvas(caja) {
    return [(caja.x - HEROE.x) / HEROE.w, (caja.y - HEROE.y) / HEROE.h,
            caja.w / HEROE.w, caja.h / HEROE.h];
  }

  const attrs = (caja) => `x="${caja.x}" y="${caja.y}" width="${caja.w}" height="${caja.h}"`;

  /* ---- defs: filtro de brillo para piezas ---- */
  function defs() {
    return `<defs>
      <filter id="glow-piece" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <clipPath id="clip-cinturon">
        <rect ${attrs(RECORTE_CINTURON)} rx="4"/>
      </clipPath>
    </defs>`;
  }

  /* ---- Hero base: PNG con fondo transparente ---- */
  function baseBody() {
    return `<image href="${IMG}heroe.png" ${attrs(CAJA_HEROE)}
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
      `<image href="${IMG}cinturon.png" ${attrs(CAJA.cinturon)}
              preserveAspectRatio="xMidYMid slice" clip-path="url(#clip-cinturon)"/>`
    );
  }

  function pieceCoraza() {
    return piece('coraza',
      `<image href="${IMG}coraza.png" ${attrs(CAJA.coraza)}
              preserveAspectRatio="xMidYMid meet"/>`
    );
  }

  function pieceCalzado() {
    // El arte original (calzado.png) venía como un par de botas en perspectiva
    // diagonal (foto de producto): imposible de calzar sobre dos pies rectos.
    // Se aisló UNA bota completa (con la puntera entera) del original y se la
    // coloca sobre cada pie a nivel del piso, en pose simétrica: la izquierda es
    // el espejo de la derecha (calzado-l.png = espejo de calzado-r.png).
    return piece('calzado',
      `<image href="${IMG}calzado-l.png" ${attrs(CAJA.calzadoL)}
              preserveAspectRatio="xMidYMid meet"/>` +
      `<image href="${IMG}calzado-r.png" ${attrs(CAJA.calzadoR)}
              preserveAspectRatio="xMidYMid meet"/>`
    );
  }

  function pieceEscudo() {
    return piece('escudo',
      `<image href="${IMG}escudo.png" ${attrs(CAJA.escudo)}
              preserveAspectRatio="xMidYMid meet"/>`
    );
  }

  function pieceYelmo() {
    return piece('yelmo',
      `<image href="${IMG}yelmo.png" ${attrs(CAJA.yelmo)}
              preserveAspectRatio="xMidYMid meet"/>`
    );
  }

  function pieceEspada() {
    return piece('espada',
      `<image href="${IMG}espada.png" ${attrs(CAJA.espada)}
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
     cx/cy son el CENTRO de la pieza relativo a la esquina superior-izquierda del héroe.
     NO tocar a mano: salen de CAJA, la misma geometría con la que se arma el SVG. */
  const PIECE_CANVAS_POS = {
    yelmo:    aCanvas(CAJA.yelmo,    AR_CUAD),
    coraza:   aCanvas(CAJA.coraza,   AR_CUAD),
    cinturon: aCanvas(CAJA.cinturon, AR_CUAD, 'slice'),
    escudo:   aCanvas(CAJA.escudo,   AR_CUAD),
    espada:   aCanvas(CAJA.espada,   AR_CUAD),
  };

  /* Ventanas de recorte del retrato, en fracciones [x, y, ancho, alto] del héroe.
     Equivalen a los <clipPath> del SVG. */
  const PIECE_CANVAS_CLIP = {
    cinturon: recorteACanvas(RECORTE_CINTURON),
  };

  /* El calzado son DOS botas (una por pie), no una sola pieza. */
  const CALZADO_CANVAS_POS = {
    l: aCanvas(CAJA.calzadoL, AR_BOTA),
    r: aCanvas(CAJA.calzadoR, AR_BOTA),
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
    // El halo del yelmo asoma por encima de la cabeza del héroe, así que la figura
    // va un poco más abajo y más chica que el 0.65/0.14 original: si no, el halo
    // se cruza con el título.
    const figH = H * 0.625;
    const figW = figH * AR_HEROE;  // proporción real del héroe (9:16)
    const figX = (W - figW) / 2;
    const figY = H * 0.165;

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
      // El calzado se dibuja como dos botas separadas, una sobre cada pie
      // (mismo criterio que la figura SVG), no como el par diagonal original.
      const specs = id === 'calzado'
        ? [['calzado-l', CALZADO_CANVAS_POS.l], ['calzado-r', CALZADO_CANVAS_POS.r]]
        : (PIECE_CANVAS_POS[id] ? [[id, PIECE_CANVAS_POS[id]]] : []);
      for (const [file, pos] of specs) {
        const [cx, cy, pw, ph] = pos;
        const pImg = await loadImg(IMG + file + '.png');
        if (!pImg) continue;
        const pW = figW * pw, pH = figH * ph;
        const pX = figX + figW * cx - pW / 2;
        const pY = figY + figH * cy - pH / 2;
        ctx.save();
        // Mismo recorte que el <clipPath> del SVG (hoy solo el cinturón)
        const rec = PIECE_CANVAS_CLIP[id];
        if (rec) {
          ctx.beginPath();
          ctx.rect(figX + figW * rec[0], figY + figH * rec[1], figW * rec[2], figH * rec[3]);
          ctx.clip();
        }
        ctx.shadowColor = 'rgba(233,201,138,0.4)'; ctx.shadowBlur = W * 0.03;
        ctx.drawImage(pImg, pX, pY, pW, pH);
        ctx.restore();
      }
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
