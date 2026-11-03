import { DEFAULT_SERVICE, FORM_LIMITS, SERVICE_OPTIONS } from "../config/constants";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (value) => EMAIL_PATTERN.test(value);

/** Trim, clamp lengths and whitelist the service value. */
export function sanitizeInquiry({ name = "", email = "", service = "", message = "" }) {
  return {
    name: name.trim().slice(0, FORM_LIMITS.name),
    email: email.trim().slice(0, FORM_LIMITS.email),
    service: SERVICE_OPTIONS.includes(service) ? service : DEFAULT_SERVICE,
    message: message.trim().slice(0, FORM_LIMITS.message),
  };
}

/** @returns {{valid: boolean, error?: string, values: object}} */
export function validateInquiry(raw) {
  const values = sanitizeInquiry(raw);
  if (!values.name || !values.email || !values.message) {
    return { valid: false, error: "Please fill in all required fields.", values };
  }
  if (!isValidEmail(values.email)) {
    return { valid: false, error: "Please enter a valid email address.", values };
  }
  return { valid: true, values };
}
