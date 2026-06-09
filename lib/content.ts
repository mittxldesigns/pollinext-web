/* ============================================================================
   Pollinext — site content
   Single source of truth for all copy. Edit here to update the whole site.
   ========================================================================== */

// Update this to the custom domain once it's live (used for metadata, OG, sitemap, JSON-LD).
export const siteUrl = "https://pollinext.vercel.app";

export const brand = {
  name: "Pollinext",
  tagline: "Done-for-you appointment setting, DM closing & AI sales systems.",
  email: "jathinvm@pollinext.com",
  bookingUrl: "/contact",
  instagram: "https://instagram.com/pollinext",
  linkedin: "#",
  twitter: "#",
  youtube: "#",
};

export const nav = {
  // Order per client spec: About · Results · Services · Careers · Book a Call.
  // "How it Works" was removed — its content now lives on the Services page.
  // "Results" points at the testimonials/results page (client proof + video reviews).
  links: [
    { label: "About", href: "/aboutus" },
    { label: "Results", href: "/testimonials" },
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/career-setters" },
  ],
  cta: { label: "Book a Call", href: "/contact" },
};

export const hero = {
  microQuote: "Generated over $1 Million in sales across all our clients.",
  microAuthor: { name: "Gilad Hanina", role: "Founder & CEO, AOS Media" },
  title: ["Fill Your Calendar.", "Close More Deals."],
  subtitle:
    "We help coaches, consultants and service providers scale revenue with done-for-you appointment setting and DM closing — so you stay focused on delivering results while we handle your pipeline.",
  primaryCta: { label: "Book a Call", href: "/contact" },
  secondaryCta: { label: "Explore Services", href: "/services" },
  // Right-side hero video (gold-glow frame). Swap in the real showreel when ready by
  // changing `youtubeId` (video id) or `mp4` (hosted file). Until then it points at a real
  // client testimonial (the one quoted above), opening on YouTube — never the contact form.
  video: {
    youtubeId: "Y81wwsnGAnI", // Gilad Hanina (AOS Media) — the testimonial quoted in the hero
    mp4: "",
    poster: "/testi/gilad.webp",
    label: "Watch: $1M+ generated for clients",
  },
};

// NOTE: the "As featured in" press band (and its <Trust/> component) was removed from
// the homepage per the client spec (Delete section) and replaced by the stats band
// below. The old press-logo data lives in git history if it's ever reinstated.

// Homepage stats band (replaces the press band, just under the hero).
export const homeStats = [
  { value: "$1M+", label: "Revenue generated for clients" },
  { value: "100+", label: "Niches & offers served" },
  { value: "24/7", label: "Always-on pipeline" },
];

export const process = {
  eyebrow: "Process",
  title: "How it works",
  steps: [
    {
      n: "1",
      title: "Deep-Dive Onboarding",
      body: "We map your offer, ideal client and brand voice, then plug straight into your CRM and channels.",
      visual: "onboarding",
    },
    {
      n: "2",
      title: "We Deploy Your Sales Team",
      body: "Trained setters and closers go live across DMs and channels, booking qualified calls in your name daily.",
      visual: "deploy",
    },
    {
      n: "3",
      title: "You Close, We Optimize",
      body: "Daily tracking, QA and data-driven tweaks compound your show rate and close rate week over week.",
      visual: "optimize",
    },
  ],
};

export const services = {
  eyebrow: "Services",
  title: "What We Offer",
  // first three render as the top row, last two as the wide bottom row
  items: [
    {
      key: "appointments",
      title: "Appointment Setting",
      body: "Omni-channel outreach that fills your calendar with qualified buyers and keeps your high-ticket pipeline on autopilot.",
      visual: "appointments",
    },
    {
      key: "insights",
      title: "Pipeline & Reporting",
      body: "Turn raw conversations into daily, actionable reporting — show rate, close rate and revenue, always visible.",
      visual: "insights",
    },
    {
      key: "dm",
      title: "DM Closing",
      body: "DM-to-sale systems for $100–$1,000+ offers. Closers handle nurturing, rapport and closing in your voice.",
      visual: "dm",
    },
    {
      key: "automation",
      title: "AI Sales Systems",
      body: "AI-driven outreach, follow-ups and scheduling that never let a qualified lead go cold.",
      visual: "automation",
    },
    {
      key: "integrations",
      title: "CRM & Omni-Channel",
      body: "Instagram, LinkedIn and email run as one coordinated motion — every lead researched, tagged and tracked.",
      visual: "integrations",
    },
  ],
};

export const results = {
  eyebrow: "Results",
  title: "Our Recent Work",
  cases: [
    {
      category: "Coaching",
      title: "How Achieve Greatness scaled from $10K to $50K/mo in 2 months",
      body: "We built and deployed a dedicated setting + closing team, rebuilt the follow-up system, and tracked every metric daily.",
      stats: [
        { value: "5×", label: "Monthly revenue" },
        { value: "2 mo", label: "To hit $50K/mo" },
      ],
      tint: "gold",
      image: "/proof/p4.png",
    },
    {
      category: "Agency",
      title: "How AOS Media generated $1M+ in sales across its clients",
      body: "An omni-channel appointment-setting engine kept high-ticket calendars full while closers converted in-brand.",
      stats: [
        { value: "$1M+", label: "Sales generated" },
        { value: "100%", label: "Done-for-you" },
      ],
      tint: "amber",
      image: "/proof/p1.png",
    },
    {
      category: "Fitness",
      title: "How Thoresen Fitness booked 3 high-ticket sales in week one",
      body: "From a standing start, we filled the calendar with qualified buyers and closed in the founder's voice.",
      stats: [
        { value: "0 → 3", label: "Closes in week 1" },
        { value: "7 days", label: "To first sale" },
      ],
      tint: "bronze",
      image: "/proof/p3.png",
    },
    {
      category: "Personal Brand",
      title: "How Digital Dukaandhar turned attention into predictable sales",
      body: "We engineered a DM-to-call system that converted an engaged audience into booked, qualified sales calls.",
      stats: [
        { value: "+payments", label: "Predictable pipeline" },
        { value: "24/7", label: "Always-on setting" },
      ],
      tint: "olive",
      image: "/proof/p5.png",
    },
  ],
  cta: { label: "Book a Call", href: "/contact" },
};

export const founder = {
  eyebrow: "Meet the founder",
  title: "Built by a closer, for closers",
  name: "Jathin VM",
  role: "Founder, Pollinext",
  image: "/founder.jpg",
  bio: [
    "Pollinext was built on the floor of high-ticket sales — thousands of conversations, booked calls and closes across coaching, agency and personal-brand offers.",
    "Today Jathin leads a trained team of setters and closers who plug into your brand, fill your calendar with qualified buyers, and close in your voice — so you stay focused on delivering results.",
  ],
  stats: [
    { value: "$1M+", label: "Client sales driven" },
    { value: "7-step", label: "Done-for-you system" },
  ],
  cta: { label: "Work with the team", href: "/contact" },
};

export const testimonials = {
  eyebrow: "Testimonials",
  title: "What Our Clients Say",
  videos: [
    {
      src: "/testi/gilad.webp",
      name: "Gilad Hanina",
      role: "Founder & CEO, AOS Media",
      href: "https://www.youtube.com/watch?v=Y81wwsnGAnI",
    },
    {
      src: "/testi/nishkarsh.webp",
      name: "Nishkarsh Sharma",
      role: "Founder, Digital Dukaandhar",
      href: "https://www.youtube.com/watch?v=6q-Rm_EuSaQ",
    },
  ],
  items: [
    {
      quote:
        "Jathin is very skilled — you've helped close over $100K+, and you think outside the box.",
      name: "Gilad Hanina",
      role: "Founder, AOS Media",
      tint: "gold",
    },
    {
      quote: "We were able to 5x the business in 30 days!",
      name: "Harut",
      role: "YouTube Automation & Business Coach",
      tint: "dark",
    },
    {
      quote: "Jathin has helped us grow the clientele, the business, and the impact!",
      name: "Anthony Trucks",
      role: "Ex-NFL, Coach & Author of Identity Shift",
      tint: "amber",
    },
    {
      quote: "You're a beast — easily the best I've had so far!",
      name: "Anais Zanotti",
      role: "Fitness Coach",
      tint: "dark",
    },
    {
      quote: "Highly recommend him if you want to handle a large volume of leads!",
      name: "Eugene Yao",
      role: "Health & Wellness Coach",
      tint: "gold",
    },
    {
      quote: "Jathin and his team can be a game changer for your business!",
      name: "Tanner Shuck",
      role: "Founder, True Strength",
      tint: "dark",
    },
    {
      quote:
        "He helped me generate close to $10K in the first 7 days. You'll definitely make money working with him!",
      name: "Paul Lee",
      role: "7-Figure E-commerce Coach",
      tint: "amber",
    },
    {
      quote:
        "If you're a coach looking to scale your offer, I recommend him — very professional.",
      name: "Nishkarsh Sharma",
      role: "E-commerce Expert & Business Coach",
      tint: "dark",
    },
    {
      quote: "Love the consistency in results — working with you has been phenomenal!",
      name: "Chris Pallatroni",
      role: "Founder, The Standard App",
      tint: "gold",
    },
    {
      quote:
        "I went from 0 sales to 3 high-ticket sales in a week after working with Jathin.",
      name: "Thomas Thoresen",
      role: "Fat Loss & Strength Coach",
      tint: "dark",
    },
  ],
};

export const roi = {
  eyebrow: "Calculator",
  title: ["Calculate Your", "Pipeline ROI"],
  defaults: { calls: 20, price: 2000, closeRate: 25 },
  ranges: {
    calls: { min: 0, max: 100, step: 1, label: "Qualified calls booked / month" },
    price: { min: 100, max: 10000, step: 100, label: "Your average offer price ($)" },
    closeRate: { min: 5, max: 60, step: 1, label: "Your current close rate (%)" },
  },
  cta: { label: "Get My Custom Growth Plan", href: "/contact" },
};

// SECTION 8 — "Insights / Appointment Setting Masterclass" VSL (carried over from the
// old pollinext.com site). Set `youtubeId` (or `mp4`) to the real masterclass video to
// make it playable; until then it shows a static masterclass frame.
export const vsl = {
  eyebrow: "Free masterclass",
  title: ["Insights to Strengthen Your", "Outbound & DM Sales Systems"],
  subtitle:
    "Discover practical strategies, sales psychology, and data-backed frameworks for improving conversions across every touchpoint.",
  video: {
    youtubeId: "",
    mp4: "",
    poster: "/founder.jpg",
    label: "90 Mins · Appointment Setting Masterclass",
  },
};

/* PLACEHOLDER PRICING — confirm exact figures with client before launch.
   Cards support either a numeric price (with monthly/yearly) or a "Custom" string. */
export const pricing = {
  eyebrow: "Pricing",
  title: "Our Plans",
  note: "Every engagement is scoped to your offer — book a call for an exact quote.",
  tiers: [
    {
      icon: "single",
      name: "Launch",
      desc: "For coaches & consultants validating and filling their first pipeline.",
      price: "Custom",
      kicker: "Scoped to your offer",
      cta: { label: "Book a Call", href: "/contact", style: "dark" as const },
      features: [
        "Dedicated appointment setter",
        "One primary channel (IG or LinkedIn)",
        "CRM setup & lead research",
        "Weekly performance reporting",
      ],
    },
    {
      icon: "double",
      name: "Scale",
      desc: "For brands ready to keep a high-ticket calendar consistently full.",
      price: "Custom",
      kicker: "Most chosen engagement",
      popular: true,
      cta: { label: "Book a Call", href: "/contact", style: "white" as const },
      features: [
        "Setter + closer team",
        "Omni-channel outreach (IG, LinkedIn, email)",
        "AI follow-up & scheduling systems",
        "Daily reporting + dedicated manager",
        "DM closing in your voice",
      ],
    },
    {
      icon: "molecule",
      name: "Partner",
      desc: "For agencies and high-volume offers needing a full revenue engine.",
      price: "Custom",
      kicker: "Enterprise partnership",
      cta: { label: "Book a Call", href: "/contact", style: "dark" as const },
      features: [
        "Full setting + closing team",
        "Multi-offer & multi-brand support",
        "Custom AI sales systems",
        "Priority QA & optimization",
        "Live performance dashboards",
      ],
    },
  ],
};

export const faqs = {
  eyebrow: "Answers",
  title: "FAQs",
  items: [
    {
      q: "How does Pollinext fill my calendar?",
      a: "We run coordinated outreach across Instagram, LinkedIn and email, then qualify and book interested buyers straight onto your calendar — handling the conversations from first touch to confirmed call.",
    },
    {
      q: "Who is this for?",
      a: "Coaches, consultants, agencies and service providers with offers from $100 to $1,000+ (including high-ticket) who want a reliable flow of qualified sales calls without building an in-house team.",
    },
    {
      q: "How fast will I see booked calls?",
      a: "Most clients see qualified calls hitting the calendar within the first one to two weeks after onboarding, once your offer, voice and systems are dialed in.",
    },
    {
      q: "Do you just set appointments, or also close?",
      a: "Both. We offer appointment setting to fill the calendar and DM closing where trained closers convert conversations into sales in your voice.",
    },
    {
      q: "Is it really done-for-you?",
      a: "Yes. You get a trained team and a dedicated manager running the pipeline daily, so you can stay focused on delivering for your clients.",
    },
    {
      q: "Who owns the data and CRM?",
      a: "You do. We set up and manage your CRM and systems, but every lead, conversation and asset belongs to you.",
    },
  ],
};

export const contact = {
  eyebrow: "Get in touch",
  title: "Contact",
  cards: [
    { type: "mail", label: "Mail", value: "jathinvm@pollinext.com", href: "mailto:jathinvm@pollinext.com" },
    { type: "call", label: "Book a Call", value: "Grab a time on our calendar", href: "/contact" },
    { type: "dm", label: "DM us", value: "@pollinext on Instagram", href: "https://instagram.com/pollinext" },
  ],
  form: {
    name: { label: "Full Name", placeholder: "Jane Doe" },
    company: { label: "Brand / Company", placeholder: "Your brand" },
    email: { label: "Email", placeholder: "jane@brand.com" },
    message: {
      label: "Message",
      placeholder: "Hi! I'd like to learn more about filling my calendar with qualified calls.",
    },
    submit: "Submit",
  },
};

export const ctaBanner = {
  marquee: "fill your calendar — close more deals — ",
  title: ["Your Pipeline.", "Filled on Autopilot."],
  subtitle:
    "Stop chasing leads. Let Pollinext book and close while you stay focused on delivering results.",
  cta: { label: "Book a Call", href: "/contact" },
};

export const footer = {
  tagline: "Powering coaches & consultants with done-for-you sales systems.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Services", href: "/services" },
        { label: "Results", href: "/testimonials" },
        { label: "About", href: "/aboutus" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Careers",
      links: [
        { label: "Appointment Setter", href: "/career-setters" },
        { label: "Virtual Assistant", href: "/career-va" },
        { label: "Social Media Manager", href: "/career-clg" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ],
  copyright: "© 2026 Pollinext. All rights reserved.",
  credit: "Crafted by MittxlDesigns",
};
