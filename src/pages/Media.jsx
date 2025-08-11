import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { iconForType } from "../utils/mediaIcon";
import { fadeUp } from "../animations/variants";
import { useMediaItem } from "../hooks/useMediaItem";

import MediaHero from "../components/media/MediaHero";
import MediaRenderer from "../components/media/MediaRenderer";
import InfoCard from "../components/media/InfoCard";
import DescriptionCard from "../components/media/DescriptionCard";

export default function Media() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = useMediaItem(id);

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
          </div>

          <aside className="lg:col-span-1 flex flex-col gap-6">
            <InfoCard Icon={Icon} type={item.type} date={item.date} duration={item.duration} />
            <DescriptionCard src={item.src} />
          </aside>
        </motion.div>
      </section>
    </div>
  );
}

