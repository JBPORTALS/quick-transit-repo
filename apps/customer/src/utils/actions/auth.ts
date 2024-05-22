"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { createClient } from "~/utils/server";

export async function SigninWithGoogle() {
  const supabase = createClient();
  const redirectDomain =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT}`
      : process.env.VERCEL_URL;
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${redirectDomain}/auth/callback?next=/dashboard`,
    },
  });
  if (data.url) redirect(data.url);
}

export async function cancelRequest({ id }: { id: string }) {
  await api.packages.cancelRequest({ id });
  revalidatePath("/", "layout");
}
