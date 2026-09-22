import { loadAllVendorsFromContent } from "./content-loader";

export type EvidenceClassification =
  | "observed"
  | "documented"
  | "partially-documented"
  | "third-party-confirmed"
  | "simulated"
  | "inferred"
  | "not-tested";


export interface AnalystEvaluation {
  editorialNarrative: string;
  idealEnterpriseWorkloads: string[];
  knownLimitations: string[];
  coreStrengths: string[];
}

export interface CustomerSentiment {
  aggregateRatings: { platform: string; rating: string; reviewCount: string; notes?: string }[];
  positiveThemes: string[];
  negativeThemes: string[];
  contradictions?: string;
}

export interface AICapabilities {
  assessment: string;
  strengths: string[];
  weaknesses: string[];
  governance?: string;
}

export interface PricingDetails {
  model: string;
  breakdown: { component: string; price: string }[];
  tcoConsiderations: string[];
  uncertainty?: string;
}

export interface EvidenceSource {
  title: string;
  type: string;
  description: string;
  url: string;
  date?: string;
}

export interface Vendor {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  founded: number;
  hq: string;
  website: string;
  rating: number; // aggregate satisfaction rating (0-5)
  reviewCount: number;
  pricing: string;
  freeTrial: boolean;
  bestFor: string[];
  pros: string[];
  cons: string[];
  features: string[];
  integrations: string[];
  certifications: string[];
  deployment: string[];
  hidden?: boolean; // If true, vendor is excluded from public listings
  // ASCS 12-Dimension Research Evaluation
  ascsScores: Record<number, number>;
  ascsEvidence: Record<number, EvidenceClassification>;
  ascsComposite: number;
  architectureProfile: {
    erpCoupling: "Native / Deep Transactional" | "Bi-Directional Sync" | "Connector-Based / Middleware" | "Third-Party ETL / API" | "Uncoupled / Standalone";
    reasoningEngine: string;
    agenticTier: "Autonomous Multi-Step" | "Deterministic Co-Pilot" | "Task Automation" | "Analytics-Only";
  };
  workloadFit: {
    idealDeployment: string;
    keyTradeOff: string;
  };
  analystEvaluation?: AnalystEvaluation;
  customerSentiment?: CustomerSentiment;
  aiCapabilities?: AICapabilities;
  pricingDetails?: PricingDetails;
  evidenceSources?: EvidenceSource[];
  parentCompany?: {
    name: string;
    website: string;
    relationship: string;
    description: string;
    services: string[];
  };
}

// Lazy-loaded vendors from Markdown content files
function loadVendors(): Vendor[] {
  try {
    return loadAllVendorsFromContent();
  } catch (e) {
    console.error("[vendors.ts] Failed to load vendors from content:", e);
    return [];
  }
}

// VENDORS is populated from markdown content files at module load time.
export const VENDORS: Vendor[] = loadVendors();
export function computeAscsComposite(scores: Record<number, number>): number {
  const weights: Record<number, number> = {
    1: 0.10, 2: 0.08, 3: 0.12, 4: 0.12, 5: 0.10, 6: 0.10,
    7: 0.08, 8: 0.10, 9: 0.05, 10: 0.05, 11: 0.05, 12: 0.05
  };
  let total = 0;
  for (let i = 1; i <= 12; i++) {
    total += (scores[i] ?? 0) * weights[i];
  }
  return Number(total.toFixed(1));
}

export function getTopAscsVendors(limit = 10): Vendor[] {
  return [...getVisibleVendors()].sort((a, b) => b.ascsComposite - a.ascsComposite).slice(0, limit);
}

export interface DocumentationSource {
  title: string;
  url: string;
  type: "Official Docs" | "API Reference" | "Trust Center" | "Architecture Spec" | "Lab Benchmark";
  description: string;
}

export function getVendorDocumentationSources(vendor: Vendor): DocumentationSource[] {
  const customSources: Record<string, DocumentationSource[]> = {
    salesforce: [
      {
        title: "Salesforce Help & Product Documentation",
        url: "https://help.salesforce.com",
        type: "Official Docs",
        description: "Official user manuals, release notes, and configuration guides for Sales Cloud and Agentforce.",
      },
      {
        title: "Salesforce Developer & Agentforce API Center",
        url: "https://developer.salesforce.com/docs",
        type: "API Reference",
        description: "REST, GraphQL, Bulk, and Agentforce runtime API specifications and integration guides.",
      },
      {
        title: "Salesforce Compliance & Trust Portal",
        url: "https://trust.salesforce.com",
        type: "Trust Center",
        description: "Documented SOC 2 Type II, ISO 27001, FedRAMP, HIPAA, and real-time service uptime status.",
      },
      {
        title: "Salesforce Well-Architected Framework",
        url: "https://architect.salesforce.com",
        type: "Architecture Spec",
        description: "Prescriptive enterprise architecture guidelines, Data Cloud zero-copy federation, and governance.",
      },
    ],
    "microsoft-dynamics-365": [
      {
        title: "Microsoft Learn: Dynamics 365 Architecture",
        url: "https://learn.microsoft.com/en-us/dynamics365/",
        type: "Official Docs",
        description: "Comprehensive technical documentation for Dynamics 365 Sales, Finance, and Supply Chain.",
      },
      {
        title: "Microsoft Copilot Studio & Graph API Specs",
        url: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/",
        type: "API Reference",
        description: "Dataverse connectors, Copilot Studio extensibility, and Azure OpenAI telemetry endpoints.",
      },
      {
        title: "Microsoft Service Trust Portal",
        url: "https://servicetrust.microsoft.com",
        type: "Trust Center",
        description: "Independent audit reports, FedRAMP High, ISO 27001, and SOC compliance certifications.",
      },
    ],
    salezx: [
      {
        title: "Salezx Enterprise Architecture & Grounding Protocol",
        url: "https://www.salezx.com/architecture",
        type: "Architecture Spec",
        description: "Technical benchmark documentation detailing native SAP, Oracle, and NetSuite table ingestion mechanisms.",
      },
      {
        title: "Salezx Multi-Source Context Grounding Spec",
        url: "https://www.salezx.com/grounding",
        type: "Lab Benchmark",
        description: "Empirical retrieval latency and cross-system context consistency validation protocol.",
      },
      {
        title: "Salezx Enterprise Integration Kernel",
        url: "https://www.salezx.com/integrations",
        type: "Official Docs",
        description: "Platform guides for operational quote-to-cash workflow triggers, margin guardrails, and role governance.",
      },
      {
        title: "Salezx Security, SOC 2 & Isolation Standards",
        url: "https://www.salezx.com/security",
        type: "Trust Center",
        description: "SOC 2 Type II compliance specifications, AES-256 tenant data isolation, and audit trail logs.",
      },
    ],
    "sap-joule": [
      {
        title: "SAP Help Portal: Joule AI Assistant",
        url: "https://help.sap.com/docs/joule",
        type: "Official Docs",
        description: "Official guides for activating and orchestrating Joule within SAP S/4HANA Cloud and BTP.",
      },
      {
        title: "SAP Business Technology Platform (BTP) API Hub",
        url: "https://api.sap.com",
        type: "API Reference",
        description: "OData and REST APIs for SAP enterprise business objects, inventory master data, and financials.",
      },
      {
        title: "SAP Trust & Compliance Center",
        url: "https://www.sap.com/about/trust-center.html",
        type: "Trust Center",
        description: "Global enterprise compliance certificates, C5 criteria catalogue, and ISO/IEC 27001 audits.",
      },
    ],
    gong: [
      {
        title: "Gong Knowledge Center & Workflow Guides",
        url: "https://help.gong.io",
        type: "Official Docs",
        description: "Official documentation for deal intelligence, pipeline risk tracking, and team coaching setup.",
      },
      {
        title: "Gong Developer API & Webhooks Portal",
        url: "https://developer.gong.io",
        type: "API Reference",
        description: "APIs for call audio ingestion, transcription retrieval, CRM bi-directional sync, and webhooks.",
      },
      {
        title: "Gong Security & Compliance Portal",
        url: "https://trust.gong.io",
        type: "Trust Center",
        description: "SOC 2 Type II, ISO 27001, and enterprise data encryption and retention policies.",
      },
    ],
    hubspot: [
      {
        title: "HubSpot Knowledge Base & Product Docs",
        url: "https://knowledge.hubspot.com",
        type: "Official Docs",
        description: "Sales Hub guides, Breeze AI configuration, and pipeline automation setup manuals.",
      },
      {
        title: "HubSpot Developer Documentation & API Catalog",
        url: "https://developers.hubspot.com/docs",
        type: "API Reference",
        description: "RESTful CRM APIs, webhooks, custom object definitions, and Breeze Intelligence endpoints.",
      },
      {
        title: "HubSpot Trust Center & Data Protection",
        url: "https://trust.hubspot.com",
        type: "Trust Center",
        description: "SOC 2 Type II, GDPR, ISO 27001, and sub-processor transparency reports.",
      },
    ],
    "zoho-crm": [
      {
        title: "Zoho CRM Product Documentation",
        url: "https://www.zoho.com/crm/help/",
        type: "Official Docs",
        description: "Official user guides for Zoho CRM, Zia AI, Canvas Builder, Blueprint, and Zoho One suite.",
      },
      {
        title: "Zoho Developer & API Documentation",
        url: "https://www.zoho.com/crm/developer/docs/",
        type: "API Reference",
        description: "REST API v8 specifications, OAuth 2.0 authentication, Deluge scripting, and Zoho Flow connectors.",
      },
      {
        title: "Zoho Trust & Compliance Center",
        url: "https://www.zoho.com/trust/",
        type: "Trust Center",
        description: "SOC 2 Type II, ISO 27001/27017/27018, HIPAA, GDPR, and AES-256 encryption compliance documentation.",
      },
      {
        title: "Zoho One Ecosystem Documentation",
        url: "https://www.zoho.com/one/",
        type: "Official Docs",
        description: "Comprehensive guides for 55+ Zoho applications and their native integrations within the Zoho ecosystem.",
      },
    ],
  };

  if (customSources[vendor.slug]) {
    return customSources[vendor.slug];
  }

  return [
    {
      title: `${vendor.name} Official Product Documentation`,
      url: vendor.website,
      type: "Official Docs",
      description: `Official documentation, user guides, and feature releases from ${vendor.name}.`,
    },
    {
      title: `${vendor.name} Developer & Integration Catalog`,
      url: vendor.website,
      type: "API Reference",
      description: `Supported integration endpoints and connector guides for ${vendor.integrations.slice(0, 3).join(", ")}.`,
    },
    {
      title: `${vendor.name} Security & Compliance Specifications`,
      url: vendor.website,
      type: "Trust Center",
      description: `Documented enterprise security certifications: ${vendor.certifications.join(", ")}.`,
    },
  ];
}

/**
 * Get only visible vendors (not marked as hidden).
 * Use this instead of VENDORS directly for public-facing pages.
 */
export function getVisibleVendors(): Vendor[] {
  return VENDORS.filter((v) => !v.hidden);
}

/**
 * Get all vendors including hidden ones (for admin/internal use).
 */
export function getAllVendors(): Vendor[] {
  return VENDORS;
}


export function getVendorBySlug(slug: string): Vendor | undefined {
  return VENDORS.find((v) => v.slug === slug);
}


export const VENDOR_CATEGORIES = [
  "CRM + ERP / Enterprise Operations",
  "Enterprise CRM & Ecosystem",
  "AI Platform / Productivity Embedded",
  "AI Platform / CRM Embedded",
  "AI Platform / ERP Embedded"
] as const;
