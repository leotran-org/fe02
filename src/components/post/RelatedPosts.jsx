// components/post/RelatedPosts.jsx
import { Link } from "react-router-dom";
import MOCK_POSTS from "../../constants/mockPosts";

export const RelatedPosts = ({ currentId }) => {
  const related = MOCK_POSTS.filter((p) => p.id !== currentId).slice(0, 3);
  
  if (!related.length) return null;
  
  return (
    <section className="pt-8">
      <h3 className="text-xl font-semibold mb-4">Related posts</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((p) => (
          <Link
            key={p.id}
            to={`/post/${p.id}`}
            className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <img
              src={p.image}
              alt={p.title}
              className="h-36 w-full object-cover group-hover:opacity-90"
            />
            <div className="p-4">
              <div className="text-xs text-white/60 mb-2">
                {p.date} · {p.readTime}
              </div>
              <div className="font-medium group-hover:text-amber-300">
                {p.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

