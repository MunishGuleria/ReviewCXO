import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { reason } = await request.json();
    db.prepare(
      "UPDATE submitted_reviews SET status = 'rejected', admin_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).run(reason || "No reason provided", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error rejecting review:", error);
    return NextResponse.json({ error: "Failed to reject" }, { status: 500 });
  }
}
