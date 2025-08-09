import { Tag } from "lucide-react";
import { getCategories } from "../../utils/getCategories";

export const PostTags = ({ post }) => {
  const categories = getCategories(post);
  
  if (!categories.length) return null;
  
  return (
    <div className="mt-10 flex flex-wrap items-center gap-2 text-sm">
      <Tag className="w-4 h-4 text-amber-300" />
      {categories.map((c) => (
        <span
          key={c}
          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
        >
          {c}
        </span>
      ))}
    </div>
  );
};
