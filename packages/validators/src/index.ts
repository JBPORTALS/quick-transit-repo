import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().min(1, "Please enter your email"),
  password: z.string().min(1, "Please enter your password"),
});

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: "Email shouldn't be empty" })
    .min(1, "Email shouldn't be empty"),
  global_error: z.string().optional(),
});

export const verifyFormSchema = z.object({
  otp: z
    .string({ required_error: "Otp should not be empty" })
    .min(6, "invalid otp")
    .max(6, "invalid otp"),
  email: z
    .string({ required_error: "Email shouldn't be empty" })
    .min(1, "Email shouldn't be empty"),
  global_error: z.string().optional(),
});

export const profileInformationSchema = z.object({
  name: z
    .string({ required_error: "This field is required" })
    .min(3, "Name must be atlease 3 charcters long"),
  global_error: z.string().optional(),
});
