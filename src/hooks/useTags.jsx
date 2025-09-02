// hooks/useTags.js
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/backend";

export const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/post/tags`);
        if (!response.ok) {
          throw new Error(`Failed to fetch tags: ${response.statusText}`);
        }
        const data = await response.json();
        setTags(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
};

