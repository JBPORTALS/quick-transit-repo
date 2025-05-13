import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

import { PackageItem } from "~/components/PackageItem";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { H4 } from "~/components/ui/typography";
import { ArrowLeft } from "~/lib/icons/ArrowLeft";
import { SearchIcon } from "~/lib/icons/Search";
import { XIcon } from "~/lib/icons/X";
import { api } from "~/lib/trpc/api";
import { cn } from "~/lib/utils";

export default function SearchHere() {
  const [query, setQuery] = useState("");
  const { data, isLoading } = api.packages.search.useQuery(
    {
      query,
      offset: 5,
    },
    {
      enabled: !!query,
    },
  );

  const insets = useSafeAreaInsets();

  return (
    <ScrollView keyboardShouldPersistTaps>
      <View className="p-6">
        <Stack.Screen
          options={{
            header(props) {
              return (
                <View
                  className="h-fit w-full flex-row items-center gap-3 border-b border-b-border bg-background px-4 py-3"
                  style={{ paddingTop: insets.top + 12 }}
                >
                  <ArrowLeft
                    size={24}
                    className="text-foreground"
                    onPress={() => props.navigation.goBack()}
                  />
                  <View className="flex-shrink flex-row items-center overflow-hidden rounded-xl border border-border bg-card/50 px-3">
                    <SearchIcon size={16} className="text-muted-foreground" />
                    <Input
                      autoFocus
                      value={query}
                      onChangeText={(text) => setQuery(text)}
                      placeholder="Search packages..."
                      className="native:h-11 native:text-sm w-full flex-shrink rounded-none border-0 bg-transparent"
                    />
                    {query && (
                      <XIcon
                        onPress={() => setQuery("")}
                        size={20}
                        className={cn(
                          "hidden text-foreground",
                          query && "flex",
                        )}
                      />
                    )}
                  </View>
                </View>
              );
            },
          }}
        />
        <View className="gap-3">
          {isLoading ? (
            Array.from({ length: 10 })
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className={"h-24 w-full rounded-md"} />
              ))
          ) : data?.totalCount === 0 ? (
            <View className="items-center py-36">
              <H4>No packages found</H4>
            </View>
          ) : (
            data?.packages.map((data) => (
              <>
                <Link asChild href={`/package/${data.package_id}`}>
                  <TouchableOpacity key={data.id.toString()}>
                    <PackageItem key={data.id} data={data} />
                  </TouchableOpacity>
                </Link>
              </>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
