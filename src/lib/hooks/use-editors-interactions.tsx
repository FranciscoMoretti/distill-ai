"use client";
import { type MutableRefObject, useEffect, useRef, useState } from "react";
import { extractBoldTextMD } from "../unified/markdown-processor";
import { extractTitleMD } from "../unified/markdown-processor";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import { resetNodes } from "@/lib/plate/transforms/reset-nodes";
import { plateToMarkdown, markdownToPlate } from "@/lib/unified/plate-markdown";
import { type Editor } from "slate";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import { useMultiEditorContext } from "@/lib/multi-editor-context";
import { type MyValue } from "@/lib/plate/plate-types";

export function useEditorsInteractions() {
  const { mainEditor, outlineEditor, summaryEditor } = useMultiEditorContext();
  const { editorRef: mainEditorRef } = mainEditor;
  const { editorRef: outlineEditorRef } = outlineEditor;
  const { editorRef: summaryEditorRef } = summaryEditor;

  return useEditorsInteractionsWithRefs({
    mainEditorRef,
    outlineEditorRef,
    summaryEditorRef,
  });
}

export function useEditorsInteractionsWithRefs({
  mainEditorRef,
  outlineEditorRef,
  summaryEditorRef,
}: {
  mainEditorRef: MutableRefObject<PlateEditorType<MyValue> | null>;
  outlineEditorRef: MutableRefObject<PlateEditorType<MyValue> | null>;
  summaryEditorRef: MutableRefObject<PlateEditorType<MyValue> | null>;
}) {
  // TODO Func should be lowercase

  function getDocumentTitle() {
    const mainEditor = mainEditorRef.current;
    if (!mainEditor) return;
    const mainMd = plateToMarkdown(mainEditor);
    const titleText = extractTitleMD(mainMd);
    return titleText;
  }

  async function generateSummary() {
    const outlineEditor = outlineEditorRef.current;
    const summaryEditor = summaryEditorRef.current;
    const mainEditor = mainEditorRef.current;
    if (!(outlineEditor && summaryEditor && mainEditor)) return;
    const titleText = getDocumentTitle();
    const markdown = plateToMarkdown(outlineEditor);
    if (markdown) {
      console.log({ markdown });
      if (markdown && summaryEditor) {
        await complete(markdown, {
          body: { title: titleText },
        }).catch((err) => console.error(err));
      }
    }
  }

  function generateOutline() {
    const mainEditor = mainEditorRef.current;
    const outlineEditor = outlineEditorRef.current;
    if (!(outlineEditor && mainEditor)) return;
    const markdown = plateToMarkdown(mainEditor);

    const boldedMarkdown = extractBoldTextMD(markdown);

    const boldedNodes = markdownToPlate(boldedMarkdown);
    if (boldedNodes) {
      resetNodes(outlineEditor as Editor, {
        nodes: boldedNodes,
      });
    }
  }

  function getSummaryMarkdown() {
    const summary = summaryEditorRef.current;
    if (!summary) return;
    const markdown = plateToMarkdown(summary);
    return markdown;
  }

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "ai_summary",
    api: "/api/generate",
    onFinish: (_prompt, completion) => {
      // TODO: Decide behavior to do on finish
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const summaryEditor = summaryEditorRef.current;
    if (summaryEditor && completion) {
      // reset prev when `complete` is called again
      if (prev?.current.length > completion.length) {
        prev.current = "";
      }
      const completionNodes = markdownToPlate(completion);
      if (completionNodes) {
        resetNodes(summaryEditor as Editor, {
          nodes: completionNodes,
        });
      }
    }
  }, [summaryEditorRef, completion]);

  return {
    generateSummary,
    generateOutline,
    getSummaryMarkdown,
    getDocumentTitle,
  };
}
