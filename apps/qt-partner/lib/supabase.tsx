import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ovrjsxxhoevipcbzbtgy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92cmpzeHhob2V2aXBjYnpidGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMDA2MTUsImV4cCI6MjAzMTg3NjYxNX0.0kL80wdOZKxnoF9LJBo5faCvXMPadAoYdSqrPhY-dVk",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
