import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Debounces a rapidly changing value (e.g., search query or form input)
 * so downstream filters or validation only run after `delayMs` of inactivity.
 *
 * @template T
 * @param {T} value
 * @param {number} [delayMs=250]
 * @returns {T}
 */
export function useDebounce(value, delayMs = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}

/**
 * Returns a memoized callback that delays invoking `fn` until `delayMs`
 * milliseconds have elapsed since the last invocation.
 *
 * @param {(...args: any[]) => void} fn
 * @param {number} [delayMs=250]
 */
export function useDebouncedCallback(fn, delayMs = 250) {
  const timerRef = useRef(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return useCallback(
    (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        fnRef.current(...args);
      }, delayMs);
    },
    [delayMs]
  );
}
