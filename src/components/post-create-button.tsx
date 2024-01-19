"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { type ButtonProps, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { api } from "@/trpc/react";
import {
  initial_value_source,
  initial_value_outline,
  initial_value_summary,
} from "@/config/editor-initial-values";
import { revalidateDashboard } from "@/actions/revalidation";

type PostCreateButtonProps = ButtonProps;

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const createPost = api.post.create.useMutation({
    onSuccess: async (data) => {
      router.refresh();
      // Should invalidate the queryKey that loads posts
      setIsLoading(false);

      // TODO: This should be done by only one operation
      await utils.post.getAll.invalidate();
      await revalidateDashboard();

      router.push(`/editor/${data.id}`);
    },
    onError: () => {
      // TODO handle max posts
      // if (response.status === 402) {
      //   return toast({
      //     title: "Limit of 3 posts reached.",
      //     description: "Please upgrade to the PRO plan.",
      //     variant: "destructive",
      //   });
      // }
      setIsLoading(false);
      toast.error("Something went wrong.", {
        description: "Your post was not created. Please try again.",
      });
    },
  });
  async function onClick() {
    setIsLoading(true);
    createPost.mutate({
      title: "Untitled Post",
      source: JSON.stringify(initial_value_source),
      outline: JSON.stringify(initial_value_outline),
      summary: JSON.stringify(initial_value_summary),
    });
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      <div className="flex flex-row items-center gap-2">
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.add className="mr-2 h-4 w-4" />
        )}
        New post
      </div>
    </button>
  );
}
