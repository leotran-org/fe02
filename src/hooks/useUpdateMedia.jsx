// hooks/useUpdateMedia.js
import { useState, useCallback } from "react";
import { BACKEND_URL } from "../constants/backend";

/**
 * useUpdateMedia
 * Calls PUT {BACKEND_URL}/media/update/:slug with multipart/form-data.
 *
 * updateMedia params:
 * - currentSlug (string, required): slug in the URL (the existing item)
 * - newSlug (string|null|undefined, optional): if a non-empty string, becomes the item's new slug
 * - title (string|null|undefined, optional)
 * - description (string|null|undefined, optional)
 * - tags (string[]|string|null|undefined, optional): arrays are JSON.stringified
 * - thumbnailPath (string|null|undefined, optional): only sent if not uploading a file
 * - thumbnailFile (File|Blob|null|undefined, optional): sent as "thumbnail_file"
 * - signal (AbortSignal, optional)
 *
 * Notes:
 * - Any param can be null; null/undefined values are simply NOT appended.
 * - If you need to explicitly clear a field server-side, decide on an API convention
 *   (e.g. send an empty string or the literal "null") and append that yourself.
 */
export default function useUpdateMedia() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateMedia = useCallback(async (params) => {
    const {
      currentSlug,
      newSlug,
      title,
      description,
      tags,
      thumbnailPath,
      thumbnailFile,
      signal,
    } = params ?? {};

    if (!currentSlug) throw new Error("currentSlug is required");

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const form = new FormData();

      // Only send "slug" if caller actually provided a non-empty string
      if (typeof newSlug === "string" && newSlug.trim() !== "") {
        form.append("slug", newSlug);
      }

      // Helpers
      const appendIfString = (key, value) => {
        if (typeof value === "string") form.append(key, value);
      };

      appendIfString("title", title);
      appendIfString("description", description);

      if (Array.isArray(tags)) {
        form.append("tags", JSON.stringify(tags));
      } else if (typeof tags === "string") {
        // Allow already-stringified tags or a plain string
        form.append("tags", tags);
      }

      // Only send thumbnail_path if NOT uploading a file
      if (!thumbnailFile && typeof thumbnailPath === "string" && thumbnailPath.trim() !== "") {
        form.append("thumbnail_path", thumbnailPath);
      }

      if (thumbnailFile instanceof Blob) {
        // IMPORTANT: field name must be "thumbnail_file"
        const filename = (/** @type {any} */ (thumbnailFile)).name ?? "thumbnail";
        form.append("thumbnail_file", thumbnailFile, filename);
      }

      const res = await fetch(
        `${BACKEND_URL}/media/update/${encodeURIComponent(currentSlug)}`,
        { method: "PUT", body: form, signal }
      );

      // Parse JSON when available, fall back to text
      const contentType = res.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await res.json()
        : { raw: await res.text() };

      if (!res.ok) {
        const message =
          payload?.error || payload?.message || `HTTP ${res.status}`;
        throw new Error(message);
      }

      setData(payload);
      return payload;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateMedia, data, error, loading };
}

