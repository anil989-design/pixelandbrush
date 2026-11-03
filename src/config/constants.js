/**
 * Application-wide constants.
 * Anything that is a "magic string/number" in the UI or services lives here so it
 * can be changed in one place.
 */

export const CONTACT = Object.freeze({
  email: "anilpte232@gmail.com",
  // NOTE: placeholder number – replace with the real WhatsApp business number.
  whatsappNumber: "447700000000",
  whatsappMessage: "Hi Pixel & Brush, I'd love to discuss a project!",
});

/** Supabase table names. */
export const TABLES = Object.freeze({
  messages: "messages", // website contact-form inquiries
  clientMessages: "client_messages", // client <-> admin chat
  projects: "projects",
  projectFiles: "project_files",
  approvals: "approvals",
  invoices: "invoices",
});

export const STORAGE_BUCKET = "project-files";
export const PROJECT_TITLE = "Website Project";

/** Contact-form validation / anti-spam limits. */
export const FORM_LIMITS = Object.freeze({
  name: 100,
  email: 254,
  message: 3000,
  chatMessage: 2000,
  cooldownMs: 30 * 1000,
});

export const SERVICE_OPTIONS = Object.freeze([
  "Web Development",
  "Social Media Management",
  "Graphic Design",
  "Full Package",
]);
export const DEFAULT_SERVICE = SERVICE_OPTIONS[0];

/** localStorage / sessionStorage keys. */
export const STORAGE_KEYS = Object.freeze({
  contactCooldown: "pb_contact_cooldown",
  lastMessageRead: "lastMsgRead",
  introSeen: "pb_intro_seen",
  loginAttempts: "pb_login_attempts",
  loginLockout: "pb_login_lockout",
});

/** Page sizes for paginated queries. */
export const PAGE_SIZE = Object.freeze({
  inquiries: 20,
  chatMessages: 100,
});

/** Client file upload rules. */
export const UPLOAD_RULES = Object.freeze({
  maxBytes: 10 * 1024 * 1024,
  extensions: [
    "pdf", "png", "jpg", "jpeg", "gif", "svg", "webp",
    "doc", "docx", "xls", "xlsx", "csv", "txt", "zip",
  ],
  mimeTypes: [
    "application/pdf",
    "image/png", "image/jpeg", "image/gif", "image/svg+xml", "image/webp",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv", "text/plain",
    "application/zip", "application/x-zip-compressed", "application/octet-stream",
  ],
});

export const ADMIN_ROLE = "admin";
