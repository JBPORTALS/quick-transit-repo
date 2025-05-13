import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import { isEmpty } from "lodash";

import { PackageItem } from "~/components/PackageItem";
import SpinnerView from "~/components/SpinnerView";
import { Input } from "~/components/ui/input";
import { Large, Muted } from "~/components/ui/typography";
import { PackageIcon } from "~/lib/icons/PackageIcon";
import { SearchIcon } from "~/lib/icons/Search";
import { api } from "~/lib/trpc/api";

export default function PackagesIndex() {
  const { data, refetch, isLoading } =
    api.packages.getAllAssignedPackages.useQuery({
      offset: 0,
    });
  const [isFetching, setFetching] = useState(false);

  async function refreshData() {
    setFetching(true);
    await refetch();
    setFetching(false);
  }

  if (isLoading) return <SpinnerView />;

  return (
    <>
      {isEmpty(data?.packages) ? (
        <View className="h-[100vh] flex-1 items-center justify-center gap-3">
          <PackageIcon
            size={45}
            strokeWidth={1.5}
            className="text-muted-foreground"
          />
          <View className="gap-0.5">
            <Large className="text-center">No packages assigend yet</Large>
            <Muted className="text-center">
              If assines the package, it will be appear here
            </Muted>
          </View>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              style={{
                backgroundColor: "red",
              }}
              refreshing={isFetching}
              onRefresh={() => refreshData()}
            />
          }
        >
          <View className="flex-1 gap-5 p-5">
            <View>
              <Link href={"/search"} asChild>
                <TouchableOpacity>
                  <View className="flex-row items-center overflow-hidden rounded-xl border border-border bg-card/50 pl-3">
                    <SearchIcon size={16} className="text-muted-foreground" />
                    <Input
                      placeholder="Search packages..."
                      readOnly
                      className="native:h-12 w-full flex-shrink rounded-none border-0 bg-transparent"
                    />
                  </View>
                </TouchableOpacity>
              </Link>
            </View>
            <View className="gap-3">
              {data?.packages.map((data) => (
                <Link
                  key={data.id.toString()}
                  asChild
                  href={`/package/${data.package_id}`}
                >
                  <TouchableOpacity className="gap-3">
                    <PackageItem key={data.id} data={data} />
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}
