import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

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
    <HStack className="items-center">
      <VStack className="items-end gap-0">
        <Text styles={"body"}>{user?.user_metadata?.full_name}</Text>
        <Text styles={"details"} className="text-muted-foreground">
          {user?.user_metadata?.email}
        </Text>
      </VStack>
      <Avatar className="size-10 border">
        <AvatarImage src={user?.user_metadata?.picture} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </HStack>
  );
}
