"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

import { createClient } from "../client";

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  // Fetch user data on mount if not already loaded
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return user;
}
