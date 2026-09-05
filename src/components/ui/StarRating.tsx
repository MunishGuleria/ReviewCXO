interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  reviewCount?: number;
}

export function StarRating({ rating, size = "md", showNumber = true, reviewCount }: StarRatingProps) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3 && rating - fullStars <= 0.8;
  const gradientId = `half-star-grad-${Math.random().toString(36).substr(2, 9)}`;

  for (let i = 1; i <= 5; i++) {
    const filled = i <= fullStars;
    const half = !filled && i === fullStars + 1 && hasHalf;

    stars.push(
      <svg
        key={i}
        className={`${size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"} ${
          filled ? "text-accent" : half ? "text-accent" : "text-border"
        }`}
        fill={filled ? "currentColor" : half ? `url(#${gradientId})` : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        {half && (
          <defs>
            <linearGradient id={gradientId} x1="0" x2="100%" y1="0" y2="0">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        )}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>,
    );
  }

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      <div className="flex items-center gap-0.5">{stars}</div>
      {showNumber && (
        <span className="font-bold tabular-nums text-foreground">{rating}</span>
      )}
      {reviewCount !== undefined && (
        reviewCount > 0 ? (
          <span className="text-xs text-muted">({reviewCount.toLocaleString()} reviews)</span>
        ) : (
          <span className="text-xs text-muted font-medium bg-surface-alt px-1.5 py-0.5 rounded border border-border">
            Ecosystem Component
          </span>
        )
      )}
    </div>
  );
}
