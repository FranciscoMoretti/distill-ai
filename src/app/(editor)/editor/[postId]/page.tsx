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
      <div className="flex w-full flex-col items-center">
        <h1 className="text-2xl">
          {
            // TODO Make this an input to update the document name / title
            post.name
          }
        </h1>
      </div>
      <PostProvider initialValue={post}>
        <Workspace className="h-full flex-1" />
      </PostProvider>
    </div>
  );
}
