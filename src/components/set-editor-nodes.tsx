"use client";
import { type MyValue } from "@/lib/plate/plate-types";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import { type Editor, Node, type Location, Point, Transforms } from "slate";

/**
 * resetNodes resets the value of the editor.
 */
export function resetNodes(
  editor: Editor,
  options: {
    nodes?: MyValue;
  } = {},
): void {
  const children = [...editor.children];

  children.forEach((node) =>
    editor.apply({ type: "remove_node", path: [0], node }),
  );

  if (options.nodes) {
    const nodes = Node.isNode(options.nodes) ? [options.nodes] : options.nodes;

    nodes.forEach((node, i) =>
      editor.apply({ type: "insert_node", path: [i], node: node }),
    );
  }
}
