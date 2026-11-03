import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-150">
      {/* Top minimal bar */}
      <header className="w-full border-b border-border/60 bg-surface/50 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1">
            <Image
              src="/brand/logo-light.svg"
              alt="SkyUp Agency"
              width={136}
              height={34}
              priority
              className="h-8 w-auto object-contain dark:hidden"
            />
            <Image
              src="/brand/logo-dark.svg"
              alt="SkyUp Agency"
              width={136}
              height={34}
              priority
              className="hidden h-8 w-auto object-contain dark:block"
            />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main auth viewport */}
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        <p>&copy; 2026 Skyup Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}
