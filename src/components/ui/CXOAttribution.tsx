import { CxOProfile } from "@/lib/reviews";
import { StatusBadge } from "./StatusBadge";

interface CXOAttributionProps {
  cxo: CxOProfile;
  size?: "sm" | "md";
}

export function CXOAttribution({ cxo, size = "md" }: CXOAttributionProps) {
  const initials = cxo.fullName.split(" ").map((n) => n[0]).join("");
  const avatarSize = size === "sm" ? "h-6 w-6 text-[10px]" : "h-10 w-10 text-sm";
  const nameSize = size === "sm" ? "text-xs font-semibold" : "text-sm font-bold";
  const titleSize = "text-xs text-muted";

  return (
    <div className={`flex items-center gap-2 ${size === "md" ? "pt-3 border-t border-border" : ""}`}>
      <div className={`${avatarSize} rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary`}>
        {initials}
      </div>
      <div>
        <span className={`${nameSize} text-foreground`}>{cxo.fullName}</span>
        <span className={`${titleSize}`}> · {cxo.title}, {cxo.companyName}</span>
      </div>
      {cxo.isVerified && (
        <StatusBadge variant="verified">Verified CxO</StatusBadge>
      )}
    </div>
  );
}
