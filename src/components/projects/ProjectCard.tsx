"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
}

export default function ProjectCard({ title, description, image, tags, githubUrl, liveUrl, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-1000">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-125 rounded-2xl cursor-pointer group glass"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
      <div 
        className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
        
        {/* Fallback pattern if no image */}
        <div className="w-full h-full bg-surface relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
          )}
        </div>
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8" style={{ transform: "translateZ(60px)" }}>
          <div className="flex flex-wrap gap-2 mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-md rounded-full text-white/90 border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-3xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-all duration-500">{title}</h3>
          
          <p className="text-white/70 mb-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="View source code" data-cursor-text="SOURCE" className="p-2 bg-white/10 hover:bg-white hover:text-black rounded-full transition-colors backdrop-blur-md">
                <Code size={20} />
              </a>
            )}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer" aria-label="Visit live site" data-cursor-text="VISIT" className="p-2 bg-white/10 hover:bg-white hover:text-black rounded-full transition-colors backdrop-blur-md">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
}
