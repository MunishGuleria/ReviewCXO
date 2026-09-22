export const SITE = {
  name: "Reviews CXO",
  title: "Reviews CXO — AI Enterprise Sales Research",
  description:
    "Architecture analysis, and CXO insights on AI sales platforms. Editorial research for enterprise buyers.",
  url: "https://reviewscxo.com",
  ogImage: "/og-image.png",
  email: "research@reviewscxo.com",
} as const;

export const NAVIGATION = [
  {
    label: "Rankings",
    href: "/rankings",
    description: "Top platforms ranked by ASCS score",
    hidden: false,
  },
  {
    label: "Compare",
    href: "/compare",
    description: "Head-to-head platform comparisons",
    hidden: true,
  },
  {
    label: "Platforms",
    href: "/vendors",
    description: "Enterprise platforms evaluated by Reviews CXO",
    hidden: false,
  },
  {
    label: "Benchmarks",
    href: "/benchmarks",
    description: "Controlled evaluations with published methodology",
    hidden: true,
  },
  {
    label: "Questions",
    href: "/questions",
    description: "Community questions with research analysis",
    hidden: false,
  },
  {
    label: "Methodology",
    href: "/about/methodology",
    description: "ASCS 12-dimension framework",
    hidden: false,
  },
] as const;

export const NAV_GROUPS = [
  {
    label: "Rankings",
    href: "/rankings",
    directLink: true,
    items: [],
  },
  {
    label: "Explore",
    href: "",
    directLink: false,
    items: [
      {
        label: "Platforms",
        href: "/vendors",
        description: "Enterprise AI sales platforms evaluated by Reviews CXO",
        icon: "grid",
        hidden: false,
      },
      {
        label: "About",
        href: "/about",
        description: "Our mission, team, and research approach",
        icon: "building",
        hidden: false,
      },
    ],
  },
  {
    label: "Community",
    href: "",
    directLink: false,
    items: [
      {
        label: "Questions",
        href: "/questions",
        description: "Community questions with research analysis",
        icon: "chat",
        hidden: false,
      },
      {
        label: "Methodology",
        href: "/about/methodology",
        description: "ASCS 12-dimension evaluation framework",
        icon: "book",
        hidden: false,
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
    description: "Assessed through structured testing methods",
  },
  {
    id: "documented",
    label: "Documented",
    weight: "0.9x",
    description:
      "Confirmed through official vendor documentation, public API docs, or published specifications",
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
      "Reported by independent analyst reports, customer case studies, or published research",
  },
  {
    id: "simulated",
    label: "Simulated",
    weight: "0.75x",
    description:
      "Tested using a representative configuration based on vendor architecture documentation",
  },
  {
    id: "inferred",
    label: "Inferred",
    weight: "0.5x",
    description:
      "Reasonable conclusion based on related evidence but not directly confirmed",
  },
  {
    id: "not-tested",
    label: "Not Tested",
    weight: "0x",
    description: "Not evaluated; explicitly marked as a gap in coverage",
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
      "Enterprise sales AI must reason over operational data, not just CRM records"
  },
  {
    number: 2,
    name: "CRM Data Grounding",
    weight: "8%",
    description:
      "Ability to ingest, normalize, and reason over CRM data (Salesforce, Dynamics 365, etc.)",
    whyItMatters:
      "Foundation of all sales AI use cases"
  },
  {
    number: 3,
    name: "Cross-System Reasoning",
    weight: "12%",
    description:
      "Ability to combine data from CRM + ERP + external sources in a single reasoning chain",
    whyItMatters:
      "A defining capability gap in 2026 — most systems face challenges here"
  },
  {
    number: 4,
    name: "AI Reasoning Quality",
    weight: "12%",
    description:
      "Accuracy, faithfulness, hallucination rate, response quality and task reliability",
    whyItMatters: "Core intelligence metric"
  },
  {
    number: 5,
    name: "Workflow Automation",
    weight: "10%",
    description:
      "End-to-end task completion (not just recommendations, but actions taken)",
    whyItMatters: "Separates copilots from autonomous agents"
  },
  {
    number: 6,
    name: "Agentic Capability",
    weight: "10%",
    description:
      "Multi-step planning, tool selection, sub-agent coordination, trajectory accuracy",
    whyItMatters:
      "Reflects the shift to agentic AI in 2026"
  },
  {
    number: 7,
    name: "Data Accessibility & Openness",
    weight: "8%",
    description:
      "API-first architecture, data export, programmatic access, open standards",
    whyItMatters: "Enterprise buyers need data portability"
  },
  {
    number: 8,
    name: "Security & Governance",
    weight: "10%",
    description:
      "Encryption, SSO/SAML, SCIM, SOC 2, ISO, data isolation, audit trails",
    whyItMatters: "Non-negotiable for enterprise adoption"
  },
  {
    number: 9,
    name: "Explainability & Transparency",
    weight: "5%",
    description:
      "Can the system explain why it made a recommendation? Source attribution?",
    whyItMatters: "Critical for CXO trust and regulatory compliance"
  },
  {
    number: 10,
    name: "Deployment Flexibility",
    weight: "5%",
    description:
      "Cloud, on-prem, hybrid, VPC, edge deployment options",
    whyItMatters: "Many enterprises cannot go fully cloud"
  },
  {
    number: 11,
    name: "Integrations Ecosystem",
    weight: "5%",
    description:
      "Breadth and depth of third-party integrations, marketplace, connectors",
    whyItMatters: "Ecosystem maturity indicator"
  },
  {
    number: 12,
    name: "Market Adoption & Ecosystem",
    weight: "5%",
    description:
      "Customer base, community, third-party analyst coverage, hiring signals",
    whyItMatters: "Proxy for long-term viability"
  },
] as const;

export const SCORING_RUBRIC = [
  { range: "0", meaning: "Not available / no evidence found" },
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
    meaning: "Recognized / extensive evidence / highly-rated",
  },
];

export const QUESTION_CATEGORIES = [
  "AI Strategy", "AI Platforms", "AI Comparison", "AI Governance",
  "Implementation", "Pricing & TCO", "Data & Pricing", "ERP AI",
  "Security & Trust", "Vendor Management",
];
