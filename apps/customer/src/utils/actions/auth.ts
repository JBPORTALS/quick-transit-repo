"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { createClient } from "~/utils/server";

export async function SigninWithGoogle() {
  const supabase = createClient();
  const origin =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT}`
      : process.env.VERCEL_URL;
  const redirectUrl = `${origin}/auth/callback?next=/dashboard`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
    },
  });
  console.log("Auth Error", error, "URL", data.url);
  redirect(data.url);
}

export async function cancelRequest({ id }: { id: string }) {
  await api.packages.cancelRequest({ id });
  revalidatePath("/", "layout");
}
