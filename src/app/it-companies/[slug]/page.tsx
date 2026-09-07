import { permanentRedirect } from "next/navigation";
import { getVendorBySlug } from "@/lib/vendors";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ITCompanyPage({ params }: Props) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (vendor) {
    permanentRedirect(`/vendors/${vendor.slug}`);
  }
  permanentRedirect("/vendors");
}
