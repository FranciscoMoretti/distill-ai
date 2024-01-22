"use client";

import {
  initial_value_source,
  initial_value_outline,
  initial_value_summary,
} from "../config/editor-initial-values";
import { MultiEditorConfigProvider } from "@/lib/multi-editor-config-context";
import { useEditorsInteractionsWithRefs } from "@/lib/hooks/use-editors-interactions";
import { useWorkspaceConfigContext } from "@/lib/workspace-config-context";
import { type MyValue } from "@/lib/plate/plate-types";
import { updateDatabase } from "@/lib/update-database";
import { usePostContext } from "@/lib/post-context";
import { MultiEditorUi } from "@/components/multi-editor-ui";
import { useMultiEditorStateContext } from "@/lib/multi-editor-state-context";
import { resetNodes } from "@/lib/plate/transforms/reset-nodes";
import { useEffect, useRef } from "react";
import { plateToMarkdown, markdownToPlate } from "@/lib/unified/plate-markdown";
import { toast } from "sonner";
import { type Editor } from "slate";

export default function MultiEditor({
  className = "",
  storage,
}: {
  className?: string;
  storage: "cloud" | "local";
}) {
  const { post, setPost } = usePostContext();
  const documentId = post.id;
  const multiEditorState = useMultiEditorStateContext();
  const {
    mainEditorRef,
    outlineEditorRef,
    summaryEditorRef,
    summaryCompletion,
  } = multiEditorState;
  const { completion } = summaryCompletion;
  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const summaryEditor = summaryEditorRef.current;
    if (summaryEditor && completion) {
      // reset prev when `complete` is called again
      if (prev?.current.length > completion.length) {
        prev.current = "";
      }
      const completionNodes = markdownToPlate(completion, summaryEditor);
      if (completionNodes) {
        resetNodes(summaryEditor as Editor, {
          nodes: completionNodes,
        });
      }
    }
  }, [summaryEditorRef, completion]);

  const { generateOutline } = useEditorsInteractionsWithRefs(multiEditorState);

  const { workspaceConfig } = useWorkspaceConfigContext();
  const { autoGenerateOutline } = workspaceConfig;

  return (
    <MultiEditorConfigProvider
      mainEditor={{
        storageKey: "plate__source",
        disableLocalStorage: storage !== "local",
        editorRef: mainEditorRef,
        initialValue: post.source
          ? (JSON.parse(post.source) as MyValue)
          : initial_value_source,
        completionApi: "/api/complete",
        completionId: "main",
        onDebouncedUpdate: async (value: MyValue) => {
          if (autoGenerateOutline) {
            generateOutline();
          }
          // TODO Propagate to the other editors
          // TODO Connect with ID from database upsert post creation
          if (documentId && storage === "cloud") {
            await updateDatabase(documentId, "source", value);
          }
        },
      }}
      outlineEditor={{
        storageKey: "plate__outline",
        disableLocalStorage: storage !== "local",
        editorRef: outlineEditorRef,
        initialValue: post.outline
          ? (JSON.parse(post.outline) as MyValue)
          : initial_value_outline,
        completionApi: "/api/complete",
        completionId: "outline",
        onDebouncedUpdate: async (value: MyValue) => {
          if (documentId && storage === "cloud") {
            await updateDatabase(documentId, "outline", value);
          }
        },
      }}
      summaryEditor={{
        storageKey: "plate__summary",
        disableLocalStorage: storage !== "local",
        editorRef: summaryEditorRef,
        initialValue: post.summary
          ? (JSON.parse(post.summary) as MyValue)
          : initial_value_summary,
        completionApi: "/api/complete",
        completionId: "summary",
        onDebouncedUpdate: async (value: MyValue) => {
          if (documentId && storage === "cloud") {
            await updateDatabase(documentId, "summary", value);
          }
        },
      }}
    >
      <MultiEditorUi className={className} />
    </MultiEditorConfigProvider>
  );
}
