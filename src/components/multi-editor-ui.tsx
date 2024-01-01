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
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useWindowSize } from "usehooks-ts";
import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LoadingSpinner } from "@/components/loading-spinner";

export function MultiEditorUi({ className = "" }: { className?: string }) {
  type EditorType =
    | "source"
    | "outline"
    | "summary"
    | "source_outline"
    | "outline_summary";

  const [tabValue, setTabValue] = useState<EditorType>("source");

  const showSourceEditor = ["source", "source_outline"].includes(tabValue);
  const showOutlineEditor = [
    "outline",
    "source_outline",
    "outline_summary",
  ].includes(tabValue);
  const showSummaryEditor = ["summary", "outline_summary"].includes(tabValue);
  const defaultLayout = [50, 50];
  const { width } = useWindowSize();
  useEffect(() => {
    if (width >= 1024) {
      setTabValue("source_outline");
    } else {
      setTabValue("source");
    }
  }, [width]);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-stretch justify-stretch rounded bg-background",
        className,
      )}
    >
      <ToggleGroup
        className="block lg:hidden"
        type="single"
        value={tabValue}
        onValueChange={(value) => setTabValue(value as EditorType)}
      >
        {/* // TODO: Create a style like tabs and fix fallback loading UI*/}
        <ToggleGroupItem value="source" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="outline" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="summary" aria-label="Toggle strikethrough">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        className="hidden lg:block"
        type="single"
        value={tabValue}
        onValueChange={(value) => setTabValue(value as EditorType)}
      >
        <ToggleGroupItem value="source_outline" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>

        <ToggleGroupItem
          value="outline_summary"
          aria-label="Toggle strikethrough"
        >
          <Italic className="h-4 w-4" />
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <Separator />
      {/* // TODO: Fix this workaround that prevents hydration error (same first render on client and server) */}
      {width != 0 ? (
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes,
            )}`;
          }}
          className="h-full items-stretch "
        >
          <ResizablePanel
            defaultSize={50}
            minSize={30}
            className={cn(!showSourceEditor && "hidden")}
          >
            <MainEditorPanel />
          </ResizablePanel>
          <ResizableHandle
            withHandle
            className={cn(!(showSourceEditor && showOutlineEditor) && "hidden")}
          />
          <ResizablePanel
            defaultSize={50}
            minSize={30}
            className={cn(!showOutlineEditor && "hidden")}
          >
            <OutlineEditorPanel />
          </ResizablePanel>
          <ResizableHandle
            withHandle
            className={cn(
              !(showOutlineEditor && showSummaryEditor) && "hidden",
            )}
          />
          <ResizablePanel
            defaultSize={50}
            minSize={30}
            className={cn(!showSummaryEditor && "hidden")}
          >
            <SummaryEditorPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
