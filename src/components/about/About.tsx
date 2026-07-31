"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-surface relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          style={{ y: y1, opacity }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">About Me</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-8 leading-tight">
            I craft digital experiences that <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">live and breathe</span>.
          </h3>
          <p className="text-lg text-white/70 mb-6 font-light leading-relaxed">
            With a focus on performance, accessibility, and high-end design, I build interactive applications that leave a lasting impression. My approach blends technical engineering with creative vision.
          </p>
          <p className="text-lg text-white/70 font-light leading-relaxed">
            From complex WebGL shaders to pixel-perfect React components, I ensure every detail is meticulously crafted. Let&apos;s create something extraordinary together.
          </p>
        </motion.div>

        <motion.div 
          style={{ y: y2 }}
          className="w-full md:w-1/2 relative h-150 rounded-3xl overflow-hidden glass p-4"
        >
          {/* Abstract geometric shapes or portrait */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          
          <div className="w-full h-full border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center">
             <div className="w-64 h-64 rounded-full bg-primary/30 blur-[100px] absolute" />
             <div className="w-48 h-48 rounded-full bg-accent/40 blur-[80px] absolute translate-x-20 translate-y-20" />
             <div className="relative z-10 text-white/50 font-mono text-sm tracking-widest">[ PORTRAIT OR ABSTRACT VISUAL ]</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
