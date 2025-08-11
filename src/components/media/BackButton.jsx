import { ArrowLeft } from "lucide-react";

export default function BackButton({ onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 ${className}`}
      aria-label="Quay lại"
    >
      <ArrowLeft className="w-4 h-4" />
      Quay lại
    </button>
  );
}

