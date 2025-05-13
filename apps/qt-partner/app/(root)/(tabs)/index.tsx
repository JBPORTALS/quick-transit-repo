import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
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
import { PackageIcon } from "~/lib/icons/PackageIcon";
import { api } from "~/lib/trpc/api";

export default function HomeScreen() {
  const { data, refetch, isLoading } =
    api.packages.getAllAssignedPackagesForToday.useQuery({
      offset: 0,
    });

  const [todayAnalytics] = api.useQueries((t) => [
    t.requests.getTodayAnalyticsForPartner(),
  ]);

  const [isFetching, setFetching] = useState(false);

  async function refreshData() {
    setFetching(true);
    await refetch();
    await todayAnalytics.refetch();
    setFetching(false);
  }

  if (isLoading || todayAnalytics.isLoading) return <SpinnerView />;

  return (
    <>
      {isEmpty(data?.packages) ? (
        <View className="h-[100vh] flex-1 items-center justify-center gap-3">
          <Bell size={45} strokeWidth={1.5} className="text-muted-foreground" />
          <View className="gap-0.5">
            <Large className="text-center">No packages to deliver today</Large>
            <Muted className="text-center">
              If any packages should deliver today will be appear here
            </Muted>
          </View>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => refreshData()}
            />
          }
        >
          <View className="flex-1 p-5">
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
                  {/* <CardFooter>
            <Progress className="h-2" value={60} />
            </CardFooter> */}
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
                  {/* <CardFooter>
            <Progress className="h-2" value={60} />
            </CardFooter> */}
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
                      ((todayAnalytics.data?.deliveredCount ?? 0) /
                        (todayAnalytics.data?.totalPackagesCount ?? 0)) *
                      100
                    }
                  />
                </CardFooter>
              </Card>
            </View>
            <View className="gap-4">
              <Text className="pt-6 text-xl font-semibold text-foreground">
                {"Today's Packages"}
              </Text>
              {data?.packages.map((request) => (
                <PackageItem key={request.id} data={request} />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}
