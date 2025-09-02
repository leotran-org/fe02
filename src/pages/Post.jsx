import { useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import parse from "html-react-parser";

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
import { usePost } from "../hooks/usePost";


const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

const isClient = typeof window !== "undefined";

const getCategories = (tags) =>
  Array.isArray(tags) ? [...new Set(tags.map((t) => String(t).trim()))] : [];

const PostHero = ({ title, image, date, readTime }) => (
  <section className="relative pt-28 pb-10">
    <div className="absolute inset-0 -z-10">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover opacity-20"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
    </div>

    <div className="container mx-auto px-6">
      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
        <div className="flex items-center gap-4 text-sm text-white/70">
          {date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" aria-hidden />
              <time dateTime={new Date(date).toISOString()}>
                {new Date(date).toLocaleDateString()}
              </time>
            </div>
          )}
          {readTime != null && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden />
              {`${readTime} min read`}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  </section>
);

const ShareRow = ({ title }) => {
  const url = isClient ? window.location.href : "";
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title || "");
  const targets = [
    { label: "Twitter / X", icon: Twitter, href: `https://twitter.com/intent/tweet?text=${text}&url=${encoded}` },
    { label: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
    { label: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${text}` },
  ];
  return (
    <div className="flex items-center gap-3">
      <Share2 className="w-4 h-4 text-white/60" aria-hidden />
      {targets.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-amber-300/10 hover:border-amber-300/40 text-sm"
          aria-label={`Share on ${label}`}
        >
          <span className="inline-flex items-center gap-2">
            <Icon className="w-4 h-4" aria-hidden />
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default function Post() {
  const { slug } = useParams(); // route like: /post/:slug
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const { data, isLoading, isError, error } = usePost(slug);

  useEffect(() => {
    if (!isClient) return;
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  }, [slug, shouldReduceMotion]);

  if (isLoading) {
    return (
      <div className="min-h-screen text-white container mx-auto px-6 py-24">
        <div className="animate-pulse space-y-4 max-w-2xl">
          <div className="h-6 w-40 bg-white/10 rounded" />
          <div className="h-8 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-full bg-white/10 rounded" />
          <div className="h-4 w-5/6 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen text-white container mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <button
            onClick={() => {
              if (isClient && window.history.length > 1) navigate(-1);
              else navigate("/blog");
            }}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden /> Back
          </button>
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <p className="text-white/70">
            {error?.message || "The article you're looking for doesn't exist or the link is broken."}
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

  const categories = getCategories(data.tags);
  const blocks = Array.isArray(data.blocks) ? data.blocks : [];
  const heroImg = data.thumbnail_path || "";
  const updated = data.last_updated || null;

  return (
    <div className="relative min-h-screen text-white">
      {/* Back Button (Top Left, sticky) */}
      <button
        onClick={() => {
          if (isClient && window.history.length > 1) navigate(-1);
          else navigate("/blog");
        }}
        className="fixed z-20 top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-amber-300/10 hover:border-amber-300/40 backdrop-blur"
        aria-label="Go back"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden /> Back
      </button>

      {/* Hero */}
      <PostHero
        title={data.title}
        image={heroImg}
        date={updated}
        readTime={data.read_time}
      />

      {/* Centered main column */}
      <main className="container mx-auto px-6 pt-6 pb-20">
        <article className="max-w-3xl mx-auto">

    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      animate={shouldReduceMotion ? false : "visible"}
      variants={fadeUp}
      className="text-base leading-relaxed break-words hyphens-auto"
    >
      {blocks.map((b) => (
        <div
          key={b.block_id}
          className="mb-1 text-lg text-white/80 [&>img]:max-w-full [&>img]:h-auto [&>pre]:overflow-x-auto [&>pre]:whitespace-pre [&>table]:block [&>table]:overflow-x-auto [&>table]:w-full"
        >
          {b?.content ? parse(b.content) : null}
        </div>
      ))}
    </motion.div>

          {/* Footer tags row */}
          {!!categories.length && (
            <div className="mt-10 flex flex-wrap items-center gap-2 text-sm">
              <Tag className="w-4 h-4 text-amber-300" aria-hidden />
              {categories.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="mt-5 mb-40">
            <ShareRow title={data.title} />
          </div>

          {/* (Optional) Prev/Next – you can add once backend provides neighbors */}
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            <div className="block rounded-2xl border border-white/10 bg-white/5 p-4 opacity-60" aria-disabled>
              <div className="text-xs text-white/60 mb-1">Previous</div>
              <div className="font-medium line-clamp-2">—</div>
            </div>
            <div className="block rounded-2xl border border-white/10 bg-white/5 p-4 opacity-60 text-right" aria-disabled>
              <div className="text-xs text-white/60 mb-1">Next</div>
              <div className="font-medium line-clamp-2">—</div>
            </div>
          </div>
        </article>
      </main>

      {/* Local styles */}
      <style>{`
        .prose :where(img):not(:where([class~="not-prose"] *)) { margin: 0; }
      `}</style>
    </div>
  );
}

