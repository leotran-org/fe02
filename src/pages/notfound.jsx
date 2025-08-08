import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

/**
 * 404 Not Found – Minimal, elegant, and responsive.
 *
 * Design notes (from brief):
 * - Minimal but refined: generous whitespace, clear hierarchy.
 * - Gentle motion: subtle entrance + hover micro-interactions.
 * - Neutral palette: white/soft gray base with restrained accent.
 * - Bold headings + light body text (modern sans).
 * - Mobile-first, accessible.
 */

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 flex items-center justify-center p-6">
      <section
        aria-labelledby="notfound-title"
        className="w-full max-w-3xl grid gap-8 text-center"
      >
        {/* Floating badge / avatar slot (branding-friendly) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto"
        >
          <div className="relative h-16 w-16 rounded-full bg-gradient-to-b from-neutral-200 to-neutral-100 shadow-sm ring-1 ring-inset ring-neutral-200 dark:from-neutral-800 dark:to-neutral-900 dark:ring-neutral-800 flex items-center justify-center select-none">
            <span className="sr-only">Logo</span>
            <span className="text-xs font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">YOU</span>
          </div>
        </motion.div>

        {/* Big 404 with soft motion */}
        <motion.h1
          id="notfound-title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold leading-none tracking-tight"
        >
          <span className="inline-flex">
            <motion.span
              initial={{ y: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="px-2 rounded-2xl"
            >
              4
            </motion.span>
            <motion.span
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              className="px-2 rounded-2xl bg-gradient-to-b from-amber-200/60 to-amber-100/40 dark:from-amber-400/15 dark:to-amber-300/5 ring-1 ring-inset ring-amber-200/50 dark:ring-amber-300/20"
            >
              0
            </motion.span>
            <motion.span
              initial={{ y: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="px-2 rounded-2xl"
            >
              4
            </motion.span>
          </span>
        </motion.h1>

        {/* Title & copy */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="space-y-3 max-w-xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl font-semibold">Không tìm thấy trang.</h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Có thể đường dẫn đã thay đổi hoặc trang này đã bị xoá. Hãy quay lại hoặc về trang chủ để tiếp tục.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 sm:px-5 sm:py-2.5 font-medium ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 hover:ring-neutral-400 dark:hover:ring-neutral-600 transition-shadow shadow-[0_1px_0_0_rgba(0,0,0,0.02)] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Về trang chủ
          </a>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 sm:px-5 sm:py-2.5 font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 active:opacity-100 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Quay lại
          </button>
        </motion.div>

        {/* Footer hint / storytelling hook */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
          className="text-xs text-neutral-500 dark:text-neutral-500"
        >
          <span className="align-middle">hoặc</span>{" "}
          <a
            href="/blog"
            className="underline decoration-dotted underline-offset-4 hover:decoration-solid transition-[text-decoration]"
          >
            khám phá blog & gallery
          </a>
        </motion.p>
      </section>

      {/* Subtle background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_50%,black,transparent)]"
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/3 h-72 w-72 rounded-full bg-neutral-300/20 dark:bg-neutral-700/20 blur-3xl" />
      </div>
    </main>
  );
}

