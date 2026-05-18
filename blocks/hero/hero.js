/**
 * ShieldGuard — Hero Block
 *
 * Document table structure:
 * | Hero          |                                    |
 * | Badge text    | Top Rated P&C Carrier 2024         |
 * | Heading       | Protection for what matters most.  |
 * | Body          | Comprehensive p&c…                 |
 * | Primary CTA   | [link] Start My Quote              |
 * | Secondary CTA | [link] View Claims                 |
 * | Image         | [picture]                          |
 * | Float title   | Instant Approval                   |
 * | Float body    | 98% of policies…                   |
 *
 * Heading split rule:
 *   If the heading contains a known split keyword (what / how / why / your / the)
 *   everything from that word onward is wrapped in <em> for the brand colour.
 *   The split is done on a WORD BOUNDARY only — never mid-word — so the
 *   browser can always wrap the text naturally at any viewport width.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const get   = (i) => rows[i]?.children[1]?.textContent.trim() || '';
  const getEl = (i) => rows[i]?.children[1];

  const badgeText     = get(0) || 'Top Rated P&C Carrier 2024';
  const headingRaw    = get(1) || 'Protection for what matters most.';
  const bodyText      = get(2) || 'Comprehensive property and casualty insurance tailored to your life. From your home to your business, we\'ve got you covered with smart, simple protection.';
  const primaryCTA    = get(3) || 'Start My Quote';
  const primaryHref   = rows[4]?.children[1]?.querySelector('a')?.href || '/#quote';
  const secondaryCTA  = get(5) || 'View Claims';
  const secondaryHref = rows[6]?.children[1]?.querySelector('a')?.href || '/claims';
  const imageEl       = getEl(7);
  const floatTitle    = get(8) || 'Instant Approval';
  const floatBody     = get(9) || '98% of our basic policies are approved within minutes.';

  /* ── Build heading HTML ──────────────────────────────────
   * Split on the FIRST occurrence of a trigger word so the <em>
   * always starts at a word boundary. This avoids any chance of
   * an unbreakable inline run causing overflow on narrow screens.
   * ──────────────────────────────────────────────────────── */
  function buildHeading(raw) {
    // If author already put <em> tags in, respect them
    if (raw.includes('<em>')) return raw;

    // Find the first word-boundary split point
    const TRIGGERS = ['what', 'how', 'why', 'your', 'the', 'for', 'with'];
    const lower = raw.toLowerCase();

    for (const trigger of TRIGGERS) {
      // Match the trigger only at a word boundary with a space before it
      const idx = lower.indexOf(` ${trigger} `);
      if (idx !== -1) {
        // Split AFTER the space so the em starts cleanly on the keyword
        const splitAt = idx + 1; // +1 to skip the leading space
        return `${raw.slice(0, splitAt)}<em>${raw.slice(splitAt)}</em>`;
      }
    }

    // Fallback: italicise the last two words
    const words = raw.trim().split(' ');
    if (words.length > 2) {
      const pivot = words.slice(0, -2).join(' ');
      const tail  = words.slice(-2).join(' ');
      return `${pivot} <em>${tail}</em>`;
    }

    return raw; // too short to split
  }

  /* ── Image markup ────────────────────────────────────── */
  let imgMarkup = '';
  const img = imageEl?.querySelector('img');
  if (img) {
    img.className = '';
    imgMarkup = img.outerHTML;
  } else {
    imgMarkup = `<img
      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
      alt="Modern home protected by ShieldGuard"
      loading="eager"
      width="1000"
      height="1000"
      referrerpolicy="no-referrer">`;
  }

  /* ── Render ──────────────────────────────────────────── */
  block.innerHTML = `
    <div class="hero-inner">

      <div class="hero-content">
        <div class="hero-badge">
          <svg class="badge-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          ${badgeText}
        </div>

        <h1>${buildHeading(headingRaw)}</h1>

        <p>${bodyText}</p>

        <div class="hero-ctas">
          <a href="${primaryHref}" class="btn btn-primary btn-lg">
            ${primaryCTA}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a href="${secondaryHref}" class="btn btn-outline btn-lg">${secondaryCTA}</a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-image-wrap">
          ${imgMarkup}
        </div>
        <div class="hero-float-card" aria-hidden="true">
          <div class="card-row">
            <div class="card-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
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
