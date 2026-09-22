import { getAllVendors } from "@/lib/vendors";
import ClientPage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare AI Enterprise Sales Platforms",
  description: "Head-to-head architectural and security capability comparisons.",
  alternates: { canonical: "https://reviewscxo.com/compare" },
  openGraph: {
    title: "Compare AI Enterprise Sales Platforms",
    description: "Head-to-head architectural and security capability comparisons.",
    url: "https://reviewscxo.com/compare",
    siteName: "Reviews CXO",
    locale: "en_US",
    type: "website",
  },
};

export default function ComparePageWrapper() {
  const allVendors = getAllVendors();
  return <ClientPage allVendors={allVendors} />;
}
