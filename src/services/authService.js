import { ADMIN_ROLE } from "../config/constants";
import { supabase } from "./supabaseClient";

/** Thin wrappers so UI code never touches `supabase.auth` directly. */

export const signInWithPassword = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

export const signOut = () => supabase.auth.signOut();

export const getSession = () => supabase.auth.getSession();

export const onAuthStateChange = (callback) => supabase.auth.onAuthStateChange(callback);

export async function getCurrentUserEmail() {
  const { data } = await supabase.auth.getUser();
  return data?.user?.email || "";
}

export const isAdminUser = (user) => user?.user_metadata?.role === ADMIN_ROLE;
