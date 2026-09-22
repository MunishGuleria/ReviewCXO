import { VENDORS } from "./vendors";
import { loadAllQuestionsFromContent } from "./content-loader";

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

export const QUESTIONS: Question[] = loadAllQuestionsFromContent();


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
