import { env } from "../config/env";

/** Error type thrown by the service layer. `message` is always safe to show to a user. */
export class AppError extends Error {
  constructor(message, { code, cause } = {}) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.cause = cause;
  }
}

/** Log details in development only; stay quiet in production consoles. */
export function logError(scope, error) {
  if (!env.isProduction) {
    // eslint-disable-next-line no-console
    console.error(`[${scope}]`, error);
  }
}

/** Normalise anything thrown into an AppError with a user-safe message. */
export function toAppError(error, fallbackMessage = "Something went wrong. Please try again.") {
  if (error instanceof AppError) return error;
  return new AppError(fallbackMessage, { code: error?.code, cause: error });
}

/**
 * Unwrap a Supabase `{ data, error }` result.
 * Throws an AppError on failure, otherwise returns `data`.
 */
export function unwrap({ data, error }, userMessage) {
  if (error) {
    logError("supabase", error);
    throw new AppError(userMessage || error.message, { code: error.code, cause: error });
  }
  return data;
}
