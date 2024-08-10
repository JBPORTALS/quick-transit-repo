import { ScrollView, Text, View } from "react-native";
import { PackageCheckIcon } from "lucide-react-native";

import { NAV_THEME } from "~/lib/constants";

export default function Notifications() {
  const colors = NAV_THEME.light;
  return (
    <ScrollView className="h-full">
      <View className="gap-3 p-4">
        <View className="gap-3">
          <Text className="py-1 text-xl font-medium text-foreground">
            Today
          </Text>
          <View className="gap-2">
            <View className="flex-row items-center gap-3 rounded-md border border-border bg-card px-3 py-4">
              <PackageCheckIcon color={colors.text} size={24} />
              <View>
                <Text className="text-lg font-medium text-card-foreground">
                  Package Dilivered
                </Text>
                <Text className="text-muted-foreground">
                  Request ID -{" "}
                  <Text className="text-blue-600">#272663727822828</Text>
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 rounded-md border border-border bg-card px-3 py-4">
              <PackageCheckIcon color={colors.text} size={24} />
              <View>
                <Text className="text-lg font-medium text-card-foreground">
                  Package Dilivered
                </Text>
                <Text className="text-muted-foreground">
                  Request ID -{" "}
                  <Text className="text-blue-600">#272663727822828</Text>
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 rounded-md border border-border bg-card px-3 py-4">
              <PackageCheckIcon color={colors.text} size={24} />
              <View>
                <Text className="text-lg font-medium text-card-foreground">
                  Package Dilivered
                </Text>
                <Text className="text-muted-foreground">
                  Request ID -{" "}
                  <Text className="text-blue-600">#272663727822828</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="gap-3">
          <Text className="py-1 text-xl font-medium text-foreground">
            Yesterday
          </Text>
          <View className="gap-2">
            <View className="flex-row items-center gap-3 rounded-md border border-border bg-card px-3 py-4">
              <PackageCheckIcon color={colors.text} size={24} />
              <View>
                <Text className="text-lg font-medium text-card-foreground">
                  Package Dilivered
                </Text>
                <Text className="text-muted-foreground">
                  Request ID -{" "}
                  <Text className="text-blue-600">#272663727822828</Text>
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 rounded-md border border-border bg-card px-3 py-4">
              <PackageCheckIcon color={colors.text} size={24} />
              <View>
                <Text className="text-lg font-medium text-card-foreground">
                  Package Dilivered
                </Text>
                <Text className="text-muted-foreground">
                  Request ID -{" "}
                  <Text className="text-blue-600">#272663727822828</Text>
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 rounded-md border border-border bg-card px-3 py-4">
              <PackageCheckIcon color={colors.text} size={24} />
              <View>
                <Text className="text-lg font-medium text-card-foreground">
                  Package Dilivered
                </Text>
                <Text className="text-muted-foreground">
                  Request ID -{" "}
                  <Text className="text-blue-600">#272663727822828</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="gap-3">
          <Text className="py-1 text-xl font-medium text-foreground">
            Thursday
          </Text>
          <View className="gap-2">
            <View className="flex-row items-center gap-3 rounded-md border border-border bg-card px-3 py-4">
              <PackageCheckIcon color={colors.text} size={24} />
              <View>
                <Text className="text-lg font-medium text-card-foreground">
                  Package Dilivered
                </Text>
                <Text className="text-muted-foreground">
                  Request ID -{" "}
                  <Text className="text-blue-600">#272663727822828</Text>
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 rounded-md border border-border bg-card px-3 py-4">
              <PackageCheckIcon color={colors.text} size={24} />
              <View>
                <Text className="text-lg font-medium text-card-foreground">
                  Package Dilivered
                </Text>
                <Text className="text-muted-foreground">
                  Request ID -{" "}
                  <Text className="text-blue-600">#272663727822828</Text>
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 rounded-md border border-border bg-card px-3 py-4">
              <PackageCheckIcon color={colors.text} size={24} />
              <View>
                <Text className="text-lg font-medium text-card-foreground">
                  Package Dilivered
                </Text>
                <Text className="text-muted-foreground">
                  Request ID -{" "}
                  <Text className="text-blue-600">#272663727822828</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
