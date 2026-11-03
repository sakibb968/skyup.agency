import Link from "next/link";
import { getDashboardContext } from "@/lib/dashboard";
import { createServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Layers,
  Calendar,
  CheckCircle2,
  PhoneCall,
  Activity,
  Search,
  Share2,
  Database,
  Crosshair,
  Camera,
  Video,
  Info,
  Globe,
  TrendingUp,
  MapPin,
  LayoutDashboard,
  Megaphone,
} from "lucide-react";

export const metadata = {
  title: "Growth Package & Services — Skyup Agency",
  description: "Your active Skyup agency package, included services, and subscription status.",
};

// Map service icons
function getServiceIcon(iconName: string | null) {
  switch (iconName) {
    case "Search":
      return Search;
    case "Share2":
      return Share2;
    case "Activity":
      return Activity;
    case "Crosshair":
      return Crosshair;
    case "Instagram":
      return Camera;
    case "Megaphone":
      return Megaphone;
    case "Video":
      return Video;
    case "Layers":
      return Layers;
    case "Database":
      return Database;
    case "PhoneCall":
      return PhoneCall;
    case "Globe":
      return Globe;
    case "TrendingUp":
      return TrendingUp;
    case "MapPin":
      return MapPin;
    case "LayoutDashboard":
      return LayoutDashboard;
    default:
      return CheckCircle2;
  }
}

export default async function DashboardPackagePage() {
  const { client } = await getDashboardContext();
  const supabase = await createServerClient();

  // Load current subscription with package and included services
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select(`
      *,
      package:packages (
        *,
        package_services (
          service:services (*)
        )
      )
    `)
    .eq("client_id", client.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  // Extract included services
  type ServiceType = {
    id: string;
    slug: string;
    title: string;
    short_description: string | null;
    icon_name: string | null;
  };

  const includedServices: ServiceType[] = (
    subscription?.package?.package_services
      ?.map((ps: { service: ServiceType | null }) => ps.service)
      .filter((s: ServiceType | null): s is ServiceType => s !== null) || []
  );

  // Status mapping
  const status = subscription?.status || "inactive";
  const isCanceled = status === "canceled" || subscription?.cancel_at_period_end;

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Package & Included Services
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Details of your active growth engagement, billing cycle, and deliverables.
          </p>
        </div>
        <div>
          <Link href="/book-call">
            <Button variant="accent" size="sm" className="gap-2 cursor-pointer">
              <PhoneCall className="size-3.5" />
              Contact account manager
            </Button>
          </Link>
        </div>
      </div>

      {subscription?.package ? (
        <div className="space-y-8">
          {/* Package Overview Card */}
          <Card className="border-border bg-surface shadow-none p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={status === "active" ? "default" : "outline"}
                    className={
                      status === "active"
                        ? "bg-accent/15 text-accent border-accent/20 text-xs px-2.5 py-0.5"
                        : "text-muted-foreground text-xs px-2.5 py-0.5"
                    }
                  >
                    {isCanceled ? "Canceling at period end" : status.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Billing cycle: {subscription.package.billing_interval}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-foreground font-heading">
                  {subscription.package.name}
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-foreground font-mono">
                    €{subscription.package.price_eur?.toLocaleString() || "Custom"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    / {subscription.package.billing_interval} (excl. VAT)
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="p-3 bg-muted/40 rounded-lg border border-border/60 text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-3.5 text-accent" />
                    <span>Current period ends:</span>
                  </div>
                  <div className="font-mono font-medium text-foreground">
                    {subscription.current_period_end
                      ? new Date(subscription.current_period_end).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Ongoing rolling agreement"}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Included Services Section */}
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Active Deliverables & Execution Channels
              </h3>
              <p className="text-xs text-muted-foreground">
                All marketing, software setups, and growth engines currently provisioned under your retainer.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {includedServices.map((service) => {
                const IconComponent = getServiceIcon(service.icon_name);
                return (
                  <Card
                    key={service.id}
                    className="border-border bg-surface shadow-none p-5 flex flex-col justify-between hover:border-accent/40 transition-colors duration-150"
                  >
                    <div className="space-y-3">
                      <div className="size-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                        <IconComponent className="size-4.5" />
                      </div>
                      <h4 className="font-heading font-bold text-base text-foreground">
                        {service.title}
                      </h4>
                      {service.short_description && (
                        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                          {service.short_description}
                        </p>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Card className="border-border bg-surface p-12 text-center space-y-4">
          <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto text-accent">
            <Layers className="size-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-heading font-bold text-lg text-foreground">
              No Active Retainer Package
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You are not currently subscribed to an active growth package. Review our transparent European packages or speak with your dedicated strategy advisor.
            </p>
          </div>
          <Link href="/packages">
            <Button size="sm" className="gap-2">
              <span>Explore Growth Packages</span>
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
