import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";

export default function Profile() {
  const { signOut } = useAuth();
  return <View className="mt-5 w-full"></View>;
}
