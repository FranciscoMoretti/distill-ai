import Link from "next/link";

import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { authOptions, getServerAuthSession } from "@/server/auth";
import { GithubButton } from "@/components/github-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserAccountNav } from "@/components/user-account-nav";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const session = await getServerAuthSession();

  const user = session?.user;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="z-40 w-full bg-background">
        <div className="container flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <div className="flex flex-row items-center gap-3">
              <GithubButton />
              <ThemeToggle />
              {user ? (
                <UserAccountNav
                  user={{
                    name: user.name,
                    image: user.image,
                    email: user.email,
                  }}
                />
              ) : (
                <Link
                  href={authOptions?.pages?.signIn ?? "/api/auth/signin"}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4",
                  )}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
