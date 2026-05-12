/**
 * ShieldGuard — Press Block
 *
 * Reads press releases from the block table rows.
 * Each release is 4 rows: date | category | title | excerpt
 * An optional 5th row per release holds full content (plain HTML/markdown fragment path).
 *
 * Falls back to hard-coded sample data when no content is present.
 */

const SAMPLE_RELEASES = [
  {
    id: '1',
    date: 'March 20, 2026',
    category: 'Awards',
    title: "ShieldGuard Named 'Most Innovative Insurer' for 2026",
    excerpt: "The annual P&C Insurance Awards recognised ShieldGuard for its groundbreaking digital claims platform.",
    content: `
      <p><strong>NEW YORK, NY — March 20, 2026</strong> — ShieldGuard P&C Insurance has been named the "Most Innovative Insurer" of 2026 by the Global P&C Insurance Awards committee.</p>
      <p>The award recognises ShieldGuard's commitment to leveraging artificial intelligence and machine learning to simplify the insurance lifecycle, from quote generation to claims settlement.</p>
      <h2>Revolutionising the Claims Experience</h2>
      <p>The centrepiece of ShieldGuard's innovation is its new "InstantClaim" platform, which allows policyholders to file claims via a mobile app and receive payouts in as little as 24 hours for standard property damage.</p>
      <p>"We are honoured to receive this recognition," said Jane Doe, CEO of ShieldGuard. "Our goal has always been to remove the friction from insurance."</p>`,
  },
  {
    id: '2',
    date: 'February 15, 2026',
    category: 'Product Launch',
    title: 'ShieldGuard Expands Commercial Property Coverage for Small Businesses',
    excerpt: 'New enhancements to our business insurance suite provide better protection against cyber threats and supply chain risks.',
    content: `
      <p><strong>NEW YORK, NY — February 15, 2026</strong> — ShieldGuard today announced a significant expansion of its commercial property insurance offerings, specifically tailored to the evolving needs of small and mid-sized businesses.</p>
      <p>The updated suite includes enhanced protection for cyber-related business interruptions and expanded coverage for supply chain disruptions.</p>
      <h2>Addressing Modern Business Risks</h2>
      <p>"Small businesses are the backbone of our economy, but they are also increasingly vulnerable to digital and global risks," said Michael Smith, Head of Commercial Lines.</p>`,
  },
  {
    id: '3',
    date: 'January 10, 2026',
    category: 'Financials',
    title: 'ShieldGuard Reports Record Growth in Q4 2025',
    excerpt: "Strong performance in auto and homeowners segments drives a 15% year-over-year increase in written premiums.",
    content: `
      <p><strong>NEW YORK, NY — January 10, 2026</strong> — ShieldGuard P&C Insurance today reported record financial results for Q4 and the full year ended December 31, 2025.</p>
      <ul>
        <li><strong>Gross Written Premiums:</strong> Increased 15% year-over-year to $1.2 billion.</li>
        <li><strong>Net Income:</strong> Rose 12% to $150 million.</li>
        <li><strong>Combined Ratio:</strong> Improved to 92.5%.</li>
      </ul>`,
  },
];

function categoryBadge(cat) {
  const map = {
    Awards: 'var(--color-brand-primary)',
    'Product Launch': '#7c3aed',
    Financials: '#0284c7',
  };
  const bg = map[cat] || 'var(--color-neutral-700)';
  return `<span class="badge" style="background-color:${bg};color:#fff;font-size:var(--font-size-xs);">${cat}</span>`;
}

function renderList(releases, block) {
  block.innerHTML = `
    <div class="press-inner">
      <div class="press-header">
        <h1>Newsroom</h1>
        <p>The latest announcements, product updates, and company news from ShieldGuard.</p>
      </div>
      <div class="press-list">
        ${releases.map((r) => `
          <div class="press-card" data-release-id="${r.id}" role="button" tabindex="0"
            aria-label="Read press release: ${r.title}">
            <div class="press-card-meta">
              ${categoryBadge(r.category)}
              <span class="press-card-date">${r.date}</span>
            </div>
            <h3>${r.title}</h3>
            <p>${r.excerpt}</p>
            <div class="press-card-footer">
              <span class="link-arrow">Read Full Release</span>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  // Bind card clicks
  block.querySelectorAll('.press-card').forEach((card) => {
    const handler = () => {
      const release = releases.find((r) => r.id === card.dataset.releaseId);
      if (release) renderDetail(release, block, releases);
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') handler(); });
  });
}

function renderDetail(release, block, releases) {
  block.innerHTML = `
    <div class="press-detail">
      <div class="press-detail-inner">
        <button class="btn btn-outline" id="press-back" style="margin-bottom:var(--space-8);">
          ← Back to Newsroom
        </button>
        <div class="press-detail-meta">
          ${categoryBadge(release.category)}
          <span class="press-detail-date">${release.date}</span>
        </div>
        <h1>${release.title}</h1>
        <hr class="press-detail-divider">
        <div class="prose">${release.content}</div>
      </div>
    </div>`;

  block.querySelector('#press-back')?.addEventListener('click', () => {
    renderList(releases, block);
  });
}

export default function decorate(block) {
  // Try to parse releases from document table rows
  const rows = [...block.children];
  let releases = SAMPLE_RELEASES;

  if (rows.length >= 4) {
    const parsed = [];
    let id = 1;
    for (let i = 0; i + 3 < rows.length; i += 4) {
      parsed.push({
        id: String(id++),
        date: rows[i]?.children[1]?.textContent.trim()     || '',
        category: rows[i + 1]?.children[1]?.textContent.trim() || 'News',
        title: rows[i + 2]?.children[1]?.textContent.trim()    || '',
        excerpt: rows[i + 3]?.children[1]?.textContent.trim()  || '',
        content: rows[i + 3]?.children[1]?.innerHTML           || '',
      });
    }
    if (parsed.length) releases = parsed;
  }

  renderList(releases, block);
}
