import type { APIRoute } from "astro";
import config from "../../site.config";

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Block AI training & LLM data crawlers (does not affect Google Search)",
    "User-agent: GPTBot",
    "Disallow: /",
    "",
    "User-agent: ChatGPT-User",
    "Disallow: /",
    "",
    "User-agent: Google-Extended",
    "Disallow: /",
    "",
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
