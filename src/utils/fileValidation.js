import { UPLOAD_RULES } from "../config/constants";

/**
 * Validate a client-selected file and derive safe names for storage.
 * @returns {{ok: true, ext: string, displayName: string, storageName: string} | {ok: false, error: string}}
 */
export function validateUpload(file) {
  if (file.size > UPLOAD_RULES.maxBytes) {
    return { ok: false, error: "File too large. Maximum allowed size is 10 MB." };
  }

  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!UPLOAD_RULES.extensions.includes(ext)) {
    return {
      ok: false,
      error: `Invalid file type (.${ext}). Allowed: PDF, Images, Word, Excel, CSV, Text, ZIP.`,
    };
  }

  if (file.type && !UPLOAD_RULES.mimeTypes.includes(file.type)) {
    return { ok: false, error: "File format not permitted for security reasons." };
  }

  // Strip directory traversal / non-alphanumeric characters.
  const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || "file";
  const safeBase = baseName.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50);

  return {
    ok: true,
    ext,
    displayName: `${safeBase}.${ext}`,
    storageName: `${Date.now()}_${safeBase}.${ext}`,
  };
}
