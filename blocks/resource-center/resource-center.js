/**
 * ShieldGuard — Resource Center Block
 *
 * Renders an article card grid with category filter tabs.
 * Clicking a card shows the full article inline (detail view).
 *
 * Document table format (one article = 6 rows):
 *   Row 0: category
 *   Row 1: title
 *   Row 2: excerpt
 *   Row 3: full content (HTML fragment or plain text)
 *   Row 4: date
 *   Row 5: read time | image URL
 *
 * Falls back to SAMPLE_ARTICLES when no content rows are present.
 */

const SAMPLE_ARTICLES = [
  {
    id: '1',
    category: 'Home',
    title: 'How to Lower Your Home Insurance Premium',
    excerpt: 'Discover simple steps you can take today to reduce your homeowners insurance costs without sacrificing coverage.',
    date: 'March 15, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    content: `
      <h2>1. Increase Your Deductible</h2>
      <p>By raising your deductible from $500 to $1,000 or $2,500, you can significantly reduce your monthly premium. Ensure you have savings set aside to cover the higher cost if you need to file a claim.</p>
      <h2>2. Bundle Your Policies</h2>
      <p>Combining your home and auto insurance with ShieldGuard can save you up to 15% on both premiums.</p>
      <h2>3. Improve Home Security</h2>
      <p>Installing a monitored alarm system, smoke detectors, and deadbolt locks can lower your insurance costs. Some insurers also offer discounts for smart home technology.</p>
      <h2>4. Review Your Coverage Annually</h2>
      <p>As your home ages or you make improvements, your insurance needs change. Regularly reviewing your policy ensures you're not over-paying.</p>
      <h2>5. Maintain a Good Credit Score</h2>
      <p>In many states, insurers use credit-based insurance scores to determine premiums. A solid credit history can lead to lower rates.</p>`,
  },
  {
    id: '2',
    category: 'Auto',
    title: 'Understanding Liability Coverage in Auto Insurance',
    excerpt: 'Liability coverage is the foundation of any auto policy. Learn what it covers and how much you actually need.',
    date: 'March 10, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    content: `
      <h2>What Does Liability Cover?</h2>
      <p>Liability coverage typically consists of two parts:</p>
      <ul>
        <li><strong>Bodily Injury Liability:</strong> Covers medical expenses and legal fees for people injured in an accident you caused.</li>
        <li><strong>Property Damage Liability:</strong> Pays for repairs to other people's property damaged in an accident you caused.</li>
      </ul>
      <h2>How Much Do You Need?</h2>
      <p>State minimums are rarely enough. We generally recommend limits of at least $100,000 per person and $300,000 per accident for bodily injury to fully protect your assets.</p>`,
  },
  {
    id: '3',
    category: 'Business',
    title: 'Top 5 Risks for Small Businesses in 2026',
    excerpt: 'From cyber threats to supply chain disruptions, we analyse the biggest challenges facing business owners this year.',
    date: 'March 5, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=800',
    content: `
      <h2>1. Cyber Threats</h2>
      <p>Data breaches and ransomware attacks increasingly target small businesses because they may have weaker security measures in place.</p>
      <h2>2. Supply Chain Disruptions</h2>
      <p>Global events continue to impact the availability of goods. Diversifying your suppliers mitigates this risk.</p>
      <h2>3. Regulatory Changes</h2>
      <p>New laws regarding employment, data privacy, and environmental standards can impact your operations and liability.</p>
      <h2>4. Labour Shortages</h2>
      <p>Finding and retaining skilled talent remains a top concern for growth and productivity.</p>
      <h2>5. Inflation and Economic Volatility</h2>
      <p>Rising costs for materials and overhead require careful financial planning and flexible insurance coverage.</p>`,
  },
  {
    id: '4',
    category: 'Claims',
    title: 'What to Do Immediately After a Car Accident',
    excerpt: 'A step-by-step guide to staying safe and ensuring your insurance claim process goes smoothly after a collision.',
    date: 'February 28, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&q=80&w=800',
    content: `
      <h2>1. Check for Injuries</h2>
      <p>First ensure everyone is safe. Call 911 immediately if there are any injuries.</p>
      <h2>2. Move to Safety</h2>
      <p>If possible, move your vehicle out of traffic to a safe location.</p>
      <h2>3. Exchange Information</h2>
      <p>Get the name, contact info, and insurance details of all other drivers. Collect witness contact info as well.</p>
      <h2>4. Document the Scene</h2>
      <p>Take photos of all vehicle damage, the surrounding area, and any relevant road signs or signals.</p>
      <h2>5. File a Report</h2>
      <p>Even for minor accidents, a police report is invaluable when filing an insurance claim.</p>`,
  },
];

function categoryBadge(cat) {
  const colors = {
    Home: '#059669', Auto: '#0284c7', Business: '#7c3aed', Claims: '#dc2626',
  };
  const bg = colors[cat] || '#334155';
  return `<span class="badge" style="background:${bg};color:#fff;font-size:var(--font-size-xs);">${cat}</span>`;
}

function renderGrid(articles, activeFilter, block) {
  const categories = ['All', ...new Set(articles.map((a) => a.category))];
  const visible = activeFilter === 'All' ? articles : articles.filter((a) => a.category === activeFilter);

  block.innerHTML = `
    <div class="resource-center-inner">
      <div class="resource-header">
        <h1>Resource Center</h1>
        <p>Guides, tips, and expert advice to help you make smarter insurance decisions.</p>
      </div>

      <div class="resource-filters">
        ${categories.map((cat) => `
          <button class="resource-filter-btn${cat === activeFilter ? ' active' : ''}" data-cat="${cat}">
            ${cat}
          </button>`).join('')}
      </div>

      <div class="resource-grid">
        ${visible.map((article) => `
          <div class="article-card" data-article-id="${article.id}" role="button" tabindex="0"
            aria-label="Read article: ${article.title}">
            <div class="article-card-image">
              <img src="${article.image}" alt="${article.title}" loading="lazy"
                width="800" height="450" referrerpolicy="no-referrer">
            </div>
            <div class="article-card-body">
              <div class="article-card-meta">
                ${categoryBadge(article.category)}
                <span class="article-card-read-time">${article.readTime}</span>
              </div>
              <h3>${article.title}</h3>
              <p>${article.excerpt}</p>
              <div class="article-card-footer">
                <span class="article-card-date">${article.date}</span>
                <span class="link-arrow">Read More</span>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  // Filter tabs
  block.querySelectorAll('.resource-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      renderGrid(articles, btn.dataset.cat, block);
    });
  });

  // Article card clicks
  block.querySelectorAll('.article-card').forEach((card) => {
    const handler = () => {
      const article = articles.find((a) => a.id === card.dataset.articleId);
      if (article) renderDetail(article, articles, block);
    };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') handler(); });
  });
}

function renderDetail(article, articles, block) {
  block.innerHTML = `
    <div class="article-detail">
      <div class="article-detail-inner">
        <button class="btn btn-outline" id="article-back" style="margin-bottom:var(--space-8);">
          ← Back to Resources
        </button>
        <div class="article-detail-meta">
          ${categoryBadge(article.category)}
          <span class="article-detail-read-time">${article.readTime}</span>
          <span class="article-detail-divider">·</span>
          <span class="article-detail-date">${article.date}</span>
        </div>
        <h1>${article.title}</h1>
        <div class="article-detail-hero-image">
          <img src="${article.image}" alt="${article.title}" loading="lazy"
            width="1200" height="675" referrerpolicy="no-referrer">
        </div>
        <div class="prose">${article.content}</div>
      </div>
    </div>`;

  block.querySelector('#article-back')?.addEventListener('click', () => {
    renderGrid(articles, 'All', block);
  });
}

export default function decorate(block) {
  // Parse articles from document table if present
  const rows = [...block.children];
  let articles = SAMPLE_ARTICLES;

  if (rows.length >= 6) {
    const parsed = [];
    let id = 1;
    for (let i = 0; i + 5 < rows.length; i += 6) {
      parsed.push({
        id: String(id++),
        category: rows[i]?.children[1]?.textContent.trim()     || 'General',
        title:    rows[i + 1]?.children[1]?.textContent.trim() || '',
        excerpt:  rows[i + 2]?.children[1]?.textContent.trim() || '',
        content:  rows[i + 3]?.children[1]?.innerHTML          || '',
        date:     rows[i + 4]?.children[1]?.textContent.trim() || '',
        readTime: rows[i + 5]?.children[1]?.textContent.trim() || '5 min read',
        image:    rows[i + 5]?.children[1]?.querySelector('img')?.src
                  || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
      });
    }
    if (parsed.length) articles = parsed;
  }

  renderGrid(articles, 'All', block);
}
