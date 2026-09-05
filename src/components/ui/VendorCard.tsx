import Link from "next/link";
import { StarRating } from "./StarRating";
import { Vendor } from "@/lib/vendors";

interface VendorCardProps {
  vendor: Vendor;
  rank?: number;
}

export function VendorCard({ vendor, rank }: VendorCardProps) {
  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-md"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {rank !== undefined && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-alt border border-border font-mono text-xs font-black text-muted group-hover:border-primary/40 group-hover:text-primary transition-colors">
                {rank < 10 ? `0${rank}` : rank}
              </span>
            )}
            <div className="min-w-0">
              <h3 className="font-extrabold text-foreground group-hover:text-primary transition-colors truncate">
                {vendor.name}
              </h3>
              <p className="text-[11px] text-muted truncate">{vendor.category}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="inline-flex items-baseline gap-0.5 rounded-lg bg-primary/10 border border-primary/20 px-2 py-0.5 font-mono">
              <span className="text-xs font-black text-primary">{vendor.ascsComposite}</span>
              <span className="text-[10px] text-muted">/10</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted block mt-0.5">ASCS</span>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted line-clamp-2">{vendor.tagline}</p>

        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
          <StarRating rating={vendor.rating} size="sm" reviewCount={vendor.reviewCount} />
          <span className="text-[10px] font-mono text-muted bg-surface-alt border border-border px-1.5 py-0.5 rounded">
            {vendor.architectureProfile.agenticTier}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-2 border-t border-border">
        <span className="text-[11px] font-semibold text-muted">Deployment: {vendor.deployment[0]}</span>
        <span className="text-xs font-bold text-primary group-hover:underline">
          Scorecard →
        </span>
      </div>
    </Link>
  );
}
