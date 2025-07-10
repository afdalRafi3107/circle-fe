import z from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  bio: z.string().min(6),
  photoProfile: z
    .instanceof(File)
    .optional()
    .refine((photoProfile) => !photoProfile || photoProfile.size <= 5_000_000, {
      message: "File harus kurang dari 5MB",
    }),
  banner: z
    .instanceof(File)
    .optional()
    .refine((banner) => !banner || banner.size <= 5_000_000, {
      message: "File harus kurang dari 5MB",
    }),
});

export type editProfileDTO = z.infer<typeof editProfileSchema>;
