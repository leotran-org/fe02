// useValidateSession.js
import { useState, useRef, useCallback } from "react";
import { BACKEND_URL } from "../constants/backend";

const ENDPOINT = `${BACKEND_URL}/auth/session/validate`;

/**
 * Validate a session against the backend.
 *
 * @param {Object} options
 * @param {RequestCredentials} [options.credentials='same-origin'] - Set to 'include' if your cookie is cross-site.
 * @param {Object} [options.headers] - Extra headers to send.
 */
export function useValidateSession(options = {}) {
  const [data, setData] = useState(null);     // Backend response JSON (e.g., { message, session_data } or { error })
  const [error, setError] = useState(null);   // Error object (network/HTTP)
  const [status, setStatus] = useState(null); // HTTP status code
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);

  const validate = useCallback(
    async (sessionId) => {
      if (!sessionId) {
        const err = new Error("session_id is required");
        setError(err);
        return { ok: false, error: err };
      }

      // Cancel any in-flight request
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
          credentials: options.credentials ?? "same-origin",
          body: JSON.stringify({ session_id: sessionId }),
          signal: controller.signal,
        });

        setStatus(res.status);

        // Try to parse JSON even on non-2xx to surface backend error messages
        const json = await res.json().catch(() => ({}));

        if (!res.ok) {
          const err = new Error(json.error || `Request failed (${res.status})`);
          err.status = res.status;
          setError(err);
          return { ok: false, status: res.status, error: err, data: json };
        }

        setData(json);
        return { ok: true, status: res.status, data: json };
      } catch (e) {
        if (e.name === "AbortError") {
          return { ok: false, aborted: true };
        }
        setError(e);
        return { ok: false, error: e };
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [options.credentials, options.headers]
  );

  const cancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setStatus(null);
  }, []);

  return { validate, data, error, status, isLoading, cancel, reset };
}

