"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  MainEditorPanel,
  OutlineEditorPanel,
  SummaryEditorPanel,
} from "./editor-panels";
import React from "react";
import { cn } from "@/lib/utils";
import { useMultiEditorStateContext } from "@/lib/multi-editor-state-context";

export async function MultiEditorView() {
  const { view } = useMultiEditorStateContext();

  // TODO Replace strings with enum
  const showSourceEditor = ["source", "source_outline"].includes(view);
  const showOutlineEditor = [
    "outline",
    "source_outline",
    "outline_summary",
  ].includes(view);
  const showSummaryEditor = ["summary", "outline_summary"].includes(view);

  if (view != "loading") {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full min-h-[800px] w-full flex-1"
      >
        <ResizablePanel
          minSize={30}
          className={cn(
            "flex h-full w-full flex-1 flex-col",
            !showSourceEditor && "hidden",
          )}
        >
          <MainEditorPanel />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className={cn(!(showSourceEditor && showOutlineEditor) && "hidden")}
        />
        <ResizablePanel
          minSize={30}
          className={cn(
            "flex h-full w-full flex-1 flex-col",

            !showOutlineEditor && "hidden",
          )}
        >
          <OutlineEditorPanel />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className={cn(!(showOutlineEditor && showSummaryEditor) && "hidden")}
        />
        <ResizablePanel
          minSize={30}
          className={cn(
            "flex h-full w-full flex-1 flex-col",

            !showSummaryEditor && "hidden",
          )}
        >
          <SummaryEditorPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
}
