import { useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

import MOCK_POSTS from "../constants/mockPosts";
import PostHero from "../components/post/PostHero";

/* ----------------------------- Helpers & Variants ----------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const getCategories = (post) => {
  if (Array.isArray(post?.categories)) return post.categories;
  if (Array.isArray(post?.category)) return post.category;
  return post?.category ? [post.category] : [];
};


const HtmlContent = ({ htmlArray }) => (
  <>
    {htmlArray.map((html, i) => (
      <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
    ))}
  </>
);

const RelatedPosts = ({ currentId }) => {
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

/* --------------------------------- Page ---------------------------------- */
export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = Number(id);

  const index = useMemo(
    () => MOCK_POSTS.findIndex((p) => p.id === postId),
    [postId]
  );
  const post = index >= 0 ? MOCK_POSTS[index] : null;
  const prev = index > 0 ? MOCK_POSTS[index - 1] : null;
  const next =
    index >= 0 && index < MOCK_POSTS.length - 1 ? MOCK_POSTS[index + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [postId]);

  if (!post) {
    return (
      <div className="min-h-screen text-white container mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <p className="text-white/70">
            The article you're looking for doesn't exist or the link is broken.
          </p>
          <Link
            to="/blog"
            className="inline-block mt-6 px-5 py-2 rounded-xl bg-amber-500 text-black font-semibold"
          >
            Go to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      {/* Back Button (Top Left, sticky) */}
      <button
        onClick={() => navigate(-1)}
        className="fixed z-20 top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-amber-300/10 hover:border-amber-300/40 backdrop-blur"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <PostHero post={post} />

      {/* Centered main column */}
      <main className="container mx-auto px-6 pt-20 pb-20">
        <article className="max-w-3xl mx-auto">
          {/* Body */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="prose prose-invert max-w-none prose-headings:scroll-mt-24"
          >
            <HtmlContent htmlArray={post.htmlContent || []} />
          </motion.div>

          {/* Tags */}
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

          {/* Prev / Next */}
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            <Link
              to={prev ? `/post/${prev.id}` : "/blog"}
              className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
            >
              <div className="text-xs text-white/60 mb-1">Previous</div>
              <div className="font-medium line-clamp-2">
                {prev ? prev.title : "Back to Blog"}
              </div>
            </Link>
            <Link
              to={next ? `/post/${next.id}` : "/blog"}
              className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 text-right"
            >
              <div className="text-xs text-white/60 mb-1">Next</div>
              <div className="font-medium line-clamp-2">
                {next ? next.title : "Back to Blog"}
              </div>
            </Link>
          </div>

          <RelatedPosts currentId={post.id} />
        </article>
      </main>

      {/* Local styles */}
      <style>{`
        .prose :where(img):not(:where([class~="not-prose"] *)) { margin: 0; }
      `}</style>
    </div>
  );
}

