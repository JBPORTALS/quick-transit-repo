import React from "react";
import { Session } from "@supabase/supabase-js";

import { supabase } from "./supabase";

export function useSupabase() {
  const [session, setSession] = React.useState<null | Session>();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return { session, isLoggedin: !!session?.user.id };
}
