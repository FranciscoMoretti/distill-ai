"use server";
import { Client } from "@notionhq/client";
import {
  type CreatePageParametersProperties,
  type Block,
} from "@/lib/notion/notion-types";
import { env } from "@/env";

const apiKey = env.NOTION_API_KEY;

const notion = new Client({ auth: apiKey });

export async function createNotionDatabase(
  parentPageId: string,
  title: string,
) {
  return await notion.databases.create({
    parent: {
      type: "page_id",
      page_id: parentPageId,
    },
    title: [
      {
        type: "text",
        text: {
          content: title,
        },
      },
    ],
    properties: {
      // These properties represent columns in the database (i.e. its schema)
      Title: {
        type: "title",
        title: {},
      },
      "Last Synced": {
        type: "date",
        date: {},
      },
    },
  });
}

export async function addNotionPageToDatabase(
  databaseId: string,
  pageProperties: CreatePageParametersProperties,
) {
  const newPage = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: pageProperties,
  });
  console.log(newPage);
  return newPage;
}

export async function addBlocksToPage(pageId: string, blocks: Block[]) {
  // TODO Fill with notion types
  const blockId = pageId; // Blocks can be appended to other blocks *or* pages. Therefore, a page ID can be used for the block_id parameter
  const appendedBlocksResponse = await notion.blocks.children.append({
    block_id: blockId,
    // Pass an array of blocks to append to the page: https://developers.notion.com/reference/block#block-type-objects
    children: blocks,
  });

  console.log(appendedBlocksResponse);
  return appendedBlocksResponse;
}
