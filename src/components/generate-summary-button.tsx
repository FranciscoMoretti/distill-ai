"use client";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useEditorsInteractions } from "../lib/hooks/use-editors-interactions";
import { usePostContext } from "@/lib/post-context";

export function GenerateSummaryButton() {
  const { generateSummary } = useEditorsInteractions();
  const { post } = usePostContext();

  return (
    <Button onClick={async () => await generateSummary(post.name)}>
      <div className="flex flex-row items-center gap-2">
        Generate Summary <Sparkles className="h-4 w-4" />
      </div>
    </Button>
  );
}
