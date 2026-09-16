import { NextResponse } from "next/server";
import supabase from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    const { data: review } = await supabase
      .from("submitted_reviews")
      .select("id")
      .eq("verification_token", token)
      .eq("status", "pending_verification")
      .single();

    if (!review) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 404 });
    }

    await supabase
      .from("submitted_reviews")
      .update({
        status: "pending",
        verified_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("verification_token", token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying review:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
