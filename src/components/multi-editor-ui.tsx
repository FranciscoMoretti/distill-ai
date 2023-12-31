"use client";
import { Button } from "@/components/ui/button";
import { PortablePlateEditor } from "./portable-plate-editor";
import { AutoGenerateOutlineToggle } from "@/components/auto-generate-outline-toggle";
import { GenerateOutlineButton } from "./plate-ui/generate-outline-button";
import { GenerateSummaryButton } from "./plate-ui/generate-summary-button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";

export function MultiEditorUi() {
  const defaultLayout = [265, 440, 655];

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full max-h-[800px] items-stretch rounded bg-background"
    >
      <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
        <div className="flex min-w-[600] items-center px-4 py-2">
          <h1 className="text-xl font-bold">Source</h1>
          <div className="flex w-full flex-row items-center justify-end gap-1">
            <GenerateOutlineButton />
            <AutoGenerateOutlineToggle />
          </div>
        </div>
        <Separator />
        <PortablePlateEditor editorId="mainEditor" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold">Outline</h1>
          <div className="flex w-full flex-row items-center justify-end gap-1">
            <GenerateSummaryButton />
          </div>
        </div>
        <Separator />
        <PortablePlateEditor editorId="outlineEditor" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
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
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
