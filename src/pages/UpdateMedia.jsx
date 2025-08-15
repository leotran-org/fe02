// pages/UpdateMedia.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  ImagePlus,
  FileImage,
  Hash,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCcw,
  Home,
} from "lucide-react";

import useUpdateMedia from "../hooks/useUpdateMedia"; // your PUT hook
import { useMedia } from "../hooks/useMedia";         // <-- existing info comes from here
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

export default function UpdateMedia() {
  const navigate = useNavigate();
  const { slug: routeSlug } = useParams();

  // Load OLD info using your hook
  const {
    media,                  // { title, description, tags, ... }
    isLoading: loadingExisting,
    error: existingError,
    isSuccess: hasExisting,
  } = useMedia(routeSlug, { enabled: Boolean(routeSlug) });

  const { updateMedia, data, error, loading } = useUpdateMedia();

  const [form, setForm] = useState({
    title: "",
    slug: routeSlug || "",
    description: "",
    tags: [],
    thumbnailPath: "",
    thumbnailFile: null,
  });

  const [autoSlug, setAutoSlug] = useState(false);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const thumbUrlRef = useRef(null);
  const abortRef = useRef(null); // for the PUT request

  // Toast state
  const [flash, setFlash] = useState(null); // { type: 'success'|'error', text: string }
  const toastTimer = useRef(null);
  const showFlash = (payload) => {
    setFlash(payload);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setFlash(null), 4000);
  };

  // Local success flag (don’t depend on data for success)
  const [didUpdate, setDidUpdate] = useState(false);

  useEffect(() => {
    return () => {
      if (thumbUrlRef.current) URL.revokeObjectURL(thumbUrlRef.current);
      abortRef.current?.abort();
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    if (autoSlug) setForm((f) => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, autoSlug]);

  // Prefill title/description once we have existing data (don’t override if user already typed)
  useEffect(() => {
    if (!hasExisting || !media) return;
    setForm((f) => ({
      ...f,
      title: f.title || media.title || "",
      description: f.description || media.description || "",
      // keep f.slug as user input / routeSlug
    }));
  }, [hasExisting, media]);

  // Clear local success when route changes
  useEffect(() => { setDidUpdate(false); }, [routeSlug]);

  // trigger toast on error
  const isUpdating = loading;
  const isError = Boolean(error);

  useEffect(() => {
    if (isError) {
      showFlash({
        type: "error",
        text: String(error?.message || "Có lỗi khi cập nhật."),
      });
    }
  }, [isError, error]);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

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
    if (!routeSlug?.trim()) errs.currentSlug = "Thiếu slug hiện tại từ URL.";
    if (!form.slug.trim()) errs.slug = "Slug mới (hoặc hiện tại) là bắt buộc.";
    if (!/^[-a-z0-9]+$/.test(form.slug)) errs.slug = "Slug chỉ gồm chữ thường, số, dấu gạch ngang.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setDidUpdate(false);

    try {
      await updateMedia({
        currentSlug: routeSlug,
        newSlug: form.slug,
        title: form.title || undefined,
        description: form.description || undefined,
        tags: form.tags, // array; the hook will JSON.stringify it
        thumbnailPath: form.thumbnailFile ? undefined : (form.thumbnailPath || undefined),
        thumbnailFile: form.thumbnailFile || undefined,
        signal: abortRef.current.signal,
      });
      setDidUpdate(true);
      showFlash({ type: "success", text: "Cập nhật thành công!" });
    } catch {
      // handled by hook state
    }
  };

  const abort = () => abortRef.current?.abort();

  const resultSlug = useMemo(
    () => data?.slug || form.slug || routeSlug,
    [data, form.slug, routeSlug]
  );

  // OLD tags (already normalized to string[] by useMedia)
  const oldTags = useMemo(() => (Array.isArray(media?.tags) ? media.tags : []), [media]);

  useEffect(() => {
    if (hasExisting && !form.tags.length && oldTags.length) {
      setField("tags", oldTags);
    }
  }, [hasExisting, oldTags, form.tags.length]);

  return (
    <div className="min-h-screen text-white">
      {/* Toast overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key={flash.type + flash.text}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="fixed top-4 right-4 z-50"
            role="status"
            aria-live="polite"
          >
            <div
              className={[
                "rounded-xl border p-4 shadow-xl min-w-[260px] max-w-[420px] flex items-start gap-2",
                flash.type === "success"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
                  : "border-rose-500/40 bg-rose-500/10 text-rose-100",
              ].join(" ")}
            >
              {flash.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 mt-0.5 shrink-0" />
              )}

              <div className="flex-1">
                <p className="font-medium">
                  {flash.type === "success" ? "Thành công" : "Lỗi"}
                </p>
                <p className="text-sm mt-0.5">{flash.text}</p>
              </div>

              <button
                type="button"
                onClick={() => setFlash(null)}
                className="ml-2 rounded-lg px-2 py-1 text-xs border border-white/10 bg-white/5 hover:bg-white/10"
                aria-label="Đóng thông báo"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">Cập nhật Media</h1>
            <p className="text-white/70 max-w-2xl">
              Chỉnh sửa tiêu đề, mô tả, tags, slug và/hoặc thay thumbnail. Slug hiện tại được lấy từ URL.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <motion.form
          onSubmit={onSubmit}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left: Thumbnail picker & preview */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <ImagePlus className="h-5 w-5" /> Thumbnail
              </h2>

              <label className="block mb-2 text-sm text-white/80">Chọn thumbnail file (tuỳ chọn)</label>
              <input
                type="file"
                accept="image/*"
                onChange={onPickThumb}
                disabled={isUpdating}
                className="w-full rounded-xl bg-white/5 text-white px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
              />

              <div className="mt-4 rounded-xl border border-white/10 bg-black/30 aspect-[3/2] flex items-center justify-center overflow-hidden">
                {thumbPreview ? (
                  <img src={thumbPreview} alt="Thumb preview" className="object-cover w-full h-full" />
                ) : (
                  <div className="text-white/40 text-sm flex items-center gap-2">
                    <FileImage className="h-4 w-4" /> Chưa có thumbnail mới
                  </div>
                )}
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm text-white/80">Hoặc nhập thumbnail_path</label>
                <input
                  type="text"
                  value={form.thumbnailPath}
                  onChange={(e) => setField("thumbnailPath", e.target.value)}
                  disabled={isUpdating || Boolean(form.thumbnailFile)}
                  placeholder="vd: Q3mZb7t/your-image-key.jpg"
                  className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                />
                <p className="text-xs text-white/50 mt-1">
                  Nếu bạn chọn file, trường <code>thumbnail_path</code> sẽ được bỏ qua.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Metadata fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-3">Thông tin</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm text-white/80">Slug hiện tại (URL)</label>
                  <input
                    type="text"
                    value={routeSlug || ""}
                    readOnly
                    className="w-full rounded-xl bg-black/30 text-white/80 px-3 py-2 border border-white/10"
                  />
                  {errors.currentSlug && <p className="text-amber-200 text-xs mt-1">{errors.currentSlug}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-white/80 flex items-center gap-2">
                    <span>Slug mới</span> <Hash className="h-3.5 w-3.5" />
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => { setAutoSlug(false); setField("slug", e.target.value); }}
                      disabled={isUpdating}
                      className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                      placeholder="ten-media-moi"
                    />
                    <button
                      type="button"
                      onClick={() => { setAutoSlug(true); setField("slug", slugify(form.title || routeSlug || "")); }}
                      disabled={isUpdating}
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </button>
                  </div>
                  {errors.slug && <p className="text-amber-200 text-xs mt-1">{errors.slug}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-white/80">Tiêu đề</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                    disabled={isUpdating}
                    className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                    placeholder="Tên mới (tuỳ chọn)…"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-white/80">Tags (mới)</label>
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
                  disabled={isUpdating}
                  placeholder="Mô tả mới (tuỳ chọn)…"
                  className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {isUpdating ? "Đang cập nhật…" : "Lưu thay đổi"}
                </button>

                {isUpdating && (
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
                  onClick={() => {
                    setForm({
                      title: "",
                      slug: routeSlug || "",
                      description: "",
                      tags: [],
                      thumbnailPath: "",
                      thumbnailFile: null,
                    });
                    setThumbPreview(null);
                    setErrors({});
                    setAutoSlug(false);
                    setDidUpdate(false);
                  }}
                  disabled={isUpdating}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus:ring-white/30"
                >
                  Làm lại
                </button>
              </div>

              {/* Status messages */}
              <div className="mt-6 space-y-3">
                {didUpdate && (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-100 flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Cập nhật thành công!</p>
                      {resultSlug && (
                        <p className="text-sm mt-1">
                          Xem mục này tại{" "}
                          <a href={`/media/${resultSlug}`} className="underline hover:no-underline">
                            /media/{resultSlug}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {isError && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-rose-100 flex items-start gap-2">
                    <XCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Có lỗi khi cập nhật.</p>
                      <p className="text-sm mt-1 break-words">{String(error?.message || "Unknown error")}</p>
                    </div>
                  </div>
                )}

                {didUpdate && (
                  <details className="rounded-xl border border-white/10 bg-black/30 p-4 text-white/80">
                    <summary className="cursor-pointer text-sm">Phản hồi từ máy chủ</summary>
                    <pre className="mt-3 text-xs whitespace-pre-wrap break-words">
                      {JSON.stringify(data ?? { ok: true, slug: resultSlug }, null, 2)}
                    </pre>
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

