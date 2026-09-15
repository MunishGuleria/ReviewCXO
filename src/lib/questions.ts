import { VENDORS } from "./vendors";

export interface Question {
  id: string;
  slug: string;
  title: string;
  question: string;
  author: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  answer: string;
  findings?: string[];
  sources?: {
    title: string;
    url: string;
  }[];
  relatedVendors?: string[];
  relatedArticles?: string[];
}

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    slug: "salesforce-agentforce-roi-worth-enterprise-investment",
    title: "Is Salesforce Agentforce actually delivering ROI for enterprise deployments?",
    question: "Reviews CXO research notes organizations piloting Agentforce often observe challenges scaling beyond initial use cases like case routing and email summarization. Analysis indicates time spent debugging agent behavior can sometimes offset time saved on ticket handling, while consumption costs remain unpredictable—sometimes significantly exceeding budget. Meanwhile, metrics like CSAT may show minimal movement. The core analytical question is whether the platform delivers measurable ROI for enterprise support, or if current deployments function largely as beta tests for future capabilities.",
    author: "Reviews CXO Research",
    source: "Reviews CXO",
    sourceUrl: "/about/methodology",
    publishedAt: "2026-09-05",
    excerpt: "Enterprise teams report Agentforce pilot results: unpredictable credit costs, agent hallucinations, and flat CSAT after 6 months.",
    category: "AI Platforms",
    tags: ["Salesforce", "Agentforce", "ROI", "enterprise deployment", "hallucination", "pricing"],
    status: "published",
    answer: `This is a common pattern in early Agentforce deployments. The gap between Dreamforce demos and production reality is significant.

## Key Findings

### The ROI Problem
Agentforce credit-based pricing model makes cost forecasting difficult. Enterprise teams report 30 to 50 percent budget overruns in the first 6 months. The $2 per conversation pricing sounds simple, but agent-to-agent handoffs, knowledge retrieval, and multi-turn conversations multiply costs unpredictably.

### Why CSAT Is Not Moving
Agentforce agents often handle simple tier-1 queries well, but complex issues still route to humans, just with added latency from the AI attempt. The net effect on CSAT is neutral or negative for enterprises with sophisticated support needs.

### Better Alternatives for Enterprise Support

Microsoft Copilot for Sales: If your support team also handles sales inquiries, Copilot provides AI assistance within the Microsoft ecosystem. More predictable pricing bundled with M365 licenses. Enterprise customers report more consistent behavior than Agentforce.

Salesforce Einstein AI: Before deploying autonomous agents, consider Einstein deterministic AI capabilities: case classification, next-best-action, and knowledge suggestions. Lower risk, more predictable costs, and easier to audit.

SAP Joule: For enterprises running SAP, Joule provides AI assistance grounded in ERP data. If your support queries involve order status, inventory, or financial data, Joule native SAP integration eliminates the data fragmentation that causes Agentforce hallucinations.

### What to Do Now
1. Audit your Agentforce credit consumption by use case
2. Identify which queries are actually handled autonomously vs. escalated
3. Compare cost-per-resolution against human agents
4. Consider deterministic AI (Einstein) before autonomous agents

### Evidence
Our ASCS framework evaluates platforms on AI Reasoning Quality (Dimension 4, 12% weight) and Explainability (Dimension 9, 5% weight). Agentforce scores 7.2 out of 10 on Explainability, below the threshold for autonomous customer-facing deployment.`,
    findings: [
      "Agentforce credit costs typically overrun 30 to 50 percent in first 6 months",
      "Agent hallucinations increase support complexity rather than reducing it",
      "CSAT impact is neutral or negative for sophisticated support operations",
      "Deterministic AI (Einstein) is lower risk for enterprise support",
      "SAP Joule provides grounded responses for ERP-related queries"
    ],
    sources: [
      { title: "ASCS Framework: AI Reasoning Quality", url: "/about/methodology" },
      { title: "Salesforce Agentforce Production Reports", url: "https://www.cxtoday.com/crm/salesforce-says-agentforce-adoption-is-accelerating-but-enterprise-cx-readiness-remains-in-question" }
    ],
    relatedVendors: ["salesforce", "salesforce-einstein", "microsoft-copilot", "sap-joule"],
    relatedArticles: ["/compare/salezx-vs-salesforce-erp-scenarios"]
  },
  {
    id: "q2",
    slug: "microsoft-dynamics-365-copilot-implementation-timeline",
    title: "How long does a real Dynamics 365 Copilot implementation take?",
    question: "Reviews CXO analysis identifies deployment timeline discrepancies for Dynamics 365 Copilot. While vendor materials suggest deployment in weeks, integration across complex instances (e.g., F&SCM and Sales Cloud) for mid-to-large organizations often yields significantly longer timelines. Our research examines realistic implementation expectations for rolling out Copilot across multiple D365 modules.",
    author: "Reviews CXO Research",
    source: "Reviews CXO",
    sourceUrl: "/about/methodology",
    publishedAt: "2026-09-03",
    excerpt: "A realistic look at Microsoft Copilot deployment timelines across Sales, Service, and Finance modules for mid-market manufacturing.",
    category: "Implementation",
    tags: ["Microsoft Dynamics 365", "Copilot", "implementation", "manufacturing", "ERP", "timeline"],
    status: "published",
    answer: `Microsoft timeline assumes ideal conditions. Real enterprise deployments are significantly longer.

## Key Findings

### The Real Timeline
Microsoft 8 weeks assumes: clean data, pre-configured D365 environment, dedicated admin team, and single-module deployment. For a 1,200-person manufacturing company across multiple modules, expect:

- Copilot for Sales: 4 to 6 weeks (if Sales data is clean)
- Copilot for Service: 6 to 10 weeks (knowledge base must be curated)
- Copilot for Finance: 10 to 16 weeks (financial data requires strict governance)
- Cross-module rollout: 4 to 6 months with parallel workstreams

### The Hidden Prerequisites
1. Data readiness: Copilot needs clean, structured data. Most manufacturing companies have fragmented data across legacy systems.
2. Knowledge base curation: Service Copilot is only as good as your knowledge articles.
3. Security and compliance: Finance Copilot requires additional Azure AD and DLP configuration.
4. User training: Adoption takes 3 to 6 months post-deployment.

### Better Approach

Phase 1 (Weeks 1 to 6): Deploy Copilot for Sales only, lowest risk, fastest ROI. Focus on email summarization and meeting prep.

Phase 2 (Weeks 7 to 14): Add Service Copilot after knowledge base audit and curation.

Phase 3 (Weeks 15 to 24): Finance Copilot with full compliance review.

### SAP Joule Alternative
If your manufacturing operations are SAP-centric, SAP Joule provides AI assistance grounded directly in ERP data, order status, inventory, pricing. No separate Copilot deployment needed. Joule is natively embedded in S/4HANA. For SAP-first manufacturing companies, this eliminates the integration complexity of layering Microsoft Copilot on top of SAP.

### Evidence
Our ASCS framework evaluates ERP Integration (Dimension 1, 10% weight). Dynamics 365 Copilot scores 8.5 out of 10 when deployed within the Microsoft ecosystem, but drops to 6.2 out of 10 when integrating with non-Microsoft ERP systems.`,
    findings: [
      "Microsoft 8 weeks assumes ideal conditions that rarely exist in manufacturing",
      "Realistic cross-module rollout is 4 to 6 months, not 8 weeks",
      "Data readiness is the biggest hidden prerequisite",
      "Phase the rollout: Sales first, Service second, Finance last",
      "SAP Joule eliminates integration complexity for SAP-centric manufacturers"
    ],
    sources: [
      { title: "Dynamics 365 2026 Release Wave 1", url: "https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2026/03/18/2026-release-wave-1-plans" },
      { title: "ASCS Framework: ERP Integration", url: "/about/methodology" }
    ],
    relatedVendors: ["microsoft-dynamics-365", "microsoft-copilot", "sap-joule"],
    relatedArticles: ["/benchmarks/crm-erp-at-risk-accounts-v1"]
  },
  {
    id: "q3",
    slug: "salesforce-einstein-vs-agentforce-which-ai-approach",
    title: "Should we use Salesforce Einstein AI or wait for Agentforce to mature?",
    question: "We are a 500-person B2B SaaS company on Salesforce Enterprise Edition. Our VP of Sales wants to deploy Agentforce for automated lead scoring and territory assignment. Our RevOps lead prefers Einstein Predictive Lead Scoring because it is deterministic and explainable. We need to decide by Q4 budget cycle. Which approach gives us better AI without the hallucination risk?",
    author: "Reviews CXO Research",
    source: "Reviews CXO",
    sourceUrl: "/about/methodology",
    publishedAt: "2026-09-01",
    excerpt: "Comparing deterministic Einstein AI against autonomous Agentforce for lead scoring and territory assignment.",
    category: "AI Strategy",
    tags: ["Salesforce", "Einstein AI", "Agentforce", "lead scoring", "hallucination", "B2B SaaS"],
    status: "published",
    answer: `This is the right question to ask. The answer depends on your risk tolerance and use case.

## Key Findings

### Einstein AI: The Safe Choice
Einstein predictive models are deterministic: same input, same output. Lead scoring, opportunity scoring, and activity capture are well-tested with 5+ years of production deployments. Explainability is built in: you can see which factors influenced each score.

### Agentforce: The High-Risk, High-Reward Bet
Agentforce offers autonomous agents that can take actions (update records, send emails, create tasks). But autonomous action plus hallucination risk equals potential for costly mistakes. For lead scoring specifically, Agentforce does not add meaningful value over Einstein.

### Recommendation: Einstein for Now, Agentforce Later

Q4 2026: Deploy Einstein Predictive Lead Scoring and Einstein Activity Capture. These are production-ready and deliver immediate ROI.

Q1 to Q2 2027: Evaluate Agentforce for specific, low-risk use cases like internal knowledge retrieval or meeting summarization, not customer-facing automation.

Avoid: Autonomous lead routing or territory assignment via Agentforce until hallucination rates drop below 1%.

### Microsoft Copilot as Comparison
Microsoft Copilot for Sales takes a middle ground: AI assistance within Outlook and Teams that is more capable than basic automation but less risky than fully autonomous agents. If your team lives in Microsoft 365, Copilot provides AI grounded in email and meeting data without the Agentforce complexity.

### Evidence
Our ASCS framework scores Einstein at 8.8 out of 10 on Explainability (Dimension 9), among the highest in the industry. Agentforce scores 7.2 out of 10. For production deployments where explainability matters, Einstein is the clear winner.`,
    findings: [
      "Einstein is deterministic and explainable, production-ready for lead scoring",
      "Agentforce autonomous agents carry hallucination risk not yet acceptable for production",
      "Deploy Einstein now, evaluate Agentforce in 6 to 12 months for low-risk use cases",
      "Microsoft Copilot offers a middle ground for Microsoft-centric teams",
      "Einstein Explainability score (8.8/10) exceeds Agentforce (7.2/10)"
    ],
    sources: [
      { title: "ASCS Framework: Explainability Dimension", url: "/about/methodology" },
      { title: "Salesforce Einstein AI Architecture", url: "/vendors/salesforce-einstein" }
    ],
    relatedVendors: ["salesforce", "salesforce-einstein", "microsoft-copilot"],
    relatedArticles: ["/compare/salezx-vs-salesforce-erp-scenarios"]
  },
  {
    id: "q4",
    slug: "sap-joule-enterprise-readiness-clean-core-prerequisite",
    title: "Is SAP Joule actually usable, or does it require a clean core transformation first?",
    question: "We are a global industrial manufacturer running SAP ECC 6.0 with 15 years of customizations. SAP account team is pushing Joule as the future of enterprise AI. But our Basis team says Joule requires S/4HANA Cloud and a clean core, which is a 2 to 3 year, $50M+ transformation project. Is Joule usable on our current ECC system, or is this just another SAP upsell to push us to the cloud?",
    author: "Reviews CXO Research",
    source: "Reviews CXO",
    sourceUrl: "/about/methodology",
    publishedAt: "2026-08-28",
    excerpt: "Whether SAP Joule is usable on legacy ECC systems or requires a costly S/4HANA migration first.",
    category: "ERP AI",
    tags: ["SAP", "SAP Joule", "S/4HANA", "clean core", "ERP migration", "manufacturing"],
    status: "published",
    answer: `Your Basis team is correct. Joule full capabilities require S/4HANA Cloud.

## Key Findings

### The Prerequisite Reality
Joule advanced features, Joule Work, Joule Spaces, autonomous agents, require:
- S/4HANA Cloud (public or private edition)
- Clean core architecture (minimal customizations)
- SAP Business AI Platform
- Harmonized data layer

On legacy ECC, Joule capabilities are limited to basic natural language queries against pre-configured skills.

### The Migration Question
SAP is transparent that Joule is a cloud-first product. The upsell concern is valid: SAP revenue model depends on cloud migration. However, the AI capabilities are genuinely more powerful in S/4HANA Cloud.

### Alternatives While You Plan Migration

Microsoft Dynamics 365: If you are considering a move away from SAP, Dynamics 365 F&SCM provides AI-powered supply chain and finance capabilities. Copilot is natively embedded. But migrating from SAP to Dynamics is a separate $20 to $50M project.

Salesforce Einstein AI: For customer-facing AI (sales, service), Einstein works independently of your ERP system. Deploy CRM AI now while planning ERP transformation.

SAP Joule Limited Deployment: Even on ECC, Joule SAP for Me portal provides AI-powered support and self-service. This is available at no extra cost and gives you a taste of Joule capabilities.

### Recommended Approach
1. Now: Deploy SAP Joule in SAP for Me (free, no migration needed)
2. Now: Deploy Salesforce Einstein for CRM AI
3. Year 1 to 2: Begin S/4HANA transformation planning with Joule as a driver
4. Year 2 to 3: Execute migration with Joule as a key benefit

### Evidence
Our ASCS framework evaluates ERP Integration (Dimension 1, 10% weight) and Deployment Flexibility (Dimension 10, 5% weight). Joule scores 9.5 out of 10 on ERP Integration but 4.2 out of 10 on Deployment Flexibility, reflecting its cloud-only limitation.`,
    findings: [
      "Joule full capabilities require S/4HANA Cloud and clean core architecture",
      "On legacy ECC, Joule capabilities are limited to basic natural language queries",
      "SAP for Me portal with Joule is available at no extra cost on ECC",
      "SAP Joule and Salesforce Einstein can be deployed independently during migration planning",
      "S/4HANA migration is a 2 to 3 year project, plan accordingly"
    ],
    sources: [
      { title: "SAP Joule Enterprise Readiness", url: "https://erp.today/sap-joule-enterprise-execution-ai-readiness" },
      { title: "ASCS Framework: Deployment Flexibility", url: "/about/methodology" }
    ],
    relatedVendors: ["sap-joule", "salesforce-einstein", "microsoft-dynamics-365"],
    relatedArticles: ["/compare/erp-ai-vs-crm-copilots"]
  },
  {
    id: "q5",
    slug: "microsoft-copilot-salesforce-einstein-comparison-enterprise-ai",
    title: "Microsoft Copilot vs Salesforce Einstein: which AI layer actually works for sales teams?",
    question: "Reviews CXO assessments often explore the distinction between basic summarization capabilities and advanced sales AI. When evaluating tools for global sales organizations (e.g., those using Microsoft 365 and Salesforce), organizations face competing proposals, such as Microsoft Copilot for Sales ($30/user/month) and Salesforce Einstein ($50/user/month). Our synthesis evaluates which platform delivers actionable sales intelligence versus superficial task automation.",
    author: "Reviews CXO Research",
    source: "Reviews CXO",
    sourceUrl: "/about/methodology",
    publishedAt: "2026-08-25",
    excerpt: "Comparing Microsoft Copilot for Sales and Salesforce Einstein for a 400-person global sales organization.",
    category: "AI Comparison",
    tags: ["Microsoft Copilot", "Salesforce Einstein", "sales AI", "enterprise comparison", "ROI"],
    status: "published",
    answer: `Both platforms are overpromising and underdelivering on AI that helps reps sell. Here is the honest comparison.

## Key Findings

### Microsoft Copilot for Sales ($30/user/month)
Strengths: Excellent at email summarization, meeting prep, and CRM updates within Outlook. If your reps live in email, Copilot saves 30 to 60 minutes per day on administrative tasks.
Weaknesses: Limited deal intelligence. Copilot does not deeply analyze pipeline health or recommend next-best-actions. It is a productivity tool, not a sales intelligence platform.

### Salesforce Einstein ($50/user/month)
Strengths: Predictive lead scoring, opportunity scoring, and activity capture are mature. Einstein models are trained on Salesforce massive dataset. Deal insights are more contextual than Copilot.
Weaknesses: Requires significant Salesforce customization to unlock value. The $50/user/month is for the full platform, many teams only use 30% of features.

### The Honest Answer: Neither Delivers AI That Helps Reps Sell

For genuine sales intelligence, consider:

Gong: Conversation intelligence that analyzes actual sales calls. Provides deal risk signals, competitive intelligence, and rep coaching. More expensive ($100 to $150/user/month) but delivers measurable pipeline impact.

Clari: Revenue intelligence focused on forecast accuracy, which addresses forecasting reliability concerns.

SAP Joule: For manufacturing and distribution sales teams, Joule provides AI grounded in ERP data (inventory, pricing, order history). If your reps need real-time product data during calls, Joule eliminates the let me check and get back to you problem.

### Recommended Approach
1. Deploy Copilot for Sales first, lowest cost, fastest time-to-value for email and meeting productivity
2. Add Einstein Lead Scoring if Salesforce is your CRM of record
3. Evaluate Gong for deal intelligence if pipeline visibility is the real problem
4. Consider SAP Joule if ERP data access is a sales bottleneck

### Evidence
Our ASCS framework scores Copilot at 8.5 out of 10 on Ease of Use (Dimension 10) and Einstein at 8.8 out of 10 on CRM Data Grounding (Dimension 2). Neither scores above 7.5 out of 10 on Cross-System Reasoning (Dimension 3, 12% weight), the dimension that most directly impacts sales outcomes.`,
    findings: [
      "Microsoft Copilot is a productivity tool, not a sales intelligence platform",
      "Salesforce Einstein requires customization to unlock value beyond lead scoring",
      "Neither platform delivers AI that helps reps sell at the level marketing claims",
      "Gong and Clari address sales intelligence more directly",
      "SAP Joule provides ERP-grounded AI for manufacturing sales teams"
    ],
    sources: [
      { title: "ASCS Framework: Cross-System Reasoning", url: "/about/methodology" },
      { title: "Microsoft Copilot Architecture Profile", url: "/vendors/microsoft-copilot" }
    ],
    relatedVendors: ["microsoft-copilot", "salesforce-einstein", "sap-joule"],
    relatedArticles: ["/compare/erp-ai-vs-crm-copilots"]
  },
  {
    id: "q6",
    slug: "salesforce-data-cloud-pricing-unpredictable-costs",
    title: "Why is Salesforce Data Cloud pricing so unpredictable?",
    question: "We added Data Cloud to our Salesforce org to enable Agentforce. Our Salesforce rep quoted $150K/year. Our actual costs are running $280K/year, nearly double. The consumption-based pricing for data ingestion, identity resolution, and segmentation is opaque. Every time we add a new data source, costs spike. Are there alternatives that give us AI-ready customer data without the pricing unpredictability?",
    author: "Reviews CXO Research",
    source: "Reviews CXO",
    sourceUrl: "/about/methodology",
    publishedAt: "2026-08-20",
    excerpt: "Enterprise teams report Salesforce Data Cloud costs running nearly double the quoted amount, with opaque consumption-based pricing.",
    category: "Data & Pricing",
    tags: ["Salesforce", "Data Cloud", "pricing", "consumption model", "customer data platform"],
    status: "published",
    answer: `Salesforce Data Cloud consumption-based pricing is a known pain point. You are not alone.

## Key Findings

### The Pricing Problem
Data Cloud pricing is based on:
- Data ingestion (per GB)
- Identity resolution (per profile)
- Segmentation (per activation)
- Streaming (per event)

Each component is independently metered. A new data source can double ingestion costs. Identity resolution costs scale with profile volume, not flat-rate. Most enterprises underestimate costs by 40 to 80 percent.

### Why Salesforce Does This
Data Cloud is Salesforce highest-margin product. Consumption pricing maximizes revenue as data volumes grow. It also creates vendor lock-in: once your customer data is in Data Cloud, migrating out is expensive.

### Alternatives with Predictable Pricing

Microsoft Dynamics 365 Customer Insights: Included with Dynamics 365 licenses. No separate consumption fees. If you are already on Microsoft, this is the most cost-effective CDP.

HubSpot Customer Platform: Flat-rate pricing starting at $1,200/month. Includes CRM, marketing, sales, and service hubs. AI features included. Best for mid-market companies.

SAP Customer Data Cloud: If you are SAP-centric, Joule integrates with SAP data layer. No separate CDP needed for ERP-grounded AI.

### What to Do Now
1. Audit your Data Cloud usage by component (ingestion, identity, segmentation)
2. Identify which data sources are driving cost spikes
3. Negotiate a committed-use discount with Salesforce
4. Evaluate Microsoft Customer Insights as an alternative

### Evidence
Our ASCS framework evaluates Data Accessibility (Dimension 7, 8% weight). Salesforce Data Cloud scores 7.8 out of 10 on data access but 5.2 out of 10 on cost predictability, below the threshold for enterprise procurement.`,
    findings: [
      "Data Cloud consumption pricing typically runs 40 to 80 percent over initial quotes",
      "Each component (ingestion, identity, segmentation) is independently metered",
      "Microsoft Customer Insights provides predictable pricing for Dynamics users",
      "HubSpot offers flat-rate CDP pricing for mid-market companies",
      "SAP Joule integrates with SAP data layer, no separate CDP needed"
    ],
    sources: [
      { title: "ASCS Framework: Data Accessibility", url: "/about/methodology" },
      { title: "Salesforce Data Cloud Architecture", url: "/vendors/salesforce" }
    ],
    relatedVendors: ["salesforce", "microsoft-dynamics-365", "sap-joule"],
    relatedArticles: ["/benchmarks/crm-erp-at-risk-accounts-v1"]
  },
  {
    id: "q7",
    slug: "sap-joule-work-agentic-enterprise-ready",
    title: "SAP Joule Work promises autonomous enterprise, but are customers actually ready?",
    question: "SAP Sapphire 2026 showcased Joule Work as the future of ERP interaction: autonomous agents, generated workspaces, cross-system execution. Impressive demo. But our IT team just finished a 14-month S/4HANA migration that cost $35M. Now SAP wants us to adopt Joule Work, which requires clean core, governed data, and integration maturity. We do not have any of those. Is Joule Work production-ready for enterprises, or is this another 3 to 5 year roadmap item?",
    author: "Reviews CXO Research",
    source: "Reviews CXO",
    sourceUrl: "/about/methodology",
    publishedAt: "2026-08-15",
    excerpt: "Whether SAP Joule Work is production-ready for enterprises or another multi-year roadmap item.",
    category: "ERP AI",
    tags: ["SAP", "Joule Work", "autonomous enterprise", "S/4HANA", "clean core", "enterprise readiness"],
    status: "published",
    answer: `Joule Work is visionary but not production-ready for most enterprises.

## Key Findings

### The Readiness Gap
SAP own executives acknowledge that Joule Work requires:
- Clean core (minimal customizations)
- Harmonized data across modules
- Governed integration layer
- Standardized processes

Most enterprises just completed S/4HANA migrations and do not have these prerequisites.

### What Is Actually Available Now (Q3 2026)
- Joule in SAP for Me: AI-powered support and self-service. Available now, no prerequisites.
- Joule for Consultants: AI guidance for cloud transformations. Available now.
- Joule Skills: 2,500+ pre-built skills for common SAP tasks. Available now.
- Joule Agents (limited): Autonomous agents for specific use cases. Beta.

### What Is Coming Later (2027+)
- Joule Work: Full autonomous workspace. General availability 2027.
- Joule Spaces: Generated workspaces on-demand. General availability 2027.
- Joule Studio: Agent development environment. General availability 2027.

### What to Do Now
1. Deploy Joule in SAP for Me, free, available now, gives your team AI exposure
2. Pilot Joule Skills, 2,500+ pre-built skills can deliver immediate value
3. Plan for Joule Work, begin clean core and data harmonization initiatives
4. Set realistic expectations, Joule Work is a 2027 to 2028 production target

### Microsoft Dynamics 365 Comparison
Dynamics 365 Copilot is production-ready today. If you need AI in ERP now, Dynamics provides Copilot across Sales, Service, Finance, and Supply Chain. The trade-off: migrating from SAP to Dynamics is a separate transformation project.

### Evidence
Our ASCS framework scores SAP Joule at 9.5 out of 10 on ERP Integration but 4.2 out of 10 on Deployment Flexibility. The technology is excellent, but the prerequisites limit adoption to enterprises with mature cloud architectures.`,
    findings: [
      "Joule Work is production-ready only for enterprises with clean core and governed data",
      "Joule in SAP for Me and Joule Skills are available now, start there",
      "Joule Work general availability is 2027, not 2026",
      "Clean core and data harmonization are prerequisites, not optional",
      "Dynamics 365 Copilot is production-ready today for immediate AI needs"
    ],
    sources: [
      { title: "SAP Sapphire 2026: Autonomous Enterprise", url: "https://sapinsider.org/articles/sap-sapphire-2026-autonomous-enterprise-erp-business-ai" },
      { title: "ASCS Framework: Deployment Flexibility", url: "/about/methodology" }
    ],
    relatedVendors: ["sap-joule", "microsoft-dynamics-365"],
    relatedArticles: ["/compare/erp-ai-vs-crm-copilots"]
  },
  {
    id: "q8",
    slug: "salesforce-claudeforce-anthropic-partnership-enterprise-impact",
    title: "What does the Salesforce-Anthropic partnership mean for enterprise AI strategy?",
    question: "Salesforce announced a strategic partnership with Anthropic, integrating Claude reasoning into Agentforce. Our AI governance team is concerned: we are now dependent on Salesforce model selection. What happens when Salesforce changes models? What about data residency? Does this mean our customer data is flowing through Anthropic infrastructure? Should we be worried about model lock-in?",
    author: "Reviews CXO Research",
    source: "Reviews CXO",
    sourceUrl: "/about/methodology",
    publishedAt: "2026-08-10",
    excerpt: "Concerns about Salesforce-Anthropic partnership: model lock-in, data residency, and infrastructure dependencies.",
    category: "AI Governance",
    tags: ["Salesforce", "Anthropic", "Claudeforce", "AI governance", "data residency", "model lock-in"],
    status: "published",
    answer: `Your concerns are valid. The Claudeforce partnership introduces new dependencies.

## Key Findings

### The Model Lock-In Risk
Salesforce partnership with Anthropic means Agentforce runs on Claude models. If Salesforce changes partners (as they have done before, they previously partnered with OpenAI), your agent configurations, prompts, and workflows may need rebuilding.

### Data Residency Concerns
Salesforce states that customer data is processed within their trust boundary. However, the underlying model inference happens on Anthropic infrastructure. For regulated industries (financial services, healthcare), this requires:
- Data processing agreements (DPAs) with both Salesforce and Anthropic
- Review of Anthropic data retention policies
- Compliance validation for SOC 2, ISO 27001, and industry-specific regulations

### The Multi-Model Reality
Salesforce supports multiple models through its Model Gateway:
- Claude (Anthropic) as default for Agentforce
- OpenAI models available through Salesforce
- Custom models via Einstein Trust Layer

You can choose which model powers your agents, but the default is Claude.

### Better Approach for Model Independence

Microsoft Copilot: Uses OpenAI models but provides model abstraction. Your prompts and configurations are model-agnostic. If Microsoft switches models, your setup persists.

SAP Joule: Multi-model from day one. SAP supports OpenAI, Google Gemini, Anthropic, Mistral, and custom models. Model choice is configurable, not locked.

Open-Source Models: For maximum control, deploy open-source models (Llama, Mistral) on your own infrastructure. Higher cost, but zero vendor lock-in.

### What to Do Now
1. Review your Salesforce contract for model change provisions
2. Assess Anthropic data residency and retention policies
3. Ensure DPAs cover both Salesforce and Anthropic
4. Evaluate multi-model platforms for future AI investments

### Evidence
Our ASCS framework evaluates Deployment Flexibility (Dimension 10, 5% weight). Salesforce scores 6.8 out of 10, penalized for model lock-in risk. SAP Joule scores 8.2 out of 10 for multi-model flexibility.`,
    findings: [
      "Claudeforce introduces model lock-in risk, Salesforce can change model partners",
      "Customer data flows through Anthropic infrastructure, requires compliance review",
      "Salesforce supports multiple models but defaults to Claude",
      "Microsoft Copilot and SAP Joule offer better model independence",
      "Review contracts for model change provisions before committing"
    ],
    sources: [
      { title: "ASCS Framework: Deployment Flexibility", url: "/about/methodology" },
      { title: "Salesforce-Anthropic Partnership Analysis", url: "https://finance.yahoo.com/sectors/technology/articles/salesforce-ceo-delivers-blunt-message-220700369.html" }
    ],
    relatedVendors: ["salesforce", "microsoft-copilot", "sap-joule"],
    relatedArticles: ["/compare/erp-ai-vs-crm-copilots"]
  },
  {
    id: "q9",
    slug: "microsoft-365-copilot-pricing-increase-enterprise-budget",
    title: "Microsoft is raising M365 prices to fund Copilot: how should enterprises respond?",
    question: "Reviews CXO analysis examines the implications of M365 price increases (effective July 2026, citing Copilot integration costs) on enterprise software budgets. For a 5,000-person organization facing a $3/user/month increase on E5 licenses, the financial impact is substantial even before deployment. Our assessment evaluates whether Copilot's capabilities justify these increases and explores strategic alternatives for enterprise procurement.",
    author: "Reviews CXO Research",
    source: "Reviews CXO",
    sourceUrl: "/about/methodology",
    publishedAt: "2026-08-05",
    excerpt: "Enterprises face M365 price increases tied to Copilot integration, questioning whether to absorb the cost, negotiate, or evaluate alternatives.",
    category: "Pricing & TCO",
    tags: ["Microsoft", "M365 Copilot", "pricing", "enterprise budget", "license management"],
    status: "published",
    answer: `Microsoft pricing strategy is designed to force Copilot adoption. Enterprises have several response options.

## Key Findings

### The Pricing Reality
Microsoft is bundling Copilot into M365 E3 and E5, making it non-optional. The $3/user/month increase is effectively a Copilot tax. For enterprises not ready for AI, this is a forced upgrade.

### Your Options

Option 1: Absorb and Deploy. Accept the price increase and deploy Copilot. At 5,000 users, the $180K/year investment should yield productivity gains if adoption is high. Average Copilot users report 30 to 60 minutes per day saved on email and meeting tasks.

Option 2: Negotiate Volume Discount. Microsoft offers committed-use discounts for 3-year agreements. Negotiate 20 to 30% off the Copilot component in exchange for a longer commitment.

Option 3: Downgrade to E3. If you are on E5 primarily for security features, evaluate whether E3 plus standalone security tools is cheaper. But you lose Copilot access.

Option 4: Evaluate Alternatives.
- Google Workspace: Gemini AI included at no extra cost. Weaker enterprise features but significantly cheaper.
- Salesforce: If your primary need is CRM AI, Salesforce Einstein is separately priced and does not require M365.
- SAP Joule: For ERP-focused AI, Joule is included with S/4HANA licenses. No additional Copilot cost.

### Recommended Approach
1. Calculate Copilot ROI: hours saved multiplied by average hourly cost multiplied by adoption rate
2. Negotiate volume discount before the July deadline
3. Deploy Copilot to power users first (20% of org equals 80% of value)
4. Track adoption metrics monthly, if adoption is below 50% in 6 months, reassess

### Evidence
Our ASCS framework evaluates Economics (Dimension 11, 5% weight). Microsoft Copilot scores 7.8 out of 10 on value-for-money when deployed at scale (5,000+ users). Below 1,000 users, the score drops to 6.2 out of 10.`,
    findings: [
      "Microsoft M365 price increase is effectively a forced Copilot adoption tax",
      "Volume discounts are available for 3-year committed agreements",
      "Copilot ROI depends on adoption rate, track monthly",
      "Google Workspace offers AI at no extra cost but weaker enterprise features",
      "SAP Joule is included with S/4HANA, no separate AI licensing"
    ],
    sources: [
      { title: "ASCS Framework: Economics Dimension", url: "/about/methodology" },
      { title: "Microsoft Copilot Pricing Analysis", url: "https://www.computerworld.com/uk/office-365" }
    ],
    relatedVendors: ["microsoft-copilot", "salesforce-einstein", "sap-joule"],
    relatedArticles: ["/compare/erp-ai-vs-crm-copilots"]
  },
  {
    id: "q10",
    slug: "salesforce-vs-microsoft-vs-sap-ai-strategy-comparison",
    title: "Salesforce vs Microsoft vs SAP: which AI strategy is actually built for the enterprise?",
    question: "We are a $2B manufacturing company evaluating our long-term AI strategy. We use Salesforce CRM, Microsoft 365, and SAP ERP. All three vendors are pushing AI: Salesforce with Agentforce, Microsoft with Copilot, SAP with Joule. Our board wants a unified AI strategy, not three competing point solutions. Which vendor AI approach is most architecturally sound for a manufacturing enterprise?",
    author: "Reviews CXO Research",
    source: "Reviews CXO",
    sourceUrl: "/about/methodology",
    publishedAt: "2026-08-01",
    excerpt: "Which vendor AI strategy, Salesforce, Microsoft, or SAP, is most architecturally sound for a manufacturing enterprise using all three platforms.",
    category: "AI Strategy",
    tags: ["Salesforce", "Microsoft", "SAP", "enterprise AI strategy", "manufacturing", "architecture"],
    status: "published",
    answer: `No single vendor provides a complete AI strategy for manufacturing. The answer is architectural integration, not vendor selection.

## Key Findings

### Each Vendor AI Strength

Salesforce (Agentforce and Einstein): Strongest on customer-facing AI. Lead scoring, opportunity management, and customer service. Weakest on ERP-grounded intelligence.

Microsoft (Copilot): Strongest on productivity AI. Email, meetings, documents, and collaboration. Middle ground on CRM and ERP AI.

SAP (Joule): Strongest on operational AI. Supply chain, finance, manufacturing, and procurement. Weakest on customer-facing AI.

### The Manufacturing Reality
Manufacturing enterprises need AI across three layers:
1. Customer Layer (Salesforce): Lead scoring, deal intelligence, customer service
2. Productivity Layer (Microsoft): Email, meetings, documents, collaboration
3. Operations Layer (SAP): Supply chain, inventory, production, finance

### Recommended Architecture: AI Orchestration Layer

Instead of choosing one vendor, build an AI orchestration layer that connects all three:

1. Salesforce Einstein for CRM AI (lead scoring, deal insights)
2. Microsoft Copilot for productivity AI (email, meetings, documents)
3. SAP Joule for operational AI (supply chain, inventory, production)
4. Integration middleware (MuleSoft, Azure Integration Services, or SAP BTP) to connect AI outputs across platforms

### The Cross-System Reasoning Gap
None of these vendors excels at cross-system reasoning, the ability to combine CRM, productivity, and ERP data in a single AI decision. This is the biggest architectural gap in enterprise AI today.

Salezx: Purpose-built for cross-system reasoning across CRM and ERP. If manufacturing teams need AI that combines customer data with inventory and pricing, Salezx addresses this gap. ASCS score: 8.6 out of 10 on Cross-System Reasoning.

### Evidence
Our ASCS framework scores Cross-System Reasoning (Dimension 3) at 12% weight, the highest-weighted dimension. Salesforce scores 6.2 out of 10, Microsoft 5.8 out of 10, SAP 7.5 out of 10. No vendor exceeds 8 out of 10 on this critical dimension.`,
    findings: [
      "No single vendor provides complete AI for manufacturing enterprises",
      "Salesforce excels at customer AI, Microsoft at productivity AI, SAP at operational AI",
      "Cross-system reasoning is the biggest architectural gap in enterprise AI",
      "AI orchestration layer connecting all three vendors is the recommended approach",
      "Salezx addresses cross-system reasoning between CRM and ERP"
    ],
    sources: [
      { title: "ASCS Framework: Cross-System Reasoning", url: "/about/methodology" },
      { title: "Enterprise AI Architecture Patterns", url: "/compare/enterprise-ai-architecture-patterns" }
    ],
    relatedVendors: ["salesforce", "microsoft-dynamics-365", "sap-joule", "salezx"],
    relatedArticles: ["/compare/erp-ai-vs-crm-copilots", "/compare/enterprise-ai-architecture-patterns"]
  }
];

export const QUESTION_CATEGORIES = [
  "AI Strategy",
  "AI Platforms",
  "AI Comparison",
  "AI Governance",
  "Implementation",
  "Pricing & TCO",
  "Data & Pricing",
  "ERP AI",
  "Security & Trust",
  "Vendor Management",
];

export function getAllQuestions(): Question[] {
  return QUESTIONS;
}

export function getPublishedQuestions(): Question[] {
  return QUESTIONS.filter((q) => q.status === "published");
}

export function getQuestionBySlug(slug: string): Question | undefined {
  return QUESTIONS.find((q) => q.slug === slug);
}

export function getQuestionsByCategory(category: string): Question[] {
  return QUESTIONS.filter((q) => q.category === category && q.status === "published");
}

export function getQuestionsByVendor(vendorSlug: string): Question[] {
  return QUESTIONS.filter(
    (q) => q.relatedVendors?.includes(vendorSlug) && q.status === "published"
  );
}
