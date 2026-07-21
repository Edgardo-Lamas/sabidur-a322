/* =====================================================================
   armor-challenges.js — Motor de desafíos. Renderiza cada tipo de prueba
   dentro de un host, maneja VIDAS LIMITADAS, y resuelve con éxito/fracaso.

   API:
     ArmorChallenges.start(pieceId, host, { onWin, onLose, onLifeChange })
   Tipos: knowledge-truth | knowledge-fill | knowledge-sword |
          decision | identity | action-shield
   ===================================================================== */
(function () {
  'use strict';

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  const Engine = {
    start(pieceId, host, cb) {
      const cfg = window.CHALLENGES[pieceId];
      const piece = window.ARMOR.find(p => p.id === pieceId);
      const accent = piece ? piece.accent : '#E9C98A';
      const lives = (window.GAME_CONFIG.lives) || 3;
      const ctx = { pieceId, cfg, piece, accent, host, cb, lives, livesLeft: lives, idx: 0, correct: 0 };
      host.innerHTML = '';
      cb.onLifeChange && cb.onLifeChange(ctx.livesLeft, ctx.lives);

      if (cfg.type === 'action-shield') {
        startShield(ctx);
      } else {
        startQuiz(ctx);
      }
      return ctx;
    }
  };

  /* ---- pérdida de vida compartida ---- */
  function loseLife(ctx) {
    ctx.livesLeft--;
    ctx.cb.onLifeChange && ctx.cb.onLifeChange(ctx.livesLeft, ctx.lives);
    if (ctx.host.__shake) ctx.host.__shake();
    if (ctx.livesLeft <= 0) {
      setTimeout(() => ctx.cb.onLose && ctx.cb.onLose(), 650);
      return true;
    }
    return false;
  }

  /* =====================================================================
     QUIZ GENÉRICO (knowledge-truth / fill / sword / decision / identity)
     Pasás todas las rondas sin quedarte sin vidas → ganás.
     ===================================================================== */
  function startQuiz(ctx) {
    const cfg = ctx.cfg;
    const total = Math.min(cfg.rounds || 3, cfg.bank.length);
    ctx.queue = shuffle(cfg.bank).slice(0, total);
    ctx.total = total;
    nextQuiz(ctx);
  }

  function nextQuiz(ctx) {
    if (ctx.idx >= ctx.total) { ctx.cb.onWin && ctx.cb.onWin(); return; }
    const item = ctx.queue[ctx.idx];
    const r = renderProgress(ctx);
    const body = el('div', 'ch-body');
    r.appendChild(body);

    switch (ctx.cfg.type) {
      case 'knowledge-truth': renderTruth(ctx, item, body); break;
      case 'knowledge-fill': renderFill(ctx, item, body); break;
      case 'knowledge-sword': renderSword(ctx, item, body); break;
      case 'decision': renderDecision(ctx, item, body); break;
      case 'identity': renderIdentity(ctx, item, body); break;
      default: renderDecision(ctx, item, body);
    }
    mount(ctx, r);
  }

  function advance(ctx, wasCorrect) {
    if (wasCorrect) ctx.correct++;
    ctx.idx++;
    setTimeout(() => nextQuiz(ctx), 820);
  }

  /* ---- VERDAD o MENTIRA ---- */
  function renderTruth(ctx, item, body) {
    body.appendChild(el('div', 'ch-prompt', ctx.cfg.intro));
    body.appendChild(el('div', 'ch-statement', '“' + item.text + '”'));
    const row = el('div', 'ch-truthrow');
    const mkBtn = (label, val, klass) => {
      const b = el('button', 'ch-bigbtn ' + klass, label);
      b.onclick = () => {
        lock(row);
        const ok = (val === item.truth);
        markResult(b, ok);
        // marca el botón correcto si falló
        if (!ok) {
          const right = row.querySelector(val ? '.is-false' : '.is-true');
          if (right) right.classList.add('reveal');
        }
        feedback(ctx, body, ok, ok ? '¡Verdad de Dios!' : (item.truth ? 'En realidad es VERDAD.' : 'Era una mentira del enemigo.'));
        if (ok) advance(ctx, true);
        else { if (!loseLife(ctx)) advance(ctx, false); }
      };
      return b;
    };
    const bt = mkBtn('✓ VERDAD', true, 'is-true');
    const bf = mkBtn('✕ MENTIRA', false, 'is-false');
    row.appendChild(bt); row.appendChild(bf);
    body.appendChild(row);
  }

  /* ---- COMPLETAR VERSÍCULO ---- */
  function renderFill(ctx, item, body) {
    body.appendChild(el('div', 'ch-prompt', ctx.cfg.intro));
    const verse = el('div', 'ch-verse',
      item.before + '<span class="ch-blank">_____</span>' + item.after +
      '<span class="ch-vref">' + item.ref + '</span>');
    body.appendChild(verse);
    const opts = el('div', 'ch-options');
    shuffle(item.options).forEach(opt => {
      const b = el('button', 'ch-opt', opt);
      b.onclick = () => {
        lock(opts);
        const ok = (opt === item.blank);
        markResult(b, ok);
        if (ok) { const bl = verse.querySelector('.ch-blank'); bl.textContent = opt; bl.classList.add('filled'); }
        else { highlightCorrect(opts, item.blank); }
        feedback(ctx, body, ok, ok ? '¡Correcto!' : 'La palabra era “' + item.blank + '”.');
        if (ok) advance(ctx, true); else { if (!loseLife(ctx)) advance(ctx, false); }
      };
      opts.appendChild(b);
    });
    body.appendChild(opts);
  }

  /* ---- EMPUÑAR LA PALABRA (espada) ---- */
  function renderSword(ctx, item, body) {
    body.appendChild(el('div', 'ch-prompt', ctx.cfg.intro));
    body.appendChild(el('div', 'ch-attack', '<span class="ch-attack-label">El enemigo susurra:</span>' + item.attack));
    const opts = el('div', 'ch-options ch-sword');
    shuffle(item.options).forEach(opt => {
      const b = el('button', 'ch-opt', '⚔ ' + opt.text);
      b.onclick = () => {
        lock(opts);
        markResult(b, opt.correct);
        if (!opt.correct) highlightCorrectObj(opts, item.options);
        feedback(ctx, body, opt.correct, opt.correct ? '¡«Escrito está»! La Palabra vence.' : 'Esa no es la Palabra de Dios.');
        if (opt.correct) advance(ctx, true); else { if (!loseLife(ctx)) advance(ctx, false); }
      };
      opts.appendChild(b);
    });
    body.appendChild(opts);
  }

  /* ---- DECISIÓN (escenario) ---- */
  function renderDecision(ctx, item, body) {
    body.appendChild(el('div', 'ch-prompt', ctx.cfg.intro));
    body.appendChild(el('div', 'ch-scene', item.scene));
    const opts = el('div', 'ch-options');
    shuffle(item.options).forEach(opt => {
      const b = el('button', 'ch-opt', opt.text);
      b.onclick = () => {
        lock(opts);
        markResult(b, opt.correct);
        if (!opt.correct) highlightCorrectObj(opts, item.options);
        feedback(ctx, body, opt.correct, opt.correct ? '¡Decisión íntegra!' : 'Esa decisión no guarda tu corazón.');
        if (opt.correct) advance(ctx, true); else { if (!loseLife(ctx)) advance(ctx, false); }
      };
      opts.appendChild(b);
    });
    body.appendChild(opts);
  }

  /* ---- IDENTIDAD ---- */
  function renderIdentity(ctx, item, body) {
    body.appendChild(el('div', 'ch-prompt', ctx.cfg.intro));
    body.appendChild(el('div', 'ch-scene', item.q));
    const opts = el('div', 'ch-options');
    shuffle(item.options).forEach(opt => {
      const b = el('button', 'ch-opt', opt.text);
      b.onclick = () => {
        lock(opts);
        markResult(b, opt.correct);
        if (!opt.correct) highlightCorrectObj(opts, item.options);
        feedback(ctx, body, opt.correct, opt.correct ? '¡Esa es tu identidad!' : 'No dejes que esa mentira proteja tu mente.');
        if (opt.correct) advance(ctx, true); else { if (!loseLife(ctx)) advance(ctx, false); }
      };
      opts.appendChild(b);
    });
    body.appendChild(opts);
  }

  /* ---- helpers de quiz ---- */
  function renderProgress(ctx) {
    const r = el('div', 'ch-screen');
    const head = el('div', 'ch-head');
    const dots = el('div', 'ch-rounds');
    for (let i = 0; i < ctx.total; i++) {
      const d = el('span', 'ch-rdot' + (i < ctx.idx ? ' done' : i === ctx.idx ? ' cur' : ''));
      d.style.setProperty('--a', ctx.accent);
      dots.appendChild(d);
    }
    head.appendChild(dots);
    r.appendChild(head);
    return r;
  }
  function mount(ctx, node) {
    ctx.host.innerHTML = '';
    ctx.host.appendChild(node);
    requestAnimationFrame(() => node.classList.add('in'));
  }
  function lock(container) { container.classList.add('locked'); }
  function markResult(btn, ok) { btn.classList.add(ok ? 'right' : 'wrong'); }
  function highlightCorrect(opts, val) {
    [...opts.querySelectorAll('.ch-opt')].forEach(b => { if (b.textContent === val) b.classList.add('reveal'); });
  }
  function highlightCorrectObj(opts, options) {
    const correct = options.find(o => o.correct);
    [...opts.querySelectorAll('.ch-opt')].forEach(b => {
      if (correct && b.textContent.replace(/^[⚔\s]+/, '') === correct.text) b.classList.add('reveal');
    });
  }
  function feedback(ctx, body, ok, msg) {
    const f = el('div', 'ch-feedback ' + (ok ? 'ok' : 'no'), (ok ? '✦ ' : '✕ ') + msg);
    body.appendChild(f);
    requestAnimationFrame(() => f.classList.add('in'));
  }

  /* =====================================================================
     MINI-JUEGO: ESCUDO DE LA FE — bloquear dardos de fuego.
     El escudo sigue el puntero/touch en X. Cada dardo cae; si lo tocás con
     el escudo se apaga (bloqueo). Si llega abajo, perdés una vida.
     Bloqueás targetBlocks → ganás.
     ===================================================================== */
  function startShield(ctx) {
    const cfg = ctx.cfg;
    const screen = el('div', 'ch-screen ch-shield');
    screen.innerHTML =
      '<div class="ch-prompt">' + cfg.intro + '</div>' +
      '<div class="sh-stats"><span class="sh-blocks">0 / ' + cfg.targetBlocks + ' bloqueados</span></div>';
    const arena = el('div', 'sh-arena');
    const shield = el('div', 'sh-shield', '🛡');
    arena.appendChild(shield);
    screen.appendChild(arena);
    mount(ctx, screen);
    requestAnimationFrame(() => screen.classList.add('in'));

    const state = {
      blocks: 0, darts: [], raf: 0, lastSpawn: 0, spawnEvery: cfg.spawnEvery,
      shieldX: 0.5, running: true, t0: performance.now()
    };
    const blocksLabel = screen.querySelector('.sh-blocks');
    // primer dardo casi inmediato para enganchar al toque
    setTimeout(() => { if (state.running) spawn(); }, 250);

    function setShield(clientX) {
      const r = arena.getBoundingClientRect();
      let x = (clientX - r.left) / r.width;
      x = Math.max(0.08, Math.min(0.92, x));
      state.shieldX = x;
      shield.style.left = (x * 100) + '%';
    }
    arena.addEventListener('pointermove', e => setShield(e.clientX));
    arena.addEventListener('pointerdown', e => setShield(e.clientX));
    shield.style.left = '50%';

    function spawn() {
      const word = cfg.darts[Math.floor(Math.random() * cfg.darts.length)];
      const d = el('div', 'sh-dart', '<span>' + word + '</span>');
      const x = 0.1 + Math.random() * 0.8;
      d.style.left = (x * 100) + '%';
      d.__x = x; d.__y = -0.05; d.__blocked = false;
      arena.appendChild(d);
      state.darts.push(d);
    }

    function tick(now) {
      if (!state.running) return;
      // dt en segundos, ACOTADO: si la pestaña estuvo oculta, no saltar de golpe
      let dt = (now - state.t0) / 1000;
      state.t0 = now;
      if (dt > 0.05) dt = 0.05;          // tope ~3 frames (anti-salto al volver de otra pestaña)
      if (dt < 0) dt = 0;

      const elapsed = now - (state.startedAt || (state.startedAt = now));
      // ritmo de aparición: se acelera suavemente
      const curSpawn = Math.max(600, state.spawnEvery - elapsed / 120);
      if (now - state.lastSpawn > curSpawn) { spawn(); state.lastSpawn = now; }

      // velocidad de caída en FRACCIÓN POR SEGUNDO (sube lento con el tiempo)
      const fallPerSec = 0.22 + elapsed / 140000;
      const shieldYfrac = 0.80, shieldHalf = 0.11;

      for (const d of state.darts) {
        if (d.__dead) continue;
        d.__y += fallPerSec * dt;
        d.style.top = (d.__y * 100) + '%';
        // colisión con escudo
        if (!d.__blocked && d.__y >= shieldYfrac - 0.05 && d.__y <= shieldYfrac + 0.07) {
          if (Math.abs(d.__x - state.shieldX) < shieldHalf) {
            d.__blocked = true; d.__dead = true;
            d.classList.add('blocked');
            flashShield(shield);
            state.blocks++;
            blocksLabel.textContent = state.blocks + ' / ' + cfg.targetBlocks + ' bloqueados';
            setTimeout(() => d.remove(), 360);
            if (state.blocks >= cfg.targetBlocks) { win(); return; }
            continue;
          }
        }
        // llegó abajo sin bloquear → impacto
        if (d.__y >= 0.96) {
          d.__dead = true;
          d.classList.add('hit');
          setTimeout(() => d.remove(), 300);
          if (loseLife(ctx)) { state.running = false; return; }
        }
      }
      state.darts = state.darts.filter(d => !d.__dead || d.parentNode);
      state.raf = requestAnimationFrame(tick);
    }

    function win() {
      state.running = false;
      cancelAnimationFrame(state.raf);
      state.darts.forEach(d => d.remove());
      ctx.cb.onWin && ctx.cb.onWin();
    }

    ctx._cleanup = () => { state.running = false; cancelAnimationFrame(state.raf); };
    state.raf = requestAnimationFrame(tick);
  }

  function flashShield(shield) {
    shield.classList.remove('flash'); void shield.offsetWidth; shield.classList.add('flash');
  }

  window.ArmorChallenges = Engine;
})();
