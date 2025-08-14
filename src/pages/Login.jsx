// page/Login.jsx
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

  // --- NEW: local auth state for showing info card instead of auto-redirect
  const [authChecked, setAuthChecked] = useState(false);
  const [sessionData, setSessionData] = useState(null);

  // validate any existing cookie on mount
  const { validate } = useValidateSession({ credentials: "same-origin" });
  const checkedCookieRef = useRef(false);

  useEffect(() => {
    if (checkedCookieRef.current) return; // avoid double-run in React Strict Mode
    checkedCookieRef.current = true;

    const cookieSessionId = Cookies.get("session_id");
    if (!cookieSessionId) {
      setAuthChecked(true);
      return;
    }

    (async () => {
      const res = await validate(cookieSessionId);
      // Success path: backend returns 200 with { session_data: {...} }
      if (res?.ok && res?.data?.session_data) {
        setSessionData(res.data.session_data);
      } else {
        // Invalid/expired/errored: remove cookie (match the path you used when setting it)
        Cookies.remove("session_id", { path: "/" });
      }
      setAuthChecked(true);
    })();
  }, [validate]);

  // After a fresh login, set cookie and go home (new sign-ins behave the same)
  useEffect(() => {
    if (!sessionId) return;

    Cookies.set("session_id", sessionId, {
      path: "/",
      sameSite: "lax",
      secure: window.location.protocol === "https:",
    });

    navigate("/");
  }, [sessionId, navigate]);

  // Small helpers to display user info nicely
  const displayName =
    sessionData?.user?.name ||
    sessionData?.profile?.name ||
    sessionData?.username ||
    sessionData?.email ||
    "User";

  const displayEmail =
    sessionData?.user?.email ||
    sessionData?.profile?.email ||
    sessionData?.email ||
    null;

  const initials = String(displayName)
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // --- NEW: If an active session is present, show information card + Home button
  if (authChecked && sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-amber-400/10 to-zinc-900 flex items-center justify-center p-6">
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

            <motion.div variants={fadeUp} className="mt-4 flex flex-col items-center">
              <div className="flex flex-col items-center gap-4 pt-10 pb-6">
                <div className="h-24 w-24 rounded-full bg-white/20 text-white flex items-center justify-center text-lg font-semibold">
                  {initials}
                </div>
                <div className="text-center">
                  <p className="text-white/90 font-medium">
                    You’re already signed in
                  </p>
                  <p className="text-white/70 text-sm">
                    {displayName}
                    {displayEmail ? ` · ${displayEmail}` : ""}
                  </p>
                </div>
              </div>

              {/* Optional: show a few fields if your API returns them */}
              <div className="mt-6 grid grid-cols-1 gap-3 text-sm">
                {sessionData?.role && (
                  <div className="text-white/80">
                    <span className="text-white/60">Role:</span>{" "}
                    {sessionData.role}
                  </div>
                )}
                {sessionData?.last_login && (
                  <div className="text-white/80">
                    <span className="text-white/60">Last login:</span>{" "}
                    {new Date(sessionData.last_login).toLocaleString()}
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-3 justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-900 font-medium transition shadow"
                >
                  Go to Home
                </button>
              </div>
            </motion.div>
          </motion.div>

          <LoginFooter fadeUp={fadeUp} />
        </motion.div>
      </div>
    );
  }

  // Default: show the login form (while checking or when not authenticated)
  return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-amber-400/10 to-zinc-900 flex items-center justify-center p-6">

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

          {/* While we’re checking the cookie, you can optionally dim the form */}
          <div className={authChecked ? "" : "opacity-60 pointer-events-none"}>
            <LoginForm
              fadeUp={fadeUp}
              formData={formData}
              errors={{ ...errors }}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
          </div>
        </motion.div>

        <LoginFooter fadeUp={fadeUp} />
      </motion.div>
    </div>
  );
};

export default Login;

