"use client";
import { Check, StopCircle } from "lucide-react";
import { useCompletion } from "ai/react";
import { LoadingSpinner } from "@/components/loading-spinner";

export function SummaryGenerationButton() {
  const { isLoading, stop } = useCompletion({
    id: "ai_summary",
    api: "/api/generate",
  });

  // TODO Implement stop functionality
  if (!isLoading) {
    return <Check className="h-4 w-4" />;
  } else {
    return <LoadingSpinner className="h-4 w-4" />;
  }
}
