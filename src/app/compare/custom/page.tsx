import { getAllVendors } from "@/lib/vendors";
import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Platform Comparison",
  description: "Compare any two AI enterprise sales platforms head-to-head.",
  alternates: { canonical: "https://reviewscxo.com/compare/custom" },
  openGraph: {
    title: "Custom Platform Comparison",
    description: "Compare any two AI enterprise sales platforms head-to-head.",
    url: "https://reviewscxo.com/compare/custom",
    siteName: "Reviews CXO",
    locale: "en_US",
    type: "website",
  },
};

export default function CustomComparePageWrapper() {
  const allVendors = getAllVendors();
  return <ClientPage allVendors={allVendors} />;
}
