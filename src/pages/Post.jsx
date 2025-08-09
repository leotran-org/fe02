import { usePost } from "../hooks/usePost";
import BackButton from "../components/post/BackButton";
import { PostNotFound } from "../components/post/PostNotFound";
import { PostContent } from "../components/post/PostContent";
import PostHero from "../components/post/PostHero";

export default function Post() {
  const { post, prev, next, navigate } = usePost();

  if (!post) {
    return <PostNotFound onBack={() => navigate(-1)} />;
  }

  return (
    <div className="relative min-h-screen text-white">
      <BackButton onClick={() => navigate(-1)} />
      <PostHero post={post} />
      <PostContent post={post} prev={prev} next={next} />
      
      {/* Local styles */}
      <style>{`
        .prose :where(img):not(:where([class~="not-prose"] *)) { margin: 0; }
      `}</style>
    </div>
  );
}
