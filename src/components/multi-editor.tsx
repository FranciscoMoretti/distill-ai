"use client";

import { useEffect, useState } from "react";
import EditorPanel from "@/components/editor";
import { extractBoldText } from "@/lib/text-extractor";
import { type Editor, extensions, generateJSON } from "@tiptap/core";

export default function MultiEditor() {
  const [mainContent, setMainContent] = useState<string>("");
  const [outlineEditor, setOutlineEditor] = useState<Editor | null>(null);
  const [summaryEditor, setSummaryEditor] = useState<Editor | null>(null);

  useEffect(() => {
    if (mainContent && outlineEditor) {
      const filteredContent = extractBoldText(mainContent);
      console.log(filteredContent);

      outlineEditor.commands.setContent(
        generateJSON(
          filteredContent,
          outlineEditor.extensionManager.extensions,
        ),
      );
    }
  }, [mainContent]);

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
        onDebouncedUpdate={console.log}
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
