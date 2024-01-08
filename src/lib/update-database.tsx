"use server";
import { type MyValue } from "@/lib/plate/plate-types";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export async function updateDatabase(
  documentId: string,
  editor: "source" | "outline" | "summary",
  value: MyValue,
) {
  const session = await getServerAuthSession();
  if (session) {
    // TODO Complete database update logic by updating only part of the document

    // TODO improve update preparation logic
    const updateProps: Record<"source" | "outline" | "summary", string> = {};
    updateProps[editor] = JSON.stringify(value);

    await api.post.update.mutate({
      // TODO Use number for id since the start
      id: Number(documentId),
      ...updateProps,
    });
  }
}
