import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await api.auth.getUser();
  const userRole = await api.auth.getUserRole();
  if (!session) redirect("/");
  if (userRole === "user") redirect("/welcome");
  return <>{props.children}</>;
}
