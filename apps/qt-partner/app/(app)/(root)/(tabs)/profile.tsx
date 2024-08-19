import { ScrollView, View } from "react-native";

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
import {
  H3,
  H4,
  Large,
  Lead,
  Muted,
  P,
  Small,
} from "~/components/ui/typography";
import { Settings } from "~/lib/icons/Settings";
import { supabase } from "~/lib/supabase";
import { api } from "~/lib/trpc/api";
import { useSupabase } from "~/lib/useSupabase";

export default function Profile() {
  const { data } = api.auth.getUser.useQuery();
  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center gap-3 p-5">
        <Avatar alt="Shadcn" className="size-24 border-2 border-primary">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <View className="items-center">
          <H3>{data?.name}</H3>
          <Muted>{data?.email}</Muted>
        </View>
        <View className="flex-row justify-between gap-3">
          <Card className="w-full flex-shrink items-center">
            <CardHeader className="gap-2">
              <CardDescription className="text-base">
                Average Ratings
              </CardDescription>
              <CardTitle className="text-center text-4xl">4</CardTitle>
            </CardHeader>
            <CardFooter>
              <Progress value={(4 / 5) * 100} />
            </CardFooter>
          </Card>
          <Card className="w-full flex-shrink items-center">
            <CardHeader className="gap-2">
              <CardDescription className="text-base">
                Package Delivered
              </CardDescription>
              <CardTitle className="text-center text-4xl">39</CardTitle>
            </CardHeader>
            <CardContent>
              <Muted className="text-center text-xs">
                total packages delivered.
              </Muted>
            </CardContent>
          </Card>
        </View>
        <Button size={"lg"} variant={"outline"} className="w-full">
          <Settings strokeWidth={1.25} className="text-foreground" size={20} />
          <Text>Profile Settings</Text>
        </Button>

        {/** Reviews of the partner */}
        <Separator />
        <View className="w-full gap-5">
          <H4>Reviews</H4>
          <View className="min-h-64 w-full items-center justify-center rounded-md border border-dashed border-border ">
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
