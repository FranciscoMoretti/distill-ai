"use client";
import { Button } from "@/components/ui/button";
import { useEditorsInteractions } from "@/lib/hooks/use-editors-interactions";
import { toast } from "sonner";

import { exportSummaryToNotion } from "./export-summary-to-notion";
import { Icons } from "@/components/icons";
import React from "react";
import { usePostContext } from "@/lib/post-context";

export function ExportButton() {
  const { getSummaryMarkdown } = useEditorsInteractions();
  const { post } = usePostContext();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function handleExport() {
    const markdown = getSummaryMarkdown();
    if (!markdown) {
      // TODO replace with common toast
      toast("No summary text");
      return;
    }
    const title = post.tite;
    if (!title) {
      // TODO replace with common toast
      toast("No document title");
      return;
    }
    await exportSummaryToNotion(markdown, title);
  }

  return (
    // TODO replace download with cloud download https://stackoverflow.com/a/50695407/12822155

    <Button
      onClick={async () => {
        setIsLoading(true);
        await handleExport();
        // TODO Show success toast!
        setIsLoading(false);
      }}
    >
      <div className="flex flex-row items-center gap-1">
        <div className="flex flex-row items-center gap-2">Export</div>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.export className="mr-2 h-4 w-4" />
        )}
      </div>
    </Button>
  );
}
