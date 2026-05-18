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

      <div class="press-detail-meta">

        <span class="press-detail-badge">
          ${data.category || ''}
        </span>

        <span class="press-detail-date">
          ${data.date || ''}
        </span>

      </div>

      <h1>
        ${data.title || ''}
      </h1>

      <div class="press-detail-body">
        <p>
          ${data.body || ''}
        </p>
      </div>

      <a href="/press" class="press-back-link">
        ← Back to Press Center
      </a>

    </div>
  `;
}
