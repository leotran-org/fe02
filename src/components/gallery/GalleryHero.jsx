import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp } from "../../animations/variants";

export default function GalleryHero() {
  return (
    <section className="relative pt-28 pb-10">
      <div className="absolute inset-0 -z-10">
        {/* fixed typo in gradient: from-amber-500/20 */}
        <div className="pointer-events-none absolute inset-0 opacity-60 bg-gradient-to-b from-amber-500/20 to-transparent" />
      </div>
      <div className="container mx-auto px-6 text-center">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="text-white">Media </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
            Gallery
          </span>
        </motion.h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
          Bộ sưu tập media phong cách Pinterest, bảng màu amber giống Blog.
        </p>

        <div className="flex justify-center gap-4 mt-4 mb-4">
          <Link
            to="/"
            className="inline-block min-w-[140px] px-6 py-3 rounded-2xl
                       bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold
                       shadow-lg hover:shadow-amber-400/50 transition duration-300">
            About Me
          </Link>

          <Link
            to="/blog"
            className="inline-block min-w-[140px] px-6 py-3 rounded-2xl
                       bg-black text-white font-semibold shadow-lg
                       hover:shadow-amber-400/50 transition duration-300 shadow-amber-400/10">
            Blog
          </Link>
        </div>
      </div>
    </section>
  );
}

