export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  const data = {};

  rows.forEach((row) => {
    const cols = [...row.children];

    if (cols.length >= 2) {
      data[cols[0].textContent.trim().toLowerCase()] =
        cols[1].textContent.trim();
    }
  });

  block.innerHTML = `
    <div class="cta-wrapper">

      <div class="cta-content">

        <h2>${data.heading || ''}</h2>

        <p>${data.body || ''}</p>

        <a href="${data['button link'] || '#'}">
          ${data['button text'] || ''}
        </a>

      </div>

    </div>
  `;
}
