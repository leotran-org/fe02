export default function ToolbarButton({ onClick, children, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-amber-300/10 hover:border-amber-300/40"
    >
      {children}
    </button>
  );
}

