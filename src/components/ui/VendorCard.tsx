import Link from "next/link";
import { StarRating } from "./StarRating";
import { Vendor } from "@/lib/vendors";

interface VendorCardProps {
  vendor: Vendor;
  rank?: number;
}

export function VendorCard({ vendor, rank }: VendorCardProps) {
  const getRankStyle = (r: number) => {
    return "bg-surface-alt border border-border text-muted-foreground group-hover:border-border-strong group-hover:text-foreground transition-colors font-bold";
  };

  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className="group flex flex-col justify-between card-premium p-6 h-full transition-all hover:shadow-md hover:border-border-strong"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {rank !== undefined && (
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-sm ${getRankStyle(rank)}`}>
                {rank < 10 ? `0${rank}` : rank}
              </span>
            )}
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors truncate">
                {vendor.name}
              </h3>
              <p className="text-xs font-medium text-muted-foreground truncate mt-1">{vendor.category}</p>
            </div>
          </div>

          <div className="text-right shrink-0 pt-0.5">
            <div className="inline-flex items-baseline gap-0.5">
              <span className="text-lg font-black text-foreground">{vendor.ascsComposite}</span>
              <span className="text-[10px] font-bold text-muted-foreground">/10</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mt-0.5">ASCS</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {vendor.tagline}
        </p>

        {/* Tags (Pushes footer down) */}
        <div className="mt-6 mb-2 flex flex-wrap items-center gap-2 flex-grow content-end">
          <span className="inline-flex items-center rounded-md bg-surface-alt px-2 py-1 text-[10px] font-semibold text-secondary-foreground border border-border">
            {vendor.architectureProfile.agenticTier}
          </span>
          <span className="inline-flex items-center rounded-md bg-surface-alt px-2 py-1 text-[10px] font-semibold text-secondary-foreground border border-border">
            {vendor.deployment[0]}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-5 border-t border-border mt-4">
        <StarRating rating={vendor.rating} size="sm" reviewCount={vendor.reviewCount} />
        <span className="text-xs font-bold text-foreground group-hover:text-primary transition-all flex items-center gap-1 group-hover:translate-x-1">
          Inspect Specs &rarr;
        </span>
      </div>
    </Link>
  );
}
