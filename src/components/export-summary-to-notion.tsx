"use server";
import { markdownToBlocks } from "@tryfabric/martian";
import { addBlocksToPage } from "../lib/notion/notion-api";
import { type Block } from "@/lib/notion/notion-types";

export async function exportSummaryToNotion(markdown: string) {
  const blocks = markdownToBlocks(markdown);
  console.log(blocks);
  const response = await addBlocksToPage(blocks as Block[]);
  return response;
}
