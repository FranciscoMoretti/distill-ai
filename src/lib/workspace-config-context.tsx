"use client";
import React, {
  createContext,
  useContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface WorkspaceConfig {
  autoGenerateOutline: boolean;
  // Add more configuration properties as needed
}

interface WorkspaceConfigContextProps {
  workspaceConfig: WorkspaceConfig;
  setWorkspaceConfig: (config: WorkspaceConfig) => void;
}

const WorkspaceConfigContext = createContext<
  WorkspaceConfigContextProps | undefined
>(undefined);
export const WorkspaceConfigProvider: React.FC<{
  workspaceConfig: WorkspaceConfig;
  setWorkspaceConfig: Dispatch<SetStateAction<WorkspaceConfig>>;
  children: ReactNode;
}> = ({ workspaceConfig, setWorkspaceConfig, children }) => {
  return (
    <WorkspaceConfigContext.Provider
      value={{ workspaceConfig, setWorkspaceConfig }}
    >
      {children}
    </WorkspaceConfigContext.Provider>
  );
};

export const useWorkspaceConfigContext = () => {
  const context = useContext(WorkspaceConfigContext);
  if (!context) {
    throw new Error(
      "useWorkspaceConfigContext must be used within a WorkspaceConfigProvider",
    );
  }
  return context;
};
