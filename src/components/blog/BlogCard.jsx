// components/blog/BlogCard.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Loader2, Pencil, Trash2, Plus } from "lucide-react";
import { getCategories } from "../../utils/blogUtils";
import { fadeUp } from "../../animations/variants";
import { useState } from "react";

// Wrapper: no hooks here, so no conditional hook calls.
export function BlogCard({ post, IsAdmin = false, variant = "default" }) {
  // Only show Add card if admin; otherwise fall back to default
  if (variant === "add" && IsAdmin) return <BlogCardAdd />;
  return <BlogCardDefault post={post} IsAdmin={IsAdmin} />;
}

/** Admin "Add" card (no hooks) */
function BlogCardAdd() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeUp}
      className="break-inside-avoid my-8 group cursor-pointer"
      onClick={() => navigate("/post_new")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && navigate("/post/new")
      }
      aria-label="Create new post"
      title="Create new post"
    >
      <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-white/5 shadow transition hover:shadow-2xl focus-within:ring focus-within:ring-amber-300/50 h-80 flex items-center justify-center">
        <div className="relative aspect-[16/9] grid place-items-center">
          <div className="flex flex-col items-center justify-center gap-2 text-white/80">
            <Plus className="h-16 w-16 group-hover:text-amber-300" />
            <span className="text-xl font-medium group-hover:text-amber-300">
              New post
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Regular blog card (hooks live here) */
function BlogCardDefault({ post, IsAdmin }) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      onClick={() => navigate(`/post/${post.slug}`)}
      className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden">
        {/* Admin actions */}
        {IsAdmin && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            {/* Edit */}
            <button
              type="button"
              className="rounded-full border border-white/10 bg-amber-600/80 p-2 text-white backdrop-blur transition hover:bg-black/80 focus:outline-none focus:ring focus:ring-amber-300/50"
              aria-label="Edit"
              title="Edit"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/post/${post.slug}/edit`);
              }}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </button>

            {/* Delete (stubbed; wire up your hook later) */}
            <button
              type="button"
              className="rounded-full border border-white/10 bg-red-600/80 p-2 text-white backdrop-blur transition hover:bg-black/80 focus:outline-none focus:ring focus:ring-red-300/50 disabled:opacity-50"
              aria-label="Delete"
              title="Delete"
              onClick={(e) => e.stopPropagation()}
            >
              {false ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              <span className="sr-only">Delete</span>
            </button>
          </div>
        )}

        {/* Keep layout stable while image loads */}
        <div className="relative aspect-[16/9]">
          {!isLoaded && !isError && (
            <div className="absolute inset-0 grid place-items-center bg-white/5">
              <Loader2 className="h-6 w-6 animate-spin text-white/70" />
              <span className="sr-only">Loading image</span>
            </div>
          )}

          {isError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/5">
              <div className="text-white/60 text-xs">Preview unavailable</div>
            </div>
          )}

          <img
            src={post.image}
            alt={post.title}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsError(true)}
          />

          {/* Gradient + category pills */}
          {isLoaded && !isError && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {getCategories(post).slice(0, 2).map((cat) => (
                  <span
                    key={cat}
                    className="bg-amber-400/90 text-black px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow"
                  >
                    {cat}
                  </span>
                ))}
                {getCategories(post).length > 2 && (
                  <span className="bg-amber-400/70 text-black/90 px-3 py-1 rounded-full text-[10px] font-semibold shadow">
                    +{getCategories(post).length - 2}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">Published on</span>
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">Read time</span>
            {post.readTime}
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-amber-300 transition-colors">
          {post.title}
        </h3>

        <p className="text-white/70 mb-5 leading-relaxed">{post.excerpt}</p>
      </div>
    </motion.article>
  );
}

