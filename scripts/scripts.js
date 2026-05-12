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
    if (document.querySelector(`head > link[href="${href}"]`)) { resolve(); return; }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload  = resolve;
    link.onerror = reject;
    document.head.append(link);
  });
}

/**
 * Loads a block's CSS and JS, then calls decorate(block).
 */
async function loadBlock(block) {
  const status = block.getAttribute('data-block-status');
  if (status === 'loaded' || status === 'loading') return;
  block.setAttribute('data-block-status', 'loading');

  const blockName = block.getAttribute('data-block-name');
  const base = `/blocks/${blockName}/${blockName}`;

  await Promise.all([
    loadCSS(`${base}.css`).catch(() => {}),
    import(`${base}.js`)
      .then((mod) => mod.default && mod.default(block))
      .catch((err) => console.warn(`Block "${blockName}" failed to load:`, err)),
  ]);

  block.setAttribute('data-block-status', 'loaded');
}

/**
 * Decorates a block element: sets data-block-name and wraps in section div.
 */
function decorateBlock(block) {
  const classes = [...block.classList];
  const blockName = classes[0];
  if (!blockName) return;
  block.setAttribute('data-block-name', blockName);
  block.setAttribute('data-block-status', 'initialized');
  const blockWrapper = block.parentElement;
  if (blockWrapper) blockWrapper.classList.add(`${blockName}-wrapper`);
}

/**
 * Decorate all blocks in a section.
 */
function decorateSections(main) {
  main.querySelectorAll(':scope > div').forEach((section) => {
    section.setAttribute('data-section-status', 'initialized');
    const blocks = section.querySelectorAll(':scope > div[class]');
    blocks.forEach(decorateBlock);
  });
}

/**
 * Load all blocks inside a section.
 */
async function loadBlocks(main) {
  const blocks = [...main.querySelectorAll('[data-block-status="initialized"]')];
  return Promise.all(blocks.map(loadBlock));
}

/**
 * Adds a scroll observer for appear-on-scroll animation.
 */
function observeScrollAnimations() {
  if (!window.IntersectionObserver) return;
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12 },
  );
  document.querySelectorAll('.appear-on-scroll').forEach((el) => observer.observe(el));
}

/**
 * Adds nav-height offset to page so content starts below the fixed nav.
 */
function applyNavOffset() {
  const main = document.querySelector('main');
  if (main) main.style.paddingTop = 'var(--nav-height)';
}

/**
 * Decorate anchors: open external links in new tab.
 */
function decorateLinks(main) {
  main.querySelectorAll('a').forEach((a) => {
    try {
      const url = new URL(a.href);
      if (url.origin !== window.location.origin) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    } catch { /* relative or malformed URL */ }
  });
}

/**
 * Build header and footer from their block files.
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
 * Marks heading elements with aria roles where needed.
 */
function decorateHeadings(main) {
  main.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((h) => {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
  });
}

/**
 * Lazy-load the deferred stylesheet.
 */
function loadLazyStyles() {
  loadCSS('/styles/lazy-styles.css');
}

/**
 * Main EDS page lifecycle.
 */
async function loadPage() {
  const main = document.querySelector('main');
  if (!main) return;

  // 1. Decorate sections & blocks (synchronous)
  decorateSections(main);
  decorateLinks(main);
  decorateHeadings(main);

  // 2. Load header/footer in parallel
  await loadHeaderFooter();

  // 3. Mark sections visible for LCP
  main.querySelectorAll('[data-section-status="initialized"]').forEach((s) => {
    s.setAttribute('data-section-status', 'loading');
  });

  // 4. Load above-the-fold blocks immediately
  const firstSection = main.querySelector('[data-section-status="loading"]');
  if (firstSection) {
    await loadBlocks(firstSection);
    firstSection.setAttribute('data-section-status', 'loaded');
  }

  // 5. Signal LCP complete
  document.body.classList.add('appear');

  // 6. Load remaining sections
  const remainingSections = [...main.querySelectorAll('[data-section-status="loading"]')];
  await Promise.all(remainingSections.map(async (section) => {
    await loadBlocks(section);
    section.setAttribute('data-section-status', 'loaded');
  }));

  // 7. Deferred / non-critical work
  applyNavOffset();
  observeScrollAnimations();
  window.setTimeout(loadLazyStyles, 3000);
}

loadPage();
