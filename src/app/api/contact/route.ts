import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(payload: ContactPayload): string | null {
  if (payload.company) {
    return "Invalid request.";
  }

  if (!payload.name || payload.name.trim().length < 2) {
    return "Please provide your name.";
  }

  if (!payload.email || !EMAIL_REGEX.test(payload.email.trim())) {
    return "Please provide a valid email address.";
  }

  if (!payload.message || payload.message.trim().length < 10) {
    return "Please provide a short message with enough detail.";
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const validationError = validate(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL;

      console.log("ENV CHECK:", {
      apiKeyExists: !!apiKey,
      fromEmail,
      toEmail,
    });

    if (!apiKey || !fromEmail || !toEmail) {
      return NextResponse.json(
        {
          error:
            "Contact form is not configured yet. Please email qasimb2014@gmail.com .",
        },
        { status: 500 },
      );
    }

    const content = [
      `Name: ${payload.name?.trim()}`,
      `Email: ${payload.email?.trim()}`,
      "",
      "Message:",
      payload.message?.trim(),
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: payload.email?.trim(),
        subject: `Website enquiry from ${payload.name?.trim()}`,
        text: content,
      }),
    });

      if (!resendResponse.ok) {
          const errorText = await resendResponse.text();
          console.log("RESEND ERROR:", resendResponse.status, errorText);

          return NextResponse.json(
            { error: "Email delivery failed.", details: errorText },
            { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 },
    );
  }
}
