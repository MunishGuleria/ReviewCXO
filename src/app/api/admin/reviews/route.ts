import { NextRequest } from "next/server";
import db from "@/lib/db";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const authError = checkAdminAuth(request);
  if (authError) return authError;

  try {
    const pending = db
      .prepare("SELECT * FROM submitted_reviews WHERE status = 'pending' ORDER BY created_at DESC")
      .all();
    return Response.json(pending);
  } catch (error) {
    console.error("Error fetching pending reviews:", error);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
