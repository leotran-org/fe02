// components/blog/CategoryPill.jsx
export const CategoryPill = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={() => onClick?.(label)}
    aria-pressed={active}
    className={[
      "px-4 py-2 rounded-full text-sm font-medium transition-all",
      "border backdrop-blur [--ring:theme(colors.amber.400)]",
      active
        ? "bg-amber-400/20 border-amber-400/40 text-amber-300 shadow-sm"
        : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-amber-300/40 hover:bg-amber-300/10",
    ].join(" ")}
  >
    {label}
  </button>
);
