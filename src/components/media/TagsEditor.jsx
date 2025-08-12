import { useCallback, useState } from "react";
import { X, Tag as TagIcon } from "lucide-react";

export default function TagsEditor({ value, onChange }) {
  const [input, setInput] = useState("");
  const addTag = useCallback(() => {
    const t = input.trim();
    if (!t) return;
    if (!value.includes(t)) onChange([...value, t]);
    setInput("");
  }, [input, value, onChange]);
  const removeTag = (t) => onChange(value.filter((x) => x !== t));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 text-xs text-white/80 bg-white/5 border border-white/10 rounded-full pl-2 pr-1 py-1">
            <TagIcon className="w-3.5 h-3.5" />
            {t}
            <button type="button" onClick={() => removeTag(t)} className="ml-1 rounded-md p-1 hover:bg-white/10" aria-label={`Xoá tag ${t}`}>
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Nhập tag rồi Enter…"
          className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
        />
        <button type="button" onClick={addTag} className="rounded-xl px-3 py-2 border border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60">
          Thêm
        </button>
      </div>
    </div>
  );
}

