"use server";
import { env } from "@/env";
import { createNotionDatabase } from "./notion-api";

const mainDbId = env.NOTION_PAGE_ID;
export async function createMainDatabases() {
  const sourceDatabaseResponse = await createNotionDatabase(mainDbId, "Source");
  const outlineDatabaseResponse = await createNotionDatabase(
    mainDbId,
    "Outline",
  );
  const summaryDatabaseResponse = await createNotionDatabase(
    mainDbId,
    "Summary",
  );

  console.log(summaryDatabaseResponse);
  return {
    sourceDatabaseResponse,
    outlineDatabaseResponse,
    summaryDatabaseResponse,
  };
}
