"use client";
import { extractBoldTextMD } from "../unified/markdown-processor";
import { resetNodes } from "@/lib/plate/transforms/reset-nodes";
import { plateToMarkdown, markdownToPlate } from "@/lib/unified/plate-markdown";
import { type Editor } from "slate";
import { useMultiEditorStateContext } from "@/lib/multi-editor-state-context";

export function useEditorsInteractions() {
  const stateContext = useMultiEditorStateContext();

  return useEditorsInteractionsWithRefs(stateContext);
}

export function useEditorsInteractionsWithRefs({
  mainEditorRef,
  outlineEditorRef,
  summaryEditorRef,
  setCurrentEditor,
  summaryCompletion,
}: ReturnType<typeof useMultiEditorStateContext>) {
  async function generateSummary(title: string) {
    const outlineEditor = outlineEditorRef.current;
    const summaryEditor = summaryEditorRef.current;
    const mainEditor = mainEditorRef.current;
    if (!(outlineEditor && summaryEditor && mainEditor)) return;
    const markdown = plateToMarkdown(outlineEditor);
    if (markdown && summaryEditor) {
      setCurrentEditor("summary");
      await summaryCompletion
        .complete(markdown, {
          body: { title: title },
        })
        .catch((err) => console.error(err));
    }
  }

  function generateOutline() {
    const mainEditor = mainEditorRef.current;
    const outlineEditor = outlineEditorRef.current;
    if (!(outlineEditor && mainEditor)) return;
    const markdown = plateToMarkdown(mainEditor);

    const boldedMarkdown = extractBoldTextMD(markdown);

    const boldedNodes = markdownToPlate(boldedMarkdown, outlineEditor);
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

  // TODO Move this out of editor interactions into multiEditor State context (EditorInteractionsContext)

  return {
    generateSummary,
    generateOutline,
    getSummaryMarkdown,
  };
}
