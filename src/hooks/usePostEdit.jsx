import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MOCK_POSTS from "../constants/mockPosts";

export function usePostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = Number(id);

  const initial = useMemo(() => {
    const fromStorage = window.localStorage.getItem("BLOG_EDIT_POST_" + postId);
    if (fromStorage) return JSON.parse(fromStorage);
    const found = MOCK_POSTS.find((p) => p.id === postId);
    return (
      found || {
        id: postId || Date.now(),
        title: "",
        excerpt: "",
        categories: [],
        readTime: "",
        date: "",
        image: "",
        author: { name: "", role: "", avatar: "" },
        htmlContent: [],
      }
    );
  }, [postId]);

  const [post, setPost] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [showPreviewPane, setShowPreviewPane] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [postId]);

  const setField = (path, value) => {
    setPost((prev) => {
      const next = { ...prev };
      const parts = path.split(".");
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) {
        obj[parts[i]] = { ...(obj[parts[i]] || {}) };
        obj = obj[parts[i]];
      }
      obj[parts.at(-1)] = value;
      return next;
    });
  };

  const validate = () => {
    const e = {};
    if (!post.title?.trim()) e.title = "Title is required";
    if (!post.date?.trim()) e.date = "Date is required";
    if (!post.excerpt?.trim()) e.excerpt = "Excerpt is required";
    if (!post.author?.name?.trim()) e.authorName = "Author name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const persist = (status = "draft") => {
    if (!validate()) return;
    setSaving(true);
    const payload = { ...post, status, updatedAt: new Date().toISOString() };
    window.localStorage.setItem("BLOG_EDIT_POST_" + postId, JSON.stringify(payload));
    setTimeout(() => {
      setSaving(false);
      navigate(`/post/${postId}`);
    }, 450);
  };

  return {
    post,
    postId,
    saving,
    showPreviewPane,
    errors,
    setField,
    setShowPreviewPane,
    persist,
    navigate,
  };
}
