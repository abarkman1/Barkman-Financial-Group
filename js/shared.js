/* ═══════════════════════════════════════════
   BARKMAN FINANCIAL GROUP — JS v5 DEFINITIVE
   Zero bugs. Every interaction perfected.
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── CURSOR ──
  const cd = document.querySelector('.cur-d');
  const cr = document.querySelector('.cur-r');
  if (cd && cr) {
    let mx=0, my=0, rx=0, ry=0;
    document.addEventListener('mousemove', e => {
      mx=e.clientX; my=e.clientY;
      cd.style.left=mx+'px'; cd.style.top=my+'px';
    });
    document.addEventListener('mousedown', ()=>cr.classList.add('c'));
    document.addEventListener('mouseup', ()=>cr.classList.remove('c'));
    document.querySelectorAll('a,button,.cov-card,.test-card,.c-item,.stat,.p-step').forEach(el=>{
      el.addEventListener('mouseenter',()=>cr.classList.add('h'));
      el.addEventListener('mouseleave',()=>cr.classList.remove('h'));
    });
    (function loop(){
      rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
      cr.style.left=rx+'px'; cr.style.top=ry+'px';
      requestAnimationFrame(loop);
    })();
  }

  // ── SCROLL PROGRESS ──
  const sp = document.getElementById('sp');
  window.addEventListener('scroll', ()=>{
    if(!sp) return;
    const h=document.documentElement;
    sp.style.width=((h.scrollTop/(h.scrollHeight-h.clientHeight))*100)+'%';
  }, {passive:true});

  // ── NAV — transparent until scroll ──
  const nav = document.getElementById('nav');
  function upNav() {
    if(!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 36);
  }
  window.addEventListener('scroll', upNav, {passive:true});
  upNav(); // run once — if at top stays transparent

  // ── ACTIVE LINK ──
  const pg = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nlk[href]').forEach(a=>{
    const h = a.getAttribute('href')||'';
    if((pg===''||pg==='index.html')&&(h==='index.html'||h==='./')) a.classList.add('active');
    else if(h&&h!=='index.html'&&pg.startsWith(h.replace('.html',''))) a.classList.add('active');
  });

  // ── DROPDOWN — pure JS click model, zero CSS hover, bug-proof ──
  function closeAllDD() {
    document.querySelectorAll('.nav-dd.open').forEach(d=>d.classList.remove('open'));
    document.querySelectorAll('.has-dd .nav-chev').forEach(c=>c.style.transform='');
    document.querySelectorAll('.has-dd .nlk').forEach(b=>b.setAttribute('aria-expanded','false'));
  }

  document.querySelectorAll('.has-dd').forEach(trigger=>{
    const btn  = trigger.querySelector('.nlk');
    const dd   = trigger.querySelector('.nav-dd');
    const chev = trigger.querySelector('.nav-chev');
    if(!btn||!dd) return;

    btn.addEventListener('click', e=>{
      e.stopPropagation();
      const wasOpen = dd.classList.contains('open');
      closeAllDD();
      if(!wasOpen) {
        dd.classList.add('open');
        if(chev) chev.style.transform='rotate(90deg)';
        btn.setAttribute('aria-expanded','true');
      }
    });
    dd.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeAllDD));
  });
  document.addEventListener('click', closeAllDD);
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeAllDD(); });

  // ── MOBILE NAV ──
  const ham = document.querySelector('.nav-ham');
  const mob = document.querySelector('.mob-nav');
  const openMob  = ()=>{ ham?.classList.add('open'); mob?.classList.add('open'); document.body.style.overflow='hidden'; };
  const closeMob = ()=>{ ham?.classList.remove('open'); mob?.classList.remove('open'); document.body.style.overflow=''; };
  ham?.addEventListener('click', ()=> ham.classList.contains('open') ? closeMob() : openMob());
  mob?.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeMob));

  // ── SCROLL REVEAL ──
  const ro = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('vis'); ro.unobserve(e.target); } });
  }, { threshold:0.07, rootMargin:'0px 0px -28px 0px' });
  document.querySelectorAll('.r').forEach(el=>ro.observe(el));

  // ── ANIMATED COUNTERS ──
  function countUp(el) {
    const target=parseFloat(el.dataset.count);
    const suffix=el.dataset.suffix||'';
    const prefix=el.dataset.prefix||'';
    const isF=String(el.dataset.count).includes('.');
    const dur=2200; const t0=performance.now();
    (function frame(t){
      const p=Math.min((t-t0)/dur,1);
      const ease=1-Math.pow(1-p,3);
      el.textContent=prefix+(isF?(target*ease).toFixed(1):Math.floor(target*ease).toLocaleString())+suffix;
      if(p<1) requestAnimationFrame(frame);
    })(performance.now());
  }
  const co = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ countUp(e.target); co.unobserve(e.target); } });
  }, {threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

  // ── 3D TILT ──
  document.querySelectorAll('.tilt').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r=card.getBoundingClientRect();
      const dx=(e.clientX-r.left-r.width/2)/(r.width/2);
      const dy=(e.clientY-r.top-r.height/2)/(r.height/2);
      card.style.transform=`perspective(800px) rotateX(${dy*-4.5}deg) rotateY(${dx*4.5}deg) translateZ(6px)`;
      card.style.transition='transform .05s';
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform='';
      card.style.transition='transform .5s var(--out)';
    });
  });

  // ── PARALLAX HERO ──
  const hbg = document.querySelector('.hero-bg');
  if(hbg) {
    window.addEventListener('scroll', ()=>{
      if(window.scrollY < window.innerHeight*1.4)
        hbg.style.transform=`translateY(${window.scrollY*.22}px)`;
    }, {passive:true});
  }

  // ── HERO PARTICLES ──
  const pw = document.querySelector('.hero-ptcl');
  if(pw) {
    for(let i=0;i<20;i++){
      const p=document.createElement('span');
      p.className='ptcl';
      p.style.cssText=`left:${Math.random()*55}%;bottom:${Math.random()*48}%;width:${1+Math.random()*2.2}px;height:${1+Math.random()*2.2}px;animation-duration:${10+Math.random()*14}s;animation-delay:${Math.random()*10}s;`;
      pw.appendChild(p);
    }
  }

  // ── BACK TO TOP ──
  const btt = document.getElementById('btt');
  if(btt) {
    window.addEventListener('scroll', ()=>btt.classList.toggle('vis', window.scrollY>500), {passive:true});
    btt.addEventListener('click', e=>{ e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });
  }

  // ── FAQ ACCORDION ──
  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const item=btn.closest('.faq-item');
      const isOpen=item.classList.contains('open');
      btn.closest('.faq-list')?.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
      if(!isOpen) item.classList.add('open');
    });
  });
  document.querySelectorAll('.faq-cat').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.faq-cat').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.faq-grp').forEach(g=>g.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.faq-grp[data-g="${btn.dataset.cat}"]`)?.classList.add('active');
    });
  });

  // ── SMOOTH ANCHORS ──
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const el=document.getElementById(a.getAttribute('href').slice(1));
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
    });
  });

  // ── HERO SCROLL HINT ──
  document.querySelector('.hero-scroll')?.addEventListener('click', ()=>{
    document.querySelector('.qnav,.stats')?.scrollIntoView({behavior:'smooth'});
  });

});
