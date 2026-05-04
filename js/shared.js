(function() {
'use strict';

const isTouch = () => window.matchMedia('(hover:none),(pointer:coarse)').matches;

/* ── CURSOR ── */
function initCursor() {
  if (isTouch()) return;
  const cd = document.querySelector('.cur-d');
  const cr = document.querySelector('.cur-r');
  if (!cd || !cr) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    cd.style.left=mx+'px'; cd.style.top=my+'px';
  });
  document.addEventListener('mousedown', ()=>cr.classList.add('c'));
  document.addEventListener('mouseup',   ()=>cr.classList.remove('c'));
  document.querySelectorAll('a,button,.plan-card,.val-card,.carrier-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>cr.classList.add('h'));
    el.addEventListener('mouseleave',()=>cr.classList.remove('h'));
  });
  (function loop(){
    rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
    cr.style.left=rx+'px'; cr.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
}

/* ── SCROLL PROGRESS ── */
function initProgress() {
  const sp = document.getElementById('sp');
  if (!sp) return;
  window.addEventListener('scroll', ()=>{
    const h = document.documentElement;
    sp.style.width = Math.min(h.scrollTop/(h.scrollHeight-h.clientHeight)*100,100)+'%';
  }, {passive:true});
}

/* ── NAV SCROLL STATE ── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const upd = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', upd, {passive:true});
  upd();
  // Active link highlighting
  const pg = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nlk[href]').forEach(a => {
    const base = (a.getAttribute('href')||'').split('#')[0].split('/').pop();
    if (pg===base||(pg===''&&base==='index.html')) a.classList.add('active');
  });
}

/* ── DROPDOWN — CLICK ONLY ──
   No hover. No CSS transitions on hide.
   display:none = closed. class "open" = open.
   Cannot flash. Cannot auto-open. Period.
*/
function initDropdown() {
  const btn  = document.getElementById('dd-btn');
  const menu = document.getElementById('dd-menu');
  const chev = document.getElementById('dd-chev');
  if (!btn || !menu) return;

  function openDD() {
    menu.classList.add('open');
    btn.setAttribute('aria-expanded','true');
    if (chev) chev.style.transform = 'rotate(90deg)';
  }
  function closeDD() {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    if (chev) chev.style.transform = '';
  }

  // Toggle on click only — never on hover
  btn.addEventListener('click', e => {
    e.stopPropagation();
    menu.classList.contains('open') ? closeDD() : openDD();
  });

  // Close when a link inside is clicked
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDD));

  // Close on any outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) closeDD();
  });

  // Close on Escape
  document.addEventListener('keydown', e => { if (e.key==='Escape') closeDD(); });

  // Close on scroll (so it doesn't hang open while user scrolls away)
  window.addEventListener('scroll', closeDD, {passive:true});
}

/* ── MOBILE NAV ── */
function initMobileNav() {
  const ham = document.getElementById('nav-ham');
  const mob = document.getElementById('mob-nav');
  if (!ham || !mob) return;

  function openMob() {
    ham.classList.add('open');
    ham.setAttribute('aria-expanded','true');
    mob.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMob() {
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded','false');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  }

  ham.addEventListener('click', () => ham.classList.contains('open') ? closeMob() : openMob());
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));
  document.addEventListener('keydown', e => { if (e.key==='Escape') closeMob(); });
}

/* ── SCROLL REVEALS ── */
function initReveals() {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.r').forEach(el => ro.observe(el));
}

/* ── COUNTERS ── */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const isF = String(el.dataset.count).includes('.');
  const dur = 2000; const t0 = performance.now();
  (function frame(t) {
    const p = Math.min((t-t0)/dur,1);
    const ease = 1-Math.pow(1-p,3);
    el.textContent = prefix+(isF?(target*ease).toFixed(1):Math.floor(target*ease).toLocaleString())+suffix;
    if (p<1) requestAnimationFrame(frame);
  })(performance.now());
}
function initCounters() {
  const co = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){countUp(e.target);co.unobserve(e.target);} });
  }, {threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(el => co.observe(el));
}

/* ── 3D TILT ── */
function initTilt() {
  if (isTouch()) return;
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX-r.left-r.width/2)/(r.width/2);
      const dy = (e.clientY-r.top-r.height/2)/(r.height/2);
      card.style.transform = `perspective(800px) rotateX(${dy*-4}deg) rotateY(${dx*4}deg) translateZ(4px)`;
      card.style.transition = 'transform .05s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1)';
    });
  });
}

/* ── PARALLAX ── */
function initParallax() {
  if (isTouch()) return;
  const hbg = document.querySelector('.hero-bg, .pg-hero-bg');
  if (!hbg) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight*1.4)
      hbg.style.transform = `translateY(${window.scrollY*0.18}px)`;
  }, {passive:true});
}

/* ── PARTICLES ── */
function initParticles() {
  if (isTouch()) return;
  const pw = document.querySelector('.hero-ptcl');
  if (!pw) return;
  for (let i=0; i<16; i++) {
    const p = document.createElement('span');
    p.className = 'ptcl';
    p.style.cssText = [
      `left:${Math.random()*55}%`,
      `bottom:${Math.random()*50}%`,
      `width:${1+Math.random()*2}px`,
      `height:${1+Math.random()*2}px`,
      `animation-duration:${10+Math.random()*14}s`,
      `animation-delay:${Math.random()*10}s`
    ].join(';');
    pw.appendChild(p);
  }
}

/* ── BACK TO TOP ── */
function initBTT() {
  const btt = document.getElementById('btt');
  if (!btt) return;
  window.addEventListener('scroll', () => btt.classList.toggle('vis', window.scrollY>500), {passive:true});
  btt.addEventListener('click', e => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });
}

/* ── FAQ ── */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      const list = item.closest('.faq-list,.faq-section');
      list?.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ── SMOOTH ANCHORS ── */
function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
    });
  });
}

/* ── INIT ── */
function init() {
  initCursor();
  initProgress();
  initNav();
  initDropdown();
  initMobileNav();
  initReveals();
  initCounters();
  initTilt();
  initParallax();
  initParticles();
  initBTT();
  initFAQ();
  initAnchors();
}

if (document.readyState==='loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();
