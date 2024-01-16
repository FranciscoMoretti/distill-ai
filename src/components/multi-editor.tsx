"use client";

import {
  INITIAL_VALUE_MAIN,
  INITIAL_VALUE_OUTLINE,
  INITIAL_VALUE_SUMMARY,
} from "../config/editor-initial-values";
import { MultiEditorConfigProvider } from "@/lib/multi-editor-config-context";
import { useEditorsInteractionsWithRefs } from "@/lib/hooks/useEditorsInteractionsWithRefs";
import { useWorkspaceConfigContext } from "@/lib/workspace-config-context";
import { type MyValue } from "@/lib/plate/plate-types";
import { updateDatabase } from "@/lib/update-database";
import { usePostContext } from "@/lib/post-context";
import { MultiEditorUi } from "@/components/multi-editor-ui";
import { useMultiEditorStateContext } from "@/lib/multi-editor-state-context";

export default function MultiEditor({
  className = "",
}: {
  className?: string;
}) {
  const { post, setPost } = usePostContext();
  const documentId = post.id;
  const { mainEditorRef, outlineEditorRef, summaryEditorRef, view, setView } =
    useMultiEditorStateContext();

  const { generateOutline } = useEditorsInteractionsWithRefs({
    mainEditorRef,
    outlineEditorRef,
    summaryEditorRef,
    view,
    setView,
  });

  const { workspaceConfig } = useWorkspaceConfigContext();
  const { autoGenerateOutline } = workspaceConfig;

  return (
    <MultiEditorConfigProvider
      mainEditor={{
        storageKey: "plate__main",
        disableLocalStorage: true,
        editorRef: mainEditorRef,
        initialValue: post.source
          ? (JSON.parse(post.source) as MyValue)
          : INITIAL_VALUE_MAIN,
        completionApi: "/api/complete",
        completionId: "main",
        onDebouncedUpdate: async (value: MyValue) => {
          if (autoGenerateOutline) {
            generateOutline();
          }
          // TODO Propagate to the other editors
          // TODO Connect with ID from database upsert post creation
          if (documentId) {
            await updateDatabase(documentId, "source", value);
          }
        },
      }}
      outlineEditor={{
        storageKey: "plate__outline",
        disableLocalStorage: true,
        editorRef: outlineEditorRef,
        initialValue: post.outline
          ? (JSON.parse(post.outline) as MyValue)
          : INITIAL_VALUE_OUTLINE,
        completionApi: "/api/complete",
        completionId: "outline",
        onDebouncedUpdate: async (value: MyValue) => {
          if (documentId) {
            await updateDatabase(documentId, "outline", value);
          }
        },
      }}
      summaryEditor={{
        storageKey: "plate__summary",
        disableLocalStorage: true,
        editorRef: summaryEditorRef,
        initialValue: post.summary
          ? (JSON.parse(post.summary) as MyValue)
          : INITIAL_VALUE_SUMMARY,
        completionApi: "/api/complete",
        completionId: "summary",
        onDebouncedUpdate: async (value: MyValue) => {
          if (documentId) {
            await updateDatabase(documentId, "summary", value);
          }
        },
      }}
    >
      <MultiEditorUi className={className} />
    </MultiEditorConfigProvider>
  );
}
