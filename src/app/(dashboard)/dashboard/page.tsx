import { redirect } from "next/navigation";

import { authOptions, getServerAuthSession } from "@/server/auth";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { PostCreateButton } from "@/components/post-create-button";
import { PostItem } from "@/components/post-item";
import { DashboardShell } from "@/components/shell";
import { api } from "@/trpc/server";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect(authOptions?.pages?.signIn ?? "/api/auth/signin");
  }

  const posts = await api.post.getAll.query();

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
