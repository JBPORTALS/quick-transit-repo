import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export default async function AuthLayout(props: { children: React.ReactNode }) {
  const session = await api.auth.getUser();
  if (session) redirect("/dashboard");
  return <>{props.children}</>;
}
