import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { ChevronRight, LogOutIcon } from "lucide-react-native";

export default function settings() {
  const { signOut } = useAuth();
  return (
    <View className="h-full w-full gap-3 border-t border-border/20 bg-white px-4 py-3">
      <Text className="text-lg font-bold">Password & Security</Text>
      <View>
        <TouchableOpacity className="flex-row justify-between border-b border-border/20 py-4">
          <Text className="text-lg">Change Password</Text>
          <ChevronRight size={24} color={"black"} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between border-b border-border/20 py-4">
          <Text className="text-lg">Forgot Password</Text>
          <ChevronRight size={24} color={"black"} />
        </TouchableOpacity>
      </View>
      <Text className="text-lg font-bold">Account Actions</Text>
      <View>
        <TouchableOpacity className="flex-row justify-between border-b border-border/20 py-4">
          <Text className="text-lg">Upload Documents</Text>
          <ChevronRight size={24} color={"black"} />
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
