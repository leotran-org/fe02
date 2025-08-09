// components/blog/BlogHero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp } from "../../animations/variants";

export const BlogHero = () => {
  return (
    <section className="relative pt-28 pb-14 mb-10">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60%_40%_at_50%_10%,rgba(245,158,11,0.18),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Stories &nbsp;</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
              Insights
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8">
            Thoughts on design, development, and the creative process behind meaningful digital experiences.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-white font-semibold shadow-lg hover:shadow-amber-400/40 transition duration-300"
          >
            About Me
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

