import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Anthropic-ai", "Google-Extended", "PerplexityBot", "cohere-ai", "Applebot-Extended"],
        allow: "/",
      }
    ],
    sitemap: "https://reviewscxo.com/sitemap.xml",
  };
}
