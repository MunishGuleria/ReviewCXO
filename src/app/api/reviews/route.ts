import { NextResponse } from "next/server";
import { submitProjectReview } from "@/lib/db-queries";
import db from "@/lib/db";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.cxo_full_name || !data.cxo_email || !data.project_title || !data.it_company_name) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, project title, and company name are required." },
        { status: 400 }
      );
    }

    if (!data.cxo_email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const reviewId = submitProjectReview(data);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    db.prepare(
      "UPDATE submitted_reviews SET verification_token = ?, status = 'pending_verification', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).run(verificationToken, reviewId);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const verificationUrl = `${siteUrl}/verify-review?token=${verificationToken}`;

    try {
      const { Resend } = await import("resend");
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Reviews_CXO <onboarding@resend.dev>",
          to: data.cxo_email,
          subject: "Verify Your Review Submission - Reviews_CXO",
          html: `<h2>Thank you for submitting your review!</h2>
<p>Hi ${data.cxo_full_name},</p>
<p>You submitted a review for <strong>${data.it_company_name}</strong> about "<strong>${data.project_title}</strong>".</p>
<p>Please verify your email by clicking below:</p>
<p><a href="${verificationUrl}" style="background:#0070f3;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block">Verify Email</a></p>
<p style="font-size:12px;word-break:break-all">${verificationUrl}</p>
<p>This link expires in 24 hours.</p>
<hr/>
<p style="font-size:12px;color:#666">If you didn't submit this review, ignore this email.</p>`,
        });
      }
    } catch {
      // Email sending is optional — review is still saved
    }

    return NextResponse.json({
      success: true,
      message: "Review submitted! Please check your email to verify.",
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
