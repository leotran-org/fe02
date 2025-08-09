// components/PostHero.jsx
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { fadeUp } from "../../animations/variants";
import { getCategories } from "../../utils/getCategories";

export default function PostHero({ post }) {
  return (
    <section className="relative pt-24 pb-10">
      <div className="absolute inset-0 -z-10">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="flex flex-wrap gap-2 mb-5">
            {getCategories(post).map((c) => (
              <span
                key={c}
                className="bg-amber-400/90 text-black px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow"
              >
                {c}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {post.title || "Untitled post"}
          </h1>

          <div className="flex items-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date || "—"}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime || "—"}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
