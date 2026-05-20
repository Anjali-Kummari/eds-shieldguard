export default function decorate(block) {

  const rows = [...block.children];

  const data = {};

  rows.forEach((row) => {

    const cols = [...row.children];

    if (cols.length >= 2) {

      data[
        cols[0].textContent
          .trim()
          .toLowerCase()
      ] = cols[1].textContent.trim();

    }

  });

  block.innerHTML = `
    <div class="error-page">

      <div class="error-icon">
        🛡️
      </div>

      <h1>
        ${data.heading || ''}
      </h1>

      <p>
        ${data.description || ''}
      </p>

      <a
        href="${data['button link'] || '/'}"
        class="error-btn"
      >
        ${data['button text'] || 'Go Home'}
      </a>

      <span class="support-text">
        ${data['support text'] || ''}
      </span>

    </div>
  `;
}
