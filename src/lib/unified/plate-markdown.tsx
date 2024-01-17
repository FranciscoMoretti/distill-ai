"use client";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import { type NodeTypes, serialize } from "remark-slate";
import { plateNodeTypes } from "@/lib/remarkslate-nodetypes";
import { type MyValue } from "@/lib/plate/plate-types";
import { deserializeMd } from "@udecode/plate-serializer-md";

export function markdownToPlate(
  markdown: string,
  editor: PlateEditorType<MyValue>,
): MyValue | undefined {
  const plateNodes = deserializeMd<MyValue>(editor, markdown) as
    | MyValue
    | undefined;
  return plateNodes;
}

export function plateToMarkdown(editor: PlateEditorType<MyValue>): string {
  return editor.children
    .map((v) =>
      serialize(v, {
        nodeTypes: plateNodeTypes as NodeTypes,
      }),
    )
    .join("");
}
