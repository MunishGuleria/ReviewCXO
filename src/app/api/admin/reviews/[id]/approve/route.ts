import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    db.prepare(
      "UPDATE submitted_reviews SET status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error approving review:", error);
    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }
}
