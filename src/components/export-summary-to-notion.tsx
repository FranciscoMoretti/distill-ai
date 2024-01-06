"use server";
import { markdownToBlocks } from "@tryfabric/martian";
import {
  addBlocksToPage,
  addNotionPageToDatabase,
} from "../lib/notion/notion-api";
import { type Block } from "@/lib/notion/notion-types";
import { createMainDatabases } from "@/lib/notion/create-main-databases";

export async function exportSummaryToNotion(
  bodyMarkdown: string,
  titleMarkdown: string,
) {
  const { summaryDatabaseResponse } = await createMainDatabases();
  const bodyBlocks = markdownToBlocks(bodyMarkdown);
  const addPageResponse = await addNotionPageToDatabase(
    summaryDatabaseResponse.id,
    {
      Title: {
        type: "title",
        title: [{ type: "text", text: { content: titleMarkdown } }],
      },
    },
  );
  console.log(addPageResponse);
  const { id: pageId } = addPageResponse;
  const response = await addBlocksToPage(pageId, bodyBlocks as Block[]);
  return response;
}
