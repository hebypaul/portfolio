"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500);
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background text-text-main"
        >
          <div className="flex flex-col items-center overflow-hidden">
            <motion.h1 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold tracking-tighter"
            >
              PORTFOLIO
            </motion.h1>
            <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <motion.p 
              className="mt-2 text-sm text-white/50 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
