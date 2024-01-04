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

  const TAB_CN =
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm";

  return (
    <div
      className={cn(
        "flex h-full w-full max-w-screen-2xl flex-col justify-stretch rounded bg-background",
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
          onValueChange={(value) => setTabValue(value as EditorType)}
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
          onValueChange={(value) => setTabValue(value as EditorType)}
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
