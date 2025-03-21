import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await api.auth.getUser();
  const userRole = await api.auth.getUserRole();
  if (!session) return redirect("/");
  if (userRole === "customer") redirect("/dashboard");
  return <>{props.children}</>;
}
