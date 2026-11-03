/**
 * Environment configuration – the ONLY file that reads process.env.
 *
 * Set these in `.env` locally and in Vercel → Project Settings → Environment Variables:
 *   REACT_APP_SUPABASE_URL
 *   REACT_APP_SUPABASE_ANON_KEY
 * See `.env.example`.
 *
 * The fallbacks below are the project's PUBLIC (publishable/anon) credentials. They are
 * safe to ship to browsers (row-level-security protects the data) and exist so the site
 * never renders blank if the env vars are missing on a deployment. Once the variables are
 * configured in Vercel you can delete the fallbacks.
 */
const FALLBACK_SUPABASE_URL = "https://uapzzvneelycauqzwsfj.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY = "sb_publishable_l8fPEsnp4Xfh45Tt6r9Hww_dRF7BWf6";

export const env = Object.freeze({
  supabaseUrl: process.env.REACT_APP_SUPABASE_URL || FALLBACK_SUPABASE_URL,
  supabaseAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY,
  isProduction: process.env.NODE_ENV === "production",
});
