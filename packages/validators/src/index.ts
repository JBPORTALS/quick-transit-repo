import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().min(1, "Please enter your email"),
  password: z.string().min(1, "Please enter your password"),
});

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: "Email shouldn't be empty" })
    .min(1, "Email shouldn't be empty"),
  password: z
    .string({ required_error: "Password shouldn't be empty" })
    .min(1, "Password shouldn't be empty"),
  global_error: z.string().optional(),
});
