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
    db.prepare(
      "UPDATE submitted_reviews SET status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).run(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error approving review:", error);
    return Response.json({ error: "Failed to approve" }, { status: 500 });
  }
}
