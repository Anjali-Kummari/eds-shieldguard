/**
 * ShieldGuard — Press Block
 */

function badge(category) {
  const colors = {
    Awards: '#00a86b',
    'Product Launch': '#7c3aed',
    Financials: '#0284c7',
  };

  return `
    <span
      class="press-badge"
      style="background:${colors[category] || '#08122e'}"
    >
      ${category}
    </span>
  `;
}

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

  const cards = [1, 2, 3].map((i) => ({
    category: data[`card ${i} category`] || '',
    date: data[`card ${i} date`] || '',
    title: data[`card ${i} title`] || '',
    excerpt: data[`card ${i} excerpt`] || '',
    link: data[`card ${i} link`] || '#',
  }));

  const mediaLinks =
    data['media kit links']
      ?.split(',')
      .map((item) => {
        const parts = item.trim().split(' ');

        const href = parts.pop();

        return {
          label: parts.join(' '),
          href,
        };
      }) || [];

  block.innerHTML = `
    <div class="press-page">

      <div class="press-hero">

        <div class="press-pill">
          ShieldGuard Newsroom
        </div>

        <h1>
          Press & <span>Media Center</span>
        </h1>

        <p>
          The latest news, announcements, and media resources from ShieldGuard.
          We're committed to transparency and sharing our journey as we redefine
          the insurance industry.
        </p>

      </div>

      <div class="press-layout">

        <div class="press-left">

          <h2 class="press-section-title">
            Recent Press Releases
          </h2>

          ${cards.map((card) => `
            <a
              class="press-card"
              href="${card.link}"
            >

              <div class="press-card-meta">

                ${badge(card.category)}

                <span class="press-date">
                  ${card.date}
                </span>

              </div>

              <h3>
                ${card.title}
              </h3>

              <p>
                ${card.excerpt}
              </p>

              <span class="press-link">
                Read Full Release ↗
              </span>

            </a>
          `).join('')}

        </div>

        <div class="press-right">

          <div class="media-kit">

            <h3>
              ${data['media kit title'] || 'Media Kit'}
            </h3>

            <p>
              Download our official brand assets, executive bios,
              and company fact sheets.
            </p>

            <div class="media-links">

              ${mediaLinks.map((item) => `
                <a href="${item.href}">
                  ${item.label}
                  <span>↓</span>
                </a>
              `).join('')}

            </div>

          </div>

          <div class="media-contact">

            <h3>
              ${data['media inquiries title']}
            </h3>

            <p>
              ${data['media inquiries text']}
            </p>

            <div class="contact-item">
              ✉ ${data['media inquiries email']}
            </div>

            <div class="contact-item">
              ☎ ${data['media inquiries phone']}
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
