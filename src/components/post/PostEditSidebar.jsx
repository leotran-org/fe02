// components/post/PostEditSidebar.jsx
import { Link } from "react-router-dom";
import PostPreviewPane from "./PostPreviewPane";

export default function PostEditSidebar({ post, postId, showPreviewPane }) {
  return (
    <aside className="lg:col-span-1">
      <PostPreviewPane post={post} show={showPreviewPane} />

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs text-white/60">Quick links</div>
        <div className="mt-2 flex flex-col gap-2">
          <Link to={`/post/${postId}`} className="underline text-amber-300">View post</Link>
          <Link to="/blog" className="underline text-amber-300">Back to Blog</Link>
        </div>
      </div>
    </aside>
  );
}

