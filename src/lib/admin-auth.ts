import { NextRequest, NextResponse } from "next/server";

export function checkAdminAuth(request: NextRequest): NextResponse | null {
  const expectedToken = process.env.ADMIN_AUTH_TOKEN;
  const authCookie = request.cookies.get("admin_auth")?.value;
  const authHeader = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || request.headers.get("x-admin-token");
  const providedToken = authCookie || authHeader;

  // Never allow access if ADMIN_AUTH_TOKEN is unset or empty, or if no valid token was provided
  const isAdmin = Boolean(
    expectedToken &&
    expectedToken.trim().length > 0 &&
    providedToken &&
    providedToken === expectedToken
  );

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

