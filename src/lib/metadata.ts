import type { Metadata } from "next";
import { SITE } from "./site";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type: opts.type || "website",
      images: [{ url: opts.ogImage || SITE.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [opts.ogImage || SITE.ogImage],
    },
  };
}
