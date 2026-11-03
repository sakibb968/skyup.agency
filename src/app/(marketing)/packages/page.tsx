import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
  Search,
  Share2,
  Globe,
  MapPin,
  TrendingUp,
  LayoutDashboard,
  Activity,
  Crosshair,
  Megaphone,
  Video,
  PhoneCall,
  Clock,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Packages & Pricing — Transparent Growth Plans for Local Businesses",
  description:
    "Explore transparent growth packages and a la carte rates for local contractors. Full-funnel digital acquisition, proprietary Skyup CRM, and server-side tracking.",
  alternates: {
    canonical: "https://skyup.agency/packages",
  },
  openGraph: {
    title: "Packages & Pricing — Skyup Agency",
    description:
      "Transparent monthly packages and individual service rates for local contractors across Europe (EU + UK). All prices shown excl. VAT.",
    url: "https://skyup.agency/packages",
    siteName: "Skyup Agency",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/logo-light.png",
        width: 1200,
        height: 630,
        alt: "Skyup Agency Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Packages & Pricing — Skyup Agency",
    description:
      "Transparent monthly packages and individual service rates for local contractors across Europe (EU + UK).",
    images: ["/brand/logo-light.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Packages & Pricing — Skyup Agency",
  description:
    "Transparent monthly packages and standalone implementation rates for local service businesses across Europe.",
  url: "https://skyup.agency/packages",
  offers: [
    {
      "@type": "Offer",
      name: "Local Foundation",
      price: "890",
      priceCurrency: "EUR",
      description:
        "Consistent local inbound calls, Google Business Profile optimization, dynamic call tracking, and Skyup CRM missed-call text back.",
    },
    {
      "@type": "Offer",
      name: "Growth Engine",
      price: "1690",
      priceCurrency: "EUR",
      description:
        "Full Google & Meta Ads management, Local SEO domination, website CRO, server-side tracking, and full Skyup CRM automation.",
    },
    {
      "@type": "Offer",
      name: "Market Dominator",
      price: "2790",
      priceCurrency: "EUR",
      description:
        "Complete enterprise partner: custom website development included, commercial cold calling, video creative, and territory exclusivity.",
    },
  ],
};

const COMPARISON_DATA = [
  {
    feature: "Monthly Investment (excl. VAT)",
    foundation: "€890 / mo",
    growth: "€1,690 / mo",
    dominator: "€2,790 / mo",
    isPrice: true,
  },
  {
    feature: "Ad Channel Management",
    foundation: "Google Ads OR Meta Ads (1 territory)",
    growth: "Google Ads + Meta Ads (multi-campaign)",
    dominator: "Google Ads + Meta Ads + Local Service Ads",
  },
  {
    feature: "Local SEO & Google Business Profile (GBP)",
    foundation: "Profile setup & citation foundation",
    growth: "Domination (monthly geo-grid tracking & posts)",
    dominator: "Domination + multi-location territorial authority",
  },
  {
    feature: "Dynamic Call Tracking (DNI)",
    foundation: "Included (local area number pool)",
    growth: "Included (advanced keyword attribution & whisper)",
    dominator: "Included (call recording & whisper audio)",
  },
  {
    feature: "Server-Side Tracking (Stape.io / CAPI)",
    foundation: "Client-side standard",
    growth: "First-party server container + Meta CAPI",
    dominator: "First-party server container + closed-loop offline sync",
  },
  {
    feature: "Skyup CRM: 24/7 Missed-Call Text Back",
    foundation: "Instant text back under 15s",
    growth: "Instant text back under 15s",
    dominator: "Instant text back under 15s",
  },
  {
    feature: "Skyup CRM: Unified 2-Way Inbox",
    foundation: "SMS + office phone calls",
    growth: "SMS, Calls, WhatsApp, Google Chat & DMs",
    dominator: "Omnichannel unified inbox with staff routing",
  },
  {
    feature: "Skyup CRM: Estimate Follow-Up Sequences",
    foundation: "Manual reminder triggers",
    growth: "Automated multi-step SMS/email nurture",
    dominator: "Automated multi-step nurture + sales rep alerts",
  },
  {
    feature: "Skyup CRM: 5-Star Google Review Workflows",
    foundation: "Automated post-job review requests",
    growth: "Automated review requests + negative review filter",
    dominator: "Full reputation engine & review dispute support",
  },
  {
    feature: "Website Development",
    foundation: "Available as add-on",
    growth: "Available as add-on",
    dominator: "Included (custom Next.js bespoke build)",
  },
  {
    feature: "Conversion Rate Optimisation (CRO)",
    foundation: "Baseline form audit",
    growth: "Full booking funnel friction removal",
    dominator: "Continuous A/B testing & landing page experiments",
  },
  {
    feature: "Social Media Management",
    foundation: "Available as add-on",
    growth: "Included (weekly job-site proof & reviews)",
    dominator: "Included (active multi-platform posting)",
  },
  {
    feature: "Branded Video Editing & Motion Content",
    foundation: "Available as add-on",
    growth: "Available as add-on",
    dominator: "Included (job-site video edits & ad creatives)",
  },
  {
    feature: "Commercial Cold Calling (B2B Outreach)",
    foundation: "Available as add-on",
    growth: "Available as add-on",
    dominator: "Included (facility managers, HOAs & property firms)",
  },
  {
    feature: "Contractor Territory Exclusivity",
    foundation: "No",
    growth: "No",
    dominator: "Strict 1-contractor exclusivity per zip/post code",
  },
  {
    feature: "Communication & Strategy Cadence",
    foundation: "Monthly ROI report & email support",
    growth: "Bi-weekly strategy sprints & live dashboard",
    dominator: "Weekly strategy calls & direct VIP Slack/WhatsApp",
  },
];

const INDIVIDUAL_SERVICES = [
  {
    name: "Skyup CRM Setup & License",
    price: "from €490",
    billing: "one-off + €69/mo",
    icon: LayoutDashboard,
    desc: "Our proprietary all-in-one local contractor CRM. 24/7 missed-call text back (< 15s), unified 2-way SMS/call inbox, estimate follow-ups, and automated Google reviews.",
    slug: "skyup-crm",
    highlight: "Proprietary Software",
  },
  {
    name: "Custom Website Development",
    price: "from €1,290",
    billing: "one-off fixed fee",
    icon: Globe,
    desc: "Bespoke, blazing-fast contractor websites engineered with Next.js & Tailwind. Sub-second load times, mobile call-first UX, and direct estimate booking funnels.",
    slug: "website-development",
    highlight: "Bespoke Build",
  },
  {
    name: "Conversion Rate Optimisation (CRO)",
    price: "from €490",
    billing: "one-off project",
    icon: TrendingUp,
    desc: "Comprehensive landing page and booking funnel audit. We eliminate friction, redesign mobile phone tap targets, and double your estimate bookings from existing traffic.",
    slug: "cro",
    highlight: "Quick ROI",
  },
  {
    name: "Local SEO & GBP Setup",
    price: "from €390",
    billing: "per month",
    icon: MapPin,
    desc: "Dominate the Google Maps 3-pack in your service territory. Google Business Profile optimization, 50+ local citations, monthly geo-grid rank tracking, and Google Posts.",
    slug: "local-seo-gbp",
  },
  {
    name: "Google Ads Management",
    price: "from €450",
    billing: "per month",
    icon: Search,
    desc: "Target emergency repairs, installations, and quote searches with razor-sharp local keywords. Continuous negative keyword scrubbing and ad copy optimization.",
    slug: "google-ads",
  },
  {
    name: "Meta Ads Management",
    price: "from €420",
    billing: "per month",
    icon: Share2,
    desc: "Target local homeowners across Facebook & Instagram with job-site video proof, seasonal offers, and retargeting ads to keep your pipeline consistently full.",
    slug: "meta-ads",
  },
  {
    name: "Server-Side Tracking (Stape.io)",
    price: "from €320",
    billing: "one-off setup",
    icon: Crosshair,
    desc: "GDPR-compliant first-party tracking container with EU Consent Mode v2, Meta CAPI, and Google offline conversion uploads to train smart bidding on high-ticket revenue.",
    slug: "tracking-setup",
  },
  {
    name: "Dynamic Call Tracking",
    price: "from €250",
    billing: "one-off setup",
    icon: Activity,
    desc: "Dynamic Number Insertion (DNI) pool that tags every inbound phone call with the exact search keyword, campaign, and ad creative. Includes whisper audio.",
    slug: "tracking-setup",
  },
  {
    name: "Social Media Management",
    price: "from €320",
    billing: "per month",
    icon: Megaphone,
    desc: "3 weekly localized posts across Facebook, Instagram, and LinkedIn showcasing job-site photos, 5-star customer reviews, and helpful maintenance tips.",
    slug: "social-media-management",
  },
  {
    name: "Branded Content & Video",
    price: "from €490",
    billing: "per month",
    icon: Video,
    desc: "Cinema-grade editing of your raw technician job-site videos, customer testimonials, and branded social assets that position you as the market leader.",
    slug: "branded-content",
  },
  {
    name: "Commercial Cold Calling (B2B)",
    price: "from €590",
    billing: "per month",
    icon: PhoneCall,
    desc: "Dedicated telephone outreach targeting local commercial facility managers, HOAs, property management firms, and letting agents to secure high-ticket maintenance contracts.",
    slug: "cold-calling",
  },
];

const PACKAGES_FAQS = [
  {
    question: "How are ad budgets handled?",
    answer:
      "You pay your advertising budget directly to Google and Meta using your own credit card. We never take a percentage markup or secret commissions on your ad spend, and we never route your ad payments through our accounts. You maintain 100% ownership of your ad accounts.",
  },
  {
    question: "Are we locked into a long-term contract?",
    answer:
      "No. All our monthly partnership packages operate on a simple 90-day initial period to allow sufficient time for keyword testing, call tracking calibration, and Smart Bidding algorithms to mature. After 90 days, you transition to a flexible 30-day rolling agreement.",
  },
  {
    question: "What is Skyup CRM, and how is it different from GoHighLevel or HubSpot?",
    answer:
      "Skyup CRM is our proprietary software engineered specifically for local service businesses and contractors. Unlike bloated corporate platforms, it comes pre-configured with 24/7 instant missed-call text back (< 15 seconds), automated estimate follow-ups, mobile technician dispatch, and one-click Google review requests out of the box.",
  },
  {
    question: "Can we start with a single service and upgrade to a full package later?",
    answer:
      "Absolutely. Many clients start with standalone Website Development, Skyup CRM setup, or Google Ads management. Once you experience the quality of our execution and see your phone ringing with qualified jobs, you can seamlessly upgrade to the Growth Engine or Market Dominator package.",
  },
  {
    question: "How does European VAT and invoicing work?",
    answer:
      "All prices shown exclude VAT. Under EU VAT legislation, B2B services provided to registered VAT entities in EU member states outside our company domicile qualify for the reverse charge mechanism (0% VAT on invoices upon verification of your valid VAT ID). UK clients and non-VAT registered entities will have the applicable tax calculated via Stripe Tax.",
  },
  {
    question: "What is your onboarding timeline?",
    answer:
      "Standalone setups (such as Skyup CRM or Server-Side Tracking) are typically completed in 3 to 5 business days. Full monthly packages (Local Foundation, Growth Engine, Market Dominator) launch within 7 to 10 business days following the completion of your technical onboarding audit.",
  },
];

export default async function PackagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col">
        {/* ================================================================= */}
        {/* HERO */}
        {/* ================================================================= */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-6 text-center">
            <div className="mb-4 flex justify-center">
              <Badge variant="outline" className="gap-2 px-3.5 py-1 text-xs">
                <Sparkles className="size-3 text-accent" />
                <span>Transparent European Growth Pricing</span>
              </Badge>
            </div>

            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Predictable marketing packages for local contractors.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg leading-relaxed">
              Choose an all-in-one monthly growth engine or deploy standalone services
              tailored to your current bottleneck. Clear deliverables, no hidden fees, and zero long-term lock-in.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-accent" />
                All rates in EUR (excl. VAT for EU &amp; UK B2B)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4 text-accent" />
                90-day initial term, then 30-day rolling
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-accent" />
                Direct ad spend ownership
              </span>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3 CORE PACKAGES */}
        {/* ================================================================= */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <Badge variant="secondary" className="mb-3 text-xs">
                Monthly Engagements
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Choose the growth plan tailored to your stage
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                All packages combine paid advertising, local search ranking, call tracking,
                and our proprietary Skyup CRM to ensure no inbound lead is ever lost.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 items-stretch">
              {/* Starter Package: Local Foundation */}
              <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-7">
                <div>
                  <Badge variant="secondary" className="mb-3 text-xs">
                    Starter
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground">Local Foundation</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-foreground">€890</span>
                    <span className="text-xs text-muted-foreground">/ month (excl. VAT)</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    For contractors looking to establish consistent inbound phone calls and stop losing missed leads to competitors.
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                    {[
                      "Google Ads OR Meta Ads (targeted local territory)",
                      "Local SEO & Google Business Profile (GBP) setup",
                      "Skyup CRM: 24/7 Missed-Call Text Back (< 15s)",
                      "Skyup CRM: 2-way SMS/call inbox & technician mobile app",
                      "Automated 5-star Google review request workflows",
                      "Dynamic Call Tracking & keyword attribution",
                      "Monthly lead conversion & ROI reports",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="size-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <Link href="/book-call" className="block w-full">
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      <span>Get Started</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Growth Engine: Most Popular */}
              <div className="relative flex flex-col justify-between rounded-xl border-2 border-accent bg-surface p-7 shadow-xs">
                <div className="absolute -top-3.5 right-6 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground">
                  Most Popular
                </div>
                <div>
                  <Badge variant="default" className="mb-3 text-xs">
                    Growth Engine
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground">Growth Engine</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-foreground">€1,690</span>
                    <span className="text-xs text-muted-foreground">/ month (excl. VAT)</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    Complete multi-channel acquisition engine combining paid search, paid social, local SEO, and full CRM automation.
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
                        <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                          <Check className="size-3 stroke-[3]" />
                        </div>
                        <span className="text-foreground/90 font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <Link href="/book-call" className="block w-full">
                    <Button size="lg" className="w-full gap-2">
                      <span>Book a Strategy Call</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Market Dominator: Full Partner */}
              <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-7">
                <div>
                  <Badge variant="secondary" className="mb-3 text-xs">
                    Market Dominator
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground">Market Dominator</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-foreground">€2,790</span>
                    <span className="text-xs text-muted-foreground">/ month (excl. VAT)</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    We run your entire digital acquisition, tech stack, and outbound commercial bidding pipeline with territory exclusivity.
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
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <Link href="/book-call" className="block w-full">
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
        {/* INDIVIDUAL SERVICE PRICING (A LA CARTE) */}
        {/* ================================================================= */}
        <section id="a-la-carte" className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-12 max-w-2xl">
              <Badge variant="secondary" className="mb-3 text-xs">
                A La Carte Services
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Individual service pricing &amp; standalone setups
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Need help with one specific bottleneck? Hire us for standalone implementations or single-channel management. All rates exclude VAT.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INDIVIDUAL_SERVICES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 transition-all duration-150 hover:border-accent/50"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                          <Icon className="size-5" />
                        </div>
                        {item.highlight && (
                          <span className="font-mono text-[11px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                            {item.highlight}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-foreground">{item.name}</h3>
                      <div className="mt-3 flex items-baseline gap-1.5">
                        <span className="text-2xl font-extrabold text-accent">{item.price}</span>
                        <span className="text-xs text-muted-foreground">({item.billing})</span>
                      </div>
                      <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-border/60">
                      <Link
                        href={`/services/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                      >
                        <span>Explore service details</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* COMPREHENSIVE 3-TIER COMPARISON TABLE */}
        {/* ================================================================= */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-12 max-w-2xl">
              <Badge variant="default" className="mb-3 text-xs">
                Side-by-Side Comparison
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Compare all 3 growth packages side by side
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Review the exact scope, technology integrations, and communication cadence across every tier to find the right fit for your business.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="p-4 md:p-5 font-semibold text-foreground w-[34%]">
                      Feature / Deliverable
                    </th>
                    <th className="p-4 md:p-5 font-semibold text-foreground w-[22%]">
                      Local Foundation
                    </th>
                    <th className="p-4 md:p-5 font-semibold text-accent w-[22%]">
                      Growth Engine ⭐
                    </th>
                    <th className="p-4 md:p-5 font-semibold text-foreground w-[22%]">
                      Market Dominator
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {COMPARISON_DATA.map((row, idx) => (
                    <tr
                      key={idx}
                      className={
                        row.isPrice
                          ? "bg-muted/20 font-bold"
                          : "transition-colors hover:bg-muted/15"
                      }
                    >
                      <td className="p-4 md:p-5 font-medium text-foreground">
                        {row.feature}
                      </td>
                      <td className="p-4 md:p-5 text-foreground/90 text-xs sm:text-sm">
                        {row.foundation === "No" ? (
                          <Minus className="size-4 text-muted-foreground/50" />
                        ) : (
                          row.foundation
                        )}
                      </td>
                      <td className="p-4 md:p-5 text-foreground font-medium text-xs sm:text-sm bg-accent/5">
                        {row.growth}
                      </td>
                      <td className="p-4 md:p-5 text-foreground/90 text-xs sm:text-sm">
                        {row.dominator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* PACKAGES FAQ */}
        {/* ================================================================= */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="mb-10 max-w-2xl">
              <Badge variant="outline" className="mb-3 text-xs">
                Pricing FAQ
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Common questions about billing and contracts
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Clear answers regarding our billing terms, ad spend management, European VAT, and contract flexibility.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
              <Accordion defaultValue={["item-0"]} className="divide-y divide-border">
                {PACKAGES_FAQS.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="py-2">
                    <AccordionTrigger className="text-base font-semibold hover:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* FINAL CTA */}
        {/* ================================================================= */}
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="rounded-2xl border border-border bg-surface px-8 py-12 text-center md:px-16 md:py-16">
              <div className="mx-auto max-w-2xl">
                <Badge variant="default" className="mb-4 gap-2">
                  <ShieldCheck className="size-3 text-accent" />
                  <span>Complimentary Strategy Review</span>
                </Badge>

                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                  Not sure which package is right for your territory?
                </h2>
                <p className="mt-4 text-sm text-muted-foreground sm:text-base leading-relaxed">
                  Book a 30-minute discovery session with our directors. We will analyze your local service area,
                  audit your current cost per lead, and show you exactly what it takes to dominate your local market.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                  <Link href="/book-call" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto gap-2">
                      <span>Book a Strategy Call</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <Link href="/services" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Browse All Services
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-accent" />
                    30-minute phone or video conversation
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-accent" />
                    Actionable roadmap for your zip codes
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
