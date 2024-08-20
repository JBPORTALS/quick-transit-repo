import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";

import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { PackageIcon } from "~/lib/icons/PackageIcon";
import { SearchIcon } from "~/lib/icons/Search";
import { ActivityIndicator } from "~/lib/native/activity-indicator";
import { api } from "~/lib/trpc/api";
import { cn } from "~/lib/utils";

export default function PackagesIndex() {
  const { data, refetch, isLoading } =
    api.packages.getAllAssignedPackages.useQuery({
      offset: 5,
    });
  const [isFetching, setFetching] = useState(false);

  async function refreshData() {
    setFetching(true);
    await refetch();
    setFetching(false);
  }

  if (isLoading)
    return <ActivityIndicator size={45} className="mt-4 text-primary" />;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          style={{
            backgroundColor: "red",
          }}
          refreshing={isFetching}
          onRefresh={() => refreshData()}
        />
      }
    >
      <View className="flex-1 gap-5 p-5">
        <View>
          <Link href={"/search"} asChild>
            <TouchableOpacity>
              <View className="flex-row items-center overflow-hidden rounded-md border border-border bg-secondary pl-3">
                <SearchIcon size={20} className="text-foreground" />
                <Input
                  placeholder="Search ..."
                  readOnly
                  className="native:h-10 w-full flex-shrink rounded-none border-0 bg-transparent"
                />
              </View>
            </TouchableOpacity>
          </Link>
        </View>
        <View className="gap-3">
          {data?.packages.map(
            ({ id, current_status, package: packageDetails }) => (
              <>
                <Link
                  key={id.toString()}
                  asChild
                  href={`/package/${packageDetails.id}`}
                >
                  <TouchableOpacity>
                    <View className="w-full flex-grow-0 flex-row gap-3">
                      <View className="aspect-square min-w-24 max-w-24 items-center  justify-center rounded-md border border-border bg-muted/20">
                        <PackageIcon
                          strokeWidth={1.25}
                          size={32}
                          className="text-muted-foreground "
                        />
                      </View>
                      <View className="w-full flex-shrink gap-2">
                        <Text className="font-bold">
                          {packageDetails.title}
                        </Text>
                        <Text className="text-sm text-muted-foreground">
                          {packageDetails.description.length > 40
                            ? packageDetails.description
                                .slice(0, 40)
                                .concat("...")
                            : packageDetails.description}
                        </Text>
                        <Badge variant={"secondary"}>
                          <Text
                            className={cn(
                              "text-sm font-bold capitalize",
                              current_status === "confirmed" &&
                                "text-indigo-400",
                              current_status === "cancelled" && "text-red-400",
                              current_status === "shipping" && "text-amber-600",
                              current_status === "delivered" &&
                                "text-green-600",
                            )}
                          >
                            {current_status === "confirmed"
                              ? "Pick Up"
                              : current_status}
                          </Text>
                        </Badge>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Link>
                <Separator key={id + "sperator"} />
              </>
            ),
          )}
        </View>
      </View>
    </ScrollView>
  );
}
