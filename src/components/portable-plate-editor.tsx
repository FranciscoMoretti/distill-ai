"use client";
import { PlateEditor } from "@/components/plate-editor";
import { useMultiEditorConfigContext } from "@/lib/multi-editor-config-context";
import { type editorsIds } from "@/lib/editors-ids";

export function PortablePlateEditor({ editorId }: { editorId: editorsIds }) {
  const context = useMultiEditorConfigContext();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const props = context[editorId];

  return <PlateEditor {...props} />;
}
