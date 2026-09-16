import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/login",
          "/signup",
          "/submit-review",
          "/submit-question",
          "/unsubscribe",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot"],
        allow: "/",
        disallow: ["/admin/", "/api/", "/login", "/signup"],
      },
      {
        userAgent: ["ClaudeBot", "Anthropic-ai"],
        allow: "/",
        disallow: ["/admin/", "/api/", "/login", "/signup"],
      },
      {
        userAgent: ["Google-Extended", "PerplexityBot", "cohere-ai", "Applebot-Extended"],
        allow: "/",
        disallow: ["/admin/", "/api/", "/login", "/signup"],
      },
    ],
    sitemap: "https://reviewscxo.com/sitemap.xml",
  };
}
