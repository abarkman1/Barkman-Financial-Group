/* ============================================================
   BARKMAN FINANCIAL GROUP — shared.js
   No DOM injection. Nav and footer are hardcoded in HTML.
   This file handles interactions only.
============================================================ */
(function () {
  'use strict';

  const touch = () => window.matchMedia('(hover:none),(pointer:coarse)').matches;

  /* ── CURSOR ── */
  function initCursor() {
    if (touch()) return;
    const dot  = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    document.addEventListener('mousedown', () => ring.classList.add('press'));
    document.addEventListener('mouseup',   () => ring.classList.remove('press'));
    document.querySelectorAll('a, button, .card-white, .card-forest, .division-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
    (function loop() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();
  }

  /* ── SCROLL PROGRESS ── */
  function initProgress() {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const d = document.documentElement;
      bar.style.width = Math.min(d.scrollTop / (d.scrollHeight - d.clientHeight) * 100, 100) + '%';
    }, { passive: true });
  }

  /* ── NAV SCROLL STATE ── */
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', update, { passive: true });
    update();
    // Active link
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[href]').forEach(a => {
      const href = (a.getAttribute('href') || '').split('#')[0].split('/').pop();
      if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
    });
  }

  /* ── DROPDOWN — CLICK ONLY ──
     Closed = display:none (set in CSS, never overridden here)
     Open   = class 'open' added by this code
     Closes on: outside click, Escape key, scroll, link click inside
     NEVER opens automatically. NEVER on hover.
  */
  function initDropdown() {
    const toggle = document.getElementById('dd-toggle');
    const menu   = document.getElementById('dd-menu');
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function open() {
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      menu.classList.contains('open') ? close() : open();
    });

    // Close on any link inside the dropdown
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    // Close on outside click
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) close();
    });

    // Close on Escape
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    // Close on scroll — prevents dropdown hanging open while user scrolls
    window.addEventListener('scroll', close, { passive: true });
  }

  /* ── MOBILE NAV ── */
  function initMobile() {
    const ham = document.getElementById('nav-ham');
    const mob = document.getElementById('mob-overlay');
    if (!ham || !mob) return;

    function close() {
      ham.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
      mob.classList.remove('open');
      document.body.style.overflow = '';
    }
    function open() {
      ham.classList.add('open');
      ham.setAttribute('aria-expanded', 'true');
      mob.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    ham.addEventListener('click', () => ham.classList.contains('open') ? close() : open());
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ── SCROLL REVEALS ── */
  function initReveals() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  /* ── COUNTERS ── */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const isFloat = String(el.dataset.count).includes('.');
    const dur = 2200, t0 = performance.now();
    (function frame(t) {
      const p    = Math.min((t - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val  = isFloat ? (target * ease).toFixed(1) : Math.floor(target * ease).toLocaleString();
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(frame);
    })(performance.now());
  }
  function initCounters() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
  }

  /* ── PARALLAX ── */
  function initParallax() {
    if (touch()) return;
    const el = document.querySelector('.parallax-bg');
    if (!el) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight * 1.5)
        el.style.transform = `translateY(${window.scrollY * 0.16}px)`;
    }, { passive: true });
  }

  /* ── 3D TILT ── */
  function initTilt() {
    if (touch()) return;
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
        const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
        card.style.transform  = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) translateZ(6px)`;
        card.style.transition = 'transform .04s';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform .6s cubic-bezier(0.16,1,0.3,1)';
      });
    });
  }

  /* ── BACK TO TOP ── */
  function initBackTop() {
    const btn = document.getElementById('back-top');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 600), { passive: true });
    btn.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ── FAQ ── */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item   = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        const wrap   = item.closest('.faq-wrap');
        wrap?.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ── SMOOTH ANCHORS ── */
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const el = document.getElementById(a.getAttribute('href').slice(1));
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  /* ── INIT ── */
  function boot() {
    initCursor();
    initProgress();
    initNav();
    initDropdown();
    initMobile();
    initReveals();
    initCounters();
    initParallax();
    initTilt();
    initBackTop();
    initFAQ();
    initAnchors();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();

})();
