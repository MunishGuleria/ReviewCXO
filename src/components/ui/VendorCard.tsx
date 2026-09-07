import Link from "next/link";
import { StarRating } from "./StarRating";
import { Vendor } from "@/lib/vendors";

interface VendorCardProps {
  vendor: Vendor;
  rank?: number;
}

export function VendorCard({ vendor, rank }: VendorCardProps) {
  const getRankStyle = (r: number) => {
    if (r === 1) return "bg-primary text-primary-foreground font-bold";
    if (r === 2) return "bg-primary/80 text-primary-foreground font-bold";
    if (r === 3) return "bg-primary/60 text-primary-foreground font-bold";
    return "bg-surface-alt border border-border text-secondary-foreground group-hover:bg-primary/10 group-hover:text-primary-text transition-colors";
  };

  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className="group flex flex-col justify-between card-premium p-5 sm:p-6"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            {rank !== undefined && (
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded font-mono text-sm shadow-sm transition-colors ${getRankStyle(rank)}`}>
                {rank < 10 ? `0${rank}` : rank}
              </span>
            )}
            <div className="min-w-0">
              <h3 className="font-bold text-base text-foreground group-hover:text-primary-text transition-colors truncate">
                {vendor.name}
              </h3>
              <p className="text-sm font-medium text-muted-foreground truncate mt-0.5">{vendor.category}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="inline-flex items-baseline gap-1 rounded bg-surface-alt border border-border px-2.5 py-1">
              <span className="text-base font-bold text-foreground">{vendor.ascsComposite}</span>
              <span className="text-xs font-medium text-muted-foreground">/10</span>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground block mt-1">Composite</span>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">{vendor.tagline}</p>

        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs">
          <StarRating rating={vendor.rating} size="sm" reviewCount={vendor.reviewCount} />
          <span className="text-[10px] font-medium text-secondary-foreground bg-surface-alt border border-border px-2.5 py-1 rounded">
            {vendor.architectureProfile.agenticTier}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs font-medium text-muted-foreground">{vendor.deployment[0]} · ERP {vendor.ascsScores[1]}/10</span>
        <span className="text-xs font-medium text-primary-text group-hover:underline flex items-center gap-1">
          Inspect Specs →
        </span>
      </div>
    </Link>
  );
}
