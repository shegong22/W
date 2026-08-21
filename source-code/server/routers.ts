import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createInquiry, deleteMediaAsset, deleteSiteCopy, listInquiries, listMediaAssets, listSiteCopy, updateInquiry, upsertMediaAsset, upsertSiteCopy } from "./db";
import { storagePut } from "./storage";

const inquiryInput = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  requirement: z.string().trim().min(10).max(5000),
  consent: z.literal(true),
});

const mediaUploadInput = z.object({
  slot: z.string().trim().min(2).max(120).regex(/^[a-z0-9_-]+$/),
  category: z.string().trim().min(2).max(80),
  title: z.string().trim().min(2).max(180),
  altText: z.string().trim().min(2).max(320),
  fileName: z.string().trim().min(1).max(255),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
  dataBase64: z.string().min(100).max(12_000_000),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  inquiries: router({
    create: publicProcedure.input(inquiryInput).mutation(({ input }) =>
      createInquiry({
        name: input.name,
        email: input.email,
        requirement: input.requirement,
        consent: 1,
      }),
    ),
    list: adminProcedure.query(() => listInquiries()),
    update: adminProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["new", "contacted", "quoted", "closed"]), notes: z.string().trim().max(2000).nullable() })).mutation(({ input }) => updateInquiry(input.id, input.status, input.notes)),
  }),
  copy: router({
    publicList: publicProcedure.query(() => listSiteCopy()),
    list: adminProcedure.query(() => listSiteCopy()),
    upsert: adminProcedure.input(z.object({ contentKey: z.string().trim().min(2).max(160).regex(/^[a-z0-9_.-]+$/), page: z.string().trim().min(1).max(80), section: z.string().trim().min(1).max(120), field: z.string().trim().min(1).max(80), label: z.string().trim().min(1).max(180), value: z.string().max(20000), valueType: z.enum(["text", "textarea", "url"]).default("text") })).mutation(({ input }) => upsertSiteCopy(input)),
    delete: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => deleteSiteCopy(input.id)),
  }),
  media: router({
    publicList: publicProcedure.query(() => listMediaAssets(false)),
    list: adminProcedure.query(() => listMediaAssets(true)),
    upload: adminProcedure.input(mediaUploadInput).mutation(async ({ input }) => {
      const rawBase64 = input.dataBase64.replace(/^data:[^;]+;base64,/, "");
      const safeName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
      const stored = await storagePut(`media/${input.category}/${input.slot}-${safeName}`, Buffer.from(rawBase64, "base64"), input.mimeType);
      return upsertMediaAsset({
        slot: input.slot,
        category: input.category,
        title: input.title,
        altText: input.altText,
        fileName: input.fileName,
        fileKey: stored.key,
        url: stored.url,
        mimeType: input.mimeType,
        isActive: 1,
      });
    }),
    delete: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => deleteMediaAsset(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
