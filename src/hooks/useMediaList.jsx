import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

/**
 * Axios instance configured for your backend.
 * - Uses BACKEND_URL (e.g., "http://192.168.1.5:5055")
 * - 10s timeout; tweak if needed
 */
export const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10_000,
});

/**
 * @typedef {Object} MediaItem
 * @property {string} date
 * @property {number | null} duration
 * @property {number} id
 * @property {string} slug
 * @property {string} src
 * @property {string[]} tags
 * @property {string} thumb
 * @property {string} title
 * @property {"image" | "video" | string} type
 */

/**
 * React hook to fetch all media from `${BACKEND_URL}/media/all`.
 *
 * Features
 * - Loading & error state
 * - Safe cancellation on unmount and when refetching
 * - Stable `refetch()` function
 *
 * @param {Object} [options]
 * @param {boolean} [options.enabled=true]  If false, the initial fetch is skipped
 * @param {AbortSignal} [options.signal]    Optional external AbortSignal to link cancellation
 * @returns {{
 *   data: MediaItem[] | null,
 *   isLoading: boolean,
 *   error: any,
 *   refetch: () => Promise<{ data?: MediaItem[]; error?: any }>
 * }}
 */
export function useMediaAll(options = {}) {
  const { enabled = true, signal: externalSignal } = options;

  const [data, setData] = useState(/** @type {MediaItem[] | null} */(null));
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState(null);

  // Prevent race conditions between rapid refetches
  const requestSeq = useRef(0);

  const fetchMedia = useCallback(async () => {
    const seq = ++requestSeq.current;
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    // If an external signal is provided, mirror its cancel behavior
    if (externalSignal) {
      const onExternalAbort = () => controller.abort();
      // Tie lifetime to this request only
      externalSignal.addEventListener("abort", onExternalAbort, { once: true });
    }

    try {
      const res = await api.get("/media/all", { signal: controller.signal });
      const items = Array.isArray(res.data) ? res.data : [];
      // Only update if this is the latest in-flight request
      if (seq === requestSeq.current) setData(items);
      return { data: items };
    } catch (err) {
      // Axios v1 uses DOMException name "CanceledError" on abort
      if (err?.name === "CanceledError") return {};
      setError(err);
      return { error: err };
    } finally {
      if (seq === requestSeq.current) setIsLoading(false);
    }
  }, [externalSignal]);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const run = async () => {
      try {
        await api.get("/health", { signal: controller.signal }).catch(() => {});
      } catch (_) {}
      // initial load
      fetchMedia();
    };
    run();
    return () => controller.abort();
  }, [enabled, fetchMedia]);

  return { data, isLoading, error, refetch: fetchMedia };
}

// DROP-IN REPLACEMENT FOR `MEDIA_ITEMS`
// -------------------------------------
// If you previously had something like:
//   import { MEDIA_ITEMS } from "../constants/media";
//   const items = MEDIA_ITEMS;
// you can replace it with the hook below. To minimize changes, we alias
// the fetched data to a local `MEDIA_ITEMS` variable.

export default function GalleryUsingHook() {
  const { data, isLoading, error, refetch } = useMediaAll();
  const MEDIA_ITEMS = data ?? [];

  if (isLoading) return <p>Loading…</p>;
  if (error) return <pre style={{ color: "crimson" }}>{String(error)}</pre>;
  if (!MEDIA_ITEMS.length) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <p>No media found.</p>
      <button onClick={refetch}>Try again</button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>Media</h3>
        <button onClick={refetch}>Refetch</button>
      </div>
      <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, padding: 0 }}>
        {MEDIA_ITEMS.map((m) => (
          <li key={m.id} style={{ listStyle: "none" }}>
            <figure style={{ margin: 0 }}>
              <img
                src={m.thumb || m.src}
                alt={m.title}
                style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12 }}
              />
              <figcaption style={{ marginTop: 8 }}>
                <strong>{m.title}</strong>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{Array.isArray(m.tags) ? m.tags.join(", ") : ""}</div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

