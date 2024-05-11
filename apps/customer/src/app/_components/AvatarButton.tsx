import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";

import { createClient } from "~/utils/client";

export default function AvatarButton() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  // Fetch user data on mount if not already loaded
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [user]);

  return (
    <HStack className="items-center gap-1">
      {/* <VStack className="items-end gap-0">
        <Text styles={"details"} className="text-muted-foreground">
          {user?.user_metadata?.email}
        </Text>
        <Text styles={"body"}>{user?.user_metadata?.full_name}</Text>
      </VStack> */}
      <Avatar className="size-10 border">
        <AvatarImage src={user?.user_metadata?.picture} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <ChevronDown className="h-4 w-4" />
    </HStack>
  );
}
