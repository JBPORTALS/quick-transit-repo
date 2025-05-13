import { ScrollView, View } from "react-native";
import { Link } from "expo-router";

import SpinnerView from "~/components/SpinnerView";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
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
import { H3, H4, Large, Muted } from "~/components/ui/typography";
import { Settings } from "~/lib/icons/Settings";
import { api } from "~/lib/trpc/api";

export default function Profile() {
  const [user, ratings, totalDeliveredPackages] = api.useQueries((t) => [
    t.auth.getUser(),
    t.reviews.getRatingsOfPartner(),
    t.packages.getDeliveredCountForPartner(),
  ]);

  if (user.isLoading || ratings.isLoading || totalDeliveredPackages.isLoading)
    return <SpinnerView />;

  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center gap-3 p-5">
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
        <View className="w-full gap-5">
          <H4>Reviews</H4>
          <View
            style={{ minHeight: 256 }}
            className="w-full items-center justify-center rounded-md border border-dashed border-border "
          >
            <Large>No Reviews</Large>
            <Muted className="px-10 text-center">
              When the customer reviews your service, then those reviews will
              appear here.
            </Muted>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
