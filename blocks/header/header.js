/**
 * ShieldGuard — Header Block
 */

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/resources', label: 'Resources' },
  { href: '/claims', label: 'Claims' },
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

  let links = NAV_LINKS;

  try {
    const resp = await fetch('/nav.plain.html');

    if (resp.ok) {

      const html = await resp.text();

      const doc = new DOMParser().parseFromString(
        html,
        'text/html'
      );

      const anchors = [...doc.querySelectorAll('a')];

      if (anchors.length) {

        links = anchors.map((a) => ({
          href: a.getAttribute('href') || a.href,
          label: a.textContent.trim(),
        }));

      }
    }
  } catch (e) {}

  /* =========================================================
     HEADER WRAPPER
  ========================================================= */

  const wrapper = document.createElement('div');

  wrapper.className = 'header-wrapper';

  /* =========================================================
     BRAND
  ========================================================= */

  const brand = document.createElement('a');

  brand.className = 'header-brand';

  brand.href = '/';

  brand.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="brand-icon">

      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>

    </svg>

    <span class="brand-name">
      ShieldGuard
    </span>
  `;

  /* =========================================================
     DESKTOP NAV
  ========================================================= */

  const desktopNav = document.createElement('nav');

  desktopNav.className = 'nav-desktop';

  links.forEach(({ href, label }) => {

    const a = document.createElement('a');

    a.href = href;

    a.textContent = label;

    if (isCurrentPage(href)) {
      a.setAttribute('aria-current', 'page');
    }

    desktopNav.append(a);

  });

  /* =========================================================
     SEARCH BUTTON
  ========================================================= */

  const searchBtn = document.createElement('button');

  searchBtn.className = 'nav-search-btn';

  searchBtn.setAttribute(
    'aria-label',
    'Search site'
  );

  searchBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="20"
         height="20"
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

  desktopNav.append(searchBtn);

  /* =========================================================
     CTA
  ========================================================= */

  const desktopCta = document.createElement('a');

  desktopCta.href = '/#quote';

  desktopCta.className = 'nav-cta';

  desktopCta.textContent = 'Get a Quote';

  desktopNav.append(desktopCta);

  /* =========================================================
     SEARCH BOX
  ========================================================= */

  const searchBox = document.createElement('div');

  searchBox.className = 'header-search';

  searchBox.innerHTML = `
    <input
      type="text"
      id="site-search"
      placeholder="Search pages..."
    >
  `;

  /* =========================================================
     MOBILE TOGGLE
  ========================================================= */

  const toggle = document.createElement('button');

  toggle.className = 'nav-toggle';

  toggle.innerHTML = `
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>
  `;

  wrapper.append(
    brand,
    desktopNav,
    searchBox,
    toggle
  );

  /* =========================================================
     SEARCH FUNCTIONALITY
  ========================================================= */

  const searchInput =
    searchBox.querySelector('#site-search');

  searchBtn.addEventListener('click', () => {

    searchBox.classList.toggle('active');

    searchInput.focus();

  });

  searchInput.addEventListener('input', (e) => {

    const value =
      e.target.value.toLowerCase();

    const searchable =
      document.querySelectorAll(
        'h1, h2, h3, p, .article-card, .press-card'
      );

    searchable.forEach((item) => {

      const text =
        item.textContent.toLowerCase();

      if (text.includes(value)) {

        item.style.outline =
          '2px solid #00a86b';

      } else {

        item.style.outline = '';

      }

    });

  });

  block.replaceChildren(wrapper);
}
