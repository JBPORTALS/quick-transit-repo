import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";
import { api } from "~/lib/trpc/api";

export default function HomeScreen() {
  const { data, refetch } = api.auth.getSecretMessage.useQuery();
  // console.log(data);
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl">{data}</Text>
      <Button onPress={() => refetch()}>
        <Text>Refetch</Text>
      </Button>
    </View>
  );
}
