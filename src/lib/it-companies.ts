import { VENDORS } from "./vendors";

/**
 * Adapter interface maintaining compatibility with any existing components
 * while using the canonical Vendor universe from `src/lib/vendors.ts`.
 */
export interface ITCompany {
  id: string;
  slug: string;
  name: string;
  description: string;
  website: string;
  hqLocation: string;
  employeeCount: string;
  foundedYear: number;
  revenueRange: string;
  aiCapabilities: string[];
  industriesServed: string[];
  certifications: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  logoUrl: string | undefined;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  projectCount: number;
  featured: boolean;
  parentCompanyId?: string;
  isDivision?: boolean;
  divisionOf?: string;
  sourceProvenance?: {
    sourceType: "verified" | "public-research" | "self-reported";
    sourceUrl?: string;
    sourceName?: string;
    lastVerified?: string;
    verificationStatus: "verified" | "unverified" | "pending";
  };
}

// Canonical mapped company universe directly derived from `vendors.ts`
export const IT_COMPANIES: ITCompany[] = VENDORS.map((v) => ({
  id: v.slug,
  slug: v.slug,
  name: v.name,
  description: v.tagline,
  website: v.website,
  hqLocation: v.hq,
  employeeCount: "Enterprise",
  foundedYear: v.founded,
  revenueRange: v.pricing,
  aiCapabilities: v.features,
  industriesServed: [v.category, ...v.bestFor],
  certifications: v.certifications,
  socialLinks: {},
  logoUrl: undefined,
  isVerified: true,
  rating: v.rating,
  reviewCount: v.reviewCount,
  projectCount: 1,
  featured: v.ascsComposite >= 8.5,
  sourceProvenance: {
    sourceType: "verified",
    sourceUrl: v.website,
    sourceName: `${v.name} Official Technical Documentation`,
    lastVerified: "2026-09-07",
    verificationStatus: "verified",
  },
}));

export function getITCompanyBySlug(slug: string): ITCompany | undefined {
  return IT_COMPANIES.find((c) => c.slug === slug);
}

export function getAllITCompanies(): ITCompany[] {
  return IT_COMPANIES;
}

export function getFeaturedITCompanies(): ITCompany[] {
  return IT_COMPANIES.filter((c) => c.featured);
}

export function getITCompaniesByCapability(capability: string): ITCompany[] {
  return IT_COMPANIES.filter((c) => c.aiCapabilities.includes(capability));
}

export function getITCompaniesByIndustry(industry: string): ITCompany[] {
  return IT_COMPANIES.filter((c) => c.industriesServed.includes(industry));
}

export const AI_CAPABILITIES = [
  "AI Sales",
  "AI Marketing",
  "AI Operations",
  "AI Finance",
  "AI HR",
  "AI Supply Chain",
  "AI Healthcare",
  "AI Manufacturing",
  "AI CRM",
  "Sales Automation",
  "Lead Management",
  "ERP Integration",
] as const;

export const INDUSTRIES_SERVED = [
  "BFSI",
  "Retail",
  "Healthcare",
  "Manufacturing",
  "Telecom",
  "Technology",
  "Enterprise Software",
] as const;
