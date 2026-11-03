"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DashboardNav } from "./dashboard-nav";
import { Menu, X, LogOut } from "lucide-react";
import { logoutAction } from "@/app/(auth)/login/actions";
import type { Profile } from "@/lib/auth";
import type { ClientRecord } from "@/lib/dashboard";

interface DashboardMobileNavProps {
  profile: Profile;
  client: ClientRecord;
}

export function DashboardMobileNav({
  profile,
  client,
}: DashboardMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-surface px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/brand/logo-light.png"
            alt="SkyUp Agency"
            width={112}
            height={28}
            className="h-6.5 w-auto object-contain dark:hidden"
            priority
          />
          <Image
            src="/brand/logo-dark.png"
            alt="SkyUp Agency"
            width={112}
            height={28}
            className="hidden h-6.5 w-auto object-contain dark:block"
            priority
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="size-9 rounded-lg"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </header>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-[280px] max-w-[85vw] bg-surface dark:bg-[#171A20] border-r border-border h-full flex flex-col shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-border">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 outline-none"
              >
                <Image
                  src="/brand/logo-light.png"
                  alt="SkyUp Agency"
                  width={112}
                  height={28}
                  className="h-6.5 w-auto object-contain dark:hidden"
                />
                <Image
                  src="/brand/logo-dark.png"
                  alt="SkyUp Agency"
                  width={112}
                  height={28}
                  className="hidden h-6.5 w-auto object-contain dark:block"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="size-8 rounded-lg"
                aria-label="Close navigation menu"
              >
                <X className="size-4" />
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground px-3 mb-2">
                Workspace
              </div>
              <DashboardNav onItemClick={() => setIsOpen(false)} />
            </div>

            {/* Client Profile Footer */}
            <div className="p-4 border-t border-border mt-auto flex flex-col gap-3">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-raised/50">
                <div className="size-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                  {client.company_name?.charAt(0).toUpperCase() || "C"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-foreground truncate">
                    {client.company_name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono truncate">
                    {profile.email}
                  </span>
                </div>
              </div>

              <form action={logoutAction} className="w-full">
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2 h-9"
                >
                  <LogOut className="size-4 text-muted-foreground" />
                  Sign out
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
