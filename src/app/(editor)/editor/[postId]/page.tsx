import { notFound, redirect } from "next/navigation";
import { type Post, type User } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { authOptions, getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Workspace } from "@/components/workspace";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { PostProvider } from "@/lib/post-context";
import { TitleForm } from "@/components/document-title-form";

async function getPostForUser(postId: Post["id"]) {
  const post = await api.post.get.query({
    id: postId,
  });
  return post;
}

interface EditorPageProps {
  params: { postId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getServerAuthSession();

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/api/auth/signin");
  }

  const post = await getPostForUser(Number(params.postId));

  if (!post) {
    notFound();
  }

  // TODO: For some reason the post found in the dB is not getting updated and this line is not printing
  console.error(post.outline);

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
        </div>
      </div>
      {/* // TODO Consider not using any context locally and relying on DB only. Or consider a state manager redux/jotai */}
      <div className="flex w-full flex-1 flex-col items-center gap-10">
        <PostProvider initialValue={post}>
          <div className="flex w-full flex-col items-center">
            <TitleForm title={post.name} postId={post.id} />
          </div>
          <Workspace className="h-full flex-1" />
        </PostProvider>
      </div>
    </div>
  );
}
