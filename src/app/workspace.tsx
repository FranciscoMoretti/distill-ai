"use client";

import MultiEditor from "@/components/multi-editor";
import {
  type WorkspaceConfig,
  WorkspaceConfigProvider,
} from "@/lib/workspace-config-context";
import React from "react";

const DEFAULT_WORKSPACE_CONFIG: WorkspaceConfig = {
  autoGenerateOutline: true,
};

export function Workspace({ className = "" }: { className?: string }) {
  const [workspaceConfig, setWorkspaceConfig] = React.useState<WorkspaceConfig>(
    DEFAULT_WORKSPACE_CONFIG,
  );

  // TODO Save workspace config in localstorage and retrieve

  // TODO This id should come from the doc creation in the db
  const documentId = "test_ID";

  return (
    <WorkspaceConfigProvider
      workspaceConfig={workspaceConfig}
      setWorkspaceConfig={setWorkspaceConfig}
    >
      <MultiEditor className={className} documentId={documentId} />
    </WorkspaceConfigProvider>
  );
}
