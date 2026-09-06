import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    const review = db
      .prepare("SELECT id FROM submitted_reviews WHERE verification_token = ? AND status = 'pending_verification'")
      .get(token) as { id: string } | undefined;

    if (!review) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 404 });
    }

    db.prepare(
      "UPDATE submitted_reviews SET status = 'pending', verified_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE verification_token = ?"
    ).run(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying review:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
