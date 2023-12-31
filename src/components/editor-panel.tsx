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
  return (
    <PlateEditor
      onDebouncedUpdate={onDebouncedUpdate}
      initialValue={initialValue}
      onChange={onChange}
      editorRef={editorRef}
      storageKey={storageKey}
    />
  );
}
