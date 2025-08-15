// pages/UpLoadMedia.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UploadCloud, ImagePlus, FileImage, Hash, CheckCircle2, XCircle, Loader2, RefreshCcw, Home } from "lucide-react";

import { useUploadMedia } from "../hooks/useUploadMedia";
import MEDIA_TYPES from "../constants/mediaTypes"; // default export (array)
import TagsEditor from "../components/media/TagsEditor";
import BackButton from "../components/media/BackButton";
import { fadeUp } from "../animations/variants";

function slugify(input) {
  return (input || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 120);
}

// --- Filename helpers: UUID + extension ---
function extFromName(name = "") {
  const dot = name.lastIndexOf(".");
  return dot > -1 ? name.slice(dot + 1).toLowerCase() : "";
}
const MIME_EXT = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/wav": "wav",
  "audio/ogg": "ogg",
  "audio/x-m4a": "m4a",
  "application/pdf": "pdf",
};
function extFromType(type = "") {
  return MIME_EXT[type] || "";
}
function pickExt(file) {
  return extFromName(file?.name) || extFromType(file?.type) || "bin";
}
function randomId() {
  try {
    return crypto.randomUUID();
  } catch {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }
}
function genFilename(file) {
  const ext = pickExt(file);
  const id = randomId();
  return ext ? `${id}.${ext}` : id;
}

export default function UpLoadMedia() {
  const navigate = useNavigate();
  const { uploadMedia, status, error, response, abort } = useUploadMedia();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    mediaType: "Image",
    tags: [],
    file: null,
    thumbnailFile: null,
  });

  const [autoSlug, setAutoSlug] = useState(true);
  const [filePreview, setFilePreview] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileUrlRef = useRef(null);
  const thumbUrlRef = useRef(null);

  useEffect(() => {
    if (autoSlug) setForm((f) => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, autoSlug]);

  useEffect(() => {
    return () => {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
      if (thumbUrlRef.current) URL.revokeObjectURL(thumbUrlRef.current);
    };
  }, []);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const onPickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    const url = URL.createObjectURL(f);
    fileUrlRef.current = url;
    setFilePreview(url);
    setForm((prev) => ({
      ...prev,
      file: f,
      // if title empty, default from base name
      title: prev.title || (f.name ? f.name.replace(/\.[^.]+$/, "") : prev.title),
    }));
  };

  const onPickThumb = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (thumbUrlRef.current) URL.revokeObjectURL(thumbUrlRef.current);
    const url = URL.createObjectURL(f);
    thumbUrlRef.current = url;
    setThumbPreview(url);
    setForm((prev) => ({ ...prev, thumbnailFile: f }));
  };

  const validate = () => {
    const errs = {};
    if (!form.file) errs.file = "Hãy chọn một file media.";
    if (!form.title.trim()) errs.title = "Tiêu đề là bắt buộc.";
    if (!form.slug.trim()) errs.slug = "Slug là bắt buộc.";
    if (!/^[-a-z0-9]+$/.test(form.slug)) errs.slug = "Slug chỉ gồm chữ thường, số, dấu gạch ngang.";
    if (!form.mediaType) errs.mediaType = "Chọn loại media.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      description: "",
      mediaType: "Image",
      tags: [],
      file: null,
      thumbnailFile: null,
    });
    setFilePreview(null);
    setThumbPreview(null);
    setErrors({});
    setAutoSlug(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const filename = genFilename(form.file);
      const thumbnailFilename = form.thumbnailFile ? genFilename(form.thumbnailFile) : undefined;

      await uploadMedia({
        file: form.file,
        thumbnailFile: form.thumbnailFile || undefined,
        filename,
        thumbnailFilename,
        slug: form.slug,
        title: form.title.trim(),
        description: form.description.trim(),
        mediaType: form.mediaType,
        tags: form.tags,
        withCredentials: false,
      });
    } catch (err) {
      // handled by hook state
    }
  };

  const isUploading = status === "uploading";
  const isSuccess = status === "success";
  const isError = status === "error";
  const canAbort = isUploading;

  const resultSlug = useMemo(() => response?.slug || form.slug, [response, form.slug]);

  return (
    <div className="min-h-screen text-white">
      <section className="relative pt-24 pb-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-6">
          <div className="mb-6 flex items-center justify-between">
            <BackButton onClick={() => navigate(-1)} />
            <a
              href="/gallery"
              aria-label="Go to home"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Gallery
            </a>
          </div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">Tải lên Media</h1>
            <p className="text-white/70 max-w-2xl">
              Không cần nhập tên file. Hệ thống sẽ tự sinh <span className="font-semibold">UUID + phần mở rộng</span> dựa trên file của bạn.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <motion.form onSubmit={onSubmit} initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: File pickers & preview */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <UploadCloud className="h-5 w-5" /> File media
              </h2>

              <label className="block mb-2 text-sm text-white/80">Chọn file</label>
              <input
                type="file"
                accept="image/*,video/*,audio/*,application/pdf"
                onChange={onPickFile}
                disabled={isUploading}
                className="w-full rounded-xl bg-white/5 text-white px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
              />
              {errors.file && <p className="text-amber-200 text-xs mt-1">{errors.file}</p>}

              <div className="mt-4 rounded-xl border border-white/10 bg-black/30 aspect-[3/2] flex items-center justify-center overflow-hidden">
                {filePreview ? (
                  <img src={filePreview} alt="Preview" className="object-contain w-full h-full" />
                ) : (
                  <div className="text-white/40 text-sm flex items-center gap-2">
                    <FileImage className="h-4 w-4" /> Chưa có preview
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-2 text-sm text-white/80">Thumbnail file</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onPickThumb}
                    disabled={isUploading}
                    className="w-full rounded-xl bg-white/5 text-white px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                  />
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 flex items-center justify-center overflow-hidden">
                  {thumbPreview ? (
                    <img src={thumbPreview} alt="Thumb preview" className="object-cover w-full h-full" />
                  ) : (
                    <div className="text-white/40 text-xs flex items-center gap-2 p-2">
                      <ImagePlus className="h-4 w-4" /> Chưa có thumbnail
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-3 text-xs text-white/50">Tên file sẽ được sinh dạng <code>UUID.ext</code> (ví dụ: <code>550e8400-e29b-41d4-a716-446655440000.jpg</code>).</p>
            </div>
          </div>

          {/* Right: Metadata fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-3">Thông tin</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm text-white/80">Tiêu đề</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                    disabled={isUploading}
                    className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                    placeholder="Tên media…"
                  />
                  {errors.title && <p className="text-amber-200 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-white/80 flex items-center gap-2">
                    <span>Slug</span> <Hash className="h-3.5 w-3.5" />
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => { setAutoSlug(false); setField("slug", e.target.value); }}
                      disabled={isUploading}
                      className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                      placeholder="ten-media"
                    />
                    <button
                      type="button"
                      onClick={() => { setAutoSlug(true); setField("slug", slugify(form.title)); }}
                      disabled={isUploading}
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </button>
                  </div>
                  {errors.slug && <p className="text-amber-200 text-xs mt-1">{errors.slug}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-white/80">Loại</label>
                  <select
                    value={form.mediaType}
                    onChange={(e) => setField("mediaType", e.target.value)}
                    disabled={isUploading}
                    className="w-full rounded-xl bg-white/5 text-white px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                  >
                    {MEDIA_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-neutral-900">{t}</option>
                    ))}
                  </select>
                  {errors.mediaType && <p className="text-amber-200 text-xs mt-1">{errors.mediaType}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-white/80">Tags</label>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-2">
                    <TagsEditor value={form.tags} onChange={(tags) => setField("tags", tags)} />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm text-white/80">Mô tả</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  disabled={isUploading}
                  placeholder="Mô tả ngắn…"
                  className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
                  {isUploading ? "Đang tải lên…" : "Tải lên"}
                </button>

                {canAbort && (
                  <button
                    type="button"
                    onClick={abort}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                  >
                    <XCircle className="h-4 w-4" /> Huỷ
                  </button>
                )}

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isUploading}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus:ring-white/30"
                >
                  Làm lại
                </button>
              </div>

              {/* Status messages */}
              <div className="mt-6 space-y-3">
                {isSuccess && (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-100 flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Tải lên thành công!</p>
                      {resultSlug && (
                        <p className="text-sm mt-1">
                          Xem mục này tại <a href={`/media/${resultSlug}`} className="underline hover:no-underline">/media/{resultSlug}</a>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {isError && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-rose-100 flex items-start gap-2">
                    <XCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Có lỗi khi tải lên.</p>
                      <p className="text-sm mt-1 break-words">{String(error?.message || "Unknown error")}</p>
                    </div>
                  </div>
                )}

                {response && (
                  <details className="rounded-xl border border-white/10 bg-black/30 p-4 text-white/80">
                    <summary className="cursor-pointer text-sm">Phản hồi từ máy chủ</summary>
                    <pre className="mt-3 text-xs whitespace-pre-wrap break-words">{JSON.stringify(response, null, 2)}</pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        </motion.form>
      </section>
    </div>
  );
}

