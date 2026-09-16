import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { submitProjectReview } from "@/lib/db-queries";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";
import { getVisibleVendors } from "@/lib/vendors";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PROJECT_TITLE_LENGTH = 200;
const MAX_COMPANY_NAME_LENGTH = 200;
const MAX_TEXT_LENGTH = 5000;

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= MAX_EMAIL_LENGTH;
}

function sanitizeString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimit = checkRateLimit(`reviews:${ip}`, 5, 60000);
    const rateLimitHeaders = getRateLimitHeaders(`reviews:${ip}`, 5);

    if (!rateLimit.allowed) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429, headers: rateLimitHeaders });
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 100000) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    const data = await request.json();

    const cxo_full_name = sanitizeString(data.cxo_full_name, MAX_NAME_LENGTH);
    const cxo_email = sanitizeString(data.cxo_email, MAX_EMAIL_LENGTH);
    const project_title = sanitizeString(data.project_title, MAX_PROJECT_TITLE_LENGTH);
    const it_company_name = sanitizeString(data.it_company_name, MAX_COMPANY_NAME_LENGTH);
    const project_category = sanitizeString(data.project_category, 100) || "AI Operations";

    if (!cxo_full_name || !cxo_email || !project_title || !it_company_name) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, project title, and company name are required." },
        { status: 400 }
      );
    }

    if (!validateEmail(cxo_email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const visibleNames = getVisibleVendors().map((v) => v.name);
    if (!visibleNames.includes(it_company_name)) {
      return NextResponse.json(
        { error: "Reviews are only accepted for visible platforms." },
        { status: 400 }
      );
    }

    const ratingFields = ["delivery_quality_rating", "ai_effectiveness_rating", "communication_rating", "value_for_money_rating", "overall_rating"];
    for (const field of ratingFields) {
      if (data[field] !== undefined && data[field] !== null) {
        const val = Number(data[field]);
        if (isNaN(val) || val < 1 || val > 5) {
          return NextResponse.json({ error: `${field} must be between 1 and 5` }, { status: 400 });
        }
      }
    }

    if (data.roi_percentage !== undefined && data.roi_percentage !== null) {
      const roi = Number(data.roi_percentage);
      if (isNaN(roi) || roi < 0 || roi > 10000) {
        return NextResponse.json({ error: "ROI percentage must be between 0 and 10000" }, { status: 400 });
      }
    }

    if (data.efficiency_gain_percentage !== undefined && data.efficiency_gain_percentage !== null) {
      const eg = Number(data.efficiency_gain_percentage);
      if (isNaN(eg) || eg < 0 || eg > 100) {
        return NextResponse.json({ error: "Efficiency gain must be between 0 and 100" }, { status: 400 });
      }
    }

    const sanitizedData = {
      ...data,
      cxo_full_name,
      cxo_email,
      project_title,
      it_company_name,
      project_category,

      cxo_title: sanitizeString(data.cxo_title, 100) || "",
      cxo_company_name: sanitizeString(data.cxo_company_name, 200) || "",
      cxo_linkedin_url: sanitizeString(data.cxo_linkedin_url, 500) || undefined,
      problem_statement: sanitizeString(data.problem_statement, MAX_TEXT_LENGTH) || undefined,
      ai_solution_description: sanitizeString(data.ai_solution_description, MAX_TEXT_LENGTH) || undefined,
      outcomes_description: sanitizeString(data.outcomes_description, MAX_TEXT_LENGTH) || undefined,
      challenges_faced: sanitizeString(data.challenges_faced, MAX_TEXT_LENGTH) || undefined,
      adoption_rate: ["High", "Medium", "Low"].includes(data.adoption_rate) ? data.adoption_rate : undefined,
      budget_range: sanitizeString(data.budget_range, 50) || undefined,
    };

    const reviewId = await submitProjectReview(sanitizedData);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const adminEmail = "harsh078976@gmail.com";

    try {
      const { Resend } = await import("resend");
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "Reviews CXO <onboarding@resend.dev>",
          to: adminEmail,
          subject: `New Review Submission: ${it_company_name} — ${project_title}`,
          html: `<h2>New Review Submitted</h2>
<p><strong>${sanitizedData.cxo_full_name}</strong> (${sanitizedData.cxo_title}, ${sanitizedData.cxo_company_name}) submitted a review.</p>
<table style="border-collapse:collapse;width:100%;margin:16px 0">
<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Platform</td><td style="padding:6px 12px;border:1px solid #ddd">${it_company_name}</td></tr>
<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Project</td><td style="padding:6px 12px;border:1px solid #ddd">${project_title}</td></tr>
<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Category</td><td style="padding:6px 12px;border:1px solid #ddd">${sanitizedData.project_category}</td></tr>
<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Rating</td><td style="padding:6px 12px;border:1px solid #ddd">${data.overall_rating || "N/A"}/5</td></tr>
</table>
<p><a href="${siteUrl}/admin/reviews" style="background:#0070f3;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block">Review in Admin Panel</a></p>`,
        });

        await resend.emails.send({
          from: "Reviews CXO <onboarding@resend.dev>",
          to: cxo_email,
          subject: "Review Received - Reviews CXO",
          html: `<h2>Thank you, ${cxo_full_name}!</h2>
<p>Your review for <strong>${it_company_name}</strong> has been received.</p>
<p>Our analysts will review it and you&apos;ll be notified once it&apos;s published.</p>
<hr/>
<p style="font-size:12px;color:#666">Reviews CXO Research Team</p>`,
        });
      }
    } catch {
      // Email sending is optional — review is still saved
    }

    return NextResponse.json({
      success: true,
      message: "Review submitted! Our team will review it and notify you by email.",
      review_id: reviewId,
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review. Please try again." },
      { status: 500 }
    );
  }
}
