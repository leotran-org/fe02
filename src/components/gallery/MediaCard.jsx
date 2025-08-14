import { motion } from "framer-motion";
import { Calendar, Clock, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import iconForType from "../../utils/iconForType";
import { fadeUp } from "../../animations/variants";

export default function MediaCard({ item }) {
  const navigate = useNavigate();
  const Icon = iconForType(item.type);

  return (
    <motion.div
      variants={fadeUp}
      className="break-inside-avoid my-8 cursor-pointer group"
      onClick={() => navigate(`/media/${item.slug}`)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow hover:shadow-2xl transition">
        <img
          src={item.thumb}
          alt={item.title}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-3 right-3 bg-black/50 p-2 rounded-full">
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>

      <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-amber-300">
        {item.title}
      </h3>

      <div className="flex items-center gap-3 text-xs text-white/60">
        <Calendar className="w-3.5 h-3.5" /> {item.date}
        {item.duration && (
          <>
            <Clock className="w-3.5 h-3.5" /> {item.duration}
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1 mt-1">
        {item.tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 text-[11px] text-white/70 bg-white/5 border border-white/10 rounded-full px-2 py-0.5"
          >
            <Tag className="w-3 h-3" /> {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

