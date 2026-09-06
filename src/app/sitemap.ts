import type { MetadataRoute } from "next";
import { VENDORS } from "@/lib/vendors";
import { getPublishedQuestions } from "@/lib/questions";
import { getAllITCompanies } from "@/lib/it-companies";
import { getPublishedCaseStudies } from "@/lib/reviews";

const BASE_URL = "https://reviews-cxo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/about/methodology`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/about/editorial-policy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/about/disclosure`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/about/corrections`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/rankings`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/benchmarks`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/benchmarks/crm-erp-at-risk-accounts-v1`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/indexes`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/indexes/architecture-security-index-2026`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/indexes/ascs-scorecard-2026`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/cxo-intelligence`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/cxo-intelligence/state-of-ai-enterprise-sales-2026`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/compare/salezx-vs-salesforce-erp-scenarios`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/compare/salezx-vs-microsoft-data-grounding`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/compare/erp-ai-vs-crm-copilots`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/compare/enterprise-ai-architecture-patterns`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/compare/ai-sales-on-prem-vs-cloud-vs-hybrid`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/vendors`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/glossary`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/newsletter`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${BASE_URL}/questions`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/it-companies`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/case-studies`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/submit-review`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/rankings/it-companies`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  const comparisonPages = [
    "salezx-vs-salesforce",
    "salezx-vs-microsoft-dynamics-365",
    "salesforce-vs-microsoft-dynamics-365",
    "salesforce-vs-hubspot",
    "gong-vs-clari",
    "outreach-vs-salesloft",
    "zoominfo-vs-apollo-io",
    "seismic-vs-highspot",
    "zoho-crm-vs-hubspot",
    "pipedrive-vs-close",
    "6sense-vs-demandbase",
    "intercom-vs-drift",
  ].map((pair) => ({
    url: `${BASE_URL}/compare/${pair}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const vendorPages = VENDORS.map((v) => ({
    url: `${BASE_URL}/vendors/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const questionPages = getPublishedQuestions().map((q) => ({
    url: `${BASE_URL}/questions/${q.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const itCompanyPages = getAllITCompanies().map((c) => ({
    url: `${BASE_URL}/it-companies/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const caseStudyPages = getPublishedCaseStudies().map((cs) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...comparisonPages, ...vendorPages, ...questionPages, ...itCompanyPages, ...caseStudyPages];
}
