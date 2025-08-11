import { motion } from "framer-motion";
import BackButton from "./BackButton";
import MetaChips from "./MetaChips";
import { fadeUp } from "../../animations/variants";

export default function MediaHero({ item, Icon, onBack }) {
  return (
    <section className="relative pt-24 pb-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent" />
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
        <BackButton onClick={onBack} className="mb-6" />

        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
            <span className="text-white">{item.title} </span>
          </h1>

          <MetaChips
            Icon={Icon}
            type={item.type}
            date={item.date}
            duration={item.duration}
            tags={item.tags}
          />
        </motion.div>
      </div>
    </section>
  );
}

