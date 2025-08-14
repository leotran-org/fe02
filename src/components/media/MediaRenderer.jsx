import { FileText } from "lucide-react";

export default function MediaRenderer({ item }) {
  if (!item) return null;

  const commonClasses =
    "w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow";

  if (item.type === "image" || item.type === "illustration") {
    return (
      <div className={commonClasses}>
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-cover"
        />
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <div className={`${commonClasses} aspect-video flex items-center justify-center bg-black/40`}>
        <video
          src={item.src}
          controls
          preload="none"
          className="w-full h-full object-contain"
          poster={item.thumb}
        />
      </div>
    );
  }

  if (item.type === "audio") {
    return (
      <div className={`${commonClasses} p-6 flex flex-col gap-4`}>
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={item.thumb}
            alt={`${item.title} cover`}
            loading="lazy"
            decoding="async"
            className="w-full h-56 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <audio src={item.src} controls className="w-full" preload="none" />
      </div>
    );
  }

  // Document / Other
  return (
    <div className={`${commonClasses} p-6`}>
      <div className="flex items-start gap-4">
        <img
          src={item.thumb}
          alt={`${item.title} preview`}
          loading="lazy"
          decoding="async"
          className="w-44 h-56 object-cover rounded-lg border border-white/10"
        />
        <div className="flex-1">
          <p className="text-white/80 mb-4">
            Không có bản xem trước trực tiếp. Mở tài liệu để xem nội dung đầy đủ.
          </p>
            <p className="text-white/80 mb-4">
                Document type: {item.type}
            </p>
          <a
            href={item.src || "#"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
          >
            <FileText className="w-4 h-4" />
            Mở tài liệu
          </a>
        </div>
      </div>
    </div>
  );
}

