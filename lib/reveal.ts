// ---------------------------------------------------------------------------
// Time-based drip reveal
// The hero (section 1) is always live. Each timestamp below unlocks the NEXT
// section at that exact IST moment, so the site visibly fills in over the day.
// Schedule: ~70% revealed across today, the rest completing tomorrow evening.
// Order matches the section order in app/page.tsx. Edit freely to re-pace.
// ---------------------------------------------------------------------------

// Section order matches app/page.tsx (section 1 = hero, always live). The footer
// (Closing) is structural chrome rendered outside this array — it is never gated.
// All timestamps below are in the past, so the full homepage shows now; edit/re-date
// them only if you want to stage another drip launch.
const UNLOCKS_IST: string[] = [
  "2026-05-28T09:00", // 2  stats
  "2026-05-28T13:30", // 3  process
  "2026-05-28T15:00", // 4  services
  "2026-05-28T16:30", // 5  results
  "2026-05-28T18:00", // 6  proof (calls booked daily)
  "2026-05-28T19:30", // 7  testimonials
  "2026-05-28T21:00", // 8  founder
  "2026-05-28T22:30", // 9  roi
  "2026-05-29T11:00", // 10 pricing
  "2026-05-29T15:00", // 11 faqs
  "2026-05-29T18:30", // 12 contact
];

/** How many sections are unlocked right now (hero always counts), capped at `total`. */
export function revealedCount(total: number, now: Date = new Date()): number {
  const t = now.getTime();
  let passed = 0;
  for (const stamp of UNLOCKS_IST) {
    if (Date.parse(`${stamp}:00+05:30`) <= t) passed += 1;
    else break; // timestamps are ordered — stop at the first future unlock
  }
  return Math.min(total, 1 + passed);
}

/** Milliseconds until the next IST midnight (kept for optional reveal UI). */
export function msToNextIstMidnight(now: number = Date.now()): number {
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
  const istNow = now + IST_OFFSET_MS;
  const dayMs = 86_400_000;
  return Math.ceil(istNow / dayMs) * dayMs - istNow;
}
