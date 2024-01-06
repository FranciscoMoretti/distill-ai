"use server";
import { markdownToBlocks } from "@tryfabric/martian";
import {
  addBlocksToPage,
  addNotionPageToDatabase,
} from "../lib/notion/notion-api";
import { type Block } from "@/lib/notion/notion-types";
import { env } from "@/env";

const mainDbId = env.NOTION_PAGE_ID;

export async function exportSummaryToNotion(
  bodyMarkdown: string,
  titleMarkdown: string,
) {
  const bodyBlocks = markdownToBlocks(bodyMarkdown);
  const addPageResponse = await addNotionPageToDatabase(mainDbId, {
    Title: {
      type: "title",
      title: [{ type: "text", text: { content: titleMarkdown } }],
    },
  });
  console.log(addPageResponse);
  const { id: pageId } = addPageResponse;
  const response = await addBlocksToPage(pageId, bodyBlocks as Block[]);
  return response;
}
