import "react-native-url-polyfill/auto";

import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, Session } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
);

interface SupabaseContextProps {
  session: null | Session;
  isLoaded: boolean;
}

export const SupabaseContext = React.createContext<SupabaseContextProps>({
  session: null,
  isLoaded: true,
});

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<null | Session>(null);
  const [isLoaded, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const s = await supabase.auth.getSession();
      setSession(s.data.session);
      setLoading(true);
    })();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SupabaseContext.Provider value={{ session, isLoaded }}>
      {children}
    </SupabaseContext.Provider>
  );
}
