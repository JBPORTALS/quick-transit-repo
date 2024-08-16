import { ActivityIndicator, ScrollView, View } from "react-native";

import { Text } from "~/components/ui/text";
import { PackageIcon } from "~/lib/icons/PackageIcon";
import { api } from "~/lib/trpc/api";

export default function HomeScreen() {
  const { data, refetch, isLoading } =
    api.packages.getAllAssignedPackages.useQuery({
      offset: 5,
    });

  if (isLoading) return <ActivityIndicator />;
  return (
    <ScrollView alwaysBounceVertical showsVerticalScrollIndicator>
      <View className="flex-1 gap-3 p-4">
        {data?.packages.map(({ id, package: packageDetails }) => (
          <View
            key={id.toString()}
            className="w-full flex-grow-0 flex-row gap-3"
          >
            <View className="aspect-square min-w-24 max-w-24 items-center  justify-center rounded-md border border-border bg-muted/20">
              <PackageIcon
                strokeWidth={1.25}
                size={32}
                className="text-muted-foreground "
              />
            </View>
            <View className="w-full flex-shrink">
              <Text className="font-bold">{packageDetails.title}</Text>
              <Text className="text-sm text-muted-foreground">
                {packageDetails.description.length > 60
                  ? packageDetails.description.slice(0, 60).concat("...")
                  : packageDetails.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
