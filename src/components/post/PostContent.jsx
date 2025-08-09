// components/post/PostContent.jsx
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/variants";
import { HtmlContent } from "./HtmlContent";
import { PostTags } from "./PostTags";
import { PostNavigation } from "./PostNavigation";
import { RelatedPosts } from "./RelatedPosts";

export const PostContent = ({ post, prev, next }) => (
  <main className="container mx-auto px-6 pt-20 pb-20">
    <article className="max-w-3xl mx-auto">
      {/* Body */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="prose prose-invert max-w-none prose-headings:scroll-mt-24"
      >
        <HtmlContent htmlArray={post.htmlContent || []} />
      </motion.div>

      <PostTags post={post} />
      <PostNavigation prev={prev} next={next} />
      <RelatedPosts currentId={post.id} />
    </article>
  </main>
);
