import parse from "html-react-parser";
import { X } from "lucide-react";
import TEMPLATES from "../../constants/blockTemplates";

/**
 * What changed (to prevent the picker from overflowing the page):
 * 1) Constrain the dialog height with h-[min(85vh,48rem)] and make it a flex column.
 * 2) Make the scrollable area only the grid (overflow-y-auto) so the header stays fixed.
 * 3) Cap preview content and ensure each card doesn't expand unpredictably.
 * 4) Improve small-screen behavior (1 col -> 2 -> 3) and spacing.
 */
export default function TemplatePicker({ onPick, onClose }) {
  return (
    <div className="fixed inset-0 z-50 p-6 bg-black/60 backdrop-blur flex items-center justify-center">
      {/* Panel */}
      <div className="w-full max-w-5xl bg-zinc-900/90 border border-white/10 rounded-2xl shadow-xl flex flex-col h-[min(85vh,48rem)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-white/10">
          <h3 className="text-lg font-semibold">Insert a block</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="px-6 py-4 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 content-start">
            {TEMPLATES.map((t) => (
              <button
                key={t.key}
                onClick={() => onPick(t)}
                className="group text-left rounded-xl border border-white/10 bg-white/5 p-4 hover:border-amber-300/40 hover:bg-amber-300/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <t.icon className="w-4 h-4 text-white/70" />
                  <div className="font-medium truncate" title={t.label}>{t.label}</div>
                </div>

                {/* Template preview – clamped and clipped to avoid overflow */}
                <div className="prose prose-sm prose-invert max-w-none opacity-80 group-hover:opacity-100 line-clamp-4 max-h-24 overflow-hidden">
                  {parse(t.html)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

