import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { SecretsNamesSchema } from "../../../lib/validations/secret";

export const secretRouter = createTRPCRouter({
  upsertNotionConfig: protectedProcedure
    .input(
      z.object({
        value: z.string().min(1),
        name: SecretsNamesSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.secret.upsert({
        where: {
          userId: ctx.session.user.id,
          name: input.name,
        },
        create: {
          name: input.name,
          value: input.value,
          userId: ctx.session.user.id,
        },
        update: {
          value: input.value,
        },
      });
    }),

  get: protectedProcedure
    .input(
      z.object({
        names: z.array(SecretsNamesSchema),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.secret.findMany({
        where: {
          userId: { equals: ctx.session.user.id },
          name: { in: input.names },
        },
      });
    }),
});
