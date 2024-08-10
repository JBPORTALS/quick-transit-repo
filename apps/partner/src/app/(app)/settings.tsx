import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { ChevronRight, LogOutIcon } from "lucide-react-native";

import { NAV_THEME } from "~/lib/constants";

export default function Settings() {
  const colors = NAV_THEME.light;
  return (
    <View className="h-full w-full gap-3 border-t border-border px-4 py-3">
      <Text className="text-lg font-bold text-foreground">
        Password & Security
      </Text>
      <View>
        <TouchableOpacity className="flex-row justify-between border-b border-border py-4">
          <Text className="text-lg text-foreground">Change Password</Text>
          <ChevronRight size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between border-b border-border py-4">
          <Text className="text-lg text-foreground">Forgot Password</Text>
          <ChevronRight size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <Text className="text-lg font-bold text-foreground">Account Actions</Text>
      <View>
        <TouchableOpacity className="flex-row justify-between border-b border-border py-4">
          <Text className="text-lg text-foreground">Upload Documents</Text>
          <ChevronRight size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {}}
          className="flex-row justify-between border-b border-border py-4"
        >
          <Text className="text-lg text-red-600">Logout</Text>
          <LogOutIcon size={24} color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
