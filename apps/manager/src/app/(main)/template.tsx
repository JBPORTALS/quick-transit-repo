import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { createClient } from "~/utils/server";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const client = createClient();
  const session = await api.auth.getUser();
  const userRole = await api.auth.getUserRole();
  if (!session) redirect("/");
  if (userRole === "user" || !session.name) redirect("/welcome");
  if (userRole === "customer" || userRole === "partner") {
    await client.auth.signOut();
    redirect("/auth/mismatch-role-access");
  }
  return <>{props.children}</>;
}
