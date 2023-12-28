"use client";

import { useEffect, useState } from "react";
import { Editor as NovelEditor } from "novel";
import { type JSONContent } from "@tiptap/core";
import { type Editor } from "@tiptap/core";

export default function EditorPanel({
  onDebouncedUpdate,
  storageKey,
  defaultValue,
  setEditor = undefined,
  disableLocalStorage = false,
}: {
  onDebouncedUpdate:
    | ((editor?: Editor | undefined) => void | Promise<void>)
    | undefined;
  storageKey?: string | undefined;
  setEditor?: (editor: Editor) => void;
  defaultValue?: string | JSONContent | undefined;
  disableLocalStorage?: boolean;
}) {
  const [saveStatus, setSaveStatus] = useState("Saved");

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div>
      <NovelEditor
        onCreate={(editor) => {
          setSaveStatus("Unsaved");
          if (editor && setEditor) {
            setEditor(editor as Editor);
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
        storageKey={storageKey}
        defaultValue={defaultValue}
        disableLocalStorage={disableLocalStorage}
      />
    </div>
  );
}
