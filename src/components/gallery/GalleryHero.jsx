import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp } from "../../animations/variants";

export default function GalleryHero() {
  return (
    <section className="relative pt-28 pb-10">
        <div className="absolute inset-0 -z-10">
            <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60%_40%_at_50%_10%,rgba(245,158,11,0.18),transparent_70%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:24px_24px]" />
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

