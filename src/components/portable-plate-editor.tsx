"use client";
import { PlateEditor } from "@/components/plate-editor";
import {
  type editorsIds,
  useMultiEditorContext,
} from "@/lib/multi-editor-context";

export function PortablePlateEditor({ editorId }: { editorId: editorsIds }) {
  const context = useMultiEditorContext();
  const props = context[editorId];

  return <PlateEditor {...props} />;
}
