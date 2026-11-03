import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Mail, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { verifyUnsubscribeToken } from "@/lib/email/unsubscribe";
import { unsubscribeClientAction } from "./actions";

export const metadata: Metadata = {
  title: "Email Preferences | Skyup Agency",
  description: "Manage your email subscriptions and notification preferences with Skyup Agency.",
  robots: { index: false, follow: false },
};

interface UnsubscribePageProps {
  searchParams: Promise<{
    email?: string;
    token?: string;
    type?: string;
  }>;
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const { email, token, type } = await searchParams;

  if (!email || !token) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-border bg-surface">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto size-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
              <AlertTriangle className="size-6" />
            </div>
            <CardTitle className="text-xl font-heading">Invalid Unsubscribe Link</CardTitle>
            <CardDescription className="text-xs text-muted-foreground leading-relaxed">
              This unsubscribe link is missing required verification parameters. Please use the link provided directly in the footer of your email.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button variant="outline" size="sm">
                Return to Homepage
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const isValid = verifyUnsubscribeToken(email, token);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="max-w-[1100px] w-full mx-auto flex items-center justify-between py-4">
        <Link
          href="/"
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
        <Link href="/login" className="text-xs text-muted-foreground hover:text-accent font-mono transition-colors">
          Client Portal &rarr;
        </Link>
      </header>

      {/* Main Form */}
      <main className="flex-1 flex items-center justify-center my-8">
        {!isValid ? (
          <Card className="max-w-md w-full border-border bg-surface shadow-xs">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto size-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                <AlertTriangle className="size-6" />
              </div>
              <CardTitle className="text-xl font-heading">Expired or Invalid Link</CardTitle>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                The cryptographic verification token for <strong className="text-foreground">{email}</strong> has expired or is invalid.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link href="/">
                <Button variant="outline" size="sm">
                  Return to Homepage
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <Card className="max-w-md w-full border-border bg-surface shadow-xs">
            <CardHeader className="space-y-2 text-center">
              <div className="mx-auto size-12 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                <Mail className="size-6" />
              </div>
              <CardTitle className="text-xl font-heading">Unsubscribe Preferences</CardTitle>
              <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                You are managing email preferences for:
                <br />
                <span className="font-mono font-medium text-foreground mt-1 inline-block">{email}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Under European Union GDPR standards, you can opt out of commercial communications with a single click. Essential transactional communications (e.g. billing receipts or urgent security updates) will remain unaffected.
              </p>

              <form action={unsubscribeClientAction} className="space-y-4">
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="token" value={token} />
                <input type="hidden" name="type" value={type || "all"} />

                <div className="rounded-lg border border-border/80 bg-background p-3 text-xs text-muted-foreground space-y-2">
                  <div className="font-semibold text-foreground">What happens when you unsubscribe:</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Removal from monthly contractor marketing insights and case study breakdowns.</li>
                    <li>Opt-out timestamp recorded in compliance with GDPR Article 7(3).</li>
                  </ul>
                </div>

                <Button type="submit" variant="destructive" size="default" className="w-full">
                  Confirm Unsubscribe
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex justify-center border-t border-border pt-4">
              <Link href="/" className="text-xs text-muted-foreground hover:text-accent flex items-center gap-1 transition-colors">
                <span>Never mind, take me back to Skyup Agency</span>
                <ArrowRight className="size-3" />
              </Link>
            </CardFooter>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-[1100px] w-full mx-auto text-center py-4 text-xs text-muted-foreground font-mono border-t border-border/60">
        <p>&copy; {new Date().getFullYear()} Skyup Agency. EU GDPR compliant one-click unsubscribe mechanism.</p>
      </footer>
    </div>
  );
}
