// components/blog/BlogGrid.jsx
import { motion } from "framer-motion";
import { BlogCard } from "./BlogCard";
import { stagger } from "../../animations/variants";

export const BlogGrid = ({ posts, gridKey }) => (
  <section className="pb-20">
    <div className="container mx-auto px-6">
      <motion.div
        key={gridKey}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </motion.div>

      {posts.length === 0 && (
        <div className="text-center text-white/60 mt-12">
          No posts found for this category.
        </div>
      )}
    </div>
  </section>
);

