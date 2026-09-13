"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setError("Verification token missing");
      return;
    }

    fetch("/api/verify-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data) => {
        setStatus(data.success ? "success" : "error");
        if (!data.success) setError(data.error || "Verification failed");
      })
      .catch(() => {
        setStatus("error");
        setError("Network error. Please try again.");
      });
  }, [searchParams]);

  return (
    <div className="bg-surface border border-border rounded-xl p-8 max-w-md w-full text-center">
      {status === "verifying" && (
        <>
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-muted border-t-primary mx-auto mb-4" />
          <h1 className="text-lg font-bold text-foreground">Verifying Your Email</h1>
          <p className="text-sm text-muted mt-1">Please wait...</p>
        </>
      )}
      {status === "success" && (
        <>
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-green-500 text-xl font-bold">&#10003;</span>
          </div>
          <h1 className="text-lg font-bold text-foreground">Email Validated!</h1>
          <p className="text-sm text-muted mt-1 mb-6">
            Thank you for verifying your review. Our team will review it shortly.
          </p>
          <button onClick={() => router.push("/")} className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90">
            Go to Homepage
          </button>
        </>
      )}
      {status === "error" && (
        <>
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-xl font-bold">&#10007;</span>
          </div>
          <h1 className="text-lg font-bold text-foreground">Verification Failed</h1>
          <p className="text-sm text-muted mt-1 mb-6">{error}</p>
          <button onClick={() => router.push("/submit-review")} className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90">
            Submit Another Review
          </button>
        </>
      )}
    </div>
  );
}

export default function VerifyReviewPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div className="animate-spin rounded-full h-10 w-10 border-2 border-muted border-t-primary mx-auto" />}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
