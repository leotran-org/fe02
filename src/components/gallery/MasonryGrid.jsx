import { AnimatePresence } from "framer-motion";
import MediaCard from "./MediaCard";

/**
 * Responsive CSS columns for a Pinterest-like masonry.
 * Avoids inline styles and uses Tailwind's `columns-*` utilities.
 */
export default function MasonryGrid({ items }) {
  return (
    <div className="container mx-auto px-6 pb-16">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        <AnimatePresence>
          {items.map((it) => (
            <MediaCard key={it.id} item={it} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

