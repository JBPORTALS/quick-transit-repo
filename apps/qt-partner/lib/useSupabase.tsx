import React from "react";

import { SupabaseContext } from "./supabase";

export function useSupabase() {
  const { session, isLoaded } = React.useContext(SupabaseContext);

  return { session, isLoggedin: !!session?.user.id, isLoaded };
}
