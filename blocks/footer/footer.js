/**
 * ShieldGuard — Footer Block
 */
export default async function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-wrapper';

  // Grid
  const grid = document.createElement('div');
  grid.className = 'footer-grid';

  // ── Brand column ──────────────────────────────────────────
  const brandCol = document.createElement('div');
  brandCol.className = 'footer-brand';
  brandCol.innerHTML = `
    <a href="/" class="footer-brand-logo" aria-label="ShieldGuard Home">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <span class="brand-name">ShieldGuard</span>
    </a>
    <p class="footer-tagline">Modern protection for modern lives. We're redefining insurance with technology and empathy.</p>
    <ul class="footer-social">
      <li><a href="#" aria-label="Twitter">TW</a></li>
      <li><a href="#" aria-label="LinkedIn">LI</a></li>
      <li><a href="#" aria-label="Facebook">FB</a></li>
    </ul>`;

  // ── Insurance column ──────────────────────────────────────
  const insuranceCol = document.createElement('div');
  insuranceCol.className = 'footer-col';
  insuranceCol.innerHTML = `
    <h4>Insurance</h4>
    <ul>
      <li><a href="/homeowners">Homeowners</a></li>
      <li><a href="/auto">Auto Insurance</a></li>
      <li><a href="/business">Business Owners</a></li>
      <li><a href="/resources">Resource Center</a></li>
    </ul>`;

  // ── Company column ────────────────────────────────────────
  const companyCol = document.createElement('div');
  companyCol.className = 'footer-col';
  companyCol.innerHTML = `
    <h4>Company</h4>
    <ul>
      <li><a href="/about">About Us</a></li>
      <li><a href="/careers">Careers</a></li>
      <li><a href="/press">Press</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>`;

  // ── Contact column ────────────────────────────────────────
  const contactCol = document.createElement('div');
  contactCol.className = 'footer-col';
  contactCol.innerHTML = `
    <h4>Contact</h4>
    <ul>
      <li>
        <div class="footer-contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .39 1.97.74 2.91a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.17-1.17a2 2 0 012.11-.45c.94.35 1.91.61 2.91.74A2 2 0 0122 14.92v2z"/>
          </svg>
          1-800-SHIELD-G
        </div>
      </li>
      <li>
        <div class="footer-contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          help@shieldguard.com
        </div>
      </li>
      <li>
        <div class="footer-contact-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          123 Insurance Way, NY
        </div>
      </li>
    </ul>`;

  grid.append(brandCol, insuranceCol, companyCol, contactCol);

  // ── Bottom bar ────────────────────────────────────────────
  const bottom = document.createElement('div');
  bottom.className = 'footer-bottom';
  bottom.innerHTML = `
    <p class="footer-copyright">© ${new Date().getFullYear()} ShieldGuard P&amp;C Insurance. All rights reserved.</p>
    <ul class="footer-legal">
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
      <li><a href="/cookies">Cookie Policy</a></li>
    </ul>`;

  wrapper.append(grid, bottom);
  block.replaceChildren(wrapper);
}
