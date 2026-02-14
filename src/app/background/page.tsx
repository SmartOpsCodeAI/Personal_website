import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Background",
  description:
    "Professional background across IT, training, and systems with a current focus on AI automation.",
};

export default function BackgroundPage() {
  return (
    <section className="site-section">
      <div className="site-container">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Background
        </h1>
        <p className="mt-5 max-w-3xl text-lg">
          My path has been IT, training, and systems work in enterprise and
          public-facing environments. That background shapes how I approach AI
          automation today: calm delivery, clear documentation, and practical
          adoption.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="site-card">
            <h2 className="text-xl font-semibold">Reliability under pressure</h2>
            <p className="mt-2">
              I have worked in settings where uptime, process consistency, and
              accountability matter. The focus is always dependable execution.
            </p>
          </article>
          <article className="site-card">
            <h2 className="text-xl font-semibold">Documentation and adoption</h2>
            <p className="mt-2">
              Building is only part of delivery. I prioritize clear handover,
              training, and simple guidance so teams can confidently use what is
              implemented.
            </p>
          </article>
          <article className="site-card">
            <h2 className="text-xl font-semibold">UK and Saudi experience</h2>
            <p className="mt-2">
              Cross-region work has strengthened my ability to adapt to
              different working cultures, communication styles, and operational
              expectations.
            </p>
          </article>
          <article className="site-card">
            <h2 className="text-xl font-semibold">Current focus</h2>
            <p className="mt-2">
              I currently focus on small AI automations and internal tools that
              remove repetitive admin and improve operational flow.
            </p>
          </article>
        </div>

        <div className="mt-10">
          <Link href="/contact" className="primary-button">
            Contact me
          </Link>
        </div>
      </div>
    </section>
  );
}
