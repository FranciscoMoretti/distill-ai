"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEditorsInteractions } from "@/lib/hooks/use-editors-interactions";
import { toast } from "sonner";
import { downloadMarkdownFile } from "@/lib/download-markdown";

export function DownloadSummaryButton() {
  const { getSummaryMarkdown, getDocumentTitle } = useEditorsInteractions();

  return (
    // TODO replace download with cloud download https://stackoverflow.com/a/50695407/12822155

    <Button
      onClick={async () => {
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
        // TODO convert title to kebabcase
        downloadMarkdownFile(markdown, title + "-summary");
      }}
    >
      <div className="flex flex-row items-center gap-1">
        Download <Download className="h-4 w-4" />
      </div>
    </Button>
  );
}
