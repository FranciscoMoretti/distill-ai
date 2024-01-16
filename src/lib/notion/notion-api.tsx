import { Client } from "@notionhq/client";
import {
  type CreatePageParametersProperties,
  type Block,
} from "@/lib/notion/notion-types";

export class NotionClient {
  private apiKey: string;
  private notion: Client;
  public rootPageId: string;

  constructor(apiKey: string, rootPageId: string) {
    this.apiKey = apiKey;
    this.notion = new Client({ auth: apiKey });
    this.rootPageId = rootPageId;
  }

  public async getNotionBlockChildren(blockId: string) {
    const blockChildrenListResponse = await this.notion.blocks.children.list({
      block_id: blockId,
    });
    return blockChildrenListResponse;
  }

  public async createNotionDatabase(title: string) {
    return await this.notion.databases.create({
      parent: {
        type: "page_id",
        page_id: this.rootPageId,
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

  public async addNotionPageToDatabase(
    databaseId: string,
    pageProperties: CreatePageParametersProperties,
  ) {
    const newPage = await this.notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: pageProperties,
    });
    return newPage;
  }

  public async addBlocksToPage(pageId: string, blocks: Block[]) {
    const blockId = pageId;
    // TODO Fill with notion types
    const appendedBlocksResponse = await this.notion.blocks.children.append({
      block_id: blockId,
      children: blocks,
    });

    return appendedBlocksResponse;
  }
}
