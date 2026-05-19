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
          ↗
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

        <h1>
          ${data.title?.textContent || ''}
        </h1>

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
