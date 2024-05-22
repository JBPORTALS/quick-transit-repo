import type { Config } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("No pg connection string ❌");

export default {
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: { connectionString },
  tablesFilter: ["t3turbo_*"],
} satisfies Config;




// import { PostgrestClientOptions } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;

// if (!supabaseUrl || !supabaseKey) throw new Error("No Supabase URL or Key ❌");

// const options: PostgrestClientOptions = {
//   schema: "public", // Assuming your schema is public
//   headers: {
//     apikey: supabaseKey,
//     "Content-Type": "application/json",
//   },
// };

// export default {
//   schema: "./src/schema",
//   driver: "supabase", 
//   dbCredentials: { supabaseUrl, supabaseKey }, 
//   options, 
//   tablesFilter: ["t3turbo_*"],
// };
