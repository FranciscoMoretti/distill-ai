"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useWindowSize } from "usehooks-ts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  type MultiEditorTabsValues,
  type SingleEditorView,
} from "@/lib/editor-view";
import { useMultiEditorStateContext } from "@/lib/multi-editor-state-context";

export function MultiEditorViewSelector() {
  const { multiEditorTab: tabValue, setMultiEditorTab } =
    useMultiEditorStateContext();

  const defaultLayout = [50, 50];

  // TODO Replace strings with enum
  function handleTabValueChange(): (value: MultiEditorTabsValues) => void {
    return (value) => {
      if (value) {
        setMultiEditorTab(value);
      }
    };
  }

  const TAB_CN =
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm";

  return (
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
          value="first"
          aria-label="Toggle bold"
        >
          {"Main"}
        </ToggleGroupItem>
        <ToggleGroupItem
          size={"sm"}
          className={TAB_CN}
          value="second"
          aria-label="Toggle italic"
        >
          {"Outline"}
        </ToggleGroupItem>
        <ToggleGroupItem
          size={"sm"}
          className={TAB_CN}
          value="third"
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
          value="first"
          aria-label="Toggle bold"
        >
          {"Source -> Outline"}
        </ToggleGroupItem>

        <ToggleGroupItem
          size={"sm"}
          className={TAB_CN}
          value="second"
          aria-label="Toggle strikethrough"
        >
          {"Outline -> Summary"}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
