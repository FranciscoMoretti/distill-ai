"use server";
import { markdownToBlocks } from "@tryfabric/martian";
import {
  addBlocksToPage,
  addNotionPageToDatabase,
  getNotionBlockChildren,
} from "../lib/notion/notion-api";
import { type Block } from "@/lib/notion/notion-types";
import { createMainDatabases } from "@/lib/notion/create-main-databases";
import { env } from "@/env";

async function initDatabases() {
  const mainDbId = env.NOTION_PAGE_ID;
  // Otherwise simply use the stored databases ids
  const blockChildrenListResponse = await getNotionBlockChildren(mainDbId);
  const pageChilds = blockChildrenListResponse.results.filter((block) => {
    return Object.hasOwn(block, "type")
      ? block.type == "child_database"
      : false;
    // if(block.object){
    //   block.type ==
    // }
  });
  // TODO Improve the logic of this init function databases ID retrieval
  const childIds = pageChilds.map((block) => block.id);
  if (childIds.length == 3) {
    return {
      sourceDatabaseId: childIds[0]!,
      outlineDatabaseId: childIds[1]!,
      summaryDatabaseId: childIds[2]!,
    };
  } else {
    const response = await createMainDatabases();
    return {
      sourceDatabaseId: response.sourceDatabaseResponse.id,
      outlineDatabaseId: response.outlineDatabaseResponse.id,
      summaryDatabaseId: response.summaryDatabaseResponse.id,
    };
  }
}

export async function exportSummaryToNotion(
  bodyMarkdown: string,
  titleMarkdown: string,
) {
  const { summaryDatabaseId } = await initDatabases();
  const bodyBlocks = markdownToBlocks(bodyMarkdown);
  const addPageResponse = await addNotionPageToDatabase(summaryDatabaseId, {
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
