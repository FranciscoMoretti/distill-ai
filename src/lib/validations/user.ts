import * as z from "zod";

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
});

export const notionSecretsSchema = z.object({
  pageId: z.string().min(32).max(32),
  // TODO find more about hte format of the Notion API KEY
  apiKey: z.string().min(3).max(56),
});
