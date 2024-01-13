"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { postTitleSchema } from "@/lib/validations/post";
import { useDebouncedCallback } from "use-debounce";
import { type FormEventHandler } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  title: postTitleSchema,
});

const debounceDuration = 1000;

export function TitleForm({
  title,
  postId,
}: {
  title: string;
  postId: number;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: title,
    },
  });
  const debouncedUpdates = useDebouncedCallback<
    FormEventHandler<HTMLFormElement>
  >(async (event) => {
    await form.handleSubmit(onSubmit)(event);
  }, debounceDuration);

  const updatePost = api.post.update.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Title updated",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong.",
        description: "Your title was not updated. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updatePost.mutate({ id: postId, name: data.title });
  }

  return (
    <Form {...form}>
      <form onChange={debouncedUpdates} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Document title"
                  className="w-fit border-transparent p-4 text-center text-3xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
