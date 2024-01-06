"use client";
import { Button } from "@/components/ui/button";
import { PortablePlateEditor } from "./portable-plate-editor";
import { AutoGenerateOutlineToggle } from "@/components/auto-generate-outline-toggle";
import { GenerateOutlineButton } from "./generate-outline-button";
import { GenerateSummaryButton } from "./generate-summary-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function MainEditorPanel({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex h-full w-full flex-1 flex-col", className)}>
      <div className="flex min-w-[600] items-center px-4 py-2">
        <h1 className="text-xl font-bold">Source</h1>
        <div className="flex w-full flex-row items-center justify-end gap-1">
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
    <div className={cn("flex h-full w-full flex-1 flex-col", className)}>
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
    <div className={cn("flex h-full w-full flex-1 flex-col", className)}>
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Summary</h1>
        <div className="flex w-full flex-row items-center justify-end gap-1">
          <Button onClick={() => console.log("export TBD")} disabled>
            <div className="flex flex-row items-center gap-1">Export</div>
          </Button>
        </div>
      </div>
      <Separator />

      <PortablePlateEditor editorId="summaryEditor" />
    </div>
  );
}
