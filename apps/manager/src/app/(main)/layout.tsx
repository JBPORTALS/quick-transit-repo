import { redirect } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

import { api } from "~/trpc/server";
import { createClient } from "~/utils/server";
import HeaderClient from "../_components/headerClient";

export default async function RootLayout(props: {
  children: React.ReactNode;
  subheader: React.ReactNode;
}) {
  const client = await createClient();
  const session = await api.auth.getUser();
  const userRole = await api.auth.getUserRole();
  if (!session) redirect("/");
  // if (userRole === "user" || !session.name) redirect("/welcome");
  if (userRole === "customer" || userRole === "partner") {
    await client.auth.signOut();
    redirect("/auth/mismatch-role-access");
  }

  return (
    <div className="relative h-full w-full gap-0">
      <NextTopLoader
        showSpinner={false}
        color="linear-gradient(to right, rgb(107, 33, 168), rgb(76, 29, 149), rgb(107, 33, 168))"
      />
      <HeaderClient />

      <div className="col-span-5">
        <div className="flex flex-col px-44 py-6">{props.children}</div>
      </div>
    </div>
  );
}
