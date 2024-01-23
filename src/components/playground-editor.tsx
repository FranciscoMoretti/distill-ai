// Playground editor functional component

import { TitleForm } from "@/components/document-title-form";
import { Workspace } from "@/components/workspace";
import {
  initial_value_outline,
  initial_value_source,
  initial_value_summary,
} from "@/config/editor-initial-values";
import { PostProvider } from "@/lib/post-context";
import { type Post } from "@prisma/client";

export async function PlaygroundEditor() {
  const post: Post = {
    id: "",
    title: "Distill AI App Tutorial",
    createdById: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    source: JSON.stringify(initial_value_source),
    outline: JSON.stringify(initial_value_outline),
    summary: JSON.stringify(initial_value_summary),
  };

  return (
    <div className="mx-auto flex w-full flex-1 flex-col items-start gap-10 py-8 sm:px-8 ">
      <div className="flex w-full flex-1 flex-col items-center gap-10">
        <PostProvider initialValue={post}>
          <TitleForm title={post.title} postId={""} useDatabase={false} />
          <Workspace className="h-full flex-1" storage="disabled" />
        </PostProvider>
      </div>
    </div>
  );
}
