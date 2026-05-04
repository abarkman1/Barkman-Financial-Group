/* Barkman Financial Group - main.js */
/* ASCII only - no special characters */
(function () {
  'use strict';

  var touch = function() { return window.matchMedia('(hover:none),(pointer:coarse)').matches; };

  /* Cursor */
  function initCursor() {
    if (touch()) return;
    var dot  = document.getElementById('cur-dot');
    var ring = document.getElementById('cur-ring');
    if (!dot || !ring) return;
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function(e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    document.addEventListener('mousedown', function() { ring.classList.add('press'); });
    document.addEventListener('mouseup',   function() { ring.classList.remove('press'); });
    document.querySelectorAll('a, button, .division-card').forEach(function(el) {
      el.addEventListener('mouseenter', function() { ring.classList.add('hover'); });
      el.addEventListener('mouseleave', function() { ring.classList.remove('hover'); });
    });
    (function loop() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();
  }

  /* Progress bar */
  function initProgress() {
    var bar = document.getElementById('progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', function() {
      var d = document.documentElement;
      bar.style.width = Math.min(d.scrollTop / (d.scrollHeight - d.clientHeight) * 100, 100) + '%';
    }, { passive: true });
  }

  /* Nav scroll state */
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    function update() { nav.classList.toggle('scrolled', window.scrollY > 50); }
    window.addEventListener('scroll', update, { passive: true });
    update();
    /* Active link */
    var page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[href]').forEach(function(a) {
      var href = (a.getAttribute('href') || '').split('#')[0].split('/').pop();
      if (href === page || (page === '' && href === 'index.html')) { a.classList.add('active'); }
    });
  }

  /* Dropdown - click only, never auto-opens */
  function initDropdown() {
    var toggle = document.getElementById('dd-toggle');
    var menu   = document.getElementById('dd-menu');
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function open() {
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.classList.contains('open') ? close() : open();
    });

    menu.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', close); });
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) { close(); }
    });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') { close(); } });
    window.addEventListener('scroll', close, { passive: true });
  }

  /* Mobile nav */
  function initMobile() {
    var ham = document.getElementById('nav-ham');
    var mob = document.getElementById('mob-overlay');
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

    ham.addEventListener('click', function() { ham.classList.contains('open') ? close() : open(); });
    mob.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') { close(); } });
  }

  /* Scroll reveals */
  function initReveals() {
    if (!window.IntersectionObserver) {
      document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
  }

  /* Counters */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var isFloat = String(el.dataset.count).indexOf('.') !== -1;
    var dur = 2200, t0 = performance.now();
    function frame(t) {
      var p    = Math.min((t - t0) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      var val  = isFloat ? (target * ease).toFixed(1) : Math.floor(target * ease).toLocaleString();
      el.textContent = prefix + val + suffix;
      if (p < 1) { requestAnimationFrame(frame); }
    }
    requestAnimationFrame(frame);
  }
  function initCounters() {
    if (!window.IntersectionObserver) return;
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) { countUp(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach(function(el) { io.observe(el); });
  }

  /* Parallax */
  function initParallax() {
    if (touch()) return;
    var el = document.querySelector('.hero-bg');
    if (!el) return;
    window.addEventListener('scroll', function() {
      if (window.scrollY < window.innerHeight * 1.5) {
        el.style.transform = 'translateY(' + (window.scrollY * 0.16) + 'px)';
      }
    }, { passive: true });
  }

  /* Back to top */
  function initBackTop() {
    var btn = document.getElementById('back-top');
    if (!btn) return;
    window.addEventListener('scroll', function() {
      btn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* FAQ */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var item   = btn.closest('.faq-item');
        var isOpen = item.classList.contains('open');
        var wrap   = item.closest('.faq-wrap');
        if (wrap) { wrap.querySelectorAll('.faq-item.open').forEach(function(i) { i.classList.remove('open'); }); }
        if (!isOpen) { item.classList.add('open'); }
      });
    });
  }

  /* Smooth anchors */
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var id = a.getAttribute('href').slice(1);
        var el = document.getElementById(id);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  /* Boot */
  function boot() {
    initCursor();
    initProgress();
    initNav();
    initDropdown();
    initMobile();
    initReveals();
    initCounters();
    initParallax();
    initBackTop();
    initFAQ();
    initAnchors();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
