// hooks/usePost.js
import { useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MOCK_POSTS from "../constants/mockPosts";

export const usePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = Number(id);

  const postData = useMemo(() => {
    const index = MOCK_POSTS.findIndex((p) => p.id === postId);
    const post = index >= 0 ? MOCK_POSTS[index] : null;
    const prev = index > 0 ? MOCK_POSTS[index - 1] : null;
    const next = index >= 0 && index < MOCK_POSTS.length - 1 ? MOCK_POSTS[index + 1] : null;

    return { post, prev, next, index };
  }, [postId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [postId]);

  return {
    ...postData,
    navigate,
    postId
  };
};

