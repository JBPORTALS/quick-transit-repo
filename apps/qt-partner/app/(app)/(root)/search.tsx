import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Link, Stack } from "expo-router";

import { PackageItem } from "~/components/PackageItem";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { ArrowLeft } from "~/lib/icons/ArrowLeft";
import { SearchIcon } from "~/lib/icons/Search";
import { XIcon } from "~/lib/icons/X";
import { api } from "~/lib/trpc/api";
import { cn } from "~/lib/utils";

export default function SearchHere() {
  const [query, setQuery] = useState("");
  const { data, refetch, isLoading } =
    api.packages.getAllAssignedPackages.useQuery({
      offset: 5,
    });

  return (
    <ScrollView>
      <View className="p-6">
        <Stack.Screen
          options={{
            presentation: "modal",
            animation: "fade",
            header(props) {
              return (
                <View className="h-fit w-full flex-row items-center gap-3 border-b border-b-border bg-background px-4 py-3">
                  <ArrowLeft
                    size={28}
                    className="text-foreground"
                    onPress={() => props.navigation.goBack()}
                  />
                  <View className="flex-shrink flex-row items-center overflow-hidden rounded-md border border-border bg-secondary px-3">
                    <SearchIcon size={16} className="text-muted-foreground" />
                    <Input
                      autoFocus
                      value={query}
                      onChangeText={(text) => setQuery(text)}
                      placeholder="Search ..."
                      className="native:h-10 w-full flex-shrink rounded-none border-0 bg-transparent"
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
          {data?.packages.map((data) => (
            <>
              <Link
                key={data.id.toString()}
                asChild
                href={`/package/${data.package_id}`}
              >
                <TouchableOpacity>
                  <PackageItem key={data.id} data={data} />
                </TouchableOpacity>
              </Link>
              <Separator key={data.id + "sperator"} />
            </>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
