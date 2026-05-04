/* ================================================================
   BARKMAN FINANCIAL GROUP — LAYOUT v9
   Phoenix, AZ · License #22121594
   
   Nav: Solutions dropdown, clean 5-item nav
   Footer: Compliance, license number, Arizona
   No fake email shown. Form routes to backend.
================================================================ */

// Google Analytics — replace GA_MEASUREMENT_ID with your real ID
// from analytics.google.com before launch
(function(){
  if (typeof GA_MEASUREMENT_ID !== 'undefined') {
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }
})();

const _R = (() => {
  const segs = window.location.pathname.split('/').filter(Boolean);
  return segs.length <= 1 ? './' : '../';
})();

const LOGO = `<img src="${_R}BFG_LOGO.png" alt="Barkman Financial Group" width="44" height="44" loading="eager">`;

// ── NAV ────────────────────────────────────────────────
document.body.insertAdjacentHTML('afterbegin', `
<div id="sp" aria-hidden="true"></div>
<div class="cur-d" aria-hidden="true"></div>
<div class="cur-r" aria-hidden="true"></div>
<a href="#pg-top" id="btt" aria-label="Back to top">↑</a>

<!-- Mobile nav — display:none until .open added by JS -->
<div class="mob-nav" id="mob-nav" role="dialog" aria-label="Navigation" aria-modal="true">
  <a href="${_R}index.html"         class="mob-lnk">Home</a>
  <a href="${_R}about.html"         class="mob-lnk">About</a>
  <a href="${_R}medicare.html"      class="mob-lnk">Medicare</a>
  <a href="${_R}final-expense.html" class="mob-lnk">Final Expense</a>
  <a href="${_R}term-life.html"     class="mob-lnk">Term Life</a>
  <a href="${_R}annuities.html"     class="mob-lnk">Annuities</a>
  <a href="${_R}supplemental.html"  class="mob-lnk">Supplemental</a>
  <div class="mob-divider"></div>
  <a href="${_R}careers.html"       class="mob-lnk">Careers</a>
  <a href="${_R}contact.html"       class="mob-lnk">Contact</a>
  <div class="mob-divider"></div>
  <a href="tel:6026800058" class="mob-ph">602-680-0058</a>
  <div class="mob-cta-wrap">
    <a href="${_R}contact.html" class="btn btn-gold" style="font-size:11px;padding:13px 28px;">Get a Free Consultation</a>
  </div>
</div>

<!-- Main nav -->
<nav id="nav" role="navigation" aria-label="Main navigation">
  <div class="nav-bg"></div>
  <div class="nav-in">

    <a href="${_R}index.html" class="nav-logo" aria-label="Barkman Financial Group — Home">
      <div class="logo-img">${LOGO}</div>
      <div class="logo-txt">
        <span class="logo-name">BARKMAN</span>
        <span class="logo-sub">Financial Group</span>
      </div>
    </a>

    <ul class="nav-links" role="list">
      <li><a href="${_R}index.html"  class="nlk">Home</a></li>
      <li><a href="${_R}about.html"  class="nlk">About</a></li>

      <li style="position:relative;">
        <button class="nlk" id="dd-btn" type="button"
          aria-haspopup="true" aria-expanded="false" aria-controls="dd-menu">
          Solutions <span id="dd-chev" class="nav-chev" aria-hidden="true">›</span>
        </button>
        <ul class="nav-dd" id="dd-menu" role="menu">
          <li><a href="${_R}medicare.html"      role="menuitem">Medicare Plans</a></li>
          <li><a href="${_R}final-expense.html" role="menuitem">Final Expense</a></li>
          <li><a href="${_R}term-life.html"     role="menuitem">Term Life Insurance</a></li>
          <li><a href="${_R}annuities.html"     role="menuitem">Annuities</a></li>
          <li><a href="${_R}supplemental.html"  role="menuitem">Supplemental</a></li>
        </ul>
      </li>

      <li><a href="${_R}careers.html" class="nlk">Careers</a></li>
      <li><a href="${_R}contact.html" class="nlk">Contact</a></li>
    </ul>

    <div class="nav-right">
      <a href="tel:6026800058" class="nav-ph" aria-label="Call 602-680-0058">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
        602-680-0058
      </a>
      <a href="${_R}contact.html" class="btn btn-gold" style="font-size:10px;padding:10px 20px;letter-spacing:1.5px;">
        Get Covered
      </a>
      <button class="nav-ham" id="nav-ham" type="button"
        aria-label="Open navigation" aria-expanded="false" aria-controls="mob-nav">
        <span></span><span></span><span></span>
      </button>
    </div>

  </div>
</nav>
`);

// ── FOOTER ─────────────────────────────────────────────
document.body.insertAdjacentHTML('beforeend', `
<div class="gold-div"></div>
<footer id="site-footer">
  <div class="ft-in">
    <div class="ft-top">

      <div class="ft-brand">
        <a href="${_R}index.html" class="nav-logo ft-brand-logo" aria-label="Barkman Financial Group">
          <div class="logo-img">${LOGO}</div>
          <div class="logo-txt">
            <span class="logo-name">BARKMAN</span>
            <span class="logo-sub">Financial Group</span>
          </div>
        </a>
        <p class="ft-tagline">
          <strong>When coverage matters, it has to be right.</strong>
          Independent insurance guidance for families, retirees, and individuals. Based in Phoenix, Arizona. Licensed in 20+ states.
        </p>
      </div>

      <div class="ft-col">
        <h4>Company</h4>
        <ul>
          <li><a href="${_R}index.html">Home</a></li>
          <li><a href="${_R}about.html">About Us</a></li>
          <li><a href="${_R}careers.html">Careers</a></li>
          <li><a href="${_R}contact.html">Contact</a></li>
        </ul>
      </div>

      <div class="ft-col">
        <h4>Solutions</h4>
        <ul>
          <li><a href="${_R}medicare.html">Medicare Plans</a></li>
          <li><a href="${_R}final-expense.html">Final Expense</a></li>
          <li><a href="${_R}term-life.html">Term Life Insurance</a></li>
          <li><a href="${_R}annuities.html">Annuities</a></li>
          <li><a href="${_R}supplemental.html">Supplemental</a></li>
        </ul>
      </div>

      <div class="ft-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="${_R}privacy.html">Privacy Policy</a></li>
          <li><a href="${_R}terms.html">Terms of Service</a></li>
        </ul>
      </div>

      <div class="ft-col">
        <h4>Contact</h4>
        <div class="ft-ci">
          <span class="ft-ci-icon">📞</span>
          <span class="ft-ci-txt"><a href="tel:6026800058">602-680-0058</a></span>
        </div>
        <div class="ft-ci">
          <span class="ft-ci-icon">📍</span>
          <span class="ft-ci-txt">Phoenix, Arizona<br>Licensed in 20+ states</span>
        </div>
        <div class="ft-ci">
          <span class="ft-ci-icon">🕐</span>
          <span class="ft-ci-txt">Mon–Fri 8am–6pm CST<br>Sat 9am–2pm CST</span>
        </div>
        <div class="ft-ci">
          <span class="ft-ci-icon">🔒</span>
          <span class="ft-ci-txt">Independent. No cost to you.</span>
        </div>
      </div>

    </div>

    <!-- Medicare compliance — required -->
    <div class="ft-compliance">
      <p>We do not offer every plan available in your area. Currently we represent a number of organizations which offer a number of products in your area. Please contact <a href="https://www.medicare.gov" target="_blank" rel="noopener">Medicare.gov</a>, 1-800-MEDICARE, or your local State Health Insurance Program (SHIP) to get information on all of your options.</p>
      <p>Barkman Financial Group is an independent insurance agency and is not affiliated with, connected to, or endorsed by the U.S. government, the Centers for Medicare &amp; Medicaid Services (CMS), or any government agency. Insurance products, availability, and eligibility vary by state. Not all applicants will qualify for coverage. Enrollment periods and eligibility requirements vary by plan and product type. Rates and examples shown on this website are for illustrative purposes only — actual rates vary based on age, health, location, tobacco use, and other underwriting factors. No obligation to enroll.</p>
    </div>

    <div class="ft-bot">
      <p class="ft-copy">© 2026 Barkman Financial Group. All rights reserved. Licensed insurance professionals. AZ License #22121594.</p>
      <div class="ft-legal">
        <a href="${_R}privacy.html">Privacy Policy</a>
        <a href="${_R}terms.html">Terms of Service</a>
      </div>
    </div>

  </div>
</footer>
`);
