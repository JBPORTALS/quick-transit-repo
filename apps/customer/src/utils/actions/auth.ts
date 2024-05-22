"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { createClient } from "~/utils/server";

export async function SigninWithGoogle() {
  const supabase = createClient();
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (data.url) redirect(data.url);
}

export async function cancelRequest({ id }: { id: string }) {
  await api.packages.cancelRequest({ id });
  revalidatePath("/", "layout");
}
