"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });

      const payload: { error?: string; success?: boolean } =
        await response.json();

      if (!response.ok || !payload.success) {
        setState("error");
        setMessage(payload.error ?? "Could not send message. Please try again.");
        return;
      }

      form.reset();
      setState("success");
      setMessage("Thanks. Your message has been sent.");
    } catch {
      setState("error");
      setMessage("Could not send message. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="site-card mt-6 grid gap-4">
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />
      <label className="grid gap-1">
        <span className="font-medium text-[var(--text)]">Name</span>
        <input
          name="name"
          required
          className="rounded-md border border-[var(--border)] bg-white px-3 py-2"
        />
      </label>
      <label className="grid gap-1">
        <span className="font-medium text-[var(--text)]">Email</span>
        <input
          name="email"
          type="email"
          required
          className="rounded-md border border-[var(--border)] bg-white px-3 py-2"
        />
      </label>
      <label className="grid gap-1">
        <span className="font-medium text-[var(--text)]">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          className="rounded-md border border-[var(--border)] bg-white px-3 py-2"
        />
      </label>
      <button type="submit" className="primary-button w-fit" disabled={state === "loading"}>
        {state === "loading" ? "Sending..." : "Send message"}
      </button>
      {message ? (
        <p
          role="status"
          className={state === "error" ? "text-red-700" : "text-[var(--text)]"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
