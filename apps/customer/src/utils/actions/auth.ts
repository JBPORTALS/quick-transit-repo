"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { createClient } from "~/utils/server";

export async function SigninWithGoogle() {
  const supabase = await createClient();
  const origin =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT}`
      : (await headers()).get("origin");

  const redirectUrl = `${origin}/auth/callback?next=/dashboard`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
    },
  });
  console.log("Auth Error", error, "URL", data.url);
  if (data.url) redirect(data.url);
}

export async function cancelRequest({ id }: { id: string }) {
  await api.packages.cancelRequest({ id });
  revalidatePath("/", "layout");
}
