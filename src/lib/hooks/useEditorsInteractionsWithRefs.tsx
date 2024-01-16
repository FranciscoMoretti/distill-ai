"use client";
import { type MutableRefObject, useEffect, useRef } from "react";
import { extractBoldTextMD } from "../unified/markdown-processor";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import { resetNodes } from "@/lib/plate/transforms/reset-nodes";
import { plateToMarkdown, markdownToPlate } from "@/lib/unified/plate-markdown";
import { type Editor } from "slate";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import { type MyValue } from "@/lib/plate/plate-types";
import { type SingleEditorView, type MultiEditorView } from "@/lib/editor-view";

export function useEditorsInteractionsWithRefs({
  mainEditorRef,
  outlineEditorRef,
  summaryEditorRef,
  view,
  setView,
}: {
  mainEditorRef: MutableRefObject<PlateEditorType<MyValue> | null>;
  outlineEditorRef: MutableRefObject<PlateEditorType<MyValue> | null>;
  summaryEditorRef: MutableRefObject<PlateEditorType<MyValue> | null>;
  view: MultiEditorView;
  setView: (view: MultiEditorView) => void;
}) {
  function focusOnView(
    view: MultiEditorView,
    setView: (view: MultiEditorView) => void,
    newView: SingleEditorView,
  ) {
    // Join into a single transitionToView that takes a newView and checks current to decide if needed
    // No need to pass view and setView
    if (newView === "source") {
      transitionToSourceViewIfNeeded(view, setView);
    } else if (newView === "outline") {
      transitionToOutlineViewIfNeeded(view, setView);
    } else if (newView === "summary") {
      transitionToSummaryViewIfNeeded(view, setView);
    }
  }

  function transitionToSourceViewIfNeeded(
    view: MultiEditorView,
    setView: (view: MultiEditorView) => void,
  ) {
    if (view === "outline" || view === "summary") {
      setView("source");
    } else if (view === "outline_summary") {
      setView("source_outline");
    }
  }

  function transitionToOutlineViewIfNeeded(
    view: MultiEditorView,
    setView: (view: MultiEditorView) => void,
  ) {
    if (view === "source" || view === "summary") {
      setView("outline");
    } else if (view === "outline_summary") {
      setView("source_outline");
    }
  }

  function transitionToSummaryViewIfNeeded(
    view: MultiEditorView,
    setView: (view: MultiEditorView) => void,
  ) {
    // TODO make some smooth transition logic with CSS
    if (view === "source" || view === "outline") {
      setView("summary");
    } else if (view === "source_outline") {
      setView("outline_summary");
    }
  }

  async function generateSummary(title: string) {
    const outlineEditor = outlineEditorRef.current;
    const summaryEditor = summaryEditorRef.current;
    const mainEditor = mainEditorRef.current;
    if (!(outlineEditor && summaryEditor && mainEditor)) return;
    const markdown = plateToMarkdown(outlineEditor);
    if (markdown && summaryEditor) {
      focusOnView(view, setView, "summary");
      await complete(markdown, {
        body: { title: title },
      }).catch((err) => console.error(err));
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
  };
}
