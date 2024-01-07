"use server";
import { type MyValue } from "@/lib/plate/plate-types";
import { getServerAuthSession } from "@/server/auth";

export async function updateDatabase(
  documentId: string,
  editor: "source" | "outline" | "summary",
  value: MyValue,
) {
  const session = await getServerAuthSession();
  if (session) {
    // TODO Complete database update logic by updating only part of the document
    console.log(documentId, editor, JSON.stringify(value));
  }
}
