import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { ChevronDown, LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Button } from "@qt/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@qt/ui/popover";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";
import { ThemeToggle } from "@qt/ui/theme";

import { createClient } from "~/utils/client";

export default function AvatarButton() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();
  // Fetch user data on mount if not already loaded
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [supabase]);

  return (
    <Popover>
      <PopoverTrigger>
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
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <HStack className="bg-secondary px-4 py-4">
          <Avatar className="size-10 border">
            <AvatarImage src={user?.user_metadata?.picture} />
            <AvatarFallback>
              {user?.user_metadata.full_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <VStack className="gap-1">
            <Text styles={"body_medium"}>{user?.user_metadata.full_name}</Text>
            <Text styles={"body"}>{user?.user_metadata.email}</Text>
          </VStack>
        </HStack>
        <VStack className="gap-0 py-3">
          <ThemeToggle />
          <Button
            onClick={() => supabase.auth.signOut().then(() => router.refresh())}
            variant={"ghost"}
            className="w-full justify-start rounded-none py-6 text-sm font-light"
          >
            <LogOutIcon className="h-5 w-5" /> Logout
          </Button>
        </VStack>
      </PopoverContent>
    </Popover>
  );
}
