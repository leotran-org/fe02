import { Calendar, Clock, Tag } from "lucide-react";

export default function MetaChips({ Icon, type, date, duration, tags = [] }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
        <span className="inline-flex items-center gap-2 bg-black/30 border border-white/10 px-3 py-1.5 rounded-full">
          <Icon className="w-4 h-4 text-white" />
          {type}
        </span>
        <span className="inline-flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {date}
        </span>
        {duration && (
          <span className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {duration}
          </span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 text-xs text-white/80 bg-white/5 border border-white/10 rounded-full px-3 py-1"
            >
              <Tag className="w-3.5 h-3.5" />
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

