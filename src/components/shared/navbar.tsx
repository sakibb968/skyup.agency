"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/portfolio" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Client Login", href: "/login" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors duration-200">
      <nav
        className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6"
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          aria-label="Skyup Home"
        >
          {/* Light mode logo */}
          <Image
            src="/brand/logo-light.png"
            alt="SkyUp Agency"
            width={136}
            height={34}
            priority
            className="h-8 w-auto object-contain dark:hidden"
          />
          {/* Dark mode logo */}
          <Image
            src="/brand/logo-dark.png"
            alt="SkyUp Agency"
            width={136}
            height={34}
            priority
            className="hidden h-8 w-auto object-contain dark:block"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1 py-0.5"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3.5 md:flex">
          <ThemeToggle />
          <Link href="/book-call">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-xs sm:text-sm font-semibold text-accent-foreground transition-all duration-150 hover:bg-accent/90 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="size-3.5" />
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="flex items-center gap-2.5 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-surface-raised cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={cn(
          "overflow-hidden border-t border-border bg-surface/95 backdrop-blur-xl transition-all duration-200 ease-in-out md:hidden",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-auto flex max-w-[1100px] flex-col gap-1.5 px-6 py-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-11 items-center rounded-lg px-3 text-base font-medium text-foreground hover:bg-surface-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 border-t border-border pt-4">
            <Link href="/book-call" onClick={() => setMobileOpen(false)}>
              <button
                type="button"
                className="w-full flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight className="size-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
