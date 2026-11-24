// data/supabase.js: the door to the database.
// Only created when both Supabase keys are set (see config/env.js).

import { createClient } from "@supabase/supabase-js";
import { config } from "../config/env.js";

export const supabase = config.useSupabase
  ? createClient(config.supabaseUrl, config.supabaseSecretKey, {
      auth: { persistSession: false },
    })
  : null;
