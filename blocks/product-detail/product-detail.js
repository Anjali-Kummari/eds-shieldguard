export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  const data = {};

  rows.forEach((row) => {
    const cols = [...row.children];

    if (cols.length >= 2) {
      const key = cols[0].textContent.trim().toLowerCase();
      data[key] = cols[1];
    }
  });

  const image =
    data.image?.querySelector('picture')?.outerHTML ||
    data.image?.querySelector('img')?.outerHTML ||
    '';

  block.innerHTML = `
    <div class="product-detail-wrapper">

      <div class="product-detail-left">

        <div class="product-icon">
          🏠
        </div>

        <h1 class="product-heading">
          ${data.heading?.textContent || ''}
        </h1>

        <p class="product-body">
          ${data.body?.textContent || ''}
        </p>

        <h3 class="features-heading">
          Key Coverage Features
        </h3>

        <div class="features-grid">

          <div class="feature-card">
            <h4>${data['feature 1 title']?.textContent || ''}</h4>
            <p>${data['feature 1 body']?.textContent || ''}</p>
          </div>

          <div class="feature-card">
            <h4>${data['feature 2 title']?.textContent || ''}</h4>
            <p>${data['feature 2 body']?.textContent || ''}</p>
          </div>

          <div class="feature-card">
            <h4>${data['feature 3 title']?.textContent || ''}</h4>
            <p>${data['feature 3 body']?.textContent || ''}</p>
          </div>

          <div class="feature-card">
            <h4>${data['feature 4 title']?.textContent || ''}</h4>
            <p>${data['feature 4 body']?.textContent || ''}</p>
          </div>

        </div>

        <div class="product-cta">

          <h2>
            ${data['cta heading']?.textContent || ''}
          </h2>

          <p>
            ${data['cta body']?.textContent || ''}
          </p>

          <a href="${data['cta link']?.textContent || '#'}">
            ${data['cta button']?.textContent || ''}
          </a>

        </div>

      </div>

      <div class="product-detail-right">

        <div class="product-image">
          ${image}
        </div>

        <div class="stats-grid">

          <div class="stat-card">
            <span>${data['stat 1 label']?.textContent || ''}</span>
            <strong>${data['stat 1 value']?.textContent || ''}</strong>
          </div>

          <div class="stat-card">
            <span>${data['stat 2 label']?.textContent || ''}</span>
            <strong>${data['stat 2 value']?.textContent || ''}</strong>
          </div>

          <div class="stat-card">
            <span>${data['stat 3 label']?.textContent || ''}</span>
            <strong>${data['stat 3 value']?.textContent || ''}</strong>
          </div>

        </div>

      </div>

    </div>
  `;
}
