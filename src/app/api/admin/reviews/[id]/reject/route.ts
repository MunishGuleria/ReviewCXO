import { NextRequest } from "next/server";
import db from "@/lib/db";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const { reason } = await request.json();
    db.prepare(
      "UPDATE submitted_reviews SET status = 'rejected', admin_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).run(reason || "No reason provided", id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error rejecting review:", error);
    return Response.json({ error: "Failed to reject" }, { status: 500 });
  }
}
