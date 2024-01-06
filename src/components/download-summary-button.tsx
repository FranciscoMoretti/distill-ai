"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEditorsInteractions } from "@/lib/hooks/use-editors-interactions";
import { toast } from "sonner";

const downloadMarkdownFile = (markdown: string, fileName: string) => {
  // create file in browser
  const blob = new Blob([markdown], { type: "text/x-markdown" });
  const href = URL.createObjectURL(blob);

  // create "a" HTLM element with href to file
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".md";
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

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
