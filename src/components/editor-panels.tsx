"use client";
import { Button } from "@/components/ui/button";
import { PortablePlateEditor } from "./portable-plate-editor";
import { AutoGenerateOutlineToggle } from "@/components/auto-generate-outline-toggle";
import { GenerateOutlineButton } from "./plate-ui/generate-outline-button";
import { GenerateSummaryButton } from "./plate-ui/generate-summary-button";
import { Separator } from "@/components/ui/separator";

export function MainEditorPanel() {
  return (
    <>
      <div className="flex min-w-[600] items-center px-4 py-2">
        <h1 className="text-xl font-bold">Source</h1>
        <div className="flex w-full flex-row items-center justify-end gap-1">
          <GenerateOutlineButton />
          <AutoGenerateOutlineToggle />
        </div>
      </div>
      <Separator />
      <PortablePlateEditor editorId="mainEditor" />
    </>
  );
}
export function OutlineEditorPanel() {
  return (
    <>
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Outline</h1>
        <div className="flex w-full flex-row items-center justify-end gap-1">
          <GenerateSummaryButton />
        </div>
      </div>
      <Separator />
      <PortablePlateEditor editorId="outlineEditor" />
    </>
  );
}
export function SummaryEditorPanel() {
  return (
    <>
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
    </>
  );
}
