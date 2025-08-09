import { Link } from "react-router-dom";

export const PostNavigation = ({ prev, next }) => (
  <div className="mt-12 grid sm:grid-cols-2 gap-4">
    <Link
      to={prev ? `/post/${prev.id}` : "/blog"}
      className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
    >
      <div className="text-xs text-white/60 mb-1">Previous</div>
      <div className="font-medium line-clamp-2">
        {prev ? prev.title : "Back to Blog"}
      </div>
    </Link>
    <Link
      to={next ? `/post/${next.id}` : "/blog"}
      className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 text-right"
    >
      <div className="text-xs text-white/60 mb-1">Next</div>
      <div className="font-medium line-clamp-2">
        {next ? next.title : "Back to Blog"}
      </div>
    </Link>
  </div>
);

