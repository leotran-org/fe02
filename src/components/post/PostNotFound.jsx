import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const PostNotFound = ({ onBack }) => (
  <div className="min-h-screen text-white container mx-auto px-6 py-24">
    <div className="max-w-2xl">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="text-3xl font-bold mb-4">Post not found</h1>
      <p className="text-white/70">
        The article you're looking for doesn't exist or the link is broken.
      </p>
      <Link
        to="/blog"
        className="inline-block mt-6 px-5 py-2 rounded-xl bg-amber-500 text-black font-semibold"
      >
        Go to Blog
      </Link>
    </div>
  </div>
);
