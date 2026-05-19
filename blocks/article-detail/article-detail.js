/**
 * ShieldGuard — Article Detail
 */

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1400';

export default function decorate(block) {
  const rows = [...block.children];

  const data = {};

  rows.forEach((row) => {
    const cols = [...row.children];

    if (cols.length >= 2) {
      const key = cols[0].textContent.trim().toLowerCase();

      data[key] = cols[1];
    }
  });

  const image =
    data['hero image']
      ?.querySelector('img')
      ?.src || FALLBACK_IMAGE;

  const sections = [1, 2, 3, 4, 5]
    .map((i) => ({
      title:
        data[`section ${i} title`]?.textContent.trim() || '',

      body:
        data[`section ${i} body`]?.textContent.trim() || '',
    }))
    .filter((s) => s.title);

  block.innerHTML = `
    <div class="article-detail-wrapper">

      <a href="/resources" class="back-link">
        ← Back to Resources
      </a>

      <div class="article-top-meta">

        <span class="article-category">
          ${data.category?.textContent || 'HOME'}
        </span>

        <span class="article-date">
          ${data.date?.textContent || 'March 15, 2024'}
        </span>

        <span class="article-read-time">
          ${data['read time']?.textContent || '5 min read'}
        </span>

      </div>

      <h1 class="article-main-title">
        ${data.title?.textContent || ''}
      </h1>

      <div class="article-author">

        <div class="author-left">

          <div class="author-avatar">
            SG
          </div>

          <div class="author-meta">

            <strong>
              ${data.author?.textContent || ''}
            </strong>

            <span>
              ${data.role?.textContent || ''}
            </span>

          </div>

        </div>

        <button class="share-btn" aria-label="Share article">

          <svg xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">

            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>

          </svg>

        </button>

      </div>

      <div class="article-image">

        <img
          src="${image}"
          alt="${data.title?.textContent || ''}"
          loading="eager"
        >

      </div>

      <div class="article-content">

        <p class="article-excerpt">
          ${data.excerpt?.textContent || ''}
        </p>

        <div class="article-sections">

          ${sections.map((section) => `
            <section class="article-section">

              <h2>
                ${section.title}
              </h2>

              <p>
                ${section.body}
              </p>

            </section>
          `).join('')}

        </div>

      </div>

      <div class="article-feedback">

        <h3>
          ${data['helpful title']?.textContent || ''}
        </h3>

        <div class="feedback-buttons">

          <button>
            ${data['helpful button 1']?.textContent || ''}
          </button>

          <button>
            ${data['helpful button 2']?.textContent || ''}
          </button>

        </div>

      </div>

    </div>
  `;
}
