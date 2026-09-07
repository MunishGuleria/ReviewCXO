interface SectionHeadingProps {
  title: string;
  description?: string;
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight text-foreground border-l-4 border-primary pl-4" style={{ letterSpacing: '-0.025em' }}>
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-base leading-relaxed text-muted pl-4 ml-1">
          {description}
        </p>
      )}
    </div>
  );
}
