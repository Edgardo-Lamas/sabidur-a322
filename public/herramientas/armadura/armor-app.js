/* =====================================================================
   armor-app.js — Flujo de la experiencia "La Armadura de Dios".
   Pantallas: intro → equipar (6 piezas) → retrato final (fondo + rostro).
   ===================================================================== */
(function () {
  'use strict';

  const ASPECTS = [
    { id: '9-16', name: '9:16', w: 1080, h: 1920 },
    { id: '4-5', name: '4:5', w: 1080, h: 1350 }
  ];

  const state = {
    equipped: new Set(),
    selected: null,
    // Rostro del jugador: 'none' o 'photo'. Con foto: { img, ajuste (de la
    // detección automática), zoom, dx, dy (ajuste a mano, en px del héroe) }.
    face: { type: 'none' },
    fotoCara: null,   // la foto elegida se conserva aunque se pase a "Sin foto"
    bgId: 'vialactea', bgPreset: null,
    aspect: '9-16'
  };

  let svgEl = null, faceInner = null;

  // ---------------- pantallas ----------------
  function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
    document.getElementById('progress').classList.toggle('hidden', id === 'screen-intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---------------- intro ----------------
  function fillIntro() {
    document.getElementById('introRef').textContent = window.ARMOR_INTRO.ref;
    document.getElementById('introTitle').textContent = window.ARMOR_INTRO.title;
    document.getElementById('introVerse').textContent = '«' + window.ARMOR_INTRO.verse + '»';
  }

  // ---------------- figura ----------------
  const precargaArmado = new Image();
  precargaArmado.src = '/img/armadura/heroe-armado.png';

  function buildFigure() {
    const host = document.getElementById('figureHost');
    host.innerHTML = window.ArmorFigure.buildSVGString({ equipped: new Set(), face: state.face });
    svgEl = host.querySelector('svg');
    faceInner = svgEl.querySelector('#faceInner');
  }
  function updateFace() {
    if (faceInner) faceInner.innerHTML = window.ArmorFigure.faceMarkup(state.face);
    // preview del rostro en el panel final
    const prev = document.getElementById('facePrev');
    if (prev) {
      if (state.face.type === 'photo' && state.face.src) {
        prev.innerHTML = `<img src="${state.face.src}" alt="" />`;
      }
    }
  }
  function equipPiece(id) {
    // (obsoleto) — el equipado ahora pasa por equipWithReveal tras superar el desafío
    state.equipped.add(id);
    const g = svgEl.querySelector(`[data-piece="${id}"]`);
    if (g) g.setAttribute('data-on', '1');
  }

  // ---------------- progreso ----------------
  function renderProgress() {
    const p = document.getElementById('progress');
    p.innerHTML = '';
    window.ARMOR.forEach(a => {
      const d = document.createElement('span');
      d.className = 'pdot' + (state.equipped.has(a.id) ? ' on' : '');
      p.appendChild(d);
    });
    const lbl = document.createElement('span');
    lbl.className = 'label';
    lbl.textContent = state.equipped.size + ' de 6 piezas';
    p.appendChild(lbl);
  }

  // ---------------- detalle de pieza ----------------
  function showDetail(a) {
    document.getElementById('detailPlaceholder').classList.add('hidden');
    document.getElementById('detailContent').classList.remove('hidden');
    const sw = document.getElementById('dSwatch');
    sw.style.background = a.accent; sw.style.color = a.accent;
    document.getElementById('dPname').textContent = a.short;
    document.getElementById('dName').textContent = a.name;
    document.getElementById('dVerse').textContent = '«' + a.verse + '»';
    document.getElementById('dRef').textContent = a.ref;
    document.getElementById('dRefl').textContent = a.reflection;
  }

  // ---------------- chips ----------------
  function renderChips() {
    const wrap = document.getElementById('chips');
    wrap.innerHTML = '';
    window.ARMOR.forEach((a, i) => {
      const isEq = state.equipped.has(a.id);
      const c = document.createElement('div');
      c.className = 'chip' + (isEq ? ' equipped' : ' locked') + (state.selected === a.id ? ' sel' : '');
      const dot = document.createElement('div'); dot.className = 'dot';
      dot.style.color = a.accent; dot.textContent = isEq ? (i + 1) : '🔒';
      const nm = document.createElement('div'); nm.className = 'cn'; nm.textContent = a.short;
      const chk = document.createElement('div'); chk.className = 'check'; chk.textContent = '✓';
      c.appendChild(chk); c.appendChild(dot); c.appendChild(nm);
      c.onclick = () => pick(a.id);
      wrap.appendChild(c);
    });
  }

  function pick(id) {
    const a = window.ARMOR.find(x => x.id === id);
    state.selected = id;
    // ya equipada: solo muestra su detalle
    if (state.equipped.has(id)) {
      showDetail(a);
      renderChips();
      return;
    }
    // bloqueada: abre el DESAFÍO para ganarla
    openChallenge(a);
  }

  // ---------------- desafío (desbloqueo de pieza) ----------------
  let activeCtx = null;
  function openChallenge(a) {
    const ov = document.getElementById('challengeOverlay');
    document.getElementById('chTitle').textContent = a.name;
    document.getElementById('chShort').textContent = a.short;
    const sw = document.getElementById('chSwatch');
    sw.style.background = a.accent; sw.style.color = a.accent;
    ov.style.setProperty('--ch-accent', a.accent);
    ov.classList.add('on');
    document.getElementById('chResult').classList.remove('show', 'win', 'lose');
    document.getElementById('chHost').style.display = '';
    const host = document.getElementById('chHost');
    host.__shake = () => { const card = document.getElementById('chCard'); card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); };

    activeCtx = window.ArmorChallenges.start(a.id, host, {
      onLifeChange: (left, total) => renderLives(left, total),
      onWin: () => challengeWon(a),
      onLose: () => challengeLost(a)
    });
  }

  function renderLives(left, total) {
    const wrap = document.getElementById('chLives');
    wrap.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const h = document.createElement('span');
      h.className = 'ch-life' + (i < left ? '' : ' lost');
      h.textContent = i < left ? '◆' : '◇';
      wrap.appendChild(h);
    }
  }

  function challengeWon(a) {
    document.getElementById('chHost').style.display = 'none';
    const res = document.getElementById('chResult');
    res.classList.add('show', 'win');
    document.getElementById('chResultIcon').textContent = '⚔';
    document.getElementById('chResultTitle').textContent = '¡' + a.short + ' conquistada!';
    document.getElementById('chResultVerse').textContent = '«' + a.verse + '»';
    document.getElementById('chResultRef').textContent = a.ref;
    document.getElementById('chResultRefl').textContent = a.reflection;
    const btn = document.getElementById('chResultBtn');
    btn.textContent = 'Equipar la pieza →';
    btn.onclick = () => {
      document.getElementById('challengeOverlay').classList.remove('on');
      equipWithReveal(a);
    };
  }

  function challengeLost(a) {
    if (activeCtx && activeCtx._cleanup) activeCtx._cleanup();
    document.getElementById('chHost').style.display = 'none';
    const res = document.getElementById('chResult');
    res.classList.add('show', 'lose');
    document.getElementById('chResultIcon').textContent = '🛡';
    document.getElementById('chResultTitle').textContent = 'El enemigo te derribó… pero la gracia te levanta';
    document.getElementById('chResultVerse').textContent = '«El justo cae siete veces, y vuelve a levantarse.»';
    document.getElementById('chResultRef').textContent = 'Proverbios 24:16';
    document.getElementById('chResultRefl').textContent = 'Tomá aire y volvé a intentarlo. Esta vez resistirás firme.';
    const btn = document.getElementById('chResultBtn');
    btn.textContent = '↻ Intentar de nuevo';
    btn.onclick = () => openChallenge(a);
  }

  function equipWithReveal(a) {
    state.equipped.add(a.id);

    // Show piece in side slot (NOT on the warrior yet)
    const slot = document.querySelector(`.side-slot[data-slot="${a.id}"]`);
    if (slot) slot.classList.add('won');

    // Subtle pulse on the stage
    const stage = document.getElementById('figureStage');
    stage.classList.add('pulse');
    setTimeout(() => stage.classList.remove('pulse'), 600);

    showDetail(a);
    renderChips();
    renderProgress();

    const done = state.equipped.size;
    if (done < 6) {
      document.getElementById('equipCount').textContent =
        'Te faltan ' + (6 - done) + ' piezas por conquistar';
    } else {
      document.getElementById('equipCount').textContent = '¡Tenés todas las piezas!';
      const btnAsm = document.getElementById('btnAssemble');
      btnAsm.style.display = '';
      btnAsm.classList.add('ready');
    }
  }

  /* ===================== ENSAMBLAJE TRANSFORMER ===================== */
  function assembleArmor() {
    const sfx = document.getElementById('transformSfx');
    const stage = document.getElementById('figureStage');

    // 1. Play Transformers sound
    sfx.currentTime = 0;
    sfx.volume = 0.8;
    sfx.play().catch(() => {});

    // 2. Darken stage
    stage.classList.add('assembling-mode');
    document.getElementById('btnAssemble').style.display = 'none';
    document.getElementById('equipCount').textContent = '';

    // 3. Assembly sequence — each piece does whirlwind then mounts
    const order = ['cinturon', 'coraza', 'calzado', 'escudo', 'yelmo', 'espada'];
    const WHIRL_MS     = 1100;   // whirlwind animation duration (matches CSS)
    const PIECE_DELAY  = 700;    // delay between each piece starting
    const MOUNT_AT     = 0.55;   // fraction of whirlwind when SVG piece activates

    order.forEach((id, i) => {
      const delay = 400 + i * PIECE_DELAY;  // 400ms initial pause
      const slot = document.querySelector(`.side-slot[data-slot="${id}"]`);
      const g = svgEl ? svgEl.querySelector(`[data-piece="${id}"]`) : null;
      const armorData = window.ARMOR.find(x => x.id === id);

      // Start whirlwind on side slot
      setTimeout(() => {
        if (slot) slot.classList.add('assembling');
      }, delay);

      // Mount on warrior (activate SVG piece with flash)
      setTimeout(() => {
        if (g) {
          g.style.setProperty('--glow', armorData ? armorData.glow || armorData.accent : '#fff');
          g.setAttribute('data-on', '1');
          g.classList.add('asm-flash');
          setTimeout(() => g.classList.remove('asm-flash'), 1300);
        }
        // Forge burst effect on stage
        if (armorData) spawnForgeBurst(stage, armorData);
        // Stage shake
        stage.classList.remove('pulse');
        void stage.offsetWidth;
        stage.classList.add('pulse');
        setTimeout(() => stage.classList.remove('pulse'), 600);
      }, delay + WHIRL_MS * MOUNT_AT);
    });

    // 4. Final explosion after all pieces assembled
    const totalTime = 400 + order.length * PIECE_DELAY + WHIRL_MS;
    setTimeout(() => {
      // El destello dorado tapa el cambio: las piezas sueltas dejan paso a la
      // imagen del guerrero armado (cara visible, espada en la mano, botas puestas).
      if (svgEl) svgEl.classList.add('armado-on');

      // Golden burst flash
      const burst = document.createElement('div');
      burst.className = 'asm-final-burst';
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 2200);

      // Show "ARMADURA COMPLETA" text sobre el piso en penumbra
      const veil = document.getElementById('asmFloorVeil');
      if (veil) veil.classList.add('show');
      const txt = document.getElementById('asmCompleteText');
      if (txt) txt.classList.add('show');

      // Remove assembling mode
      stage.classList.remove('assembling-mode');
    }, totalTime);

    // 5. After celebration, show portrait button
    setTimeout(() => {
      document.getElementById('btnFinish').style.display = '';
      document.getElementById('equipCount').textContent = '¡Armadura completa!';
      // El cartel tapaba piernas y botas: después de la celebración se retira
      // junto con el velo del piso y el guerrero queda a la vista completo.
      const veil2 = document.getElementById('asmFloorVeil');
      const txt2 = document.getElementById('asmCompleteText');
      if (veil2) veil2.classList.remove('show');
      if (txt2) txt2.classList.remove('show');
    }, totalTime + 2500);
  }

  /* Explosión de "forja": destello, dos ondas y chispas que salen disparadas. */
  function spawnForgeBurst(stage, a) {
    const burst = document.createElement('div');
    burst.className = 'forge-burst';
    burst.style.setProperty('--acc', a.accent);
    burst.style.setProperty('--glow', a.glow || a.accent);
    burst.innerHTML =
      '<div class="fb-flash"></div>' +
      '<div class="fb-ring"></div>' +
      '<div class="fb-ring two"></div>' +
      '<div class="fb-streak"></div>';
    // chispas radiales
    const N = 18;
    for (let i = 0; i < N; i++) {
      const s = document.createElement('span');
      s.className = 'fb-spark';
      const ang = (Math.PI * 2 * i) / N + Math.random() * 0.3;
      const dist = 120 + Math.random() * 160;
      s.style.setProperty('--tx', Math.cos(ang) * dist + 'px');
      s.style.setProperty('--ty', Math.sin(ang) * dist + 'px');
      s.style.setProperty('--d', (Math.random() * 0.12) + 's');
      s.style.setProperty('--sz', (3 + Math.random() * 4) + 'px');
      burst.appendChild(s);
    }
    stage.appendChild(burst);
    setTimeout(() => burst.remove(), 2400);
  }

  // ---------------- final: fondos ----------------
  function thumbCanvas(id) {
    const c = document.createElement('canvas'); c.width = 120; c.height = 213;
    const cx = c.getContext('2d');
    const p = window.Backgrounds.get(id);
    if (p) { const cache = p.prepare(c.width, c.height); p.paint(cx, c.width, c.height, 2.2, cache); }
    else { cx.fillStyle = '#0a0b18'; cx.fillRect(0, 0, c.width, c.height); }
    const g = cx.createLinearGradient(0, c.height * 0.5, 0, c.height);
    g.addColorStop(0, 'rgba(2,3,8,0)'); g.addColorStop(1, 'rgba(2,3,8,.55)');
    cx.fillStyle = g; cx.fillRect(0, 0, c.width, c.height);
    return c;
  }
  function renderBgGrid() {
    const grid = document.getElementById('bgGrid');
    grid.innerHTML = '';
    // La lista sale de los presets de backgrounds.js. Antes leía
    // window.SEED_BACKGROUNDS, que solo existe en el creador de flayers: acá daba
    // error y cortaba la pantalla del retrato entera (lienzo negro, sin opciones).
    Object.values(window.Backgrounds.presets).forEach(b => {
      const el = document.createElement('div');
      el.className = 'bg-thumb' + (b.id === state.bgId ? ' sel' : '');
      el.appendChild(thumbCanvas(b.id));
      el.onclick = () => { state.bgId = b.id; resolveBg(); renderBgGrid(); renderFinal(); };
      grid.appendChild(el);
    });
  }
  function resolveBg() { state.bgPreset = window.Backgrounds.get(state.bgId); }

  // ---------------- final: rostro ----------------
  /* Detector de caras de MediaPipe: corre en el navegador del jugador (la foto
     no sale del dispositivo). El modelo se sirve desde el sitio; la librería, de
     jsDelivr. Se carga recién cuando alguien elige una foto. Si algo falla, la
     foto se coloca centrada y el jugador la acomoda a mano. */
  const MP_VER = '0.10.14';
  const MP_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VER}`;
  let detectorPromesa = null;
  function cargarDetector() {
    if (!detectorPromesa) {
      detectorPromesa = (async () => {
        const vision = await import(`${MP_URL}/vision_bundle.mjs`);
        const files = await vision.FilesetResolver.forVisionTasks(`${MP_URL}/wasm`);
        return vision.FaceDetector.createFromOptions(files, {
          baseOptions: { modelAssetPath: '/herramientas/armadura/detector-rostro.tflite' },
          runningMode: 'IMAGE',
          minDetectionConfidence: 0.5
        });
      })().catch(err => { console.warn('[armadura] detector de caras no disponible', err); detectorPromesa = null; return null; });
    }
    return detectorPromesa;
  }

  /* Ojos y boca de la cara más grande de la foto, en píxeles de la foto. */
  async function detectarCara(img) {
    const det = await cargarDetector();
    if (!det) return null;
    let res;
    try { res = det.detect(img); } catch (e) { return null; }
    const caras = (res && res.detections) || [];
    if (!caras.length) return null;
    caras.sort((a, b) => (b.boundingBox.width * b.boundingBox.height) - (a.boundingBox.width * a.boundingBox.height));
    const kp = caras[0].keypoints;   // 0 ojo der., 1 ojo izq., 2 nariz, 3 boca
    if (!kp || kp.length < 4) return null;
    const W = img.naturalWidth, H = img.naturalHeight;
    const p = i => ({ x: kp[i].x * W, y: kp[i].y * H });
    return { ojoA: p(0), ojoB: p(1), boca: p(3) };
  }

  function mostrarAjuste(visible) {
    document.getElementById('faceAdjust').classList.toggle('hidden', !visible);
    document.getElementById('portrait').classList.toggle('arrastrable', visible);
  }
  function estadoFoto(txt) { document.getElementById('faceStatus').textContent = txt || ''; }

  async function usarFoto(src) {
    const img = new Image();
    img.src = src;
    try { await img.decode(); } catch (e) { estadoFoto('No pudimos abrir esa imagen. Probá con otra foto.'); return; }
    estadoFoto('Buscando tu cara en la foto…');
    const puntos = await detectarCara(img);
    const ajuste = window.ArmorFigure.ajusteRostro(img, puntos);
    state.fotoCara = { type: 'photo', src, img, ajuste, zoom: 1, dx: 0, dy: 0 };
    state.face = state.fotoCara;
    document.getElementById('faceZoom').value = 1;
    estadoFoto(puntos
      ? 'Listo: tu cara quedó dentro del yelmo.'
      : 'No encontramos una cara en la foto: la pusimos al centro. Acomodala arrastrándola y con el tamaño.');
    mostrarAjuste(true);
    updateFace(); renderFinal();
  }

  /* Arrastrar la cara sobre el retrato. El desplazamiento se guarda en píxeles
     del héroe (1080×1920), así vale igual para la vista previa y la descarga. */
  function wireArrastre() {
    const cv = document.getElementById('finalCanvas');
    const portrait = document.getElementById('portrait');
    let ini = null;
    cv.addEventListener('pointerdown', e => {
      if (state.face.type !== 'photo') return;
      ini = { x: e.clientX, y: e.clientY, dx: state.face.dx, dy: state.face.dy };
      cv.setPointerCapture(e.pointerId);
      portrait.classList.add('arrastrando');
    });
    cv.addEventListener('pointermove', e => {
      if (!ini) return;
      const r = cv.getBoundingClientRect();
      const k = window.ArmorFigure.escalaHeroe(cv.width, cv.height) * (r.width / cv.width);
      state.face.dx = ini.dx + (e.clientX - ini.x) / k;
      state.face.dy = ini.dy + (e.clientY - ini.y) / k;
      renderFinal();
    });
    const fin = () => { ini = null; portrait.classList.remove('arrastrando'); };
    cv.addEventListener('pointerup', fin);
    cv.addEventListener('pointercancel', fin);
  }

  // ---------------- final: aspecto ----------------
  function renderAspectSeg() {
    const seg = document.getElementById('aspectSeg'); seg.innerHTML = '';
    ASPECTS.forEach(a => {
      const b = document.createElement('button');
      b.textContent = a.name; b.className = a.id === state.aspect ? 'on' : '';
      b.onclick = () => { state.aspect = a.id; applyPortraitAspect(); renderAspectSeg(); renderFinal(); };
      seg.appendChild(b);
    });
  }
  function applyPortraitAspect() {
    const a = ASPECTS.find(x => x.id === state.aspect);
    const cv = document.getElementById('finalCanvas');
    cv.width = 540; cv.height = Math.round(540 * a.h / a.w);
    document.getElementById('portrait').style.aspectRatio = a.w + ' / ' + a.h;
  }

  // ---------------- render final preview ----------------
  let renderToken = 0;
  // Se pinta en un lienzo aparte y se copia solo si sigue siendo el último pedido:
  // al arrastrar la cara llegan muchos pedidos seguidos y, como cada uno espera
  // imágenes, sin esto se mezclaban y quedaba la cara vieja asomando.
  function renderFinal() {
    const cv = document.getElementById('finalCanvas');
    const token = ++renderToken;
    const off = document.createElement('canvas');
    off.width = cv.width; off.height = cv.height;
    const octx = off.getContext('2d', { alpha: false });
    return window.ArmorFigure.renderFinal(octx, off.width, off.height, {
      bgPreset: state.bgPreset, face: state.face, equipped: state.equipped, t: 3
    }).then(() => {
      if (token !== renderToken) return;
      cv.getContext('2d', { alpha: false }).drawImage(off, 0, 0);
    });
  }

  // ---------------- descarga ----------------
  async function download() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('on');
    const a = ASPECTS.find(x => x.id === state.aspect);
    const cv = document.createElement('canvas'); cv.width = a.w; cv.height = a.h;
    const ctx = cv.getContext('2d', { alpha: false });
    if (state.bgPreset) state.bgPreset.prepare(a.w, a.h);
    await window.ArmorFigure.renderFinal(ctx, a.w, a.h, { bgPreset: state.bgPreset, face: state.face, equipped: state.equipped, t: 3 });
    cv.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = 'armadura-de-dios.png';
      document.body.appendChild(link); link.click();
      setTimeout(() => { URL.revokeObjectURL(url); link.remove(); overlay.classList.remove('on'); }, 1200);
    }, 'image/png');
  }

  // ---------------- wire ----------------
  function wire() {
    document.getElementById('btnStart').onclick = () => { show('screen-equip'); };
    document.getElementById('btnAssemble').onclick = () => assembleArmor();
    document.getElementById('btnFinish').onclick = () => {
      show('screen-final');
      resolveBg(); applyPortraitAspect();
      renderBgGrid(); renderAspectSeg(); updateFace();
      // pequeño respiro para que el canvas tenga tamaño antes de pintar
      setTimeout(renderFinal, 60);
    };
    document.getElementById('btnBack').onclick = () => show('screen-equip');
    document.getElementById('btnDownload').onclick = download;

    // cerrar/abandonar desafío
    document.getElementById('chClose').onclick = () => {
      if (activeCtx && activeCtx._cleanup) activeCtx._cleanup();
      document.getElementById('challengeOverlay').classList.remove('on');
    };

    // modo de rostro
    document.getElementById('faceMode').querySelectorAll('button').forEach(b => {
      b.onclick = () => {
        document.getElementById('faceMode').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
        const mode = b.dataset.mode;
        document.getElementById('photoOpts').classList.toggle('hidden', mode !== 'photo');
        if (mode === 'photo') {
          if (state.fotoCara) { state.face = state.fotoCara; mostrarAjuste(true); }
          else document.getElementById('photoInput').click();
          cargarDetector();   // se adelanta la descarga mientras elige la foto
        } else {
          state.face = { type: 'none' };
          mostrarAjuste(false);
        }
        updateFace(); renderFinal();
      };
    });

    document.getElementById('btnPhoto').onclick = () => document.getElementById('photoInput').click();
    document.getElementById('photoInput').onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => usarFoto(r.result);
      r.readAsDataURL(f);
      e.target.value = '';
    };
    document.getElementById('faceZoom').oninput = (e) => {
      if (state.face.type !== 'photo') return;
      state.face.zoom = parseFloat(e.target.value);
      renderFinal();
    };
    document.getElementById('btnFaceReset').onclick = () => {
      if (state.face.type !== 'photo') return;
      state.face.zoom = 1; state.face.dx = 0; state.face.dy = 0;
      document.getElementById('faceZoom').value = 1;
      renderFinal();
    };
    wireArrastre();
  }

  async function init() {
    fillIntro();
    wire();
    buildFigure();
    renderChips();
    renderProgress();
    resolveBg();
    document.getElementById('equipCount').textContent = 'Conquistá las 6 piezas';
    try {
      await document.fonts.load("500 40px 'Cormorant Garamond'");
      await document.fonts.load("500 20px 'Jost'");
      await document.fonts.ready;
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
