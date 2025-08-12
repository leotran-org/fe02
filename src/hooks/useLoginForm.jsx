import { useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../constants/backend";

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!BACKEND_URL) {
      setErrors({ general: "Missing BACKEND_URL in environment." });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/auth/login`,
        {
          username: formData.username,
          password: formData.password
        },
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true, // uncomment if your backend sets auth cookies
        }
      );

      const { session_id } = data || {};
      if (session_id) {
        setSessionId(session_id);
        // Optional: persist if desired
        // localStorage.setItem("session_id", session_id);
      } else {
        setErrors({ general: "Login failed: session_id not returned." });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const apiMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message;
        setErrors({ general: `Login failed: ${apiMessage}` });
      } else {
        setErrors({ general: "Login failed. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  };

  return {
    formData,
    errors,
    isLoading,
    sessionId,
    handleSubmit,
    handleChange
  };
};

