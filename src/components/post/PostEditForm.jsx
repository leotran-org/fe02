// components/post/PostEditForm.jsx
import { motion } from "framer-motion";
import { Check, Save, Eye } from "lucide-react";
import Field from "../ui/Field";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Chip from "../ui/Chip";
import HtmlBlocksEditor from "./HtmlBlocksEditor";
import { fadeUp } from "../../animations/variants";

export default function PostEditForm({
  post,
  errors,
  saving,
  showPreviewPane,
  onFieldChange,
  onPersist,
  onTogglePreview,
}) {
  const catString = (post.categories || []).join(", ");

  const handleCategoriesChange = (value) => {
    const categories = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onFieldChange("categories", categories);
  };

  const removeCategoryAt = (index) => {
    const newCategories = post.categories.filter((_, idx) => idx !== index);
    onFieldChange("categories", newCategories);
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        onPersist("published");
      }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Field label="Title" required>
            <Input
              value={post.title}
              onChange={(e) => onFieldChange("title", e.target.value)}
              placeholder="Write an impactful title…"
              aria-invalid={!!errors.title}
            />
            {errors.title && <div className="mt-1 text-xs text-red-300">{errors.title}</div>}
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Excerpt" required hint="A short summary shown in lists & social cards">
            <Textarea
              rows={3}
              value={post.excerpt}
              onChange={(e) => onFieldChange("excerpt", e.target.value)}
              placeholder="One or two sentences that tease the content…"
            />
            {errors.excerpt && <div className="mt-1 text-xs text-red-300">{errors.excerpt}</div>}
          </Field>
        </div>

        <div>
          <Field label="Date" required>
            <Input
              value={post.date}
              onChange={(e) => onFieldChange("date", e.target.value)}
              placeholder="e.g., Dec 15, 2024"
              aria-invalid={!!errors.date}
            />
            {errors.date && <div className="mt-1 text-xs text-red-300">{errors.date}</div>}
          </Field>
        </div>

        <div>
          <Field label="Read time">
            <Input
              value={post.readTime}
              onChange={(e) => onFieldChange("readTime", e.target.value)}
              placeholder="e.g., 5 min read"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Cover image URL">
            <Input
              value={post.image}
              onChange={(e) => onFieldChange("image", e.target.value)}
              placeholder="https://…"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Categories" hint="Comma-separated; press Enter to add">
            <Input
              value={catString}
              onChange={(e) => handleCategoriesChange(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
              placeholder="Design, UX, Accessibility"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {(post.categories || []).map((c, i) => (
                <Chip
                  key={`${c}-${i}`}
                  onRemove={() => removeCategoryAt(i)}
                >
                  {c}
                </Chip>
              ))}
            </div>
          </Field>
        </div>

        <div>
          <Field label="Author name" required>
            <Input
              value={post.author?.name || ""}
              onChange={(e) => onFieldChange("author.name", e.target.value)}
              placeholder="Jane Doe"
            />
            {errors.authorName && <div className="mt-1 text-xs text-red-300">{errors.authorName}</div>}
          </Field>
        </div>

        <div>
          <Field label="Author role">
            <Input
              value={post.author?.role || ""}
              onChange={(e) => onFieldChange("author.role", e.target.value)}
              placeholder="Staff Designer"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Author avatar URL">
            <Input
              value={post.author?.avatar || ""}
              onChange={(e) => onFieldChange("author.avatar", e.target.value)}
              placeholder="https://…"
            />
          </Field>
        </div>
      </div>

      <hr className="border-white/20 mt-20 mb-1" />
      <hr className="border-white/20 mb-1" />
      <hr className="border-white/20 mb-20" />

      <div className="mt-6">
        <div className="mb-2 text-sm text-white/70">Body (HTML blocks)</div>
        <HtmlBlocksEditor
          value={post.htmlContent || []}
          onChange={(arr) => onFieldChange("htmlContent", arr)}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={saving}
          onClick={() => onPersist("draft")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> Save Draft
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold disabled:opacity-50"
        >
          <Check className="w-4 h-4" /> Publish
        </button>
        <button
          type="button"
          onClick={onTogglePreview}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <Eye className="w-4 h-4" /> {showPreviewPane ? "Hide" : "Show"} Live Preview
        </button>
      </div>
    </motion.form>
  );
}
