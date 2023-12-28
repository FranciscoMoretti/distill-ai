"use client";

import { useEffect, useState } from "react";
import EditorPanel from "@/components/editor";
import { extractBoldText } from "@/lib/text-extractor";
import { type Editor, extensions, generateJSON } from "@tiptap/core";

export default function MultiEditor() {
  const [content, setContent] = useState<string>("");
  const [secondEditor, setSecondEditor] = useState<Editor | null>(null);

  useEffect(() => {
    if (content && secondEditor) {
      const filteredContent = extractBoldText(content);
      console.log(filteredContent);

      secondEditor.commands.setContent(
        generateJSON(filteredContent, secondEditor.extensionManager.extensions),
      );
    }
  }, [content]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
      <EditorPanel
        onDebouncedUpdate={(editor) => {
          if (editor) {
            const htmlSTring = editor?.getHTML();
            if (htmlSTring != content) {
              setContent(htmlSTring);
            }
          }
        }}
      />
      <EditorPanel
        setEditor={setSecondEditor}
        // TODO: Fix this hack that produces a new editor everytime when I get access to the editor command API
        onDebouncedUpdate={console.log}
        defaultValue={DEFAULT_TEXT}
        disableLocalStorage={true}
      />
    </div>
  );
}

const DEFAULT_TEXT = {
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
