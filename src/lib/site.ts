export const SITE = {
  name: "Reviews_CXO",
  title: "Reviews_CXO — AI Enterprise Sales Research",
  description:
    "Benchmarks, architecture analysis, and CXO insights on AI sales platforms. Independent, evidence-based research for enterprise buyers.",
  url: "https://reviews-cxo.com",
  ogImage: "/og-image.png",
  email: "research@reviews-cxo.com",
} as const;

export const NAVIGATION = [
  {
    label: "Rankings",
    href: "/rankings",
    description: "Top platforms ranked by ASCS score",
  },
  {
    label: "Compare",
    href: "/compare",
    description: "Head-to-head platform comparisons",
  },
  {
    label: "Platforms",
    href: "/vendors",
    description: "All 30+ platforms evaluated",
  },
  {
    label: "Benchmarks",
    href: "/benchmarks",
    description: "Reproducible evaluations",
  },
  {
    label: "IT Companies",
    href: "/it-companies",
    description: "AI project delivery reviews",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    description: "Published AI project reviews",
  },
  {
    label: "Questions",
    href: "/questions",
    description: "Community questions with research analysis",
  },
  {
    label: "Methodology",
    href: "/about/methodology",
    description: "ASCS 12-dimension framework",
  },
] as const;

export const NAV_GROUPS = [
  {
    label: "Research",
    items: [
      {
        label: "Rankings",
        href: "/rankings",
        description: "ASCS 2026 Enterprise Index — top platforms ranked",
        icon: "chart",
      },
      {
        label: "Benchmarks",
        href: "/benchmarks",
        description: "Reproducible lab tests & evaluations",
        icon: "flask",
      },
      {
        label: "Compare",
        href: "/compare",
        description: "Head-to-head platform architecture comparisons",
        icon: "scale",
      },
    ],
  },
  {
    label: "Explore",
    items: [
      {
        label: "Platforms",
        href: "/vendors",
        description: "All 30+ AI sales platforms evaluated",
        icon: "grid",
      },
      {
        label: "IT Companies",
        href: "/it-companies",
        description: "AI project delivery partner reviews",
        icon: "building",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        description: "Published enterprise AI project reviews",
        icon: "file",
      },
    ],
  },
  {
    label: "Community",
    items: [
      {
        label: "Questions",
        href: "/questions",
        description: "Community questions with expert analysis",
        icon: "chat",
      },
      {
        label: "Methodology",
        href: "/about/methodology",
        description: "ASCS 12-dimension evaluation framework",
        icon: "book",
      },
    ],
  },
] as const;

export const ABOUT_LINKS = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/about/methodology" },
  { label: "Editorial Policy", href: "/about/editorial-policy" },
  { label: "Disclosure", href: "/about/disclosure" },
  { label: "Corrections", href: "/about/corrections" },
] as const;

export const EVIDENCE_TYPES = [
  {
    id: "observed",
    label: "Observed",
    weight: "1.0x",
    description: "Directly tested in controlled lab environment by Reviews_CXO",
  },
  {
    id: "documented",
    label: "Documented",
    weight: "0.9x",
    description:
      "Verified through official vendor documentation, public API docs, or published specs",
  },
  {
    id: "partially-documented",
    label: "Partially Documented",
    weight: "0.7x",
    description:
      "Referenced in vendor materials but without sufficient technical detail to fully verify",
  },
  {
    id: "third-party-confirmed",
    label: "Third-Party Confirmed",
    weight: "0.85x",
    description:
      "Confirmed by independent analyst reports, customer case studies, or peer-reviewed research",
  },
  {
    id: "simulated",
    label: "Simulated",
    weight: "0.75x",
    description:
      "Tested using a representative configuration that mimics vendor architecture",
  },
  {
    id: "inferred",
    label: "Inferred",
    weight: "0.5x",
    description:
      "Reasonable conclusion based on related evidence but not directly verified",
  },
  {
    id: "not-tested",
    label: "Not Tested",
    weight: "0x",
    description: "Not evaluated; explicitly marked as gap",
  },
] as const;

export const ASCS_DIMENSIONS = [
  {
    number: 1,
    name: "ERP Connectivity",
    weight: "10%",
    description:
      "Depth of native ERP integration (SAP, Oracle, NetSuite, etc.)",
    whyItMatters:
      "Enterprise sales AI must reason over operational data, not just CRM records",
  },
  {
    number: 2,
    name: "CRM Data Grounding",
    weight: "8%",
    description:
      "Ability to ingest, normalize, and reason over CRM data (Salesforce, HubSpot, Dynamics)",
    whyItMatters:
      "Foundation of all sales AI use cases",
  },
  {
    number: 3,
    name: "Cross-System Reasoning",
    weight: "12%",
    description:
      "Ability to combine data from CRM + ERP + external sources in a single reasoning chain",
    whyItMatters:
      "The defining capability gap in 2026 — most systems fail here",
  },
  {
    number: 4,
    name: "AI Reasoning Quality",
    weight: "12%",
    description:
      "Accuracy, faithfulness, hallucination rate, chain-of-thought quality",
    whyItMatters: "Core intelligence metric",
  },
  {
    number: 5,
    name: "Workflow Automation",
    weight: "10%",
    description:
      "End-to-end task completion (not just recommendations, but actions taken)",
    whyItMatters: "Separates copilots from autonomous agents",
  },
  {
    number: 6,
    name: "Agentic Capability",
    weight: "10%",
    description:
      "Multi-step planning, tool selection, sub-agent coordination, trajectory accuracy",
    whyItMatters:
      "Reflects the shift to agentic AI in 2026",
  },
  {
    number: 7,
    name: "Data Accessibility & Openness",
    weight: "8%",
    description:
      "API-first architecture, data export, programmatic access, open standards",
    whyItMatters: "Enterprise buyers need data portability",
  },
  {
    number: 8,
    name: "Security & Governance",
    weight: "10%",
    description:
      "Encryption, SSO/SAML, SCIM, SOC 2, ISO, data isolation, audit trails",
    whyItMatters: "Non-negotiable for enterprise adoption",
  },
  {
    number: 9,
    name: "Explainability & Transparency",
    weight: "5%",
    description:
      "Can the system explain why it made a recommendation? Source attribution?",
    whyItMatters: "Critical for CXO trust and regulatory compliance",
  },
  {
    number: 10,
    name: "Deployment Flexibility",
    weight: "5%",
    description:
      "Cloud, on-prem, hybrid, VPC, edge deployment options",
    whyItMatters: "Many enterprises cannot go fully cloud",
  },
  {
    number: 11,
    name: "Integrations Ecosystem",
    weight: "5%",
    description:
      "Breadth and depth of third-party integrations, marketplace, connectors",
    whyItMatters: "Ecosystem maturity indicator",
  },
  {
    number: 12,
    name: "Market Adoption & Ecosystem",
    weight: "5%",
    description:
      "Customer base, community, third-party analyst coverage, hiring signals",
    whyItMatters: "Proxy for long-term viability",
  },
] as const;

export const SCORING_RUBRIC = [
  { range: "0", meaning: "Not available / no evidence" },
  { range: "1–2", meaning: "Minimal / experimental / pre-release" },
  { range: "3–4", meaning: "Basic capability / limited documentation" },
  {
    range: "5–6",
    meaning: "Functional / documented / meets baseline enterprise requirements",
  },
  {
    range: "7–8",
    meaning: "Strong / well-documented / differentiated capability",
  },
  {
    range: "9–10",
    meaning: "Industry-leading / extensive evidence / best-in-class",
  },
];
