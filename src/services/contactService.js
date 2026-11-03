import { TABLES } from "../config/constants";
import { AppError, logError } from "./errors";

/**
 * The landing page never needs Supabase until a visitor actually sends a message, so the
 * client (~40 kB gzipped) is loaded on demand instead of blocking first paint.
 */
export const loadSupabase = async () => {
  try {
    const module = await import("./supabaseClient");
    return module.supabase;
  } catch (error) {
    logError("contactService.loadSupabase", error);
    throw new AppError("Couldn't reach the server. Check your connection and try again.", {
      cause: error,
    });
  }
};

/**
 * Store a website enquiry.
 * @param {{name: string, email: string, service: string, message: string}} inquiry already validated/sanitised
 * @throws {AppError} with a user-safe message
 */
export async function submitInquiry({ name, email, service, message }) {
  const supabase = await loadSupabase();
  const { error } = await supabase.from(TABLES.messages).insert([
    { sender_name: name, sender_email: email, service_needed: service, message },
  ]);

  if (error) {
    logError("contactService.submitInquiry", error);
    throw new AppError(
      "Failed to send message. Please try again later or email us directly.",
      { code: error.code, cause: error }
    );
  }
}
