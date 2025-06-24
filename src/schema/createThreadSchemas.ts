import z from "zod";

export const createThreadSchemas = z.object({
  content: z.string().min(1, "content is required "),
  img: z.any().refine((file: FileList) => file && file.length > 0, {
    message: "Gambar wajib diunggah",
  }),
});

export type createThreadDTO = z.infer<typeof createThreadSchemas>;


