import type { Metadata } from "next";
import { Plus, Pencil, Minus, Wrench, Clock } from "lucide-react";
import { SitePage } from "@/components/ui/SitePage";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { changelog, type ChangeType } from "@/lib/pages";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's changed on the Pollinext website, newest first.",
  alternates: { canonical: "/changelog" },
};

const meta: Record<ChangeType, { Icon: typeof Plus; label: string; cls: string }> = {
  added: { Icon: Plus, label: "Added", cls: "border-gold/40 bg-gold/10 text-gold" },
  changed: { Icon: Pencil, label: "Changed", cls: "border-white/15 bg-white/5 text-white/80" },
  removed: { Icon: Minus, label: "Removed", cls: "border-red-400/30 bg-red-400/10 text-red-300" },
  fixed: { Icon: Wrench, label: "Fixed", cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" },
};

export default function ChangelogPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Changelog"
        title="What's changed"
        subtitle="A running log of updates to the Pollinext website — newest first."
      >
        <a href={brand.bookingUrl} className="btn-gold px-6 py-3.5">
          Book a Call
        </a>
      </PageHero>

      <section className="relative px-4 pb-24">
        <div className="mx-auto max-w-3xl space-y-6">
          {changelog.map((entry) => (
            <Reveal key={entry.date + entry.title}>
              <article className="card-grad p-7 sm:p-9">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-xl font-semibold sm:text-2xl">{entry.title}</h2>
                  <time dateTime={entry.iso} className="text-sm text-dim">
                    {entry.date}
                  </time>
                </div>
                {entry.summary && (
                  <p className="mt-3 leading-relaxed text-muted">{entry.summary}</p>
                )}

                <ul className="mt-6 space-y-3">
                  {entry.changes.map((c, i) => {
                    const m = meta[c.type];
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${m.cls}`}
                        >
                          <m.Icon size={12} />
                          {m.label}
                        </span>
                        <span className="text-sm leading-relaxed text-white/85">{c.text}</span>
                      </li>
                    );
                  })}
                </ul>

                {entry.pending && entry.pending.length > 0 && (
                  <div className="mt-7 rounded-2xl border border-line bg-black/30 p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Clock size={15} className="text-gold" />
                      Pending / next up
                    </p>
                    <ul className="mt-3 space-y-2">
                      {entry.pending.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-dim">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/60" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </SitePage>
  );
}
