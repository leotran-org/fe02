// components/blog/Pagination.jsx
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

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

