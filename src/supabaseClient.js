import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL || "https://uapzzvneelycauqzwsfj.supabase.co";

const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY || "sb_publishable_l8fPEsnp4Xfh45Tt6r9Hww_dRF7BWf6";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);