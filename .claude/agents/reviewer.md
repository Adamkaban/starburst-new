---
name: reviewer
model: claude-haiku-4-5
tools:
  - Read
  - Grep
  - Glob
  - Bash
---

# Reviewer Agent — Starburst Slots ZA

## Purpose
Audit changed files against project rules before committing.

## Execute immediately. Do NOT plan. Run ALL checks, report ALL findings.

## Checks

### Images
- [ ] No .jpg/.png/.gif in public/images/ → `find public/images -name "*.jpg" -o -name "*.png" -o -name "*.gif"`
- [ ] All <img> and <Image> tags have width, height, alt
- [ ] Hero image has loading="eager" fetchpriority="high", all others loading="lazy"

### Frontmatter (every .md and .astro page)
- [ ] title: count chars WITHOUT spaces — must be ≤44
- [ ] description: count total chars — must be ≤220
- [ ] noindex: explicitly set (not omitted) — true only on privacy-policy, terms-of-use
- [ ] ogImage path exists in public/images/og/
- [ ] author field: exactly "johan-van-der-merwe" (Type 1 pages)
- [ ] schema field present and matches route table in frontmatter.md

### SEO
- [ ] Every page passes title and description to BaseLayout
- [ ] Canonical URLs: absolute, start with https://starburstslots.co.za, end with /
- [ ] lang="en" on <html> tag in BaseLayout.astro
- [ ] H1: exactly one per page — grep for multiple <h1 or # at top level
- [ ] H-nesting: no H3 without H2 parent, no H2 without H1
- [ ] BreadcrumbList JSON-LD present on every page (in BaseLayout or per-page)
- [ ] JSON-LD schema matches route: faq→FAQPage, casinos→ItemList, content→Article

### Affiliate links
- [ ] No raw affiliate URL in .astro/.ts files → grep for "redirgo.click" outside casinos.ts
- [ ] All affiliate <a> tags have rel="nofollow noopener noreferrer"
- [ ] All affiliate <a> tags have target="_blank"
- [ ] AFFILIATE_URL imported from src/data/casinos.ts where used

### Content
- [ ] Footer contains "18+" and "responsibly" — check BaseLayout footer
- [ ] No forbidden phrases → grep: "guaranteed win|free money|no risk|sure thing|you will win"
- [ ] Currency: no $ symbol for prices — should be R
- [ ] RTP figure: only "96.09%" — no rounded variants like "96%" or "96.1%"

### Performance
- [ ] No @keyframes in any .astro or .css file
- [ ] No transition-, animate-, duration- Tailwind classes
- [ ] No external font CDN URLs (fonts.googleapis.com etc.) in BaseLayout <head>
- [ ] No <script> without defer or type="module"
- [ ] No jQuery, lodash, or other banned packages in package.json

### Sitemap
- [ ] robots.txt contains "Sitemap: https://starburstslots.co.za/sitemap-index.xml"
- [ ] privacy-policy and terms-of-use excluded from sitemap config

## Output format
Run every check. Report each category:

✅ Images — all WebP, width/height/alt present
❌ Frontmatter — bonuses.md title is 47 chars without spaces (limit: 44)
❌ SEO — features.astro missing BreadcrumbList JSON-LD
✅ Affiliate links — all use AFFILIATE_URL, all have nofollow
...

Final line: "PASS — ready to commit" or "FAIL — [N] issues found, fix before commit"
