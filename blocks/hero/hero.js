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
 * Heading split:
 *   The heading is split into two lines — "Protection for" on line 1,
 *   "what matters most." on line 2 (in brand green).
 *   We achieve this by wrapping the tail in <em> which hero.css renders
 *   as display:block on mobile (so it sits on its own line and respects
 *   the column width), and display:inline on tablet/desktop centred layout.
 *
 *   This eliminates the incognito clipping bug where an inline <em> ran
 *   past the column edge before the browser had parsed the full stylesheet.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const get   = (i) => rows[i]?.children[1]?.textContent.trim() || '';
  const getEl = (i) => rows[i]?.children[1];

  const badgeText     = get(0) || 'Top Rated P&C Carrier 2024';
  const headingRaw    = get(1) || 'Protection for what matters most.';
  const bodyText      = get(2) 
  const primaryCTA    = get(3) || 'Start My Quote';
  const primaryHref   = rows[4]?.children[1]?.querySelector('a')?.href || '/#quote';
  const secondaryCTA  = get(5) || 'View Claims';
  const secondaryHref = rows[6]?.children[1]?.querySelector('a')?.href || '/claims';
  const imageEl       = getEl(7);
  const floatTitle    = get(8) || 'Instant Approval';
  const floatBody     = get(9) || '98% of our basic policies are approved within minutes.';

  /* ── Heading split ───────────────────────────────────────
   * Strategy: find the LAST preposition / article before the
   * meaningful tail, split there so the <em> block is a coherent
   * phrase. Split on word boundary only — never mid-word.
   * ─────────────────────────────────────────────────────── */
  function buildHeading(raw) {
    // Strip any existing em tags from document content
    const clean = raw.replace(/<\/?em>/gi, '');

    // Trigger words — split AFTER the space preceding this word
    const TRIGGERS = ['what ', 'how ', 'why ', 'your ', 'that ', 'with '];
    const lower = clean.toLowerCase();

    for (const trigger of TRIGGERS) {
      const idx = lower.indexOf(trigger);
      if (idx > 0) {
        const head = clean.slice(0, idx).trimEnd();
        const tail = clean.slice(idx);
        return `${head} <em>${tail}</em>`;
      }
    }

    // Fallback: last 40% of words go into em
    const words = clean.trim().split(' ');
    const splitAt = Math.max(1, Math.floor(words.length * 0.6));
    return `${words.slice(0, splitAt).join(' ')} <em>${words.slice(splitAt).join(' ')}</em>`;
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
        
         <a
           href="${primaryHref}"
           id="hero-quote"
           class="btn btn-primary btn-lg"
           data-analytics-location="Hero">
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
  // Adobe Data Layer tracking
const heroButton = block.querySelector('#hero-quote');

if (heroButton) {
  heroButton.addEventListener('click', () => {

    window.adobeDataLayer = window.adobeDataLayer || [];

   window.adobeDataLayer.push({
    event: "quoteClick",
    buttonName: "Get Quote",
    buttonLocation: "Hero"
});

    console.log('Hero Quote Clicked');
  });
}
}
