import { redirect } from "next/navigation";

import { createClient } from "~/utils/server";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");
  return <>{props.children}</>;
}
