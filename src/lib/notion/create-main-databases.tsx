"use server";
import { type NotionClient } from "./notion-api";

export async function createMainDatabases(notionClient: NotionClient) {
  const sourceDatabaseResponse =
    await notionClient.createNotionDatabase("Source");
  const outlineDatabaseResponse =
    await notionClient.createNotionDatabase("Outline");
  const summaryDatabaseResponse =
    await notionClient.createNotionDatabase("Summary");

  console.log(sourceDatabaseResponse);
  return {
    sourceDatabaseResponse,
    outlineDatabaseResponse,
    summaryDatabaseResponse,
  };
}
