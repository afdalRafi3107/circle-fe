import z from "zod";

export const replySchemas = z.object({
  comment: z.string().min(1, "Comment is required"),
});

export type replyScemasDTO = z.infer<typeof replySchemas>;
