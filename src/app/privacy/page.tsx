import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy notice, cookie practices, and data rights information for Qasim B. website visitors.",
};

const LAST_REVIEWED = "March 1, 2026";

export default function PrivacyPage() {
  const privacyEmail = process.env.CONTACT_TO_EMAIL ?? "qasimb2014@gmail.com";

  return (
    <section className="site-section">
      <div className="site-container max-w-4xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy Notice
        </h1>
        <p className="mt-4 text-lg">
          This notice explains what personal data is collected on qasimb.dev and
          how it is used.
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Last reviewed: {LAST_REVIEWED}
        </p>

        <div className="mt-8 grid gap-6">
          <article className="site-card">
            <h2 className="text-2xl font-semibold">Controller and contact</h2>
            <p className="mt-3">
              Controller: Qasim B. For privacy questions, email{" "}
              <a className="secondary-link underline" href={`mailto:${privacyEmail}`}>
                {privacyEmail}
              </a>
              .
            </p>
          </article>

          <article className="site-card">
            <h2 className="text-2xl font-semibold">Data we collect</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-[var(--muted)]">
              <li>Contact details you submit (name, email, and message).</li>
              <li>Technical usage data through optional analytics cookies.</li>
            </ul>
          </article>

          <article className="site-card">
            <h2 className="text-2xl font-semibold">Why we process data</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-[var(--muted)]">
              <li>Responding to enquiries and business communication.</li>
              <li>Operating and improving website performance and reliability.</li>
              <li>Maintaining website security and abuse prevention.</li>
            </ul>
            <p className="mt-3">
              Where required by law, analytics processing is based on consent.
              Enquiry handling is based on legitimate interests and pre-contract
              communication.
            </p>
          </article>

          <article className="site-card" id="cookies">
            <h2 className="text-2xl font-semibold">Cookies and tracking</h2>
            <p className="mt-3">
              Essential cookies are always enabled for basic site functionality.
              Analytics cookies are optional and only enabled after your choice.
            </p>
            <p className="mt-3">
              You can change your selection at any time using the{" "}
              <strong className="text-[var(--text)]">Cookie settings</strong>{" "}
              button shown on the website.
            </p>
          </article>

          <article className="site-card">
            <h2 className="text-2xl font-semibold">Retention</h2>
            <p className="mt-3">
              Contact enquiries are retained for up to 12 months from the latest
              relevant interaction, unless a longer period is required for legal
              or contractual reasons.
            </p>
          </article>

          <article className="site-card">
            <h2 className="text-2xl font-semibold">Your rights</h2>
            <p className="mt-3">
              Depending on location, you may request access, correction, deletion,
              portability, objection/restriction, and withdrawal of consent.
            </p>
            <p className="mt-3">
              Use the{" "}
              <Link href="/privacy-request" className="secondary-link underline">
                privacy request page
              </Link>{" "}
              to submit a rights request.
            </p>
          </article>

          <article className="site-card">
            <h2 className="text-2xl font-semibold">Processors and transfers</h2>
            <p className="mt-3">
              Key service providers include Vercel (hosting/analytics), Google
              Analytics (optional), and Resend (contact email delivery).
            </p>
            <p className="mt-3">
              Some providers may process data outside your country. Appropriate
              safeguards are used where required.
            </p>
          </article>

          <article className="site-card">
            <h2 className="text-2xl font-semibold">Children</h2>
            <p className="mt-3">
              This website is intended for business and professional audiences and
              is not directed to children under 13.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
