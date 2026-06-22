/* ============================================================================
   Pollinext, site content
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
  // "How it Works" was removed, its content now lives on the Services page.
  // "Results" points at the testimonials/results page (client proof + video reviews).
  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/aboutus" },
    { label: "Results", href: "/testimonials" },
    { label: "Services", href: "/services" },
    {
      label: "Careers",
      href: "/career-setters",
      children: [
        { label: "Appointment Setter", href: "/career-setters" },
        { label: "Sales Closer", href: "/career-va" },
      ],
    },
  ],
  cta: { label: "Book a Call", href: "/contact" },
};

export const hero = {
  microQuote: "Generated over $1 Million in sales across all our clients.",
  microAuthor: { name: "Gilad Hanina", role: "Founder & CEO, AOS Media" },
  title: ["Fill Your Calendar.", "Close More Deals."],
  subtitle:
    "We help coaches, consultants, and service providers generate more qualified leads, book more sales calls, and close more clients through done-for-you appointment setting and sales closing.",
  primaryCta: { label: "Book a Call", href: "/contact" },
  secondaryCta: { label: "Explore Services", href: "/services" },
  // Right-side hero video (gold-glow frame). Swap in the real showreel when ready by
  // changing `youtubeId` (video id) or `mp4` (hosted file). Until then it points at a real
  // client testimonial (the one quoted above), opening on YouTube, never the contact form.
  video: {
    youtubeId: "Y81wwsnGAnI", // Gilad Hanina (AOS Media), the testimonial quoted in the hero
    mp4: "",
    poster: "/testi/gilad.jpg",
    label: "Watch: $1M+ generated for clients",
  },
};

// NOTE: the "As featured in" press band (and its <Trust/> component) was removed from
// the homepage per the client spec (Delete section) and replaced by the stats band
// below. The old press-logo data lives in git history if it's ever reinstated.

// Homepage stats band (replaces the press band, just under the hero).
export const homeStats = [
  { value: "$10 Million+", label: "Cash Collected For Clients" },
  { value: "2000+", label: "Qualified Scheduled Meetings" },
  { value: "15+", label: "Countries" },
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
      body: "Turn raw conversations into daily, actionable reporting, show rate, close rate and revenue, always visible.",
      visual: "insights",
    },
    {
      key: "dm",
      title: "DM Closing",
      body: "DM-to-sale systems for $100-$1,000+ offers. Closers handle nurturing, rapport and closing in your voice.",
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
      body: "Instagram, LinkedIn and email run as one coordinated motion, every lead researched, tagged and tracked.",
      visual: "integrations",
    },
  ],
};

export const results = {
  eyebrow: "Results",
  title: "Our Recent Work",
  subtitle:
    "A live snapshot of booked calls, collected payments and client wins from campaigns we run day to day.",
  // Vertical (9:16) tiles shown whole (object-contain) inside fixed-size glow cards.
  // STANDARD SIZE = 1080×1920 (9:16 portrait), Jathin's Instagram-story proof format.
  images: [
    "/proof/p1.png",
    "/proof/p2.png",
    "/proof/p3.png",
    "/proof/p4.png",
    "/proof/p5.png",
  ],
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

// "Who We Help & What We Do", carried over from the live pollinext.com (client request).
export const whoWeHelp = {
  eyebrow: "Who we help & what we do",
  title: "Built for coaches, consultants, creators & service providers",
  subtitle:
    "We help coaches, consultants, creators and service providers build predictable revenue systems that run without them.",
  cards: [
    {
      title: "Appointment Setting",
      body: "Omni-channel appointment setting that fills your calendar with qualified buyers and keeps your high-ticket pipeline on autopilot.",
      points: [
        "CRM & pipeline management",
        "Omni-channel prospecting",
        "High-intent lead research",
        "Qualification & scheduling",
      ],
      visual: "appointments",
    },
    {
      title: "DM Closing",
      body: "DM-to-sale systems for $100-$1,000+ offers, with closers handling nurturing, rapport and closing in your voice.",
      points: [
        "Objection-handling expertise",
        "Performance tracking & analytics",
        "Conversation optimization",
        "Instagram & LinkedIn DM management",
      ],
      visual: "dm",
    },
    {
      title: "AI Sales Systems",
      body: "AI-driven sales systems that automate outreach, follow-ups, scheduling and CRM.",
      points: [
        "Multi-channel follow-up systems",
        "Omni-channel outreach automation",
        "Calendar & scheduling automation",
        "CRM infrastructure setup",
      ],
      visual: "automation",
    },
  ],
};

// Case studies, video (left) + detailed write-up (right). Reuses the recent-work
// cases; `video` is a self-hosted client testimonial reel in /public/testi.
export const caseStudies = {
  eyebrow: "Case studies",
  title: "Real campaigns, real numbers",
  subtitle:
    "A closer look at how we built and ran the pipeline for clients across coaching, agency, fitness and personal brands.",
  items: [
    {
      category: "Agency",
      client: "AOS Media",
      video: "gilad",
      title: "How AOS Media generated $1M+ in sales across its clients",
      body: "An omni-channel appointment-setting engine kept high-ticket calendars full while trained closers converted in-brand. We owned research, outreach, qualification and daily QA so the founder could stay on delivery.",
      highlights: [
        "Omni-channel setting across IG, LinkedIn & email",
        "Dedicated closer team converting in the founder's voice",
        "Daily KPI tracking & weekly optimisation",
      ],
      stats: [
        { value: "$1M+", label: "Sales generated" },
        { value: "100%", label: "Done-for-you" },
      ],
    },
    {
      category: "Coaching",
      client: "Achieve Greatness",
      video: "harut",
      title: "How Achieve Greatness scaled from $10K to $50K/mo in 2 months",
      body: "We built and deployed a dedicated setting + closing team, rebuilt the follow-up system, and tracked every metric daily, 5×-ing monthly revenue inside two months.",
      highlights: [
        "Dedicated setter + closer team deployed",
        "Follow-up system rebuilt from scratch",
        "Every metric tracked & optimised daily",
      ],
      stats: [
        { value: "5×", label: "Monthly revenue" },
        { value: "2 mo", label: "To hit $50K/mo" },
      ],
    },
    {
      category: "Fitness",
      client: "Thoresen Fitness",
      video: "thomas",
      title: "How Thoresen Fitness booked 3 high-ticket sales in week one",
      body: "From a standing start we filled the calendar with qualified buyers and closed in the founder's voice, first high-ticket sale inside seven days.",
      highlights: [
        "Calendar filled from a cold start",
        "Closed in the founder's brand voice",
        "First sale within 7 days",
      ],
      stats: [
        { value: "0 → 3", label: "Closes in week 1" },
        { value: "7 days", label: "To first sale" },
      ],
    },
    {
      category: "Personal Brand",
      client: "Digital Dukaandhar",
      video: "nishkarsh",
      title: "How Digital Dukaandhar turned attention into predictable sales",
      body: "We engineered a DM-to-call system that converted an engaged audience into booked, qualified sales calls, turning attention into a predictable pipeline.",
      highlights: [
        "DM-to-call conversion system",
        "Engaged audience → booked calls",
        "Always-on, predictable pipeline",
      ],
      stats: [
        { value: "+payments", label: "Predictable pipeline" },
        { value: "24/7", label: "Always-on setting" },
      ],
    },
    {
      category: "E-commerce",
      client: "Paul Lee",
      video: "paul-lee",
      title: "How Paul Lee generated ~$10K in his first 7 days",
      body: "We plugged a trained setting + closing motion into Paul's offer and turned existing demand into booked, qualified calls, driving close to $10K in new sales inside the first week.",
      highlights: [
        "Setting + closing motion deployed fast",
        "Existing demand converted into booked calls",
        "Revenue inside the first 7 days",
      ],
      stats: [
        { value: "~$10K", label: "In first 7 days" },
        { value: "7 days", label: "To first revenue" },
      ],
    },
    {
      category: "Coaching",
      client: "Eugene Yao",
      video: "eugene-yao",
      title: "How Eugene Yao handled 10,000+ leads without dropping quality",
      body: "We built the systems and team to engage, qualify and route a high volume of leads, so Eugene could handle 10,000+ conversations while only spending time on the ready-to-buy ones.",
      highlights: [
        "High-volume lead engagement at scale",
        "Qualification that protects calendar time",
        "Only ready-to-buy prospects booked",
      ],
      stats: [
        { value: "10,000+", label: "Leads handled" },
        { value: "100%", label: "Done-for-you" },
      ],
    },
  ],
};

// Controllable horizontal image carousel of booking/payment proof (from pollinext.com).
export const callsBooked = {
  eyebrow: "Real results",
  title: "Calls Being Booked Daily",
  subtitle: "Actual booking and payment confirmations from live client campaigns.",
  images: [
    "/booked/b1.png",
    "/booked/b2.png",
    "/booked/b3.png",
    "/booked/b4.png",
    "/booked/b5.png",
    "/booked/b6.png",
    "/booked/b7.png",
    "/booked/b8.png",
    "/booked/b9.png",
  ],
};

// Problem-agitation cards, one per audience sector (final copy from client).
export const problems = {
  eyebrow: "The problem",
  title: "Every sector faces the same silent revenue killers, just in different forms.",
  cards: [
    {
      label: "Coaches & Consultants",
      title: "You're the best at what you do, but you're stuck selling it yourself.",
      desc: "Your pipeline depends entirely on you. When you stop outreaching, everything dries up. And the calls you do get? Half don't show. The other half aren't ready to buy.",
      points: [
        "No consistent flow of qualified calls week to week",
        "Spending hours in DMs that never convert",
        "Prospects go cold because follow-up falls through",
        "High-ticket offers getting undercut by poor qualifying",
        "Revenue tied to your personal bandwidth, not a system",
      ],
      footer: "You can't scale what depends entirely on you showing up every day.",
    },
    {
      label: "Course Creators",
      title: "You've built the course. Now you're stuck trying to fill it every launch.",
      desc: "Launches are exhausting and inconsistent. Your audience engages with your content but doesn't convert. And between launches, enrolments drop to near zero with no system keeping leads warm.",
      points: [
        "Launch fatigue, the same effort, shrinking returns",
        "Warm leads going cold between launch windows",
        "DMs piling up with no one to manage or close them",
        "No evergreen enrolment system running outside launches",
        "Cart abandons and objections left unaddressed",
      ],
      footer: "A great course with a broken enrolment system is just an expensive PDF.",
    },
    {
      label: "Community Owners (Skool etc.)",
      title: "Your community grows, but paid membership conversions don't follow.",
      desc: "Free members browse but never upgrade. You're running content, managing members, and somehow also expected to personally DM and enrol new paying members. The community runs you, not the other way round.",
      points: [
        "Free-to-paid conversion stuck despite active engagement",
        "No one managing upgrade conversations in the DMs",
        "Member churn from lack of nurture and follow-up",
        "Enrolment spikes during launches, flatlines in between",
        "You're the setter, the closer, and the host, all at once",
      ],
      footer: "A community that doesn't convert consistently isn't a business, it's a group chat.",
    },
    {
      label: "Service Providers & Agencies",
      title: "You're great at delivery, but acquisition is still a guessing game.",
      desc: "Referrals dry up. Cold outreach is inconsistent. And when you do land a call, you're closing it yourself after a full day of client work. Growth stays flat because the pipeline never runs without you in it.",
      points: [
        "Pipeline built on referrals with no predictable outbound",
        "Outreach too sporadic to create real momentum",
        "No dedicated setter or closer, it all falls on you",
        "Leads going cold while you're heads-down in delivery",
        "Feast-or-famine cycles that make revenue unpredictable",
      ],
      footer: "You built a great service business. You shouldn't still be doing your own sales.",
    },
  ],
};

export const founder = {
  eyebrow: "Meet the founder",
  title: "Building Impact Beyond Business",
  name: "Jathin VM",
  role: "Founder, Pollinext",
  image: "/founder.jpg",
  bio: [
    "Pollinext was built on the floor of high-ticket sales, thousands of conversations, booked calls and closes across coaching, agency and personal-brand offers.",
    "Today Jathin leads a trained team of setters and closers who plug into your brand, fill your calendar with qualified buyers, and close in your voice, so you stay focused on delivering results.",
  ],
  stats: [] as { value: string; label: string }[],
  // Two CTAs per client doc (SECTION 7): Learn More -> About, Contact Us -> Contact.
  ctas: [
    { label: "Learn More", href: "/aboutus", variant: "dark" as const },
    { label: "Contact Us", href: "/contact", variant: "gold" as const },
  ],
};

export const testimonials = {
  eyebrow: "Testimonials",
  title: "Client Success Stories",
  subtitle:
    "Hear directly from business owners who transformed their sales pipeline with POLLINEXT.",
  // CTA pair shown below the video reel (per client doc, SECTION 4).
  ctas: [
    { label: "View More", href: "/testimonials", variant: "dark" as const },
    { label: "Book A Call", href: "/contact", variant: "gold" as const },
  ],
  // Heading for the global quote-wall marquee (per client doc, SECTION 10).
  marqueeEyebrow: "Testimonials",
  marqueeTitle: "What Clients Across the Globe Say About Pollinext",
  marqueeSubtitle: "Hear from coaches, consultants, and creators who've worked with us.",
  // Self-hosted vertical (9:16) reels in /public/testi (slug.mp4 + slug.jpg poster).
  // Compressed from Jathin's raw exports, play inline in a fullscreen lightbox.
  videos: [
    { slug: "gilad", name: "Gilad Hanina", role: "Founder & CEO, AOS Media", quote: "Jathin is very skilled. You've helped close over $100K+ and you think outside the box." },
    { slug: "nishkarsh", name: "Nishkarsh Sharma", role: "Founder, Digital Dukaandhar", quote: "If you're a coach looking to scale your offer, I recommend him. Very professional." },
    { slug: "anthony-trucks", name: "Anthony Trucks", role: "Ex-NFL, Coach & Author", quote: "Jathin has helped us grow the clientele, the business, and the impact!" },
    { slug: "paul-lee", name: "Paul Lee", role: "7-Figure E-commerce Coach", quote: "He helped me generate close to $10K in the first 7 days." },
    { slug: "chris-pallatroni", name: "Chris Pallatroni", role: "Founder, The Standard App", quote: "Love the consistency in results. Working with you has been phenomenal!" },
    { slug: "eugene-yao", name: "Eugene Yao", role: "Health & Wellness Coach", quote: "Highly recommend him if you want to handle a large volume of leads!" },
    { slug: "tanner-shuck", name: "Tanner Shuck", role: "Founder, True Strength", quote: "Jathin and his team can be a game changer for your business!" },
    { slug: "harut", name: "Harut", role: "YT Automation & Business Coach", quote: "We were able to 5x the business in 30 days!" },
    { slug: "thomas", name: "Thomas Thoresen", role: "Fat Loss & Strength Coach", quote: "I went from 0 sales to 3 high-ticket sales in a week." },
    { slug: "shivansh", name: "Shivansh", role: "Coaching Client", quote: "Working with the team made our booked calls consistent and predictable." },
  ],
  items: [
    {
      quote:
        "Jathin is very skilled, you've helped close over $100K+, and you think outside the box.",
      name: "Gilad Hanina",
      role: "Founder, AOS Media",
      tint: "gold",
      photo: "/testi/avatars/gilad.jpg",
    },
    {
      quote: "We were able to 5x the business in 30 days!",
      name: "Harut",
      role: "YouTube Automation & Business Coach",
      tint: "dark",
      photo: "/testi/avatars/harut.jpg",
    },
    {
      quote: "Jathin has helped us grow the clientele, the business, and the impact!",
      name: "Anthony Trucks",
      role: "Ex-NFL, Coach & Author of Identity Shift",
      tint: "amber",
      photo: "/testi/avatars/anthony.jpg",
    },
    {
      quote: "You're a beast, easily the best I've had so far!",
      name: "Anais Zanotti",
      role: "Fitness Coach",
      tint: "dark",
      photo: "/testi/avatars/anais.jpg",
    },
    {
      quote: "Highly recommend him if you want to handle a large volume of leads!",
      name: "Eugene Yao",
      role: "Health & Wellness Coach",
      tint: "gold",
      photo: "/testi/avatars/eugene.jpg",
    },
    {
      quote: "Jathin and his team can be a game changer for your business!",
      name: "Tanner Shuck",
      role: "Founder, True Strength",
      tint: "dark",
      photo: "/testi/avatars/tanner.jpg",
    },
    {
      quote:
        "He helped me generate close to $10K in the first 7 days. You'll definitely make money working with him!",
      name: "Paul Lee",
      role: "7-Figure E-commerce Coach",
      tint: "amber",
      photo: "/testi/avatars/paul.jpg",
    },
    {
      quote:
        "If you're a coach looking to scale your offer, I recommend him, very professional.",
      name: "Nishkarsh Sharma",
      role: "E-commerce Expert & Business Coach",
      tint: "dark",
      photo: "/testi/avatars/nishkarsh.jpg",
    },
    {
      quote: "Love the consistency in results, working with you has been phenomenal!",
      name: "Chris Pallatroni",
      role: "Founder, The Standard App",
      tint: "gold",
      photo: "/testi/avatars/chris.jpg",
    },
    {
      quote:
        "I went from 0 sales to 3 high-ticket sales in a week after working with Jathin.",
      name: "Thomas Thoresen",
      role: "Fat Loss & Strength Coach",
      tint: "dark",
      photo: "/testi/avatars/thomas.jpg",
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

// SECTION 8, Masterclass / insights. Per the client's Google-doc mockup: a row of
// cards, each = video thumbnail on top + a "Watch Now" button below (multiple videos).
// TODO(client): supply the real YouTube IDs. Cards with an empty `youtubeId` show the
// poster + a disabled-looking button; set the id and the card becomes a playable thumb.
export const vsl = {
  eyebrow: "More From Pollinext",
  title: ["Insights to Strengthen", "Sales Systems"],
  subtitle:
    "Discover practical strategies, sales psychology and data-backed frameworks for improving conversions across every touchpoint.",
  // Section-level CTA per client doc (SECTION 8): View More -> YouTube channel.
  viewMore: { label: "View More", href: "https://www.youtube.com/@pollinext" },
  videos: [
    {
      youtubeId: "",
      poster: "/founder.jpg",
      title: "Appointment Setting Masterclass",
      duration: "90 min",
    },
    {
      youtubeId: "",
      poster: "/founder.jpg",
      title: "DM Closing Frameworks That Convert",
      duration: "Insight",
    },
    {
      youtubeId: "",
      poster: "/founder.jpg",
      title: "Building an Outbound System That Scales",
      duration: "Insight",
    },
  ],
};

/* PLACEHOLDER PRICING, confirm exact figures with client before launch.
   Cards support either a numeric price (with monthly/yearly) or a "Custom" string. */
export const pricing = {
  eyebrow: "Engagements",
  title: "How We Work Together",
  note: "Every engagement is built around your offer, book a call to map the right fit.",
  tiers: [
    {
      icon: "single",
      name: "Launch",
      desc: "For coaches & consultants validating and filling their first pipeline.",
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
      a: "We run coordinated outreach across Instagram, LinkedIn and email, then qualify and book interested buyers straight onto your calendar, handling the conversations from first touch to confirmed call.",
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
  marquee: "fill your calendar, close more deals, ",
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
};
