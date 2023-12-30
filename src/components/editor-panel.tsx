"use client";

import { useEffect, useRef, useState } from "react";
import { Editor as NovelEditor } from "novel";
import { type JSONContent } from "@tiptap/core";
import { type Editor } from "@tiptap/core";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PlateEditor } from "@/components/plate-editor";
import { serialize } from "remark-slate";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";

export default function EditorPanel({
  onDebouncedUpdate,
  storageKey,
  defaultValue,
  completionApi,
  completionId,
  setEditor = undefined,
  disableLocalStorage = false,
}: {
  onDebouncedUpdate:
    | ((editor?: Editor | undefined) => void | Promise<void>)
    | undefined;
  completionApi?: string;
  completionId?: string;
  storageKey: string;
  setEditor?: (editor: Editor) => void;
  defaultValue?: string | JSONContent | undefined;
  disableLocalStorage?: boolean;
}) {
  const editorRef = useRef<PlateEditorType | null>(null);

  const [saveStatus, setSaveStatus] = useState("Saved");

  useEffect(() => {
    if (editorRef.current?.value) {
      const value = editorRef.current?.value;
      // console.log(value.map((v) => serialize(v)).join(""));
    }
  });

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div>
      <ScrollArea className="h-[1000px] overflow-y-auto rounded-md border p-4">
        <PlateEditor
          // TODO: Implement debounced input or debounced change
          editorRef={editorRef}
          storageKey={storageKey}
        />

        <NovelEditor
          onCreate={(editor) => {
            setSaveStatus("Unsaved");
            if (editor && setEditor) {
              setEditor(editor);
            }
          }}
          onDebouncedUpdate={async (editor) => {
            setSaveStatus("Saving...");
            if (onDebouncedUpdate) {
              await onDebouncedUpdate(editor);
            }
            // Simulate a delay in saving.
            setTimeout(() => {
              setSaveStatus("Saved");
            }, 500);
          }}
          completionApi={completionApi}
          completionId={completionId}
          storageKey={storageKey}
          defaultValue={defaultValue}
          disableLocalStorage={disableLocalStorage}
        />
      </ScrollArea>
    </div>
  );
}
