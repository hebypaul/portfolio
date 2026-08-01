"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  // Exit immediately on next frame so the hero LCP element renders ASAP.
  // The exit animation still plays smoothly because AnimatePresence handles it.
  useEffect(() => {
    // One rAF tick ensures the CSS is parsed and the browser has painted
    // at least one frame before we start unmounting the loader overlay.
    const id = requestAnimationFrame(() => setLoading(false));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background text-text-main pointer-events-none"
        >
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            Heby Paul
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
