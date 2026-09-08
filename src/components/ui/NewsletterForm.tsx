"use client";

import { useState } from "react";

interface NewsletterFormProps {
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export function NewsletterForm({
  buttonText = "Subscribe to Dispatch",
  placeholder = "name@enterprise.com",
  className = "",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid work email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing to Reviews_CXO Research Dispatch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          disabled={status === "loading" || status === "success"}
          placeholder={placeholder}
          required
          aria-label="Enterprise email address"
          className="input-base flex-1"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="btn-primary shrink-0 disabled:opacity-50"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Subscribing...
            </span>
          ) : status === "success" ? (
            <span className="flex items-center gap-2">Subscribed ✓</span>
          ) : (
            buttonText
          )}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 rounded border p-3 text-sm font-medium text-center ${
            status === "success" ? "border-success/30 bg-success/5 text-success" : status === "error" ? "border-danger/30 bg-danger/5 text-danger" : "border-border bg-surface-alt text-muted-foreground"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
