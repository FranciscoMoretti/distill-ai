"use client";
import { type MyValue } from "@/lib/plate/plate-types";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";

export function setEditorNodes(editor: PlateEditorType, nodes: MyValue) {
  // TODO replace with a proper Transform
  editor.children = nodes;
  // Trigger a re-render
  // Reference: https://docs.slatejs.org/walkthroughs/06-saving-to-a-database#:~:text=If%20you%20want%20to%20update,transform%20the%20value%2C%20for%20example%3A
  editor.onChange();
}
