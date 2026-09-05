import { NextResponse } from "next/server";

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

    // In a production setup, this would push to an ESP (e.g. Resend, Mailchimp, Loops)
    console.log(`[Reviews_CXO Newsletter Signup] ${email} subscribed at ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      message: "Subscription confirmed. You will receive the next quarterly research dispatch.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload. Please submit a valid JSON body with an enterprise email." },
      { status: 400 }
    );
  }
}
