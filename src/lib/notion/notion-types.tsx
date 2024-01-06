"use server";
import { type AppendBlockChildrenParameters } from "@notionhq/client/build/src/api-endpoints";
import { type CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";

export declare type Block = AppendBlockChildrenParameters["children"][number];

export declare type CreatePageParametersProperties =
  CreatePageParameters["properties"];
