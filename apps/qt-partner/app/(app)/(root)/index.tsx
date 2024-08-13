import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";
import { useSupabase } from "~/lib/useSupabase";

export default function HomeScreen() {
  const { session } = useSupabase();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl">{session?.user.email}</Text>
      <Button onPress={() => supabase.auth.signOut()}>
        <Text>Sign out</Text>
      </Button>
    </View>
  );
}
