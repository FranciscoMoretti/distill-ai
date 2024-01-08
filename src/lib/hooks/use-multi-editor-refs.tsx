"use client";
import { useRef } from "react";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import { type MyValue } from "@/lib/plate/plate-types";

export function useMultiEditorRefs() {
  const mainEditorRef = useRef<PlateEditorType<MyValue> | null>(null);
  const outlineEditorRef = useRef<PlateEditorType<MyValue> | null>(null);
  const summaryEditorRef = useRef<PlateEditorType<MyValue> | null>(null);
  return { mainEditorRef, outlineEditorRef, summaryEditorRef };
}
