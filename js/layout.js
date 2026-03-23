/* ═══════════════════════════════════════════
   BARKMAN — NAV + FOOTER INJECTION v3
   Forest green brand. Real logo. Fixed dropdown.
═══════════════════════════════════════════ */

// Detect correct logo path (works from any page depth)
const LOGO_SRC = (() => {
  const path = window.location.pathname;
  const depth = (path.match(/\//g) || []).length;
  return depth <= 1 ? 'BFG_LOGO.png' : '../BFG_LOGO.png';
})();

// ── NAV ──
document.body.insertAdjacentHTML('afterbegin', `

<div id="scroll-progress"></div>
<div class="cursor-dot"></div>
<div class="cursor-ring"></div>
<a href="#top" id="back-to-top" aria-label="Back to top">↑</a>

<!-- Mobile nav -->
<div class="mobile-nav-overlay" role="dialog" aria-label="Site navigation">
  <a href="index.html"        class="mobile-nav-link">Home</a>
  <a href="about.html"        class="mobile-nav-link">About</a>
  <a href="coverage.html"     class="mobile-nav-link">Coverage</a>
  <a href="why-coverage.html" class="mobile-nav-link">Why It Matters</a>
  <a href="faq.html"          class="mobile-nav-link">FAQ</a>
  <a href="contact.html"      class="mobile-nav-link">Contact</a>
  <a href="tel:6057220000"    class="mobile-nav-phone">📞 605-722-0000</a>
</div>

<nav id="nav" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">

    <a href="index.html" class="nav-logo" aria-label="Barkman Financial Group — Home">
      <div class="logo-img-wrap">
        <img src="${LOGO_SRC}" alt="Barkman Financial Group crest" width="52" height="52">
      </div>
      <div class="logo-wordmark">
        <span class="logo-name">BARKMAN</span>
        <span class="logo-sub">Financial Group</span>
      </div>
    </a>

    <ul class="nav-links" role="list">
      <li><a href="index.html"        class="nav-link-btn">Home</a></li>
      <li><a href="about.html"        class="nav-link-btn">About</a></li>
      <li class="has-dropdown">
        <button class="nav-link-btn" aria-haspopup="true" aria-expanded="false">
          Coverage <span class="nav-chevron">›</span>
        </button>
        <ul class="nav-dropdown" role="menu">
          <li><a href="coverage.html#medicare"    role="menuitem">Medicare Plans</a></li>
          <li><a href="coverage.html#life"         role="menuitem">Term Life Insurance</a></li>
          <li><a href="coverage.html#final"        role="menuitem">Final Expense</a></li>
          <li><a href="coverage.html#supplemental" role="menuitem">Supplemental Coverage</a></li>
        </ul>
      </li>
      <li><a href="why-coverage.html" class="nav-link-btn">Why It Matters</a></li>
      <li><a href="faq.html"          class="nav-link-btn">FAQ</a></li>
      <li><a href="contact.html"      class="nav-link-btn">Contact</a></li>
    </ul>

    <div class="nav-right">
      <a href="tel:6057220000" class="nav-phone">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
        605-722-0000
      </a>
      <a href="contact.html" class="btn btn-primary" style="font-size:10px;padding:12px 22px;letter-spacing:1.5px;">
        Get Covered
      </a>
      <button class="nav-hamburger" aria-label="Open navigation menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

  </div>
</nav>
`);

// ── FOOTER ──
document.body.insertAdjacentHTML('beforeend', `
<div class="gold-divider"></div>
<footer>
  <div class="footer-inner">
    <div class="footer-top">

      <div class="footer-brand">
        <a href="index.html" class="nav-logo" style="margin-bottom:24px;">
          <div class="logo-img-wrap">
            <img src="${LOGO_SRC}" alt="Barkman Financial Group" width="52" height="52">
          </div>
          <div class="logo-wordmark">
            <span class="logo-name">BARKMAN</span>
            <span class="logo-sub">Financial Group</span>
          </div>
        </a>
        <p class="footer-tagline">
          <strong>When coverage matters, it has to be right.</strong>
          Independent insurance guidance for families, retirees, and individuals across South Dakota and beyond.
        </p>
      </div>

      <div class="footer-col">
        <h4>Navigate</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="coverage.html">Coverage</a></li>
          <li><a href="why-coverage.html">Why It Matters</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Coverage</h4>
        <ul>
          <li><a href="coverage.html#medicare">Medicare Plans</a></li>
          <li><a href="coverage.html#life">Term Life Insurance</a></li>
          <li><a href="coverage.html#final">Final Expense</a></li>
          <li><a href="coverage.html#supplemental">Supplemental</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms of Service</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Get in Touch</h4>
        <div class="footer-contact-item">
          <span class="footer-contact-icon">📞</span>
          <span class="footer-contact-text"><a href="tel:6057220000">605-722-0000</a></span>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-icon">✉</span>
          <span class="footer-contact-text"><a href="mailto:info@barkmanfinancial.com">info@barkmanfinancial.com</a></span>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-icon">📍</span>
          <span class="footer-contact-text">Hometown, SD 12345</span>
        </div>
        <div class="footer-contact-item" style="margin-top:16px;">
          <span class="footer-contact-icon">🕐</span>
          <span class="footer-contact-text">Mon–Fri 8am–6pm<br>Sat 9am–2pm CST</span>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      <p class="footer-copy">© 2024 Barkman Financial Group. All rights reserved. Licensed insurance professionals.</p>
      <div class="footer-legal">
        <a href="privacy.html">Privacy Policy</a>
        <a href="terms.html">Terms of Service</a>
      </div>
      <div class="footer-social">
        <a href="#" class="social-btn" aria-label="Facebook">f</a>
        <a href="#" class="social-btn" aria-label="X / Twitter">𝕏</a>
        <a href="#" class="social-btn" aria-label="LinkedIn">in</a>
      </div>
    </div>

  </div>
</footer>
`);
