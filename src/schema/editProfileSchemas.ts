import z from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  bio: z.string().min(6),
});

export type editProfileDTO = z.infer<typeof editProfileSchema>;
