/**
 * ShieldGuard — Services Block
 *
 * Document table format (one row per service card):
 * | Services |               |
 * | Icon     | home          |  (home | auto | business | shield | umbrella | lock | zap | heart)
 * | Title    | Homeowners    |
 * | Body     | Protect your… |
 * | Link     | /products/home|
 *
 * First row (col 0 = "Heading", col 1 = heading text) is the section header.
 * Second row (col 0 = "Subtext") is the subtitle.
 * Subsequent rows are cards (groups of 4 rows).
 */

const ICONS = {
  home: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  auto: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  business: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9" y1="14.5" x2="15" y2="14.5"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  umbrella: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 12a11 11 0 00-22 0z"/><path d="M12 12v6a2 2 0 004 0"/></svg>`,
  lock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
};

function getIcon(name = 'shield') {
  return ICONS[name.toLowerCase().trim()] || ICONS.shield;
}

export default function decorate(block) {
  const rows = [...block.children];

  // Default cards when no content provided
  const defaultCards = [
    {
      icon: 'home',
      title: 'Homeowners',
      body: 'Protect your biggest investment from fire, theft, and natural disasters with our comprehensive home policies.',
      href: '/homeowners',
    },
    {
      icon: 'auto',
      title: 'Auto Insurance',
      body: 'Smart coverage for your vehicles. Includes liability, collision, and 24/7 roadside assistance.',
      href: '/auto',
    },
    {
      icon: 'business',
      title: 'Business P&C',
      body: 'General liability, professional indemnity, and property protection for small to mid-sized businesses.',
      href: '/business',
    },
  ];

  let heading = 'Insurance for every stage.';
  let subtext = 'Whether you\'re buying your first home or scaling your business, we have the right coverage for you.';
  let cards = defaultCards;

  // Parse document table if rows exist
  if (rows.length >= 2) {
    const firstCellText = (i) => rows[i]?.children[0]?.textContent.trim().toLowerCase();
    const secondCellText = (i) => rows[i]?.children[1]?.textContent.trim();

    if (firstCellText(0) === 'heading') heading = secondCellText(0) || heading;
    if (firstCellText(1) === 'subtext') subtext = secondCellText(1) || subtext;

    // Cards start at row 2, grouped in sets of 4
    const cardRows = rows.slice(2);
    if (cardRows.length >= 4) {
      cards = [];
      for (let i = 0; i < cardRows.length; i += 4) {
        if (i + 3 < cardRows.length) {
          cards.push({
            icon: cardRows[i + 0]?.children[1]?.textContent.trim() || 'shield',
            title: cardRows[i + 1]?.children[1]?.textContent.trim() || 'Coverage',
            body: cardRows[i + 2]?.children[1]?.textContent.trim() || '',
            href: cardRows[i + 3]?.children[1]?.querySelector('a')?.href || '#',
          });
        }
      }
    }
  }

  // Build markup
  const cardsHTML = cards.map((c) => `
    <a href="${c.href}" class="service-card">
      <div class="service-card-icon">${getIcon(c.icon)}</div>
      <h3>${c.title}</h3>
      <p>${c.body}</p>
      <div class="service-card-link">
        Learn More
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </a>`).join('');

  block.innerHTML = `
    <div class="services-inner">
      <div class="services-header">
        <h2>${heading}</h2>
        <p>${subtext}</p>
      </div>
      <div class="services-grid">${cardsHTML}</div>
    </div>`;
}
