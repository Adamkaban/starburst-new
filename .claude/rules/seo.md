# SEO Rules — Google 2026 Compliance

## Meta tags (every page via BaseLayout.astro)
- <html lang="en"> — always, no exceptions
- hreflang: NOT used — single language, single geo (ZA)
- <title>: ≤44 chars WITHOUT spaces (≈55–65 with spaces)
  Pattern: "[Topic] – Starburst Slots ZA"
  Example: "Starburst Features Guide – Starburst Slots ZA" ✅ (39 without spaces)
- <meta name="description">: ≤220 chars | target 140–160
- <link rel="canonical">: https://starburstslots.co.za/[slug]/ — always https, trailing slash
- <meta name="robots">:
    Default all pages: "index, follow"
    privacy-policy + terms-of-use: "noindex, nofollow"
- <meta name="geo.region" content="ZA">
- <meta name="author" content="Johan van der Merwe">

## Open Graph (every page)
- og:title — matches <title>
- og:description — matches meta description
- og:url — matches canonical
- og:image — 1200×630 WebP, absolute URL with https://
- og:type — "website" (homepage) | "article" (content pages)
- og:locale — "en_ZA"
- og:site_name — "Starburst Slots ZA"

## Schema.org — JSON-LD (injected via BaseLayout schema prop)

### Homepage (index.astro) — 3 schemas
WebSite:
  name: "Starburst Slots ZA"
  url: "https://starburstslots.co.za/"

Organization:
  name: "Starburst Slots ZA"
  url: "https://starburstslots.co.za/"
  logo: "https://starburstslots.co.za/images/logo.webp"

Review:
  reviewRating: { ratingValue: "4.2", bestRating: "5" }
  author: { @type: Person, name: "Johan van der Merwe" }
  itemReviewed: { @type: VideoGame, name: "Starburst", publisher: "NetEnt" }

### Every page — BreadcrumbList
Homepage:   Home
Inner page: Home > [Page Name]
Example /features/:
  { position: 1, name: "Home", item: "https://starburstslots.co.za/" }
  { position: 2, name: "Features", item: "https://starburstslots.co.za/features/" }

### Type 1 content pages — Article + Author
Article:
  headline: [page title]
  datePublished: [publishedDate from frontmatter]
  dateModified: [lastUpdated from frontmatter]
  author: { @type: Person, name: "Johan van der Merwe" }
  publisher: { @type: Organization, name: "Starburst Slots ZA" }

### /faq/ — FAQPage
Every Q&A pair as:
  { @type: Question, name: "[question]", acceptedAnswer: { @type: Answer, text: "[answer]" } }

### /casinos/ — ItemList
Each casino as ListItem with position + name + url (AFFILIATE_URL)

### /about/ — Person (Author)
  name: "Johan van der Merwe"
  jobTitle: "Casino Games Reviewer"
  url: "https://starburstslots.co.za/about/"

## Sitemap
- Plugin: @astrojs/sitemap in astro.config.mjs
- Include: all pages where noindex: false
- Exclude: /privacy-policy/ /terms-of-use/
- changefreq: monthly for content pages, weekly for /casinos/
- robots.txt must contain: Sitemap: https://starburstslots.co.za/sitemap-index.xml

## URL structure
- Lowercase kebab-case: /rtp-volatility/ /how-to-play/
- Trailing slash: always — set trailingSlash: 'always' in astro.config.mjs
- Canonical domain: https://starburstslots.co.za (non-www)
- www redirect: configured once in Cloudflare Pages → Custom Domains

## H-tag structure (enforced on every page)
- H1: exactly one, contains primary keyword
- Nesting: H1 → H2 → H3 only — never skip a level (no H1 → H3)
- H2: section titles | H3: subsections within H2

## Core Web Vitals targets
- LCP < 2.5s — hero image: loading="eager" fetchpriority="high"
- CLS < 0.1 — all images have explicit width + height
- INP < 200ms — minimal JS, no heavy event listeners
- No render-blocking scripts or stylesheets in <head>

## PageSpeed 90+ checklist
- Self-hosted fonts or system font stack (no Google Fonts CDN)
- All images WebP with correct dimensions
- No unused JS — Astro ships zero JS by default (keep it that way)
- Tailwind CSS purged in production build (automatic)
- Preconnect only to domains actually used
