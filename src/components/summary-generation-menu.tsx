"use client";
import { Check, RotateCw, Sparkles, StopCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { useMultiEditorStateContext } from "@/lib/multi-editor-state-context";
import { useEditorsInteractions } from "@/lib/hooks/use-editors-interactions";
import { usePostContext } from "@/lib/post-context";

export function SummaryGenerationMenu() {
  return (
    <div className="flex flex-row items-center">
      <SummaryGenerationStart />
      <SummaryGenerationStop />
      <SummaryGenerationStatus />
    </div>
  );
}

export function SummaryGenerationStatus() {
  const { summaryCompletion } = useMultiEditorStateContext();

  return (
    <div className="flex h-10 w-10 items-center justify-center">
      {!summaryCompletion.isLoading ? (
        <Check className="h-4 w-4" />
      ) : (
        <LoadingSpinner className="h-4 w-4" />
      )}
    </div>
  );
}

export function SummaryGenerationStart() {
  const { summaryCompletion } = useMultiEditorStateContext();
  const { generateSummary } = useEditorsInteractions();
  const { post } = usePostContext();

  return (
    <Button
      size={"icon"}
      onClick={async () => await generateSummary(post.title)}
      disabled={summaryCompletion.isLoading}
    >
      <Sparkles className="h-4 w-4" />
    </Button>
  );
}

export function SummaryGenerationStop() {
  const { summaryCompletion } = useMultiEditorStateContext();

  return (
    <Button
      size={"icon"}
      onClick={() => summaryCompletion.stop()}
      variant={"ghost"}
      disabled={!summaryCompletion.isLoading}
    >
      <StopCircle className="h-4 w-4" />
    </Button>
  );
}
