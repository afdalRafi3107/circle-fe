import z from "zod";

export const RegisterScemas = z.object({
  username: z.string().min(4, { message: "Username Is Required" }),
  email: z.string().min(5, { message: "Email Is Required" }),
  password: z.string().min(1, { message: "Password Is Required" }),
});

export type RegisterScemnasDTO = z.infer<typeof RegisterScemas>;
