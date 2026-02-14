import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Qasim builds small AI-powered automations and internal tools for practical business operations.",
};

const serviceCards = [
  {
    title: "AI Automations",
    text: "Automate repetitive communication and updates so teams spend less time on manual admin.",
  },
  {
    title: "Internal Tools and Mini Apps",
    text: "Build simple dashboards, trackers, and portals that match your current workflow.",
  },
  {
    title: "Websites and Digital Systems",
    text: "Create clear websites and lead capture systems that support business growth.",
  },
];

export default function Home() {
  return (
    <>
      <section className="site-section">
        <div className="site-container">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            I build small AI-powered automations and internal tools that reduce
            admin and speed up operations.
          </h1>
          <p className="mt-5 max-w-2xl text-lg">
            I work with SMEs, founders, and operations teams to remove manual
            bottlenecks using practical systems that fit how people already
            work.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/contact" className="primary-button">
              Contact me
            </Link>
            <Link href="/proof" className="secondary-link">
              See what I build
            </Link>
          </div>
        </div>
      </section>

      <section className="site-section border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="site-container">
          <h2 className="text-2xl font-semibold">Services at a glance</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((card) => (
              <article key={card.title} className="site-card">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <h2 className="text-2xl font-semibold">Experience signals</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="site-card !py-2">NHS</span>
            <span className="site-card !py-2">Local Government</span>
            <span className="site-card !py-2">Universities and Education</span>
            <span className="site-card !py-2">UK and Saudi Arabia</span>
          </div>
        </div>
      </section>
    </>
  );
}
