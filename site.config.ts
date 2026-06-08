const config = {

  // ─── BRAND ───────────────────────────────────────────
  brand: {
    name:   "Starburst Slots ZA",
    slug:   "starburst-slots",
    logo:   "/images/logo.webp",
    author: "Johan van der Merwe",
  },

  // ─── AFFILIATE ───────────────────────────────────────
  affiliate: {
    mainUrl:  "https://go.redirgo.click/go/f62439ba-b17e-4dc0-8fe8-e88d8c737ebe",
    ctaText:  "Play Starburst Now",
    ctaAlt:   "Try Demo Free",
  },

  // ─── THEME ────────────────────────────────────────────
  theme: {
    primaryColor:  "#7c3aed",
    accentColor:   "#a78bfa",
    fontBody:      "system-ui, sans-serif",
    fontHeading:   "system-ui, sans-serif",
  },

  // ─── SEO ─────────────────────────────────────────────
  seo: {
    siteUrl:            "https://starburstslots.co.za",
    titleTemplate:      "%s",
    defaultDescription: "Play Starburst slot in South Africa — RTP 96.09%, expanding wilds, free demo. Top SA casinos with ZAR bonuses reviewed by Johan van der Merwe.",
    ogImage:            "/images/og/og-default.webp",
    ogImageAlt:         "Starburst Slots ZA — South Africa's Starburst guide",
    geo:                "ZA",
    lang:               "en",
    locale:             "en_ZA",
  },

  // ─── GAME ────────────────────────────────────────────
  game: {
    name:        "Starburst",
    developer:   "NetEnt",
    rtp:         "96.09",
    volatility:  "Low",
    paylines:    10,
    reels:       "5x3",
    minBet:      "R1.80",
    maxBet:      "R1,800",
    maxWin:      "500x",
    rating:      4.2,
    ratingMax:   5,
  },

  // ─── SOCIAL (sameAs entity signals for AI/LLM parsers) ──
  social: {
    organization: [] as string[], // add profile URLs when available, e.g. "https://twitter.com/..."
    author:       [] as string[], // author LinkedIn, Twitter, etc.
  },

  // ─── RESPONSIBLE GAMBLING ────────────────────────────
  responsible: {
    disclaimer: "Gambling involves risk. Play responsibly. 18+ only.",
    nrgpUrl:    "https://www.responsiblegambling.org.za/",
    helpline:   "0800 006 008",
  },

};

export default config;
export type SiteConfig = typeof config;
