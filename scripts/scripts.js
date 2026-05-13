/**
 * ShieldGuard P&C — AEM EDS scripts.js
 * Follows the adobe/aem-boilerplate pattern.
 */

/**
 * Load a CSS file.
 * @param {string} href
 */
export function loadCSS(href) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`head > link[href="${href}"]`)) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;

    document.head.append(link);
  });
}

/**
 * Decorate a block element.
 */
function decorateBlock(block) {
  const classes = [...block.classList];
  const blockName = classes[0];

  if (!blockName) return;

  block.setAttribute('data-block-name', blockName);
  block.setAttribute('data-block-status', 'initialized');

  const blockWrapper = block.parentElement;

  if (blockWrapper) {
    blockWrapper.classList.add(`${blockName}-wrapper`);
  }
}

/**
 * Decorate all sections and blocks.
 */
function decorateSections(main) {
  main.querySelectorAll(':scope > div').forEach((section) => {
    section.setAttribute('data-section-status', 'initialized');

    const blocks = section.querySelectorAll(':scope > div[class]');

    blocks.forEach(decorateBlock);
  });
}

/**
 * Decorate links.
 */
function decorateLinks(main) {
  main.querySelectorAll('a').forEach((a) => {
    try {
      const url = new URL(a.href);

      if (url.origin !== window.location.origin) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    } catch {
      // Ignore malformed URLs
    }
  });
}

/**
 * Decorate headings.
 */
function decorateHeadings(main) {
  main.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    if (!heading.id) {
      heading.id = heading.textContent
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-');
    }
  });
}

/**
 * Exported decorateMain for fragment support.
 */
export function decorateMain(main) {
  decorateSections(main);
  decorateLinks(main);
  decorateHeadings(main);
}

/**
 * Load a block's CSS and JS.
 */
async function loadBlock(block) {
  const status = block.getAttribute('data-block-status');

  if (status === 'loaded' || status === 'loading') {
    return;
  }

  block.setAttribute('data-block-status', 'loading');

  const blockName = block.getAttribute('data-block-name');
  const base = `/blocks/${blockName}/${blockName}`;

  await Promise.all([
    loadCSS(`${base}.css`).catch(() => {}),
    import(`${base}.js`)
      .then((mod) => {
        if (mod.default) {
          mod.default(block);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(`Block '${blockName}' failed to load:`, err);
      }),
  ]);

  block.setAttribute('data-block-status', 'loaded');
}

/**
 * Load all blocks.
 */
async function loadBlocks(main) {
  const blocks = [
    ...main.querySelectorAll('[data-block-status="initialized"]'),
  ];

  return Promise.all(blocks.map(loadBlock));
}

/**
 * Scroll animations.
 */
function observeScrollAnimations() {
  if (!window.IntersectionObserver) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  document.querySelectorAll('.appear-on-scroll').forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Apply nav offset.
 */
function applyNavOffset() {
  const main = document.querySelector('main');

  if (main) {
    main.style.paddingTop = 'var(--nav-height)';
  }
}

/**
 * Load header and footer blocks.
 */
async function loadHeaderFooter() {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  if (header) {
    const headerBlock = document.createElement('div');

    headerBlock.className = 'header';

    header.append(headerBlock);

    decorateBlock(headerBlock);

    await loadBlock(headerBlock);
  }

  if (footer) {
    const footerBlock = document.createElement('div');

    footerBlock.className = 'footer';

    footer.append(footerBlock);

    decorateBlock(footerBlock);

    await loadBlock(footerBlock);
  }
}

/**
 * Load deferred styles.
 */
function loadLazyStyles() {
  loadCSS('/styles/lazy-styles.css');
}

/**
 * Main page lifecycle.
 */
async function loadPage() {
  const main = document.querySelector('main');

  if (!main) {
    return;
  }

  // Decorate page
  decorateMain(main);

  // Load header/footer
  await loadHeaderFooter();

  // Mark sections
  main
    .querySelectorAll('[data-section-status="initialized"]')
    .forEach((section) => {
      section.setAttribute('data-section-status', 'loading');
    });

  // Load first section
  const firstSection = main.querySelector(
    '[data-section-status="loading"]',
  );

  if (firstSection) {
    await loadBlocks(firstSection);

    firstSection.setAttribute('data-section-status', 'loaded');
  }

  // Mark page visible
  document.body.classList.add('appear');

  // Load remaining sections
  const remainingSections = [
    ...main.querySelectorAll('[data-section-status="loading"]'),
  ];

  await Promise.all(
    remainingSections.map(async (section) => {
      await loadBlocks(section);

      section.setAttribute('data-section-status', 'loaded');
    }),
  );

  // Deferred work
  applyNavOffset();
  observeScrollAnimations();

  window.setTimeout(loadLazyStyles, 3000);
}

loadPage();
(async function loadDa() {
  if (!new URL(window.location.href).searchParams.get('dapreview')) return;

  import('https://da.live/scripts/dapreview.js')
    .then(({ default: daPreview }) => daPreview(loadPage));
}());
