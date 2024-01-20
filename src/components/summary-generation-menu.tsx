"use client";
import { Check, RotateCw, StopCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { useMultiEditorStateContext } from "@/lib/multi-editor-state-context";
import { useEditorsInteractions } from "@/lib/hooks/use-editors-interactions";
import { usePostContext } from "@/lib/post-context";

export function SummaryGenerationMenu() {
  return (
    <div className="flex flex-row items-center gap-2">
      <SummaryGenerationStop />
      <SummaryGenerationStatus />
    </div>
  );
}

export function SummaryGenerationStatus() {
  const { summaryCompletion } = useMultiEditorStateContext();

  if (!summaryCompletion.isLoading) {
    return <Check className="h-4 w-4" />;
  } else {
    return <LoadingSpinner className="h-4 w-4" />;
  }
}

export function SummaryGenerationStop() {
  const { summaryCompletion } = useMultiEditorStateContext();
  const { generateSummary } = useEditorsInteractions();
  const { post } = usePostContext();

  if (summaryCompletion.isLoading) {
    return (
      <Button onClick={() => summaryCompletion.stop()} variant={"ghost"}>
        <StopCircle className="h-4 w-4" />
      </Button>
    );
  }
  return (
    <Button
      onClick={async () => await generateSummary(post.title)}
      variant={"ghost"}
    >
      <RotateCw className="h-4 w-4" />
    </Button>
  );
}
