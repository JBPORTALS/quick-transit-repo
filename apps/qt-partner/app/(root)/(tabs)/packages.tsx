import { useState } from "react";
import { RefreshControl, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { PackageItem } from "~/components/PackageItem";
import SpinnerView from "~/components/SpinnerView";
import { Input } from "~/components/ui/input";
import { Large, Muted } from "~/components/ui/typography";
import { PackageIcon } from "~/lib/icons/PackageIcon";
import { SearchIcon } from "~/lib/icons/Search";
import { ActivityIndicator } from "~/lib/native/activity-indicator";
import { api } from "~/lib/trpc/api";

export default function PackagesIndex() {
  const {
    data,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.packages.getAllAssignedPackages.useInfiniteQuery(
    {},
    {
      getNextPageParam: (pageParam) => pageParam.nextCursor,
    },
  );
  const [isFetching, setFetching] = useState(false);

  async function refreshData() {
    setFetching(true);
    await refetch();
    setFetching(false);
  }

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  if (isLoading) return <SpinnerView />;

  return (
    <FlashList
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refreshData} />
      }
      data={items}
      ListHeaderComponent={
        <View>
          <Link href={"/search"} asChild>
            <TouchableOpacity>
              <View className="flex-row items-center overflow-hidden rounded-xl border border-border bg-card/50 pl-3">
                <SearchIcon size={16} className="text-muted-foreground" />
                <Input
                  placeholder="Search packages..."
                  readOnly
                  className="native:h-12 w-full flex-shrink rounded-none border-0 bg-transparent"
                />
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      }
      ListEmptyComponent={
        <View className="h-[100vh] flex-1 items-center justify-center gap-3">
          <PackageIcon
            size={45}
            strokeWidth={1.5}
            className="text-muted-foreground"
          />
          <View className="gap-0.5">
            <Large className="text-center">No packages assigend yet</Large>
            <Muted className="text-center">
              If assines the package, it will be appear here
            </Muted>
          </View>
        </View>
      }
      ListFooterComponent={
        <View className="items-center justify-center py-5">
          {hasNextPage && isFetchingNextPage ? (
            <ActivityIndicator className="text-foreground/60" size={20} />
          ) : null}
        </View>
      }
      onEndReached={() => hasNextPage && fetchNextPage()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20 }}
      estimatedItemSize={180}
      keyExtractor={(item) => item.id}
      renderItem={({ item: p }) => (
        <Link className="mt-5" asChild href={`/package/${p.package_id}`}>
          <TouchableOpacity className="gap-3">
            <PackageItem data={p} />
          </TouchableOpacity>
        </Link>
      )}
    />
  );
}
