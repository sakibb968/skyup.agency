import Link from "next/link";
import Image from "next/image";
import { CookieSettingsButton } from "@/components/shared/cookie-settings-button";

const FOOTER_SECTIONS = [
  {
    title: "Performance Services",
    links: [
      { label: "Skyup CRM (Proprietary)", href: "/services/skyup-crm" },
      { label: "Website Development", href: "/services/website-development" },
      { label: "Conversion Optimisation (CRO)", href: "/services/cro" },
      { label: "Local SEO & GBP Setup", href: "/services/local-seo-gbp" },
      { label: "Google Ads Management", href: "/services/google-ads" },
      { label: "Meta Ads Management", href: "/services/meta-ads" },
      { label: "Dynamic Call Tracking", href: "/services/tracking-setup" },
      { label: "Commercial Cold Calling", href: "/services/cold-calling" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Agency", href: "/about" },
      { label: "Verified Case Studies", href: "/portfolio" },
      { label: "Growth Packages", href: "/packages" },
      { label: "Contact Us", href: "/contact" },
      { label: "Book a Strategy Call", href: "/book-call" },
    ],
  },
  {
    title: "Compliance & Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Imprint (Impressum)", href: "/legal/imprint" },
      { label: "Data Processing Agreement", href: "/legal/dpa" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface transition-colors duration-200">
      <div className="mx-auto max-w-[1100px] px-6 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Corporate Column (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="Skyup Agency Home"
            >
              <Image
                src="/brand/logo-light.png"
                alt="SkyUp Agency"
                width={136}
                height={34}
                className="h-8 w-auto object-contain dark:hidden"
              />
              <Image
                src="/brand/logo-dark.png"
                alt="SkyUp Agency"
                width={136}
                height={34}
                className="hidden h-8 w-auto object-contain dark:block"
              />
            </Link>

            <p className="max-w-[320px] text-xs sm:text-sm leading-relaxed text-muted-foreground mt-1">
              Performance marketing, dynamic call tracking, and automated lead capture
              for ambitious local service businesses across Europe (EU + UK) and North America.
            </p>

            {/* Official EU Corporate Info */}
            <div className="mt-3 text-xs text-muted-foreground space-y-1 border-t border-border pt-4">
              <p className="font-semibold text-foreground">Skyup Agency OÜ</p>
              <p>Tornimäe tn 5, 10145 Tallinn, Estonia</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                EU VAT & GDPR Compliant Infrastructure · Region fra1
              </p>
            </div>
          </div>

          {/* Nav Link Columns (3 cols on lg) */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-3.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {section.title === "Compliance & Legal" && (
                  <li className="pt-1">
                    <CookieSettingsButton />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Skyup Agency OÜ. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/legal/imprint" className="hover:text-foreground transition-colors">
              Imprint
            </Link>
            <Link href="/legal/dpa" className="hover:text-foreground transition-colors">
              DPA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
