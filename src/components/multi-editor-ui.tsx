"use client";
import { Button } from "@/components/ui/button";
import { PortablePlateEditor } from "./portable-plate-editor";
import { AutoGenerateOutlineToggle } from "@/components/auto-generate-outline-toggle";
import { GenerateOutlineButton } from "./plate-ui/generate-outline-button";
import { GenerateSummaryButton } from "./plate-ui/generate-summary-button";

export function MultiEditorUi() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-row justify-end gap-2">
          <GenerateOutlineButton />
          <AutoGenerateOutlineToggle />
        </div>
        <PortablePlateEditor editorId="mainEditor" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-row items-center justify-end gap-1">
          <GenerateSummaryButton />
        </div>
        <PortablePlateEditor editorId="outlineEditor" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-row items-center justify-end gap-1">
          <Button onClick={() => console.log("export TBD")} disabled>
            <div className="flex flex-row items-center gap-1">Export</div>
          </Button>
        </div>
        <PortablePlateEditor editorId="summaryEditor" />
      </div>
    </div>
  );
}
