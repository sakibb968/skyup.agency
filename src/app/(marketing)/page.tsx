import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Share2,
  Activity,
  Crosshair,
  Megaphone,
  Video,
  Layers,
  Database,
  PhoneCall,
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Globe,
  TrendingUp,
  MapPin,
  LayoutDashboard,
  Zap,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionContent as AccordionBody,
} from "@/components/ui/accordion";
import { BackgroundSystem } from "@/components/shared/background-system";
import { createPublicClient } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Skyup — Performance Marketing for Local Businesses",
  description:
    "We run your local advertising, track every ring to the exact keyword, and follow up in seconds so high-margin jobs book directly onto your schedule.",
  alternates: {
    canonical: "https://skyup.agency",
  },
  openGraph: {
    title: "Skyup — Performance Marketing for Local Businesses",
    description:
      "Your phone should ring more. We make sure it does. End-to-end local advertising, call tracking, and automated lead capture.",
    url: "https://skyup.agency",
    siteName: "Skyup",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/logo-light.png",
        width: 1200,
        height: 630,
        alt: "Skyup Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyup — Performance Marketing for Local Businesses",
    description:
      "Your phone should ring more. We make sure it does. End-to-end local advertising and call tracking.",
    images: ["/brand/logo-light.png"],
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Skyup Agency",
  legalName: "Skyup Agency OÜ",
  url: "https://skyup.agency",
  logo: "https://skyup.agency/brand/logo-light.png",
  description:
    "Performance marketing, dynamic call tracking, and automated lead capture for local businesses across the USA, Canada, and Europe.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tornimäe tn 5",
    addressLocality: "Tallinn",
    postalCode: "10145",
    addressCountry: "EE",
  },
  areaServed: ["United States", "Canada", "Europe", "United Kingdom"],
  serviceType: [
    "Google Ads Management",
    "Dynamic Call Tracking",
    "Meta Ads Management",
    "Speed-to-Lead CRM Automation",
  ],
};

interface ServiceItem {
  id?: string;
  slug: string;
  title: string;
  short_description: string;
  icon_name: string;
  sort_order?: number;
}

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    slug: "skyup-crm",
    title: "Skyup CRM",
    short_description:
      "Our proprietary all-in-one CRM for local service businesses. Instant missed-call text back, multi-channel inbox, automated estimate follow-ups, booking calendar, and 5-star Google review capture.",
    icon_name: "LayoutDashboard",
  },
  {
    slug: "website-development",
    title: "Website Development",
    short_description:
      "Custom, blazing-fast websites engineered for local contractors — mobile-first, sub-second loading, and built to turn Google searchers into booked estimates.",
    icon_name: "Globe",
  },
  {
    slug: "local-seo-gbp",
    title: "Local SEO & GBP Optimisation",
    short_description:
      "Dominate the Google Maps 3-pack and local search in your service territory. Full Google Business Profile optimization, local citations, and geo-grid tracking.",
    icon_name: "MapPin",
  },
  {
    slug: "cro",
    title: "Conversion Rate Optimisation (CRO)",
    short_description:
      "We audit your landing pages, booking forms, and mobile call flows to remove friction and double your leads without increasing your ad budget.",
    icon_name: "TrendingUp",
  },
  {
    slug: "google-ads",
    title: "Google Ads Management",
    short_description:
      "Show up at the very top of Google when local homeowners search for emergency repairs, installations, and quote estimates in your exact zip codes.",
    icon_name: "Search",
  },
  {
    slug: "meta-ads",
    title: "Meta Ads Management",
    short_description:
      "Target local homeowners across Facebook & Instagram with job-site video proof and seasonal offers to keep your pipeline consistently full.",
    icon_name: "Share2",
  },
  {
    slug: "tracking-setup",
    title: "Dynamic Call Tracking",
    short_description:
      "Dynamic Number Insertion (DNI) assigns unique numbers to each visitor so you know the exact search keyword that caused the phone to ring.",
    icon_name: "Activity",
  },
  {
    slug: "enhanced-conversions-lead-tracking",
    title: "Server-Side Tracking (Stape.io)",
    short_description:
      "GDPR-compliant first-party tracking container that feeds completed job revenue back to Google & Meta algorithms to train smart bidding on high-ticket jobs.",
    icon_name: "Crosshair",
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    short_description:
      "Keep your profiles active with completed job-site photos, 5-star homeowner reviews, and helpful tips to build authentic local reputation.",
    icon_name: "Megaphone",
  },
  {
    slug: "branded-content",
    title: "Branded Content & Video",
    short_description:
      "High-end job-site video edits, crew spotlights, and branded graphics that position your company as the premier contractor in your region.",
    icon_name: "Video",
  },
  {
    slug: "cold-calling",
    title: "Commercial Cold Calling",
    short_description:
      "Professional telephone outreach to local commercial accounts, facility managers, property management firms, and HOAs to book commercial service bids.",
    icon_name: "PhoneCall",
  },
];

const ICON_MAP: Record<string, LucideIcon> = {
  Search,
  Share2,
  Activity,
  Crosshair,
  Megaphone,
  Instagram: Megaphone,
  Video,
  Layers,
  Database,
  PhoneCall,
  Globe,
  TrendingUp,
  MapPin,
  LayoutDashboard,
};

const EXCLUDED_SERVICE_SLUGS = new Set(["gohighlevel-setup", "crm-setup"]);

async function getServices(): Promise<ServiceItem[]> {
  "use cache";
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return FALLBACK_SERVICES;
  }

  try {
    const supabase = createPublicClient();
    if (!supabase) return FALLBACK_SERVICES;
    const { data, error } = await supabase
      .from("services")
      .select("id, slug, title, short_description, icon_name, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_SERVICES;
    }

    // Filter out legacy duplicate CRM entries (gohighlevel-setup, crm-setup)
    const filteredData = data.filter((item) => !EXCLUDED_SERVICE_SLUGS.has(item.slug));
    const dbSlugs = new Set(filteredData.map((item) => item.slug));

    const mergedDb = filteredData.map((item) => {
      const fallback = FALLBACK_SERVICES.find((f) => f.slug === item.slug);
      return {
        id: item.id,
        slug: item.slug,
        title: item.title,
        short_description:
          item.short_description ||
          fallback?.short_description ||
          "Specialized digital growth capability tailored to your business.",
        icon_name: item.icon_name || fallback?.icon_name || "Activity",
        sort_order: item.sort_order,
      };
    });

    const activeFallbacks = FALLBACK_SERVICES.filter(
      (f) => !EXCLUDED_SERVICE_SLUGS.has(f.slug)
    );
    const missingServices = activeFallbacks.filter(
      (f) => !dbSlugs.has(f.slug)
    );

    const combined = [...mergedDb, ...missingServices];
    return combined.sort((a, b) => {
      const idxA = FALLBACK_SERVICES.findIndex((f) => f.slug === a.slug);
      const idxB = FALLBACK_SERVICES.findIndex((f) => f.slug === b.slug);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
  } catch {
    return FALLBACK_SERVICES;
  }
}

interface PortfolioItem {
  id: string;
  slug: string;
  client_name: string;
  industry: string;
  challenge: string | null;
  strategy: string | null;
  results: string | null;
  testimonial_quote: string | null;
  service_tags: string[];
}

async function getPortfolioItems(): Promise<PortfolioItem[]> {
  "use cache";
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("portfolio_items")
      .select(
        "id, slug, client_name, industry, challenge, strategy, results, testimonial_quote, service_tags"
      )
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data) {
      return [];
    }

    return data;
  } catch {
    return [];
  }
}

const FULL_PARTNER_FEATURES = [
  "Full Google Ads & Meta Ads management tailored to your territory",
  "Dynamic call tracking and server-side tracking setup included",
  "Automated missed-call text back and calendar booking workflow",
  "Weekly reporting on qualified calls, leads, and cost per booked estimate",
  "Ongoing creative ad updates, ad copy refreshes, and negative term scrubbing",
  "Dedicated growth strategist with direct Slack and email access",
];

const SINGLE_SERVICE_FEATURES = [
  "Focused audit and implementation for your selected channel",
  "Clear implementation roadmap and agreed milestone delivery",
  "Direct setup by a specialist in that tool or ad platform",
  "Bi-weekly progress updates and initial performance report",
  "Full system handover with recorded training for your office team",
  "Seamless option to add ongoing monthly management anytime",
];

const FAQS = [
  {
    q: "How does dynamic call tracking work without changing our main phone number?",
    a: "Your main business number never changes. When visitors land on your website, our lightweight tracking script dynamically swaps the displayed phone number with a unique tracking number from your local area code. When they call, it instantly forwards to your normal office line while logging the exact campaign, ad, and search keyword.",
  },
  {
    q: "How quickly do we start seeing inbound calls and booked jobs?",
    a: "Google Search campaigns and call tracking can be live within 5 to 7 business days following our onboarding audit. Because we target exact local searches with high purchase intent (such as emergency repairs or urgent installations), clients typically receive their first qualified calls during week one of campaign launch.",
  },
  {
    q: "What is speed-to-lead automation, and how does it prevent lost revenue?",
    a: "Studies consistently show that responding to a lead in under 60 seconds increases conversion rates by over 390%. If your crew is on a roof or under a sink and misses a call, our system triggers an automated SMS within 20 seconds. It answers the customer immediately and provides your estimate booking link before they dial your competitors.",
  },
  {
    q: "Which regions and currencies do you support?",
    a: "We primarily partner with local service businesses across Europe (EU + UK) and North America (USA & Canada). We support EUR and GBP billing with Stripe Tax, automatic B2B reverse charge for EU VAT compliance, and SEPA direct debit as well as credit cards.",
  },
  {
    q: "Are there long-term locked contracts?",
    a: "No. Our full-service partnerships operate on a simple 90-day initial agreement to build out and optimize your tracking and campaigns, moving to flexible month-to-month terms thereafter. Individual service setup packages are one-off projects with zero ongoing commitment.",
  },
];

export default async function HomePage() {
  const [services, portfolioItems] = await Promise.all([
    getServices(),
    getPortfolioItems(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceJsonLd),
        }}
      />

      <div className="relative min-h-screen overflow-hidden">
        {/* Reusable Background System */}
        <BackgroundSystem />

        {/* ================================================================= */}
        {/* HERO SECTION */}
        {/* ================================================================= */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <div className="flex justify-center">
                <Badge variant="default" className="gap-2">
                  <Sparkles className="size-3 text-accent" />
                  <span>Performance Marketing for Local Businesses</span>
                </Badge>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.08] text-balance">
                Your phone should ring more. We make sure it does.
              </h1>

              <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                We run your local advertising, track every ring to the exact keyword,
                and follow up in seconds so high-margin jobs book directly onto your schedule.
              </p>

              <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center justify-center pt-2">
                <Link href="/book-call" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    <span>Book a Strategy Call</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>

                <Link href="#services" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Our Services
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-accent" />
                  Tracked to the exact keyword
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-accent" />
                  18-second speed to lead
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-accent" />
                  EU &amp; UK compliant
                </span>
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="mt-16 sm:mt-20 rounded-xl border border-border bg-surface p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="space-y-1">
                  <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    42,800+
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Inbound Calls Tracked
                  </p>
                </div>

                <div className="space-y-1 pt-4 md:pt-0 md:pl-6">
                  <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-accent">
                    -34%
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Avg. Cost Per Lead Drop
                  </p>
                </div>

                <div className="space-y-1 pt-4 md:pt-0 md:pl-6">
                  <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    €6.2M+
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Tracked Job Revenue
                  </p>
                </div>

                <div className="space-y-1 pt-4 md:pt-0 md:pl-6">
                  <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    96.4%
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Partner Retention Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* TRUST & PARTNERSHIP BADGES */}
        {/* ================================================================= */}
        <section className="border-t border-border py-10 md:py-14">
          <div className="mx-auto max-w-[1100px] px-6">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Official Partners &amp; Verified Platforms
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {[
                {
                  label: "Google Ads Partner",
                  href: "#",
                  logo: "/brand/partners/google-ads.svg",
                  alt: "Google Ads Partner",
                },
                {
                  label: "Meta Ads Partner",
                  href: "#",
                  logo: "/brand/partners/meta.svg",
                  alt: "Meta Ads Partner",
                },
                {
                  label: "Stape.io Partner",
                  href: "https://stape.io",
                  logo: "/brand/partners/stape.svg",
                  alt: "Stape.io Certified Partner",
                },
                {
                  label: "Upwork Agency",
                  href: "https://www.upwork.com",
                  logo: "/brand/partners/upwork.svg",
                  alt: "Upwork Verified Agency",
                },
                {
                  label: "Clutch Verified",
                  href: "https://clutch.co",
                  logo: "/brand/partners/clutch.svg",
                  alt: "Clutch Verified Partner",
                },
              ].map((badge) => (
                <a
                  key={badge.label}
                  href={badge.href}
                  target={badge.href.startsWith("http") ? "_blank" : undefined}
                  rel={badge.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground transition-all duration-150 hover:border-accent hover:text-accent hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <img
                    src={badge.logo}
                    alt={badge.alt}
                    width={18}
                    height={18}
                    className="size-4.5 object-contain shrink-0"
                  />
                  <span>{badge.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* HOW OUR SYSTEM WORKS */}
        {/* ================================================================= */}
        <section id="how-it-works" className="border-t border-border bg-surface/50 py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-12 max-w-2xl">
              <Badge variant="secondary" className="mb-3">
                Proven Methodology
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                How our closed-loop system turns clicks into paying jobs
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Most agencies report on vanity impressions. We connect the initial Google or Meta search
                directly to your office phone, schedule the estimate in seconds, and feed revenue back to the algorithms.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "High-Intent Search Ads",
                  desc: "Google & Meta campaigns strictly targeted to ready-to-book local homeowners. Negative keyword filters block DIY and non-buyer clicks.",
                  icon: Search,
                  deliverable: "Exact-match keyword lists & territory targeting",
                },
                {
                  step: "02",
                  title: "Dynamic Call Tracking",
                  desc: "Dynamic number insertion links every phone call to the exact keyword and ad. A 2-second whisper audio tells dispatchers what the customer wants.",
                  icon: PhoneCall,
                  deliverable: "100% attribution accuracy & call recording",
                },
                {
                  step: "03",
                  title: "Speed-to-Lead Follow-Up",
                  desc: "If your crew is on a job site and misses a call, our system automatically texts the caller in under 15 seconds to book their slot before competitors.",
                  icon: Zap,
                  deliverable: "Automated 24/7 missed-call text back",
                },
                {
                  step: "04",
                  title: "Closed-Loop Revenue Sync",
                  desc: "When an estimate becomes a paid invoice, we feed that revenue back to Google & Meta CAPI to train algorithms to find more high-margin jobs.",
                  icon: BarChart3,
                  deliverable: "Offline revenue feedback loop active",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 transition-all duration-150 hover:border-accent/50"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-bold text-accent">
                          STAGE {item.step}
                        </span>
                        <div className="flex size-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                          <Icon className="size-4" />
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-5 pt-3.5 border-t border-border/60">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        ✓ {item.deliverable}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* CORE SERVICES BENTO GRID */}
        {/* ================================================================= */}
        <section id="services" className="border-t border-border py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <Badge variant="secondary" className="mb-3">
                  Capabilities &amp; Specializations
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Complete growth services for local contractors
                </h2>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                  Choose our full &ldquo;we run your business growth&rdquo; partnership or deploy individual
                  high-impact services tailored to your exact bottleneck.
                </p>
              </div>

              <Link href="/services">
                <Button variant="outline" className="gap-2 shrink-0">
                  <span>View All Services</span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((item) => {
                const Icon = ICON_MAP[item.icon_name] || Activity;
                return (
                  <Card key={item.slug} className="flex flex-col justify-between">
                    <div>
                      <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="mt-2 text-sm leading-relaxed">
                        {item.short_description}
                      </CardDescription>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/60">
                      <Link
                        href={`/services/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                      >
                        <span>Learn more about {item.title}</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Direct Link to Packages & Pricing */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-surface p-6 sm:p-8">
              <div>
                <p className="text-base sm:text-lg font-bold text-foreground">
                  Ready to book more high-margin local jobs?
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Explore our 3 transparent monthly packages or review individual service implementation rates.
                </p>
              </div>
              <Link href="/packages" className="shrink-0 w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <span>View Packages &amp; Pricing</span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* PACKAGES COMPARISON */}
        {/* ================================================================= */}
        <section id="packages" className="border-t border-border bg-surface/50 py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <Badge variant="secondary" className="mb-3">
                Transparent Engagement Models
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Simple, transparent growth packages
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Hire us to run your entire growth engine or select a single service setup.
                All prices shown in EUR (excl. VAT for EU/UK businesses).
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 items-stretch">
              {/* Starter Package */}
              <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-7">
                <div>
                  <Badge variant="secondary" className="mb-3">
                    Starter
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground">Local Foundation</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-foreground">€890</span>
                    <span className="text-xs text-muted-foreground">/ month (excl. VAT)</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    For contractors looking to establish consistent inbound phone calls and stop losing missed leads.
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                    {[
                      "Google Ads OR Meta Ads (targeted territory search)",
                      "Local SEO & Google Business Profile (GBP) setup",
                      "Skyup CRM: 24/7 Missed-Call Text Back (< 15s)",
                      "Skyup CRM: 2-way SMS/call inbox & technician mobile app",
                      "Automated 5-star Google review request workflows",
                      "Dynamic Call Tracking & keyword attribution",
                      "Monthly lead conversion & ROI reports",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="size-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <Link href="/book-call">
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      <span>Get Started</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Growth Package — Most Popular */}
              <div className="relative flex flex-col justify-between rounded-xl border-2 border-accent bg-surface p-7 shadow-xs">
                <div className="absolute -top-3.5 right-6 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground">
                  Most Popular
                </div>
                <div>
                  <Badge variant="default" className="mb-3">
                    Growth Engine
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground">Growth Engine</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-foreground">€1,690</span>
                    <span className="text-xs text-muted-foreground">/ month (excl. VAT)</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Complete growth engine combining paid search, paid social, local SEO, and full CRM automation.
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                    {[
                      "Full Google Ads + Meta Ads multi-channel management",
                      "Local SEO & GBP Domination (weekly updates & geo-grid tracking)",
                      "Skyup CRM: Automated estimate follow-up sequences",
                      "Skyup CRM: Online estimate booking calendar & dispatch sync",
                      "Skyup CRM: Multi-channel inbox (SMS, calls, Google chat, DMs)",
                      "Website CRO & booking funnel friction removal",
                      "Server-Side Tracking & Enhanced Conversions (Stape.io)",
                      "Social Media Management (weekly job-site proof & reviews)",
                      "Bi-weekly strategy sprints & live attribution dashboard",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="size-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <Link href="/book-call">
                    <Button size="lg" className="w-full gap-2">
                      <span>Book a Strategy Call</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Full Partner Package */}
              <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-7">
                <div>
                  <Badge variant="secondary" className="mb-3">
                    Market Dominator
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground">Market Dominator</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-foreground">€2,790</span>
                    <span className="text-xs text-muted-foreground">/ month (excl. VAT)</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    We run your entire digital acquisition, tech stack, and outbound commercial bidding pipeline.
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                    {[
                      "Everything included in Growth Engine",
                      "Custom Website Development included (built from scratch)",
                      "Continuous CRO & landing page A/B experimentation",
                      "Commercial Cold Calling (booking HOAs & facility managers)",
                      "Branded job-site video editing & high-end ad creative",
                      "Skyup CRM Enterprise (multi-location dispatch & webhooks)",
                      "Dedicated Fractional Growth Director with direct Slack access",
                      "Strict 1-contractor territory exclusivity in your market",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="size-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <Link href="/book-call">
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      <span>Explore Package Details</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* CASE STUDIES / PORTFOLIO */}
        {/* ================================================================= */}
        {portfolioItems.length > 0 && (
          <section id="portfolio" className="border-t border-border py-20 md:py-28">
            <div className="mx-auto max-w-[1100px] px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <Badge variant="secondary" className="mb-3">
                    Documented Case Studies
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Real contractor results &amp; revenue metrics
                  </h2>
                  <p className="mt-3 text-base text-muted-foreground">
                    Inspect actual call volume increases and cost per booked estimate metrics across our partner accounts.
                  </p>
                </div>

                <Link href="/portfolio">
                  <Button variant="outline" className="gap-2 shrink-0">
                    <span>View All Case Studies</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item) => (
                  <Card key={item.id} className="flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                        {item.industry}
                      </span>
                      <CardTitle className="text-lg">{item.client_name}</CardTitle>
                      {item.challenge && (
                        <CardDescription className="text-xs">
                          {item.challenge}
                        </CardDescription>
                      )}
                      {item.results && (
                        <p className="text-sm font-semibold text-foreground">
                          {item.results}
                        </p>
                      )}
                      {item.testimonial_quote && (
                        <blockquote className="border-l-2 border-accent pl-3 text-xs italic text-muted-foreground">
                          &ldquo;{item.testimonial_quote}&rdquo;
                        </blockquote>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-border">
                      <Link
                        href={`/portfolio/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                      >
                        <span>Read case study</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* FAQS ACCORDION */}
        {/* ================================================================= */}
        <section className="border-t border-border bg-surface/50 py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-12 max-w-2xl">
              <Badge variant="secondary" className="mb-3">
                Frequently Asked Questions
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Common questions from business owners
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Everything you need to know about our call tracking, ad management, and speed-to-lead setup.
              </p>
            </div>

            <div className="max-w-3xl rounded-xl border border-border bg-surface p-6 sm:p-8">
              <Accordion defaultValue={["faq-0"]}>
                {FAQS.map((faq, index) => (
                  <AccordionItem key={faq.q} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* FINAL HIGH-CONVERTING CTA */}
        {/* ================================================================= */}
        <section className="border-t border-border py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-8 py-14 text-center md:px-16 md:py-20 shadow-xs">
              <div className="relative mx-auto max-w-2xl space-y-6">
                <Badge variant="default" className="gap-2">
                  <ShieldCheck className="size-3 text-accent" />
                  <span>Zero-Pressure Growth Consultation</span>
                </Badge>

                <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  Ready to get more booked jobs from your marketing?
                </h2>

                <p className="text-base text-muted-foreground leading-relaxed">
                  Book a 30-minute strategy call with our directors. We will analyze your service
                  area, audit your current ad spend or competitors, and show you exactly how to double your inbound inquiries.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                  <Link href="/book-call" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto gap-2">
                      <span>Book a Strategy Call</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>

                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Send a Message via Contact Form
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-accent" />
                    30-minute phone or video conversation
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-accent" />
                    Actionable advice for your local market
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-accent" />
                    Zero sales pressure or obligation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
