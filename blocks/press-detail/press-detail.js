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
            <strong>ShieldGuard Media Relations</strong>
            <p>press@shieldguard.com</p>
          </div>

        </div>

        <div class="press-author-actions">

          <button aria-label="Share article">

            <svg xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
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

          <button aria-label="Print article">

            <svg xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
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

          </button>

        </div>

      </div>

      <div class="press-content">

<pre>
# ${data.title || ''}

New York, NY — ${data.date || ''} — ShieldGuard P&C Insurance,
a leading provider of digital-first property and casualty insurance,
announced continued innovation and growth across its insurance platform.

The award recognizes ShieldGuard's commitment to leveraging
artificial intelligence and machine learning to simplify claims,
improve customer satisfaction, and reduce processing times.

## Revolutionizing the Claims Experience

ShieldGuard's InstantClaim™ platform now allows policyholders
to submit and track claims in real-time.

"Our mission has always been to modernize insurance,"
said Jane Doe, CEO of ShieldGuard.

## About ShieldGuard

ShieldGuard is a technology-driven P&C insurance provider
headquartered in New York.
</pre>

      </div>

      <div class="media-contact-box">

        <h3>Media Contact</h3>

        <div class="media-grid">

          <div>
            <strong>Corporate Communications</strong>
            <p>ShieldGuard P&C Insurance</p>
            <p>Email: press@shieldguard.com</p>
          </div>

          <div>
            <strong>Investor Relations</strong>
            <p>Email: ir@shieldguard.com</p>
            <p>Phone: (800) 555-0199</p>
          </div>

        </div>

      </div>

      <div class="recent-announcements">

        <h3>Recent Announcements</h3>

        <div class="announcement-grid">

          <a href="/press/commercial-property-coverage"
             class="announcement-card">

            <span>NEXT RELEASE</span>

            <h4>
              ShieldGuard Expands Commercial Property Coverage
            </h4>

          </a>

          <a href="/press/q4-2025-growth"
             class="announcement-card">

            <span>PREVIOUS RELEASE</span>

            <h4>
              ShieldGuard Reports Record Growth in Q4 2025
            </h4>

          </a>

        </div>

      </div>

      <div class="press-bottom-cta">

        <a href="/press">
          Back to Press Center
        </a>

      </div>

    </div>
  `;
}
