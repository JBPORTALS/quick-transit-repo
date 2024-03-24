import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";

export default function Profile() {
  const { signOut } = useAuth();
  return (
    <TouchableOpacity className="mt-5 w-full" onPress={() => signOut()}>
      <View className="flex w-full items-center justify-center rounded-md bg-[#BD3C9C] px-5 py-3 text-white">
        <Text className="text-lg font-medium text-white">
          Continue to signout
        </Text>
      </View>
    </TouchableOpacity>
  );
}
