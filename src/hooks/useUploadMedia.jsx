// useUploadMedia.js
import { useCallback, useRef, useState } from "react";
import { BACKEND_URL } from "../constants/backend";

/**
 * Hook to upload a media item with thumbnail and metadata.
 *
 * API mirrors your curl example:
 *   - filename
 *   - file
 *   - thumbnail_filename
 *   - thumbnail_file
 *   - slug
 *   - title
 *   - description
 *   - media_type ("Image")
 *   - tags (array -> sent as JSON by default; see note below)
 */
export function useUploadMedia() {
  const [status, setStatus] = useState("idle"); // "idle" | "uploading" | "success" | "error"
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const abortRef = useRef(null);

  const uploadMedia = useCallback(
    async ({
      file,                   // File or Blob (ideally a File from <input type="file">)
      thumbnailFile,          // File or Blob (optional)
      filename,               // string (defaults to file.name)
      thumbnailFilename,      // string (defaults to thumbnailFile?.name)
      slug,                   // string
      title,                  // string
      description = "",       // string
      mediaType = "Image",    // string
      tags = [],              // array of strings; see note below
      withCredentials = false // set true if your API requires cookies
    }) => {
      setStatus("uploading");
      setError(null);
      setResponse(null);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const form = new FormData();

        // Required/primary file
        const mainName = filename || (file && file.name) || "upload.bin";
        form.append("filename", mainName);
        // If you pass a Blob, the third arg sets the filename the server sees
        form.append("file", file, mainName);

        // Thumbnail (optional)
        if (thumbnailFile) {
          const thumbName = thumbnailFilename || thumbnailFile.name || "thumb.bin";
          form.append("thumbnail_filename", thumbName);
          form.append("thumbnail_file", thumbnailFile, thumbName);
        } else if (thumbnailFilename) {
          // If your backend expects the field even without a file:
          form.append("thumbnail_filename", thumbnailFilename);
        }

        // Metadata
        form.append("slug", slug);
        form.append("title", title);
        form.append("description", description);
        form.append("media_type", mediaType);

        // ---- Tags formatting options ----
        // Most backends prefer JSON:
        form.append("tags", JSON.stringify(tags));
        // If your server expects the literal string "['a','b']" like the curl example,
        // comment the JSON line above and use the line below instead:
        // form.append("tags", `['${tags.join("','")}']`);
        // Or, if it expects array fields (tags[]=a&tags[]=b):
        // tags.forEach(t => form.append("tags[]", t));

        const res = await fetch(`${BACKEND_URL}/media/create`, {
          method: "POST",
          body: form,
          signal: controller.signal,
          credentials: withCredentials ? "include" : "same-origin",
        });

        // Try to parse JSON response; fall back to text if needed
        let data = null;
        const text = await res.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { raw: text };
        }

        if (!res.ok) {
          const message =
            (data && (data.message || data.error)) ||
            `Upload failed with status ${res.status}`;
          throw new Error(message);
        }

        setResponse(data);
        setStatus("success");
        return data;
      } catch (err) {
        if (err.name === "AbortError") {
          setStatus("idle");
          setError(null);
          return null;
        }
        setStatus("error");
        setError(err);
        throw err;
      } finally {
        abortRef.current = null;
      }
    },
    []
  );

  const abort = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
  }, []);

  return { uploadMedia, status, error, response, abort };
}

