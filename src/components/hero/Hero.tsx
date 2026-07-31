"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("../canvas/HeroCanvas"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      {/* WebGL Canvas Background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center pointer-events-none p-6 mix-blend-difference">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white"
        >
          CREATIVE
          <br />
          <span className="text-transparent -webkit-text-stroke-1 stroke-white outline-text">DEVELOPER</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 text-lg md:text-xl text-white/70 max-w-lg mx-auto"
        >
          Crafting premium digital experiences through motion, shaders, and modern web technologies.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-auto mix-blend-difference"
      >
        <button 
          data-cursor-text="SCROLL"
          className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-300"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ArrowDown size={24} />
        </button>
      </motion.div>
    </section>
  );
}
