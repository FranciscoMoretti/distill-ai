"use client";
import { useRef } from "react";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";

export function useMultiEditorRefs() {
  const mainEditorRef = useRef<PlateEditorType | null>(null);
  const outlineEditorRef = useRef<PlateEditorType | null>(null);
  const summaryEditorRef = useRef<PlateEditorType | null>(null);
  return { mainEditorRef, outlineEditorRef, summaryEditorRef };
}
