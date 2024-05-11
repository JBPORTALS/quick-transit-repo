import Rightbar from "@qt/ui/rightbar";
import { Text } from "@qt/ui/text";

import { api } from "~/trpc/server";

export default async function page() {
  const data = await api.auth.getSecretMessage();
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2">
        <Text
          styles={"p_ui_medium"}
          className="font-medium text-muted-foreground "
        >
          Your Recent Requests - {data}
        </Text>
      </div>
      <Rightbar />
    </div>
  );
}
