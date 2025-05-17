"use server";

import { supabase } from "@qt/api";

export async function downloadInvoice(bucket: string, path: string) {
  const { data, error } = await supabase().storage.from(bucket).download(path);

  if (error) throw new Error("Can't able to download at this time");

  return Buffer.from(await data.arrayBuffer());
}
