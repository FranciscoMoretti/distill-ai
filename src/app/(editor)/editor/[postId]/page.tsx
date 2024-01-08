import { notFound, redirect } from "next/navigation";
import { type Post, type User } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { authOptions, getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Workspace } from "@/components/workspace";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

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

  return (
    <div className="grid w-full gap-10">
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
      <Workspace className="h-full flex-1" />
    </div>
    // TODO Since post is already fetched, use these properties as well like Editor does
    // <Editor
    //   post={{
    //     id: post.id,
    //     // title: post.title,
    //     // content: post.content,
    //     // published: post.published,
    //   }}
    // />
  );
}
