/* ═════════════════════════════════════════════
   BARKMAN FINANCIAL GROUP — SHARED JS v3
   Dropdown: JS click-model (bug fixed).
   Cursor, parallax, reveals, counters, tilt.
═════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── CURSOR ──
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    document.addEventListener('mousedown', () => ring.classList.add('clicking'));
    document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));
    const interactives = 'a,button,.coverage-card,.testimonial-card,.carrier-item,[data-hover]';
    document.querySelectorAll(interactives).forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
    (function moveCursor() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(moveCursor);
    })();
  }

  // ── SCROLL PROGRESS ──
  const progress = document.getElementById('scroll-progress');
  function updateProgress() {
    if (!progress) return;
    const h = document.documentElement;
    progress.style.width = ((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  // ── NAV SCROLL STATE ──
  const nav = document.getElementById('nav');
  function updateNav() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ── ACTIVE NAV LINK ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-btn[href]').forEach(a => {
    const href = a.getAttribute('href') || '';
    const isHome = (currentPage === '' || currentPage === 'index.html') && (href === 'index.html' || href === './');
    const isMatch = href && href !== 'index.html' && currentPage.startsWith(href.replace('.html', ''));
    if (isHome || isMatch) a.classList.add('active');
  });

  // ── DROPDOWN — CLICK MODEL, FULLY BUG-FREE ──
  // Closes on: outside click, Escape key, clicking another dropdown
  document.querySelectorAll('.has-dropdown').forEach(trigger => {
    const btn      = trigger.querySelector('.nav-link-btn');
    const dropdown = trigger.querySelector('.nav-dropdown');
    const chevron  = trigger.querySelector('.nav-chevron');
    if (!btn || !dropdown) return;

    function openDropdown() {
      btn.setAttribute('aria-expanded', 'true');
      dropdown.classList.add('open');
      if (chevron) chevron.style.transform = 'rotate(90deg)';
    }
    function closeDropdown() {
      btn.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('open');
      if (chevron) chevron.style.transform = '';
    }
    function isOpen() { return dropdown.classList.contains('open'); }

    btn.addEventListener('click', e => {
      e.stopPropagation();
      // Close all other dropdowns
      document.querySelectorAll('.has-dropdown').forEach(t => {
        if (t !== trigger) {
          t.querySelector('.nav-dropdown')?.classList.remove('open');
          t.querySelector('.nav-link-btn')?.setAttribute('aria-expanded', 'false');
          const c = t.querySelector('.nav-chevron');
          if (c) c.style.transform = '';
        }
      });
      isOpen() ? closeDropdown() : openDropdown();
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!trigger.contains(e.target)) closeDropdown();
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDropdown();
    });

    // Close when a dropdown link is clicked
    dropdown.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeDropdown());
    });
  });

  // ── MOBILE NAV ──
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav-overlay');

  function openMobile()  {
    hamburger?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    mobileNav?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobile() {
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  }
  hamburger?.addEventListener('click', () =>
    hamburger.classList.contains('open') ? closeMobile() : openMobile()
  );
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

  // ── SCROLL REVEAL ──
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ── ANIMATED COUNTERS ──
  function animateCount(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const isFloat  = String(el.dataset.count).includes('.');
    const duration = 2200;
    const start    = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const v = target * ease;
      el.textContent = prefix + (isFloat ? v.toFixed(1) : Math.floor(v).toLocaleString()) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

  // ── COVERAGE TABS (home page) ──
  document.querySelectorAll('[data-tabs]').forEach(group => {
    group.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        group.querySelector(`.tab-panel[data-panel="${target}"]`)?.classList.add('active');
      });
    });
  });

  // ── 3D CARD TILT ──
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const dx  = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      const dy  = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      card.style.transform  = `perspective(900px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg) translateZ(8px)`;
      card.style.transition = 'transform 0.06s, box-shadow 0.06s';
      card.style.boxShadow  = `${-dx * 8}px ${-dy * 8}px 40px rgba(13,59,46,0.12)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.boxShadow  = '';
      card.style.transition = 'transform .55s var(--ease-out), box-shadow .55s var(--ease-out)';
    });
  });

  // ── HERO PARALLAX ──
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight * 1.4)
        heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }, { passive: true });
  }

  // ── HERO PARTICLES ──
  const particleWrap = document.querySelector('.hero-particles');
  if (particleWrap) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      p.style.cssText = `
        left:${Math.random() * 55}%;
        bottom:${Math.random() * 45}%;
        width:${1 + Math.random() * 2.5}px;
        height:${1 + Math.random() * 2.5}px;
        animation-duration:${10 + Math.random() * 14}s;
        animation-delay:${Math.random() * 10}s;
      `;
      particleWrap.appendChild(p);
    }
  }

  // ── HERO SCROLL CLICK ──
  document.querySelector('.hero-scroll')?.addEventListener('click', () => {
    document.querySelector('.stats-ribbon, main > section:nth-child(2)')
      ?.scrollIntoView({ behavior: 'smooth' });
  });

  // ── BACK TO TOP ──
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btt.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── SMOOTH ANCHORS ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── FAQ ACCORDION ──
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      item.closest('.faq-group, .faq-content')
        ?.querySelectorAll('.faq-item')
        .forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── FAQ CATEGORY TABS ──
  document.querySelectorAll('.faq-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.faq-cat-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.faq-group').forEach(g => g.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.faq-group[data-group="${btn.dataset.cat}"]`)?.classList.add('active');
    });
  });

});
