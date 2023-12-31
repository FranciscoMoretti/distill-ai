"use client";

import { type MutableRefObject, useEffect, useRef, useState } from "react";
import { Editor as NovelEditor } from "novel";
import { type JSONContent } from "@tiptap/core";
import { type Editor } from "@tiptap/core";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PlateEditor } from "@/components/plate-editor";
import { serialize } from "remark-slate";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import { type MyValue } from "@/lib/plate/plate-types";

export default function EditorPanel({
  onDebouncedUpdate,
  onChange,
  storageKey,
  completionApi,
  editorRef,
  completionId,
  initialValue,
  disableLocalStorage = false,
}: {
  onDebouncedUpdate?:
    | ((editor?: Editor | undefined) => void | Promise<void>)
    | undefined;
  onChange?: (() => void | Promise<void>) | undefined;
  completionApi?: string;
  completionId?: string;
  storageKey?: string;
  editorRef: MutableRefObject<null | PlateEditorType>;
  initialValue?: MyValue | undefined;
  disableLocalStorage?: boolean;
}) {
  const [saveStatus, setSaveStatus] = useState("Saved");

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div>
      <ScrollArea className="h-[1000px] overflow-y-auto rounded-md border p-4">
        <PlateEditor
          onDebouncedUpdate={async () => {
            setSaveStatus("Saving...");
            if (onDebouncedUpdate) {
              await onDebouncedUpdate();
            }
            // Simulate a delay in saving.
            setTimeout(() => {
              setSaveStatus("Saved");
            }, 500);
          }}
          initialValue={initialValue}
          onChange={onChange}
          editorRef={editorRef}
          storageKey={storageKey}
        />
      </ScrollArea>
    </div>
  );
}
