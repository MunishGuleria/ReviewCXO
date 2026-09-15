import { NextRequest } from "next/server";
import db from "@/lib/db";
import { checkAdminAuth } from "@/lib/admin-auth";
import { getVisibleVendors } from "@/lib/vendors";

export async function GET(request: NextRequest) {
  const authError = await checkAdminAuth(request);
  if (authError) return authError;

  try {
    const visibleNames = getVisibleVendors().map((v) => v.name);
    const placeholders = visibleNames.map(() => "?").join(",");
    const pending = db
      .prepare(`SELECT * FROM submitted_reviews WHERE status = 'pending' AND it_company_name IN (${placeholders}) ORDER BY created_at DESC`)
      .all(...visibleNames);
    return Response.json(pending);
  } catch (error) {
    console.error("Error fetching pending reviews:", error);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
