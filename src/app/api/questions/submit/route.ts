import { NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import crypto from "crypto";

const MAX_TITLE = 200;
const MAX_BODY = 5000;

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.match(/auth_token=([^;]+)/)?.[1];
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const data = await request.json();
    const title = typeof data.title === "string" ? data.title.trim().slice(0, MAX_TITLE) : "";
    const body = typeof data.body === "string" ? data.body.trim().slice(0, MAX_BODY) : "";
    const category = typeof data.category === "string" ? data.category.trim().slice(0, 100) : "General";

    if (!title || !body) {
      return NextResponse.json({ error: "Title and question body are required." }, { status: 400 });
    }

    const id = `q-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    db.prepare(
      "INSERT INTO submitted_questions (id, user_id, author_name, author_email, title, body, category, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')"
    ).run(id, user.id, user.name, user.email, title, body, category);

    // Notify admin
    try {
      const { Resend } = await import("resend");
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        await resend.emails.send({
          from: "Reviews CXO <onboarding@resend.dev>",
          to: "harsh078976@gmail.com",
          subject: `New Question: ${title}`,
          html: `<h2>New Question Submitted</h2>
<p><strong>${user.name}</strong> (${user.email}) submitted a question.</p>
<table style="border-collapse:collapse;width:100%;margin:16px 0">
<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Title</td><td style="padding:6px 12px;border:1px solid #ddd">${title}</td></tr>
<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold">Category</td><td style="padding:6px 12px;border:1px solid #ddd">${category}</td></tr>
</table>
<p style="background:#f5f5f5;padding:12px;border-radius:4px">${body}</p>
<p><a href="${siteUrl}/admin/questions" style="background:#0070f3;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block">Review in Admin Panel</a></p>`,
        });
      }
    } catch {
      // Email optional
    }

    return NextResponse.json({ success: true, message: "Question submitted! Our analysts will review it." });
  } catch (error) {
    console.error("Error submitting question:", error);
    return NextResponse.json({ error: "Failed to submit question." }, { status: 500 });
  }
}
