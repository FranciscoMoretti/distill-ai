"use client";
import { Toggle } from "@/components/ui/toggle";
import { Link } from "lucide-react";
import { useEditorsInteractions } from "../lib/hooks/use-editors-interactions";
import { useWorkspaceConfigContext } from "@/lib/workspace-config-context";

export function AutoGenerateOutlineToggle() {
  const { generateOutline } = useEditorsInteractions();

  const { workspaceConfig, setWorkspaceConfig } = useWorkspaceConfigContext();
  const { autoGenerateOutline } = workspaceConfig;

  return (
    <Toggle
      aria-label="Toggle Auto Generate Outline"
      pressed={autoGenerateOutline}
      onPressedChange={(pressed) => {
        setWorkspaceConfig({
          ...workspaceConfig,
          autoGenerateOutline: pressed,
        });
        if (pressed) {
          generateOutline();
        }
      }}
      variant="outline"
    >
      <Link className="h-4 w-4" />
    </Toggle>
  );
}
