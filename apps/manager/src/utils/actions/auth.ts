"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { and, db, eq, user } from "@qt/db";
import { signInFormSchema } from "@qt/validators";

import { createClient } from "~/utils/server";

export async function SigninWithPassword({
  email,
}: z.infer<typeof signInFormSchema>) {
  const supabase = createClient();

  const isManager = await db.query.user.findFirst({
    where: and(eq(user.role, "manager"), eq(user.email, email)),
  });

  if (!isManager) throw new Error("Invalid email address, check once.");
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });
  console.log("Auth Error", error);
  if (error) throw new Error(error.message);

  redirect("/auth/confirm-email-sent");
}
