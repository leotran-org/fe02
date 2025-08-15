import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, Loader2, Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import iconForType from "../../utils/iconForType";
import { fadeUp } from "../../animations/variants";

// Wrapper: no hooks here, so no conditional hook calls.
export default function MediaCard({ item, IsAdmin = false, variant = "default" }) {
  return variant === "add" ? (
    <MediaCardAdd />
  ) : (
    <MediaCardDefault item={item} IsAdmin={IsAdmin} />
  );
}

/** Admin "Add" card (no conditional hooks) */
function MediaCardAdd() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeUp}
      className="break-inside-avoid my-8 group cursor-pointer"
      onClick={() => navigate("/media/new")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate("/media/new")}
      aria-label="Create new media"
      title="Create new media"
    >
      <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-white/5 shadow transition hover:shadow-2xl focus-within:ring focus-within:ring-amber-300/50">
        <div className="relative aspect-[16/9] grid place-items-center">
          <div className="flex flex-col items-center justify-center gap-2 text-white/80">
            <Plus className="h-16 w-16 group-hover:text-amber-300" />
            <span className="text-XL font-medium group-hover:text-amber-300">
              New media
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Regular media card (hooks used inside this component only) */
function MediaCardDefault({ item, IsAdmin }) {
  const navigate = useNavigate();
  const Icon = iconForType(item.type);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="break-inside-avoid my-8 cursor-pointer group"
      onClick={() => navigate(`/media/${item.slug}`)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow transition hover:shadow-2xl">
        {/* Edit button (admins only) */}
        {IsAdmin && (
          <button
            type="button"
            className="absolute top-3 right-3 z-10 rounded-full border border-white/10 bg-amber-600/80 p-2 text-white backdrop-blur transition hover:bg-black/80 focus:outline-none focus:ring focus:ring-amber-300/50"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/media/${item.slug}/edit`);
            }}
            aria-label="Edit"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </button>
        )}

        {/* Keep layout stable while the image loads */}
        <div className="relative aspect-[16/9]">
          {!isLoaded && !isError && (
            <div className="absolute inset-0 grid place-items-center bg-white/5">
              <Loader2 className="h-6 w-6 animate-spin text-white/70" />
              <span className="sr-only">Loading image</span>
            </div>
          )}

          {isError && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/5">
              <div className="text-white/60 text-xs">Preview unavailable</div>
            </div>
          )}

          <img
            src={item.thumb}
            alt={item.title}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsError(true)}
          />

          <div className="absolute bottom-3 right-3 rounded-full bg-black/50 p-2">
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-amber-300">
        {item.title}
      </h3>

      <div className="flex items-center gap-3 text-xs text-white/60">
        <Calendar className="h-3.5 w-3.5" /> {item.date}
        {item.duration && (
          <>
            <Clock className="h-3.5 w-3.5" /> {item.duration}
          </>
        )}
      </div>

      <div className="mt-1 flex flex-wrap gap-1">
        {item.tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/70"
          >
            <Tag className="h-3 w-3" /> {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

