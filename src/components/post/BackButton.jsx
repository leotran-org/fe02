import { ArrowLeft } from "lucide-react";

export default function BackButton({ onClick, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed z-20 top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-amber-300/10 hover:border-amber-300/40 backdrop-blur"
      {...props}
    >
      <ArrowLeft className="w-4 h-4" /> Back
    </button>
  );
}

