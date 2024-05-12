import Image from "next/image";

import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { api } from "~/trpc/server";
import AddAddressForm from "./add-address-form";

export default async function page() {
  const user = await api.auth.getUser();
  return (
    <VStack className="h-full w-full items-center py-16">
      <HStack className="items-center gap-0 rounded-full border-2 px-5 py-2 shadow-sm">
        <Image
          src={"/qt-logo.png"}
          width={32}
          height={32}
          alt="Quick Transitt Logo"
        />
        <span className="font-acme text-lg">Quick Transitt</span>
      </HStack>
      <h1 className="text-3xl font-bold">
        Welcome, {user.user_metadata.full_name} 👋🚀
      </h1>
      <Text
        styles={"subtle"}
        className="text-wrap text-center text-muted-foreground"
      >
        Experience your first fastest package transportation by adding some
        basic details
      </Text>
      <AddAddressForm />
    </VStack>
  );
}
