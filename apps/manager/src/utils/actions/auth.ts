"use server";

import { redirect } from "next/navigation";
import { AuthError } from "@supabase/supabase-js";
import { z } from "zod";

import { and, db, eq, user } from "@qt/db";
import { profileInformationSchema, signInFormSchema } from "@qt/validators";

import { api } from "~/trpc/server";
import { createClient } from "~/utils/server";

export async function SigninWithPassword({
  email,
}: z.infer<typeof signInFormSchema>): Promise<{ error: string | null }> {
  const supabase = createClient();

  const isManager = await db.query.user.findFirst({
    where: and(eq(user.role, "manager"), eq(user.email, email)),
  });

  if (!isManager) return { error: "Invalid credentials. Check once!" };

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) return { error: error.message };

  redirect("/auth/confirm-email-sent");
}

export async function updateProfile({
  name,
}: z.infer<typeof profileInformationSchema>) {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: name,
    },
  });
  console.log("Auth Error", error);
  if (error) throw new Error(error.message);

  await api.auth.updateUserRole({ role: "manager" });

  redirect("/dashboard");
}
