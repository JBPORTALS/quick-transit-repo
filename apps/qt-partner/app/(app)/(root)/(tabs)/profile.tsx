import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";
import { useSupabase } from "~/lib/useSupabase";

export default function Profile() {
  const { session } = useSupabase();
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text>{session?.user.email}</Text>
      <Button onPress={() => supabase.auth.signOut()}>
        <Text>Sign Out</Text>
      </Button>
    </View>
  );
}
