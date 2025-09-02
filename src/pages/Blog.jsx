// pages/blog.jsx

import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useTags } from "../hooks/useTags";
import { useBlogFiltering } from "../hooks/useBlogFiltering";
import { BlogHero } from "../components/blog/BlogHero";
import { FilterBar } from "../components/blog/FilterBar";
import { BlogGrid } from "../components/blog/BlogGrid";
import { Pagination } from "../components/blog/Pagination";
import { BlogStyles } from "../components/blog/BlogStyles";

import { useValidateSession } from "../hooks/useValidateSession";


const Blog = () => {
  const { tags, loading, error } = useTags();
  const {
    activeCategory,
    page,
    totalPages,
    pagedPosts,
    handlePageChange,
    handleCategoryChange,
  } = useBlogFiltering();

  // ---- NEW: validate session on mount to decide IsAdmin
  const { validate } = useValidateSession({ credentials: "same-origin" });
  const [sessionData, setSessionData] = useState(null);
  const checkedCookieRef = useRef(false);

  useEffect(() => {
    if (checkedCookieRef.current) return; // avoid double-run in Strict Mode
    checkedCookieRef.current = true;

    const cookieSessionId = Cookies.get("session_id");
    if (!cookieSessionId) return;

    (async () => {
      const res = await validate(cookieSessionId);
      if (res?.ok && res?.data?.session_data) {
        setSessionData(res.data.session_data);
      } else {
        Cookies.remove("session_id", { path: "/" });
        setSessionData(null);
      }
    })();
  }, [validate]);

  // Consider any successfully validated session as "admin" per requirement
  const isAdmin = !!sessionData;

  return (
    <div className="min-h-screen text-white">
      <BlogHero />

      {loading && <p>Loading tags...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <FilterBar
          categories={["All", ...tags]} // merge "All" with dynamic tags
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />
      )}

      <BlogGrid posts={pagedPosts} IsAdmin={isAdmin} gridKey={`${activeCategory}-${page}`} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
      <BlogStyles />
    </div>
  );
};

export default Blog;

