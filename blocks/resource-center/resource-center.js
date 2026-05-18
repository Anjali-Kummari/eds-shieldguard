/**
 * ShieldGuard — Resource Center Block
 * Clean resource/blog cards without filter tabs
 */

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800';

function categoryBadge(cat) {
  const colors = {
    HOME: '#059669',
    AUTO: '#0284c7',
    BUSINESS: '#7c3aed',
    CLAIMS: '#dc2626',
  };

  const bg = colors[cat] || '#334155';

  return `
    <span class="badge"
      style="
        background:${bg};
        color:#fff;
        padding:6px 12px;
        border-radius:999px;
        font-size:12px;
        font-weight:700;
        letter-spacing:0.4px;
      ">
      ${cat}
    </span>
  `;
}

function renderGrid(articles, block) {
  block.innerHTML = `
    <div class="resource-center-inner">

      <div class="resource-header">
        <h1>Resource Center</h1>

        <p>
          Guides, tips, and expert advice to help you make smarter insurance decisions.
        </p>
      </div>

      <div class="resource-grid">

        ${articles.map((article) => `
          <article class="article-card">

            <div class="article-card-image">
              <img
                src="${article.image}"
                alt="${article.title}"
                loading="lazy"
                width="800"
                height="450"
                referrerpolicy="no-referrer"
              >
            </div>

            <div class="article-card-body">

              <div class="article-card-meta">
                ${categoryBadge(article.category)}

                <span class="article-card-read-time">
                  ${article.readTime}
                </span>
              </div>

              <h3>${article.title}</h3>

              <p>${article.excerpt}</p>

              <div class="article-card-footer">

                <span class="article-card-date">
                  ${article.date}
                </span>

                <a
                  href="${article.link}"
                  class="article-read-link"
                >
                  ${article.cta}
                </a>

              </div>
            </div>

          </article>
        `).join('')}

      </div>

      <div class="resource-support">

        <h2>Can't find what you're looking for?</h2>

        <p>
          Our support team is available 24/7 to answer any questions
          about your policy or coverage options.
        </p>

        <a href="/contact" class="support-btn">
          Contact Support
        </a>

      </div>

    </div>
  `;
}

export default function decorate(block) {
  const rows = [...block.children];

  const articles = [];

  for (let i = 3; i + 7 < rows.length; i += 8) {
    articles.push({
      category:
        rows[i]?.children[1]?.textContent.trim() || 'GENERAL',

      readTime:
        rows[i + 1]?.children[1]?.textContent.trim() || '5 min read',

      title:
        rows[i + 2]?.children[1]?.textContent.trim() || '',

      excerpt:
        rows[i + 3]?.children[1]?.textContent.trim() || '',

      date:
        rows[i + 4]?.children[1]?.textContent.trim() || '',

      cta:
        rows[i + 5]?.children[1]?.textContent.trim() || 'Read Article',

      link:
        rows[i + 6]?.children[1]?.textContent.trim() || '#',

      image:
        rows[i + 7]
          ?.children[1]
          ?.querySelector('img')
          ?.src || FALLBACK_IMAGE,
    });
  }

  renderGrid(articles, block);
}
