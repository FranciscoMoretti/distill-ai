"use client";
import { Button } from "@/components/ui/button";
import { PortablePlateEditor } from "./portable-plate-editor";
import { AutoGenerateOutlineToggle } from "@/components/auto-generate-outline-toggle";
import { GenerateOutlineButton } from "./generate-outline-button";
import { GenerateSummaryButton } from "./generate-summary-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DownloadSummaryButton } from "@/components/download-summary-button";
import { ExportButton } from "@/components/export-button";
import { SummaryGenerationMenu } from "@/components/summary-generation-menu";

export function MainEditorPanel({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(" grid h-full w-full grid-rows-[auto,auto,1fr]", className)}
    >
      <div className="flex min-w-[600] items-center px-4 py-2">
        <h1 className="text-xl font-bold">Source</h1>
        <div className="flex w-full flex-row items-center justify-end gap-2">
          <GenerateOutlineButton />
          <AutoGenerateOutlineToggle />
        </div>
      </div>
      <Separator />
      <PortablePlateEditor editorId="mainEditor" />
    </div>
  );
}
export function OutlineEditorPanel({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(" grid h-full w-full grid-rows-[auto,auto,1fr]", className)}
    >
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Outline</h1>
        <div className="flex w-full flex-row items-center justify-end gap-1">
          <GenerateSummaryButton />
        </div>
      </div>
      <Separator />
      <PortablePlateEditor editorId="outlineEditor" />
    </div>
  );
}
export function SummaryEditorPanel({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn("grid h-full w-full grid-rows-[auto,auto,1fr]", className)}
    >
      <div className="flex items-center gap-4 px-4 py-2">
        <h1 className="text-xl font-bold">Summary</h1>
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <SummaryGenerationMenu />
          <div className="flex w-full flex-row items-center justify-end gap-2">
            <DownloadSummaryButton />
            <ExportButton />
          </div>
        </div>
      </div>
      <Separator />

      <PortablePlateEditor editorId="summaryEditor" />
    </div>
  );
}
