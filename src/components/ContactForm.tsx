"use client";

import { useState } from "react";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "done" | "error";

/**
 * The one form. Posts JSON to /api/contact with JavaScript, or a plain form
 * post without it (same endpoint, 303 to /thanks). The failure path never
 * lies: if sending is not configured or errors, the visitor sees the real
 * email address and their message stays on the screen.
 */
export default function ContactForm({ preset = "" }: { preset?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof json.error === "string" ? json.error : `Something went wrong on our end. Email ${site.email} instead.`);
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError(`Something went wrong on our end. Email ${site.email} instead.`);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-teal/40 bg-coal p-8" role="status">
        <p className="display text-3xl text-white">Got it.</p>
        <p className="mt-3 text-chalk">We read every one. You will hear back from a person.</p>
      </div>
    );
  }

  return (
    <form action="/api/contact" method="post" onSubmit={onSubmit} className="grid gap-5">
      {/* Honeypot. Real people never see it; bots fill it and are quietly dropped. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="kicker block text-chalk">
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className="field mt-2" />
        </div>
        <div>
          <label htmlFor="email" className="kicker block text-chalk">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field mt-2" />
        </div>
      </div>

      <fieldset>
        <legend className="kicker text-chalk">I am a</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Student", "Athlete", "Parent", "Coach or teacher", "School or organization", "Other"].map((who) => (
            <label key={who} className="inline-flex min-h-12 cursor-pointer items-center gap-2 border border-chalk/25 px-4 py-2 text-chalk has-checked:border-teal has-checked:bg-teal/10 has-checked:text-white">
              <input type="radio" name="who" value={who} defaultChecked={preset ? who === preset : who === "Student"} className="accent-teal" />
              {who}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="kicker block text-chalk">
          What do you need
        </label>
        <textarea id="message" name="message" required rows={5} className="field mt-2" placeholder="A talk for my team. Wristbands for the locker room. A question. Anything." />
      </div>

      {status === "error" ? (
        <p role="alert" className="border border-white/30 bg-coal p-4 text-white">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-teal disabled:opacity-60">
          {status === "sending" ? "Sending" : "Send it"}
        </button>
        <p className="text-sm text-ash">
          Or email{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
