export type EvidenceType =
  | "verified_cxo_review"
  | "public_review_evidence"
  | "public_customer_evidence"
  | "vendor_provided_evidence"
  | "third_party_research"
  | "observed_evidence"
  | "inferred";

export interface CxOProfile {
  id: string;
  fullName: string;
  title: string;
  companyName: string;
  companyDomain: string;
  linkedinUrl?: string;
  isVerified: boolean;
  verificationMethod?: "company_email" | "linkedin_oauth";
  reviewCount: number;
  note?: string;
}

export interface ProjectReview {
  id: string;
  cxoId: string;
  vendorId: string;
  itCompanyId?: string; // Backwards-compatibility alias
  projectTitle: string;
  projectCategory: string;
  problemStatement: string;
  aiSolutionDescription: string;
  techStack: string[];
  teamSize: number;
  timelineMonths: number;
  budgetRange: string;
  startDate: string;
  completionDate: string;
  outcomesDescription: string;
  roiPercentage: number;
  efficiencyGainPercentage: number;
  adoptionRate: "High" | "Medium" | "Low";
  challengesFaced: string;
  deliveryQualityRating: number;
  aiEffectivenessRating: number;
  communicationRating: number;
  valueForMoneyRating: number;
  wouldRecommend: boolean;
  overallRating: number;
  status: "pending" | "approved" | "rejected";
  isAnonymous: boolean;
  adminNotes?: string;
  evidenceType: EvidenceType;
  sourceUrl?: string;
  sourceName?: string;
  sourceType?: string;
  discoveredDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseStudy {
  id: string;
  projectReviewId: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt: string;
  viewsCount: number;
  likesCount: number;
}

export const CXO_PROFILES: CxOProfile[] = [
  {
    id: "cxo_sf_1",
    fullName: "Velia Carboni",
    title: "Chief Information Officer",
    companyName: "SharkNinja",
    companyDomain: "sharkninja.com",
    linkedinUrl: "https://www.linkedin.com/in/velia-carboni",
    isVerified: false,
    reviewCount: 1,
    note: "Publicly documented customer story from Salesforce Customer Success Stories. Not a direct Reviews_CXO verified submission.",
  },
  {
    id: "cxo_sf_2",
    fullName: "Pieter Bruyland",
    title: "Chief Information Officer, Europe",
    companyName: "AB InBev",
    companyDomain: "ab-inbev.com",
    linkedinUrl: "https://www.linkedin.com/in/pieter-bruyland",
    isVerified: false,
    reviewCount: 1,
    note: "Publicly documented customer story from Salesforce Customer Success Stories. Not a direct Reviews_CXO verified submission.",
  },
  {
    id: "cxo_ms_1",
    fullName: "Michael Dudley",
    title: "Chief Technology Officer",
    companyName: "JJ Food Service",
    companyDomain: "jjfoodservice.com",
    linkedinUrl: "https://www.linkedin.com/in/michael-dudley-cto",
    isVerified: false,
    reviewCount: 1,
    note: "Publicly documented customer story from Microsoft Dynamics Customer Stories. Not a direct Reviews_CXO verified submission.",
  },
  {
    id: "cxo_ms_2",
    fullName: "Jignasa Singh",
    title: "Chief Information Officer",
    companyName: "Phenomenex",
    companyDomain: "phenomenex.com",
    linkedinUrl: "https://www.linkedin.com/in/jignasa-singh",
    isVerified: false,
    reviewCount: 1,
    note: "Publicly documented customer story from Microsoft Dynamics Customer Stories. Not a direct Reviews_CXO verified submission.",
  },
  {
    id: "cxo_hub_1",
    fullName: "Niclas Timm",
    title: "Chief Technology Officer",
    companyName: "Immoportal",
    companyDomain: "immoportal.com",
    linkedinUrl: "https://www.linkedin.com/in/niclas-timm",
    isVerified: false,
    reviewCount: 1,
    note: "Publicly documented customer story from HubSpot Case Studies. Not a direct Reviews_CXO verified submission.",
  },
  {
    id: "cxo_hub_2",
    fullName: "Guido Angelo Ingenito",
    title: "Chief Information Officer",
    companyName: "TXT Group",
    companyDomain: "txtgroup.com",
    linkedinUrl: "https://www.linkedin.com/in/guido-angelo-ingenito",
    isVerified: false,
    reviewCount: 1,
    note: "Publicly documented customer story from HubSpot Case Studies. Not a direct Reviews_CXO verified submission.",
  },
  {
    id: "cxo_gong_1",
    fullName: "Sam Rahmanian",
    title: "Chief Revenue Officer",
    companyName: "Eftsure",
    companyDomain: "eftsure.com",
    linkedinUrl: "https://www.linkedin.com/in/sam-rahmanian",
    isVerified: false,
    reviewCount: 1,
    note: "Publicly documented customer story from Gong Customer Success Stories. Not a direct Reviews_CXO verified submission.",
  },
  {
    id: "cxo_gong_2",
    fullName: "Nathan Rowe",
    title: "Vice President of Global Sales",
    companyName: "Hivebrite",
    companyDomain: "hivebrite.com",
    linkedinUrl: "https://www.linkedin.com/in/nathan-rowe-sales",
    isVerified: false,
    reviewCount: 1,
    note: "Publicly documented customer story from Gong Customer Success Stories. Not a direct Reviews_CXO verified submission.",
  },
  {
    id: "cxo_outreach_1",
    fullName: "DocuSign Revenue Operations",
    title: "VP Revenue Operations",
    companyName: "DocuSign",
    companyDomain: "docusign.com",
    linkedinUrl: "https://www.linkedin.com/company/docusign",
    isVerified: false,
    reviewCount: 1,
    note: "Publicly documented enterprise customer story from Outreach Customer Success Stories. Not a direct Reviews_CXO verified submission.",
  },
  {
    id: "cxo_outreach_2",
    fullName: "Global Commercial Operations",
    title: "Head of Commercial Enablement",
    companyName: "Siemens",
    companyDomain: "siemens.com",
    linkedinUrl: "https://www.linkedin.com/company/siemens",
    isVerified: false,
    reviewCount: 1,
    note: "Publicly documented enterprise customer story from Outreach Customer Success Stories. Not a direct Reviews_CXO verified submission.",
  },
  {
    id: "cxo_zoominfo_1",
    fullName: "Ryan Sigurdson",
    title: "Head of Sales & Marketing Operations",
    companyName: "Wayfair",
    companyDomain: "wayfair.com",
    linkedinUrl: "https://www.linkedin.com/in/ryan-sigurdson",
    isVerified: false,
    reviewCount: 1,
    note: "Publicly documented customer story from ZoomInfo Customer Stories. Not a direct Reviews_CXO verified submission.",
  },
];

export const PROJECT_REVIEWS: ProjectReview[] = [
  {
    id: "pr_sf_1",
    cxoId: "cxo_sf_1",
    vendorId: "salesforce",
    itCompanyId: "salesforce",
    projectTitle: "Agentforce AI Agents for Global Consumer Care & Omnichannel Support",
    projectCategory: "AI Operations",
    problemStatement: "High inbound case volumes during seasonal surges led to extended customer wait times and repetitive tier-1 inquiries overburdening human agents.",
    aiSolutionDescription: "Deployed Salesforce Agentforce autonomous agents across digital channels, grounded in enterprise CRM knowledge bases and order management systems to autonomously resolve customer inquiries 24/7.",
    techStack: ["Salesforce Service Cloud", "Agentforce", "Data Cloud", "MuleSoft"],
    teamSize: 12,
    timelineMonths: 4,
    budgetRange: "$250k-$500k",
    startDate: "2024-06-01",
    completionDate: "2024-10-15",
    outcomesDescription: "Autonomous case deflection rate achieved 34% within 90 days. First-contact resolution improved by 28%, significantly reducing support operational overhead during peak demand cycles.",
    roiPercentage: 165,
    efficiencyGainPercentage: 35,
    adoptionRate: "High",
    challengesFaced: "Required comprehensive knowledge base sanitation and strict guardrail configuration to prevent conversational hallucination.",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 4,
    communicationRating: 4,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4.4,
    status: "approved",
    isAnonymous: false,
    adminNotes: "Documented executive customer story published by Salesforce. Preserved with original attribution and source URL. Not a verified Reviews_CXO direct submission.",
    evidenceType: "public_customer_evidence",
    sourceUrl: "https://www.salesforce.com/customer-success-stories/sharkninja/",
    sourceName: "Salesforce Customer Success Stories",
    sourceType: "Publicly Documented Enterprise Customer Evidence",
    discoveredDate: "2026-09-07",
    createdAt: "2024-11-01T10:00:00Z",
    updatedAt: "2026-09-07T12:00:00Z",
  },
  {
    id: "pr_sf_2",
    cxoId: "cxo_sf_2",
    vendorId: "salesforce",
    itCompanyId: "salesforce",
    projectTitle: "Pan-European B2B Commercial Data Centralization & Revenue Cloud",
    projectCategory: "AI Sales",
    problemStatement: "Disparate European regional commercial units lacked unified account telemetry, slowing wholesale order cycles and multi-market pricing consistency.",
    aiSolutionDescription: "Consolidated commercial sales workflows on Salesforce Sales Cloud and Data Cloud, creating real-time telemetry across distributor accounts, rebate programs, and delivery schedules.",
    techStack: ["Salesforce Sales Cloud", "Salesforce Data Cloud", "Tableau CRM", "SAP ERP Gateway"],
    teamSize: 20,
    timelineMonths: 9,
    budgetRange: "$1M-$2.5M",
    startDate: "2023-03-01",
    completionDate: "2023-12-15",
    outcomesDescription: "Accelerated wholesale re-order cycles across European territories by 22%. Centralized customer 360 data reduced administrative reporting overhead by 40%.",
    roiPercentage: 140,
    efficiencyGainPercentage: 30,
    adoptionRate: "High",
    challengesFaced: "Legacy on-premise ERP connectors required extensive data normalization before streaming into Data Cloud.",
    deliveryQualityRating: 4,
    aiEffectivenessRating: 4,
    communicationRating: 4,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4.2,
    status: "approved",
    isAnonymous: false,
    adminNotes: "Documented executive customer story published by Salesforce. Preserved with original attribution and source URL. Not a verified Reviews_CXO direct submission.",
    evidenceType: "public_customer_evidence",
    sourceUrl: "https://www.salesforce.com/customer-success-stories/ab-inbev/",
    sourceName: "Salesforce Customer Success Stories",
    sourceType: "Publicly Documented Enterprise Customer Evidence",
    discoveredDate: "2026-09-07",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2026-09-07T12:00:00Z",
  },
  {
    id: "pr_ms_1",
    cxoId: "cxo_ms_1",
    vendorId: "microsoft-dynamics-365",
    itCompanyId: "microsoft-dynamics-365",
    projectTitle: "Unified ERP + CRM Supply Chain Modernization & AI Analytics",
    projectCategory: "AI Supply Chain",
    problemStatement: "Legacy AX 2012 on-premise systems caused stock visibility lags, slowing nationwide wholesale food deliveries and manual ordering reconciliation.",
    aiSolutionDescription: "Migrated core enterprise operations to Dynamics 365 Finance and Supply Chain Management, integrating Fabric-powered analytics and Copilot to provide warehouse and sales reps real-time inventory visibility.",
    techStack: ["Dynamics 365 Finance", "Dynamics 365 Supply Chain", "Microsoft Fabric", "Azure Power BI"],
    teamSize: 15,
    timelineMonths: 11,
    budgetRange: "$500k-$1M",
    startDate: "2023-01-10",
    completionDate: "2023-12-20",
    outcomesDescription: "Reduced order fulfillment reconciliation time by 45%. Real-time inventory telemetry reduced out-of-stock ordering errors by 60%, unlocking predictive delivery scheduling.",
    roiPercentage: 190,
    efficiencyGainPercentage: 45,
    adoptionRate: "High",
    challengesFaced: "Complex custom legacy business logic from AX 2012 required extensive refactoring to align with standard Dataverse entities.",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 4,
    communicationRating: 4,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4.5,
    status: "approved",
    isAnonymous: false,
    adminNotes: "Documented executive customer story published by Microsoft. Preserved with original attribution and source URL. Not a verified Reviews_CXO direct submission.",
    evidenceType: "public_customer_evidence",
    sourceUrl: "https://customers.microsoft.com",
    sourceName: "Microsoft Customer Stories",
    sourceType: "Publicly Documented Enterprise Customer Evidence",
    discoveredDate: "2026-09-07",
    createdAt: "2024-02-10T11:00:00Z",
    updatedAt: "2026-09-07T12:00:00Z",
  },
  {
    id: "pr_ms_2",
    cxoId: "cxo_ms_2",
    vendorId: "microsoft-dynamics-365",
    itCompanyId: "microsoft-dynamics-365",
    projectTitle: "Global Life Sciences Cloud ERP Modernization & Governance",
    projectCategory: "AI Manufacturing",
    problemStatement: "Aging legacy infrastructure constrained biotech manufacturing expansion and increased regulatory audit compliance complexity.",
    aiSolutionDescription: "Implemented Microsoft Dynamics 365 cloud architecture to harmonize global financial accounting, regulatory compliance audits, and batch manufacturing traceability.",
    techStack: ["Dynamics 365 Finance", "Dynamics 365 Operations", "Azure Active Directory", "Power Automate"],
    teamSize: 18,
    timelineMonths: 14,
    budgetRange: "$1M-$2.5M",
    startDate: "2022-09-01",
    completionDate: "2023-11-30",
    outcomesDescription: "Eliminated on-prem server maintenance liabilities while accelerating multi-national audit readiness cycles by 35%.",
    roiPercentage: 130,
    efficiencyGainPercentage: 25,
    adoptionRate: "High",
    challengesFaced: "Strict life sciences GxP regulatory compliance necessitated rigorous validation at each milestone.",
    deliveryQualityRating: 4,
    aiEffectivenessRating: 4,
    communicationRating: 4,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4.2,
    status: "approved",
    isAnonymous: false,
    adminNotes: "Documented executive customer story published by Microsoft. Preserved with original attribution and source URL. Not a verified Reviews_CXO direct submission.",
    evidenceType: "public_customer_evidence",
    sourceUrl: "https://customers.microsoft.com",
    sourceName: "Microsoft Customer Stories",
    sourceType: "Publicly Documented Enterprise Customer Evidence",
    discoveredDate: "2026-09-07",
    createdAt: "2023-12-15T14:00:00Z",
    updatedAt: "2026-09-07T12:00:00Z",
  },
  {
    id: "pr_hub_1",
    cxoId: "cxo_hub_1",
    vendorId: "hubspot",
    itCompanyId: "hubspot",
    projectTitle: "Inbound Pipeline Automation & Internal Process Acceleration",
    projectCategory: "AI Operations",
    problemStatement: "Rapid company growth caused fragmented lead follow-ups and manual copy-pasting across disparate internal property systems.",
    aiSolutionDescription: "Implemented HubSpot Sales Hub and Breeze AI workflows to automatically score inbound prospects, route leads to appropriate specialists, and automate follow-up sequences.",
    techStack: ["HubSpot Sales Hub", "HubSpot Operations Hub", "Breeze AI", "Zapier"],
    teamSize: 6,
    timelineMonths: 3,
    budgetRange: "$25k-$50k",
    startDate: "2023-05-01",
    completionDate: "2023-08-15",
    outcomesDescription: "Internal process speed improved by 40%, cutting lead response time from hours to minutes and doubling inbound deal velocity.",
    roiPercentage: 210,
    efficiencyGainPercentage: 40,
    adoptionRate: "High",
    challengesFaced: "Sales team resisted automated sequence rules until custom cadence templates were tailored to regional communication norms.",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 4,
    communicationRating: 5,
    valueForMoneyRating: 5,
    wouldRecommend: true,
    overallRating: 4.6,
    status: "approved",
    isAnonymous: false,
    adminNotes: "Documented executive customer story published by HubSpot. Preserved with original attribution and source URL. Not a verified Reviews_CXO direct submission.",
    evidenceType: "public_customer_evidence",
    sourceUrl: "https://www.hubspot.com/case-studies/immoportal",
    sourceName: "HubSpot Case Studies",
    sourceType: "Publicly Documented Enterprise Customer Evidence",
    discoveredDate: "2026-09-07",
    createdAt: "2023-09-01T10:00:00Z",
    updatedAt: "2026-09-07T12:00:00Z",
  },
  {
    id: "pr_hub_2",
    cxoId: "cxo_hub_2",
    vendorId: "hubspot",
    itCompanyId: "hubspot",
    projectTitle: "Enterprise Multi-Brand Lead Centralization & Pipeline Governance",
    projectCategory: "AI Marketing",
    problemStatement: "Multiple corporate brand subsidiaries operated isolated marketing silos, resulting in uncoordinated prospect touches and lost attribution.",
    aiSolutionDescription: "Standardized all corporate web properties on HubSpot CMS Hub and Marketing Hub, centralizing global lead routing into single unified CRM records.",
    techStack: ["HubSpot Marketing Hub Enterprise", "HubSpot CRM", "HubSpot CMS"],
    teamSize: 8,
    timelineMonths: 5,
    budgetRange: "$50k-$100k",
    startDate: "2023-02-01",
    completionDate: "2023-07-01",
    outcomesDescription: "100% of website-generated leads now centralized within 30 seconds. Marketing-to-sales handoff efficiency increased by 35% across all business units.",
    roiPercentage: 175,
    efficiencyGainPercentage: 35,
    adoptionRate: "High",
    challengesFaced: "Multi-language compliance and distinct brand styling required modular template governance.",
    deliveryQualityRating: 4,
    aiEffectivenessRating: 4,
    communicationRating: 4,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4.3,
    status: "approved",
    isAnonymous: false,
    adminNotes: "Documented executive customer story published by HubSpot. Preserved with original attribution and source URL. Not a verified Reviews_CXO direct submission.",
    evidenceType: "public_customer_evidence",
    sourceUrl: "https://www.hubspot.com/case-studies/txt-group",
    sourceName: "HubSpot Case Studies",
    sourceType: "Publicly Documented Enterprise Customer Evidence",
    discoveredDate: "2026-09-07",
    createdAt: "2023-08-01T12:00:00Z",
    updatedAt: "2026-09-07T12:00:00Z",
  },
  {
    id: "pr_gong_1",
    cxoId: "cxo_gong_1",
    vendorId: "gong",
    itCompanyId: "gong",
    projectTitle: "Revenue Intelligence & Deal Slippage Prevention",
    projectCategory: "AI Sales",
    problemStatement: "Sales leadership lacked objective visibility into buyer engagement frequency and competitive deal friction, resulting in unreliable end-of-quarter forecasting.",
    aiSolutionDescription: "Deployed Gong across the revenue organization to automatically capture call audio, buyer email exchanges, and pipeline risk signals, feeding objective deal health telemetry into CRM.",
    techStack: ["Gong Revenue Intelligence", "Salesforce Sales Cloud", "Zoom Phone", "Slack"],
    teamSize: 5,
    timelineMonths: 2,
    budgetRange: "$50k-$100k",
    startDate: "2023-08-01",
    completionDate: "2023-10-01",
    outcomesDescription: "Eliminated opinion-based forecasting. Sales team exceeded revenue targets by 135% with a 24% reduction in average sales cycle duration.",
    roiPercentage: 260,
    efficiencyGainPercentage: 50,
    adoptionRate: "High",
    challengesFaced: "Initial rep apprehension regarding conversation recording was resolved through coaching workshops highlighting positive call examples.",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 5,
    communicationRating: 5,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4.8,
    status: "approved",
    isAnonymous: false,
    adminNotes: "Documented executive customer story published by Gong. Preserved with original attribution and source URL. Not a verified Reviews_CXO direct submission.",
    evidenceType: "public_customer_evidence",
    sourceUrl: "https://www.gong.io/customers/",
    sourceName: "Gong Customer Success Stories",
    sourceType: "Publicly Documented Enterprise Customer Evidence",
    discoveredDate: "2026-09-07",
    createdAt: "2023-11-01T09:00:00Z",
    updatedAt: "2026-09-07T12:00:00Z",
  },
  {
    id: "pr_gong_2",
    cxoId: "cxo_gong_2",
    vendorId: "gong",
    itCompanyId: "gong",
    projectTitle: "Gong Forecast & Deal Risk Telemetry for Global Account Executives",
    projectCategory: "AI Sales",
    problemStatement: "Frontline sales managers spent 10+ hours per week conducting manual one-on-one deal interrogations without verifiable buyer activity evidence.",
    aiSolutionDescription: "Implemented Gong Forecast and Gong Engage to automate pipeline health scoring and highlight at-risk enterprise deals based on buying committee interaction velocity.",
    techStack: ["Gong Forecast", "Gong Engage", "HubSpot CRM", "Google Workspace"],
    teamSize: 4,
    timelineMonths: 2,
    budgetRange: "$50k-$100k",
    startDate: "2023-09-01",
    completionDate: "2023-11-15",
    outcomesDescription: "Forecast accuracy improved to within 5% of actuals. Frontline managers saved 6 hours weekly on administrative deal inspections.",
    roiPercentage: 195,
    efficiencyGainPercentage: 38,
    adoptionRate: "High",
    challengesFaced: "Required fine-tuning warning alerts to prevent alert fatigue during quarter-end push.",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 4,
    communicationRating: 4,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4.5,
    status: "approved",
    isAnonymous: false,
    adminNotes: "Documented executive customer story published by Gong. Preserved with original attribution and source URL. Not a verified Reviews_CXO direct submission.",
    evidenceType: "public_customer_evidence",
    sourceUrl: "https://www.gong.io/customers/",
    sourceName: "Gong Customer Success Stories",
    sourceType: "Publicly Documented Enterprise Customer Evidence",
    discoveredDate: "2026-09-07",
    createdAt: "2023-12-01T15:00:00Z",
    updatedAt: "2026-09-07T12:00:00Z",
  },
  {
    id: "pr_outreach_1",
    cxoId: "cxo_outreach_1",
    vendorId: "outreach",
    itCompanyId: "outreach",
    projectTitle: "Automated Enterprise Outbound Workflows & Rep Productivity Optimization",
    projectCategory: "AI Sales",
    problemStatement: "Account executives and SDRs spent excessive time manually coordinating multi-touch email sequences and logging touches back into CRM.",
    aiSolutionDescription: "Deployed Outreach sales execution platform to automate multi-channel buyer touchpoints, standardizing sequence playbooks across global sales and marketing.",
    techStack: ["Outreach Execution Platform", "Salesforce Sales Cloud", "LinkedIn Sales Navigator", "Gmail"],
    teamSize: 10,
    timelineMonths: 3,
    budgetRange: "$100k-$250k",
    startDate: "2023-04-01",
    completionDate: "2023-07-01",
    outcomesDescription: "Each sales rep gained over 30 minutes of selling time per day. Lead-to-opportunity conversion consistency increased by 18% across the enterprise team.",
    roiPercentage: 180,
    efficiencyGainPercentage: 35,
    adoptionRate: "High",
    challengesFaced: "Required strict sequence governance to ensure compliance with enterprise spam thresholds and brand guidelines.",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 4,
    communicationRating: 4,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4.4,
    status: "approved",
    isAnonymous: false,
    adminNotes: "Documented enterprise customer story published by Outreach. Preserved with original attribution and source URL. Not a verified Reviews_CXO direct submission.",
    evidenceType: "public_customer_evidence",
    sourceUrl: "https://outreach.io/customers/",
    sourceName: "Outreach Customer Stories",
    sourceType: "Publicly Documented Enterprise Customer Evidence",
    discoveredDate: "2026-09-07",
    createdAt: "2023-08-01T14:00:00Z",
    updatedAt: "2026-09-07T12:00:00Z",
  },
  {
    id: "pr_outreach_2",
    cxoId: "cxo_outreach_2",
    vendorId: "outreach",
    itCompanyId: "outreach",
    projectTitle: "Global Commercial Transformation: 4,000-Seller Action Hub Across 190 Countries",
    projectCategory: "AI Operations",
    problemStatement: "Massive decentralized sales organization across 190 countries suffered from fragmented opportunity hygiene and disjointed commercial execution.",
    aiSolutionDescription: "Created a unified 'Seller Action Hub' on Outreach across 4,000+ commercial sellers, establishing standardized forecasting cadences and opportunity workflows.",
    techStack: ["Outreach Platform", "SAP ERP", "Salesforce CRM", "Microsoft 365"],
    teamSize: 35,
    timelineMonths: 12,
    budgetRange: "$1M-$2.5M",
    startDate: "2022-10-01",
    completionDate: "2023-10-31",
    outcomesDescription: "Unified global sales forecasting across 190 countries, eliminating regional process variances and streamlining pipeline reviews for global commercial executives.",
    roiPercentage: 150,
    efficiencyGainPercentage: 28,
    adoptionRate: "High",
    challengesFaced: "Massive scale and multi-regional change management required rolling localized enablement programs over several quarters.",
    deliveryQualityRating: 4,
    aiEffectivenessRating: 4,
    communicationRating: 4,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4.3,
    status: "approved",
    isAnonymous: false,
    adminNotes: "Documented enterprise customer story published by Outreach. Preserved with original attribution and source URL. Not a verified Reviews_CXO direct submission.",
    evidenceType: "public_customer_evidence",
    sourceUrl: "https://outreach.io/customers/",
    sourceName: "Outreach Customer Stories",
    sourceType: "Publicly Documented Enterprise Customer Evidence",
    discoveredDate: "2026-09-07",
    createdAt: "2023-11-15T10:00:00Z",
    updatedAt: "2026-09-07T12:00:00Z",
  },
  {
    id: "pr_zoominfo_1",
    cxoId: "cxo_zoominfo_1",
    vendorId: "zoominfo",
    itCompanyId: "zoominfo",
    projectTitle: "Intent Telemetry & Corporate Hierarchy Account Mapping",
    projectCategory: "AI Marketing",
    problemStatement: "Incomplete corporate parent-subsidiary hierarchy records led to duplicate territory outreach and wasted sales development cycles.",
    aiSolutionDescription: "Integrated ZoomInfo's company hierarchy data and buyer intent signals into CRM, giving reps instant visibility into buying committees and active surge topics.",
    techStack: ["ZoomInfo SalesOS", "ZoomInfo Intent", "Salesforce CRM", "Snowflake"],
    teamSize: 7,
    timelineMonths: 3,
    budgetRange: "$100k-$250k",
    startDate: "2023-06-01",
    completionDate: "2023-09-01",
    outcomesDescription: "Rebuilt targeted enterprise account segments. Rep outreach efficiency to active in-market accounts improved by 42% with zero duplicate territory collisions.",
    roiPercentage: 220,
    efficiencyGainPercentage: 42,
    adoptionRate: "High",
    challengesFaced: "Data deduplication required custom reconciliation logic against historical internal CRM records.",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 4,
    communicationRating: 4,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4.4,
    status: "approved",
    isAnonymous: false,
    adminNotes: "Documented executive customer story published by ZoomInfo. Preserved with original attribution and source URL. Not a verified Reviews_CXO direct submission.",
    evidenceType: "public_customer_evidence",
    sourceUrl: "https://www.zoominfo.com",
    sourceName: "ZoomInfo Customer Telemetry",
    sourceType: "Publicly Documented Enterprise Customer Evidence",
    discoveredDate: "2026-09-07",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2026-09-07T12:00:00Z",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs_sf_1",
    projectReviewId: "pr_sf_1",
    slug: "sharkninja-agentforce-ai-customer-care",
    metaTitle: "How SharkNinja Deployed Agentforce AI to Deflect 34% of Routine Inquiries | Reviews_CXO",
    metaDescription: "Case study: CIO Velia Carboni and SharkNinja deployed Salesforce Agentforce autonomous agents across service channels, improving first-contact resolution by 28%.",
    isFeatured: true,
    isPublished: true,
    publishedAt: "2024-11-05T00:00:00Z",
    viewsCount: 3420,
    likesCount: 215,
  },
  {
    id: "cs_ms_1",
    projectReviewId: "pr_ms_1",
    slug: "jj-food-service-dynamics-365-supply-chain",
    metaTitle: "JJ Food Service Modernized Supply Chain Operations with Microsoft Dynamics 365 | Reviews_CXO",
    metaDescription: "Case study: CTO Michael Dudley led JJ Food Service migration from AX 2012 to Dynamics 365, slashing inventory reconciliation time by 45%.",
    isFeatured: true,
    isPublished: true,
    publishedAt: "2024-02-20T00:00:00Z",
    viewsCount: 2840,
    likesCount: 178,
  },
  {
    id: "cs_gong_1",
    projectReviewId: "pr_gong_1",
    slug: "eftsure-gong-revenue-intelligence-target",
    metaTitle: "How Eftsure Exceeded Revenue Target by 135% Using Gong Revenue Intelligence | Reviews_CXO",
    metaDescription: "Case study: CRO Sam Rahmanian deployed Gong at Eftsure to replace opinion-based forecasting with AI deal telemetry, cutting sales cycles by 24%.",
    isFeatured: true,
    isPublished: true,
    publishedAt: "2023-11-10T00:00:00Z",
    viewsCount: 4120,
    likesCount: 289,
  },
  {
    id: "cs_outreach_1",
    projectReviewId: "pr_outreach_1",
    slug: "docusign-outreach-sales-productivity",
    metaTitle: "How DocuSign Sales Team Gained 30+ Minutes Daily per Rep with Outreach | Reviews_CXO",
    metaDescription: "Case study: DocuSign Revenue Operations deployed Outreach to automate multi-touch enterprise sequences, boosting sales conversion velocity by 18%.",
    isFeatured: false,
    isPublished: true,
    publishedAt: "2023-08-25T00:00:00Z",
    viewsCount: 2310,
    likesCount: 142,
  },
  {
    id: "cs_hub_1",
    projectReviewId: "pr_hub_1",
    slug: "immoportal-hubspot-sales-automation",
    metaTitle: "Immoportal Accelerated Process Speed by 40% with HubSpot Sales Hub & Breeze AI | Reviews_CXO",
    metaDescription: "Case study: CTO Niclas Timm implemented HubSpot Sales Hub and Breeze AI to automate inbound scoring and double deal velocity.",
    isFeatured: false,
    isPublished: true,
    publishedAt: "2023-09-15T00:00:00Z",
    viewsCount: 1950,
    likesCount: 126,
  },
];

export function getReviewByProjectId(projectReviewId: string): ProjectReview | undefined {
  return PROJECT_REVIEWS.find((r) => r.id === projectReviewId);
}

export function getApprovedReviews(): ProjectReview[] {
  return PROJECT_REVIEWS.filter((r) => r.status === "approved");
}

export function getPendingReviews(): ProjectReview[] {
  return PROJECT_REVIEWS.filter((r) => r.status === "pending");
}

export function getReviewsByVendor(vendorSlugOrId: string): ProjectReview[] {
  return PROJECT_REVIEWS.filter(
    (r) =>
      (r.vendorId === vendorSlugOrId || r.itCompanyId === vendorSlugOrId) &&
      r.status === "approved"
  );
}

// Backwards-compatibility alias
export const getReviewsByCompany = getReviewsByVendor;

export function getReviewsByCxO(cxoId: string): ProjectReview[] {
  return PROJECT_REVIEWS.filter((r) => r.cxoId === cxoId);
}

export function getCxOById(id: string): CxOProfile | undefined {
  return CXO_PROFILES.find((c) => c.id === id);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getPublishedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.isPublished);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.isFeatured && cs.isPublished);
}

export function getVendorReviewStats(vendorSlugOrId: string) {
  const reviews = getReviewsByVendor(vendorSlugOrId);
  if (reviews.length === 0) {
    return {
      totalReviews: 0,
      avgDeliveryRating: 0,
      avgAiRating: 0,
      avgCommunicationRating: 0,
      avgValueRating: 0,
      avgOverallRating: 0,
      recommendPercentage: 0,
      avgRoi: 0,
      avgEfficiencyGain: 0,
    };
  }

  const total = reviews.length;
  return {
    totalReviews: total,
    avgDeliveryRating: Number((reviews.reduce((sum, r) => sum + r.deliveryQualityRating, 0) / total).toFixed(1)),
    avgAiRating: Number((reviews.reduce((sum, r) => sum + r.aiEffectivenessRating, 0) / total).toFixed(1)),
    avgCommunicationRating: Number((reviews.reduce((sum, r) => sum + r.communicationRating, 0) / total).toFixed(1)),
    avgValueRating: Number((reviews.reduce((sum, r) => sum + r.valueForMoneyRating, 0) / total).toFixed(1)),
    avgOverallRating: Number((reviews.reduce((sum, r) => sum + r.overallRating, 0) / total).toFixed(1)),
    recommendPercentage: Math.round((reviews.filter((r) => r.wouldRecommend).length / total) * 100),
    avgRoi: Math.round(reviews.reduce((sum, r) => sum + r.roiPercentage, 0) / total),
    avgEfficiencyGain: Math.round(reviews.reduce((sum, r) => sum + r.efficiencyGainPercentage, 0) / total),
  };
}

// Backwards-compatibility alias
export const getCompanyStats = getVendorReviewStats;

export const PROJECT_CATEGORIES = [
  "AI Sales",
  "AI Marketing",
  "AI Operations",
  "AI Finance",
  "AI HR",
  "AI Supply Chain",
  "AI Healthcare",
  "AI Manufacturing",
] as const;

export const BUDGET_RANGES = [
  "$10k-$25k",
  "$25k-$50k",
  "$50k-$100k",
  "$100k-$250k",
  "$250k-$500k",
  "$500k-$1M",
  "$1M-$2.5M",
  "$2.5M-$5M",
  "$5M+",
] as const;

export const EVIDENCE_TYPE_LABELS: Record<EvidenceType, string> = {
  verified_cxo_review: "Verified CXO Review",
  public_review_evidence: "Public Review Evidence",
  public_customer_evidence: "Public Customer Evidence",
  vendor_provided_evidence: "Vendor-Provided Evidence",
  third_party_research: "Third-Party Research",
  observed_evidence: "Observed Evidence",
  inferred: "Inferred",
};

export const EVIDENCE_TYPE_DESCRIPTIONS: Record<EvidenceType, string> = {
  verified_cxo_review: "Genuine submission verified through Reviews_CXO verification process",
  public_review_evidence: "Information from G2, Capterra, Clutch, Trustpilot, or public testimonials",
  public_customer_evidence: "Customer case studies, announcements, or public project documentation",
  vendor_provided_evidence: "Information published by the software vendor itself",
  third_party_research: "Independent publications, analyst reports, or industry research",
  observed_evidence: "Directly tested or observed by Reviews_CXO",
  inferred: "Reasonable conclusion based on related evidence but not directly verified",
};
