"use client";
import { type MyValue } from "@/lib/plate/plate-types";

export const INITIAL_VALUE_MAIN: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Place your book notes here" }],
  },
];
export const INITIAL_VALUE_OUTLINE: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Outline text will be placed here" }],
  },
];
export const INITIAL_VALUE_SUMMARY: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "This will be completed by AI" }],
  },
];
