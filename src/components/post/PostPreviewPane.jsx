// components/post/PostPreviewPane.jsx
import { Tag } from "lucide-react";
import { getCategories } from "../../utils/getCategories";

export default function PostPreviewPane({ post, show }) {
  if (!show) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sticky top-24">
      <div className="text-sm text-white/60 mb-3">Live preview</div>
      <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24">
        {(post.htmlContent || []).map((html, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}

        {!!getCategories(post).length && (
          <div className="mt-10 flex flex-wrap items-center gap-2 text-sm">
            <Tag className="w-4 h-4 text-amber-300" />
            {getCategories(post).map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </article>

      <div className="mt-6 text-xs text-white/50">Preview matches your Post page styles.</div>
    </div>
  );
}

