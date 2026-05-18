/**
 * ShieldGuard — Hero Block
 *
 * Expected document table structure:
 * | Hero            |                       |
 * | Badge text      | Top Rated P&C 2024    |
 * | Heading         | Protection for what…  |
 * | Body            | Comprehensive p&c…    |
 * | Primary CTA     | Start My Quote        |
 * | Secondary CTA   | View Claims           |
 * | Image           | [image]               |
 * | Float title     | Instant Approval      |
 * | Float body      | 98% of policies…      |
 */
export default function decorate(block) {
  // Read rows from the block table
  const rows = [...block.children];
  const get = (i) => rows[i]?.children[1]?.textContent.trim() || '';
  const getEl = (i) => rows[i]?.children[1];

  const badgeText  = get(0) || 'Top Rated P&C Carrier 2024';
  const headingRaw = get(1) || 'Protection for what matters most.';
  const bodyText   = get(2) || 'Comprehensive property and casualty insurance tailored to your life.';
  const primaryCTA = get(3) || 'Start My Quote';
  const primaryHref = rows[3]?.children[1]?.querySelector('a')?.href || '/#quote';
  const secondaryCTA  = get(4) || 'View Claims';
  const secondaryHref = rows[4]?.children[1]?.querySelector('a')?.href || '/claims';
  const imageEl    = getEl(5);
  const floatTitle = get(6) || 'Instant Approval';
  const floatBody  = get(7) || '98% of our basic policies are approved within minutes.';

  // Extract img if provided, else use default
  let imgMarkup = '';
  const img = imageEl?.querySelector('img');
  if (img) {
    img.className = '';
    imgMarkup = img.outerHTML;
  } else {
    imgMarkup = `<img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
      alt="Modern home" loading="eager" width="1000" height="1000" referrerpolicy="no-referrer">`;
  }

  // Build heading HTML (italicise last segment after comma/period if no em present)
  let headingHTML = headingRaw;
  if (!headingRaw.includes('<em>')) {
    const splitIdx = headingRaw.lastIndexOf(' ');
    const pivot = headingRaw.indexOf('what') !== -1
      ? headingRaw.indexOf('what')
      : splitIdx;
    if (pivot > 0) {
      headingHTML = `${headingRaw.slice(0, pivot)}<em>${headingRaw.slice(pivot)}</em>`;
    }
  }

  block.innerHTML = `
    <div class="hero-inner">
      <div class="hero-content">
        <div class="hero-badge">
          <svg class="badge-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          ${badgeText}
        </div>
        <h1>${headingHTML}</h1>
        <p>${bodyText}</p>
        <div class="hero-ctas">
          <a href="${primaryHref}" class="btn btn-primary btn-lg">
            ${primaryCTA}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a href="${secondaryHref}" class="btn btn-outline btn-lg">${secondaryCTA}</a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-image-wrap">
          ${imgMarkup}
        </div>
        <div class="hero-float-card">
          <div class="card-row">
            <div class="card-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <span class="card-title">${floatTitle}</span>
          </div>
          <p>${floatBody}</p>
        </div>
      </div>
    </div>`;
}
