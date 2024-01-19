"use client";
import { type MyValue } from "@/lib/plate/plate-types";

export const initial_value_source: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Place your book notes here" }],
  },
];

export const initial_value_outline: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Outline text will be placed here" }],
  },
];

export const initial_value_summary: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "This will be completed by AI" }],
  },
];

export const empty_content: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "" }],
  },
];
