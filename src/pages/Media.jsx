import { useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Images,
  Video as VideoIcon,
  Music2,
  FileText,
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
} from "lucide-react";

/*
  NOTE:
  - This component expects MEDIA_ITEMS to be available from your Gallery data source.
  - If your Gallery file exports MEDIA_ITEMS, import it like:
      import { MEDIA_ITEMS } from "./Gallery";
  - Or change the import path below to wherever your data lives.
*/
import MEDIA_ITEMS from "../constants/media";

/* ------------------------------- Utilities -------------------------------- */
const iconForType = (type) => {
  switch (type) {
    case "Image":
      return Images;
    case "Video":
      return VideoIcon;
    case "Audio":
      return Music2;
    case "Illustration":
      return Images;
    default:
      return FileText;
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.2 } },
};

/* ----------------------------- Media Renderer ----------------------------- */
function MediaRenderer({ item }) {
  if (!item) return null;

  const commonClasses =
    "w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow";

  if (item.type === "Image" || item.type === "Illustration") {
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

  if (item.type === "Video") {
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

  if (item.type === "Audio") {
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

  // Document or others
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

/* --------------------------------- Page ----------------------------------- */
export default function Media() {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = useMemo(() => {
    const num = Number(id);
    return MEDIA_ITEMS.find((m) => m.id === num);
  }, [id]);

  useEffect(() => {
    if (item) document.title = `${item.title} — Media`;
  }, [item]);

  if (!item) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center p-8">
        <div className="max-w-lg w-full text-center">
          <p className="text-2xl font-semibold">Không tìm thấy media</p>
          <p className="text-white/60 mt-2">Mục bạn yêu cầu có thể đã bị xoá hoặc đường dẫn không đúng.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
          >
            <ArrowLeft className="w-4 h-4" />Quay lại
          </button>
        </div>
      </div>
    );
  }

  const Icon = iconForType(item.type);

  return (
    <div className="min-h-screen text-white">
      {/* Hero với bảng màu amber tương tự Gallery */}
      <section className="relative pt-24 pb-10">
        {/* Backdrop: blur + gradient amber nhạt */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent" />
          {/* Blur ảnh thumb làm background nhẹ */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url(${item.thumb})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(28px)",
              transform: "scale(1.05)",
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            aria-label="Quay lại Gallery"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
              <span className="text-white">{item.title} </span>
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2 bg-black/30 border border-white/10 px-3 py-1.5 rounded-full">
                <Icon className="w-4 h-4 text-white" />
                {item.type}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {item.date}
              </span>
              {item.duration && (
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {item.duration}
                </span>
              )}
            </div>

            {/* Tags */}
            {item.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 text-xs text-white/80 bg-white/5 border border-white/10 rounded-full px-3 py-1"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeUp}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <MediaRenderer item={item} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold mb-3">Thông tin</h2>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span>Loại</span>
                  <span className="inline-flex items-center gap-2"><Icon className="w-4 h-4" />{item.type}</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 py-2">
                  <span>Ngày</span>
                  <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" />{item.date}</span>
                </li>
                {item.duration && (
                  <li className="flex items-center justify-between pt-2">
                    <span>Độ dài</span>
                    <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4" />{item.duration}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5">
              <h3 className="text-base font-semibold text-amber-200">Mô tả</h3>
              <p className="text-sm text-amber-100/80 mt-1">
                Bảng màu đồng bộ với Gallery: nền tối, viền mờ, điểm nhấn amber cho CTA & trạng thái.
              </p>
              {item.src && (
                <a
                  href={item.src}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                >
                  Mở nguồn media
                </a>
              )}
              <Link
                to="/gallery"
                className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                Về Gallery
              </Link>
            </div>
          </aside>
        </motion.div>
      </section>
    </div>
  );
}

