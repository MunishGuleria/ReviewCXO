import { NextRequest } from "next/server";
import supabase from "@/lib/db";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await checkAdminAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    await supabase
      .from("submitted_reviews")
      .update({ status: "approved", updated_at: new Date().toISOString() })
      .eq("id", id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error approving review:", error);
    return Response.json({ error: "Failed to approve" }, { status: 500 });
  }
}
