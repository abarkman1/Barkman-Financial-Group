/* ═══════════════════════════════════════════
   BARKMAN FINANCIAL GROUP — LAYOUT v5
   Real phone: 602-680-0058
   No email shown. Form routes to backend.
   20+ states. Company brand only.
═══════════════════════════════════════════ */

const _R = (() => {
  const segs = window.location.pathname.split('/').filter(Boolean);
  return segs.length <= 1 ? './' : '../';
})();

const _L = `<img src="${_R}BFG_LOGO.png" alt="Barkman Financial Group" width="50" height="50" loading="lazy">`;

document.body.insertAdjacentHTML('afterbegin', `
<div id="sp"></div>
<div class="cur-d"></div>
<div class="cur-r"></div>
<a href="#top" id="btt" aria-label="Back to top">↑</a>

<div class="mob-nav" role="dialog" aria-label="Site navigation">
  <a href="${_R}index.html"        class="mob-lnk">Home</a>
  <a href="${_R}about.html"        class="mob-lnk">About</a>
  <a href="${_R}coverage.html"     class="mob-lnk">Coverage</a>
  <a href="${_R}why-coverage.html" class="mob-lnk">Why It Matters</a>
  <a href="${_R}faq.html"          class="mob-lnk">FAQ</a>
  <a href="${_R}contact.html"      class="mob-lnk">Contact</a>
  <a href="tel:6026800058"         class="mob-ph">602-680-0058</a>
</div>

<nav id="nav" role="navigation" aria-label="Main navigation">
  <div class="nav-bg"></div>
  <div class="nav-in">

    <a href="${_R}index.html" class="nav-logo" aria-label="Barkman Financial Group">
      <div class="logo-img">${_L}</div>
      <div class="logo-txt">
        <span class="logo-name">BARKMAN</span>
        <span class="logo-sub">Financial Group</span>
      </div>
    </a>

    <ul class="nav-links">
      <li><a href="${_R}index.html"        class="nlk">Home</a></li>
      <li><a href="${_R}about.html"        class="nlk">About</a></li>
      <li class="has-dd">
        <button class="nlk" aria-haspopup="true" aria-expanded="false">
          Coverage <span class="nav-chev">›</span>
        </button>
        <ul class="nav-dd">
          <li><a href="${_R}coverage.html#medicare">Medicare Plans</a></li>
          <li><a href="${_R}coverage.html#life">Term Life Insurance</a></li>
          <li><a href="${_R}final-expense.html">Final Expense Insurance</a></li>
          <li><a href="${_R}coverage.html#supplemental">Supplemental</a></li>
        </ul>
      </li>
      <li><a href="${_R}why-coverage.html" class="nlk">Why It Matters</a></li>
      <li><a href="${_R}faq.html"          class="nlk">FAQ</a></li>
      <li><a href="${_R}contact.html"      class="nlk">Contact</a></li>
    </ul>

    <div class="nav-right">
      <a href="tel:6026800058" class="nav-ph">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
        602-680-0058
      </a>
      <a href="${_R}contact.html" class="btn btn-gold" style="font-size:10px;padding:11px 22px;letter-spacing:1.5px;">Get Covered</a>
      <button class="nav-ham" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

  </div>
</nav>
`);

document.body.insertAdjacentHTML('beforeend', `
<div class="gold-div"></div>
<footer>
  <div class="ft-in">
    <div class="ft-top">

      <div class="ft-brand">
        <a href="${_R}index.html" class="nav-logo">
          <div class="logo-img">${_L}</div>
          <div class="logo-txt">
            <span class="logo-name">BARKMAN</span>
            <span class="logo-sub">Financial Group</span>
          </div>
        </a>
        <p class="ft-tag">
          <strong>When coverage matters, it has to be right.</strong>
          Independent insurance guidance for families, retirees, and individuals across 20+ states.
        </p>
      </div>

      <div class="ft-col">
        <h4>Navigate</h4>
        <ul>
          <li><a href="${_R}index.html">Home</a></li>
          <li><a href="${_R}about.html">About Us</a></li>
          <li><a href="${_R}coverage.html">Coverage</a></li>
          <li><a href="${_R}why-coverage.html">Why It Matters</a></li>
          <li><a href="${_R}faq.html">FAQ</a></li>
          <li><a href="${_R}contact.html">Contact</a></li>
        </ul>
      </div>

      <div class="ft-col">
        <h4>Coverage</h4>
        <ul>
          <li><a href="${_R}coverage.html#medicare">Medicare Plans</a></li>
          <li><a href="${_R}coverage.html#life">Term Life Insurance</a></li>
          <li><a href="${_R}final-expense.html">Final Expense Insurance</a></li>
          <li><a href="${_R}coverage.html#supplemental">Supplemental</a></li>
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
        <h4>Contact Us</h4>
        <div class="ft-ci">
          <span class="ft-ci-icon">📞</span>
          <span class="ft-ci-txt"><a href="tel:6026800058">602-680-0058</a></span>
        </div>
        <div class="ft-ci">
          <span class="ft-ci-icon">📋</span>
          <span class="ft-ci-txt"><a href="${_R}contact.html">Submit a Quote Request</a></span>
        </div>
        <div class="ft-ci">
          <span class="ft-ci-icon">🗺</span>
          <span class="ft-ci-txt">Licensed in 20+ states including TX, AZ, GA, CA, DE, MO, MD, VA &amp; more</span>
        </div>
        <div class="ft-ci">
          <span class="ft-ci-icon">🕐</span>
          <span class="ft-ci-txt">Mon–Fri 8am–6pm · Sat 9am–2pm CST</span>
        </div>
      </div>

    </div>
    <div class="ft-bot">
      <p class="ft-copy">© 2024 Barkman Financial Group. All rights reserved. Licensed insurance professionals.</p>
      <div class="ft-legal">
        <a href="${_R}privacy.html">Privacy Policy</a>
        <a href="${_R}terms.html">Terms of Service</a>
      </div>
      <div class="ft-soc">
        <a href="#" class="soc" aria-label="Facebook">f</a>
        <a href="#" class="soc" aria-label="X">𝕏</a>
        <a href="#" class="soc" aria-label="LinkedIn">in</a>
      </div>
    </div>
  </div>
</footer>
`);
