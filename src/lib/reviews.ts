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
}

export interface ProjectReview {
  id: string;
  cxoId: string;
  itCompanyId: string;
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
    id: "cxo1",
    fullName: "Priya Sharma",
    title: "CTO",
    companyName: "ManuSoft Solutions",
    companyDomain: "manusoft.com",
    linkedinUrl: "https://linkedin.com/in/priyasharma",
    isVerified: true,
    verificationMethod: "company_email",
    reviewCount: 3,
  },
  {
    id: "cxo2",
    fullName: "Rajesh Kumar",
    title: "VP Engineering",
    companyName: "TradeFlow Industries",
    companyDomain: "tradeflow.com",
    linkedinUrl: "https://linkedin.com/in/rajeshkumar",
    isVerified: true,
    verificationMethod: "company_email",
    reviewCount: 2,
  },
  {
    id: "cxo3",
    fullName: "Anita Desai",
    title: "CIO",
    companyName: "FinServe Capital",
    companyDomain: "finserve.com",
    linkedinUrl: "https://linkedin.com/in/anitadesai",
    isVerified: true,
    verificationMethod: "linkedin_oauth",
    reviewCount: 4,
  },
  {
    id: "cxo4",
    fullName: "Vikram Patel",
    title: "CEO",
    companyName: "RetailMax Group",
    companyDomain: "retailmax.com",
    linkedinUrl: "https://linkedin.com/in/vikrampatel",
    isVerified: true,
    verificationMethod: "company_email",
    reviewCount: 2,
  },
  {
    id: "cxo5",
    fullName: "Sneha Reddy",
    title: "Director of AI",
    companyName: "HealthTech Innovations",
    companyDomain: "healthtech.com",
    linkedinUrl: "https://linkedin.com/in/snehareddy",
    isVerified: true,
    verificationMethod: "company_email",
    reviewCount: 3,
  },
];

export const PROJECT_REVIEWS: ProjectReview[] = [
  {
    id: "pr1",
    cxoId: "cxo1",
    itCompanyId: "it1",
    projectTitle: "AI-Powered Sales Pipeline for Manufacturing Distribution",
    projectCategory: "AI Sales",
    problemStatement: "Our sales team spent 3 hours per day manually checking inventory levels in SAP before making customer calls. Quotes were frequently inaccurate because inventory data was 24-48 hours stale.",
    aiSolutionDescription: "Deployed SalesX's AI CRM with native SAP integration. The system provides real-time inventory visibility directly in the sales interface, automatically enriches customer profiles from ERP data, and generates AI-powered quote recommendations based on current stock and pricing.",
    techStack: ["SAP S/4HANA", "SalesX AI CRM", "REST APIs", "React"],
    teamSize: 4,
    timelineMonths: 2,
    budgetRange: "$50k-$100k",
    startDate: "2026-01-15",
    completionDate: "2026-03-20",
    outcomesDescription: "Sales reps now access real-time inventory during calls. Quote accuracy improved from 72% to 96%. Average deal cycle reduced from 18 days to 11 days. First-quarter revenue increased 23% after deployment.",
    roiPercentage: 180,
    efficiencyGainPercentage: 45,
    adoptionRate: "High",
    challengesFaced: "Initial SAP API rate limiting required custom caching layer. Team needed 2 weeks of training on the new workflow.",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 5,
    communicationRating: 4,
    valueForMoneyRating: 5,
    wouldRecommend: true,
    overallRating: 5,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-04-10T10:00:00Z",
    updatedAt: "2026-04-10T10:00:00Z",
  },
  {
    id: "pr2",
    cxoId: "cxo2",
    itCompanyId: "it2",
    projectTitle: "Enterprise CRM Migration with AI Lead Scoring",
    projectCategory: "AI Sales",
    problemStatement: "Legacy CRM had no AI capabilities. Lead scoring was manual and inconsistent across 500+ sales reps. We needed a unified platform with intelligent lead prioritization.",
    aiSolutionDescription: "TCS implemented a custom Salesforce solution with Einstein AI for lead scoring, opportunity insights, and automated activity tracking. Included data migration from legacy system and custom reporting dashboards.",
    techStack: ["Salesforce", "Einstein AI", "MuleSoft", "Tableau"],
    teamSize: 12,
    timelineMonths: 8,
    budgetRange: "$500k-$1M",
    startDate: "2025-06-01",
    completionDate: "2026-02-28",
    outcomesDescription: "Lead scoring accuracy improved by 35%. Sales pipeline visibility increased across all regions. However, Einstein AI features required significant customization and ongoing admin support.",
    roiPercentage: 45,
    efficiencyGainPercentage: 20,
    adoptionRate: "Medium",
    challengesFaced: "Data migration was more complex than estimated. Einstein AI features needed heavy customization. 3-month delay due to scope changes. Ongoing admin costs higher than projected.",
    deliveryQualityRating: 3,
    aiEffectivenessRating: 3,
    communicationRating: 4,
    valueForMoneyRating: 2,
    wouldRecommend: false,
    overallRating: 3,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-03-15T14:30:00Z",
    updatedAt: "2026-03-15T14:30:00Z",
  },
  {
    id: "pr3",
    cxoId: "cxo3",
    itCompanyId: "it5",
    projectTitle: "AI-Driven Customer Service Automation for Banking",
    projectCategory: "AI Operations",
    problemStatement: "Customer service team handling 10,000+ daily queries. Average response time was 4 hours. Customer satisfaction dropping due to slow resolution and inconsistent answers.",
    aiSolutionDescription: "Accenture deployed a conversational AI platform with NLP for query classification, automated response generation, and intelligent routing to human agents for complex cases. Integrated with existing core banking system.",
    techStack: ["Microsoft Azure", "Custom NLP", "Power BI", "Dynamics 365"],
    teamSize: 18,
    timelineMonths: 10,
    budgetRange: "$1M-$2.5M",
    startDate: "2025-04-01",
    completionDate: "2026-02-15",
    outcomesDescription: "Automated 60% of routine queries. Average response time reduced from 4 hours to 12 minutes. Customer satisfaction improved by 28%. Annual cost savings of $2.1M in support operations.",
    roiPercentage: 120,
    efficiencyGainPercentage: 65,
    adoptionRate: "High",
    challengesFaced: "NLP model required extensive training on domain-specific banking terminology. Integration with legacy core banking system took longer than planned.",
    deliveryQualityRating: 4,
    aiEffectivenessRating: 5,
    communicationRating: 4,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-03-20T09:15:00Z",
    updatedAt: "2026-03-20T09:15:00Z",
  },
  {
    id: "pr4",
    cxoId: "cxo4",
    itCompanyId: "it8",
    projectTitle: "AI-Powered Inventory Optimization for Retail Chain",
    projectCategory: "AI Operations",
    problemStatement: "Overstocking in 40% of SKUs, understocking in 25%. Manual demand forecasting using spreadsheets. Lost sales due to stockouts and excess inventory carrying costs.",
    aiSolutionDescription: "Cognizant built a machine learning demand forecasting system integrated with existing ERP. AI predicts demand at SKU-store level, automates reorder triggers, and optimizes safety stock calculations.",
    techStack: ["Python", "TensorFlow", "AWS SageMaker", "SAP ERP"],
    teamSize: 8,
    timelineMonths: 6,
    budgetRange: "$250k-$500k",
    startDate: "2025-09-01",
    completionDate: "2026-03-01",
    outcomesDescription: "Stockout rate reduced from 12% to 3%. Inventory carrying costs reduced by 18%. Demand forecast accuracy improved from 68% to 89%. ROI achieved within 8 months.",
    roiPercentage: 210,
    efficiencyGainPercentage: 38,
    adoptionRate: "High",
    challengesFaced: "Historical data quality issues required 6 weeks of data cleansing. Store managers needed training on interpreting AI recommendations.",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 5,
    communicationRating: 4,
    valueForMoneyRating: 5,
    wouldRecommend: true,
    overallRating: 5,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-04-05T11:00:00Z",
    updatedAt: "2026-04-05T11:00:00Z",
  },
  {
    id: "pr5",
    cxoId: "cxo5",
    itCompanyId: "it12",
    projectTitle: "AI Clinical Decision Support System",
    projectCategory: "AI Healthcare",
    problemStatement: "Physicians spending 40% of consultation time on documentation. Diagnostic recommendations inconsistent across departments. Need AI assistance without replacing clinical judgment.",
    aiSolutionDescription: "Persistent Systems developed an AI-powered clinical decision support tool that auto-generates clinical notes from voice recordings, suggests differential diagnoses based on symptoms, and flags potential drug interactions.",
    techStack: ["Python", "PyTorch", "Azure ML", "FHIR API", "React"],
    teamSize: 6,
    timelineMonths: 9,
    budgetRange: "$250k-$500k",
    startDate: "2025-05-01",
    completionDate: "2026-02-01",
    outcomesDescription: "Documentation time reduced by 55%. Physician satisfaction with AI suggestions at 78%. Drug interaction alerts caught 23 potential adverse events in first quarter. No replacement of clinical judgment — AI assists only.",
    roiPercentage: 95,
    efficiencyGainPercentage: 55,
    adoptionRate: "Medium",
    challengesFaced: "HIPAA compliance required extensive security reviews. Physicians initially skeptical of AI recommendations. Required careful UX design to maintain physician control.",
    deliveryQualityRating: 4,
    aiEffectivenessRating: 4,
    communicationRating: 5,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-03-25T16:45:00Z",
    updatedAt: "2026-03-25T16:45:00Z",
  },
  {
    id: "pr6",
    cxoId: "cxo1",
    itCompanyId: "it9",
    projectTitle: "Marketing Automation with AI Personalization",
    projectCategory: "AI Marketing",
    problemStatement: "Email campaigns had 12% open rates. Content personalization was manual and based on basic segmentation. Needed AI-driven personalization at scale.",
    aiSolutionDescription: "Capgemini implemented an AI-powered marketing automation platform with predictive content recommendations, dynamic email personalization, and automated campaign optimization based on engagement patterns.",
    techStack: ["Adobe Experience Cloud", "Python", "AWS", "Salesforce Marketing Cloud"],
    teamSize: 7,
    timelineMonths: 5,
    budgetRange: "$100k-$250k",
    startDate: "2025-10-01",
    completionDate: "2026-03-01",
    outcomesDescription: "Email open rates improved from 12% to 31%. Click-through rates doubled. Campaign ROI increased by 85%. Content creation time reduced by 40%.",
    roiPercentage: 150,
    efficiencyGainPercentage: 40,
    adoptionRate: "High",
    challengesFaced: "Integration with existing marketing stack was complex. AI content recommendations needed 4 weeks of training data before becoming accurate.",
    deliveryQualityRating: 4,
    aiEffectivenessRating: 4,
    communicationRating: 5,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-04-08T13:20:00Z",
    updatedAt: "2026-04-08T13:20:00Z",
  },
  {
    id: "pr7",
    cxoId: "cxo3",
    itCompanyId: "it16",
    projectTitle: "AI-Powered Fraud Detection for Digital Payments",
    projectCategory: "AI Finance",
    problemStatement: "Manual fraud review team processing 500+ flagged transactions daily. False positive rate at 45%. Average fraud detection time was 6 hours — too slow for real-time payments.",
    aiSolutionDescription: "Happiest Minds deployed a real-time fraud detection ML model analyzing transaction patterns, user behavior, and device fingerprints. Model scores transactions in <100ms and auto-blocks high-risk ones.",
    techStack: ["Python", "Scikit-learn", "Apache Kafka", "Redis", "AWS"],
    teamSize: 5,
    timelineMonths: 4,
    budgetRange: "$100k-$250k",
    startDate: "2025-11-01",
    completionDate: "2026-03-01",
    outcomesDescription: "False positive rate dropped from 45% to 12%. Fraud detection time reduced from 6 hours to real-time (<100ms). Saved $3.2M in fraudulent transactions in first quarter. Manual review workload reduced by 70%.",
    roiPercentage: 320,
    efficiencyGainPercentage: 70,
    adoptionRate: "High",
    challengesFaced: "Initial model had high false positives on legitimate international transactions. Required 3 months of tuning with local transaction patterns.",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 5,
    communicationRating: 4,
    valueForMoneyRating: 5,
    wouldRecommend: true,
    overallRating: 5,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-04-12T10:30:00Z",
    updatedAt: "2026-04-12T10:30:00Z",
  },
  {
    id: "pr8",
    cxoId: "cxo2",
    itCompanyId: "it1",
    projectTitle: "AI Lead Scoring for B2B Outbound Sales",
    projectCategory: "AI Sales",
    problemStatement: "B2B sales team spending 60% of time on unqualified leads. No systematic way to prioritize prospects based on intent signals and fit scoring.",
    aiSolutionDescription: "SalesX implemented AI lead scoring using firmographic data, engagement signals, and ERP purchase history. System automatically scores and routes leads to appropriate sales reps based on conversion probability.",
    techStack: ["SalesX AI CRM", "Apollo.io API", "Python", "PostgreSQL"],
    teamSize: 3,
    timelineMonths: 1,
    budgetRange: "$25k-$50k",
    startDate: "2026-02-01",
    completionDate: "2026-03-01",
    outcomesDescription: "Lead qualification time reduced by 60%. Sales reps now focus on top 20% of leads instead of filtering through all. Conversion rate improved from 8% to 19%. Pipeline quality significantly improved.",
    roiPercentage: 280,
    efficiencyGainPercentage: 60,
    adoptionRate: "High",
    challengesFaced: "Required clean historical data for model training. Initial scoring needed manual calibration for first 3 weeks.",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 5,
    communicationRating: 5,
    valueForMoneyRating: 5,
    wouldRecommend: true,
    overallRating: 5,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-04-15T08:00:00Z",
    updatedAt: "2026-04-15T08:00:00Z",
  },
  {
    id: "pr9",
    cxoId: "cxo4",
    itCompanyId: "it3",
    projectTitle: "AI-Powered Supply Chain Visibility Platform",
    projectCategory: "AI Supply Chain",
    problemStatement: "Supply chain visibility across 15 countries was fragmented. Suppliers updating status via email. No real-time tracking of shipments or predictive delay analysis.",
    aiSolutionDescription: "Infosys built a unified supply chain platform with AI-powered delay prediction, automated supplier communication, and real-time shipment tracking. ML models predict delays 72 hours in advance.",
    techStack: ["Infosys Cobalt", "Azure IoT", "Power BI", "Custom ML"],
    teamSize: 14,
    timelineMonths: 12,
    budgetRange: "$1M-$2.5M",
    startDate: "2025-03-01",
    completionDate: "2026-03-01",
    outcomesDescription: "Shipment delays predicted 72 hours in advance with 82% accuracy. Supplier response time improved from 48 hours to 4 hours. Annual logistics cost savings of $4.5M. Supply chain visibility across all 15 countries achieved.",
    roiPercentage: 85,
    efficiencyGainPercentage: 35,
    adoptionRate: "Medium",
    challengesFaced: "12-month timeline with 4-month delay due to supplier integration complexity. Multiple API formats across 200+ suppliers required custom adapters.",
    deliveryQualityRating: 3,
    aiEffectivenessRating: 4,
    communicationRating: 3,
    valueForMoneyRating: 3,
    wouldRecommend: false,
    overallRating: 3,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-04-18T14:00:00Z",
    updatedAt: "2026-04-18T14:00:00Z",
  },
  {
    id: "pr10",
    cxoId: "cxo5",
    itCompanyId: "it16",
    projectTitle: "Conversational AI for Patient Engagement",
    projectCategory: "AI Healthcare",
    problemStatement: "Patient appointment no-show rate at 25%. Manual follow-up calls consuming 3 full-time staff. Patients not receiving pre-visit instructions consistently.",
    aiSolutionDescription: "Happiest Minds deployed an AI chatbot for patient engagement — automated appointment reminders, pre-visit instruction delivery, prescription refill requests, and symptom triage before visits.",
    techStack: ["Dialogflow", "Firebase", "WhatsApp Business API", "React Native"],
    teamSize: 4,
    timelineMonths: 3,
    budgetRange: "$50k-$100k",
    startDate: "2026-01-10",
    completionDate: "2026-04-10",
    outcomesDescription: "No-show rate reduced from 25% to 9%. Staff freed from manual follow-up calls. Patient satisfaction with communication improved by 40%. Pre-visit instruction compliance increased from 55% to 88%.",
    roiPercentage: 200,
    efficiencyGainPercentage: 50,
    adoptionRate: "High",
    challengesFaced: "WhatsApp Business API approval took 3 weeks. Patient demographics required multilingual support (Hindi, English, Tamil).",
    deliveryQualityRating: 5,
    aiEffectivenessRating: 4,
    communicationRating: 5,
    valueForMoneyRating: 5,
    wouldRecommend: true,
    overallRating: 5,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-04-20T09:00:00Z",
    updatedAt: "2026-04-20T09:00:00Z",
  },
  {
    id: "pr11",
    cxoId: "cxo3",
    itCompanyId: "it7",
    projectTitle: "AI Network Optimization for Telecom Operations",
    projectCategory: "AI Operations",
    problemStatement: "Network outages causing $500K/hour in lost revenue. Manual monitoring across 50,000+ cell towers. Reactive maintenance model — fix after failure.",
    aiSolutionDescription: "Tech Mahindra deployed AI-powered network monitoring with predictive maintenance. ML models analyze tower telemetry to predict failures 48 hours in advance and auto-generate maintenance tickets.",
    techStack: ["Apache Spark", "TensorFlow", "Kafka", "Grafana", "Custom ML"],
    teamSize: 10,
    timelineMonths: 8,
    budgetRange: "$500k-$1M",
    startDate: "2025-07-01",
    completionDate: "2026-03-01",
    outcomesDescription: "Unplanned outages reduced by 62%. Maintenance costs reduced by 28%. Network uptime improved from 99.2% to 99.7%. Annual savings estimated at $8.5M.",
    roiPercentage: 170,
    efficiencyGainPercentage: 42,
    adoptionRate: "High",
    challengesFaced: "Telemetry data from 50,000+ towers required custom data pipeline. Model accuracy improved from 71% to 89% over 6 months of tuning.",
    deliveryQualityRating: 4,
    aiEffectivenessRating: 5,
    communicationRating: 3,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-04-22T11:30:00Z",
    updatedAt: "2026-04-22T11:30:00Z",
  },
  {
    id: "pr12",
    cxoId: "cxo1",
    itCompanyId: "it4",
    projectTitle: "AI-Enhanced Employee Onboarding Portal",
    projectCategory: "AI HR",
    problemStatement: "New hire onboarding taking 6 weeks average. HR team spending 30% of time on repetitive onboarding tasks. Inconsistent training delivery across departments.",
    aiSolutionDescription: "Wipro built an AI-powered onboarding portal with personalized learning paths, automated document processing, AI chatbot for new hire queries, and progress tracking with predictive analytics.",
    techStack: ["Wipro Holmes", "Azure AD", "SharePoint", "Power Automate"],
    teamSize: 6,
    timelineMonths: 4,
    budgetRange: "$100k-$250k",
    startDate: "2025-11-15",
    completionDate: "2026-03-15",
    outcomesDescription: "Onboarding time reduced from 6 weeks to 2.5 weeks. HR team freed from 70% of repetitive tasks. New hire satisfaction scores improved by 35%. Training completion rates increased from 68% to 94%.",
    roiPercentage: 130,
    efficiencyGainPercentage: 58,
    adoptionRate: "High",
    challengesFaced: "Integration with 3 different HRIS systems across merged entities. AI chatbot required extensive training on company-specific policies.",
    deliveryQualityRating: 4,
    aiEffectivenessRating: 4,
    communicationRating: 4,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-04-25T15:00:00Z",
    updatedAt: "2026-04-25T15:00:00Z",
  },
  {
    id: "pr13",
    cxoId: "cxo2",
    itCompanyId: "it6",
    projectTitle: "AI Document Processing for Claims Automation",
    projectCategory: "AI Finance",
    problemStatement: "Insurance claims processing taking 15 days average. Manual document verification consuming 40 FTEs. Error rate in manual data extraction at 18%.",
    aiSolutionDescription: "HCL Technologies deployed an AI document processing system using OCR and NLP to extract data from claim forms, medical reports, and supporting documents. Automated validation against policy terms.",
    techStack: ["HCL AI Suite", "Azure Cognitive Services", "Custom NLP", "React"],
    teamSize: 9,
    timelineMonths: 7,
    budgetRange: "$250k-$500k",
    startDate: "2025-08-01",
    completionDate: "2026-03-01",
    outcomesDescription: "Claims processing time reduced from 15 days to 3 days. Manual data extraction errors reduced from 18% to 2%. 60% of claims now fully automated. Customer satisfaction improved by 32%.",
    roiPercentage: 160,
    efficiencyGainPercentage: 55,
    adoptionRate: "Medium",
    challengesFaced: "Medical document formats varied wildly across providers. NLP model needed training on insurance-specific terminology.",
    deliveryQualityRating: 4,
    aiEffectivenessRating: 4,
    communicationRating: 3,
    valueForMoneyRating: 4,
    wouldRecommend: true,
    overallRating: 4,
    status: "approved",
    isAnonymous: false,
    createdAt: "2026-04-28T10:15:00Z",
    updatedAt: "2026-04-28T10:15:00Z",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs1",
    projectReviewId: "pr1",
    slug: "salesx-ai-sales-pipeline-manufacturing",
    metaTitle: "How ManuSoft Achieved 180% ROI with AI-Powered Sales Pipeline | Reviews_CXO",
    metaDescription: "Case study: ManuSoft Solutions deployed SalesX AI CRM with native SAP integration, achieving 96% quote accuracy and 180% ROI in 2 months.",
    isFeatured: true,
    isPublished: true,
    publishedAt: "2026-04-12T00:00:00Z",
    viewsCount: 1240,
    likesCount: 89,
  },
  {
    id: "cs2",
    projectReviewId: "pr3",
    slug: "accenture-ai-customer-service-banking",
    metaTitle: "How FinServe Reduced Response Time by 97% with Accenture AI | Reviews_CXO",
    metaDescription: "Case study: FinServe Capital deployed Accenture's conversational AI for banking, reducing response time from 4 hours to 12 minutes with 60% automation.",
    isFeatured: true,
    isPublished: true,
    publishedAt: "2026-03-22T00:00:00Z",
    viewsCount: 980,
    likesCount: 67,
  },
  {
    id: "cs3",
    projectReviewId: "pr4",
    slug: "cognizant-ai-inventory-optimization-retail",
    metaTitle: "RetailMax Cut Stockouts by 75% with Cognizant AI | Reviews_CXO",
    metaDescription: "Case study: RetailMax Group deployed Cognizant's ML demand forecasting, reducing stockout rate from 12% to 3% with 210% ROI.",
    isFeatured: true,
    isPublished: true,
    publishedAt: "2026-04-07T00:00:00Z",
    viewsCount: 1560,
    likesCount: 112,
  },
  {
    id: "cs4",
    projectReviewId: "pr7",
    slug: "happiest-minds-fraud-detection-payments",
    metaTitle: "FinServe Saved $3.2M with AI Fraud Detection | Reviews_CXO",
    metaDescription: "Case study: Happiest Minds deployed real-time fraud detection ML model, reducing false positives from 45% to 12% and saving $3.2M in first quarter.",
    isFeatured: true,
    isPublished: true,
    publishedAt: "2026-04-14T00:00:00Z",
    viewsCount: 2100,
    likesCount: 145,
  },
  {
    id: "cs5",
    projectReviewId: "pr8",
    slug: "salesx-ai-lead-scoring-b2b",
    metaTitle: "ManuSoft Increased Conversions by 137% with SalesX AI Lead Scoring | Reviews_CXO",
    metaDescription: "Case study: SalesX AI lead scoring for B2B outbound — conversion rate from 8% to 19% in 30 days with minimal setup.",
    isFeatured: false,
    isPublished: true,
    publishedAt: "2026-04-17T00:00:00Z",
    viewsCount: 1800,
    likesCount: 132,
  },
  {
    id: "cs6",
    projectReviewId: "pr5",
    slug: "persistent-ai-clinical-decision-support",
    metaTitle: "HealthTech Reduced Documentation Time by 55% with Persistent AI | Reviews_CXO",
    metaDescription: "Case study: Persistent Systems built AI clinical decision support — auto-generates notes, suggests diagnoses, flags drug interactions.",
    isFeatured: false,
    isPublished: true,
    publishedAt: "2026-03-27T00:00:00Z",
    viewsCount: 890,
    likesCount: 58,
  },
  {
    id: "cs7",
    projectReviewId: "pr10",
    slug: "happiest-minds-patient-engagement-ai",
    metaTitle: "HealthTech Cut No-Shows by 64% with Happiest Minds AI | Reviews_CXO",
    metaDescription: "Case study: AI chatbot for patient engagement — appointment reminders, pre-visit instructions, and symptom triage via WhatsApp.",
    isFeatured: false,
    isPublished: true,
    publishedAt: "2026-04-22T00:00:00Z",
    viewsCount: 720,
    likesCount: 45,
  },
  {
    id: "cs8",
    projectReviewId: "pr11",
    slug: "tech-mahindra-ai-network-optimization",
    metaTitle: "Telecom Provider Saved $8.5M with Tech Mahindra AI | Reviews_CXO",
    metaDescription: "Case study: AI predictive maintenance for 50,000+ cell towers — unplanned outages reduced by 62%, uptime improved to 99.7%.",
    isFeatured: false,
    isPublished: true,
    publishedAt: "2026-04-24T00:00:00Z",
    viewsCount: 650,
    likesCount: 38,
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

export function getReviewsByCompany(itCompanyId: string): ProjectReview[] {
  return PROJECT_REVIEWS.filter((r) => r.itCompanyId === itCompanyId && r.status === "approved");
}

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

export function getCompanyStats(itCompanyId: string) {
  const reviews = getReviewsByCompany(itCompanyId);
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
