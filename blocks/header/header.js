/**
 * ShieldGuard — Header Block
 * Fully responsive: hamburger on mobile/tablet (<1024px),
 * full nav on desktop (>=1024px).
 *
 * Mobile menu:
 *  - slides down from the header bar
 *  - mirrors every link from the desktop nav (no separate hardcoded list)
 *  - has a dark overlay behind it
 *  - closes on overlay click, ESC key, or any link click
 *  - hamburger animates to X when open
 */

const NAV_LINKS = [
  { href: '/',          label: 'Home' },
  { href: '/products',  label: 'Products' },
  { href: '/resources', label: 'Resources' },
  { href: '/claims',    label: 'Claims' },
  
];

function isCurrentPage(href) {
  try {
    const url = new URL(href, window.location.origin);
    return url.pathname === window.location.pathname;
  } catch {
    return false;
  }
}

export default async function decorate(block) {
  /* 1. Try to load nav links from nav.plain.html */
  let links = NAV_LINKS;
  try {
    const resp = await fetch('/nav.plain.html');
    if (resp.ok) {
      const html = await resp.text();
      const doc  = new DOMParser().parseFromString(html, 'text/html');
      const anchors = [...doc.querySelectorAll('a')];
      if (anchors.length) {
        links = anchors.map((a) => ({
          href:  a.getAttribute('href') || a.href,
          label: a.textContent.trim(),
        }));
      }
    }
  } catch (e) { /* fallback to NAV_LINKS */ }

  /* 2. Header bar */
  const wrapper = document.createElement('div');
  wrapper.className = 'header-wrapper';

  // Logo
  const brand = document.createElement('a');
  brand.className = 'header-brand';
  brand.href = '/';
  brand.setAttribute('aria-label', 'ShieldGuard — go to homepage');
  brand.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" class="brand-icon"
      aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
    <span class="brand-name">ShieldGuard</span>`;

  // Desktop nav
  const desktopNav = document.createElement('nav');
  desktopNav.className = 'nav-desktop';
  desktopNav.setAttribute('aria-label', 'Main navigation');

  links.forEach(({ href, label }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    if (isCurrentPage(href)) a.setAttribute('aria-current', 'page');
    desktopNav.append(a);
  });

  /* =========================================================
   SEARCH BUTTON
========================================================= */

const searchBtn = document.createElement('button');

searchBtn.className = 'nav-search-btn';

searchBtn.setAttribute(
  'aria-label',
  'Search'
);

searchBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg"
       width="18"
       height="18"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       stroke-width="2"
       stroke-linecap="round"
       stroke-linejoin="round">

    <circle cx="11" cy="11" r="8"></circle>

    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>

  </svg>
`;

/* Search Box */

const searchBox = document.createElement('div');

searchBox.className = 'header-search';

searchBox.innerHTML = `
  <input
    type="text"
    id="site-search"
    placeholder="Search..."
  >
`;

/* Get Quote CTA */

const desktopCta = document.createElement('a');

desktopCta.href = '/#quote';

desktopCta.className = 'nav-cta';

desktopCta.textContent = 'Get a Quote';
  
/* Login Dropdown */

const loginWrapper = document.createElement('div');
loginWrapper.className = 'login-dropdown';

const loginBtn = document.createElement('button');
loginBtn.className = 'login-btn';
loginBtn.innerHTML = `
  Login
  <span class="login-arrow">▼</span>
`;

const loginMenu = document.createElement('div');
loginMenu.className = 'login-menu';

loginMenu.innerHTML = `
  <a href="http://dxpvm.eastus.cloudapp.azure.com/portals/agent-portal/" target="_blank">
    Agent Portal
  </a>

  <a href="http://dxpvm.eastus.cloudapp.azure.com/portals/customer-portal/" target="_blank">
    Customer Portal
  </a>
`;

loginWrapper.append(loginBtn, loginMenu);

/* Append */

desktopNav.append(searchBtn);

desktopNav.append(desktopCta);

desktopNav.append(loginWrapper);

wrapper.append(searchBox);

  // Hamburger button
  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-label', 'Open navigation menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'mobile-nav');
  toggle.innerHTML = `
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>`;

  wrapper.append(brand, desktopNav, toggle);

  /* 3. Mobile drawer */
  const drawer = document.createElement('div');
  drawer.className = 'nav-mobile';
  drawer.id = 'mobile-nav';
  drawer.setAttribute('aria-hidden', 'true');
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-label', 'Navigation menu');

  const drawerList = document.createElement('ul');
  drawerList.className = 'nav-mobile-list';
  drawerList.setAttribute('role', 'list');

  links.forEach(({ href, label }) => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href = href;
    a.className = 'nav-mobile-link';
    a.textContent = label;
    if (isCurrentPage(href)) {
      a.setAttribute('aria-current', 'page');
      a.classList.add('active');
    }
    li.append(a);
    drawerList.append(li);
  });

  const drawerCta = document.createElement('a');
  drawerCta.href = '/#quote';
  drawerCta.className = 'nav-mobile-cta';
  drawerCta.textContent = 'Get a Quote';
  const agentPortal = document.createElement('a');
agentPortal.href = 'http://dxpvm.eastus.cloudapp.azure.com/portals/agent-portal/';
agentPortal.className = 'nav-mobile-link';
agentPortal.textContent = 'Agent Portal';

const customerPortal = document.createElement('a');
customerPortal.href = 'http://dxpvm.eastus.cloudapp.azure.com/portals/customer-portal/';
customerPortal.className = 'nav-mobile-link';
customerPortal.textContent = 'Customer Portal';

drawerList.append(
  Object.assign(document.createElement('li'), {
    innerHTML: agentPortal.outerHTML
  })
);

drawerList.append(
  Object.assign(document.createElement('li'), {
    innerHTML: customerPortal.outerHTML
  })
);

  drawer.append(drawerList, drawerCta);

  /* 4. Dark overlay */
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  /* 5. Open / close */
  let isOpen = false;

  function openMenu() {
    isOpen = true;
    drawer.classList.add('open');
    overlay.classList.add('visible');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    drawer.querySelector('a').focus();
  }

  function closeMenu() {
    isOpen = false;
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    toggle.focus();
  }

  toggle.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()));
  overlay.addEventListener('click', closeMenu);
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  // Focus trap
  drawer.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = [...drawer.querySelectorAll('a, button')];
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  /* 6. Scroll shadow */
  const headerEl = block.closest('header');
  const onScroll = () => headerEl.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 7. Close on resize to desktop */
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && isOpen) closeMenu();
  });

  /* 8. Mount */
  block.replaceChildren(wrapper, drawer);
  document.body.append(overlay);
  /* =========================================================
   SEARCH
========================================================= */

const searchInput =
  searchBox.querySelector('#site-search');

/* Search Count */

const resultCount =
  document.createElement('div');

resultCount.className =
  'search-count';

searchBox.append(resultCount);

/* Toggle Search */

searchBtn.addEventListener('click', () => {

  searchBox.classList.toggle('active');

  searchInput.focus();

});

/* Search Logic */

searchInput.addEventListener('input', (e) => {

  const value =
    e.target.value
      .trim()
      .toLowerCase();

const searchable =
  [
    ...document.querySelectorAll(
      `
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      span,
      a,
      button,
      li,
      .article-card,
      .press-card,
      .feature-card,
      .stat-card,
      .announcement-card
      `
    ),
  ];
  let matches = [];

  searchable.forEach((item) => {

    const text =
      item.textContent.toLowerCase();

    /* Reset */

    item.style.background = '';

    item.style.transition =
      'background 0.2s ease';

    if (
      value &&
      text.includes(value)
    ) {

      matches.push(item);

      item.style.background =
        '#dff7ea';

    }

  });

  /* Result Count */

  resultCount.textContent =
    matches.length
      ? `${matches.length} result${matches.length > 1 ? 's' : ''}`
      : '';

  /* Scroll To First Match */

  if (matches.length) {

    matches[0].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

  }

});
}
