// pages/Media.jsx
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { iconForType } from "../utils/mediaIcon";
import { fadeUp } from "../animations/variants";
import { useMedia } from "../hooks/useMedia"; // ⬅️ new hook

import MediaHero from "../components/media/MediaHero";
import MediaRenderer from "../components/media/MediaRenderer";
import InfoCard from "../components/media/InfoCard";
import DescriptionCard from "../components/media/DescriptionCard";

export default function Media() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Fetch from backend using the new hook
  const { media, isLoading, isRefreshing, error, refetch } = useMedia(slug);

  // Map API response → the shape expected by UI components
  const item = useMemo(() => {
    if (!media) return null;

    const ext = (() => {
      try {
        const u = new URL(media.file_path || "");
        const name = u.pathname.split("/").pop() || "";
        const dot = name.lastIndexOf(".");
        return dot > -1 ? name.slice(dot + 1).toLowerCase() : "";
      } catch {
        const path = String(media.file_path || "");
        const dot = path.lastIndexOf(".");
        return dot > -1 ? path.slice(dot + 1).toLowerCase() : "";
      }
    })();

    const inferTypeFromExt = (e) => {
      if (["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg"].includes(e)) return "image";
      if (["mp4", "webm", "mov", "m4v", "avi", "mkv"].includes(e)) return "video";
      if (["mp3", "wav", "ogg", "m4a", "flac"].includes(e)) return "audio";
      if (["pdf", "doc", "docx", "ppt", "pptx"].includes(e)) return "document";
      return "document";
    };

    const normalized = String(media.type_name || "").toLowerCase();
    const type = ["image", "video", "audio", "document"].includes(normalized)
      ? normalized
      : inferTypeFromExt(ext);

    const src = media.file_path;
    const thumb = media.thumbnail_path || src;

    const tags = Array.isArray(media.tags)
      ? media.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [];

    return {
      // Primary fields used by components
      type,
      kind: type, // alias for compatibility
      date: media.created_at || null, // keep as string
      duration: null, // backend doesn't provide this
      src,

      // Common aliases for broader component compatibility
      url: src,
      thumb,
      thumbnail: thumb,

      // Extra fields
      title: media.title,
      description: media.description,
      raw: media,
      tags: tags.length > 0 ? tags : null,
    };
  }, [media]);

  if (isLoading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center p-8">
        <div className="max-w-lg w-full text-center">
          <p className="text-2xl font-semibold">Đang tải media…</p>
          <p className="text-white/60 mt-2">Vui lòng chờ trong giây lát.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center p-8">
        <div className="max-w-lg w-full text-center">
          <p className="text-2xl font-semibold">Không thể tải media</p>
          <p className="text-white/60 mt-2">Đã xảy ra lỗi khi tải dữ liệu. Thử lại nhé?</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </button>
            <button
              onClick={refetch}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center p-8">
        <div className="max-w-lg w-full text-center">
          <p className="text-2xl font-semibold">Không tìm thấy media</p>
          <p className="text-white/60 mt-2">
            Mục bạn yêu cầu có thể đã bị xoá hoặc đường dẫn không đúng.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const Icon = iconForType(item.type);

  return (
    <div className="min-h-screen text-white">
      <MediaHero item={item} Icon={Icon} onBack={() => navigate(-1)} />
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
            {isRefreshing && (
              <p className="text-xs text-white/60 mt-2">Đang làm mới…</p>
            )}
          </div>
          <aside className="lg:col-span-1 flex flex-col gap-6">
            <InfoCard Icon={Icon} type={item.type} date={item.date} duration={item.duration} />
            {/* If your DescriptionCard expects text instead of src, pass `text={item.description}` */}
            <DescriptionCard src={item.src} description={item.description} tags={item.tags} />
          </aside>
        </motion.div>
      </section>
    </div>
  );
}

