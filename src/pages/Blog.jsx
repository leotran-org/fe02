import { CATEGORIES } from "../constants/categories";
import { useBlogFiltering } from "../hooks/useBlogFiltering";
import { BlogHero } from "../components/blog/BlogHero";
import { FilterBar } from "../components/blog/FilterBar";
import { BlogGrid } from "../components/blog/BlogGrid";
import { Pagination } from "../components/blog/Pagination";
import { BlogStyles } from "../components/blog/BlogStyles";

const Blog = () => {
  const {
    activeCategory,
    page,
    totalPages,
    pagedPosts,
    handlePageChange,
    handleCategoryChange,
  } = useBlogFiltering();

  return (
    <div className="min-h-screen text-white">
      <BlogHero />
      <FilterBar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onChange={handleCategoryChange}
      />
      <BlogGrid posts={pagedPosts} gridKey={`${activeCategory}-${page}`} />
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
