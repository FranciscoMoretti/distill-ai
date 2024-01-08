"use client";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import slate, { type NodeTypes, serialize } from "remark-slate";
import { unified } from "unified";
import { plateNodeTypes } from "@/lib/remarkslate-nodetypes";
import remarkParse from "remark-parse";
import { type MyValue } from "@/lib/plate/plate-types";

export function markdownToPlate(markdown: string): MyValue | undefined {
  let plateNodes = undefined;
  unified()
    .use(remarkParse)
    .use(slate, {
      nodeTypes: plateNodeTypes,
      imageCaptionKey: "cap",
      imageSourceKey: "src",
    })
    .process(markdown, (err, file) => {
      if (err) throw err;
      plateNodes = file?.result;
    });
  return plateNodes as MyValue | undefined;
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
