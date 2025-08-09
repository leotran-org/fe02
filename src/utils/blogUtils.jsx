// utils/blogUtils.js
/**
 * Normalize categories on a post to an array.
 * Supports `post.categories` (array) or legacy `post.category` (string/array).
 */
export const getCategories = (post) => {
  if (Array.isArray(post?.categories)) return post.categories;
  if (Array.isArray(post?.category)) return post.category;
  return post?.category ? [post.category] : [];
};
