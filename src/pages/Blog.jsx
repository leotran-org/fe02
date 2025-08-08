import { useMemo, useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ---------------------------------- Data ---------------------------------- */

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Art of Minimalistic Design in Modern Web Development",
    excerpt:
      "Exploring how less can be more when it comes to creating engaging user experiences that truly matter.",
    category: "Design",
    readTime: "5 min read",
    date: "Dec 15, 2024",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "A deep dive into architectural patterns and best practices for maintainable React codebases.",
    category: "Development",
    readTime: "8 min read",
    date: "Dec 10, 2024",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=600&fit=crop",
  },
  {
    id: 3,
    title: "The Psychology of Color in Digital Interfaces",
    excerpt:
      "Understanding how color choices influence user behavior and emotional responses in digital products.",
    category: "UX",
    readTime: "6 min read",
    date: "Dec 5, 2024",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1000&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Advanced CSS Grid Techniques for Complex Layouts",
    excerpt:
      "Mastering CSS Grid to create sophisticated, responsive layouts that adapt to any screen size.",
    category: "CSS",
    readTime: "7 min read",
    date: "Nov 28, 2024",
    image:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1000&h=600&fit=crop",
  },
  {
    id: 5,
    title: "The Future of Web Development: Trends to Watch",
    excerpt:
      "Exploring emerging technologies and methodologies that will shape the next generation of web experiences.",
    category: "Trends",
    readTime: "6 min read",
    date: "Nov 20, 2024",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&h=600&fit=crop",
  },
  {
      id: 6,
      title: "Optimizing Performance in Modern React Apps",
      excerpt:
        "Practical strategies and techniques to enhance the speed and efficiency of your React applications.",
      category: "Performance",
      readTime: "9 min read",
      date: "Nov 15, 2024",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000&h=600&fit=crop",
    },
    {
      id: 7,
      title: "Exploring Progressive Web Apps",
      excerpt:
        "Learn how PWAs are bridging the gap between mobile and web applications with offline capabilities.",
      category: "Development",
      readTime: "7 min read",
      date: "Nov 10, 2024",
      image:
        "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=1000&h=600&fit=crop",
    },
    {
      id: 8,
      title: "Accessibility in Web Design",
      excerpt:
        "Discover the principles and practices for building inclusive digital experiences.",
      category: "Design",
      readTime: "8 min read",
      date: "Nov 5, 2024",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&h=600&fit=crop",
    },
    {
      id: 9,
      title: "Serverless Architecture Explained",
      excerpt:
        "Understanding the benefits and trade-offs of serverless computing in modern cloud environments.",
      category: "Development",
      readTime: "10 min read",
      date: "Oct 30, 2024",
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1000&h=600&fit=crop",
    },
    {
      id: 10,
      title: "Mastering the Art of Debugging",
      excerpt:
        "Tips and tricks to effectively identify and resolve bugs in your codebase.",
      category: "Development",
      readTime: "5 min read",
      date: "Oct 25, 2024",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=600&fit=crop",
    },
    {
      id: 11,
      title: "The Role of Micro-Interactions in UX",
      excerpt:
        "How small design elements can create huge impacts on the user experience.",
      category: "UX",
      readTime: "6 min read",
      date: "Oct 20, 2024",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&h=600&fit=crop",
    },
    {
      id: 12,
      title: "Static Site Generators: The Future of the Web?",
      excerpt:
        "Evaluating the benefits of static site generators for performance and scalability.",
      category: "Trends",
      readTime: "9 min read",
      date: "Oct 15, 2024",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&h=600&fit=crop",
    },
    {
      id: 13,
      title: "Animations in Web Development",
      excerpt:
        "Enhancing user engagement with smooth and meaningful animations.",
      category: "Design",
      readTime: "7 min read",
      date: "Oct 10, 2024",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&h=600&fit=crop",
    },
    {
      id: 14,
      title: "Demystifying API Architecture",
      excerpt:
        "A guide to understanding REST, GraphQL, and the future of API design.",
      category: "Development",
      readTime: "8 min read",
      date: "Oct 5, 2024",
      image:
        "https://images.unsplash.com/photo-1559028012-481c41f570e5?w=1000&h=600&fit=crop",
    },
    {
      id: 15,
      title: "Building a Design System",
      excerpt:
        "Streamlining your workflow with a consistent and reusable set of design patterns.",
      category: "Design",
      readTime: "6 min read",
      date: "Oct 1, 2024",
      image:
        "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=1000&h=600&fit=crop",
    },
    {
      id: 16,
      title: "Understanding Cloud Native Applications",
      excerpt:
        "Dive into the principles and tools for building scalable and robust cloud-native apps.",
      category: "Trends",
      readTime: "10 min read",
      date: "Sep 25, 2024",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&h=600&fit=crop",
    }
];

const CATEGORIES = ["All", "Design", "Development", "UX", "CSS", "Trends", "Performance"];

/* ----------------------------- Motion Variants ---------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/* ------------------------------- UI Pieces -------------------------------- */

const BlogHero = () => (
  <section className="relative pt-28 pb-14">
    <div className="absolute inset-0 -z-10">
      {/* soft spotlight + subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60%_40%_at_50%_10%,rgba(245,158,11,0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.3)_1px,transparent_1px)]; [background-size:24px_24px]" />
    </div>

    <div className="container mx-auto px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-white">Stories &nbsp;</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Insights</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 leading-relaxed" data-i18n="blog_hero_subtitle">
          Thoughts on design, development, and the creative process behind meaningful digital experiences.
        </p>
      </motion.div>
    </div>
  </section>
);

const CategoryPill = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={() => onClick?.(label)}
    aria-pressed={active}
    className={[
      "px-4 py-2 rounded-full text-sm font-medium transition-all",
      "border backdrop-blur [--ring:theme(colors.amber.400)]",
      active
        ? "bg-amber-400/20 border-amber-400/40 text-amber-300 shadow-sm"
        : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-amber-300/40 hover:bg-amber-300/10",
    ].join(" ")}
  >
    {label}
  </button>
);

const FilterBar = ({ categories, activeCategory, onChange }) => (
  <section className="pb-10">
    <div className="container mx-auto px-6">
      <motion.div
        className="flex flex-wrap justify-center gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={stagger}
      >
        {categories.map((cat) => (
          <motion.div key={cat} variants={fadeUp}>
            <CategoryPill label={cat} active={activeCategory === cat} onClick={onChange} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const BlogCard = ({ post }) => (
  <motion.article
    variants={fadeUp}
    className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-shadow duration-300"
  >
    <div className="relative overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute top-4 left-4 bg-amber-400/90 text-black px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow">
        {post.category}
      </span>
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

      <Link
        to={`/blog/${post.id}`}
        className="inline-flex items-center font-medium text-amber-300 hover:text-white transition-colors group/link"
        aria-label={`Read more: ${post.title}`}
      >
        Read More
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
      </Link>
    </div>
  </motion.article>
);

const BlogGrid = ({ posts }) => (
  <section className="pb-10">
    <div className="container mx-auto px-6">
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </motion.div>

      {posts.length === 0 && (
        <div className="text-center text-white/60 mt-12">No posts found for this category.</div>
      )}
    </div>
  </section>
);

/* ------------------------------ Pagination UI ----------------------------- */

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  // build a small window of pages around the current page
  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  let end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="container mx-auto px-6 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        <div className="text-white/60 text-sm">
          Page <span className="text-white">{page}</span> of <span className="text-white">{totalPages}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-amber-300/10 hover:border-amber-300/40 disabled:opacity-40"
            onClick={() => onChange(1)}
            disabled={page === 1}
            aria-label="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-amber-300/10 hover:border-amber-300/40 disabled:opacity-40"
            onClick={() => onChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={[
                "px-4 py-2 rounded-full text-sm font-medium border backdrop-blur transition-all",
                p === page
                  ? "bg-amber-400/20 border-amber-400/40 text-amber-300 shadow-sm"
                  : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-amber-300/40 hover:bg-amber-300/10",
              ].join(" ")}
            >
              {p}
            </button>
          ))}

          <button
            className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-amber-300/10 hover:border-amber-300/40 disabled:opacity-40"
            onClick={() => onChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-amber-300/10 hover:border-amber-300/40 disabled:opacity-40"
            onClick={() => onChange(totalPages)}
            disabled={page === totalPages}
            aria-label="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* --------------------------------- Page ----------------------------------- */

const PAGE_SIZE = 9; // show 20 posts per page

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Reset to first page when category changes
  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  // Compute paging
  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE)), [
    filteredPosts.length,
  ]);

  const pagedPosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, page]);

  // Clamp if data shrinks
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div className="min-h-screen text-white">
      <BlogHero />
      <FilterBar categories={CATEGORIES} activeCategory={activeCategory} onChange={setActiveCategory} />
      <BlogGrid posts={pagedPosts} />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {/* Local styles for underline & focus rings */}
      <style>{`
        .animated-underline{position:relative}
        .animated-underline::after{content:'';position:absolute;left:0;bottom:-2px;height:2px;width:0;background:linear-gradient(90deg,#fbbf24,#fde68a,#f59e0b);transition:width .4s cubic-bezier(.2,.8,.2,1)}
        .group:hover .animated-underline::after{width:100%}
        .glass-card:focus-within, .glass-card:focus{outline:2px solid rgba(245,158,11,.5);outline-offset:2px}
      `}</style>
    </div>
  );
};

export default Blog;

