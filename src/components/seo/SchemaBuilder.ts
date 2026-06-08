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
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.brand.name,
    url: `${BASE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}${config.brand.logo}`,
    },
  };
  if (config.social.organization.length) org.sameAs = config.social.organization;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: config.brand.name,
      url: `${BASE_URL}/`,
    },
    org,
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
  description?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: publishedDate,
    dateModified: lastUpdated,
    url,
    ...(description ? { description } : {}),
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
  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: config.brand.author,
    jobTitle: "Casino Games Reviewer",
    url: `${BASE_URL}/about/`,
  };
  if (config.social.author.length) person.sameAs = config.social.author;
  return person;
}

export function buildVideoGameSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: config.game.name,
    description: `${config.game.name} is a 5-reel, ${config.game.paylines}-payline online slot by ${config.game.developer}. RTP ${config.game.rtp}%, ${config.game.volatility.toLowerCase()} volatility, expanding Wild re-spins, max win ${config.game.maxWin}.`,
    gamePlatform: "Browser",
    playMode: "SinglePlayer",
    publisher: {
      "@type": "Organization",
      name: config.game.developer,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(config.game.rating),
      bestRating: String(config.game.ratingMax),
      ratingCount: "1",
    },
  };
}
