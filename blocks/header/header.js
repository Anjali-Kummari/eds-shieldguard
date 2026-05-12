/**
 * ShieldGuard — Header Block
 * Custom responsive navigation
 */

async function buildNav(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'header-wrapper';

  // ── Brand ───────────────────────────────────────────────
  const brand = document.createElement('a');
  brand.className = 'header-brand';
  brand.href = '/';
  brand.setAttribute('aria-label', 'ShieldGuard Home');

  brand.innerHTML = `
    <svg class="brand-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">

      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>

    <span class="brand-name">ShieldGuard</span>
  `;

  wrapper.append(brand);

  // ── Desktop Navigation ──────────────────────────────────
  const nav = document.createElement('nav');
  nav.className = 'header-nav';
  nav.setAttribute('aria-label', 'Main navigation');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/resources', label: 'Resources' },
    { href: '/claims', label: 'Claims' },
  ];

  navLinks.forEach(({ href, label }) => {
    const link = document.createElement('a');

    link.href = href;
    link.textContent = label;

    if (window.location.pathname === href) {
      link.setAttribute('aria-current', 'page');
    }

    nav.append(link);
  });

  // ── CTA Button ──────────────────────────────────────────
  const cta = document.createElement('a');
  cta.href = '/#quote';
  cta.className = 'nav-cta';
  cta.textContent = 'Get a Quote';

  nav.append(cta);

  wrapper.append(nav);

  // ── Mobile Toggle ───────────────────────────────────────
  const toggle = document.createElement('button');

  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-label', 'Toggle mobile menu');
  toggle.setAttribute('aria-expanded', 'false');

  toggle.innerHTML = `
    <svg class="icon-menu"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">

      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>

    <svg class="icon-close"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      style="display:none;">

      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `;

  wrapper.append(toggle);

  // ── Mobile Menu ─────────────────────────────────────────
  const mobileNav = document.createElement('div');
  mobileNav.className = 'nav-mobile';

  mobileNav.setAttribute('aria-hidden', 'true');

  navLinks.forEach(({ href, label }) => {
    const link = document.createElement('a');

    link.href = href;
    link.textContent = label;

    mobileNav.append(link);
  });

  const mobileCta = document.createElement('a');

  mobileCta.href = '/#quote';
  mobileCta.className = 'nav-mobile-cta';
  mobileCta.textContent = 'Get a Quote';

  mobileNav.append(mobileCta);

  // ── Toggle Logic ────────────────────────────────────────
  toggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');

    toggle.setAttribute('aria-expanded', String(open));

    mobileNav.setAttribute('aria-hidden', String(!open));

    toggle.querySelector('.icon-menu').style.display = open ? 'none' : '';

    toggle.querySelector('.icon-close').style.display = open ? '' : 'none';
  });

  // ── Scroll Shadow ───────────────────────────────────────
  const header = block.closest('header');

  window.addEventListener(
    'scroll',
    () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    },
    { passive: true },
  );

  block.replaceChildren(wrapper, mobileNav);
}

export default async function decorate(block) {
  await buildNav(block);
}
