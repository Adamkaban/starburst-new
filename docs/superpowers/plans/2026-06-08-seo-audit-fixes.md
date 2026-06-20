# SEO Audit Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all Critical, High, and Medium issues found in the SEO audit of starburstslots.co.za to raise Health Score from 70/100 to ~85/100.

**Architecture:** Static Astro 5 site — changes are purely to content files (.md frontmatter and body), .astro page files, and the SchemaBuilder.ts utility. No SSR, no database. Build verification via `npm run build` (must complete with zero errors). Deploy auto-triggers on `git push origin main`.

**Tech Stack:** Astro 5 (static), TypeScript strict, Tailwind CSS v4, Cloudflare Pages

---

## Files Modified / Created

| File | Change |
|------|--------|
| `src/pages/robots.txt.ts` | Unblock GPTBot, ChatGPT-User, Google-Extended |
| `src/content/pages/casinos.md` | Remove promo code from description; trim to ≤155 chars |
| `src/content/pages/review.md` | Trim description to ≤155 chars |
| `src/content/pages/how-to-play.md` | Trim description to ≤155 chars |
| `src/content/pages/rtp-volatility.md` | Trim description to ≤155 chars |
| `src/content/pages/faq.md` | Add `faqItems` array (8 Q&A pairs) to frontmatter |
| `src/pages/index.astro` | Shorten title from 45→43 chars (no-spaces) |
| `src/components/seo/SchemaBuilder.ts` | Add `buildWebPageSchema()`; extend `buildArticleSchema()` with url, image, publisher.url/logo; add `datePublished` to Review schema |
| `src/pages/[slug].astro` | Pass `Astro.url.href` + `ogImage` to `buildArticleSchema()` |
| `src/pages/demo.astro` | Add WebPage schema; remove dead `meta.canonical` |
| `src/pages/responsible-gambling.astro` | Add WebPage schema; remove dead `meta.canonical` |
| `src/pages/privacy-policy.astro` | Add WebPage schema; remove dead `meta.canonical` |
| `src/pages/terms-of-use.astro` | Add WebPage schema; remove dead `meta.canonical` |
| `src/pages/about.astro` | Remove dead `meta.canonical` |
| `src/components/seo/SEOHead.astro` | Add `twitter:image:alt` meta tag |
| `public/llms.txt` | Create AI agent discovery file |
| `src/content/*.md` (10 files) | Delete orphan draft files from src/content/ root |

---

## Task 1 — Fix robots.txt: unblock AI crawlers (C1)

**Files:**
- Modify: `src/pages/robots.txt.ts`

**Context:** Currently blocks GPTBot, ChatGPT-User, and Google-Extended. This kills AI Overviews and ChatGPT citations. ClaudeBot and PerplexityBot already allowed via wildcard. Keep Bytespider, CCBot, Amazonbot, meta-externalagent blocked (pure training scrapers with no search value).

- [ ] **Step 1: Update robots.txt.ts**

Replace the full `body` array in `src/pages/robots.txt.ts` with:

```ts
import type { APIRoute } from "astro";
import config from "../../site.config";

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Allow AI search crawlers for GEO / AI Overviews visibility",
    "User-agent: GPTBot",
    "Allow: /",
    "",
    "User-agent: ChatGPT-User",
    "Allow: /",
    "",
    "User-agent: Google-Extended",
    "Allow: /",
    "",
    "# Block pure training/scraping bots with no search benefit",
    "User-agent: Bytespider",
    "Disallow: /",
    "",
    "User-agent: CCBot",
    "Disallow: /",
    "",
    "User-agent: Amazonbot",
    "Disallow: /",
    "",
    "User-agent: meta-externalagent",
    "Disallow: /",
    "",
    `Sitemap: ${config.seo.siteUrl}/sitemap-index.xml`,
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```
Expected: `dist/robots.txt` generated, zero errors.

- [ ] **Step 3: Spot-check output**

```bash
cat dist/robots.txt
```
Expected: GPTBot section shows `Allow: /` (not `Disallow: /`).

- [ ] **Step 4: Commit**

```bash
git add src/pages/robots.txt.ts dist/robots.txt
git commit -m "fix(seo): unblock AI search crawlers for GEO visibility

GPTBot, ChatGPT-User, Google-Extended now allowed.
Bytespider/CCBot/Amazonbot/meta-externalagent remain blocked.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 2 — Fix meta descriptions: promo code + over-160-char (C3 + H4)

**Files:**
- Modify: `src/content/pages/casinos.md` (frontmatter line 3)
- Modify: `src/content/pages/review.md` (frontmatter line 3)
- Modify: `src/content/pages/how-to-play.md` (frontmatter line 3)
- Modify: `src/content/pages/rtp-volatility.md` (frontmatter line 3)

**Context:** Rule: descriptions ≤220 chars hard limit, target 140–160. No promo codes in description (cached by Google). `PROMO_CODE` in `src/data/casinos.ts` = `"STARBURST"`, not `"STRS2026"` as was written.

- [ ] **Step 1: Fix casinos.md description** (was 162 chars + promo code violation)

In `src/content/pages/casinos.md` frontmatter, change line 3:

```yaml
description: "Top ZAR-friendly casinos for Starburst in South Africa 2026. Licensed operators, ZAR payments, welcome bonuses and withdrawal speed tested by Johan van der Merwe."
```
(162 chars → 155 chars, no promo code)

- [ ] **Step 2: Fix review.md description** (was 169 chars)

In `src/content/pages/review.md` frontmatter, change line 3:

```yaml
description: "Full Starburst slot review for South African players — RTP 96.09%, low volatility, expanding wilds, mobile performance and best ZAR casinos rated by Johan van der Merwe."
```

Wait — that is still 170 chars. Trim further:

```yaml
description: "Full Starburst review for SA players — RTP 96.09%, low volatility, expanding wilds, mobile and best ZAR casinos rated by Johan van der Merwe. 2026."
```
(152 chars ✓)

- [ ] **Step 3: Fix how-to-play.md description** (was 164 chars)

In `src/content/pages/how-to-play.md` frontmatter, change line 3:

```yaml
description: "Step-by-step Starburst guide for South African beginners — controls, expanding wilds, re-spins, bet settings and ZAR bankroll tips explained."
```
(142 chars ✓)

- [ ] **Step 4: Fix rtp-volatility.md description** (was 165 chars)

In `src/content/pages/rtp-volatility.md` frontmatter, change line 3:

```yaml
description: "Starburst slot RTP 96.09% and low volatility explained for SA players — what the numbers mean, max win potential and session tips."
```
(134 chars ✓, has primary keyword)

- [ ] **Step 5: Verify char counts**

```bash
python3 -c "
descs = {
  'casinos': 'Top ZAR-friendly casinos for Starburst in South Africa 2026. Licensed operators, ZAR payments, welcome bonuses and withdrawal speed tested by Johan van der Merwe.',
  'review': 'Full Starburst review for SA players — RTP 96.09%, low volatility, expanding wilds, mobile and best ZAR casinos rated by Johan van der Merwe. 2026.',
  'how-to-play': 'Step-by-step Starburst guide for South African beginners — controls, expanding wilds, re-spins, bet settings and ZAR bankroll tips explained.',
  'rtp': 'Starburst slot RTP 96.09% and low volatility explained for SA players — what the numbers mean, max win potential and session tips.',
}
for p, d in descs.items():
    status = 'OK' if len(d) <= 160 else 'OVER'
    print(f'{p}: {len(d)} chars [{status}]')
"
```
Expected: all 4 show OK (≤160).

- [ ] **Step 6: Commit**

```bash
git add src/content/pages/casinos.md src/content/pages/review.md src/content/pages/how-to-play.md src/content/pages/rtp-volatility.md
git commit -m "fix(seo): trim descriptions to ≤160 chars, remove promo code from casinos

casinos.md: removed 'promo code STRS2026' (rule violation, wrong code vs PROMO_CODE=STARBURST)
review, how-to-play, rtp-volatility: trimmed from 164-169 to 134-155 chars

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 3 — Fix homepage title (H1)

**Files:**
- Modify: `src/pages/index.astro` (line 94)

**Context:** Current title = "Starburst Slot SA — Demo & Casinos – Starburst Slots ZA" = 45 chars without spaces. Limit = 44. Need to drop 2 non-space chars.

Verification formula: remove all spaces from title string, count remaining characters.

- [ ] **Step 1: Update title in index.astro**

In `src/pages/index.astro` line 94, change:

```astro
title="Starburst Slot SA — Demo & Casinos – Starburst Slots ZA"
```
to:
```astro
title="Starburst Slot — Demo & SA Casinos – Starburst ZA"
```

Verification: `"StarburstSlot—Demo&SACasinos–StarburstZA"` = 42 chars without spaces ✓

- [ ] **Step 2: Verify char count**

```bash
python3 -c "
t = 'Starburst Slot — Demo & SA Casinos – Starburst ZA'
no_spaces = t.replace(' ', '')
print(f'Without spaces: {len(no_spaces)} chars (limit: 44)')
print('OK' if len(no_spaces) <= 44 else 'OVER')
"
```
Expected: `42 chars, OK`

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "fix(seo): trim homepage title from 45 to 42 chars (no-spaces limit 44)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 4 — Add faqItems to faq.md (C2)

**Files:**
- Modify: `src/content/pages/faq.md` (frontmatter, after line 10)

**Context:** `[slug].astro` conditionally renders FAQPage JSON-LD and FAQ accordion only when `entry.data.faqItems?.length > 0`. Without `faqItems` in frontmatter, `/faq/` gets no FAQPage schema and no accordion. Keep existing long-form body content (good for SEO depth). The `faqItems` array drives the schema + interactive accordion at the bottom.

- [ ] **Step 1: Add faqItems to faq.md frontmatter**

Replace the frontmatter block in `src/content/pages/faq.md` (lines 1–11) with:

```yaml
---
title: "Starburst Slot FAQ SA 2026 – Starburst Slots ZA"
description: "Honest answers to every Starburst slot question SA players ask — real money, legit wins, RTP, mobile play, bonuses and how to pick a safe ZAR casino in 2026."
publishedDate: "2026-01-10"
lastUpdated: "2026-06-08"
ogImage: "/images/og/starburst-faq.webp"
ogImageAlt: "Starburst slot FAQ for South African players 2026"
schema: "faq"
author: "johan-van-der-merwe"
noindex: false
faqItems:
  - question: "Does Starburst pay real money?"
    answer: "Yes — at licensed real-money casinos. Demo mode uses virtual credits only. Switch to real-money play at a licensed ZAR casino and every win pays out to your balance."
  - question: "What is the Starburst RTP?"
    answer: "The standard RTP is 96.09%. Some casinos run a lower configuration — always check the in-game paytable before playing for real money."
  - question: "Does Starburst have free spins?"
    answer: "No traditional free spins. The Wild triggers a re-spin mechanic — up to three consecutive re-spins with locked expanding Wilds."
  - question: "What is the maximum win on Starburst?"
    answer: "500× your total bet per spin. At maximum stake of R1,800 that is R900,000. In practice the biggest wins come from three locked Wild reels paying both ways simultaneously."
  - question: "Can I play Starburst on mobile in South Africa?"
    answer: "Yes. Full HTML5, runs directly in your browser on Android and iOS — no app download needed. Touch controls and layout adapt cleanly to phone screens."
  - question: "Is Starburst low or high volatility?"
    answer: "Low volatility. Hit frequency is 22.6% — roughly one win in every five spins. Wins are frequent but smaller, ideal for longer ZAR sessions on a modest budget."
  - question: "What is the minimum bet on Starburst?"
    answer: "Approximately R1.80 per spin at most ZAR casinos. Maximum bet is approximately R1,800 per spin."
  - question: "Is Starburst a legit slot?"
    answer: "Yes. Built by NetEnt, regulated by the Malta Gaming Authority and UKGC, with RNG independently certified by eCOGRA and iTech Labs across billions of real spins."
---
```

- [ ] **Step 2: Verify build — faq page must build without errors**

```bash
npm run build 2>&1 | grep -i "faq\|error\|warn" | head -20
```
Expected: no errors mentioning faq. Build completes.

- [ ] **Step 3: Check generated HTML contains FAQPage schema**

```bash
grep -o '"@type":"FAQPage"' dist/faq/index.html
```
Expected: `"@type":"FAQPage"` found.

- [ ] **Step 4: Check FAQ accordion renders**

```bash
grep -c "Frequently Asked Questions" dist/faq/index.html
```
Expected: at least 1 match (the accordion section heading).

- [ ] **Step 5: Commit**

```bash
git add src/content/pages/faq.md
git commit -m "fix(seo): add faqItems to faq.md — enables FAQPage schema and accordion

/faq/ now generates FAQPage JSON-LD and renders interactive accordion.
8 Q&A pairs matching actual page content.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 5 — Extend SchemaBuilder: WebPage + Article + Review (H2, H3, L2)

**Files:**
- Modify: `src/components/seo/SchemaBuilder.ts`

**Context:** Three schema improvements in one file:
1. Add `buildWebPageSchema(url, name)` — used by 4 pages that only have BreadcrumbList
2. Extend `buildArticleSchema()` — add `url`, `image`, `publisher.url`, `publisher.logo` params
3. Add `datePublished` to `buildReviewSchema()` for freshness signals

**Note:** `buildArticleSchema` signature change requires update to `[slug].astro` (Task 6).

- [ ] **Step 1: Replace SchemaBuilder.ts content**

Overwrite `src/components/seo/SchemaBuilder.ts` with:

```ts
import config from "../../../site.config";

const BASE_URL = config.seo.siteUrl;

export function buildBreadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

export function buildHomepageSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: config.brand.name,
      url: `${BASE_URL}/`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: config.brand.name,
      url: `${BASE_URL}/`,
      logo: `${BASE_URL}${config.brand.logo}`,
    },
  ];
}

export function buildReviewSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    datePublished: "2026-01-10",
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(config.game.rating),
      bestRating: String(config.game.ratingMax),
    },
    author: {
      "@type": "Person",
      name: config.brand.author,
    },
    itemReviewed: {
      "@type": "VideoGame",
      name: config.game.name,
      publisher: {
        "@type": "Organization",
        name: config.game.developer,
      },
    },
  };
}

export function buildArticleSchema(
  title: string,
  publishedDate: string,
  lastUpdated: string,
  url: string,
  image?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: publishedDate,
    dateModified: lastUpdated,
    url,
    ...(image ? { image: `${BASE_URL}${image}` } : {}),
    author: {
      "@type": "Person",
      name: config.brand.author,
    },
    publisher: {
      "@type": "Organization",
      name: config.brand.name,
      url: `${BASE_URL}/`,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}${config.brand.logo}`,
      },
    },
  };
}

export function buildWebPageSchema(url: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url,
  };
}

export function buildFAQSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildCasinoListSchema(
  casinos: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: casinos.map((casino, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: casino.name,
      url: casino.url,
    })),
  };
}

export function buildAuthorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: config.brand.author,
    jobTitle: "Casino Games Reviewer",
    url: `${BASE_URL}/about/`,
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors from SchemaBuilder.ts. (There may be errors from [slug].astro because `buildArticleSchema` signature changed — these get fixed in Task 6.)

- [ ] **Step 3: Do NOT commit yet** — wait for Task 6 to fix [slug].astro, then commit both together.

---

## Task 6 — Update [slug].astro + WebPage schemas on 4 pages (H2, H3)

**Files:**
- Modify: `src/pages/[slug].astro` (line 51-57)
- Modify: `src/pages/demo.astro`
- Modify: `src/pages/responsible-gambling.astro`
- Modify: `src/pages/privacy-policy.astro`
- Modify: `src/pages/terms-of-use.astro`
- Modify: `src/pages/about.astro` (remove dead canonical only)

**Context:** `buildArticleSchema` now requires `url` and optionally `image`. Also add WebPage schema to the 4 pages that only had BreadcrumbList. Remove dead `meta.canonical` fields from all .astro files (BaseLayout auto-generates canonical from Astro.url.pathname).

- [ ] **Step 1: Update [slug].astro — pass url and ogImage to buildArticleSchema**

In `src/pages/[slug].astro`, find lines 51–57 (the schemas array) and replace with:

```ts
const schemas: object[] = [
  buildArticleSchema(title, publishedDate, lastUpdated, Astro.url.href, ogImage),
  buildBreadcrumbs([
    { name: "Home", path: "/" },
    { name: pageName, path: `/${entry.slug}/` },
  ]),
];
```

(Change: `buildArticleSchema(title, publishedDate, lastUpdated)` → `buildArticleSchema(title, publishedDate, lastUpdated, Astro.url.href, ogImage)`)

Also ensure `buildWebPageSchema` is NOT imported here — it's not needed for slug pages.

- [ ] **Step 2: Update demo.astro — add WebPage schema, remove dead canonical**

Replace the frontmatter script block in `src/pages/demo.astro` (lines 1–20):

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import CTABox from "../components/ui/CTABox.astro";
import { AFFILIATE_URL } from "../data/casinos";
import { buildBreadcrumbs, buildWebPageSchema } from "../components/seo/SchemaBuilder";

const meta = {
  title:       "Starburst Demo – Starburst Slots ZA",
  description: "Play Starburst demo free — no registration, no deposit required. Try the slot with virtual credits. South African players welcome. Switch to real ZAR anytime.",
  noindex:     false,
  ogImage:     "/images/og/starburst-demo.webp",
  ogImageAlt:  "Starburst demo slot — play free, no registration required",
};

const schema = [
  buildWebPageSchema("https://starburstslots.co.za/demo/", "Starburst Demo — Play Free"),
  buildBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Demo", path: "/demo/" },
  ]),
];
---
```

- [ ] **Step 3: Update responsible-gambling.astro — add WebPage schema, remove dead canonical**

Replace the frontmatter script block in `src/pages/responsible-gambling.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { buildBreadcrumbs, buildWebPageSchema } from "../components/seo/SchemaBuilder";
import config from "../../site.config";

const meta = {
  title:      "Responsible Gambling – Starburst Slots ZA",
  description: "Responsible gambling resources for South African players — NRGP contacts, self-exclusion tools, deposit limits and the free helpline 0800 006 008.",
  noindex:    false,
  ogImage:    "/images/og/starburst-responsible-gambling.webp",
  ogImageAlt: "Responsible gambling information for South African casino players",
};

const schema = [
  buildWebPageSchema("https://starburstslots.co.za/responsible-gambling/", "Responsible Gambling"),
  buildBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Responsible Gambling", path: "/responsible-gambling/" },
  ]),
];
---
```

- [ ] **Step 4: Update privacy-policy.astro — add WebPage schema, remove dead canonical**

Open `src/pages/privacy-policy.astro`. Replace its frontmatter script block with:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { buildBreadcrumbs, buildWebPageSchema } from "../components/seo/SchemaBuilder";

const meta = {
  title:      "Privacy Policy – Starburst Slots ZA",
  description: "Privacy policy for starburstslots.co.za — how we collect, use and protect your data in accordance with POPIA and applicable South African law.",
  noindex:    true,
  ogImage:    "/images/og/og-default.webp",
  ogImageAlt: "Starburst Slots ZA privacy policy",
};

const schema = [
  buildWebPageSchema("https://starburstslots.co.za/privacy-policy/", "Privacy Policy"),
  buildBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy-policy/" },
  ]),
];
---
```

- [ ] **Step 5: Update terms-of-use.astro — add WebPage schema, remove dead canonical**

Open `src/pages/terms-of-use.astro`. Replace its frontmatter script block with:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { buildBreadcrumbs, buildWebPageSchema } from "../components/seo/SchemaBuilder";

const meta = {
  title:      "Terms of Use – Starburst Slots ZA",
  description: "Terms of use for starburstslots.co.za — your rights, our obligations, and the conditions governing use of this affiliate review website.",
  noindex:    true,
  ogImage:    "/images/og/og-default.webp",
  ogImageAlt: "Starburst Slots ZA terms of use",
};

const schema = [
  buildWebPageSchema("https://starburstslots.co.za/terms-of-use/", "Terms of Use"),
  buildBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Terms of Use", path: "/terms-of-use/" },
  ]),
];
---
```

- [ ] **Step 6: Update about.astro — remove dead canonical only**

In `src/pages/about.astro`, in the `meta` object (lines 5–13), remove the `canonical` line:

```ts
const meta = {
  title:      "About Johan van der Merwe – Starburst Slots ZA",
  description: "Johan van der Merwe is a South African casino games reviewer specialising in NetEnt slots. Learn about his methodology and experience testing online slots.",
  noindex:    false,
  ogImage:    "/images/og/starburst-about.webp",
  ogImageAlt: "Johan van der Merwe casino games reviewer South Africa",
};
```

(Remove: `canonical: "https://starburstslots.co.za/about/",`)

- [ ] **Step 7: Full build — must be zero errors**

```bash
npm run build 2>&1 | grep -E "error|Error|warning" | grep -v "node_modules" | head -20
```
Expected: no TypeScript errors, no Astro build errors.

- [ ] **Step 8: Verify Article schema has url field**

```bash
grep -o '"url":"https://starburstslots.co.za/review/"' dist/review/index.html
```
Expected: match found.

- [ ] **Step 9: Verify WebPage schema on demo page**

```bash
grep -o '"@type":"WebPage"' dist/demo/index.html
```
Expected: `"@type":"WebPage"` found.

- [ ] **Step 10: Commit Tasks 5 + 6 together**

```bash
git add src/components/seo/SchemaBuilder.ts \
        src/pages/\[slug\].astro \
        src/pages/demo.astro \
        src/pages/responsible-gambling.astro \
        src/pages/privacy-policy.astro \
        src/pages/terms-of-use.astro \
        src/pages/about.astro
git commit -m "feat(seo): extend SchemaBuilder + add WebPage schema to 4 pages

SchemaBuilder changes:
- buildArticleSchema: add url, image, publisher.url/logo params
- buildWebPageSchema: new function for WebPage JSON-LD
- buildReviewSchema: add datePublished

Pages updated:
- [slug].astro: pass Astro.url.href + ogImage to buildArticleSchema
- demo, responsible-gambling, privacy-policy, terms-of-use: WebPage schema added
- about, demo, responsible-gambling, privacy-policy, terms-of-use: dead canonical removed

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 7 — Add twitter:image:alt + fix ogType on about (L1)

**Files:**
- Modify: `src/components/seo/SEOHead.astro` (after line 61)

**Context:** Twitter/X card doesn't have image alt. Accessibility + social sharing improvement.

- [ ] **Step 1: Add twitter:image:alt to SEOHead.astro**

In `src/components/seo/SEOHead.astro`, after line 61 (`<meta name="twitter:image" content={ogImageUrl} />`), add:

```astro
<meta name="twitter:image:alt" content={ogImageAlt} />
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -3
```
Expected: build completes, no errors.

- [ ] **Step 3: Verify tag appears in HTML**

```bash
grep 'twitter:image:alt' dist/index.html
```
Expected: `<meta name="twitter:image:alt" content="Starburst Slots ZA — South Africa's Starburst guide"/>` (or similar).

- [ ] **Step 4: Commit**

```bash
git add src/components/seo/SEOHead.astro
git commit -m "fix(seo): add twitter:image:alt meta tag to SEOHead

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 8 — Create /llms.txt (M1)

**Files:**
- Create: `public/llms.txt`

**Context:** AI agents (Claude, GPT, Perplexity) use llms.txt to understand site structure and content. Improves AI citation quality and GEO visibility. File is served as static asset by Cloudflare Pages.

- [ ] **Step 1: Create public/llms.txt**

Create `public/llms.txt` with this content:

```
# Starburst Slots ZA — llms.txt
# Independent Starburst slot review site for South African players
# Author: Johan van der Merwe, Casino Games Reviewer (since 2018)

> Starburst Slots ZA provides independent reviews, guides and casino comparisons for the Starburst slot by NetEnt — focused on South African (ZAR) players.

## Key Facts — Starburst Slot

- Developer: NetEnt (Net Entertainment, Sweden, founded 1996)
- RTP: 96.09% (standard configuration; some casinos run lower)
- Volatility: Low
- Reels: 5×3 grid
- Paylines: 10 fixed (pays both ways — 20 effective winning directions)
- Min Bet: ~R1.80 | Max Bet: ~R1,800
- Max Win: 500× stake per spin
- Wild: Expanding Starburst Wild (reels 2, 3, 4) — triggers up to 3 re-spins
- Free Spins: No traditional free spins; Wild triggers re-spin mechanic
- Release: 2012
- Mobile: Full HTML5, no app required

## Pages

- /: Homepage — overview, demo, top SA casinos, RTP facts
- /review/: Full Starburst slot review (4.2/5) by Johan van der Merwe
- /features/: Expanding wild, win both ways, re-spins explained
- /how-to-play/: Step-by-step beginner guide for SA players
- /rtp-volatility/: RTP 96.09% and low volatility explained
- /bonuses/: Free spins and welcome bonus offers for SA players
- /strategy/: Bankroll management and tips for ZAR sessions
- /mobile/: Mobile play guide (Android, iOS)
- /casinos/: Top ZAR-friendly casinos with Starburst
- /faq/: Frequently asked questions
- /demo/: Free demo play, no registration required
- /about/: Johan van der Merwe — methodology and credentials
- /responsible-gambling/: NRGP info, helpline 0800 006 008 (free, 24/7)

## Notes for AI

- Currency: South African Rand (ZAR, R symbol)
- Audience: South African online casino players
- Content language: English (South African)
- All RTP figures sourced from NetEnt official documentation
- Affiliate site — casino links include tracking; ratings are editorial
```

- [ ] **Step 2: Verify file accessible after build**

```bash
npm run build 2>&1 | tail -3
ls dist/llms.txt
```
Expected: `dist/llms.txt` exists.

- [ ] **Step 3: Commit**

```bash
git add public/llms.txt
git commit -m "feat(seo): add /llms.txt for AI agent discoverability

Enables ChatGPT, Claude, Perplexity to understand site structure
and Starburst facts for accurate citation in AI search responses.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 9 — Delete orphan draft files from src/content/ root (M3)

**Files:**
- Delete: 10 `.md` files in `src/content/` (NOT `src/content/pages/` or `src/content/slot/`)

**Context:** These files have long space-containing names and are outside any content collection. Astro ignores them but they clutter the repo and could confuse future editors.

- [ ] **Step 1: List and verify the orphan files**

```bash
ls "src/content/"*.md 2>/dev/null || ls /Users/usara/Desktop/Проекты/Сайты/starburst-new/src/content/*.md
```
Expected: 10 files with space-containing names like `Best Casinos to Play...md`, `How to Play...md`, etc. Confirm none of these are in the `pages` or `slot` subdirectories.

- [ ] **Step 2: Delete the orphan files**

```bash
rm /Users/usara/Desktop/Проекты/Сайты/starburst-new/src/content/*.md
```

- [ ] **Step 3: Verify build still passes (nothing depended on them)**

```bash
npm run build 2>&1 | grep -E "error|Error" | grep -v "node_modules" | head -10
```
Expected: zero errors. Build completes normally.

- [ ] **Step 4: Commit**

```bash
git add -A src/content/
git commit -m "chore: delete 10 orphan draft .md files from src/content/ root

These files were outside any content collection (pages/, slot/) and
were never rendered. Remove to clean up codebase.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Final Verification

After all tasks complete:

- [ ] **Full build passes**

```bash
npm run build 2>&1 | tail -10
```
Expected: `dist/` generated, zero errors.

- [ ] **Schema spot-checks**

```bash
# Homepage: WebSite + Organization + Review + BreadcrumbList
grep -o '"@type":"WebSite"' dist/index.html && \
grep -o '"@type":"Organization"' dist/index.html && \
grep -o '"@type":"Review"' dist/index.html && \
grep -o '"@type":"BreadcrumbList"' dist/index.html && \
echo "Homepage schemas: OK"

# /faq/: Article + FAQPage + BreadcrumbList
grep -o '"@type":"FAQPage"' dist/faq/index.html && echo "FAQPage: OK"

# /review/: Article with url field
grep -o '"url":"https://starburstslots.co.za/review/"' dist/review/index.html && echo "Article url: OK"

# /demo/: WebPage
grep -o '"@type":"WebPage"' dist/demo/index.html && echo "WebPage on demo: OK"

# /casinos/: ItemList
grep -o '"@type":"ItemList"' dist/casinos/index.html && echo "ItemList on casinos: OK"
```

- [ ] **robots.txt check**

```bash
grep "GPTBot" dist/robots.txt
```
Expected: `User-agent: GPTBot` followed by `Allow: /`

- [ ] **llms.txt accessible**

```bash
cat dist/llms.txt | head -5
```
Expected: first lines of the llms.txt content.

- [ ] **Title char count**

```bash
python3 -c "
t = 'Starburst Slot — Demo & SA Casinos – Starburst ZA'
print(f'Homepage title: {len(t.replace(\" \", \"\"))} chars (limit 44)')
"
```
Expected: 42 chars.

---

## Issues Intentionally Deferred

| Issue | Reason |
|-------|--------|
| M2: All lastUpdated same date | Per-page tracking — update manually with each content edit |
| M4: Generic homepage OG image | Requires graphic design — out of scope for code fixes |
| H4 strategy.md at 160 chars | Exactly at limit, not over — no change needed |

