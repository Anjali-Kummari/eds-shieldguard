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

  const heading = data.heading?.textContent.trim() || '';

  const body = data.body?.textContent.trim() || '';

  const primaryCTA = data['primary cta']?.textContent.trim() || '';

  const primaryLink = data['primary cta link']?.textContent.trim() || '#';

  const secondaryCTA = data['secondary cta']?.textContent.trim() || '';

  const secondaryLink = data['secondary cta link']?.textContent.trim() || '#';

  const badge = data['badge text']?.textContent.trim() || '';

  const imageElement =
    data.image?.querySelector('picture') ||
    data.image?.querySelector('img');

  const imageHTML = imageElement ? imageElement.outerHTML : '';

  block.innerHTML = `
    <div class="hero-wrapper">

      <div class="hero-content">

        <div class="hero-badge">
          ${badge}
        </div>

        <h1 class="hero-heading">
          ${heading}
        </h1>

        <p class="hero-body">
          ${body}
        </p>

        <div class="hero-actions">

          <a class="hero-primary-btn" href="${primaryLink}">
            ${primaryCTA}
          </a>

          <a class="hero-secondary-btn" href="${secondaryLink}">
            ${secondaryCTA}
          </a>

        </div>

      </div>

      <div class="hero-image">
        ${imageHTML}
      </div>

    </div>
  `;
}
