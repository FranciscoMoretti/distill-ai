"use server";
import { markdownToBlocks } from "@tryfabric/martian";
import { NotionClient } from "../lib/notion/notion-api";
import { type Block } from "@/lib/notion/notion-types";
import { createMainDatabases } from "@/lib/notion/create-main-databases";
import { api } from "@/trpc/server";
import { getSecretKeyValueMap } from "@/lib/secret-utils";

async function initDatabases(notionClient: NotionClient) {
  const blockChildrenListResponse = await notionClient.getNotionBlockChildren(
    notionClient.rootPageId,
  );
  const pageChilds = blockChildrenListResponse.results.filter((block) => {
    return Object.hasOwn(block, "type")
      ? // @ts-expect-error type present in object
        block.type == "child_database"
      : false;
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
    const response = await createMainDatabases(notionClient);
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
  const secrets = await api.secret.get.query({
    names: ["notionRootPageId", "notionApiKey"],
  });

  console.log({ secrets });
  const secretKeyValue = getSecretKeyValueMap(secrets);

  console.log({ secretKeyValue });

  if (!secretKeyValue.notionApiKey || !secretKeyValue.notionRootPageId) {
    throw Error("Using Notion client without notion config");
  }

  const notionClient = new NotionClient(
    secretKeyValue.notionApiKey,
    secretKeyValue.notionRootPageId,
  );

  const { summaryDatabaseId } = await initDatabases(notionClient);
  const bodyBlocks = markdownToBlocks(bodyMarkdown);
  const addPageResponse = await notionClient.addNotionPageToDatabase(
    summaryDatabaseId,
    {
      Title: {
        type: "title",
        title: [{ type: "text", text: { content: titleMarkdown } }],
      },
    },
  );
  console.log(addPageResponse);
  const { id: pageId } = addPageResponse;
  const response = await notionClient.addBlocksToPage(
    pageId,
    bodyBlocks as Block[],
  );
  return response;
}
