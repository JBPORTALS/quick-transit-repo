import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { createClient } from "~/utils/server";

export default async function AuthLayout(props: { children: React.ReactNode }) {
  const session = await api.auth.getUser();
  // console.log((await createClient().auth.getUser()).data);
  if (session) redirect("/dashboard");
  return <>{props.children}</>;
}
