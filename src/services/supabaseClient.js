import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env";

/**
 * Single shared Supabase client.
 * Import this ONLY from files inside `src/services/` – UI code must go through services.
 *
 * Supabase is reached over HTTPS through its pooled gateway (PostgREST + Supavisor), so there
 * is no per-app connection pool to configure here.
 */
export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);
