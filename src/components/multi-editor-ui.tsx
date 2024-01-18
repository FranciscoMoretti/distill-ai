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
import React, { Suspense, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useWindowSize } from "usehooks-ts";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LoadingSpinner } from "@/components/loading-spinner";
import { type MultiEditorView } from "@/lib/editor-view";
import { useMultiEditorStateContext } from "@/lib/multi-editor-state-context";
import { MultiEditorSkeleton } from "@/components/editor-skeleton";

export function MultiEditorUi({ className = "" }: { className?: string }) {
  const { view: tabValue, setView: setTabValue } = useMultiEditorStateContext();

  // TODO Replace strings with enum

  const defaultLayout = [50, 50];

  const { width } = useWindowSize();
  useEffect(() => {
    if (width >= 1024) {
      setTabValue("source_outline");
    } else {
      setTabValue("source");
    }
  }, [width]);
  function handleTabValueChange(): ((value: string) => void) | undefined {
    return (value) => {
      if (value) {
        // Only change if another is being selected (don't deselect current)
        setTabValue(value as MultiEditorView);
      }
    };
  }

  const TAB_CN =
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm";

  return (
    <div
      className={cn(
        "flex h-full w-full max-w-[1800px] flex-col justify-stretch overflow-hidden rounded border bg-background lg:rounded-xl",
        className,
      )}
    >
      <div className="flex w-full flex-col items-center py-2">
        <ToggleGroup
          className={cn(
            "h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
            "inline-flex lg:hidden ",
          )}
          type="single"
          value={tabValue}
          onValueChange={handleTabValueChange()}
        >
          <ToggleGroupItem
            size={"sm"}
            className={TAB_CN}
            value="source"
            aria-label="Toggle bold"
          >
            {"Main"}
          </ToggleGroupItem>
          <ToggleGroupItem
            size={"sm"}
            className={TAB_CN}
            value="outline"
            aria-label="Toggle italic"
          >
            {"Outline"}
          </ToggleGroupItem>
          <ToggleGroupItem
            size={"sm"}
            className={TAB_CN}
            value="summary"
            aria-label="Toggle strikethrough"
          >
            {"Summary"}
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          className={cn(
            "h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
            "inline-flex",
            "hidden lg:inline-flex",
          )}
          type="single"
          value={tabValue}
          onValueChange={handleTabValueChange()}
        >
          <ToggleGroupItem
            size={"sm"}
            className={TAB_CN}
            value="source_outline"
            aria-label="Toggle bold"
          >
            {"Source -> Outline"}
          </ToggleGroupItem>

          <ToggleGroupItem
            size={"sm"}
            className={TAB_CN}
            value="outline_summary"
            aria-label="Toggle strikethrough"
          >
            {"Outline -> Summary"}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Separator />

      <Suspense fallback={<MultiEditorSkeleton />}>
        <MultiEditorView width={width} />
      </Suspense>
    </div>
  );
}

export async function MultiEditorView({ width }: { width: number }) {
  const { view, setView: setTabValue } = useMultiEditorStateContext();

  // TODO Replace strings with enum
  const showSourceEditor = ["source", "source_outline"].includes(view);
  const showOutlineEditor = [
    "outline",
    "source_outline",
    "outline_summary",
  ].includes(view);
  const showSummaryEditor = ["summary", "outline_summary"].includes(view);

  if (width != 0) {
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
