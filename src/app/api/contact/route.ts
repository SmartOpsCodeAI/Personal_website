import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  privacyAccepted?: boolean;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const ipRequestLog = new Map<string, number[]>();
const noStoreHeaders = { "Cache-Control": "no-store" };

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

  if (payload.privacyAccepted !== true) {
    return "Please accept the privacy notice.";
  }

  if (payload.name.trim().length > MAX_NAME_LENGTH) {
    return "Name is too long.";
  }

  if (payload.email.trim().length > MAX_EMAIL_LENGTH) {
    return "Email is too long.";
  }

  if (payload.message.trim().length > MAX_MESSAGE_LENGTH) {
    return "Message is too long.";
  }

  return null;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  return realIp ? realIp.trim() : "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const history = ipRequestLog.get(ip) ?? [];
  const recentHistory = history.filter((timestamp) => timestamp > windowStart);

  if (recentHistory.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequestLog.set(ip, recentHistory);
    return true;
  }

  recentHistory.push(now);
  ipRequestLog.set(ip, recentHistory);
  return false;
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            ...noStoreHeaders,
            "Retry-After": "600",
          },
        },
      );
    }

    const payload = (await request.json()) as ContactPayload;
    const validationError = validate(payload);

    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400, headers: noStoreHeaders },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      return NextResponse.json(
        {
          error:
            "Contact form is not configured yet. Please email qasimb2014@gmail.com .",
        },
        { status: 500, headers: noStoreHeaders },
      );
    }

    const trimmedName = payload.name?.trim();
    const trimmedEmail = payload.email?.trim();
    const trimmedMessage = payload.message?.trim();

    const content = [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      "",
      "Message:",
      trimmedMessage,
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
        reply_to: trimmedEmail,
        subject: `Website enquiry from ${trimmedName}`,
        text: content,
      }),
    });

    if (!resendResponse.ok) {
      return NextResponse.json(
        { error: "Email delivery failed. Please try again later." },
        { status: 502, headers: noStoreHeaders },
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200, headers: noStoreHeaders },
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400, headers: noStoreHeaders },
    );
  }
}
