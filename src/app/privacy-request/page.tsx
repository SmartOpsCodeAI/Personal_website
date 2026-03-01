import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Requests",
  description:
    "Submit data access, correction, deletion, and related privacy requests.",
};

export default function PrivacyRequestPage() {
  const privacyEmail = process.env.CONTACT_TO_EMAIL ?? "qasimb2014@gmail.com";
  const mailToHref = `mailto:${privacyEmail}?subject=Privacy%20Request`;

  return (
    <section className="site-section">
      <div className="site-container max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Requests
        </h1>
        <p className="mt-4 text-lg">
          You can request access, correction, deletion, portability, or object to
          processing by contacting us directly.
        </p>

        <article className="site-card mt-6">
          <h2 className="text-2xl font-semibold">How to submit a request</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--muted)]">
            <li>Email your request to the address below.</li>
            <li>
              Include enough information to verify your identity and locate the
              relevant records.
            </li>
            <li>
              State the request type clearly (for example: access, deletion,
              correction).
            </li>
          </ol>
          <p className="mt-4">
            Contact:{" "}
            <a className="secondary-link underline" href={mailToHref}>
              {privacyEmail}
            </a>
          </p>
          <p className="mt-3 text-sm">
            Response target: within 30 days where applicable, subject to legal
            allowances and identity verification.
          </p>
        </article>
      </div>
    </section>
  );
}
