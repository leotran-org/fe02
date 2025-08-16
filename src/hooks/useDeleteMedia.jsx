import { useCallback, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

/**
 * React hook to delete media by slug.
 *
 * @param {Object} [options]
 * @param {(data: any) => any} [options.onSuccess] - Called when deletion succeeds.
 * @param {(error: any) => any} [options.onError] - Called when deletion fails.
 * @param {import('axios').AxiosRequestConfig} [options.axiosConfig] - Extra axios config (headers, withCredentials, etc.).
 * @returns {{
 *   isLoading: boolean,
 *   isSuccess: boolean,
 *   isError: boolean,
 *   error: any,
 *   deleteMedia: (slug: string) => Promise<void>
 * }}
 */
export function useDeleteMedia(options = {}) {
  const { onSuccess, onError, axiosConfig } = options;

  const [status, setStatus] = useState(/** @type {"idle"|"loading"|"success"|"error"} */ ("idle"));
  const [error, setError] = useState(null);

  const deleteMedia = useCallback(
    async (slug) => {
      if (!slug) return;

      const base = String(BACKEND_URL || "").replace(/\/$/, "");
      const url = `${base}/media/delete/${encodeURIComponent(slug)}`;

      setStatus("loading");
      setError(null);

      try {
        const { data } = await axios.delete(url, { ...axiosConfig });
        setStatus("success");
        if (typeof onSuccess === "function") onSuccess(data);
      } catch (err) {
        setStatus("error");
        setError(err);
        if (typeof onError === "function") onError(err);
      }
    },
    [axiosConfig, onSuccess, onError]
  );

  return {
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    error,
    deleteMedia,
  };
}

