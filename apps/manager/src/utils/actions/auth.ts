"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { and, db, eq, user } from "@qt/db";
import {
  profileInformationSchema,
  signInFormSchema,
  verifyFormSchema,
} from "@qt/validators";

import { api } from "~/trpc/server";
import { getBaseUrl } from "~/trpc/shared";
import { createClient } from "~/utils/server";

export async function SigninWithPassword({
  email,
}: z.infer<typeof signInFormSchema>): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const isManager = await db.query.user.findFirst({
    where: and(eq(user.role, "manager"), eq(user.email, email)),
  });

  if (!isManager) return { error: "Invalid credentials. Check once!" };

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${getBaseUrl()}/confirm/callback?next=/dashboard`,
    },
  });

  // console.error("Supabase Auth erro:", error);

  if (error) return { error: error.message };

  redirect(`/auth/confirm-email-sent?email=${email}`);
}

export async function verifyOTP({
  otp,
  email,
}: z.infer<typeof verifyFormSchema>): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    type: "email",
    token: otp,
    email,
  });
  console.error("Supabase Auth erro:", error);
  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function updateProfile({
  name,
}: z.infer<typeof profileInformationSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: name,
    },
  });
  // console.log("Auth Error", error);
  if (error) throw new Error(error.message);

  await api.auth.updateUserRole({ role: "manager" });

  redirect("/dashboard");
}
