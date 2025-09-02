// hooks/useUpdatePost.js
import { useState } from "react";
import { BACKEND_URL } from "../constants/backend";

export function useUpdatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function updatePost(slug, blocks) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/post/update/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blocks: blocks.map((b) => b.content), // send [str_block1, str_block2, ...]
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return { updatePost, isLoading, error };
}

