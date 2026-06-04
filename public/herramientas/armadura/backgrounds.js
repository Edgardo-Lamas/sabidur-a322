/* =====================================================================
   backgrounds.js — Escenas cósmicas procedurales y animadas.
   Cada preset: construye capas estáticas una vez (cacheadas por tamaño)
   y compone movimiento dependiente SOLO de t (tiempo en segundos), de
   modo que la vista previa y la exportación coincidan exactamente.
   Sin Math.random en el draw: todo aleatorio va sembrado en el build.
   ===================================================================== */
(function () {
  'use strict';

  /* ---- RNG sembrado (mulberry32) ---- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function rgba(r, g, b, a) { return `rgba(${r|0},${g|0},${b|0},${a})`; }

  /* Construye un campo de estrellas determinista. */
  function buildStars(W, H, count, seed, opts) {
    opts = opts || {};
    const rnd = mulberry32(seed);
    const stars = [];
    const maxR = opts.maxR || Math.max(W, H) * 0.0016;
    for (let i = 0; i < count; i++) {
      const r = (0.25 + Math.pow(rnd(), 3) * 1) * maxR;
      stars.push({
        x: rnd() * W,
        y: rnd() * H,
        r: r,
        a: 0.35 + rnd() * 0.6,
        tw: 0.6 + rnd() * 2.4,          // velocidad de parpadeo
        ph: rnd() * Math.PI * 2,        // fase
        depth: 0.4 + rnd() * 1.6,       // parallax
        warm: rnd() < 0.18              // algunas estrellas cálidas
      });
    }
    return stars;
  }

  function drawStars(ctx, stars, W, H, t, drift) {
    drift = drift || 0;
    ctx.save();
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const tw = 0.55 + 0.45 * Math.sin(t * s.tw + s.ph);
      const a = s.a * tw;
      let x = s.x + Math.cos(s.ph) * drift * s.depth;
      let y = s.y + drift * 0.3 * s.depth;
      x = ((x % W) + W) % W;
      const col = s.warm ? rgba(255, 224, 190, a) : rgba(232, 240, 255, a);
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, 7);
      ctx.fill();
      // glow + destello para las estrellas grandes
      if (s.r > 1.4) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, s.r * 7);
        g.addColorStop(0, s.warm ? rgba(255, 220, 180, a * 0.5) : rgba(200, 220, 255, a * 0.5));
        g.addColorStop(1, rgba(200, 220, 255, 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, s.r * 7, 0, 7); ctx.fill();
      }
    }
    ctx.restore();
  }

  /* Construye una textura de nebulosa difusa con blobs radiales aditivos. */
  function buildNebula(W, H, seed, cfg) {
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d');
    const rnd = mulberry32(seed);
    // base
    const bg = x.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, cfg.base0); bg.addColorStop(1, cfg.base1);
    x.fillStyle = bg; x.fillRect(0, 0, W, H);

    // nubes aditivas
    x.globalCompositeOperation = 'lighter';
    const cols = cfg.clouds;
    const N = cfg.cloudCount || 80;
    const big = Math.max(W, H);
    for (let i = 0; i < N; i++) {
      const cx = rnd() * W, cy = rnd() * H * (cfg.bias || 1);
      const rad = (0.1 + rnd() * 0.45) * big;
      const col = cols[(rnd() * cols.length) | 0];
      const a = (cfg.cloudAlpha || 0.10) * (0.4 + rnd() * 0.9);
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0, rgba(col[0], col[1], col[2], a));
      g.addColorStop(0.5, rgba(col[0], col[1], col[2], a * 0.35));
      g.addColorStop(1, rgba(col[0], col[1], col[2], 0));
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, rad, 0, 7); x.fill();
    }
    // núcleos brillantes
    for (let i = 0; i < (cfg.cores || 3); i++) {
      const cx = (0.25 + rnd() * 0.5) * W, cy = (0.2 + rnd() * 0.6) * H;
      const rad = (0.06 + rnd() * 0.1) * big;
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0, rgba(255, 250, 245, 0.5));
      g.addColorStop(0.4, rgba(cfg.coreCol[0], cfg.coreCol[1], cfg.coreCol[2], 0.28));
      g.addColorStop(1, rgba(cfg.coreCol[0], cfg.coreCol[1], cfg.coreCol[2], 0));
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, rad, 0, 7); x.fill();
    }
    // carriles de polvo oscuro
    x.globalCompositeOperation = 'source-over';
    for (let i = 0; i < (cfg.dust || 18); i++) {
      const cx = rnd() * W, cy = rnd() * H;
      const rad = (0.08 + rnd() * 0.22) * big;
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0, rgba(4, 3, 10, 0.0));
      g.addColorStop(1, rgba(4, 3, 10, 0.0));
      // sutil oscurecimiento
      const g2 = x.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g2.addColorStop(0, rgba(cfg.base0n[0], cfg.base0n[1], cfg.base0n[2], 0.5));
      g2.addColorStop(1, rgba(cfg.base0n[0], cfg.base0n[1], cfg.base0n[2], 0));
      x.fillStyle = g2; x.beginPath(); x.arc(cx, cy, rad, 0, 7); x.fill();
    }
    return c;
  }

  /* ------------------------------------------------------------------
     Definición de presets. Cada uno expone:
       prepare(W,H) -> cache (lazy, por dimensión)
       paint(ctx,W,H,t,cache)
     ------------------------------------------------------------------ */

  function nebulaPreset(id, name, cfg) {
    return {
      id, name,
      _cache: {},
      prepare(W, H) {
        const k = W + 'x' + H;
        if (!this._cache[k]) {
          this._cache[k] = {
            tex: buildNebula(W, H, cfg.seed, cfg),
            stars: buildStars(W, H, cfg.starCount || 260, cfg.seed + 7)
          };
        }
        return this._cache[k];
      },
      paint(ctx, W, H, t, c) {
        // deriva lenta de la nebulosa (parallax + respiración más marcada)
        const dx = Math.sin(t * 0.09) * W * 0.035 + t * W * 0.004;
        const dy = Math.cos(t * 0.07) * H * 0.028;
        const sc = 1.10 + Math.sin(t * 0.13) * 0.035;
        ctx.save();
        ctx.translate(W / 2, H / 2);
        ctx.scale(sc, sc);
        ctx.translate(-W / 2 + dx, -H / 2 + dy);
        ctx.drawImage(c.tex, -W * 0.06, 0, W * 1.12, H);
        ctx.restore();
        drawStars(ctx, c.stars, W, H, t, Math.sin(t * 0.15) * 14);
      }
    };
  }

  /* Vía Láctea: starfield denso con banda diagonal luminosa. */
  function milkyWayPreset() {
    const cfg = {
      base0: '#05070f', base1: '#0a0b18', base0n: [5, 6, 14],
      clouds: [[120, 140, 200], [90, 110, 180], [160, 150, 210], [70, 90, 150]],
      coreCol: [180, 200, 255], cloudCount: 50, cloudAlpha: 0.06, cores: 1, dust: 10, seed: 31
    };
    return {
      id: 'vialactea', name: 'Vía Láctea', _cache: {},
      prepare(W, H) {
        const k = W + 'x' + H;
        if (this._cache[k]) return this._cache[k];
        const c = document.createElement('canvas'); c.width = W; c.height = H;
        const x = c.getContext('2d');
        const bg = x.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, '#04060e'); bg.addColorStop(0.5, '#080a16'); bg.addColorStop(1, '#05060f');
        x.fillStyle = bg; x.fillRect(0, 0, W, H);
        // banda de la vía láctea (diagonal)
        x.save();
        x.translate(W * 0.5, H * 0.5);
        x.rotate(-0.5);
        x.globalCompositeOperation = 'lighter';
        const rnd = mulberry32(99);
        const band = Math.max(W, H) * 1.4;
        for (let i = 0; i < 140; i++) {
          const px = (rnd() - 0.5) * band;
          const py = (rnd() - 0.5) * H * 0.55;
          const rad = (0.04 + rnd() * 0.16) * H;
          const cc = [[150, 165, 220], [200, 180, 200], [120, 140, 190]][(rnd() * 3) | 0];
          const a = 0.04 + rnd() * 0.07;
          const g = x.createRadialGradient(px, py, 0, px, py, rad);
          g.addColorStop(0, rgba(cc[0], cc[1], cc[2], a));
          g.addColorStop(1, rgba(cc[0], cc[1], cc[2], 0));
          x.fillStyle = g; x.beginPath(); x.arc(px, py, rad, 0, 7); x.fill();
        }
        // polvo oscuro dentro de la banda
        x.globalCompositeOperation = 'source-over';
        for (let i = 0; i < 40; i++) {
          const px = (rnd() - 0.5) * band;
          const py = (rnd() - 0.5) * H * 0.4;
          const rad = (0.02 + rnd() * 0.08) * H;
          const g = x.createRadialGradient(px, py, 0, px, py, rad);
          g.addColorStop(0, rgba(4, 5, 12, 0.6));
          g.addColorStop(1, rgba(4, 5, 12, 0));
          x.fillStyle = g; x.beginPath(); x.arc(px, py, rad, 0, 7); x.fill();
        }
        x.restore();
        this._cache[k] = {
          tex: c,
          stars: buildStars(W, H, 520, 12, { maxR: Math.max(W, H) * 0.002 }),
          bandStars: buildStars(W, H, 240, 77, { maxR: Math.max(W, H) * 0.0018 })
        };
        return this._cache[k];
      },
      paint(ctx, W, H, t, c) {
        const sc = 1.06 + Math.sin(t * 0.1) * 0.025;
        ctx.save();
        ctx.translate(W / 2, H / 2); ctx.scale(sc, sc); ctx.rotate(Math.sin(t * 0.04) * 0.02); ctx.translate(-W / 2, -H / 2);
        ctx.drawImage(c.tex, 0, 0, W, H);
        ctx.restore();
        drawStars(ctx, c.stars, W, H, t, Math.sin(t * 0.12) * 12);
        drawStars(ctx, c.bandStars, W, H, t * 1.3, Math.cos(t * 0.1) * 6);
      }
    };
  }

  /* Aurora: cintas de gradiente desplazadas por seno, dinámicas. */
  function auroraPreset() {
    return {
      id: 'aurora', name: 'Aurora Celeste', _cache: {},
      prepare(W, H) {
        const k = W + 'x' + H;
        if (!this._cache[k]) this._cache[k] = { stars: buildStars(W, H, 300, 5) };
        return this._cache[k];
      },
      paint(ctx, W, H, t, c) {
        const bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, '#04081a'); bg.addColorStop(0.55, '#060c22'); bg.addColorStop(1, '#02040f');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        drawStars(ctx, c.stars, W, H, t, 0);
        // cintas de aurora
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const ribbons = [
          { col: [70, 230, 175], y: 0.30, amp: 0.14, sp: 0.9, w: 0.24, ph: 0 },
          { col: [90, 165, 255], y: 0.44, amp: 0.17, sp: 0.7, w: 0.28, ph: 1.7 },
          { col: [185, 115, 240], y: 0.58, amp: 0.12, sp: 1.05, w: 0.22, ph: 3.1 }
        ];
        for (const rb of ribbons) {
          const steps = 64;
          for (let i = 0; i <= steps; i++) {
            const px = (i / steps) * W;
            const yy = H * rb.y + Math.sin(i / steps * Math.PI * 2 + t * rb.sp + rb.ph) * H * rb.amp
              + Math.sin(i / steps * Math.PI * 5 + t * rb.sp * 1.6) * H * rb.amp * 0.35;
            const hgt = H * rb.w * (0.7 + 0.3 * Math.sin(i / steps * Math.PI * 3 + t * 1.2));
            const g = ctx.createLinearGradient(px, yy - hgt, px, yy + hgt * 0.3);
            g.addColorStop(0, rgba(rb.col[0], rb.col[1], rb.col[2], 0));
            g.addColorStop(0.5, rgba(rb.col[0], rb.col[1], rb.col[2], 0.085));
            g.addColorStop(1, rgba(rb.col[0], rb.col[1], rb.col[2], 0));
            ctx.fillStyle = g;
            ctx.fillRect(px - W / steps, yy - hgt, W / steps + 2, hgt * 1.3);
          }
        }
        ctx.restore();
      }
    };
  }

  /* Galaxia espiral: imagen estática rotada lentamente. */
  function galaxyPreset() {
    return {
      id: 'galaxia', name: 'Galaxia Espiral', _cache: {},
      prepare(W, H) {
        const k = W + 'x' + H;
        if (this._cache[k]) return this._cache[k];
        const S = Math.max(W, H) * 1.5;
        const c = document.createElement('canvas'); c.width = S; c.height = S;
        const x = c.getContext('2d');
        x.fillStyle = '#000'; x.fillRect(0, 0, S, S);
        x.translate(S / 2, S / 2);
        x.globalCompositeOperation = 'lighter';
        const rnd = mulberry32(44);
        const arms = 2, turns = 2.4;
        // brazos
        for (let i = 0; i < 9000; i++) {
          const arm = i % arms;
          const tt = Math.pow(rnd(), 0.6);
          const ang = tt * turns * Math.PI * 2 + arm * Math.PI + (rnd() - 0.5) * 0.5;
          const rad = tt * S * 0.46;
          const px = Math.cos(ang) * rad + (rnd() - 0.5) * S * 0.04;
          const py = Math.sin(ang) * rad * 0.42 + (rnd() - 0.5) * S * 0.04; // achatado
          const warm = rnd();
          const cc = warm < 0.3 ? [255, 220, 180] : warm < 0.6 ? [180, 200, 255] : [220, 210, 240];
          const a = 0.5 * (1 - tt) + 0.05;
          x.fillStyle = rgba(cc[0], cc[1], cc[2], a * 0.5);
          x.beginPath(); x.arc(px, py, rnd() * 1.6 + 0.3, 0, 7); x.fill();
        }
        // núcleo
        const g = x.createRadialGradient(0, 0, 0, 0, 0, S * 0.2);
        g.addColorStop(0, rgba(255, 250, 235, 0.95));
        g.addColorStop(0.25, rgba(255, 225, 180, 0.6));
        g.addColorStop(0.6, rgba(255, 190, 140, 0.12));
        g.addColorStop(1, rgba(255, 190, 140, 0));
        x.fillStyle = g; x.beginPath(); x.arc(0, 0, S * 0.2, 0, 7); x.fill();
        this._cache[k] = { tex: c, S, stars: buildStars(W, H, 200, 8) };
        return this._cache[k];
      },
      paint(ctx, W, H, t, c) {
        ctx.fillStyle = '#03040b'; ctx.fillRect(0, 0, W, H);
        drawStars(ctx, c.stars, W, H, t, 0);
        ctx.save();
        ctx.translate(W * 0.5, H * 0.46);
        ctx.rotate(t * 0.06);
        const sc = (Math.max(W, H) / c.S) * 1.15;
        ctx.scale(sc, sc);
        ctx.globalCompositeOperation = 'lighter';
        ctx.drawImage(c.tex, -c.S / 2, -c.S / 2);
        ctx.restore();
      }
    };
  }

  /* Lluvia de estrellas: nebulosa tenue + meteoros temporizados. */
  function meteorsPreset() {
    const base = nebulaPreset('meteoros', 'Lluvia de Estrellas', {
      base0: '#050813', base1: '#0a0f22', base0n: [5, 8, 19],
      clouds: [[60, 90, 160], [80, 110, 180], [50, 70, 130]],
      coreCol: [150, 180, 255], cloudCount: 40, cloudAlpha: 0.06, cores: 1, dust: 8, seed: 61, starCount: 360
    });
    const rnd = mulberry32(202);
    const meteors = [];
    for (let i = 0; i < 14; i++) {
      meteors.push({
        t0: rnd() * 5, dur: 0.8 + rnd() * 0.7,
        x0: 0.1 + rnd() * 0.9, y0: -0.1 + rnd() * 0.3,
        ang: Math.PI * (0.62 + rnd() * 0.12), len: 0.12 + rnd() * 0.16
      });
    }
    return {
      id: 'meteoros', name: 'Lluvia de Estrellas', _cache: base._cache,
      prepare(W, H) { return base.prepare(W, H); },
      paint(ctx, W, H, t, c) {
        base.paint(ctx, W, H, t, c);
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const period = 5;
        for (const m of meteors) {
          let lt = ((t - m.t0) % period + period) % period;
          if (lt > m.dur) continue;
          const p = lt / m.dur;
          const travel = Math.max(W, H) * 1.2;
          const sx = m.x0 * W + Math.cos(m.ang) * travel * p;
          const sy = m.y0 * H + Math.sin(m.ang) * travel * p;
          const tailX = sx - Math.cos(m.ang) * travel * m.len;
          const tailY = sy - Math.sin(m.ang) * travel * m.len;
          const fade = Math.sin(p * Math.PI);
          const g = ctx.createLinearGradient(sx, sy, tailX, tailY);
          g.addColorStop(0, rgba(255, 255, 245, 0.9 * fade));
          g.addColorStop(0.4, rgba(200, 220, 255, 0.35 * fade));
          g.addColorStop(1, rgba(200, 220, 255, 0));
          ctx.strokeStyle = g; ctx.lineWidth = Math.max(W, H) * 0.0022; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(tailX, tailY); ctx.stroke();
          // cabeza
          const hg = ctx.createRadialGradient(sx, sy, 0, sx, sy, W * 0.01);
          hg.addColorStop(0, rgba(255, 255, 250, 0.9 * fade));
          hg.addColorStop(1, rgba(255, 255, 250, 0));
          ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(sx, sy, W * 0.01, 0, 7); ctx.fill();
        }
        ctx.restore();
      }
    };
  }

  /* Mundos Lejanos: planeta con anillos + atmósfera + starfield. */
  function planetPreset() {
    return {
      id: 'planeta', name: 'Mundos Lejanos', _cache: {},
      prepare(W, H) {
        const k = W + 'x' + H;
        if (!this._cache[k]) this._cache[k] = { stars: buildStars(W, H, 340, 21) };
        return this._cache[k];
      },
      paint(ctx, W, H, t, c) {
        const bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, '#060512'); bg.addColorStop(1, '#020108');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        drawStars(ctx, c.stars, W, H, t, Math.sin(t * 0.07) * 4);

        const cx = W * 0.5, cy = H * 0.4, R = Math.min(W, H) * 0.26;
        const drift = Math.sin(t * 0.12) * H * 0.006;
        // resplandor atmosférico
        const ag = ctx.createRadialGradient(cx, cy + drift, R * 0.9, cx, cy + drift, R * 1.5);
        ag.addColorStop(0, rgba(120, 170, 255, 0.25));
        ag.addColorStop(1, rgba(120, 170, 255, 0));
        ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(cx, cy + drift, R * 1.5, 0, 7); ctx.fill();
        // anillos detrás
        ctx.save();
        ctx.translate(cx, cy + drift); ctx.rotate(-0.42); ctx.scale(1, 0.32);
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = rgba(220, 200, 235, 0.18 - i * 0.04);
          ctx.lineWidth = R * (0.10 - i * 0.02);
          ctx.beginPath(); ctx.arc(0, 0, R * (1.5 + i * 0.18), Math.PI, Math.PI * 2); ctx.stroke();
        }
        ctx.restore();
        // planeta
        const pg = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.4 + drift, R * 0.1, cx, cy + drift, R);
        pg.addColorStop(0, '#8a6fe0');
        pg.addColorStop(0.5, '#5b3fae');
        pg.addColorStop(0.85, '#2a1d63');
        pg.addColorStop(1, '#150f38');
        ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(cx, cy + drift, R, 0, 7); ctx.fill();
        // bandas sutiles
        ctx.save();
        ctx.beginPath(); ctx.arc(cx, cy + drift, R, 0, 7); ctx.clip();
        ctx.globalCompositeOperation = 'overlay';
        for (let i = 0; i < 6; i++) {
          ctx.fillStyle = rgba(255, 255, 255, 0.04);
          const by = cy + drift - R + (i / 6) * 2 * R + Math.sin(t * 0.3 + i) * 4;
          ctx.fillRect(cx - R, by, 2 * R, R * 0.12);
        }
        ctx.restore();
        // anillos delante
        ctx.save();
        ctx.translate(cx, cy + drift); ctx.rotate(-0.42); ctx.scale(1, 0.32);
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = rgba(235, 220, 245, 0.22 - i * 0.05);
          ctx.lineWidth = R * (0.10 - i * 0.02);
          ctx.beginPath(); ctx.arc(0, 0, R * (1.5 + i * 0.18), 0, Math.PI); ctx.stroke();
        }
        ctx.restore();
      }
    };
  }

  /* Amanecer Cósmico: limbo terrestre con arco atmosférico y sol naciente. */
  function sunrisePreset() {
    return {
      id: 'amanecer', name: 'Amanecer Cósmico', _cache: {},
      prepare(W, H) {
        const k = W + 'x' + H;
        if (!this._cache[k]) this._cache[k] = { stars: buildStars(W, H, 260, 33) };
        return this._cache[k];
      },
      paint(ctx, W, H, t, c) {
        const bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, '#02030a'); bg.addColorStop(0.6, '#050414'); bg.addColorStop(1, '#0a0820');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        drawStars(ctx, c.stars, W, H, t, 0);

        // limbo terrestre curvo en la parte inferior
        const er = W * 1.7;
        const ecx = W * 0.5, ecy = H + er - H * 0.18;
        // resplandor atmosférico (arco)
        ctx.save();
        ctx.beginPath(); ctx.arc(ecx, ecy, er + H * 0.05, 0, 7); ctx.clip();
        ctx.beginPath(); ctx.arc(ecx, ecy, er, 0, 7);
        ctx.globalCompositeOperation = 'lighter';
        const halo = ctx.createRadialGradient(ecx, ecy, er, ecx, ecy, er + H * 0.16);
        halo.addColorStop(0, rgba(255, 180, 120, 0.0));
        halo.addColorStop(0.5, rgba(255, 170, 110, 0.22));
        halo.addColorStop(1, rgba(120, 150, 255, 0));
        ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);
        ctx.restore();

        // sol naciente
        const sx = W * 0.34, sy = H * 0.80 - Math.sin(t * 0.25) * H * 0.012;
        const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, W * 0.5);
        sg.addColorStop(0, rgba(255, 245, 220, 0.95));
        sg.addColorStop(0.06, rgba(255, 220, 150, 0.7));
        sg.addColorStop(0.25, rgba(255, 150, 90, 0.18));
        sg.addColorStop(1, rgba(255, 120, 80, 0));
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, W * 0.5, 0, 7); ctx.fill();
        ctx.restore();

        // tierra (oscura)
        ctx.beginPath(); ctx.arc(ecx, ecy, er, 0, 7);
        const eg = ctx.createRadialGradient(sx, sy, 0, ecx, ecy, er * 0.5);
        eg.addColorStop(0, '#241433');
        eg.addColorStop(0.5, '#0d0a22');
        eg.addColorStop(1, '#050410');
        ctx.fillStyle = eg; ctx.fill();
        // borde iluminado
        ctx.save();
        ctx.beginPath(); ctx.arc(ecx, ecy, er, 0, 7); ctx.clip();
        ctx.beginPath(); ctx.arc(ecx, ecy, er - H * 0.012, 0, 7);
        ctx.lineWidth = H * 0.012;
        const rimg = ctx.createLinearGradient(0, H * 0.55, 0, H * 0.9);
        rimg.addColorStop(0, rgba(255, 200, 150, 0.7));
        rimg.addColorStop(1, rgba(255, 160, 110, 0));
        ctx.strokeStyle = rimg; ctx.beginPath(); ctx.arc(ecx, ecy, er, Math.PI, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }
    };
  }

  /* ---- Construcción del registro de presets ---- */
  const PRESETS = {
    'nebula-violeta': nebulaPreset('nebula-violeta', 'Nebulosa Violeta', {
      base0: '#0a0614', base1: '#15081f', base0n: [10, 6, 20],
      clouds: [[150, 70, 220], [220, 90, 180], [110, 80, 230], [80, 60, 180]],
      coreCol: [220, 150, 255], cloudCount: 90, cloudAlpha: 0.11, cores: 3, dust: 20, seed: 3, starCount: 280
    }),
    'vialactea': milkyWayPreset(),
    'aurora': auroraPreset(),
    'galaxia': galaxyPreset(),
    'nebula-zafiro': nebulaPreset('nebula-zafiro', 'Nebulosa Zafiro', {
      base0: '#040814', base1: '#06122b', base0n: [4, 8, 20],
      clouds: [[60, 130, 240], [40, 180, 230], [90, 110, 220], [50, 90, 200]],
      coreCol: [150, 210, 255], cloudCount: 85, cloudAlpha: 0.11, cores: 3, dust: 18, seed: 14, starCount: 300
    }),
    'nebula-dorada': nebulaPreset('nebula-dorada', 'Nebulosa Dorada', {
      base0: '#120a06', base1: '#1f1106', base0n: [18, 10, 6],
      clouds: [[255, 170, 80], [240, 110, 70], [220, 80, 120], [200, 140, 90]],
      coreCol: [255, 210, 150], cloudCount: 90, cloudAlpha: 0.10, cores: 3, dust: 20, seed: 27, starCount: 260
    }),
    'meteoros': meteorsPreset(),
    'planeta': planetPreset(),
    'amanecer': sunrisePreset(),
    'nebula-esmeralda': nebulaPreset('nebula-esmeralda', 'Nebulosa Esmeralda', {
      base0: '#04120c', base1: '#06251a', base0n: [4, 18, 12],
      clouds: [[60, 220, 150], [40, 200, 200], [120, 230, 120], [60, 180, 160]],
      coreCol: [170, 255, 210], cloudCount: 85, cloudAlpha: 0.10, cores: 3, dust: 18, seed: 41, starCount: 280
    })
  };

  /* Preset dinámico para imágenes subidas por el usuario (Ken Burns + estrellas). */
  function imagePreset(id, imgEl) {
    return {
      id, name: 'Imagen propia', _img: imgEl, _cache: {},
      prepare(W, H) {
        const k = W + 'x' + H;
        if (!this._cache[k]) this._cache[k] = { stars: buildStars(W, H, 120, 9) };
        return this._cache[k];
      },
      paint(ctx, W, H, t, c) {
        const img = this._img;
        ctx.fillStyle = '#05060c'; ctx.fillRect(0, 0, W, H);
        if (img && img.complete && img.naturalWidth) {
          // cover + Ken Burns (zoom/pan lento dependiente de t)
          const zoom = 1.08 + Math.sin(t * 0.12) * 0.04;
          const panX = Math.sin(t * 0.1) * W * 0.02;
          const panY = Math.cos(t * 0.08) * H * 0.02;
          const iw = img.naturalWidth, ih = img.naturalHeight;
          const scale = Math.max(W / iw, H / ih) * zoom;
          const dw = iw * scale, dh = ih * scale;
          ctx.drawImage(img, (W - dw) / 2 + panX, (H - dh) / 2 + panY, dw, dh);
        }
        // velo de estrellas tenue para integrar con el sistema
        ctx.save(); ctx.globalAlpha = 0.5;
        drawStars(ctx, c.stars, W, H, t, 0);
        ctx.restore();
      }
    };
  }

  /* Preset dinámico para clips de video subidos (compone el cuadro actual). */
  function videoPreset(id, videoEl) {
    return {
      id, name: 'Video', isVideo: true, _video: videoEl, _cache: {},
      prepare(W, H) {
        const k = W + 'x' + H;
        if (!this._cache[k]) this._cache[k] = { stars: buildStars(W, H, 60, 9) };
        return this._cache[k];
      },
      paint(ctx, W, H, t, c) {
        const v = this._video;
        ctx.fillStyle = '#05060c'; ctx.fillRect(0, 0, W, H);
        if (v && v.readyState >= 2 && v.videoWidth) {
          const scale = Math.max(W / v.videoWidth, H / v.videoHeight);
          const dw = v.videoWidth * scale, dh = v.videoHeight * scale;
          try { ctx.drawImage(v, (W - dw) / 2, (H - dh) / 2, dw, dh); } catch (e) {}
        }
      },
      /* Para exportación determinista: posiciona el video en el tiempo t. */
      seekTo(t) {
        const v = this._video;
        const dur = v.duration && isFinite(v.duration) ? v.duration : 5;
        const ct = Math.min(dur - 0.05, t % dur);
        return new Promise((res) => {
          let done = false;
          const on = () => { if (done) return; done = true; v.removeEventListener('seeked', on); res(); };
          v.addEventListener('seeked', on);
          try { v.currentTime = ct; } catch (e) { on(); }
          setTimeout(on, 350);
        });
      }
    };
  }

  window.Backgrounds = {
    presets: PRESETS,
    get(id) { return PRESETS[id]; },
    imagePreset,
    videoPreset,
    buildStars, drawStars
  };
})();
