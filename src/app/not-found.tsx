import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:py-16 text-center">
      <p className="text-5xl sm:text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground">Page Not Found</h1>
      <p className="mt-2 text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
      >
        Return Home
      </Link>
    </div>
  );
}
