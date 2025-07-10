import z from "zod";

export const LoginScemas = z.object({
  email: z.string().min(5, { message: "Email is Required" }),
  password: z.string().min(2, { message: "Password Is required" }),
});

export type LoginScemaType = z.infer<typeof LoginScemas>;
