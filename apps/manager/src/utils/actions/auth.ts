"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { signInFormSchema } from "@qt/validators";

import { createClient } from "~/utils/server";

export async function SigninWithPassword({
  email,
  password,
}: z.infer<typeof signInFormSchema>) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("Auth Error", error);
  if (error) throw new Error(error.message);

  redirect("/dashboard");
}
