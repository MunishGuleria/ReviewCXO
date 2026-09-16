import { NextRequest } from "next/server";
import supabase from "@/lib/db";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const authError = await checkAdminAuth(request);
  if (authError) return authError;

  try {
    const { data: pending } = await supabase
      .from("submitted_questions")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });
    return Response.json(pending || []);
  } catch (error) {
    console.error("Error fetching pending questions:", error);
    return Response.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
