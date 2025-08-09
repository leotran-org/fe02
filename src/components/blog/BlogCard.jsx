
// components/blog/BlogCard.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { getCategories } from "../../utils/blogUtils";
import { fadeUp } from "../../animations/variants";

export const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <motion.article
      variants={fadeUp}
      onClick={() => navigate(`/post/${post.id}`)}
      className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {getCategories(post).slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="bg-amber-400/90 text-black px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow"
            >
              {cat}
            </span>
          ))}
          {getCategories(post).length > 2 && (
            <span className="bg-amber-400/70 text-black/90 px-3 py-1 rounded-full text-[10px] font-semibold shadow">
              +{getCategories(post).length - 2}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">Published on</span>
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">Read time</span>
            {post.readTime}
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-amber-300 transition-colors">
          {post.title}
        </h3>

        <p className="text-white/70 mb-5 leading-relaxed">{post.excerpt}</p>
      </div>
    </motion.article>
  );
};
