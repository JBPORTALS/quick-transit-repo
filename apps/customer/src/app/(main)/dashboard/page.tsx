"use client";

import Link from "next/link";
import { isEmpty } from "lodash";
import { Package2Icon } from "lucide-react";
import moment from "moment";

import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { DashboardEmptyState } from "~/app/_components/dashboard-empty-state";
import { StatusTag } from "~/app/_components/status-tag";
import { api } from "~/trpc/react";

function RecentPackagesList() {
  const [data, query] = api.packages.getRecentPackages.useSuspenseQuery();

  if (isEmpty(data)) return <DashboardEmptyState />;
  else
    return (
      <>
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
                    className="w-full truncate py-2 font-normal text-card-foreground/80"
                  >
                    Tracking Number: {request.tracking_number}
                  </Text>
                  <Text
                    styles={"details"}
                    className="text-wrap text-card-foreground/35"
                  >
                    Requested {moment(created_at).fromNow()}
                  </Text>
                </VStack>
              </HStack>
              <HStack className="col-span-3 flex items-center justify-end">
                <StatusTag status={request.current_status} />
                {/* <PackageMoreDropdown packageId={id} /> */}
              </HStack>
            </div>
          </Link>
        ))}
      </>
    );
}

export default function page() {
  return (
    <VStack className="col-span-4 w-full">
      <RecentPackagesList />
    </VStack>
  );
}
