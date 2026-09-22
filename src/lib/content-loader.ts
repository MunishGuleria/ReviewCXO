import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  Vendor,
  EvidenceClassification,
  AnalystEvaluation,
  CustomerSentiment,
  AICapabilities,
  PricingDetails,
  EvidenceSource,
} from "./vendors";
import type { Question } from "./questions";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ─── Vendor Content Loader ───────────────────────────────────────────────────

interface VendorFrontmatter {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  founded: number;
  hq: string;
  website: string;
  rating: number;
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
  hidden?: boolean;
  published?: boolean;
}

interface VendorBodyData {
  ascsScores?: Record<number, number>;
  ascsEvidence?: Record<number, EvidenceClassification>;
  ascsComposite?: number;
  architectureProfile?: Vendor["architectureProfile"];
  workloadFit?: Vendor["workloadFit"];
  analystEvaluation?: AnalystEvaluation;
  customerSentiment?: CustomerSentiment;
  aiCapabilities?: AICapabilities;
  pricingDetails?: PricingDetails;
  evidenceSources?: EvidenceSource[];
  parentCompany?: Vendor["parentCompany"];
}

function parseJsonBlock(content: string, marker: string): unknown | undefined {
  const regex = new RegExp(
    `<!--${marker}\\s*\\n([\\s\\S]*?)\\s*-->`,
    "m"
  );
  const match = content.match(regex);
  if (match) {
    try {
      return JSON.parse(match[1]);
    } catch {
      return undefined;
    }
  }
  return undefined;
}

export function loadVendorFromMarkdown(filePath: string): Vendor | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data: fm, content } = matter(raw);

  const frontmatter = fm as VendorFrontmatter;

  // Unpublished vendors are still loaded but marked as hidden
  const isHidden = frontmatter.published !== true;

  // Parse complex data from JSON blocks in the markdown body
  const bodyData: VendorBodyData = {};

  const ascsScores = parseJsonBlock(content, "ASCSCORES");
  if (ascsScores) bodyData.ascsScores = ascsScores as Record<number, number>;

  const ascsEvidence = parseJsonBlock(content, "ASCSEVIDENCE");
  if (ascsEvidence)
    bodyData.ascsEvidence = ascsEvidence as Record<number, EvidenceClassification>;

  const ascsComposite = parseJsonBlock(content, "ASCSCOMPOSITE");
  if (ascsComposite !== undefined)
    bodyData.ascsComposite = ascsComposite as number;

  const architectureProfile = parseJsonBlock(content, "ARCHITECTURE");
  if (architectureProfile)
    bodyData.architectureProfile =
      architectureProfile as Vendor["architectureProfile"];

  const workloadFit = parseJsonBlock(content, "WORKLOADFIT");
  if (workloadFit) bodyData.workloadFit = workloadFit as Vendor["workloadFit"];

  const analystEvaluation = parseJsonBlock(content, "ANALYST");
  if (analystEvaluation)
    bodyData.analystEvaluation = analystEvaluation as AnalystEvaluation;

  const customerSentiment = parseJsonBlock(content, "SENTIMENT");
  if (customerSentiment)
    bodyData.customerSentiment = customerSentiment as CustomerSentiment;

  const aiCapabilities = parseJsonBlock(content, "AICAPABILITIES");
  if (aiCapabilities)
    bodyData.aiCapabilities = aiCapabilities as AICapabilities;

  const pricingDetails = parseJsonBlock(content, "PRICINGDETAILS");
  if (pricingDetails)
    bodyData.pricingDetails = pricingDetails as PricingDetails;

  const evidenceSources = parseJsonBlock(content, "EVIDENCESOURCES");
  if (evidenceSources)
    bodyData.evidenceSources = evidenceSources as EvidenceSource[];

  const parentCompany = parseJsonBlock(content, "PARENTCOMPANY");
  if (parentCompany)
    bodyData.parentCompany = parentCompany as Vendor["parentCompany"];

  // Build the Vendor object matching the existing interface exactly
  const vendor: Vendor = {
    slug: frontmatter.slug,
    name: frontmatter.name,
    tagline: frontmatter.tagline,
    category: frontmatter.category,
    founded: frontmatter.founded,
    hq: frontmatter.hq,
    website: frontmatter.website,
    rating: frontmatter.rating,
    reviewCount: frontmatter.reviewCount,
    pricing: frontmatter.pricing,
    freeTrial: frontmatter.freeTrial,
    bestFor: frontmatter.bestFor,
    pros: frontmatter.pros,
    cons: frontmatter.cons,
    features: frontmatter.features,
    integrations: frontmatter.integrations,
    certifications: frontmatter.certifications,
    deployment: frontmatter.deployment,
    hidden: isHidden,
    ascsScores: bodyData.ascsScores ?? {},
    ascsEvidence: bodyData.ascsEvidence ?? ({} as Record<number, EvidenceClassification>),
    ascsComposite: bodyData.ascsComposite ?? 0,
    architectureProfile: bodyData.architectureProfile ?? {
      erpCoupling: "Third-Party ETL / API",
      reasoningEngine: "",
      agenticTier: "Task Automation",
    },
    workloadFit: bodyData.workloadFit ?? {
      idealDeployment: "",
      keyTradeOff: "",
    },
  };

  // Attach optional fields only if present (to match existing behavior)
  if (bodyData.analystEvaluation)
    vendor.analystEvaluation = bodyData.analystEvaluation;
  if (bodyData.customerSentiment)
    vendor.customerSentiment = bodyData.customerSentiment;
  if (bodyData.aiCapabilities) vendor.aiCapabilities = bodyData.aiCapabilities;
  if (bodyData.pricingDetails)
    vendor.pricingDetails = bodyData.pricingDetails;
  if (bodyData.evidenceSources)
    vendor.evidenceSources = bodyData.evidenceSources;
  if (bodyData.parentCompany) vendor.parentCompany = bodyData.parentCompany;

  return vendor;
}

export function loadAllVendorsFromContent(): Vendor[] {
  const vendorsDir = path.join(CONTENT_DIR, "vendors");
  if (!fs.existsSync(vendorsDir)) return [];

  const files = fs.readdirSync(vendorsDir).filter((f) => f.endsWith(".md"));
  const vendors: Vendor[] = [];

  for (const file of files) {
    const vendor = loadVendorFromMarkdown(path.join(vendorsDir, file));
    if (vendor) vendors.push(vendor);
  }

  return vendors;
}

// ─── Question Content Loader ─────────────────────────────────────────────────

interface QuestionFrontmatter {
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
  findings?: string[];
  relatedVendors?: string[];
  relatedArticles?: string[];
}

interface QuestionSource {
  title: string;
  url: string;
}

export function loadQuestionFromMarkdown(filePath: string): Question | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data: fm, content } = matter(raw);

  const frontmatter = fm as QuestionFrontmatter;

  // Parse sources from JSON block if present
  const sources = parseJsonBlock(content, "SOURCES") as
    | QuestionSource[]
    | undefined;

  // The answer is the markdown body (without JSON blocks)
  // Remove JSON blocks from the content to get the clean answer
  const answer = content
    .replace(/<!--SOURCES\s*\n[\s\S]*?\n-->/g, "")
    .trim();

  const question: Question = {
    id: frontmatter.id,
    slug: frontmatter.slug,
    title: frontmatter.title,
    question: frontmatter.question,
    author: frontmatter.author,
    source: frontmatter.source,
    sourceUrl: frontmatter.sourceUrl,
    publishedAt: frontmatter.publishedAt,
    excerpt: frontmatter.excerpt,
    category: frontmatter.category,
    tags: frontmatter.tags,
    status: frontmatter.status,
    answer,
    findings: frontmatter.findings,
    sources: sources as Question["sources"],
    relatedVendors: frontmatter.relatedVendors,
    relatedArticles: frontmatter.relatedArticles,
  };

  return question;
}

export function loadAllQuestionsFromContent(): Question[] {
  const questionsDir = path.join(CONTENT_DIR, "questions");
  if (!fs.existsSync(questionsDir)) return [];

  const files = fs.readdirSync(questionsDir).filter((f) => f.endsWith(".md"));
  const questions: Question[] = [];

  for (const file of files) {
    const question = loadQuestionFromMarkdown(path.join(questionsDir, file));
    if (question) questions.push(question);
  }

  return questions;
}


export interface ResearchFrontmatter {
  slug: string;
  title: string;
  description: string;
  badge?: string;
  published: boolean;
  date?: string;
}

export interface ResearchContent extends ResearchFrontmatter {
  bodyData: any;
}

export function loadResearchFromMarkdown(slug: string, folder: 'benchmarks' | 'indexes' | 'cxo-intelligence'): ResearchContent | null {
  const fullPath = path.join(CONTENT_DIR, folder, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: fm, content } = matter(fileContents);
  const frontmatter = fm as ResearchFrontmatter;

  if (frontmatter.published !== true) return null;

  const bodyData: any = {};
  const regex = /<!--([A-Z_]+)\s+([\s\S]*?)\s+-->/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    const rawJson = match[2];
    try {
      bodyData[key] = JSON.parse(rawJson);
    } catch (e) {
      console.warn(`Failed to parse JSON for block ${key} in ${slug}.md`);
    }
  }

  return {
    ...frontmatter,
    bodyData
  };
}
