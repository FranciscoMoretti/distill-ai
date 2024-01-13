import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/plate-ui/button";

export function GithubButton() {
  return (
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
  );
}
