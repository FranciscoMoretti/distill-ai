import { z } from "zod";

export const SecretsNamesSchema = z.enum(["notionApiKey", "notionRootPageId"]);
export type SecretsNamesEnum = z.infer<typeof SecretsNamesSchema>;
