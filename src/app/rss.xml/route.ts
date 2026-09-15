import type { NextRequest } from "next/server";

const RSS_ITEMS = `
<item>
  <title>Can AI Combine CRM Churn Signals with ERP Supply Delays?</title>
  <link>https://reviews-cxo.com/benchmarks/crm-erp-at-risk-accounts-v1</link>
  <description>A structured evaluation of cross-system reasoning capabilities across representative AI sales platform architectures.</description>
  <pubDate>Sat, 05 Sep 2026 00:00:00 GMT</pubDate>
  <guid>https://reviews-cxo.com/benchmarks/crm-erp-at-risk-accounts-v1</guid>
</item>
<item>
  <title>Architecture &amp; Security Index 2026</title>
  <link>https://reviews-cxo.com/indexes/architecture-security-index-2026</link>
  <description>12-dimension evaluation of enterprise AI platforms on architecture, security, and governance maturity.</description>
  <pubDate>Sat, 05 Sep 2026 00:00:00 GMT</pubDate>
  <guid>https://reviews-cxo.com/indexes/architecture-security-index-2026</guid>
</item>
<item>
  <title>ASCS Scorecard 2026</title>
  <link>https://reviews-cxo.com/indexes/ascs-scorecard-2026</link>
  <description>Composite ASCS scores for all evaluated enterprise AI sales platforms.</description>
  <pubDate>Sat, 05 Sep 2026 00:00:00 GMT</pubDate>
  <guid>https://reviews-cxo.com/indexes/ascs-scorecard-2026</guid>
</item>
`;

export function GET(_request: NextRequest) {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Reviews CXO</title>
    <link>https://reviews-cxo.com</link>
    <description>Benchmarks, architecture analysis, and CXO insights on AI sales platforms.</description>
    <language>en-us</language>
    <lastBuildDate>Sat, 05 Sep 2026 00:00:00 GMT</lastBuildDate>
    <atom:link href="https://reviews-cxo.com/rss.xml" rel="self" type="application/rss+xml" />
    ${RSS_ITEMS}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
