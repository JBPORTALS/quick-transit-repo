"use server";

import { redirect } from "next/navigation";

import { createClient } from "~/utils/server";

export async function SigninWithGoogle() {
  const supabase = createClient();
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback?next=/dashboard",
    },
  });
  if (data.url) redirect(data.url);
}
