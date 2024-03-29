"use client";

import MultiEditor from "@/components/multi-editor";
import { MultiEditorRefsProvider } from "@/lib/multi-editor-state-context";
import {
  type WorkspaceConfig,
  WorkspaceConfigProvider,
} from "@/lib/workspace-config-context";
import React from "react";

const DEFAULT_WORKSPACE_CONFIG: WorkspaceConfig = {
  autoGenerateOutline: true,
};

export function Workspace({
  className = "",
  storage,
}: {
  className?: string;
  storage: "cloud" | "local" | "disabled";
}) {
  const [workspaceConfig, setWorkspaceConfig] = React.useState<WorkspaceConfig>(
    DEFAULT_WORKSPACE_CONFIG,
  );

  // TODO Save workspace config in localstorage and retrieve

  return (
    <WorkspaceConfigProvider
      workspaceConfig={workspaceConfig}
      setWorkspaceConfig={setWorkspaceConfig}
    >
      <MultiEditorRefsProvider>
        <MultiEditor className={className} storage={storage} />
      </MultiEditorRefsProvider>
    </WorkspaceConfigProvider>
  );
}
