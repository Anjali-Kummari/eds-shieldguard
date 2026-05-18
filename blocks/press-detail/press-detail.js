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

        <div class="author-avatar">
          SG
        </div>

        <div>
          <strong>ShieldGuard Media Relations</strong>
          <p>press@shieldguard.com</p>
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
