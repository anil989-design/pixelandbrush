import { PAGE_SIZE, PROJECT_TITLE, TABLES } from "../config/constants";
import { unwrap } from "./errors";
import { subscribeToTable } from "./realtime";
import { supabase } from "./supabaseClient";

/**
 * Admin-portal data access.
 * Selecting explicit columns (instead of `select("*")`) keeps payloads small, and
 * `.range()` pagination keeps them bounded as the tables grow.
 */

const INQUIRY_COLUMNS = "id, sender_name, sender_email, service_needed, message, created_at";
const CHAT_COLUMNS = "id, sender, message, is_admin, created_at";

/** One page of website inquiries, newest first. */
export async function fetchInquiries({ page = 0, pageSize = PAGE_SIZE.inquiries } = {}) {
  const from = page * pageSize;
  const result = await supabase
    .from(TABLES.messages)
    .select(INQUIRY_COLUMNS, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + pageSize - 1);

  const rows = unwrap(result, "Couldn't load website inquiries.") || [];
  return { rows, total: result.count ?? rows.length };
}

/** Most recent chat messages, returned oldest → newest for display. */
export async function fetchChatMessages(limit = PAGE_SIZE.chatMessages) {
  const rows = unwrap(
    await supabase
      .from(TABLES.clientMessages)
      .select(CHAT_COLUMNS)
      .order("created_at", { ascending: false })
      .limit(limit),
    "Couldn't load client messages."
  );
  return (rows || []).reverse();
}

export async function fetchProject() {
  return unwrap(
    await supabase.from(TABLES.projects).select("*").limit(1).maybeSingle(),
    "Couldn't load the project status."
  );
}

/** @returns the inserted chat row */
export async function sendAdminReply(text) {
  return unwrap(
    await supabase
      .from(TABLES.clientMessages)
      .insert([{ sender: "Pixel & Brush (Admin)", message: text, is_admin: true }])
      .select(CHAT_COLUMNS)
      .single(),
    "Couldn't send your reply."
  );
}

export async function updateProject({ progress, stage, health, launchDate }) {
  unwrap(
    await supabase
      .from(TABLES.projects)
      .update({
        progress: Number(progress),
        stage,
        health,
        launch_date: launchDate,
        updated_at: new Date(),
      })
      .eq("title", PROJECT_TITLE),
    "Couldn't save the project update."
  );
}

/** Pushes new rows from realtime instead of refetching the whole table. */
export const subscribeToInquiries = (onInsert) =>
  subscribeToTable({
    channel: "admin-inquiries",
    table: TABLES.messages,
    event: "INSERT",
    onChange: (payload) => payload.new && onInsert(payload.new),
  });

export const subscribeToChat = (onInsert) =>
  subscribeToTable({
    channel: "admin-client-msgs",
    table: TABLES.clientMessages,
    event: "INSERT",
    onChange: (payload) => payload.new && onInsert(payload.new),
  });
