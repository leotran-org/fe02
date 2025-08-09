// components/ui/Chip.jsx
import { Trash2 } from "lucide-react";

export default function Chip({ children, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="opacity-70 hover:opacity-100"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
}
