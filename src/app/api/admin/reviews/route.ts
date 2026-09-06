import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const pending = db
      .prepare("SELECT * FROM submitted_reviews WHERE status = 'pending' ORDER BY created_at DESC")
      .all();
    return NextResponse.json(pending);
  } catch (error) {
    console.error("Error fetching pending reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
