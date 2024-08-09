import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ovrjsxxhoevipcbzbtgy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92cmpzeHhob2V2aXBjYnpidGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMDA2MTUsImV4cCI6MjAzMTg3NjYxNX0.0kL80wdOZKxnoF9LJBo5faCvXMPadAoYdSqrPhY-dVk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
