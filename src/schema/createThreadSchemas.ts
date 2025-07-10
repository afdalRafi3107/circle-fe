import z from "zod";

export const createThreadSchemas = z.object({
  content: z.string().min(1, "content is required "),
  img: z
    .instanceof(File)
    .optional()
    .refine((img) => !img || img.size <= 5_000_000, {
      message: "File harus kurang dari 5MB",
    }),
});

export type createThreadDTO = z.infer<typeof createThreadSchemas>;
