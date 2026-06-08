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
