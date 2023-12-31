"use client";

import {
  INITIAL_VALUE_MAIN,
  INITIAL_VALUE_OUTLINE,
  INITIAL_VALUE_SUMMARY,
} from "../config/initial_editor_values";
import { MultiEditorProvider } from "@/lib/multi-editor-context";
import { useMultiEditorRefs } from "../lib/hooks/use-multi-editor-refs";
import { useEditorsInteractionsWithRefs } from "../lib/hooks/use-editors-interactions";
import { useWorkspaceConfigContext } from "@/lib/workspace-config-context";
import { MultiEditorUi } from "./multi-editor-ui";

export default function MultiEditor() {
  const { mainEditorRef, outlineEditorRef, summaryEditorRef } =
    useMultiEditorRefs();

  const { generateOutline } = useEditorsInteractionsWithRefs({
    mainEditorRef,
    outlineEditorRef,
    summaryEditorRef,
  });

  const { workspaceConfig } = useWorkspaceConfigContext();
  const { autoGenerateOutline } = workspaceConfig;

  return (
    <MultiEditorProvider
      mainEditor={{
        storageKey: "plate__main",
        editorRef: mainEditorRef,
        initialValue: INITIAL_VALUE_MAIN,
        completionApi: "/api/complete",
        completionId: "main",
        onDebouncedUpdate: () => {
          if (autoGenerateOutline) {
            generateOutline();
          }
        },
      }}
      outlineEditor={{
        storageKey: "plate__outline",
        editorRef: outlineEditorRef,
        initialValue: INITIAL_VALUE_OUTLINE,
        completionApi: "/api/complete",
        completionId: "outline",
      }}
      summaryEditor={{
        storageKey: "plate__summary",
        editorRef: summaryEditorRef,
        initialValue: INITIAL_VALUE_SUMMARY,
        completionApi: "/api/complete",
        completionId: "summary",
      }}
    >
      <MultiEditorUi />
    </MultiEditorProvider>
  );
}
