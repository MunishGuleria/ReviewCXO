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

export const CXO_PROFILES: CxOProfile[] = [];

export const PROJECT_REVIEWS: ProjectReview[] = [];

export const CASE_STUDIES: CaseStudy[] = [];

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
  verified_cxo_review: "Email Validated Submission",
  public_review_evidence: "Public Review Evidence",
  public_customer_evidence: "Public Customer Evidence",
  vendor_provided_evidence: "Vendor-Provided Evidence",
  third_party_research: "Third-Party Research",
  observed_evidence: "Observed Evidence",
  inferred: "Inferred",
};

export const EVIDENCE_TYPE_DESCRIPTIONS: Record<EvidenceType, string> = {
  verified_cxo_review: "Submission confirmed via Reviews_CXO email validation process",
  public_review_evidence: "Information from G2, Capterra, Clutch, Trustpilot, or public testimonials",
  public_customer_evidence: "Customer case studies, announcements, or public project documentation",
  vendor_provided_evidence: "Information published by the software vendor itself",
  third_party_research: "Independent publications, analyst reports, or industry research",
  observed_evidence: "Directly tested or observed by Reviews_CXO",
  inferred: "Reasonable conclusion based on related evidence but not directly confirmed",
};
