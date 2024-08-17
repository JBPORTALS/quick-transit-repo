import { ScrollView, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

import { Input } from "~/components/ui/input";
import { SearchIcon } from "~/lib/icons/Search";

export default function PackagesIndex() {
  return (
    <ScrollView>
      <View className="flex-1 p-4 pt-2">
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
    </ScrollView>
  );
}
