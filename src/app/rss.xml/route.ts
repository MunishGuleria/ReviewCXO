import type { NextRequest } from "next/server";
import { getVisibleVendors } from "@/lib/vendors";
import { getPublishedQuestions } from "@/lib/questions";

const BASE_URL = "https://reviewscxo.com";

interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRssItems(items: RssItem[]): string {
  return items
    .map(
      (item) => `<item>
  <title>${escapeXml(item.title)}</title>
  <link>${item.link}</link>
  <description>${escapeXml(item.description)}</description>
  <pubDate>${item.pubDate}</pubDate>
  <guid>${item.guid}</guid>
</item>`
    )
    .join("\n");
}

export function GET(_request: NextRequest) {
  const buildDate = new Date().toUTCString();

  // Static research content
  const staticItems: RssItem[] = [
    {
      title: "Can AI Combine CRM Churn Signals with ERP Supply Delays?",
      link: `${BASE_URL}/benchmarks/crm-erp-at-risk-accounts-v1`,
      description:
        "A structured evaluation of cross-system reasoning capabilities across representative AI sales platform architectures.",
      pubDate: "Sat, 05 Sep 2026 00:00:00 GMT",
      guid: `${BASE_URL}/benchmarks/crm-erp-at-risk-accounts-v1`,
    },
    {
      title: "Architecture & Security Index 2026",
      link: `${BASE_URL}/indexes/architecture-security-index-2026`,
      description:
        "12-dimension evaluation of enterprise AI platforms on architecture, security, and governance maturity.",
      pubDate: "Sat, 05 Sep 2026 00:00:00 GMT",
      guid: `${BASE_URL}/indexes/architecture-security-index-2026`,
    },
    {
      title: "ASCS Scorecard 2026",
      link: `${BASE_URL}/indexes/ascs-scorecard-2026`,
      description:
        "Composite ASCS scores for all evaluated enterprise AI sales platforms.",
      pubDate: "Sat, 05 Sep 2026 00:00:00 GMT",
      guid: `${BASE_URL}/indexes/ascs-scorecard-2026`,
    },
    {
      title: "State of AI in Enterprise Sales 2026",
      link: `${BASE_URL}/cxo-intelligence/state-of-ai-enterprise-sales-2026`,
      description:
        "CXO intelligence report on AI adoption trends, agentic autonomy, and enterprise deployment patterns.",
      pubDate: "Sat, 05 Sep 2026 00:00:00 GMT",
      guid: `${BASE_URL}/cxo-intelligence/state-of-ai-enterprise-sales-2026`,
    },
  ];

  // Dynamic vendor items from markdown content
  const vendorItems: RssItem[] = getVisibleVendors().map((v) => ({
    title: `${v.name} — Reviews CXO Assessment (${v.ascsComposite}/10)`,
    link: `${BASE_URL}/vendors/${v.slug}`,
    description: `Reviews CXO assessment of ${v.name}: ${v.tagline}. Assessed ${v.ascsComposite}/10 on the ASCS enterprise framework.`,
    pubDate: new Date().toUTCString(),
    guid: `${BASE_URL}/vendors/${v.slug}`,
  }));

  // Dynamic question items from markdown content
  const questionItems: RssItem[] = getPublishedQuestions().map((q) => ({
    title: q.title,
    link: `${BASE_URL}/questions/${q.slug}`,
    description: q.excerpt || q.question,
    pubDate: new Date(q.publishedAt).toUTCString(),
    guid: `${BASE_URL}/questions/${q.slug}`,
  }));

  const allItems = [...staticItems, ...vendorItems, ...questionItems];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Reviews CXO</title>
    <link>${BASE_URL}</link>
    <description>Independent enterprise AI and software vendor research. Benchmarks, ASCS scores, architecture analysis, and CXO insights.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${buildRssItems(allItems)}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
