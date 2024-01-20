import React, { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { MultiEditorViewSelector } from "./multi-editor-view-selector";
import { MultiEditorView } from "./multi-editor-view";

export function MultiEditorUi({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid h-full max-h-[1000px] min-h-[1000px] w-full max-w-[1800px] grid-rows-[auto,auto,1fr] rounded border bg-background lg:rounded-xl",
        className,
      )}
    >
      <MultiEditorViewSelector />
      <Separator />
      <MultiEditorView />
    </div>
  );
}
