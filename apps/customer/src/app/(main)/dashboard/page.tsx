import Link from "next/link";
import { MoreVerticalIcon, Package2Icon } from "lucide-react";
import moment from "moment";

import { Button } from "@qt/ui/button";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { api } from "~/trpc/server";

export default async function page() {
  const data = await api.packages.getRecentPackages();
  return (
    <VStack className="col-span-4 gap-6">
      <Text styles={"lead"} className="font-medium">
        Your Recent Requests
      </Text>
      <VStack className="w-full">
        {data.map(({ id, title, created_at, request }) => (
          <Link href={`/package-details/${id}`} className="w-full">
            <div className="col-span-6 grid  w-full grid-flow-col gap-8 rounded-radius border bg-card p-4 hover:cursor-pointer">
              <HStack className="col-span-3 w-full overflow-hidden ">
                <div>
                  <div className="flex size-16 items-center justify-center rounded-radius border bg-muted">
                    <Package2Icon className="size-10 text-accent-foreground/60" />
                  </div>
                </div>
                <VStack className="w-full gap-0 truncate">
                  <Text styles={"subtle_medium"}>{title}</Text>
                  <Text
                    styles={"subtle"}
                    className="w-full truncate py-2 font-thin text-muted-foreground"
                  >
                    Tracking Number: {request.tracking_number}
                  </Text>
                  <Text
                    styles={"details"}
                    className="text-wrap font-thin text-muted-foreground"
                  >
                    Requested {moment(created_at).fromNow()}
                  </Text>
                </VStack>
              </HStack>
              <HStack className="col-span-3 flex items-center justify-end">
                <HStack className="rounded-full bg-orange-600/30 px-6 py-2 text-sm">
                  Pending
                </HStack>
                <Button size={"icon"} variant={"ghost"}>
                  <MoreVerticalIcon className="size-4" />
                </Button>
              </HStack>
            </div>
          </Link>
        ))}
      </VStack>
    </VStack>
  );
}
