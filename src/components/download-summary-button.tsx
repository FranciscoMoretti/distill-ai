"use client";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useEditorsInteractions } from "../lib/hooks/use-editors-interactions";

export function DownloadSummaryButton() {
  const { generateSummary } = useEditorsInteractions();

  return (
    <Button onClick={async () => await generateSummary()}>
      <div className="flex flex-row items-center gap-1">
        Generate Summary <Sparkles className="h-4 w-4" />
      </div>
    </Button>
  );
}
