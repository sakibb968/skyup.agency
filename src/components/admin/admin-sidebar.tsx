import Link from "next/link";
import Image from "next/image";
import { AdminNav } from "./admin-nav";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/lib/auth";

interface AdminSidebarProps {
  profile: Profile;
}

export function AdminSidebar({ profile }: AdminSidebarProps) {
  const isOwnerAdmin = profile.role === "admin";

  return (
    <aside className="hidden lg:flex w-[240px] shrink-0 flex-col border-r border-border bg-surface min-h-screen sticky top-0 h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-border justify-between">
        <Link
          href="/admin"
          className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
        >
          <Image
            src="/brand/logo-light.png"
            alt="SkyUp Agency"
            width={124}
            height={31}
            className="h-7 w-auto object-contain dark:hidden"
            priority
          />
          <Image
            src="/brand/logo-dark.png"
            alt="SkyUp Agency"
            width={124}
            height={31}
            className="hidden h-7 w-auto object-contain dark:block"
            priority
          />
        </Link>
        <Badge
          variant={isOwnerAdmin ? "accent" : "outline"}
          className="text-[10px] px-1.5 py-0 h-5 uppercase tracking-wider font-mono font-bold shrink-0"
        >
          {profile.role}
        </Badge>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2 font-mono">
          Administration
        </div>
        <AdminNav isOwnerAdmin={isOwnerAdmin} />
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-border mt-auto">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-raised/50">
          <div className="size-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold font-mono">
            {profile.full_name?.charAt(0).toUpperCase() || profile.email.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-foreground truncate">
              {profile.full_name || profile.email}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono truncate">
              {profile.email}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
