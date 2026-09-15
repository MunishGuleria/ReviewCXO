import { NextRequest } from "next/server";
import db from "@/lib/db";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const authError = await checkAdminAuth(request);
  if (authError) return authError;

  try {
    const pending = db
      .prepare("SELECT * FROM submitted_questions WHERE status = 'pending' ORDER BY created_at DESC")
      .all();
    return Response.json(pending);
  } catch (error) {
    console.error("Error fetching pending questions:", error);
    return Response.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
