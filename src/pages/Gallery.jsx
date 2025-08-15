// pages/gallery.jsx
import { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { useMediaAll } from "../hooks/useMediaList";
import { useValidateSession } from "../hooks/useValidateSession";
import Cookies from "js-cookie";

import GalleryHero from "../components/gallery/GalleryHero";
import FilterControls from "../components/gallery/FilterControls";
import MasonryGrid from "../components/gallery/MasonryGrid";

export default function Gallery() {
  const [params, setParams] = useSearchParams();

  // initialize from URL (kept in sync below)
  const [activeType, setActiveType] = useState(params.get("type") || "All");
  const [query, setQuery] = useState(params.get("q") || "");
  const debounced = useDebouncedValue(query, 250);

  // fetch media from backend
  const { data, isLoading, error, refetch } = useMediaAll();
  const items = data ?? [];

  // ---- NEW: validate session on mount to decide IsAdmin
  const { validate } = useValidateSession({ credentials: "same-origin" });
  const [sessionData, setSessionData] = useState(null);
  const checkedCookieRef = useRef(false);

  useEffect(() => {
    if (checkedCookieRef.current) return; // avoid double-run in Strict Mode
    checkedCookieRef.current = true;

    const cookieSessionId = Cookies.get("session_id");
    if (!cookieSessionId) return;

    (async () => {
      const res = await validate(cookieSessionId);
      if (res?.ok && res?.data?.session_data) {
        setSessionData(res.data.session_data);
      } else {
        Cookies.remove("session_id", { path: "/" });
        setSessionData(null);
      }
    })();
  }, [validate]);

  // build the available types from fetched data (always include "All")
  const types = useMemo(() => {
    const set = new Set(["All"]);
    for (const m of items) if (m?.type) set.add(m.type);
    return Array.from(set);
  }, [items]);

  // if URL-specified/previously-selected type no longer exists, fall back to "All"
  useEffect(() => {
    if (!types.includes(activeType)) setActiveType("All");
  }, [types, activeType]);

  // keep URL in sync with filters/search
  useEffect(() => {
    const next = new URLSearchParams();
    next.set("type", activeType);
    if (debounced) next.set("q", debounced);
    setParams(next, { replace: true });
  }, [activeType, debounced, setParams]);

  // filter items by type and query
  const filtered = useMemo(() => {
    let list = items;
    if (activeType !== "All") list = list.filter((i) => i.type === activeType);
    if (debounced) {
      const q = debounced.toLowerCase();
      list = list.filter(
        (i) =>
          (i.title && i.title.toLowerCase().includes(q)) ||
          (Array.isArray(i.tags) && i.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }
    return list;
  }, [items, activeType, debounced]);

  // Consider any successfully validated session as "admin" per requirement
  const isAdmin = !!sessionData;

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

      {isLoading && (
        <div className="px-4 py-2 opacity-70">Loading…</div>
      )}

      {error && (
        <div className="px-4 py-3 text-red-300">
          <p className="mb-2">Failed to load media.</p>
          <button className="underline" onClick={refetch}>
            Try again
          </button>
        </div>
      )}

      {/* NEW: pass IsAdmin based on successful session validation */}
      <MasonryGrid items={filtered} IsAdmin={isAdmin} />

      {!isLoading && !error && filtered.length === 0 && (
        <div className="px-4 py-8 text-center opacity-70">
          No results
          {debounced ? ` for “${debounced}”` : ""}
          {activeType !== "All" ? ` in ${activeType}` : ""}.
        </div>
      )}
    </div>
  );
}

