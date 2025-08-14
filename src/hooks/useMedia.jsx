// /hooks/useMedia.js
// Fetch media information from `${BACKEND_URL}/media/get/:slug` using axios
// Usage example is included at the bottom.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

/**
 * @typedef {Object} Media
 * @property {string} created_at - e.g. "Tue, 12 Aug 2025 19:30:51 GMT"
 * @property {string} description
 * @property {string} file_path
 * @property {string} thumbnail_path
 * @property {string} title
 * @property {"image"|"video"|"audio"|string} type_name
 * @property {string[]} tags
 */

/**
 * React hook to fetch media information by slug.
 *
 * @param {string} slug - The media slug to fetch.
 * @param {Object} [options]
 * @param {boolean} [options.enabled=true] - If false, fetching is disabled until you call refetch.
 * @param {(data: Media) => any} [options.select] - Optional transform for the response data.
 * @param {import('axios').AxiosRequestConfig} [options.axiosConfig] - Extra axios config (headers, withCredentials, etc.).
 * @returns {{
 *   media: Media | null,
 *   isLoading: boolean,
 *   isRefreshing: boolean,
 *   isSuccess: boolean,
 *   error: any,
 *   refetch: () => Promise<void>
 * }}
 */
export function useMedia(slug, options = {}) {
  const { enabled = true, select, axiosConfig } = options;

  const [media, setMedia] = useState(null);
  const [status, setStatus] = useState(/** @type {"idle"|"loading"|"refreshing"|"success"|"error"} */ ("idle"));
  const [error, setError] = useState(null);

  // Keep a reference to the current in-flight request so we can cancel it on slug change/unmount
  const controllerRef = useRef(/** @type {AbortController | null} */ (null));

  const url = useMemo(() => {
    if (!slug) return null;
    const base = String(BACKEND_URL || "").replace(/\/$/, "");
    return `${base}/media/get/${encodeURIComponent(slug)}`;
  }, [slug]);

  const fetchMedia = useCallback(async () => {
    if (!url) return;

    // Cancel any previous in-flight request
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setError(null);
    setStatus((prev) => (prev === "success" ? "refreshing" : "loading"));

    try {
      const { data } = await axios.get(url, { signal: controller.signal, ...axiosConfig });

      // Normalize `tags` so consumers can rely on an array.
      const normalized = /** @type {Media} */ ({
        ...data,
        tags: Array.isArray(data?.tags) ? data.tags.filter(Boolean).map(String) : [],
      });

      const next = typeof select === "function" ? select(normalized) : normalized;
      setMedia(next);
      setStatus("success");
    } catch (err) {
      // Swallow abort errors
      if (
        (axios.isCancel && axios.isCancel(err)) ||
        err?.name === "CanceledError" ||
        err?.code === "ERR_CANCELED"
      ) {
        return;
      }
      setError(err);
      setStatus("error");
    }
  }, [url, select, axiosConfig]);

  useEffect(() => {
    if (!enabled || !url) return;
    fetchMedia();
    return () => {
      controllerRef.current?.abort();
    };
  }, [enabled, url, fetchMedia]);

  const refetch = useCallback(async () => {
    if (!url) return;
    await fetchMedia();
  }, [url, fetchMedia]);

  return {
    media,
    isLoading: status === "loading",
    isRefreshing: status === "refreshing",
    isSuccess: status === "success",
    error,
    refetch,
  };
}

