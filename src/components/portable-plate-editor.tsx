"use client";
import { PlateEditor } from "@/components/plate-editor";
import { useMultiEditorContext } from "@/lib/multi-editor-context";
import { type editorsIds } from "@/lib/editorsIds";

export function PortablePlateEditor({ editorId }: { editorId: editorsIds }) {
  const context = useMultiEditorContext();
  const props = context[editorId];

  return <PlateEditor {...props} />;
}
