import TagsEditor from "./TagsEditor";
import MEDIA_TYPES from "../../constants/mediaTypes"; // if your file exports default array
// If it exports a named const, use: import { MEDIA_TYPES } from "../../constants/mediaTypes.jsx";
import { Calendar, Clock, Upload } from "lucide-react";

export default function MediaFields({ form, errors, setField, onFileUpload }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block mb-2 text-sm text-white/80">Tiêu đề</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          placeholder="Tên media…"
        />
        {errors.title && <p className="text-amber-200 text-xs mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 text-sm text-white/80">Loại</label>
          <select
            value={form.type}
            onChange={(e) => setField("type", e.target.value)}
            className="w-full rounded-xl bg-white/5 text-white px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          >
            {MEDIA_TYPES.map((t) => (
              <option key={t} value={t} className="bg-neutral-900">{t}</option>
            ))}
          </select>
          {errors.type && <p className="text-amber-200 text-xs mt-1">{errors.type}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm text-white/80">
            Ngày <Calendar className="inline w-3.5 h-3.5 ml-1" />
          </label>
          <input
            type="text"
            value={form.date}
            onChange={(e) => setField("date", e.target.value)}
            placeholder="VD: Dec 1, 2024"
            className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-white/80">
            Độ dài <Clock className="inline w-3.5 h-3.5 ml-1" />
          </label>
          <input
            type="text"
            value={form.duration ?? ""}
            onChange={(e) => setField("duration", e.target.value)}
            placeholder="VD: 1:12 hoặc để trống"
            className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm text-white/80">Nguồn (src)</label>
          <input
            type="url"
            value={form.src}
            onChange={(e) => setField("src", e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          />
          {errors.src && <p className="text-amber-200 text-xs mt-1">{errors.src}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm text-white/80">Thumbnail</label>
          <input
            type="url"
            value={form.thumb}
            onChange={(e) => setField("thumb", e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          />
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
  );
}

