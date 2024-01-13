import * as z from "zod";

export const postTitleSchema = z.string().min(3).max(128);

export const postPatchSchema = z.object({
  title: postTitleSchema.optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
});
