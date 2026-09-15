import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  const token = request.headers.get("cookie")?.match(/auth_token=([^;]+)/)?.[1];
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user });
}
