import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { postTitleSchema } from "@/lib/validations/post";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        source: z.string(),
        outline: z.string(),
        summary: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          source: input.source,
          outline: input.outline,
          summary: input.summary,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: postTitleSchema.optional(),
        source: z.string().optional(),
        outline: z.string().optional(),
        summary: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      return ctx.db.post.update({
        where: {
          id: id,
        },
        data: updateData,
      });
    }),

  get: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.post.findFirst({
        orderBy: { createdAt: "desc" },
        where: {
          id: input.id,
          createdBy: { id: ctx.session.user.id },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      where: { createdBy: { id: ctx.session.user.id } },

      // select: {
      //   id: true,
      //   title: true,
      //   published: true,
      //   createdAt: true,
      // },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.post.delete({
        where: {
          createdBy: { id: ctx.session.user.id },
          id: input.id,
        },
      });
    }),
});
