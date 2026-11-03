import { supabase } from "./supabaseClient";

/**
 * Subscribe to Postgres changes on one table.
 * @returns {() => void} unsubscribe function (safe to call from a useEffect cleanup)
 */
export function subscribeToTable({ channel, table, event = "*", onChange }) {
  const realtimeChannel = supabase
    .channel(channel)
    .on("postgres_changes", { event, schema: "public", table }, onChange)
    .subscribe();

  return () => {
    supabase.removeChannel(realtimeChannel);
  };
}
