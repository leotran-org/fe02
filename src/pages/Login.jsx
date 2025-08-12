// page/Login.jsx
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginForm } from "../hooks/useLoginForm";
import { useValidateSession } from "../hooks/useValidateSession"; // validate cookie on mount

import { BackgroundEffects } from "../components/login/BackgroundEffects";
import { LoginHeader } from "../components/login/Header";
import { LoginFooter } from "../components/login/Footer";
import { fadeUp, stagger } from "../animations/variants";
import { LoginForm } from "../components/login/Form";

import Cookies from "js-cookie";

const Login = () => {
  const {
    formData,
    errors,
    isLoading,
    sessionId,
    handleSubmit,
    handleChange,
  } = useLoginForm();

  const navigate = useNavigate();

  // --- NEW: validate any existing cookie on mount
  const { validate } = useValidateSession({ credentials: "same-origin" });
  const checkedCookieRef = useRef(false);

  useEffect(() => {
    if (checkedCookieRef.current) return; // avoid double-run in React Strict Mode
    checkedCookieRef.current = true;

    const cookieSessionId = Cookies.get("session_id");
    if (!cookieSessionId) return;

    (async () => {
      const res = await validate(cookieSessionId);
      // Success path: backend returns 200 with { session_data: {...} }
      if (res?.ok && res?.data?.session_data) {
        navigate("/");
      } else {
        // Invalid/expired/errored: remove cookie (match the path you used when setting it)
        Cookies.remove("session_id", { path: "/" });
      }
    })();
  }, [validate, navigate]);
  // --- end NEW

  // After a fresh login, set cookie and go home
  useEffect(() => {
    if (!sessionId) return;

    Cookies.set("session_id", sessionId, {
      path: "/",
      sameSite: "lax",
      secure: window.location.protocol === "https:",
    });

    navigate("/");
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <BackgroundEffects />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative w-full max-w-md"
      >
        <motion.div
          variants={fadeUp}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          <LoginHeader fadeUp={fadeUp} />
          <LoginForm
            fadeUp={fadeUp}
            formData={formData}
            errors={{ ...errors }}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </motion.div>

        <LoginFooter fadeUp={fadeUp} />
      </motion.div>
    </div>
  );
};

export default Login;

