"use client";

import { useState, Suspense, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        const redirectUrl = data.user.role === "admin" && next === "/" ? "/admin" : next;
        window.location.href = redirectUrl;
      } else {
        setError(data.error || "Login failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";

  return (
    <div className="card-premium p-6 sm:p-8">
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
          <input
            type="email"
            required
            className={inputCls}
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
          <input
            type="password"
            required
            minLength={8}
            className={inputCls}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-primary-text hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <PageHeader
        title="Sign In"
        description="Sign in to submit reviews and questions."
      />
      <div className="mx-auto max-w-md px-4 pb-16 sm:px-6 lg:px-8 space-y-6">
        {/* Admin Login */}
        <div className="card-premium p-6 sm:p-8 border-2 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-text">Admin</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Admin access for reviewing submissions, managing content, and approving reviews &amp; questions.
          </p>
          <Suspense fallback={<div className="text-sm text-muted py-4 text-center">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        {/* User Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            New here?{" "}
            <Link href="/signup" className="font-semibold text-primary-text hover:underline">
              Create an account
            </Link>{" "}
            to submit reviews and questions.
          </p>
        </div>
      </div>
    </>
  );
}
