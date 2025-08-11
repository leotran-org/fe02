import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Save,
  X,
  Tag as TagIcon,
  Calendar,
  Clock,
  ArrowLeft,
  Upload,
} from "lucide-react";

import MEDIA_ITEMS from "../constants/media";


const STORAGE_KEY = "media_items";

function loadMediaList() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MEDIA_ITEMS));
  } catch (_) {}
  return MEDIA_ITEMS;
}

function saveMediaList(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
}

function getMediaById(id) {
  const list = loadMediaList();
  return list.find((m) => m.id === id);
}

function updateMediaById(id, payload) {
  const list = loadMediaList();
  const idx = list.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  list[idx] = { ...list[idx], ...payload };
  saveMediaList(list);
  return true;
}

const MEDIA_TYPES = ["Image", "Video", "Audio", "Illustration", "Document"];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.2 } },
};

function TagsEditor({ value, onChange }) {
  const [input, setInput] = useState("");
  const addTag = useCallback(() => {
    const t = input.trim();
    if (!t) return;
    if (!value.includes(t)) onChange([...value, t]);
    setInput("");
  }, [input, value, onChange]);
  const removeTag = (t) => onChange(value.filter((x) => x !== t));
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 text-xs text-white/80 bg-white/5 border border-white/10 rounded-full pl-2 pr-1 py-1">
            <TagIcon className="w-3.5 h-3.5" />
            {t}
            <button type="button" onClick={() => removeTag(t)} className="ml-1 rounded-md p-1 hover:bg-white/10" aria-label={`Xoá tag ${t}`}>
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Nhập tag rồi Enter…"
          className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
        />
        <button type="button" onClick={addTag} className="rounded-xl px-3 py-2 border border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60">
          Thêm
        </button>
      </div>
    </div>
  );
}

export default function MediaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numId = Number(id);
  const original = useMemo(() => getMediaById(numId), [numId]);
  const [form, setForm] = useState(() => (
    original || {
      id: numId,
      title: "",
      type: "Image",
      tags: [],
      date: "",
      duration: "",
      src: "",
      thumb: "",
    }
  ));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = `Sửa media — ${original?.title ?? "Mục mới"}`;
  }, [original]);

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = useCallback(() => {
    const e = {};
    if (!form.title?.trim()) e.title = "Vui lòng nhập tiêu đề";
    if (!MEDIA_TYPES.includes(form.type)) e.type = "Loại media không hợp lệ";
    if (!form.src?.trim()) e.src = "Vui lòng nhập nguồn (src)";
    if (!form.thumb?.trim()) e.thumb = "Vui lòng nhập thumbnail";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setField("src", url);
      setField("thumb", url);
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const ok = updateMediaById(numId, {
      title: form.title.trim(),
      type: form.type,
      tags: form.tags,
      date: form.date,
      duration: form.duration || null,
      src: form.src.trim(),
      thumb: form.thumb.trim(),
    });
    setSaving(false);
    if (ok) navigate(`/media/${numId}`);
  };

  if (!original) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center p-8">
        <div className="max-w-lg w-full text-center">
          <p className="text-2xl font-semibold">Không tìm thấy media</p>
          <p className="text-white/60 mt-2">Không có mục để sửa. Hãy quay lại Gallery.</p>
          <button onClick={() => navigate(-1)} className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60">
            <ArrowLeft className="w-4 h-4" />Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <section className="relative pt-24 pb-10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent" />
          <div
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `url(${original.thumb})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(26px)", transform: "scale(1.05)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-6">
          <Link to={`/media/${numId}`} className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60">
            <ArrowLeft className="w-4 h-4" />
            Về chi tiết
          </Link>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-3xl md:text-5xl font-bold tracking-tight">
            Sửa: <span className="text-white">{original.title}</span>
          </motion.h1>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <motion.form initial="hidden" animate="visible" variants={fadeUp} onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div>
              <label className="block mb-2 text-sm text-white/80">Tiêu đề</label>
              <input type="text" value={form.title} onChange={(e) => setField("title", e.target.value)} className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60" placeholder="Tên media…" />
              {errors.title && <p className="text-amber-200 text-xs mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-sm text-white/80">Loại</label>
                <select value={form.type} onChange={(e) => setField("type", e.target.value)} className="w-full rounded-xl bg-white/5 text-white px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60">
                  {MEDIA_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-neutral-900">{t}</option>
                  ))}
                </select>
                {errors.type && <p className="text-amber-200 text-xs mt-1">{errors.type}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm text-white/80">Ngày <Calendar className="inline w-3.5 h-3.5 ml-1" /></label>
                <input type="text" value={form.date} onChange={(e) => setField("date", e.target.value)} placeholder="VD: Dec 1, 2024" className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60" />
              </div>
              <div>
                <label className="block mb-2 text-sm text-white/80">Độ dài <Clock className="inline w-3.5 h-3.5 ml-1" /></label>
                <input type="text" value={form.duration ?? ""} onChange={(e) => setField("duration", e.target.value)} placeholder="VD: 1:12 hoặc để trống" className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm text-white/80">Nguồn (src)</label>
                <input type="url" value={form.src} onChange={(e) => setField("src", e.target.value)} placeholder="https://..." className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60" />
                {errors.src && <p className="text-amber-200 text-xs mt-1">{errors.src}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm text-white/80">Thumbnail</label>
                <input type="url" value={form.thumb} onChange={(e) => setField("thumb", e.target.value)} placeholder="https://..." className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60" />
                {errors.thumb && <p className="text-amber-200 text-xs mt-1">{errors.thumb}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm text-white/80">Upload media từ máy</label>
              <div className="flex items-center gap-3">
                <input type="file" accept="image/*,video/*,audio/*" onChange={onFileUpload} className="hidden" id="fileUploadInput" />
                <label htmlFor="fileUploadInput" className="inline-flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 border border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60">
                  <Upload className="w-4 h-4" /> Chọn file
                </label>
                {form.src && <span className="text-sm text-white/70 truncate max-w-xs">{form.src}</span>}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm text-white/80">Tags</label>
              <TagsEditor value={form.tags} onChange={(tags) => setField("tags", tags)} />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70 mb-3">Xem nhanh thumbnail</p>
              <div className="aspect-[3/2] w-full overflow-hidden rounded-xl border border-white/10 bg-black/30 flex items-center justify-center">
                {form.thumb ? (
                  <img src={form.thumb} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white/40">Chưa có ảnh</span>
                )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-3">Hành động</h2>
              <button type="submit" disabled={saving} className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 border border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 disabled:opacity-60">
                <Save className="w-4 h-4" />
                {saving ? "Đang lưu…" : "Lưu thay đổi"}
              </button>
              <Link to={`/media/${numId}`} className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60">
                Huỷ
              </Link>
            </div>
            <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5">
              <h3 className="text-base font-semibold text-amber-200">Gợi ý</h3>
              <ul className="list-disc list-inside text-amber-100/80 text-sm mt-1 space-y-1">
                <li>Giữ bảng màu tối + amber để đồng nhất.</li>
                <li>URL nên là HTTPS hợp lệ (src, thumbnail).</li>
                <li>Độ dài chỉ cần cho Video/Audio.</li>
              </ul>
            </div>
          </aside>
        </motion.form>
      </section>
    </div>
  );
}

