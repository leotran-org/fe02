// components/blog/FilterBar.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryPill } from "./CategoryPill";
import { fadeUp, stagger } from "../../animations/variants";

export const FilterBar = ({
  categories = [],
  activeCategory,
  onChange = () => {},
  maxVisible = 8,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!categories.length) return null;

  const visibleCats = expanded ? categories : categories.slice(0, maxVisible);
  const hiddenCount = Math.max(0, categories.length - maxVisible);
  const hasMore = hiddenCount > 0;

  return (
    <section className="pb-10">
      <div className="container mx-auto px-6">
        <motion.div
          key={expanded ? "expanded" : "collapsed"}
          className="flex flex-wrap justify-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
        >
          <AnimatePresence initial={false}>
            {visibleCats.map((cat) => (
              <motion.div key={cat} variants={fadeUp} exit="exit">
                <CategoryPill
                  label={cat}
                  active={activeCategory === cat}
                  onClick={() => onChange(cat)}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {hasMore && (
            <motion.div variants={fadeUp}>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-controls="filterbar-categories"
                className="rounded-full border px-4 py-2 text-sm transition-all hover:shadow bg-amber-500 text-white"
              >
                {expanded ? "Show less" : `+${hiddenCount} more`}
              </button>
            </motion.div>
          )}
        </motion.div>
        <div id="filterbar-categories" className="sr-only" aria-hidden />
      </div>
    </section>
  );
};
