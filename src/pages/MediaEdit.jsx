import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, ArrowLeft } from "lucide-react";

import { fadeUp } from "../animations/variants.jsx";
import useMediaItem, { updateMediaById } from "../hooks/useMediaItem";
import MediaFields from "../components/media/MediaFields";
import validateMedia from "../utils/validateMedia";

/* =========================
 * Utilities / small helpers
 * ========================= */

const trimMediaForm = (form) => ({
  ...form,
  title: form.title?.trim() || "",
  src: form.src?.trim() || "",
  thumb: form.thumb?.trim() || "",
  duration: form.duration || null,
});

/* =========================
 * Reusable hooks
 * ========================= */

function useDefaultForm(numId) {
  return useMemo(
    () => ({
      id: numId,
      title: "",
      type: "Image",
      tags: [],
      date: "",
      duration: "",
      src: "",
      thumb: "",
    }),
    [numId]
  );
}

function useSeededForm(original, defaultForm) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (original) {
      setForm({ ...defaultForm, ...original });
    } else if (original === null) {
      setForm(defaultForm);
    }
  }, [original, defaultForm]);

  return [form, setForm];
}

function useDocumentTitleFromTitle(title) {
  useEffect(() => {
    document.title = `Sửa media — ${title?.trim() || "Mục mới"}`;
  }, [title]);
}

function useObjectURLRefCleanup() {
  const ref = useRef(null);
  useEffect(() => {
    return () => {
      if (ref.current) {
        URL.revokeObjectURL(ref.current);
        ref.current = null;
      }
    };
  }, []);
  return ref;
}

function useSetField(setForm) {
  return useCallback((k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
  }, [setForm]);
}

function useFileUploadHandler(fileUrlRef, setField) {
  return useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
      fileUrlRef.current = url;
      setField("src", url);
      setField("thumb", url);
    },
    [setField, fileUrlRef]
  );
}

function useIsDirty(form, original) {
  return useMemo(() => {
    if (!original) return true;
    try {
      return JSON.stringify(form) !== JSON.stringify(original);
    } catch {
      return true;
    }
  }, [form, original]);
}

function useSubmitHandler({ form, numId, navigate, setErrors, setSaving }) {
  return useCallback(
    async (ev) => {
      ev.preventDefault();

      const trimmed = trimMediaForm(form);
      const { isValid, errors } = validateMedia(trimmed);
      setErrors(errors);
      if (!isValid) return;

      setSaving(true);
      try {
        const ok = updateMediaById(numId, {
          id: numId,
          title: trimmed.title,
          type: trimmed.type,
          tags: trimmed.tags,
          date: trimmed.date,
          duration: trimmed.duration,
          src: trimmed.src,
          thumb: trimmed.thumb,
        });
        if (ok) navigate(`/media/${numId}`);
      } finally {
        setSaving(false);
      }
    },
    [form, numId, navigate, setErrors, setSaving]
  );
}

/* =========================
 * Small presentational bits
 * ========================= */

function LoadingScreen() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center p-8">
      <div className="max-w-lg w-full text-center">
        <p className="text-2xl font-semibold">Đang tải…</p>
        <p className="text-white/60 mt-2">Vui lòng chờ trong giây lát.</p>
      </div>
    </div>
  );
}

function NotFoundScreen({ onBack }) {
  return (
    <div className="min-h-screen text-white flex items-center justify-center p-8">
      <div className="max-w-lg w-full text-center">
        <p className="text-2xl font-semibold">Không tìm thấy media</p>
        <p className="text-white/60 mt-2">Không có mục để sửa. Hãy quay lại Gallery.</p>
        <button
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
      </div>
    </div>
  );
}

function GradientBackdrop({ url }) {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(26px)",
          transform: "scale(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}

function PageHeader({ numId, title, thumbUrl }) {
  return (
    <section className="relative pt-24 pb-10">
      <GradientBackdrop url={thumbUrl} />
      <div className="container mx-auto px-6">
        <Link
          to={`/media/${numId}`}
          className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
        >
          <ArrowLeft className="w-4 h-4" /> Về chi tiết
        </Link>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-3xl md:text-5xl font-bold tracking-tight"
        >
          Sửa: <span className="text-white">{title}</span>
        </motion.h1>
      </div>
    </section>
  );
}


function ActionsPanel({ saving, isDirty, cancelHref }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold mb-3">Hành động</h2>
      <button
        type="submit"
        disabled={saving || !isDirty}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 border border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 disabled:opacity-60"
      >
        <Save className="w-4 h-4" />
        {saving ? "Đang lưu…" : isDirty ? "Lưu thay đổi" : "Không có thay đổi"}
      </button>
      <Link
        to={cancelHref}
        className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
      >
        Huỷ
      </Link>
    </div>
  );
}

function TipsCard() {
  return (
    <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5">
      <h3 className="text-base font-semibold text-amber-200">Gợi ý</h3>
      <ul className="list-disc list-inside text-amber-100/80 text-sm mt-1 space-y-1">
        <li>Giữ bảng màu tối + amber để đồng nhất.</li>
        <li>URL nên là HTTPS hợp lệ (src, thumbnail).</li>
        <li>Độ dài chỉ cần cho Video/Audio.</li>
      </ul>
    </div>
  );
}

/* =========================
 * Main component
 * ========================= */

export default function MediaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numId = Number(id);

  // fetch original item (assume: undefined = loading, null = not found)
  const { item: original } = useMediaItem(numId);

  // base form shape, stable per id
  const defaultForm = useDefaultForm(numId);

  // seeded form state + local state
  const [form, setForm] = useSeededForm(original, defaultForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // effects / derived state
  useDocumentTitleFromTitle(form.title);
  const fileUrlRef = useObjectURLRefCleanup();
  const setField = useSetField(setForm);
  const onFileUpload = useFileUploadHandler(fileUrlRef, setField);
  const isDirty = useIsDirty(form, original);
  const onSubmit = useSubmitHandler({
    form,
    numId,
    navigate,
    setErrors,
    setSaving,
  });

  // Loading state
  if (typeof original === "undefined") {
    return <LoadingScreen />;
  }

  // Not found state
  if (original === null) {
    return <NotFoundScreen onBack={() => navigate(-1)} />;
  }

  return (
    <div className="min-h-screen text-white">
      <section className="relative pt-24 pb-10">
        <GradientBackdrop url={original.thumb} />
        <div className="container mx-auto px-6">
          <Link
            to={`/media/${numId}`}
            className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
          >
            <ArrowLeft className="w-4 h-4" /> Về chi tiết
          </Link>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Sửa: <span className="text-white">{original.title}</span>
          </motion.h1>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <motion.form
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          onSubmit={onSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <MediaFields
              form={form}
              errors={errors}
              setField={setField}
              onFileUpload={onFileUpload}
            />
          </div>

          <aside className="lg:col-span-1 flex flex-col gap-4">
            <ActionsPanel
              saving={saving}
              isDirty={isDirty}
              cancelHref={`/media/${numId}`}
            />
            <TipsCard />
          </aside>
        </motion.form>
      </section>
    </div>
  );
}

