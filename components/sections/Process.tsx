import {
  Mail,
  Calendar,
  FileText,
  MessageSquare,
  Database,
  Users,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { Orb } from "@/components/ui/Orb";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { process } from "@/lib/content";

function Chip({ icon: Icon, gold = false }: { icon: typeof Mail; gold?: boolean }) {
  return (
    <span
      className={`grid h-14 w-14 place-items-center rounded-full border ${
        gold ? "border-gold/40 text-gold" : "border-line text-white/70"
      }`}
      style={gold ? { background: "radial-gradient(circle at 35% 30%, rgba(216,168,92,0.25), rgba(0,0,0,0))" } : { background: "#161616" }}
    >
      <Icon size={20} />
    </span>
  );
}

function OnboardingVisual() {
  return (
    <div className="rounded-2xl border border-line bg-black/40 p-5">
      <div className="flex flex-wrap gap-3">
        <Chip icon={Mail} gold />
        <Chip icon={MessageSquare} />
        <Chip icon={Calendar} />
        <Chip icon={FileText} />
        <Chip icon={Database} gold />
        <Chip icon={Users} />
      </div>
    </div>
  );
}

function DeployVisual() {
  const agents = ["Setter, live", "Closer, live", "Manager, QA"];
  return (
    <div className="relative rounded-2xl border border-line bg-black/40 p-5">
      <div className="flex flex-col gap-2.5">
        {agents.map((a, i) => (
          <div
            key={a}
            className="flex items-center justify-between rounded-xl border border-line bg-surface-2 px-3 py-2.5"
          >
            <span className="flex items-center gap-2.5 text-sm text-white/80">
              <span
                className="h-6 w-6 rounded-full"
                style={{ background: "linear-gradient(140deg,#ecd2a0,#a67c3b)" }}
              />
              {a}
            </span>
            <span className={`h-2 w-2 rounded-full ${i === 2 ? "bg-white/30" : "bg-gold"}`} />
          </div>
        ))}
      </div>
      <span className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-black text-gold">
        <RefreshCw size={18} />
      </span>
    </div>
  );
}

function OptimizeVisual() {
  const bars = [38, 52, 46, 64, 78, 92];
  return (
    <div className="rounded-2xl border border-line bg-black/40 p-5">
      <div className="mb-4 flex items-center gap-2 text-sm text-gold">
        <TrendingUp size={16} />
        <span className="font-medium">+38% close rate</span>
      </div>
      <div className="flex h-32 items-end gap-2.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md"
            style={{
              height: `${h}%`,
              background:
                i >= 4
                  ? "linear-gradient(180deg,#e6bd77,#a67c3b)"
                  : "#242424",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const visuals: Record<string, () => React.ReactNode> = {
  onboarding: OnboardingVisual,
  deploy: DeployVisual,
  optimize: OptimizeVisual,
};

export function Process() {
  return (
    <section id="process" className="relative px-4 py-24">
      <Orb variant="glow" size={420} className="-left-40 bottom-10" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow={process.eyebrow} title={process.title} />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {process.steps.map((step, i) => {
            const Visual = visuals[step.visual];
            return (
              <Reveal key={step.n} delay={i * 0.08}>
                <Spotlight className="card-grad flex h-full flex-col p-7 transition-transform duration-300 hover:-translate-y-1.5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-base font-bold text-black">
                    {step.n}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.body}</p>
                  <div className="mt-7">{Visual ? <Visual /> : null}</div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
