import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/plate-ui/button";
import { MainNav } from "@/components/site/main-nav";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";

function NavCommonButtons() {
  return (
    <nav className="flex items-center space-x-1">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <div
          className={buttonVariants({
            size: "sm",
            variant: "ghost",
          })}
        >
          <Icons.gitHub className="h-4 w-4" />
          <span className="sr-only">GitHub</span>
        </div>
      </Link>
      <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
        <div
          className={buttonVariants({
            size: "sm",
            variant: "ghost",
          })}
        >
          <Icons.twitter className="h-5 w-5 fill-current" />
          <span className="sr-only">Twitter</span>
        </div>
      </Link>
      <ThemeToggle />
    </nav>
  );
}

export async function SiteHeader({ className = "" }: { className?: string }) {
  const session = await getServerAuthSession();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background",
        className,
      )}
    >
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <NavCommonButtons />
          <nav>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4",
              )}
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
