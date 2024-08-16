import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await api.auth.getUser();
  const userRole = await api.auth.getUserRole();
  // console.log("welcome -----", userRole);
  if (!session) return redirect("/");
  if (userRole === "manager") redirect("/dashboard");
  return <>{props.children}</>;
}
