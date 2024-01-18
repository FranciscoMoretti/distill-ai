// Playground editor functional component

import { Workspace } from "@/components/workspace";
import { PostProvider } from "@/lib/post-context";
import { type Post } from "@prisma/client";

export async function PlaygroundEditor() {
  const post: Post = {
    id: "",
    title: "Demo Document",
    createdById: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    source: JSON.stringify([
      {
        id: "1",
        type: "p",
        // TODO Fill with demo text
        children: [{ text: "This will be completed by AI" }],
      },
    ]),
    outline: JSON.stringify([
      {
        id: "1",
        type: "p",
        // TODO Fill with demo text
        children: [{ text: "Outline text will be placed here" }],
      },
    ]),
    summary: JSON.stringify([
      {
        id: "1",
        type: "p",
        // TODO Fill with demo text
        children: [{ text: "Place your book notes here" }],
      },
    ]),
  };

  return (
    <div className="mx-auto flex w-full flex-1 flex-col items-start gap-10 py-8 sm:px-8 ">
      <div className="flex w-full flex-1 flex-col items-center gap-10">
        <PostProvider initialValue={post}>
          <Workspace className="h-full flex-1" storage="local" />
        </PostProvider>
      </div>{" "}
    </div>
  );
}
