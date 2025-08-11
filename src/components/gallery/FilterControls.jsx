import { Search } from "lucide-react";

export default function FilterControls({ types, activeType, setActiveType, search, setSearch }) {
  return (
    <div className="container mx-auto px-6 pb-6 flex flex-col gap-4">
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
        <input
          type="search"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl bg-white/5 text-white placeholder-white/40 pl-11 pr-4 py-3
                     border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur transition-all ${
              activeType === t
                ? "bg-amber-400/20 border-amber-400/40 text-amber-300"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-amber-300/40 hover:bg-amber-300/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

