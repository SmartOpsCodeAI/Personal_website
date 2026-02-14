import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business-first services: AI automations, internal tools, and websites that reduce admin work.",
};

const services = [
  {
    title: "1. AI Automations",
    problem:
      "Teams lose hours each week to repetitive messages, manual summaries, and follow-up tasks.",
    build: [
      "Email to spreadsheet or CRM updates",
      "Document and email summarisation",
      "Auto reminders and follow-ups",
      "AI FAQ bots from internal documents",
    ],
    outcome:
      "Less admin, faster response times, and clearer visibility across ongoing work.",
  },
  {
    title: "2. Internal Tools and Mini Apps",
    problem:
      "Operational information often lives across disconnected files and chats, making tracking difficult.",
    build: [
      "Dashboards and trackers",
      "Client or staff portals (read-only)",
      "Forms with approval flows",
      "Ops hubs for tasks, notes, and SOPs",
    ],
    outcome:
      "More consistent execution, easier reporting, and fewer process gaps.",
  },
  {
    title: "3. Websites and Digital Systems",
    problem:
      "Many businesses have websites that do not convert traffic into meaningful enquiries.",
    build: [
      "Business websites (Framer or WordPress)",
      "Landing pages",
      "Lead capture and analytics setup",
    ],
    outcome:
      "Clearer messaging, better lead quality, and simpler digital handoff into operations.",
  },
];

export default function ServicesPage() {
  return (
    <section className="site-section">
      <div className="site-container">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Services
        </h1>
        <p className="mt-4 max-w-3xl text-lg">
          Practical work focused on outcomes, not complexity.
        </p>

        <div className="mt-8 grid gap-5">
          {services.map((item) => (
            <article key={item.title} className="site-card">
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <div className="mt-4 grid gap-3">
                <div>
                  <h3 className="font-semibold text-[var(--text)]">Problem solved</h3>
                  <p>{item.problem}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text)]">What is built</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--muted)]">
                    {item.build.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text)]">
                    Outcome for the client
                  </h3>
                  <p>{item.outcome}</p>
                </div>
              </div>
            </article>
          ))}
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
