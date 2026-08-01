"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../ui/Icons";

const HeroCanvas = dynamic(() => import("../canvas/HeroCanvas"), { ssr: false });

const socials = [
  { name: "GitHub", href: "https://github.com/hebypaul", icon: GithubIcon },
  { name: "LinkedIn", href: "https://linkedin.com/in/hebytpaul", icon: LinkedinIcon },
  { name: "X", href: "https://x.com/HebyPaul", icon: TwitterIcon },
];

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Parallax and scale effects based on scroll position
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

  const scrollTo = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      {/* WebGL Canvas Background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Foreground Content */}
      <motion.div 
        style={{ y, opacity, scale, willChange: "transform, opacity" }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center pointer-events-none p-6 mix-blend-difference"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white"
        >
          FULL STACK
          <br />
          <span className="text-transparent [-webkit-text-stroke:1px_white] outline-text">DEVELOPER</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 text-lg md:text-xl text-white/70 max-w-xl mx-auto"
        >
          Building modern web applications with strong engineering, thoughtful design, and real-world performance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex gap-4 mt-10 pointer-events-auto"
        >
          <a
            href="#projects"
            onClick={(e) => scrollTo(e, "#projects")}
            data-cursor-text="WORK"
            className="px-7 py-3.5 bg-white text-background font-bold text-sm rounded-full hover:scale-105 transition-transform duration-300"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            data-cursor-text="HELLO"
            className="px-7 py-3.5 border border-white/20 text-white font-medium text-sm rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            Let&apos;s Talk
          </a>
        </motion.div>
      </motion.div>

      {/* Social Links — Bottom Left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-6 md:left-12 z-10 flex flex-col gap-4 pointer-events-auto"
      >
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            data-cursor-text={s.name.toUpperCase()}
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            <s.icon size={18} />
          </a>
        ))}
        <div className="w-px h-16 bg-white/20 mx-auto" />
      </motion.div>

      {/* Scroll Indicator — Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 right-6 md:right-12 z-10 pointer-events-auto"
      >
        <button 
          aria-label="Scroll down"
          data-cursor-text="SCROLL"
          className="p-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ArrowDown size={20} />
        </button>
      </motion.div>
    </section>
  );
}
