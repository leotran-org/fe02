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

/* ---------------------------------- Mock Data ---------------------------------- */
// NOTE: Keep this list in the same order as your blog index for prev/next to work nicely.
const MOCK_POSTS = [
  {
    id: 1,
    title: "The Art of Minimalistic Design in Modern Web Development",
    excerpt:
      "Exploring how less can be more when it comes to creating engaging user experiences that truly matter.",
    categories: ["Design", "UX", "Inspiration"],
    readTime: "5 min read",
    date: "Dec 15, 2024",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=900&fit=crop",
    author: {
      name: "Avery Stone",
      role: "Product Designer",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop",
    },
    // Simple rich content blocks so you can swap in MD later if you want
    content: [
      {
        type: "p",
        text:
          "Minimalism in UI isn’t about removing features; it’s about removing friction. The details that remain should earn their spot.",
      },
      {
        type: "h2",
        text: "Why minimalism still matters",
      },
      {
        type: "p",
        text:
          "As design systems mature, bloat sneaks in. A minimal approach helps teams prioritize clarity, performance, and accessibility.",
      },
      {
        type: "ul",
        items: [
          "Reduce cognitive load with clear hierarchy.",
          "Use motion sparingly to guide attention.",
          "Design with constraints to ship faster.",
        ],
      },
      {
        type: "blockquote",
        text:
          "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
        cite: "Antoine de Saint-Exupéry",
      },
      {
        type: "h2",
        text: "Practical tips",
      },
      {
        type: "p",
        text:
          "Start with typography and spacing. Pick one highlight color (here: amber) and let neutrals do the heavy lifting.",
      },
      {
        type: "img",
        src: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=1600&h=900&fit=crop",
        alt: "Clean desk setup with minimal layout sketches",
        caption: "Keep artifacts simple. Complexity lives in the system, not the surface.",
      },
    ],
  },
  {
    id: 2,
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "A deep dive into architectural patterns and best practices for maintainable React codebases.",
    categories: ["Development", "TypeScript", "Best Practices"],
    readTime: "8 min read",
    date: "Dec 10, 2024",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&h=900&fit=crop",
    author: {
      name: "Kai Nguyen",
      role: "Frontend Engineer",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&h=256&fit=crop",
    },
    content: [
      { type: "p", text: "Type inference is your friend—until it isn\'t. Add types where contracts matter." },
      { type: "h2", text: "Folder-by-feature > folder-by-type" },
      { type: "p", text: "Group UI, hooks, and tests by feature to reduce cross-module chaos." },
      { type: "ul", items: ["Treat components as state machines.", "Prefer composition over inheritance.", "Document public APIs."] },
    ],
  },
  // Add more if you like
];

/* ----------------------------- Helpers & Variants ----------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

const getCategories = (post) => {
  if (Array.isArray(post?.categories)) return post.categories;
  if (Array.isArray(post?.category)) return post.category;
  return post?.category ? [post.category] : [];
};

/* -------------------------------- UI Pieces -------------------------------- */
const PostHero = ({ post }) => (
  <section className="relative pt-28 pb-10">
    <div className="absolute inset-0 -z-10">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
    </div>

    <div className="container mx-auto px-6">
      <motion.div
        className="max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="flex flex-wrap gap-2 mb-5">
          {getCategories(post).map((c) => (
            <span
              key={c}
              className="bg-amber-400/90 text-black px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow"
            >
              {c}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-white/70">
          <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</div>
          <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</div>
        </div>
      </motion.div>
    </div>
  </section>
);

const AuthorCard = ({ author }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
    <img
      src={author.avatar}
      alt={author.name}
      className="w-12 h-12 rounded-full object-cover"
      loading="lazy"
    />
    <div>
      <div className="font-semibold">{author.name}</div>
      <div className="text-white/60 text-sm">{author.role}</div>
    </div>
  </div>
);

const ContentBlock = ({ block }) => {
  switch (block.type) {
    case "h2":
      return <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4">{block.text}</h2>;
    case "p":
      return <p className="text-white/80 leading-relaxed mb-5">{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc list-inside space-y-2 text-white/80 mb-6">
          {block.items?.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "blockquote":
      return (
        <figure className="border-l-4 border-amber-400 pl-5 my-8">
          <blockquote className="italic text-white/80">“{block.text}”</blockquote>
          {block.cite && (
            <figcaption className="mt-2 text-white/50">— {block.cite}</figcaption>
          )}
        </figure>
      );
    case "img":
      return (
        <figure className="my-8">
          <img src={block.src} alt={block.alt || ""} className="rounded-xl w-full object-cover" />
          {block.caption && (
            <figcaption className="text-sm text-white/60 mt-2">{block.caption}</figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
};

const ShareRow = ({ title }) => {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const targets = [
    { label: "Twitter", icon: Twitter, href: `https://twitter.com/intent/tweet?text=${text}&url=${encoded}` },
    { label: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
    { label: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${text}` },
  ];
  return (
    <div className="flex items-center gap-3">
      <Share2 className="w-4 h-4 text-white/60" />
      {targets.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-amber-300/10 hover:border-amber-300/40 text-sm"
        >
          <span className="inline-flex items-center gap-2"><Icon className="w-4 h-4" />{label}</span>
        </a>
      ))}
    </div>
  );
};

const RelatedPosts = ({ currentId }) => {
  // naive: pick 3 others
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
            <img src={p.image} alt={p.title} className="h-36 w-full object-cover group-hover:opacity-90" />
            <div className="p-4">
              <div className="text-xs text-white/60 mb-2">{p.date} · {p.readTime}</div>
              <div className="font-medium group-hover:text-amber-300">{p.title}</div>
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

  const index = useMemo(() => MOCK_POSTS.findIndex((p) => p.id === postId), [postId]);
  const post = index >= 0 ? MOCK_POSTS[index] : null;
  const prev = index > 0 ? MOCK_POSTS[index - 1] : null;
  const next = index >= 0 && index < MOCK_POSTS.length - 1 ? MOCK_POSTS[index + 1] : null;

  useEffect(() => {
    // optional smooth scroll on route change
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
          <p className="text-white/70">The article you\'re looking for doesn\'t exist or the link is broken.</p>
          <Link to="/blog" className="inline-block mt-6 px-5 py-2 rounded-xl bg-amber-500 text-black font-semibold">Go to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <PostHero post={post} />

      <main className="container mx-auto px-6 pb-20 grid lg:grid-cols-[1fr_320px] gap-10">
        <article>
          {/* Author + share */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <AuthorCard author={post.author} />
            <ShareRow title={post.title} />
          </div>

          {/* Body */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="prose prose-invert max-w-none prose-headings:scroll-mt-24"
          >
            {post.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
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
              <div className="font-medium line-clamp-2">{prev ? prev.title : "Back to Blog"}</div>
            </Link>
            <Link
              to={next ? `/post/${next.id}` : "/blog"}
              className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 text-right"
            >
              <div className="text-xs text-white/60 mb-1">Next</div>
              <div className="font-medium line-clamp-2">{next ? next.title : "Back to Blog"}</div>
            </Link>
          </div>

          <RelatedPosts currentId={post.id} />
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold mb-2">About this blog</h3>
            <p className="text-white/70 text-sm">
              Notes on design, development, and systems thinking. New posts every other week.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold mb-4">Latest posts</h3>
            <ul className="space-y-3">
              {MOCK_POSTS.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link to={`/post/${p.id}`} className="group inline-flex items-start gap-3">
                    <img src={p.image} alt="" className="w-14 h-14 object-cover rounded-md border border-white/10" />
                    <div>
                      <div className="text-sm group-hover:text-amber-300 line-clamp-2">{p.title}</div>
                      <div className="text-xs text-white/60">{p.date}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>

      {/* Local styles */}
      <style>{`
        .prose :where(img):not(:where([class~="not-prose"] *)) { margin: 0; }
      `}</style>
    </div>
  );
}

