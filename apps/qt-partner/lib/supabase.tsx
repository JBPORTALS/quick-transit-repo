import "react-native-url-polyfill/auto";

import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, Session } from "@supabase/supabase-js";

export const supabase = createClient(
  // "https://ovrjsxxhoevipcbzbtgy.supabase.co",
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92cmpzeHhob2V2aXBjYnpidGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMDA2MTUsImV4cCI6MjAzMTg3NjYxNX0.0kL80wdOZKxnoF9LJBo5faCvXMPadAoYdSqrPhY-dVk",
  "http://192.168.17.111:54321",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
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
  const [isLoaded, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const s = await supabase.auth.getSession();
      setSession(s.data.session);
      setLoading(false);
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
