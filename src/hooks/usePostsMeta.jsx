// hooks/usePostsMeta.js
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/backend";

export const usePostsMeta = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/post/all`);
        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
        const data = await res.json();

        // Transform API response to match UI expectations
        const normalized = data.map((post) => ({
          id: post.post_id,
          title: post.title,
          excerpt: post.description,
          categories: post.tags,
          readTime: `${post.read_time} min read`,
          date: new Date(post.last_updated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          image: post.thumbnail_path,
          slug: post.slug,
        }));

        setPosts(prev => [...prev, ...normalized]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

