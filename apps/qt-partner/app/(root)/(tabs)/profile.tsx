import React from "react";
import { ScrollView, View } from "react-native";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import moment from "moment";

import SpinnerView from "~/components/SpinnerView";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { H3, H4, Large, Muted, P } from "~/components/ui/typography";
import { Settings } from "~/lib/icons/Settings";
import { Star } from "~/lib/icons/Star";
import { ActivityIndicator } from "~/lib/native/activity-indicator";
import { api } from "~/lib/trpc/api";

export default function Profile() {
  const [user, ratings, totalDeliveredPackages] = api.useQueries((t) => [
    t.auth.getUser(),
    t.reviews.getRatingsOfPartner(),
    t.packages.getDeliveredCountForPartner(),
  ]);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    api.reviews.getInfiniteForPartner.useInfiniteQuery(
      {},
      {
        getNextPageParam: (pageParams) => pageParams.nextCursor,
      },
    );

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  if (user.isLoading || ratings.isLoading || totalDeliveredPackages.isLoading)
    return <SpinnerView />;

  return (
    <View className="flex-1">
      <FlashList
        data={items}
        ListHeaderComponent={
          <View className="items-center justify-center gap-3">
            <Avatar
              alt="Shadcn"
              style={{ height: 96, width: 96 }}
              className="border-2 border-primary"
            >
              <AvatarImage source={require("assets/images/profile.png")} />
            </Avatar>
            <View className="items-center">
              <H3>{user.data?.name}</H3>
              <Muted>{user.data?.email}</Muted>
            </View>
            <View className="flex-row justify-between gap-3">
              <Card className="w-full flex-shrink items-center">
                <CardHeader className="gap-2">
                  <CardDescription className="text-base">
                    Average Ratings
                  </CardDescription>
                  <CardTitle className="text-center text-4xl">
                    {ratings.data?.averageRating ?? 0}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Progress
                    style={{ height: 6 }}
                    value={((ratings.data?.averageRating ?? 0) / 5) * 100}
                  />
                </CardFooter>
              </Card>
              <Card className="w-full flex-shrink items-center">
                <CardHeader className="gap-2">
                  <CardDescription className="text-base">
                    Package Delivered
                  </CardDescription>
                  <CardTitle className="text-center text-4xl">
                    {totalDeliveredPackages?.data}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Muted className="text-center text-xs">
                    total packages delivered.
                  </Muted>
                </CardContent>
              </Card>
            </View>
            <Link href={`/profile-settings`} asChild>
              <Button size={"lg"} variant={"outline"} className="w-full">
                <Settings
                  strokeWidth={1.25}
                  className="text-foreground"
                  size={20}
                />
                <Text>Profile Settings</Text>
              </Button>
            </Link>

            {/** Reviews of the partner */}
            <Separator />

            <View className="w-full">
              <H4>Reviews</H4>
            </View>
          </View>
        }
        contentContainerStyle={{ padding: 20 }}
        indicatorStyle="black"
        estimatedItemSize={180}
        keyExtractor={(item) => item.id}
        onEndReached={() => hasNextPage && fetchNextPage()}
        ListEmptyComponent={
          isLoading ? (
            <SpinnerView />
          ) : (
            <View
              style={{ minHeight: 256 }}
              className="mt-5 w-full items-center justify-center rounded-md border border-dashed border-border "
            >
              <Large>No Reviews</Large>
              <Muted className="px-10 text-center">
                When the customer reviews your service, then those reviews will
                appear here.
              </Muted>
            </View>
          )
        }
        ListFooterComponent={
          <View className="items-center justify-center py-5">
            {hasNextPage && isFetchingNextPage ? (
              <ActivityIndicator className="text-foreground/60" size={20} />
            ) : null}
          </View>
        }
        renderItem={({ item: r }) => (
          <Card className="mt-5">
            <CardHeader className="flex-row justify-between gap-3">
              <View className="flex-row items-center gap-2">
                <Avatar
                  style={{ height: 28, width: 28 }}
                  alt={r?.customer?.name ?? "Customer Profile Pic"}
                >
                  <AvatarImage source={{ uri: r?.customer?.picture ?? "" }} />
                  <AvatarFallback>
                    <Text>{r.customer.name?.charAt(0)}</Text>
                  </AvatarFallback>
                </Avatar>
                <View>
                  <CardTitle className="text-base">
                    {r?.customer.name}
                  </CardTitle>
                </View>
              </View>
              <CardDescription>
                <View className="flex-row gap-2 rounded-sm border border-amber-600/50 bg-amber-500/20 px-1 py-0.5">
                  <Star size={18} className="text-amber-500" />
                  <Muted>{r.rating} Stars</Muted>
                </View>
              </CardDescription>
            </CardHeader>
            {r.comment && (
              <CardContent className="px-6 py-0">
                <P>{r.comment}</P>
              </CardContent>
            )}
            <CardFooter className="items-end">
              <Muted>{moment(r.review_date).fromNow()}</Muted>
            </CardFooter>
          </Card>
        )}
      />
    </View>
  );
}
