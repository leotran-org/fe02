import { useEffect, useRef, useState, useCallback } from "react";
import parse from "html-react-parser";
import { Eye, Pencil, Trash2, Layers, Plus } from "lucide-react";
import ToolbarButton from "./ToolbarButton";
import formatHtml from "../../utils/formatHtml";

export default function BlockEditor({
  block,
  isActive,
  onFocus,
  onChange,      // (block_id, content)
  onDelete,
  onAddBelow,
}) {
  const [mode, setMode] = useState("preview");
  const [draft, setDraft] = useState(block?.content ?? "");
  const textareaRef = useRef(null);

  const id = block?.block_id ?? block?.id;

  // keep draft in sync when switching blocks, or when parent updates content externally
  useEffect(() => {
    if (mode === "edit") {
      setDraft(block?.content ?? "");
    }
  }, [block?.content, mode]);

  const commit = useCallback((next) => {
    if (!id) return;
    const nextContent = next ?? draft ?? "";
    if ((block?.content ?? "") !== nextContent) {
      onChange?.(id, nextContent);
    }
  }, [id, draft, block?.content, onChange]);

  const toggleMode = useCallback(() => {
    setMode((m) => {
      if (m === "edit") {
        const formatted = formatHtml(draft ?? "");
        setDraft(formatted);
        commit(formatted);
        return "preview";
      } else {
        // entering edit: normalize current content into draft
        const formatted = formatHtml(block?.content ?? "");
        setDraft(formatted);
        return "edit";
      }
    });
  }, [block?.content, draft, commit]);

  const handleBlur = useCallback(() => {
    const formatted = formatHtml(draft ?? "");
    setDraft(formatted);
    commit(formatted);
  }, [draft, commit]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleBlur();
      setMode("preview");
    }
  }, [handleBlur]);

  const handleChange = useCallback((e) => {
    const val = e.target.value;
    setDraft(val);
    if (!id) return;
    // live update upstream if you want live preview elsewhere
    onChange?.(id, val);
  }, [id, onChange]);

  return (
    <div
      role="group"
      tabIndex={0}
      onFocus={onFocus}
      className={`rounded-2xl border p-4 transition-colors ${
        isActive ? "border-amber-300 ring-2 ring-amber-300/40" : "border-white/10"
      } bg-white/5`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Layers className="w-4 h-4" />
          <span className="uppercase tracking-wide">{block?.type ?? "BLOCK"}</span>
        </div>

        <div className="flex items-center gap-2">
          <ToolbarButton onClick={onAddBelow} ariaLabel="Add block below">
            <Plus className="w-4 h-4" /> Add below
          </ToolbarButton>

          <ToolbarButton onClick={toggleMode} ariaLabel="Toggle edit">
            {mode === "edit" ? <Eye className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
            {mode === "edit" ? "Preview" : "Edit"}
          </ToolbarButton>

          <ToolbarButton onClick={onDelete} ariaLabel="Delete block">
            <Trash2 className="w-4 h-4" /> Delete
          </ToolbarButton>
        </div>
      </div>

      {mode === "edit" ? (
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="w-full min-h-[180px] rounded-xl bg-black/40 border border-white/10 p-3 font-mono text-sm text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
          placeholder="Type HTML here…"
        />
      ) : (
        <div className="prose prose-invert max-w-none">
          {block?.content ? parse(block.content) : null}
        </div>
      )}
    </div>
  );
}

