import MultiEditor from "@/components/multi-editor";
import {
  type WorkspaceConfig,
  WorkspaceConfigProvider,
} from "@/lib/workspace-config-context";
import React from "react";

const DEFAULT_WORKSPACE_CONFIG = {
  autoCreateOutline: true,
};

export function Workspace() {
  const [workspaceConfig, setWorkspaceConfig] = React.useState<WorkspaceConfig>(
    DEFAULT_WORKSPACE_CONFIG,
  );

  // TODO Save workspace config in localstorage and retrieve

  return (
    <WorkspaceConfigProvider
      workspaceConfig={workspaceConfig}
      setWorkspaceConfig={setWorkspaceConfig}
    >
      <MultiEditor />
    </WorkspaceConfigProvider>
  );
}
