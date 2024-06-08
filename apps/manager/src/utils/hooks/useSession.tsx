"use client";

import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

import { createClient } from "../client";

export default function useSession() {
  const [user, setUser] = useState<Session | null>(null);
  const supabase = createClient();
  // Fetch user data on mount if not already loaded
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session));
  }, [supabase]);

  return user;
}
