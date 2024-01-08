import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/server/auth";
import { Icons } from "@/components/icons";

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Distill AI - Your Intelligent Book Summarizer
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Whether you're a student, researcher, or reader, Distill AI empowers
            you to organize raw book notes, create structured outlines, and
            generate personalized summaries using advanced AI technology.
          </p>
          <div className="space-x-4">
            {/* // TODO The singin link comes from Distill AI and t3 is not configured to redirect correctly with it yet (redirects to login) */}
            <Link
              href={authOptions?.pages?.signIn ?? "/api/auth/signin"}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 md:py-12 lg:py-24 dark:bg-transparent"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 ">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.folderTree className="h-12 w-12 " />

              <div className="space-y-2">
                <h3 className="font-bold">Effortless Organization</h3>
                <p className="text-sm text-muted-foreground">
                  Input and edit raw book notes seamlessly in the Raw Notes
                  Editor.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.ul className="h-12 w-12 " />
              <div className="space-y-2">
                <h3 className="font-bold">Structured Outlining</h3>
                <p className="text-sm">
                  Create organized outlines by selecting and transferring
                  content to the Outline Editor.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.magic className="h-12 w-12 " />

              <div className="space-y-2">
                <h3 className="font-bold">AI-Powered Summaries</h3>
                <p className="text-sm text-muted-foreground">
                  Generate personalized book summaries with a single click using
                  ChatGPT integration.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.download className="h-12 w-12 " />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Save drafts for future reference and export summaries in
                  various formats.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Distill AI also includes a blog and a full-featured documentation
            site built using Contentlayer and MDX.
          </p>
        </div> */}
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Distill AI is open source and powered by open source software.{" "}
            <br /> The code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{" "}
          </p>
        </div>
      </section>
    </>
  );
}
