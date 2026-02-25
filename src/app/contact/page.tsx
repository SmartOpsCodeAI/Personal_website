import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Qasim for practical AI automations, internal tools, and lightweight business systems.",
};

export default function ContactPage() {
  return (
    <section className="site-section">
      <div className="site-container max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Contact
        </h1>
        <p className="mt-4 text-lg">
          Tell me what you are trying to automate and I will suggest a practical
          approach.
        </p>

        <ContactForm />

        <p className="mt-6 text-sm">
          Prefer email? Contact me directly at{" "}
          <a className="secondary-link" href="mailto:qasimb2014@gmail.com">
            qasimb2014@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
