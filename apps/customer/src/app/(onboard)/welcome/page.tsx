import Image from "next/image";

import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { AddressDataServerComponent } from "~/app/_components/address-data-card";
import OnboardButton from "~/app/_components/onboard-button";
import { api } from "~/trpc/server";

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
        Welcome, {user && user.user_metadata.full_name} 👋🚀
      </h1>
      <Text
        styles={"subtle"}
        className="text-wrap text-center text-muted-foreground"
      >
        Experience your first fastest package transportation by adding some
        basic details
      </Text>
      <div className="w-1/3 space-y-4">
        <AddressDataServerComponent
          type="pickup"
          title="Add Pick Up Address"
          description="Where we have to pick up your package."
        />
        <AddressDataServerComponent
          type="franchise"
          title="Add Franchise Address"
          description="Where we have to deliver your package"
        />
        <AddressDataServerComponent
          type="delivery"
          title="Add Delivery Address"
          description="Where franchise has to deliver your package."
        />
        <Text
          styles={"subtle"}
          className="text-wrap text-center text-muted-foreground"
        >
          You can totally skip this step by clicking on continue button below
        </Text>
        <OnboardButton />
      </div>
    </VStack>
  );
}
