"use client";

import { useEffect, useRef, useState } from "react";
import EditorPanel from "@/components/editor-panel";
import { extractBoldText, extractTitle } from "@/lib/text-extractor";
import { type Editor, extensions, generateJSON } from "@tiptap/core";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { Toggle } from "@/src/components/ui/toggle";
import { Link, Sparkles } from "lucide-react";

export default function MultiEditor() {
  const [mainContent, setMainContent] = useState<string>("");
  const [titleText, setTitleText] = useState<string>("");
  const [outlineContent, setOutlineContent] = useState<string>("");
  const [outlineEditor, setOutlineEditor] = useState<Editor | null>(null);
  const [summaryEditor, setSummaryEditor] = useState<Editor | null>(null);
  const [autoGenerateOutline, setAutoGenerateOutline] =
    useState<boolean>(false);

  function generateOutline() {
    if (mainContent && outlineEditor) {
      const filteredContent = extractBoldText(mainContent);
      const titleText = extractTitle(mainContent);
      if (titleText) {
        setTitleText(titleText);
      }
      outlineEditor.commands.setContent(
        generateJSON(
          filteredContent,
          outlineEditor.extensionManager.extensions,
        ),
      );
    }
  }

  useEffect(() => {
    if (autoGenerateOutline) {
      generateOutline();
    }
  }, [mainContent, autoGenerateOutline]);

  useEffect(() => {
    GenerateSummary();
  }, [outlineContent, summaryEditor]);

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "ai_summary",
    api: "/api/generate",
    onFinish: (_prompt, completion) => {
      summaryEditor?.commands.setTextSelection({
        from: summaryEditor.state.selection.from - completion.length,
        to: summaryEditor.state.selection.from,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    summaryEditor?.commands.insertContent(diff);
  }, [isLoading, summaryEditor, completion]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-row justify-end gap-2">
          <Button onClick={() => generateOutline()}>Generate Outline</Button>
          <Toggle
            aria-label="Toggle Auto Generate Outline"
            pressed={autoGenerateOutline}
            onPressedChange={(pressed) => setAutoGenerateOutline(pressed)}
            variant="outline"
          >
            <Link className="h-4 w-4" />
          </Toggle>
        </div>

        <EditorPanel
          completionApi={"/api/complete"}
          completionId={"main"}
          onDebouncedUpdate={(editor) => {
            if (editor) {
              const htmlSTring = editor?.getHTML();
              if (htmlSTring != mainContent) {
                setMainContent(htmlSTring);
              }
            }
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-row items-center justify-end gap-1">
          <Button onClick={() => GenerateSummary()}>
            <div className="flex flex-row items-center gap-1">
              Generate Summary <Sparkles className="h-4 w-4" />
            </div>
          </Button>
        </div>
        <EditorPanel
          setEditor={setOutlineEditor}
          completionApi={"/api/complete"}
          completionId={"outline"}
          onDebouncedUpdate={(editor) => {
            if (editor) {
              // TODO not update on every update
              const textString = editor?.getText();
              if (textString != outlineContent) {
                setOutlineContent(textString);
              }
            }
          }}
          defaultValue={DEFAULT_OUTLINE_TEXT}
          disableLocalStorage={false}
          storageKey="novel__outline"
        />
      </div>
      <EditorPanel
        setEditor={setSummaryEditor}
        completionApi={"/api/complete"}
        completionId={"summary"}
        // TODO: Fix this hack that produces a new editor everytime when I get access to the editor command API
        onDebouncedUpdate={console.log}
        defaultValue={DEFAULT_SUMMARY_TEXT}
        disableLocalStorage={false}
        storageKey="novel__summary"
      />
    </div>
  );

  function GenerateSummary() {
    if (outlineContent) {
      console.log({ outlineContent, outlineEditor });
      if (outlineContent && summaryEditor) {
        summaryEditor.commands.setContent("");
        (async () =>
          await complete(outlineContent, {
            body: { title: titleText },
          }))().catch((err) => console.error(err));
      }
    }
  }
}

const DEFAULT_OUTLINE_TEXT = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Outline",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This will be completed automatically",
        },
      ],
    },
  ],
};

const DEFAULT_SUMMARY_TEXT = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Summary",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This will be completed by AI",
        },
      ],
    },
  ],
};
