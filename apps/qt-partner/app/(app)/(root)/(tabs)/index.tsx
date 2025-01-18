import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

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
import { PackageIcon } from "~/lib/icons/PackageIcon";
import { ActivityIndicator } from "~/lib/native/activity-indicator";
import { api } from "~/lib/trpc/api";

export default function HomeScreen() {
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
                <CardDescription className="text-base">Today</CardDescription>
                <CardTitle className="text-4xl">20</CardTitle>
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
                <CardDescription className="text-base">Today</CardDescription>
                <CardTitle className="text-4xl">30</CardTitle>
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
              <CardTitle className="text-4xl">20/50</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-sm text-muted-foreground">
                Still out of 50, 20 more packages to delivered.
              </Text>
            </CardContent>
            <CardFooter>
              <Progress style={{ height: 8 }} value={(20 / 50) * 100} />
            </CardFooter>
          </Card>
        </View>
        <View className="gap-4">
          <Text className="py-6 text-xl font-semibold text-foreground">
            {"Today's Packages"}
          </Text>
          {data?.packages.map(({ id, package: packageDetails }) => (
            <View
              key={id.toString()}
              className="w-full flex-grow-0 flex-row gap-3"
            >
              <View className="aspect-square min-w-20 max-w-20 items-center  justify-center rounded-md border border-border bg-muted/20">
                <PackageIcon
                  strokeWidth={1.25}
                  size={32}
                  className="text-muted-foreground"
                />
              </View>
              <View className="w-full flex-shrink">
                <Text className="font-bold">{packageDetails.title}</Text>
                <Text className="text-sm text-muted-foreground">
                  {packageDetails.description.length > 60
                    ? packageDetails.description.slice(0, 60).concat("...")
                    : packageDetails.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
