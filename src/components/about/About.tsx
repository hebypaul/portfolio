"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const profilePic: string | null = "/profile.png";

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
            I am a Full Stack developer based in Kochi, focused on building scalable infrastructure and exploring the next generation of AI tooling. 
          </p>
          <p className="text-lg text-white/70 font-light leading-relaxed">
            I am deeply passionate about open source and actively involved in the Layer5 community, contributing to cloud-native management systems like Meshery. My approach blends modern full-stack architectures with a drive to explore Agentic Engineering, MCP, and LangGraph. Let&apos;s build something extraordinary together.
          </p>
        </motion.div>

        <motion.div 
          style={{ y: y2 }}
          className="w-full md:w-1/2 relative h-150 rounded-3xl overflow-hidden glass p-4"
        >
          {/* Background ambient lighting */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          
          <div className="w-full h-full border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center">
             <div className="w-64 h-64 rounded-full bg-primary/30 blur-[100px] absolute" />
             <div className="w-48 h-48 rounded-full bg-accent/40 blur-[80px] absolute translate-x-20 translate-y-20" />
             
             {profilePic ? (
               <Image
                 src={profilePic}
                 alt="Heby Paul"
                 fill
                 className="object-cover rounded-2xl filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
             ) : (
               <div className="relative z-10 text-center p-6">
                 <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mx-auto flex items-center justify-center mb-4 text-white/40 text-xs font-mono">
                   [ PHOTO ]
                 </div>
                 <p className="text-white/40 font-mono text-xs tracking-widest uppercase">
                  profile.jpg
                 </p>
               </div>
             )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
