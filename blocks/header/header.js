/**
 * ShieldGuard — Header Block
 */

async function buildNav(block) {
  const resp = await fetch('/nav.plain.html');

  if (!resp.ok) return;

  const html = await resp.text();

  const navDoc = new DOMParser().parseFromString(html, 'text/html');

  const rows = [...navDoc.querySelectorAll('body > div')];

  const wrapper = document.createElement('div');
  wrapper.className = 'header-wrapper';

  /* ───────────────── Brand ───────────────── */

  const brand = document.createElement('a');
  brand.className = 'header-brand';
  brand.href = '/';

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

  /* ───────────────── Navigation ───────────────── */

  const nav = document.createElement('nav');

  rows.forEach((row, index) => {
    const cols = [...row.children];

    if (cols.length < 2) return;

    const label = cols[0].textContent.trim();
    const link = cols[1].textContent.trim();

    // skip first row (header title)
    if (index === 0) return;

    // CTA button
    if (label.toLowerCase().includes('quote')) {
      const cta = document.createElement('a');

      cta.href = link;
      cta.className = 'nav-cta';
      cta.textContent = label;

      nav.append(cta);

      return;
    }

    // Normal nav links
    const a = document.createElement('a');

    a.href = link;
    a.textContent = label;

    nav.append(a);
  });

  wrapper.append(nav);

  block.replaceChildren(wrapper);
}

export default async function decorate(block) {
  await buildNav(block);
}
