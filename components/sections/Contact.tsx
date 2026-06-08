"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Mail, CalendarClock } from "lucide-react";
import { IgIcon } from "@/components/ui/Social";
import { Orb } from "@/components/ui/Orb";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, brand } from "@/lib/content";

const cardIcons = { mail: Mail, call: CalendarClock, dm: IgIcon } as const;

// Web3Forms access key (free, unlimited submissions). Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
// in the environment to enable backend email delivery; without it the form falls back to
// opening the visitor's mail client so it is never broken.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export function Contact({ showHeading = true }: { showHeading?: boolean } = {}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [role, setRole] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const f = contact.form;

  // Careers pages link here as /contact?role=<role>; prefill the form so the
  // applicant — and Jathin's inbox — start with the role already in context.
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("role");
    if (r) {
      setRole(r);
      setMessage(`Hi! I'd like to apply for the ${r} role.\n\nA bit about me:\n`);
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields, humans never do. Silently accept and drop.
    if (data.get("botcheck")) {
      setStatus("success");
      return;
    }

    const subject = role
      ? `Application — ${role} — ${data.get("name") || "website"}`
      : `New enquiry from ${data.get("name") || "website"}`;

    // No backend key configured → fall back to the visitor's mail client.
    if (!WEB3FORMS_KEY) {
      const body = `Name: ${data.get("name")}\nBrand: ${data.get("company")}\nEmail: ${data.get(
        "email"
      )}\n\n${data.get("message")}`;
      window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: "Pollinext Website",
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          role: role ?? "",
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative px-4 py-24">
      <Orb variant="glow" size={420} className="-left-44 top-20" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          {showHeading && <SectionHeading eyebrow={contact.eyebrow} title={contact.title} />}
          <div className={`${showHeading ? "mt-10" : ""} flex flex-col gap-3`}>
            {contact.cards.map((c) => {
              const Icon = cardIcons[c.type as keyof typeof cardIcons] ?? Mail;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  className="card flex items-center gap-4 p-5 transition-colors hover:border-line-strong"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-gold">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="font-medium">{c.label}</p>
                    <p className="text-sm text-muted">{c.value}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="card p-6 sm:p-8">
            {/* honeypot — hidden from humans, catches bots */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            {role && (
              <div className="gold-soft mb-6 rounded-xl px-4 py-3 text-sm leading-relaxed">
                You&apos;re applying for the{" "}
                <span className="font-semibold text-gold">{role}</span> role. Fill in your details
                and we&apos;ll be in touch.
              </div>
            )}
            <div className="space-y-5">
              <Field label={f.name.label} name="name" placeholder={f.name.placeholder} />
              <Field label={f.company.label} name="company" placeholder={f.company.placeholder} />
              <Field
                label={f.email.label}
                name="email"
                type="email"
                placeholder={f.email.placeholder}
              />
              <div>
                <label className="mb-2 block text-sm text-white/90">{f.message.label}</label>
                <textarea
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={f.message.placeholder}
                  className="w-full resize-none rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-white placeholder:text-dim focus:border-gold/50 focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-gold mt-6 w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? "Sending…" : status === "success" ? "Sent ✓" : f.submit}
            </button>
            {status === "success" && (
              <p className="mt-3 text-center text-sm text-muted">
                {WEB3FORMS_KEY
                  ? "Thanks — your message is on its way. We'll be in touch shortly."
                  : "Opening your mail app to send…"}
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-center text-sm text-red-400">
                Something went wrong. Please email us at {brand.email} instead.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/90">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-white placeholder:text-dim focus:border-gold/50 focus:outline-none"
      />
    </div>
  );
}
