import React, { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { MultiEditorSkeleton } from "@/components/editor-skeleton";
import { MultiEditorViewSelector } from "./multi-editor-view-selector";
import { MultiEditorView } from "./multi-editor-view";

export function MultiEditorUi({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full max-h-[1000px] min-h-[1000px] w-full max-w-[1800px] flex-col justify-stretch overflow-hidden rounded border bg-background lg:rounded-xl ",
        className,
      )}
    >
      <MultiEditorViewSelector />
      <Separator />
      <MultiEditorView />
    </div>
  );
}
