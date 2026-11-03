import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/80 transition-colors duration-200">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="Skyup Home"
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
            <p className="text-xs text-muted-foreground leading-relaxed">
              Full-service growth agency for local contractors and service businesses across Europe (EU &amp; UK).
            </p>
            <div className="space-y-1.5 text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-accent" />
                <span>Frankfurt am Main, Germany (EU)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-accent" />
                <span>contact@skyup.agency</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Performance Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/skyup-crm" className="text-muted-foreground hover:text-accent transition-colors">
                  Skyup CRM (Proprietary)
                </Link>
              </li>
              <li>
                <Link href="/services/website-development" className="text-muted-foreground hover:text-accent transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services/cro" className="text-muted-foreground hover:text-accent transition-colors">
                  Conversion Optimisation (CRO)
                </Link>
              </li>
              <li>
                <Link href="/services/local-seo-gbp" className="text-muted-foreground hover:text-accent transition-colors">
                  Local SEO &amp; GBP Setup
                </Link>
              </li>
              <li>
                <Link href="/services/google-ads" className="text-muted-foreground hover:text-accent transition-colors">
                  Google Ads Management
                </Link>
              </li>
              <li>
                <Link href="/services/meta-ads" className="text-muted-foreground hover:text-accent transition-colors">
                  Meta Ads Management
                </Link>
              </li>
              <li>
                <Link href="/services/tracking-setup" className="text-muted-foreground hover:text-accent transition-colors">
                  Dynamic Call Tracking
                </Link>
              </li>
              <li>
                <Link href="/services/cold-calling" className="text-muted-foreground hover:text-accent transition-colors">
                  Commercial Cold Calling
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  About SkyUp
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-accent transition-colors">
                  Case Studies &amp; Results
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-muted-foreground hover:text-accent transition-colors">
                  Packages &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/book-call" className="text-muted-foreground hover:text-accent transition-colors">
                  Book a Strategy Call
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-accent font-medium hover:underline inline-flex items-center gap-1">
                  <span>Client Portal Login</span>
                  <ArrowRight className="size-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              EU &amp; UK Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-accent transition-colors">
                  Privacy Policy (GDPR)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-accent transition-colors">
                  Cookie Policy &amp; Consent
                </Link>
              </li>
              <li>
                <Link href="/imprint" className="text-muted-foreground hover:text-accent transition-colors">
                  Imprint (Impressum)
                </Link>
              </li>
              <li>
                <Link href="/dpa" className="text-muted-foreground hover:text-accent transition-colors">
                  Data Processing Agreement (DPA)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Skyup Agency. All rights reserved.</p>
          <p className="font-mono text-[11px]">
            Server region: Frankfurt (fra1) &middot; GDPR &amp; ePrivacy Compliant
          </p>
        </div>
      </div>
    </footer>
  );
}
