/* ═══════════════════════════════════════════════════════
   BARKMAN FINANCIAL GROUP — SHARED JS v7
   FIXES:
   - Dropdown: pure click model, never sticks open
   - Double logo: nav-bg positioned correctly
   - Cursor: desktop only, proper touch detection
   - All previous interactions preserved + improved
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════════════════════════
  // CURSOR — desktop only
  // ══════════════════════════════════════
  const isTouch = window.matchMedia('(hover:none),(pointer:coarse)').matches;
  const cd = document.querySelector('.cur-d');
  const cr = document.querySelector('.cur-r');

  if (cd && cr) {
    if (isTouch) {
      // Touch device — hide cursors, restore default
      cd.style.display = 'none';
      cr.style.display = 'none';
      document.body.style.cursor = 'auto';
    } else {
      // Desktop — activate custom cursor
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cd.style.left = mx + 'px';
        cd.style.top  = my + 'px';
      });
      document.addEventListener('mousedown', () => cr.classList.add('c'));
      document.addEventListener('mouseup',   () => cr.classList.remove('c'));

      // Hover expand on interactive elements
      const interactors = 'a,button,.cov-card,.test-card,.fe-test,.c-item,.stat,.fe-carrier,.fe-q-type,.process-step,.p-step';
      document.querySelectorAll(interactors).forEach(el => {
        el.addEventListener('mouseenter', () => cr.classList.add('h'));
        el.addEventListener('mouseleave', () => cr.classList.remove('h'));
      });

      (function loop() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        cr.style.left = rx + 'px';
        cr.style.top  = ry + 'px';
        requestAnimationFrame(loop);
      })();
    }
  }

  // ══════════════════════════════════════
  // SCROLL PROGRESS
  // ══════════════════════════════════════
  const sp = document.getElementById('scroll-progress');
  if (sp) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      sp.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  // ══════════════════════════════════════
  // NAV — transparent until scroll
  // ══════════════════════════════════════
  const nav   = document.getElementById('nav');
  const navBg = document.getElementById('nav-bg');

  function updateNav() {
    const scrolled = window.scrollY > 40;
    nav?.classList.toggle('scrolled', scrolled);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ══════════════════════════════════════
  // ACTIVE NAV LINK
  // ══════════════════════════════════════
  const pg = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nlk[href]').forEach(a => {
    const h = a.getAttribute('href') || '';
    const base = h.split('#')[0].split('/').pop();
    if (pg === base || (pg === '' && base === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ══════════════════════════════════════
  // DROPDOWN — PURE JS CLICK MODEL
  // Bug fix: zero CSS :hover, completely
  // click-controlled. Closes on:
  //   • outside click
  //   • Escape key
  //   • second click on trigger
  //   • any dropdown link click
  //   • scroll (UX improvement)
  // ══════════════════════════════════════
  const ddBtn     = document.getElementById('dd-btn');
  const ddMenu    = document.getElementById('dd-menu');
  const ddTrigger = document.getElementById('dd-trigger');
  const ddChev    = ddBtn?.querySelector('.nav-chev');

  function ddOpen() {
    ddMenu?.classList.add('open');
    ddBtn?.setAttribute('aria-expanded', 'true');
    if (ddChev) ddChev.style.transform = 'rotate(90deg)';
  }
  function ddClose() {
    ddMenu?.classList.remove('open');
    ddBtn?.setAttribute('aria-expanded', 'false');
    if (ddChev) ddChev.style.transform = '';
  }
  function ddIsOpen() {
    return ddMenu?.classList.contains('open') ?? false;
  }

  // Toggle on button click
  ddBtn?.addEventListener('click', e => {
    e.stopPropagation();
    ddIsOpen() ? ddClose() : ddOpen();
  });

  // Close on any link inside dropdown
  ddMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => ddClose());
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (ddTrigger && !ddTrigger.contains(e.target)) ddClose();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') ddClose();
  });

  // Close on scroll (prevents stuck-open on scroll)
  window.addEventListener('scroll', () => ddClose(), { passive: true });

  // ══════════════════════════════════════
  // MOBILE NAV
  // ══════════════════════════════════════
  const ham    = document.getElementById('nav-ham');
  const mobNav = document.getElementById('mob-nav');

  function openMob() {
    ham?.classList.add('open');
    ham?.setAttribute('aria-expanded', 'true');
    mobNav?.classList.add('open');
    mobNav?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMob() {
    ham?.classList.remove('open');
    ham?.setAttribute('aria-expanded', 'false');
    mobNav?.classList.remove('open');
    mobNav?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  ham?.addEventListener('click', () => ham.classList.contains('open') ? closeMob() : openMob());
  mobNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMob(); });

  // ══════════════════════════════════════
  // SCROLL REVEAL
  // ══════════════════════════════════════
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });

  document.querySelectorAll('.r').forEach(el => ro.observe(el));

  // ══════════════════════════════════════
  // COUNTER ANIMATION
  // ══════════════════════════════════════
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const isF    = String(el.dataset.count).includes('.');
    const dur    = 2000;
    const t0     = performance.now();

    function frame(t) {
      const p    = Math.min((t - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const v    = target * ease;
      el.textContent = prefix + (isF ? v.toFixed(1) : Math.floor(v).toLocaleString()) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { countUp(e.target); co.unobserve(e.target); }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => co.observe(el));

  // ══════════════════════════════════════
  // 3D CARD TILT — desktop only
  // ══════════════════════════════════════
  if (!isTouch) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
        const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
        card.style.transform  = `perspective(800px) rotateX(${dy * -4}deg) rotateY(${dx * 4}deg) translateZ(5px)`;
        card.style.transition = 'transform .05s';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform .5s var(--out)';
      });
    });
  }

  // ══════════════════════════════════════
  // PARALLAX HERO (desktop only)
  // ══════════════════════════════════════
  if (!isTouch) {
    const hbg = document.querySelector('.hero-bg, .fe-hero-bg');
    if (hbg) {
      window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight * 1.4) {
          hbg.style.transform = `translateY(${window.scrollY * 0.22}px)`;
        }
      }, { passive: true });
    }
  }

  // ══════════════════════════════════════
  // HERO PARTICLES
  // ══════════════════════════════════════
  const pw = document.querySelector('.hero-ptcl, .fe-hero-ptcl');
  if (pw && !isTouch) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('span');
      p.className = 'ptcl';
      p.style.cssText = [
        `left:${Math.random() * 55}%`,
        `bottom:${Math.random() * 48}%`,
        `width:${1 + Math.random() * 2}px`,
        `height:${1 + Math.random() * 2}px`,
        `animation-duration:${10 + Math.random() * 14}s`,
        `animation-delay:${Math.random() * 10}s`
      ].join(';');
      pw.appendChild(p);
    }
  }

  // ══════════════════════════════════════
  // BACK TO TOP
  // ══════════════════════════════════════
  const btt = document.getElementById('btt');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('vis', window.scrollY > 500);
    }, { passive: true });
    btt.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ══════════════════════════════════════
  // FAQ ACCORDION
  // ══════════════════════════════════════
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all in same group
      btn.closest('.faq-list')?.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // FAQ category tabs
  document.querySelectorAll('.faq-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.faq-cat').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.faq-grp').forEach(g => g.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.faq-grp[data-g="${btn.dataset.cat}"]`)?.classList.add('active');
    });
  });

  // ══════════════════════════════════════
  // SMOOTH ANCHOR SCROLL
  // ══════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
