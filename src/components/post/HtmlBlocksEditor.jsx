// components/editor/HtmlBlocksEditor.jsx
import { useEffect, useState } from "react";
import { Eye, Plus, Trash2, ArrowUp, ArrowDown, Copy } from "lucide-react";
import Textarea from "../ui/Textarea";
import { sanitizePastedHtml } from "../../utils/sanitizePastedHtml";

export default function HtmlBlocksEditor({ value, onChange }) {
  const [showPreview, setShowPreview] = useState(() => (value || []).map(() => false));
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setShowPreview((prev) => (value || []).map((_, i) => prev[i] ?? false));
    setActiveIndex((idx) => (idx == null ? idx : Math.min(idx, Math.max((value?.length || 1) - 1, 0))));
  }, [value]);

  const setMode = (i, preview) => {
    setActiveIndex(i);
    setShowPreview((prev) => prev.map((v, idx) => (idx === i ? preview : v)));
  };

  const templates = {
    p: `<p class="text-white/80 leading-relaxed mb-5">Write a paragraph…</p>`,
    h2: `<h2 class="text-2xl md:text-3xl font-bold mt-10 mb-4">Section title</h2>`,
    quote: `<figure class="border-l-4 border-amber-400 pl-5 my-8"><blockquote class="italic text-white/80">A thoughtful quote…</blockquote><figcaption class="mt-2 text-white/50">— Source</figcaption></figure>`,
    img: `<figure class="my-8"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&h=900&fit=crop" alt="Alt text" class="rounded-xl w-full object-cover" /><figcaption class="text-sm text-white/60 mt-2">Caption</figcaption></figure>`,
    list: `<ul class="list-disc list-inside space-y-2 text-white/80 mb-6"><li>Point one</li><li>Point two</li><li>Point three</li></ul>`,
  };

  const addBlock = (template = "p") => {
    const nextBlocks = [...(value || []), templates[template] || templates.p];
    onChange(nextBlocks);
    setShowPreview((prev) => [...prev, false]);
    setActiveIndex(nextBlocks.length - 1);
  };

  const update = (i, v) => {
    setActiveIndex(i);
    onChange(value.map((b, idx) => (idx === i ? v : b)));
  };

  const remove = (i) => {
    const next = value.filter((_, idx) => idx !== i);
    onChange(next);
    setShowPreview((prev) => prev.filter((_, idx) => idx !== i));
    setActiveIndex((prevIdx) => {
      if (prevIdx == null) return prevIdx;
      if (prevIdx === i) return Math.min(i, next.length - 1);
      if (prevIdx > i) return prevIdx - 1;
      return prevIdx;
    });
  };

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;

    const nextBlocks = [...value];
    [nextBlocks[i], nextBlocks[j]] = [nextBlocks[j], nextBlocks[i]];
    onChange(nextBlocks);

    setShowPreview((prev) => {
      const copy = [...prev];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

    setActiveIndex((prevIdx) => (prevIdx === i ? j : prevIdx === j ? i : prevIdx));
  };

  const duplicate = (i) => {
    const nextBlocks = [...value.slice(0, i + 1), value[i], ...value.slice(i + 1)];
    onChange(nextBlocks);
    setShowPreview((prev) => {
      const copy = [...prev.slice(0, i + 1), prev[i], ...prev.slice(i + 1)];
      return copy;
    });
    setActiveIndex(i + 1);
  };

  return (
    <div className="space-y-4">
      {(value || []).map((block, i) => (
        <div
          key={i}
          onClick={() => setActiveIndex(i)}
          className={`rounded-2xl border ${activeIndex === i ? "border-amber-400" : "border-white/10"} bg-white/5 overflow-hidden`}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <div className="text-xs text-white/60">Block {i + 1}</div>
            <div className="flex items-center gap-1.5">
              <div className="inline-flex rounded-lg overflow-hidden border border-white/10">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setMode(i, false); }}
                  className={`px-2 py-1 text-xs ${!showPreview[i] ? "bg-white/10" : "bg-transparent"}`}
                  title="Edit HTML"
                >
                  &lt;/&gt;
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setMode(i, true); }}
                  className={`px-2 py-1 text-xs ${showPreview[i] ? "bg-white/10" : "bg-transparent"}`}
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              <button type="button" onClick={(e) => { e.stopPropagation(); move(i, -1); }} className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10" title="Move up">
                <ArrowUp className="w-4 h-4" />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); move(i, 1); }} className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10" title="Move down">
                <ArrowDown className="w-4 h-4" />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); duplicate(i); }} className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10" title="Duplicate">
                <Copy className="w-4 h-4" />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); remove(i); }} className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-red-300" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {showPreview[i] ? (
            <div className="p-3">
              <div
                contentEditable
                suppressContentEditableWarning
                className="prose prose-invert max-w-none outline-none focus:ring-2 focus:ring-amber-400/40 rounded-lg px-3 py-2"
                dangerouslySetInnerHTML={{ __html: block }}
                onFocus={() => setActiveIndex(i)}
                onInput={(e) => update(i, e.currentTarget.innerHTML)}
                onClick={(e) => {
                  const a = e.target.closest?.("a");
                  if (a) e.preventDefault();
                }}
                onPaste={(e) => {
                  const html = e.clipboardData?.getData("text/html");
                  if (html) {
                    e.preventDefault();
                    const cleaned = sanitizePastedHtml(html);
                    document.execCommand("insertHTML", false, cleaned);
                  }
                }}
              />
            </div>
          ) : (
            <Textarea
              rows={8}
              value={block}
              onFocus={() => setActiveIndex(i)}
              onChange={(e) => update(i, e.target.value)}
              className="rounded-t-none border-0"
            />
          )}
        </div>
      ))}

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => addBlock("p")} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
          <Plus className="w-4 h-4" /> Paragraph
        </button>
        <button type="button" onClick={() => addBlock("h2")} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
          <Plus className="w-4 h-4" /> Heading
        </button>
        <button type="button" onClick={() => addBlock("list")} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
          <Plus className="w-4 h-4" /> List
        </button>
        <button type="button" onClick={() => addBlock("quote")} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
          <Plus className="w-4 h-4" /> Quote
        </button>
        <button type="button" onClick={() => addBlock("img")} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
          <Plus className="w-4 h-4" /> Image
        </button>
      </div>
    </div>
  );
}
