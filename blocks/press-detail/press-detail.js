/**
 * ShieldGuard — Press Detail Block
 */

export default function decorate(block) {
  const rows = [...block.children];

  const data = {};

  rows.forEach((row) => {
    const cols = [...row.children];

    if (cols.length >= 2) {
      const key = cols[0].textContent.trim().toLowerCase();

      data[key] = cols[1].textContent.trim();
    }
  });

  block.innerHTML = `
    <div class="press-detail-page">

      <a href="/press" class="press-back-link">
        ← Back to Press Center
      </a>

      <div class="press-meta">

        <span class="press-badge">
          FOR IMMEDIATE RELEASE
        </span>

        <span class="press-date">

          <svg xmlns="http://www.w3.org/2000/svg"
               width="16"
               height="16"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round">

            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>

          </svg>

          ${data.date || ''}

        </span>

        <span class="press-category">
          ${data.category || ''}
        </span>

      </div>

      <h1 class="press-title">
        ${data.title || ''}
      </h1>

      <div class="press-author">

        <div class="press-author-left">

          <div class="author-avatar">
            SG
          </div>

          <div class="author-info">

            <strong>
              ShieldGuard Media Relations
            </strong>

            <p>
              press@shieldguard.com
            </p>

          </div>

        </div>

        <div class="press-author-actions">

          <button aria-label="Share article">

            <svg xmlns="http://www.w3.org/2000/svg"
                 width="18"
                 height="18"
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

            <span>Share</span>

          </button>

          <button aria-label="Print article">

            <svg xmlns="http://www.w3.org/2000/svg"
                 width="18"
                 height="18"
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
                 stroke-width="2"
                 stroke-linecap="round"
                 stroke-linejoin="round">

              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>

            </svg>

            <span>Print</span>

          </button>

        </div>

      </div>

      <div class="press-article">

        <h2>
          ${data.title || ''}
        </h2>

        <p>
          <strong>
            NEW YORK, NY — ${data.date || ''}
          </strong>
          — ${data.body || ''}
        </p>

        <h3>
          ${data['section 1 title'] || ''}
        </h3>

        <p>
          ${data['section 1 body'] || ''}
        </p>

        <blockquote>
          ${data.quote || ''}
        </blockquote>

        <h3>
          ${data['section 2 title'] || ''}
        </h3>

        <p>
          ${data['section 2 body'] || ''}
        </p>

      </div>

      <div class="media-contact-box">

        <h3>
          Public Relations Contact
        </h3>

        <div class="media-grid">

          <div>

            <span class="media-label">
              CORPORATE COMMUNICATIONS
            </span>

            <strong>
              Sarah Jenkins
            </strong>

            <p>
              Director of Communications
            </p>

            <a href="mailto:jenkins@shieldguard.com">
              jenkins@shieldguard.com
            </a>

          </div>

          <div>

            <span class="media-label">
              INVESTOR RELATIONS
            </span>

            <strong>
              Marcus Thorne
            </strong>

            <p>
              Head of Investor Relations
            </p>

            <a href="mailto:ir@shieldguard.com">
              ir@shieldguard.com
            </a>

            <p>
              +1 (800) 555-0199
            </p>

          </div>

        </div>

      </div>

      <div class="recent-announcements">

        <div class="recent-header">

          <h3>
            Recent Announcements
          </h3>

          <a href="/press">
            View All
          </a>

        </div>

        <div class="announcement-grid">

          <a href="/press/commercial-property-coverage"
             class="announcement-card">

            <span>
              NEXT RELEASE
            </span>

            <h4>
              ShieldGuard Expands Commercial Property Coverage...
            </h4>

          </a>

          <a href="/press/q4-2025-growth"
             class="announcement-card">

            <span>
              PREVIOUS RELEASE
            </span>

            <h4>
              ShieldGuard Reports Growth in Q4 2025
            </h4>

          </a>

        </div>

      </div>

      <div class="press-bottom-cta">

        <a href="/press">
          BACK TO NEWSROOM
        </a>

      </div>

    </div>
  `;
}
