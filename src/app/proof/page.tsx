import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proof",
  description:
    "Selected projects and experience signals across enterprise IT, public sector, and education.",
};

const projects = [
  {
    name: "Workflow Follow-Up Assistant",
    problem: "Repeated client follow-ups were being tracked manually in inboxes.",
    solution:
      "Built a lightweight automation to detect status changes and send reminder prompts at the right intervals.",
    tools: "Make, Google Workspace, structured templates",
  },
  {
    name: "Operations Tracker Hub",
    problem: "Team updates were spread across spreadsheets and chat threads.",
    solution:
      "Created an internal dashboard view with form-based updates and simple status rollups for managers.",
    tools: "Notion API, Airtable, custom logic scripts",
  },
  {
    name: "Internal FAQ Bot Prototype",
    problem: "Staff asked repeat process questions with inconsistent answers.",
    solution:
      "Designed a document-based FAQ assistant to answer routine internal queries and link to source SOPs.",
    tools: "OpenAI API, vector search, documentation workflows",
  },
];

const experience = [
  {
    title: "NHS and Local Government",
    text: "Worked in high-accountability environments where reliability, process clarity, and communication are essential.",
  },
  {
    title: "Universities and Education",
    text: "Supported teams with systems, training, and adoption-focused documentation across varied stakeholders.",
  },
  {
    title: "Saudi and UK Environments",
    text: "Experience across two regions with different operational contexts, expectations, and delivery constraints.",
  },
];

export default function ProofPage() {
  return (
    <section className="site-section">
      <div className="site-container">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Proof
        </h1>
        <p className="mt-4 max-w-3xl text-lg">
          Credibility signals through practical project examples and delivery
          environments.
        </p>

        <h2 className="mt-9 text-2xl font-semibold">Project snapshots</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.name} className="site-card">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="mt-3">
                <strong className="text-[var(--text)]">Problem:</strong>{" "}
                {project.problem}
              </p>
              <p>
                <strong className="text-[var(--text)]">Solution:</strong>{" "}
                {project.solution}
              </p>
              <p>
                <strong className="text-[var(--text)]">Tools:</strong>{" "}
                {project.tools}
              </p>
            </article>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Experience summary</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {experience.map((item) => (
            <article key={item.title} className="site-card">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2">{item.text}</p>
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
