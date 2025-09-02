// components/ProjectSection.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { usePostsMeta } from "../../hooks/usePostsMeta";

// --- Minimal UI primitives (no external UI lib) ---
function Button({ children, onClick, variant = "solid", className = "", ...rest }) {
  const base =
    "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950";
  const styles =
    variant === "outline"
      ? "bg-transparent text-amber-400 border-amber-500/50 hover:bg-amber-500/10 focus:ring-amber-500"
      : "bg-amber-500 text-gray-950 border-amber-500 hover:bg-amber-400 focus:ring-amber-500";
  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (

    <div className={`bg-zinc-800 border border-gray-800 rounded-xl shadow-sm overflow-hidden transition ${className}`}>
      {children}
    </div>
  );
}

function CardMedia({ src, alt, className = "" }) {
  if (!src) return null;
  // Fixed, equal media height for ALL cards
  return <img src={src} alt={alt} className={`w-full h-56 object-cover ${className}`} />;
}

function CardBody({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

// --- Helpers ---
const clamp3 = (n, i) => (n === 0 ? [] : [((i - 1 + n) % n), i % n, ((i + 1) % n)]);

// --- Main Section ---
export default function ProjectSection() {
  const { posts, loading, error } = usePostsMeta();

  // We only care about the latest 12 from the hook output order
  const dataset = useMemo(() => posts.slice(0, 12), [posts]);
  const count = dataset.length;

  const [index, setIndex] = useState(0); // current (center) project index within dataset
  const [direction, setDirection] = useState("next"); // "next" | "prev"

  // Keep index in range when data arrives/changes
  useEffect(() => {
    if (count === 0) return;
    setIndex((i) => (i >= count ? 0 : i));
  }, [count]);

  const goPrev = useCallback(() => {
    if (count === 0) return;
    setDirection("prev");
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    if (count === 0) return;
    setDirection("next");
    setIndex((i) => (i + 1) % count);
  }, [count]);

  // Keyboard arrows navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  if (loading) return <p className="px-4 sm:px-6 lg:px-8 text-gray-300">Loading projects...</p>;
  if (error) return <p className="px-4 sm:px-6 lg:px-8 text-red-400">Error: {error}</p>;
  if (count === 0) return <p className="px-4 sm:px-6 lg:px-8 text-gray-300">No projects found.</p>;

  const visible = clamp3(count, index);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div>
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-4xl font-bold text-amber-400">Latest Projects</h2>
        </div>

        {/* 3-card viewport with slide animation */}
        <div className="relative overflow-hidden">
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch animate-${direction === "next" ? "slide-left" : "slide-right"}`}
          >
            {visible.map((vi, idx) => {
              const p = dataset[vi];
              const isCenter = idx === 1 || count < 3;
              const isSide = !isCenter && count >= 3;

              return (
                <button
                    onClick={isSide ? (idx === 0 ? goPrev : goNext) : undefined}
                >
                <Card
                  key={p.id}
                  className={[
                    "h-[30rem] flex flex-col will-change-opacity shadow-lg shadow-[10px_10px_20px_0_rgba(0,0,0,0.5)]",
                    // Dim previous/next cards
                    isSide ? "opacity-40 hover:opacity-80" : "",
                  ].join(" ")}
                  aria-current={isCenter ? "true" : undefined}
                    // if click the previous/next card, go to it, otherwise do nothing
                >
                  {/* Equal media height for all cards */}
                  <CardMedia src={p.image} alt={p.title} />

                  <CardBody className="flex flex-col grow">
                    <h3 className="text-lg font-semibold line-clamp-2">{p.title}</h3>
                    {p.excerpt && (
                      <p className="mt-1 text-sm text-zinc-300/80 line-clamp-3">{p.excerpt}</p>
                    )}
                    <div className="mt-3 text-xs text-gray-400 flex items-center gap-2">
                      <span>{p.date}</span>
                      <span>•</span>
                      <span>{p.readTime}</span>
                    </div>
                    {Array.isArray(p.categories) && p.categories.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.categories.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {p.slug && (
                      <a
                        href={`/${p.slug}`}
                        className="mt-auto mb-4 inline-block text-sm font-medium text-amber-400 underline-offset-4 hover:underline"
                      >
                        Read more
                      </a>
                    )}
                  </CardBody>
                </Card>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dots + arrows */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={goPrev} aria-label="Previous project">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-2 h-4">
                <path
                  fillRule="evenodd"
                  d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>

            {dataset.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition ${i === index ? "bg-amber-500" : "bg-gray-700 hover:bg-gray-600"}`}
              />
            ))}

            <Button variant="outline" onClick={goNext} aria-label="Next project">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-2 h-4">
                <path
                  fillRule="evenodd"
                  d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a 1 0 11-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Local styles for slide animation (no Tailwind config required) */}
        <style>{`
          @keyframes slide-left { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes slide-right { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
          .animate-slide-left { animation: slide-left 240ms ease-out; }
          .animate-slide-right { animation: slide-right 240ms ease-out; }
        `}</style>
      </div>
    </section>
  );
}

