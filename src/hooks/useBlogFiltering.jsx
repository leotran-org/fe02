// hooks/useBlogFiltering.js
import { useState, useMemo, useEffect } from "react";
import { PAGE_SIZE } from "../constants/postsMeta"; // keep PAGE_SIZE
import { getCategories } from "../utils/blogUtils";
import { usePostsMeta } from "./usePostsMeta";

export const useBlogFiltering = () => {
  const { posts, loading, error } = usePostsMeta();
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    if (!posts.length) return [];
    if (activeCategory === "All") return posts;
    return posts.filter((p) => getCategories(p).includes(activeCategory));
  }, [posts, activeCategory]);

  useEffect(() => {
    setPage(1);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeCategory]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE)),
    [filteredPosts.length]
  );

  const pagedPosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return {
    activeCategory,
    page,
    totalPages,
    pagedPosts,
    loading,
    error,
    handlePageChange: (newPage) => {
      setPage(newPage);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    handleCategoryChange: setActiveCategory,
  };
};

