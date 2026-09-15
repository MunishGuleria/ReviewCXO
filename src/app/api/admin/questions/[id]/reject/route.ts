import { NextRequest } from "next/server";
import db from "@/lib/db";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await checkAdminAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    db.prepare("DELETE FROM submitted_questions WHERE id = ?").run(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error rejecting question:", error);
    return Response.json({ error: "Failed to reject" }, { status: 500 });
  }
}
