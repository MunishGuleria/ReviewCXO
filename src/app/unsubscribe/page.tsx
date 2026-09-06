"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");

  useEffect(() => {
    const email = searchParams.get("email");
    if (!email) {
      setStatus("error");
      return;
    }

    fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((data) => setStatus(data.success ? "success" : "error"))
      .catch(() => setStatus("error"));
  }, [searchParams]);

  return (
    <div className="bg-surface border border-border rounded-xl p-8 max-w-md w-full text-center">
      {status === "processing" && (
        <>
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-muted border-t-primary mx-auto mb-4" />
          <h1 className="text-lg font-bold text-foreground">Processing</h1>
          <p className="text-sm text-muted mt-1">Please wait...</p>
        </>
      )}
      {status === "success" && (
        <>
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-green-500 text-xl font-bold">&#10003;</span>
          </div>
          <h1 className="text-lg font-bold text-foreground">Unsubscribed</h1>
          <p className="text-sm text-muted mt-1 mb-6">You&apos;ve been unsubscribed from our newsletter.</p>
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
          <h1 className="text-lg font-bold text-foreground">Unsubscribe Failed</h1>
          <p className="text-sm text-muted mt-1 mb-6">Something went wrong. Please try again or contact us.</p>
          <button onClick={() => router.push("/")} className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90">
            Go to Homepage
          </button>
        </>
      )}
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div className="animate-spin rounded-full h-10 w-10 border-2 border-muted border-t-primary mx-auto" />}>
        <UnsubscribeContent />
      </Suspense>
    </div>
  );
}
