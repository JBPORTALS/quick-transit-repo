import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { isEmpty } from "lodash";

import { PackageItem } from "~/components/PackageItem";
import SpinnerView from "~/components/SpinnerView";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import { Large, Muted } from "~/components/ui/typography";
import { Bell } from "~/lib/icons/Bell";
import { ActivityIndicator } from "~/lib/native/activity-indicator";
import { api } from "~/lib/trpc/api";

export default function HomeScreen() {
  const {
    data,
    refetch,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = api.packages.getAllAssignedPackagesForToday.useInfiniteQuery(
    {
      limit: 5,
    },
    { getNextPageParam: (pageParam) => pageParam.nextCursor },
  );

  const [todayAnalytics] = api.useQueries((t) => [
    t.requests.getTodayAnalyticsForPartner(),
  ]);

  const [isFetching, setFetching] = useState(false);

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  async function refreshData() {
    setFetching(true);
    await refetch();
    await todayAnalytics.refetch();
    setFetching(false);
  }

  if (isLoading || todayAnalytics.isLoading) return <SpinnerView />;

  return (
    <FlashList
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refreshData} />
      }
      ListHeaderComponent={
        items.length !== 0 ? (
          <View>
            <View className="w-full gap-3">
              <View className="w-full max-w-full flex-row gap-3">
                <Card className="w-full flex-shrink">
                  <CardHeader className="gap-2">
                    <CardDescription className="text-base">
                      Today
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {todayAnalytics.data?.deliveredCount ?? 0}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text className="text-sm text-muted-foreground">
                      packages delivered.
                    </Text>
                  </CardContent>
                </Card>
                <Card className="w-full flex-shrink">
                  <CardHeader className="gap-2">
                    <CardDescription className="text-base">
                      Today
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {todayAnalytics.data?.shippingCount ?? 0}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text className="text-sm text-muted-foreground">
                      packages in shipping.
                    </Text>
                  </CardContent>
                </Card>
              </View>
              <Card className="w-full">
                <CardHeader className="gap-2">
                  <CardDescription className="text-base">Today</CardDescription>
                  <CardTitle className="text-4xl">
                    {todayAnalytics.data?.deliveredCount ?? 0}/
                    {todayAnalytics.data?.totalPackagesCount ?? 0}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-sm text-muted-foreground">
                    Still out of {todayAnalytics.data?.totalPackagesCount ?? 0},{" "}
                    {todayAnalytics.data?.shippingCount ?? 0} more packages to
                    delivered.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Progress
                    style={{ height: 8 }}
                    value={
                      Math.ceil(
                        (todayAnalytics.data?.deliveredCount ?? 0) /
                          (todayAnalytics.data?.totalPackagesCount ?? 0),
                      ) * 100
                    }
                  />
                </CardFooter>
              </Card>
            </View>
            <View className="gap-4">
              <Text className="pt-6 text-xl font-semibold text-foreground">
                {"Today's Packages"}
              </Text>
            </View>
          </View>
        ) : null
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
      ListEmptyComponent={
        <View className="h-[100vh] flex-1 items-center justify-center gap-3 pb-28">
          <Bell size={45} strokeWidth={1.5} className="text-muted-foreground" />
          <View className="gap-0.5">
            <Large className="text-center">No packages to deliver today</Large>
            <Muted className="text-center">
              If any packages should deliver today will be appear here
            </Muted>
          </View>
        </View>
      }
      data={items}
      renderItem={({ item: request }) => (
        <Link className="mt-5" asChild href={`/package/${request.package_id}`}>
          <TouchableOpacity className="gap-3">
            <PackageItem key={request.id} data={request} />
          </TouchableOpacity>
        </Link>
      )}
    />
  );
}
