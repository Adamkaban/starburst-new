# SEO Audit Prompt — Starburst Slots ZA

## Запуск

```
/seo audit https://starburstslots.co.za
```

Точечные проверки:
```
/seo technical https://starburstslots.co.za
/seo schema https://starburstslots.co.za
/seo sitemap https://starburstslots.co.za
/seo content https://starburstslots.co.za
```

---

## Полный промт с контекстом

/seo audit https://starburstslots.co.za

## Контекст сайта

Сайт: starburstslots.co.za (non-www canonical)
Тип: Статический affiliate review сайт (Astro 5 SSG + Cloudflare Pages)
Цель: Review + информация по слоту Starburst от NetEnt
Аудитория: Игроки из ЮАР, ищущие где играть в Starburst
Язык: только English (en), гео: ZA — hreflang НЕ нужен

Технический стек:
- Astro 5, output: "static", trailingSlash: "always"
- Tailwind CSS v4, TypeScript strict
- Деплой: Cloudflare Pages (auto-build из main)
- Canonical: всегда с trailing slash, https, non-www
- Изображения: WebP ONLY

Страницы сайта:
- / — Homepage (Hero + ProsCons + CTA)
- /features/ — Starburst features guide
- /how-to-play/ — How to play guide
- /rtp-volatility/ — RTP & volatility info
- /bonuses/ — Casino bonuses
- /strategy/ — Slots strategy
- /mobile/ — Mobile play
- /casinos/ — Best casinos (affiliate links)
- /faq/ — FAQ accordion
- /review/ — Full review
- /demo/ — Free demo iframe
- /about/ — Author bio (Johan van der Merwe)
- /responsible-gambling/ — NRGP info
- /privacy-policy/ — noindex
- /terms-of-use/ — noindex

## Обязательные проверки (приоритет Critical)

### 1. robots.txt
- Существует ли /robots.txt
- Googlebot НЕ заблокирован
- Ссылка на sitemap: Sitemap: https://starburstslots.co.za/sitemap-index.xml
- AI-краулеры: GPTBot, ClaudeBot, PerplexityBot — разрешить для GEO visibility

### 2. Sitemap
- /sitemap-index.xml существует и валиден (@astrojs/sitemap)
- /privacy-policy/ и /terms-of-use/ исключены (noindex: true)
- Все 13 индексируемых страниц включены
- Нет 404-URL, нет дублей

### 3. Canonical теги
- Присутствует на КАЖДОЙ странице
- Формат: https://starburstslots.co.za/[path]/ (с trailing slash, non-www, https)
- /privacy-policy/ и /terms-of-use/ имеют noindex, nofollow
- Нет конфликтов canonical ↔ noindex

### 4. Мета-теги
- Title: ≤44 символов БЕЗ пробелов, паттерн: "[Topic] – Starburst Slots ZA"
- Description: ≤220 символов, цель 140–160, содержит primary keyword
- robots meta: index,follow по умолчанию; noindex,nofollow на /privacy-policy/ и /terms-of-use/
- Open Graph (og:locale="en_ZA", og:site_name="Starburst Slots ZA")
- og:image: 1200×630 WebP, absolute URL с https://
- og:type: "website" (homepage) | "article" (content pages)
- lang="en" на <html>
- geo.region: "ZA"
- author: "Johan van der Merwe"

### 5. Heading Structure
- H1: ровно один на каждой странице, содержит primary keyword
- Иерархия H1→H2→H3 без пропусков уровней
- Нет дублирующихся H1

### 6. Breadcrumbs
- BreadcrumbList JSON-LD на всех страницах
- Homepage: только "Home"
- Inner pages: "Home > [Page Name]"
- item URL с trailing slash

### 7. Schema Markup (JSON-LD)
Проверить по типам страниц:
- Homepage (/): WebSite + Organization + Review + BreadcrumbList
  Review: Starburst (VideoGame), рейтинг 4.2/5, автор Johan van der Merwe
- /faq/: FAQPage + BreadcrumbList
- /casinos/: Article + ItemList + BreadcrumbList
- /about/: Person (Author) + BreadcrumbList
  Person: Johan van der Merwe, jobTitle: "Casino Games Reviewer"
- /demo/: WebPage + BreadcrumbList
- /responsible-gambling/, /privacy-policy/, /terms-of-use/: WebPage + BreadcrumbList
- Все Type 1 content pages: Article + BreadcrumbList
  Article.author: Person "Johan van der Merwe"
  Article.publisher: Organization "Starburst Slots ZA"
  datePublished и dateModified обязательны

### 8. Affiliate links
- Каждая affiliate ссылка имеет: rel="nofollow noopener noreferrer" target="_blank"
- URL берётся из AFFILIATE_URL константы (src/data/casinos.ts), не хардкод
- Affiliate ссылки НЕ в sitemap, НЕ индексируются

### 9. Core Web Vitals
- LCP < 2.5s (цель <1.8s) — hero: loading="eager" fetchpriority="high"
- INP < 200ms (НЕ FID)
- CLS < 0.1 — все изображения с явными width + height
- Изображения: WebP, loading="lazy" кроме hero
- Нет render-blocking JS (Astro = zero JS по умолчанию)
- Tailwind CSS purged в production

### 10. Мобильная адаптивность
- Viewport meta присутствует
- Touch targets ≥ 48×48px
- Font-size ≥ 16px
- Mobile-first breakpoints (Tailwind: base → sm → md → lg)
- Google Mobile-First Indexing активен

### 11. HTTPS и безопасность
- HTTP → HTTPS 301 (Cloudflare)
- www → non-www 301 (настройки CF Dashboard)
- Security headers через Cloudflare: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- Нет mixed content

### 12. URL Structure
- Trailing slash везде (trailingSlash: "always")
- Lowercase kebab-case
- Нет redirect chains > 1 hop

### 13. Internal Linking
- Homepage → все key pages (features, casinos, faq, demo, review)
- /casinos/ → affiliate link с правильными rel атрибутами
- /review/ → /faq/, /bonuses/, /casinos/
- /features/ → /how-to-play/, /rtp-volatility/
- Нет orphan pages
- Footer: About, Privacy Policy, Responsible Gambling, Terms of Use

### 14. E-E-A-T (для affiliate сайта — критично)
- /about/ страница существует с биографией автора
- Author schema (Person) на всех content pages
- publishedDate + lastUpdated на /review/ и /rtp-volatility/ (видимые пользователю)
- Responsible gambling disclaimer на КАЖДОЙ странице (footer)
- 18+ notice на homepage above fold
- Ссылка на NRGP: https://www.responsiblegambling.org.za/ на /responsible-gambling/
- Helpline 0800 006 008 упоминается

### 15. AI Search / GEO
- Доступность для AI-краулеров (ChatGPT-User, PerplexityBot, ClaudeBot)
- llms.txt: рассмотреть создание /llms.txt
- Structured data помогает Google AI Overviews
- Starburst факты цитируемы: RTP 96.09%, Developer NetEnt, Volatility Low

### 16. Content quality
- Forbidden phrases не используются: "guaranteed win", "free money", "best casino" без qualifier
- Валюта: ZAR (R), не USD
- RTP: 96.09% (точная цифра, не приближённая)
- Starburst Wild механика описана корректно

## Формат отчёта

1. SEO Health Score (0–100) с разбивкой по категориям
2. Critical Issues (немедленно)
3. High Priority (в течение недели)
4. Medium Priority (в течение месяца)
5. Low Priority (backlog)

Для каждого issue: что нарушено → где (URL/файл) → как исправить конкретно для Astro 5 + Cloudflare Pages стека.
