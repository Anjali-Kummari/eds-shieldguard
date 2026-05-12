# ShieldGuard P&C Insurance — AEM EDS Site

A fully-structured Adobe Experience Manager Edge Delivery Services (EDS) site
built from the **ShieldGuard** P&C insurance design. Based on the
[adobe/aem-boilerplate](https://github.com/adobe/aem-boilerplate) pattern.

---

## Project Structure

```
shieldguard-eds/
├── styles/
│   ├── styles.css          ← Design tokens, reset, typography, utilities (critical)
│   └── lazy-styles.css     ← Animations, chat widget, non-critical CSS (deferred)
│
├── scripts/
│   └── scripts.js          ← EDS page lifecycle: section discovery, block loading
│
├── blocks/
│   ├── header/             ← Fixed nav, mobile hamburger, scroll shadow
│   ├── footer/             ← 4-column dark footer, social, legal links
│   ├── hero/               ← Two-column hero, floating approval badge
│   ├── services/           ← 3-column icon card grid
│   ├── quote/              ← 4-step interactive quote flow
│   ├── claims/             ← Mosaic visual + checklist copy
│   ├── cards/              ← Emerald CTA banner
│   ├── contact/            ← Form + channel cards + HQ card
│   ├── about/              ← Stats, values grid, story section
│   ├── press/              ← Press release list + inline detail view
│   └── resource-center/    ← Article card grid + category filters + detail view
│
├── fonts/                  ← Inter font files (add .woff2 files here)
├── icons/                  ← SVG icons (optional)
│
├── index.html              ← Homepage
├── nav.html                ← Navigation document (consumed by header block)
├── about.html
├── contact.html
├── press.html
└── resources.html
```

---

## Design Tokens (CSS Variables)

All design decisions live in `styles/styles.css` under `:root {}`.

| Token | Value | Usage |
|---|---|---|
| `--color-brand-primary` | `#059669` (emerald-600) | Buttons, links, accents |
| `--color-neutral-900` | `#0f172a` (slate-900) | Headings, dark bg |
| `--color-neutral-600` | `#475569` (slate-600) | Body text |
| `--font-family-base` | Inter, system-ui | All text |
| `--radius-3xl` | `2.5rem` | Large cards |
| `--nav-height` | `4rem` | Fixed header offset |
| `--container-max` | `80rem` | Max page width |

---

## Blocks

Each block follows the EDS convention: a folder with `block-name.css` + `block-name.js`.
The JS exports a default `decorate(block)` function called by `scripts.js`.

### `hero`
Two-column layout. Text left, rounded image right with a floating "Instant Approval" badge.

| Row | Col 0 | Col 1 |
|---|---|---|
| 1 | Badge text | Top Rated P&C Carrier 2024 |
| 2 | Heading | Protection for what *matters most.* |
| 3 | Body | Comprehensive P&C… |
| 4 | Primary CTA | [link] Start My Quote |
| 5 | Secondary CTA | [link] View Claims |
| 6 | Image | [picture] |
| 7 | Float title | Instant Approval |
| 8 | Float body | 98% of policies… |

### `services`
3-column product card grid. First 2 rows = section heading/subtext. Then groups of 4 rows per card: Icon name · Title · Body · Link.

Supported icon names: `home`, `auto`, `business`, `shield`, `umbrella`, `lock`, `zap`, `heart`

### `quote`
Self-contained 4-step interactive quote form. No document content needed — renders from its own JS.

### `claims`
Renders from its own JS (no document content needed). Mosaic of 4 feature cards + checklist.

### `cards` (CTA Banner)
Full-width emerald section.

| Row | Col 1 |
|---|---|
| Heading | Ready to switch… |
| Subtext | Join over 500,000… |
| Button text | Get Started Today |
| Button href | [link] |

### `contact`
Renders from its own JS. Contact form + 3 channel cards + HQ address card.

### `about`
Renders from its own JS. Stats → values grid → story. Optionally provide an image via the block table.

### `press`
Renders sample press releases by default. To add custom releases, provide groups of 4 rows: date · category · title · excerpt.

### `resource-center`
Renders sample articles by default. To add custom articles, provide groups of 6 rows: category · title · excerpt · content · date · read-time/image.

---

## Getting Started

### 1. Clone & set up

```bash
# Use the AEM boilerplate as your starting template
npx @adobe/create-aem-project shieldguard

# Copy these files over the boilerplate
cp -r shieldguard-eds/* shieldguard/
```

### 2. Google Drive / SharePoint setup (AEM EDS authoring)

1. Create a folder in your connected Google Drive / SharePoint
2. Add a `index.docx` using the block table format shown above
3. Mount the folder via [fstab.yaml](https://www.aem.live/docs/setup-byo-cdn-push-invalidation)

### 3. Local development

```bash
npm install
npm start        # starts local proxy on http://localhost:3000
```

### 4. Fonts

Add the Inter font `.woff2` files to `/fonts/`:
- `inter-regular.woff2`
- `inter-medium.woff2`
- `inter-semibold.woff2`
- `inter-bold.woff2`
- `inter-extrabold.woff2`

Or simply keep the Google Fonts `<link>` in each HTML file's `<head>`.

---

## Customisation

### Change brand colour
Edit `--color-brand-primary` and related tokens in `styles/styles.css`:

```css
:root {
  --color-brand-primary: #2563eb;        /* blue-600 */
  --color-brand-primary-hover: #1d4ed8;  /* blue-700 */
  --color-brand-primary-light: #dbeafe;  /* blue-100 */
  /* ... */
}
```

### Add a new block
1. Create `blocks/my-block/my-block.css` and `blocks/my-block/my-block.js`
2. Export `default function decorate(block) {}` from the JS file
3. Reference the block in your document with a table whose first cell header matches `my-block`

---

## References

- [AEM Boilerplate](https://github.com/adobe/aem-boilerplate)
- [AEM EDS Developer Docs](https://www.aem.live/docs/)
- [Block collection](https://www.aem.live/developer/block-collection)
