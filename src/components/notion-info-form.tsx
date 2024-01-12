"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Secret, type User } from "@prisma/client";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { cn } from "@/lib/utils";
import { notionSecretsSchema } from "@/lib/validations/user";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { api } from "@/trpc/react";
import { secretRouter } from "@/server/api/routers/secret";

type UserNameFormProps = React.HTMLAttributes<HTMLFormElement>;

type FormData = z.infer<typeof notionSecretsSchema>;

export function NotionInfoForm({ className, ...props }: UserNameFormProps) {
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [showKey, setShowKey] = React.useState<boolean>(false);
  const utils = api.useUtils();
  // TODO Join the 2 mutations in a single one

  const { data, isSuccess } = api.secret.get.useQuery({
    names: ["notionApiKey", "notionRootPageId"],
  });
  const secretNameValueMap: Record<string, string> =
    data?.reduce(
      (acc, secret) => {
        acc[secret.name] = secret.value;
        return acc;
      },
      {} as Record<string, string>,
    ) ?? {};

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(notionSecretsSchema),
    defaultValues: {
      pageId: secretNameValueMap.notionApiKey ?? "",
      apiKey: secretNameValueMap.notionRootPageId ?? "",
    },
  });

  React.useEffect(() => {
    console.log(secretNameValueMap);
    if (
      secretNameValueMap.notionApiKey &&
      secretNameValueMap.notionApiKey != getValues("apiKey")
    ) {
      setValue("apiKey", secretNameValueMap.notionApiKey);
    }

    if (
      secretNameValueMap.notionRootPageId &&
      secretNameValueMap.notionRootPageId != getValues("pageId")
    ) {
      setValue("pageId", secretNameValueMap.notionRootPageId);
    }
  }, [isSuccess]);

  const createPost = api.secret.upsertNotionConfig.useMutation({
    onSuccess: async () => {
      setIsSaving(false);
      // Invalidate query/tag for Notion secrets?
      toast({
        description: "Your notion configuration has been updated.",
      });
      await utils.secret.invalidate();
    },
    onError: () => {
      toast({
        title: "Something went wrong.",
        description: "Your configuration was not updated. Please try again.",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(data: FormData) {
    setIsSaving(true);
    if (data.apiKey != secretNameValueMap.notionApiKey) {
      createPost.mutate({
        value: data.apiKey,
        name: "notionApiKey",
      });
    }
    if (data.pageId != secretNameValueMap.notionRootPageId) {
      createPost.mutate({
        value: data.pageId,
        name: "notionRootPageId",
      });
    }

    setIsSaving(false);
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Notion Configuration</CardTitle>
          <CardDescription>
            Please enter your Notion API Key and the root page ID for this app.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-1">
            <Label htmlFor="pageId">Root Page ID</Label>
            <Input
              id="pageId"
              className="w-[400px]"
              size={32}
              placeholder="page id"
              {...register("pageId")}
            />
            {errors?.pageId && (
              <p className="px-1 text-xs text-red-600">
                {errors.pageId.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="relative w-[400px]">
              <Input
                id="apiKey"
                className=""
                size={32}
                type={showKey ? "text" : "password"}
                placeholder="key"
                {...register("apiKey")}
              />

              <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                {showKey ? (
                  <Icons.viewingOff
                    className="h-4 w-4"
                    onClick={() => setShowKey(false)}
                  />
                ) : (
                  <Icons.viewing
                    className="h-4 w-4"
                    onClick={() => setShowKey(true)}
                  />
                )}
              </div>
            </div>
            {errors?.apiKey && (
              <p className="px-1 text-xs text-red-600">
                {errors.apiKey.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
