import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().min(1, "Please enter your email"),
  password: z.string().min(1, "Please enter your password"),
});
