import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://klcqfxwcymkgpxfcljis.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsY3FmeHdjeW1rZ3B4ZmNsamlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2NTU0MTgsImV4cCI6MjAzMTIzMTQxOH0.i3dLqMZ9jPp88DLACOIhCYOAMqa5WLBoYeMJHJhUlGA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
