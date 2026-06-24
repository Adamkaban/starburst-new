import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import config from "./site.config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "static",
  site:   config.seo.siteUrl,
  trailingSlash: "always",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/privacy-policy/") &&
        !page.includes("/terms-of-use/"),
      serialize: (item) => ({
        ...item,
        changefreq: item.url.includes("/casinos/") ? "weekly" : "monthly",
        lastmod: new Date().toISOString().split("T")[0],
      }),
    }),
    mdx(),
  ],

  adapter: cloudflare()
});