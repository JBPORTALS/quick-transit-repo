import { ScrollView, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { PackageIcon } from "~/lib/icons/PackageIcon";
import { SearchIcon } from "~/lib/icons/Search";
import { ActivityIndicator } from "~/lib/native/activity-indicator";
import { api } from "~/lib/trpc/api";

export default function PackagesIndex() {
  const { data, refetch, isLoading } =
    api.packages.getAllAssignedPackages.useQuery({
      offset: 5,
    });

  if (isLoading)
    return <ActivityIndicator size={45} className="mt-4 text-primary" />;
  return (
    <ScrollView>
      <View className="flex-1 gap-5 p-4">
        <View>
          <Link href={"/search"} asChild>
            <TouchableOpacity>
              <View className="flex-row items-center overflow-hidden rounded-md border border-border bg-secondary pl-3">
                <SearchIcon size={20} className="text-foreground" />
                <Input
                  placeholder="Search ..."
                  readOnly
                  className="native:h-10 w-full flex-shrink rounded-none border-0 bg-transparent"
                />
              </View>
            </TouchableOpacity>
          </Link>
        </View>
        <View className="gap-3">
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
      </View>
    </ScrollView>
  );
}
