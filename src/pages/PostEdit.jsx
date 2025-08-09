// pages/PostEdit.jsx (Main component)
import BackButton from "../components/post/BackButton";
import PostHero from "../components/post/PostHero";
import PostEditForm from "../components/post/PostEditForm";
import PostEditSidebar from "../components/post/PostEditSidebar";
import { usePostEdit } from "../hooks/usePostEdit";

export default function PostEdit() {
  const {
    post,
    postId,
    saving,
    showPreviewPane,
    errors,
    setField,
    setShowPreviewPane,
    persist,
    navigate,
  } = usePostEdit();

  return (
    <div className="relative min-h-screen text-white">
      <BackButton onBack={() => navigate(-1)} />

      <PostHero
        post={{
          ...post,
          categories: post.categories?.length ? post.categories : ["Uncategorized"],
          image:
            post.image ||
            "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=1600&h=900&fit=crop",
        }}
      />

      <main className="container mx-auto px-6 pb-24 -mt-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <PostEditForm
            post={post}
            errors={errors}
            saving={saving}
            showPreviewPane={showPreviewPane}
            onFieldChange={setField}
            onPersist={persist}
            onTogglePreview={() => setShowPreviewPane((v) => !v)}
          />

          <PostEditSidebar
            post={post}
            postId={postId}
            showPreviewPane={showPreviewPane}
          />
        </div>
      </main>

      <style>{`
        .prose :where(img):not(:where([class~="not-prose"] *)) { margin: 0; }
      `}</style>
    </div>
  );
}
