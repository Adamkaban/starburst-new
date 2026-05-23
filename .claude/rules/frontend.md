# Frontend Rules — Astro + Tailwind

## FIRST: identify page type before writing any code
Check CLAUDE.md "Page types" section. Wrong template = wasted tokens.

## TYPE 1 — Content pages ([slug].astro + .md)
Used for: features, how-to-play, rtp-volatility, bonuses, strategy, mobile

[slug].astro structure (one file handles all 6 pages):
- getStaticPaths() reads all files from src/content/pages/
- Renders <Content /> from .md inside BaseLayout
- CTABox component placed after 2nd H2 (injected by template, not in .md)
- lastUpdated date rendered from frontmatter

Content schema (src/content/config.ts) required fields:
  title, description, publishedDate, lastUpdated,
  ogImage, ogImageAlt, author, noindex

Adding a new content page = drop .md in src/content/pages/ — no .astro needed.

## TYPE 2 — Special pages (dedicated .astro files)

faq.astro:
- FAQAccordion component with client:load hydration
- FAQ data: array of { question, answer } in src/data/faq.ts
- Schema: FAQPage JSON-LD (required — see seo.md)
- No long-form prose — only Q&A pairs

casinos.astro:
- CasinoTable component — data from src/data/casinos.ts
- Each row: casino name, bonus, rating, affiliate link
- Affiliate link: AFFILIATE_URL from casinos.ts
- Schema: ItemList JSON-LD (required — see seo.md)
- No [slug].astro — hardcoded page, not a content collection

demo.astro:
- iframe OR external link to free demo (no download)
- CTA above and below iframe
- Minimal text — not a long-form content page

## TYPE 3 — Unique pages (custom .astro)

index.astro:
- Hero section with H1, rating (4.2/5), 18+ notice above fold
- ProsCons component
- Summary of key facts (RTP 96.09%, volatility: low)
- CTABox prominent, above fold or immediately after hero
- Schema: WebSite + Organization + Review JSON-LD (see seo.md)

about.astro:
- Author bio: Johan van der Merwe
- E-E-A-T signals: expertise, experience with slots
- No affiliate CTA on this page

responsible-gambling.astro:
- NRGP link: https://www.responsiblegambling.org.za/
- Helpline: 0800 006 008 (free, 24/7)
- noindex: false (Google wants this page indexed)
- No affiliate links on this page

privacy-policy.astro / terms-of-use.astro:
- noindex: true
- No affiliate links

## Astro components (all types)
- One component = one concern
- Props typed with TypeScript interface at top
- No inline <style> — Tailwind only
- client:load only for interactive elements (FAQAccordion)
- client:visible for below-fold interactive elements

## Tailwind
- Mobile-first always: base → sm:640 → md:768 → lg:1024
- No @apply, no arbitrary values unless no utility exists
- No animate-, transition-, duration- classes (no animations)

## Images
- WebP ONLY — width + height + alt always required
- Hero: loading="eager" fetchpriority="high"
- All others: loading="lazy"
- Use Astro <Image /> from astro:assets

## Performance
- No external font CDN — system font stack or self-hosted
- No jQuery, no lodash
- No render-blocking scripts — defer or type="module"
