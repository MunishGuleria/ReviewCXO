import { NextResponse } from "next/server";
import { subscribeToNewsletter, isEmailSubscribed } from "@/lib/db-queries";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid enterprise email address." },
        { status: 400 }
      );
    }

    if (isEmailSubscribed(email)) {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 409 }
      );
    }

    const success = subscribeToNewsletter(email);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Subscription confirmed. You will receive the next quarterly research dispatch.",
      });
    } else {
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload. Please submit a valid JSON body with an enterprise email." },
      { status: 400 }
    );
  }
}
