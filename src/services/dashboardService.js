import { PAGE_SIZE, STORAGE_BUCKET, TABLES } from "../config/constants";
import { AppError, logError, unwrap } from "./errors";
import { subscribeToTable } from "./realtime";
import { supabase } from "./supabaseClient";

/** Client-portal data access. */

const newestFirst = { ascending: false };

export async function fetchProject() {
  return unwrap(
    await supabase.from(TABLES.projects).select("*").limit(1).maybeSingle(),
    "Couldn't load your project."
  );
}

export async function fetchProjectFiles() {
  return (
    unwrap(
      await supabase.from(TABLES.projectFiles).select("*").order("created_at", newestFirst),
      "Couldn't load project files."
    ) || []
  );
}

/** Most recent messages, returned oldest → newest for display. */
export async function fetchClientMessages(limit = PAGE_SIZE.chatMessages) {
  const rows = unwrap(
    await supabase
      .from(TABLES.clientMessages)
      .select("id, sender, message, is_admin, created_at")
      .order("created_at", newestFirst)
      .limit(limit),
    "Couldn't load messages."
  );
  return (rows || []).reverse();
}

export async function fetchApprovals() {
  return (
    unwrap(
      await supabase.from(TABLES.approvals).select("*").order("created_at", newestFirst),
      "Couldn't load approvals."
    ) || []
  );
}

export async function fetchInvoices() {
  return (
    unwrap(
      await supabase.from(TABLES.invoices).select("*").order("created_at", newestFirst),
      "Couldn't load invoices."
    ) || []
  );
}

export async function sendClientMessage(text) {
  unwrap(
    await supabase
      .from(TABLES.clientMessages)
      .insert([{ sender: "Client", message: text, is_admin: false }]),
    "Failed to send message."
  );
}

export async function updateApprovalStatus(id, status) {
  unwrap(
    await supabase.from(TABLES.approvals).update({ status }).eq("id", id),
    "Update failed."
  );
}

/**
 * Upload to Storage, then record the file in `project_files`.
 * @param {File} file
 * @param {{storageName: string, displayName: string}} names produced by validateUpload()
 */
export async function uploadProjectFile(file, { storageName, displayName }) {
  const upload = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storageName, file, { cacheControl: "3600", upsert: false });
  if (upload.error) {
    logError("dashboardService.upload", upload.error);
    throw new AppError(`Upload failed: ${upload.error.message}`, { cause: upload.error });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storageName);

  const record = await supabase
    .from(TABLES.projectFiles)
    .insert([{ file_name: displayName, file_url: publicUrl, uploaded_by: "client" }]);
  if (record.error) {
    logError("dashboardService.upload.record", record.error);
    throw new AppError(
      `Saved to storage, but database record failed: ${record.error.message}`,
      { cause: record.error }
    );
  }
}

export const subscribeToProject = (onChange) =>
  subscribeToTable({ channel: "db-projects", table: TABLES.projects, onChange });

export const subscribeToApprovals = (onChange) =>
  subscribeToTable({ channel: "db-approvals", table: TABLES.approvals, onChange });

/** Delivers each new chat row directly; no full refetch. */
export const subscribeToClientMessages = (onInsert) =>
  subscribeToTable({
    channel: "db-messages",
    table: TABLES.clientMessages,
    event: "INSERT",
    onChange: (payload) => payload.new && onInsert(payload.new),
  });
