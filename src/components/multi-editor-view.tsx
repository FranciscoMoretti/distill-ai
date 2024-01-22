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
import { MultiEditorSkeleton } from "@/components/editor-skeleton";

export function MultiEditorView() {
  const { multiEditorTab, editorLayout } = useMultiEditorStateContext();

  // TODO: Replace with Suspense. Here its finding if its first load
  if (editorLayout == "unknown") {
    return <MultiEditorSkeleton />;
  }

  const isFirstTab = multiEditorTab == "first";
  const isSecondTab = multiEditorTab == "second";
  const isThirdTab = multiEditorTab == "third";

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full w-full flex-1"
    >
      <ResizablePanel
        minSize={30}
        className={cn(
          "flex h-full w-full flex-1 flex-col",
          !isFirstTab && "hidden",
        )}
      >
        <MainEditorPanel />
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className={cn("hidden", isFirstTab && "lg:flex")}
      />
      <ResizablePanel
        minSize={30}
        className={cn(
          "flex h-full w-full flex-1 flex-col",
          !isSecondTab && "hidden",
          isFirstTab && "lg:flex", // When dual editor is on first tab, show the outline editor
        )}
      >
        <OutlineEditorPanel />
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className={cn("hidden", isSecondTab && "lg:flex")}
      />
      <ResizablePanel
        minSize={30}
        className={cn(
          "flex h-full w-full flex-1 flex-col",
          !isThirdTab && "hidden",
          isSecondTab && "lg:flex", // When dual editor is on second tab, show the outline editor
        )}
      >
        <SummaryEditorPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
