import z from "zod";
export const editThreadSchmeas = z.object({
  content: z.string().min(1),
  img: z.instanceof(File).optional(),
  removeImg: z.boolean().optional(),
});

export type editThreadSchmeasDTO = z.infer<typeof editThreadSchmeas>