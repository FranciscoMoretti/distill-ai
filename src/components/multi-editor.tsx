"use client";

import { useEffect, useRef, useState } from "react";
import EditorPanel from "@/components/editor";
import { extractBoldText, extractTitle } from "@/lib/text-extractor";
import { type Editor, extensions, generateJSON } from "@tiptap/core";
import { useCompletion } from "ai/react";
import { toast } from "sonner";

export default function MultiEditor() {
  const [mainContent, setMainContent] = useState<string>("");
  const [titleText, setTitleText] = useState<string>("");
  const [outlineContent, setOutlineContent] = useState<string>("");
  const [outlineEditor, setOutlineEditor] = useState<Editor | null>(null);
  const [summaryEditor, setSummaryEditor] = useState<Editor | null>(null);

  useEffect(() => {
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
  }, [mainContent]);

  useEffect(() => {
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
      <EditorPanel
        completionApi={"/api/complete"}
        onDebouncedUpdate={(editor) => {
          if (editor) {
            const htmlSTring = editor?.getHTML();
            if (htmlSTring != mainContent) {
              setMainContent(htmlSTring);
            }
          }
        }}
      />
      <EditorPanel
        setEditor={setOutlineEditor}
        completionApi={"/api/complete"}
        // TODO: Fix this hack that produces a new editor everytime when I get access to the editor command API
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
      <EditorPanel
        setEditor={setSummaryEditor}
        completionApi={"/api/complete"}
        // TODO: Fix this hack that produces a new editor everytime when I get access to the editor command API
        onDebouncedUpdate={console.log}
        defaultValue={DEFAULT_SUMMARY_TEXT}
        disableLocalStorage={false}
        storageKey="novel__summary"
      />
    </div>
  );
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
