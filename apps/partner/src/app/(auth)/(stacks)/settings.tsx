import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { ChevronRight, LogOutIcon } from "lucide-react-native";

import { useColorsTheme } from "~/utils/constants";

export default function settings() {
  const { signOut } = useAuth();
  const colors = useColorsTheme();
  return (
    <View className="h-full w-full gap-3 border-t border-border/20 bg-background px-4 py-3">
      <Text className="text-lg font-bold text-foreground">
        Password & Security
      </Text>
      <View>
        <TouchableOpacity className="flex-row justify-between border-b border-border/20 py-4">
          <Text className="text-lg text-foreground">Change Password</Text>
          <ChevronRight size={24} color={colors.foreground} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between border-b border-border/20 py-4">
          <Text className="text-lg text-foreground">Forgot Password</Text>
          <ChevronRight size={24} color={colors.foreground} />
        </TouchableOpacity>
      </View>
      <Text className="text-lg font-bold text-foreground">Account Actions</Text>
      <View>
        <TouchableOpacity className="flex-row justify-between border-b border-border/20 py-4">
          <Text className="text-lg text-foreground">Upload Documents</Text>
          <ChevronRight size={24} color={colors.foreground} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          className="flex-row justify-between border-b border-border/20 py-4"
        >
          <Text className="text-lg text-red-600">Logout</Text>
          <LogOutIcon size={24} color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
