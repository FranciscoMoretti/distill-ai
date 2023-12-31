"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Link, Sparkles } from "lucide-react";

import {
  INITIAL_VALUE_MAIN,
  INITIAL_VALUE_OUTLINE,
  INITIAL_VALUE_SUMMARY,
} from "../config/initial_editor_values";
import { MultiEditorProvider } from "@/lib/multi-editor-context";
import { useMultiEditorRefs } from "../lib/hooks/use-multi-editor-refs";
import { PortablePlateEditor } from "./portable-plate-editor";
import { useEditorsInteractions } from "../lib/hooks/use-editors-interactions";

export default function MultiEditor() {
  const { mainEditorRef, outlineEditorRef, summaryEditorRef } =
    useMultiEditorRefs();

  const { GenerateSummary, generateOutline } = useEditorsInteractions({
    mainEditorRef,
    outlineEditorRef,
    summaryEditorRef,
  });

  const [autoGenerateOutline, setAutoGenerateOutline] =
    useState<boolean>(false);

  return (
    <MultiEditorProvider
      mainEditor={{
        storageKey: "plate__main",
        editorRef: mainEditorRef,
        initialValue: INITIAL_VALUE_MAIN,
        completionApi: "/api/complete",
        completionId: "main",
        onDebouncedUpdate: () => {
          if (autoGenerateOutline) {
            generateOutline();
          }
        },
      }}
      outlineEditor={{
        storageKey: "plate__outline",
        editorRef: outlineEditorRef,
        initialValue: INITIAL_VALUE_OUTLINE,
        completionApi: "/api/complete",
        completionId: "outline",
      }}
      summaryEditor={{
        storageKey: "plate__summary",
        editorRef: summaryEditorRef,
        initialValue: INITIAL_VALUE_SUMMARY,
        completionApi: "/api/complete",
        completionId: "summary",
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex w-full flex-row justify-end gap-2">
            <Button onClick={() => generateOutline()}>Generate Outline</Button>
            <Toggle
              aria-label="Toggle Auto Generate Outline"
              pressed={autoGenerateOutline}
              onPressedChange={(pressed) => {
                setAutoGenerateOutline(pressed);
                if (pressed) {
                  generateOutline();
                }
              }}
              variant="outline"
            >
              <Link className="h-4 w-4" />
            </Toggle>
          </div>
          <PortablePlateEditor editorId="mainEditor" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex w-full flex-row items-center justify-end gap-1">
            <Button onClick={async () => await GenerateSummary()}>
              <div className="flex flex-row items-center gap-1">
                Generate Summary <Sparkles className="h-4 w-4" />
              </div>
            </Button>
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
    </MultiEditorProvider>
  );
}
