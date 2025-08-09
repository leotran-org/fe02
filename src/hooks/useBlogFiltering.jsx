// hooks/useBlogFiltering.js
import { useState, useMemo, useEffect } from "react";
import { BLOG_POSTS, PAGE_SIZE } from "../constants/postsMeta";
import { getCategories } from "../utils/blogUtils";

export const useBlogFiltering = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => getCategories(p).includes(activeCategory));
  }, [activeCategory]);

  // Reset to first page when category changes
  useEffect(() => {
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  // Compute paging
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE)),
    [filteredPosts.length]
  );

  const pagedPosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, page]);

  // Clamp if data shrinks
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return {
    activeCategory,
    page,
    totalPages,
    pagedPosts,
    handlePageChange,
    handleCategoryChange,
  };
};

