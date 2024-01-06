"use client";
import { Button } from "@/components/ui/button";
import { useEditorsInteractions } from "@/lib/hooks/use-editors-interactions";
import { toast } from "sonner";

import { exportSummaryToNotion } from "./export-summary-to-notion";

export function ExportButton() {
  const { getSummaryMarkdown, getDocumentTitle } = useEditorsInteractions();

  async function handleExport() {
    const markdown = getSummaryMarkdown();
    if (!markdown) {
      toast("No summary text");
      return;
    }
    const title = getDocumentTitle();
    if (!title) {
      toast("No document title");
      return;
    }
    await exportSummaryToNotion(markdown, title);
  }

  return (
    // TODO replace download with cloud download https://stackoverflow.com/a/50695407/12822155

    <Button
      onClick={async () => {
        await handleExport();
      }}
    >
      <div className="flex flex-row items-center gap-1">Export</div>
    </Button>
  );
}
