import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title:         z.string(),
    description:   z.string(),
    publishedDate: z.string(),
    lastUpdated:   z.string(),
    ogImage:       z.string(),
    ogImageAlt:    z.string(),
    author:        z.string().default("johan-van-der-merwe"),
    noindex:       z.boolean().default(false),
    schema:        z.enum(["article", "webpage", "faq"]).default("article"),
    faqItems:      z.array(z.object({
      question: z.string(),
      answer:   z.string(),
    })).optional(),
  }),
});

const slotStatsSchema = z.object({
  rtp:           z.string(),
  volatility:    z.string(),
  maxWin:        z.string(),
  reels:         z.number(),
  paylines:      z.number(),
  minBet:        z.string(),
  maxBet:        z.string(),
  hitFrequency:  z.string(),
  bonusFeatures: z.string(),
  releaseYear:   z.number(),
  provider:      z.string(),
});

const relatedSlotSchema = z.object({
  name:       z.string(),
  rtp:        z.string(),
  volatility: z.string(),
  image:      z.string().optional().default(""),
  url:        z.string().optional().default("/"),
});

const bankrollProfileSchema = z.object({
  budget:     z.string(),
  betSize:    z.string(),
  stopLoss:   z.string(),
  takeProfit: z.string(),
});

const faqItemSchema = z.object({
  question: z.string(),
  answer:   z.string(),
});

const strategyItemSchema = z.object({
  title:       z.string(),
  level:       z.string(),
  description: z.string(),
  suitableFor: z.string(),
});

const slot = defineCollection({
  type: "content",
  schema: z.object({
    // index.md fields
    slotName:     z.string().optional(),
    provider:     z.string().optional(),
    slotImage:    z.string().optional(),
    slotStats:    slotStatsSchema.optional(),
    pros:         z.array(z.string()).optional(),
    cons:         z.array(z.string()).optional(),
    rating:       z.number().optional(),
    relatedSlots: z.array(relatedSlotSchema).optional(),

    // strategy.md fields
    strategyHero: z.string().optional(),
    strategies:   z.array(strategyItemSchema).optional(),
    bankroll:     z.object({
      conservative: bankrollProfileSchema,
      balanced:     bankrollProfileSchema,
      aggressive:   bankrollProfileSchema,
    }).optional(),

    // casinos.md fields
    providerStats: z.object({
      founded:         z.number(),
      gamesReleased:   z.string(),
      licensedMarkets: z.string(),
      averageRtp:      z.string(),
    }).optional(),
    providerDescription: z.string().optional(),
    providerLogo:        z.string().optional(),

    // shared optional field
    faq: z.array(faqItemSchema).optional(),
  }),
});

export const collections = { pages, slot };
