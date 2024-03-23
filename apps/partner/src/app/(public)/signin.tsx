import { Text, TouchableOpacity, View } from "react-native";

import SignInWithGoogle from "~/components/SigninWithGoogle";

export default function Signin() {
  return (
    <View className="flex h-full w-full items-center justify-center gap-3 px-6">
      <Text className="text-4xl font-bold">Signin</Text>
      <Text className="text-lg">to continue pick-up the packages.</Text>
      <SignInWithGoogle />
    </View>
  );
}
