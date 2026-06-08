"use client";

import { useMemo, useState } from "react";
import { Orb } from "@/components/ui/Orb";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { roi } from "@/lib/content";

const money = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-US");

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <label className="text-sm text-white/90">{label}</label>
      <input
        type="range"
        className="gold-range mt-3 w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, #d8a85c ${pct}%, #2a2a2a ${pct}%)`,
        }}
      />
      <div className="mt-1.5 text-right text-sm font-medium text-muted">{suffix}</div>
    </div>
  );
}

export function RoiCalculator() {
  const [calls, setCalls] = useState(roi.defaults.calls);
  const [price, setPrice] = useState(roi.defaults.price);
  const [closeRate, setCloseRate] = useState(roi.defaults.closeRate);

  const { withUs, gap } = useMemo(() => {
    const current = calls * price * (closeRate / 100);
    const potentialCalls = calls * 2 + 8;
    const potentialClose = Math.min(closeRate + 10, 70);
    const withUs = potentialCalls * price * (potentialClose / 100);
    return { current, withUs, gap: Math.max(withUs - current, 0) };
  }, [calls, price, closeRate]);

  return (
    <section id="roi" className="relative px-4 py-24">
      <Orb variant="glow" size={460} className="-right-44 bottom-0" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading
          center
          eyebrow={roi.eyebrow}
          title={
            <>
              {roi.title[0]}
              <br />
              {roi.title[1]}
            </>
          }
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="card p-7 sm:p-9">
            <div className="space-y-7">
              <Slider
                label={roi.ranges.calls.label}
                value={calls}
                min={roi.ranges.calls.min}
                max={roi.ranges.calls.max}
                step={roi.ranges.calls.step}
                suffix={`${calls}`}
                onChange={setCalls}
              />
              <Slider
                label={roi.ranges.price.label}
                value={price}
                min={roi.ranges.price.min}
                max={roi.ranges.price.max}
                step={roi.ranges.price.step}
                suffix={money(price)}
                onChange={setPrice}
              />
              <Slider
                label={roi.ranges.closeRate.label}
                value={closeRate}
                min={roi.ranges.closeRate.min}
                max={roi.ranges.closeRate.max}
                step={roi.ranges.closeRate.step}
                suffix={`${closeRate}%`}
                onChange={setCloseRate}
              />
            </div>

            <div className="mt-8 border-t border-line pt-7">
              <p className="text-2xl font-semibold leading-snug sm:text-[28px]">
                You could be closing{" "}
                <span className="text-gold-gradient">{money(withUs)}/month</span>.
              </p>
              <p className="mt-2 text-muted">
                That&apos;s around <span className="text-white">{money(gap)}/month</span> in untapped
                revenue Pollinext can help you capture.
              </p>
              <a href={roi.cta.href} className="btn-gold mt-7 block w-full py-4 text-center">
                {roi.cta.label}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
