import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MEDIA_ITEMS from "../constants/media";
import MEDIA_TYPES from "../constants/mediaTypes";
import useDebouncedValue from "../hooks/useDebouncedValue";

import GalleryHero from "../components/gallery/GalleryHero";
import FilterControls from "../components/gallery/FilterControls";
import MasonryGrid from "../components/gallery/MasonryGrid";

export default function Gallery() {
  const [params, setParams] = useSearchParams();
  const [activeType, setActiveType] = useState(params.get("type") || "All");
  const [query, setQuery] = useState(params.get("q") || "");
  const debounced = useDebouncedValue(query, 250);

  // keep URL in sync with filters/search
  useEffect(() => {
    const next = new URLSearchParams();
    next.set("type", activeType);
    if (debounced) next.set("q", debounced);
    setParams(next, { replace: true });
  }, [activeType, debounced, setParams]);

  // only include types that exist in data
  const types = useMemo(() => {
    const set = new Set(["All"]);
    MEDIA_ITEMS.forEach((m) => set.add(m.type));
    return MEDIA_TYPES.filter((t) => set.has(t));
  }, []);

  // filter items by type and query
  const filtered = useMemo(() => {
    let list = MEDIA_ITEMS;
    if (activeType !== "All") list = list.filter((i) => i.type === activeType);
    if (debounced) {
      const q = debounced.toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeType, debounced]);

  return (
    <div className="min-h-screen text-white">
      <GalleryHero />
      <FilterControls
        types={types}
        activeType={activeType}
        setActiveType={setActiveType}
        search={query}
        setSearch={setQuery}
      />
      <MasonryGrid items={filtered} />
    </div>
  );
}

