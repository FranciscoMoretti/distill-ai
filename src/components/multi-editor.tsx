"use client";

import { useEffect, useRef, useState } from "react";
import EditorPanel from "@/components/editor-panel";
import { extractBoldTextMD, extractTitleMD } from "@/lib/text-extractor";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Link, Sparkles } from "lucide-react";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import { resetNodes } from "@/components/set-editor-nodes";

import { plateToMarkdown, markdownToPlate } from "@/components/plate-markdown";
import { type MyValue } from "@/lib/plate/plate-types";
import { type Editor } from "slate";

export default function MultiEditor() {
  const [titleText, setTitleText] = useState<string>("");
  const mainEditorRef = useRef<PlateEditorType | null>(null);
  const outlineEditorRef = useRef<PlateEditorType | null>(null);
  const summaryEditorRef = useRef<PlateEditorType | null>(null);

  const [autoGenerateOutline, setAutoGenerateOutline] =
    useState<boolean>(false);

  function generateOutline() {
    const mainEditor = mainEditorRef.current;
    const outlineEditor = outlineEditorRef.current;
    if (!(outlineEditor && mainEditor)) return;
    const markdown = plateToMarkdown(mainEditor);

    const boldedMarkdown = extractBoldTextMD(markdown);

    const titleText = extractTitleMD(markdown);
    if (titleText) {
      setTitleText(titleText);
    }
    if (boldedMarkdown) {
      const boldedNodes = markdownToPlate(boldedMarkdown);
      if (boldedNodes) {
        resetNodes(outlineEditor as Editor, {
          nodes: boldedNodes,
        });
      }
    }
  }

  async function GenerateSummary() {
    const outlineEditor = outlineEditorRef.current;
    const summaryEditor = summaryEditorRef.current;
    if (!(outlineEditor && summaryEditor)) return;

    const markdown = plateToMarkdown(outlineEditor);
    if (markdown) {
      console.log({ markdown });
      if (markdown && summaryEditor) {
        await complete(markdown, {
          body: { title: titleText },
        }).catch((err) => console.error(err));
      }
    }
  }

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "ai_summary",
    api: "/api/generate",
    onFinish: (_prompt, completion) => {
      // TODO: Decide behavior to do on finish
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const summaryEditor = summaryEditorRef.current;
    if (summaryEditor && completion) {
      // reset prev when `complete` is called again
      if (prev?.current.length > completion.length) {
        prev.current = "";
      }
      const completionNodes = markdownToPlate(completion);
      if (completionNodes) {
        resetNodes(summaryEditor as Editor, {
          nodes: completionNodes,
        });
      }
    }
  }, [summaryEditorRef, completion]);

  return (
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

        <EditorPanel
          storageKey="plate__main"
          editorRef={mainEditorRef}
          initialValue={DEFAULT_MAIN_TEXT}
          completionApi={"/api/complete"}
          completionId={"main"}
          onDebouncedUpdate={() => {
            if (autoGenerateOutline) {
              generateOutline();
            }
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-row items-center justify-end gap-1">
          <Button onClick={async () => await GenerateSummary()}>
            <div className="flex flex-row items-center gap-1">
              Generate Summary <Sparkles className="h-4 w-4" />
            </div>
          </Button>
        </div>
        <EditorPanel
          storageKey="plate__outline"
          editorRef={outlineEditorRef}
          initialValue={DEFAULT_OUTLINE_TEXT}
          completionApi={"/api/complete"}
          completionId={"outline"}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-row items-center justify-end gap-1">
          <Button onClick={() => console.log("export TBD")} disabled>
            <div className="flex flex-row items-center gap-1">Export</div>
          </Button>
        </div>
        <EditorPanel
          storageKey="plate__summary"
          editorRef={summaryEditorRef}
          initialValue={DEFAULT_SUMMARY_TEXT}
          completionApi={"/api/complete"}
          completionId={"summary"}
        />
      </div>
    </div>
  );
}

const DEFAULT_MAIN_TEXT: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Place your book notes here" }],
  },
];

const DEFAULT_OUTLINE_TEXT: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Outline text will be placed here" }],
  },
];

const DEFAULT_SUMMARY_TEXT: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "This will be completed by AI" }],
  },
];
