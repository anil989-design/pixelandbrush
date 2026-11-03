import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_SERVICE, FORM_LIMITS, STORAGE_KEYS } from "../../../config/constants";
import { loadSupabase, submitInquiry } from "../../../services/contactService";
import { toAppError } from "../../../services/errors";
import { cooldownRemainingSeconds, writeStorage } from "../../../utils/storage";
import { validateInquiry } from "../../../utils/validators";

const INITIAL_FIELDS = { name: "", email: "", service: DEFAULT_SERVICE, message: "" };

/**
 * State + submit logic for the landing-page contact form.
 * Keeping it in a hook (and out of the page component) means typing in the form re-renders
 * only the contact section, not the whole landing page.
 */
export default function useContactForm() {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [honeypot, setHoneypot] = useState("");
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error
  const [formError, setFormError] = useState("");
  const resetTimer = useRef(null);
  const preloaded = useRef(false);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  /** Returns an onChange handler for one field. */
  const setField = useCallback(
    (name) => (event) => {
      const { value } = event.target;
      setFields((current) => ({ ...current, [name]: value }));
    },
    []
  );

  /** Warm up the Supabase chunk the first time the visitor touches the form. */
  const preload = useCallback(() => {
    if (preloaded.current) return;
    preloaded.current = true;
    loadSupabase().catch(() => {
      preloaded.current = false; // allow a retry on next focus
    });
  }, []);

  const sendMessage = useCallback(async () => {
    setFormError("");

    // 1. Honeypot (anti-bot): pretend success so bots learn nothing.
    if (honeypot) {
      setFormStatus("success");
      return;
    }

    // 2. Client-side cooldown.
    const wait = cooldownRemainingSeconds(STORAGE_KEYS.contactCooldown, FORM_LIMITS.cooldownMs);
    if (wait > 0) {
      setFormError(`Please wait ${wait}s before sending another message.`);
      return;
    }

    // 3. Validation.
    const { valid, error, values } = validateInquiry(fields);
    if (!valid) {
      setFormError(error);
      return;
    }

    setFormStatus("sending");
    try {
      await submitInquiry(values);
      writeStorage(STORAGE_KEYS.contactCooldown, Date.now());
      setFormStatus("success");
      setFields(INITIAL_FIELDS);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setFormStatus("idle"), 6000);
    } catch (err) {
      setFormError(toAppError(err, "An unexpected error occurred. Please try again later.").message);
      setFormStatus("error");
    }
  }, [fields, honeypot]);

  return { fields, setField, honeypot, setHoneypot, formStatus, formError, sendMessage, preload };
}
