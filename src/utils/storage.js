/** Safe wrappers around Web Storage (throws in private mode / when storage is disabled). */

const area = (type) => (type === "session" ? window.sessionStorage : window.localStorage);

export function readStorage(key, type = "local") {
  try {
    return area(type).getItem(key);
  } catch (_) {
    return null; // storage unavailable – behave as "not set"
  }
}

export function writeStorage(key, value, type = "local") {
  try {
    area(type).setItem(key, String(value));
  } catch (_) {
    /* storage unavailable – ignore */
  }
}

export function removeStorage(key, type = "local") {
  try {
    area(type).removeItem(key);
  } catch (_) {
    /* storage unavailable – ignore */
  }
}

/** Seconds left on a timestamp-based cooldown (0 when expired / unset). */
export function cooldownRemainingSeconds(key, durationMs) {
  const last = parseInt(readStorage(key) || "0", 10);
  const remainingMs = durationMs - (Date.now() - last);
  return remainingMs > 0 ? Math.ceil(remainingMs / 1000) : 0;
}
