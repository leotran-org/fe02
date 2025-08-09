// utils/getCategories.js
export function getCategories(post) {
  if (Array.isArray(post?.categories)) return post.categories;
  if (Array.isArray(post?.category)) return post.category;
  return post?.category ? [post.category] : [];
}
